import fs from "fs";
const listeners = {};
global.window = global;
global.requestAnimationFrame = () => 0;
class FakeImg {
  constructor() { this.complete = true; this.naturalWidth = 1186; this.naturalHeight = 926; this._src = ""; }
  set src(v) {
    this._src = v;
    if (v.includes("rival_flip")) { this.naturalWidth = 885; this.naturalHeight = 956; }
    else if (v.includes("rival")) { this.naturalWidth = 877; this.naturalHeight = 945; }
    else if (v.includes("courtyard")) { this.naturalWidth = 1536; this.naturalHeight = 1024; }
    else { this.naturalWidth = 1186; this.naturalHeight = 926; }
  }
  get src() { return this._src; }
}
global.Image = FakeImg;
global.Audio = class { constructor(){this.volume=1;} cloneNode(){return new global.Audio();} play(){return Promise.resolve();} pause(){} };
const ctxStub = new Proxy({}, { get: () => () => {}, set: () => true });
const canvas = { width: 1280, height: 720, getContext: () => ctxStub };
global.document = { getElementById: () => canvas, createElement: () => ({ width:1,height:1,getContext:()=>ctxStub }) };
global.addEventListener = (t, fn) => { (listeners[t] ||= []).push(fn); };

let src = fs.readFileSync("/workspace/estudio/vispera/game.js", "utf8");
src = src.replace("(() => {\n  \"use strict\";", "globalThis.__V = (() => {\n  \"use strict\";");
src = src.replace("  requestAnimationFrame(loop);\n})();", `
  return {
    get player(){return player}, get rival(){return rival},
    get mode(){return mode}, get modeT(){return modeT},
    get slashBuf(){return slashBuf}, get openBuf(){return openBuf},
    get hitstopLeft(){return hitstopLeft}, get openLeft(){return openLeft},
    get yardIndex(){return yardIndex}, get clashSparkT(){return clashSparkT},
    get settleT(){return settleT}, get gapEaseT(){return gapEaseT},
    get shake(){return shake}, get shakeDur(){return shakeDur},
    set attackEdge(v){attackEdge=v}, set mode(v){mode=v},
    keys, update, resetRound, bodyGap, absGap, bladeReach, bladeBox, bodyAABB, hitbox, destRect, poseBitmap, poseSheet, keepApart, inMotionFeel,
    STARTUP, ACTIVE, RECOVERY, LUNGE_PX, OPENING_MS, HITSTUN, KNOCK_PX, SLASH_BUFFER_MS, HITSTOP_HIT, HITSTOP_BLOCK, CLASH_SPARK_MS, GUARD_COMMIT_MS,
  };
})();`);
eval(src);
const V = globalThis.__V;
const STEP = 1000/60;

function boot(){ V.resetRound(); }
function wait(ms){ for(let i=0;i<Math.ceil(ms/STEP);i++) V.update(STEP); }
function drainHitstop(){ for(let i=0;i<40;i++){ if(V.hitstopLeft<=0) break; V.update(STEP);} }
function snap(f){
  const r = V.destRect(f);
  return { dx:r.dx, dy:r.dy, rot:r.rot, pivX:r.pivX, pivY:r.pivY, x:f.x, phase:f.phase, gait:f.gait, guard:!!f.guarding, stun:f.stunT, sheathe:f.sheatheT||0, walkT:f.walkT||0, settle:f.walkSettleT||0, rise:f.walkRiseT||0 };
}
function delta(a,b){
  return { ddx:b.dx-a.dx, ddy:b.dy-a.dy, drot:b.rot-a.rot, dpiv:b.pivX-a.pivX, dx:b.x-a.x };
}
function mag(d){ return Math.max(Math.abs(d.ddx), Math.abs(d.ddy), Math.abs(d.dpiv)); }
function report(name, samples){
  let maxM=0, maxAt=null, maxD=null;
  for(const s of samples){
    if(s.m > maxM){ maxM=s.m; maxAt=s.i; maxD=s.d; maxInfo=s; }
  }
  var maxInfo = samples.reduce((a,b)=>b.m>a.m?b:a, samples[0]||{m:0});
  console.log(`\n## ${name}`);
  console.log(`  max1f=${maxInfo.m.toFixed(3)}px at i=${maxInfo.i} ddx=${maxInfo.d.ddx.toFixed(3)} ddy=${maxInfo.d.ddy.toFixed(3)} dpiv=${maxInfo.d.dpiv.toFixed(3)} drot=${maxInfo.d.drot.toFixed(4)} note=${maxInfo.note||''}`);
  const big = samples.filter(s=>s.m>=2).slice(0,8);
  for(const s of big) console.log(`  >=2: i=${s.i} m=${s.m.toFixed(2)} ddx=${s.d.ddx.toFixed(2)} ddy=${s.d.ddy.toFixed(2)} piv=${s.d.dpiv.toFixed(2)} ${s.note||''}`);
  return maxInfo;
}

function sampleTransition(name, setup, drive, frames=40){
  boot(); wait(1700);
  // freeze rival AI walk
  V.rival.standGoal = 999999; V.rival.standWait = 0; V.rival.closing = false; V.rival.gait = 0;
  setup && setup();
  const samples=[];
  let prev = snap(V.player);
  let prevR = snap(V.rival);
  for(let i=0;i<frames;i++){
    drive && drive(i);
    V.rival.standGoal = 999999; V.rival.closing = false;
    V.update(STEP);
    const cur = snap(V.player);
    const curR = snap(V.rival);
    const d = delta(prev, cur);
    const dR = delta(prevR, curR);
    samples.push({ i, m: mag(d), d, note:`you ph=${cur.phase} g=${cur.gait} guard=${cur.guard} sheathe=${cur.sheathe.toFixed(0)}` });
    samples.push({ i, m: mag(dR), d:dR, note:`riv ph=${curR.phase} g=${curR.gait}` });
    prev = cur; prevR = curR;
  }
  return report(name, samples);
}

const results = [];

// 1) Guard raise/drop
results.push(sampleTransition("guard raise", ()=>{
  V.player.x=500; V.rival.x=700; V.player.phase="idle"; V.player.gait=0; V.keys.clear();
}, (i)=>{
  if(i===2) V.keys.add("KeyS");
  if(i===20) V.keys.delete("KeyS");
}, 40));

// 2) Slash start from walk
results.push(sampleTransition("slash from walk", ()=>{
  V.player.x=400; V.rival.x=780; V.player.phase="idle"; V.keys.clear(); V.keys.add("KeyD");
}, (i)=>{
  V.keys.add("KeyD");
  if(i===12){ V.keys.delete("KeyD"); V.attackEdge=true; }
}, 50));

// 3) Recovery→walk hold A/D
results.push((()=>{
  boot(); wait(50);
  Math.random = ()=>0.99;
  // get to measure-ish
  for(let i=0;i<900;i++){
    V.update(STEP);
    if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4) break;
  }
  V.rival.standGoal=999999; V.rival.closing=false;
  V.attackEdge=true;
  const samples=[];
  let prev=snap(V.player);
  let sawRec=false, sawIdle=false;
  for(let i=0;i<120;i++){
    V.keys.clear(); V.keys.add("KeyD"); // hold through
    V.rival.standGoal=999999; V.rival.closing=false; V.rival.gait=0;
    // keep rival from attacking
    if(V.rival.phase==="startup"){ V.rival.phase="idle"; V.rival.phaseT=0; }
    V.update(STEP);
    const cur=snap(V.player);
    const d=delta(prev,cur);
    if(cur.phase==="recovery") sawRec=true;
    if(sawRec && cur.phase==="idle") sawIdle=true;
    samples.push({i,m:mag(d),d,note:`ph=${cur.phase} g=${cur.gait} sheathe=${cur.sheathe.toFixed(0)} settle=${cur.settle.toFixed(0)} walkT=${cur.walkT.toFixed(0)}`});
    prev=cur;
  }
  return report("recovery→walk hold D", samples);
})());

// 4) Rival walk-in / walk-out destRect
results.push((()=>{
  boot(); wait(1700);
  V.player.x=300; V.rival.x=1000;
  V.player.gait=0; V.keys.clear();
  const samples=[];
  let prev=snap(V.rival);
  for(let i=0;i<180;i++){
    V.update(STEP);
    const cur=snap(V.rival);
    const d=delta(prev,cur);
    // subtract expected plant walk (x change)
    const unexpected = Math.max(Math.abs(d.ddx - d.dx), Math.abs(d.ddy), Math.abs(d.dpiv - d.dx));
    samples.push({i,m:unexpected,d,note:`g=${cur.gait} x=${cur.x.toFixed(1)} walkT=${cur.walkT.toFixed(0)} unexpected=${unexpected.toFixed(2)} rawM=${mag(d).toFixed(2)}`});
    prev=cur;
  }
  return report("rival walk-in destRect residual", samples);
})());

// 5) Opening settle vs idle breath
results.push((()=>{
  boot();
  const samples=[];
  let prev=snap(V.player);
  for(let i=0;i<120;i++){
    V.update(STEP);
    const cur=snap(V.player);
    const d=delta(prev,cur);
    samples.push({i,m:mag(d),d,note:`settleT=${V.settleT} open=${V.openLeft} dy=${cur.dy.toFixed(2)}`});
    prev=cur;
  }
  return report("opening settle vs breath", samples);
})());

// 6) Title→play plant
results.push((()=>{
  // cold-ish: reset via title
  V.mode="title";
  V.attackEdge=true;
  const samples=[];
  let prev=null;
  for(let i=0;i<30;i++){
    V.update(STEP);
    const cur=snap(V.player);
    if(prev){
      const d=delta(prev,cur);
      samples.push({i,m:mag(d),d,note:`mode=${V.mode} settle=${V.settleT} dy=${cur.dy.toFixed(2)}`});
    }
    prev=cur;
  }
  return report("title→play plant", samples);
})());

// 7) Block→walk
results.push(sampleTransition("block→walk", ()=>{
  V.player.x=500; V.rival.x=700; V.keys.clear(); V.keys.add("KeyS");
  V.update(STEP); V.update(STEP);
}, (i)=>{
  if(i<5) V.keys.add("KeyS");
  else { V.keys.delete("KeyS"); V.keys.add("KeyD"); }
}, 40));

// 8) Stun→walk
results.push((()=>{
  boot(); wait(50);
  Math.random=()=>0.99;
  for(let i=0;i<900;i++){
    V.update(STEP);
    if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4) break;
  }
  // force player stun
  V.player.stunT = 350;
  V.player.phase="idle"; V.player.guarding=false; V.player.gait=0;
  V.rival.phase="idle"; V.rival.standGoal=999999; V.rival.closing=false;
  const samples=[];
  let prev=snap(V.player);
  for(let i=0;i=0;i++){}
  for(let i=0;i<50;i++){
    V.keys.clear(); V.keys.add("KeyD");
    V.rival.standGoal=999999; V.rival.closing=false;
    if(V.rival.phase!=="idle"){ V.rival.phase="idle"; V.rival.phaseT=0; }
    V.update(STEP);
    const cur=snap(V.player);
    const d=delta(prev,cur);
    samples.push({i,m:mag(d),d,note:`stun=${cur.stun.toFixed(0)} g=${cur.gait} ph=${cur.phase}`});
    prev=cur;
  }
  return report("stun→walk", samples);
})());

// 9) Sheathe vs breath (idle after recovery, no walk)
results.push((()=>{
  boot(); wait(50);
  Math.random=()=>0.99;
  for(let i=0;i<900;i++){
    V.update(STEP);
    if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4) break;
  }
  V.rival.standGoal=999999; V.rival.closing=false;
  V.attackEdge=true;
  const samples=[];
  let prev=snap(V.player);
  for(let i=0;i=0;i++){}
  for(let i=0;i<80;i++){
    V.keys.clear(); // no walk
    V.rival.standGoal=999999; V.rival.closing=false;
    if(V.rival.phase==="startup"){ V.rival.phase="idle"; V.rival.phaseT=0; }
    V.update(STEP);
    const cur=snap(V.player);
    const d=delta(prev,cur);
    samples.push({i,m:mag(d),d,note:`ph=${cur.phase} sheathe=${cur.sheathe.toFixed(0)}`});
    prev=cur;
  }
  return report("sheathe idle (no walk)", samples);
})());

// 10) Walk cadence mid-stride hitch (player walking steadily)
results.push(sampleTransition("walk cadence mid-stride", ()=>{
  V.player.x=200; V.rival.x=900; V.keys.clear(); V.keys.add("KeyD");
}, (i)=>{ V.keys.add("KeyD"); }, 90));

// 11) keepApart while walking away (outward)
results.push(sampleTransition("walk away outward", ()=>{
  V.player.x=500; V.rival.x=700; V.keys.clear();
}, (i)=>{
  V.keys.add("KeyA"); // walk left away
}, 60));

// 12) Space while guarding? skip. Slash start idle (pose snap expected for combat)
results.push(sampleTransition("slash start from idle", ()=>{
  V.player.x=500; V.rival.x=700; V.keys.clear();
}, (i)=>{
  if(i===5) V.attackEdge=true;
}, 40));

// 13) Guard raise while walk settle leftover
results.push(sampleTransition("guard after walk release", ()=>{
  V.player.x=400; V.rival.x=750; V.keys.clear(); V.keys.add("KeyD");
  for(let k=0;k=0;k++){}
  for(let k=0;k<20;k++){ V.keys.add("KeyD"); V.rival.standGoal=999999; V.update(STEP); }
  V.keys.clear();
}, (i)=>{
  if(i===3) V.keys.add("KeyS");
  if(i===15) V.keys.delete("KeyS");
}, 40));

console.log("\n=== TOP RESIDUALS (exclude expected combat pose snaps) ===");
