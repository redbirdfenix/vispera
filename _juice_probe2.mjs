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
    get settleT(){return settleT}, get gapEaseT(){return gapEaseT},
    set attackEdge(v){attackEdge=v}, set mode(v){mode=v},
    keys, update, resetRound, bodyGap, bladeReach, destRect, poseSheet, poseBitmap, keepApart,
    STARTUP, ACTIVE, RECOVERY, LUNGE_PX, OPENING_MS, HITSTUN, SHEATHE_MS: (typeof SHEATHE_MS!=='undefined'?SHEATHE_MS:140),
  };
})();`);
eval(src);
const V = globalThis.__V;
const STEP = 1000/60;
function boot(){ V.resetRound(); }
function wait(ms){ for(let i=0;i<Math.ceil(ms/STEP);i++) V.update(STEP); }
function freezeRival(){
  V.rival.standGoal=999999; V.rival.standWait=0; V.rival.closing=false; V.rival.gait=0;
  V.rival.phase="idle"; V.rival.phaseT=0; V.rival.guarding=false; V.rival.stunT=0; V.rival.pushT=0;
}
function sheetInfo(f){
  const s = V.poseSheet(f);
  return { footX:s.footX, footY:s.footY, w:s.w, h:s.h, tipX:s.tipX };
}
function full(f){
  const r=V.destRect(f);
  const sh=sheetInfo(f);
  return { dx:r.dx, dy:r.dy, rot:r.rot, pivX:r.pivX, x:f.x, ph:f.phase, g:f.gait, guard:!!f.guarding, stun:f.stunT|0,
    sheathe:f.sheatheT||0, walkT:f.walkT||0, settle:f.walkSettleT||0, rise:f.walkRiseT||0,
    footX:sh.footX, footY:sh.footY, shW:sh.w, shH:sh.h };
}

function isolate(name, setup, drive, frames, who="you"){
  boot(); wait(1700);
  freezeRival();
  V.player.x=480; V.rival.x=780;
  V.player.phase="idle"; V.player.gait=0; V.player.guarding=false; V.player.stunT=0; V.player.sheatheT=0;
  V.player.walkSettleT=0; V.player.walkRiseT=0; V.player.walkT=0;
  V.keys.clear();
  freezeRival();
  for(let k=0;k<3;k++){ freezeRival(); V.update(STEP); }
  setup && setup();
  const f0 = who==="you" ? V.player : V.rival;
  let prev = full(f0);
  console.log(`\n## ${name}`);
  console.log(`  start: dy=${prev.dy.toFixed(2)} dx=${prev.dx.toFixed(2)} foot=${prev.footX},${prev.footY} ph=${prev.ph}`);
  const hits=[];
  for(let i=0;i<frames;i++){
    drive && drive(i);
    freezeRival();
    // pin rival x so keepApart doesn't shove
    const rx=V.rival.x, px=V.player.x;
    V.update(STEP);
    // if we want pure feel, re-freeze after
    freezeRival();
    const f = who==="you" ? V.player : V.rival;
    const cur=full(f);
    const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x, drot=cur.rot-prev.rot;
    // residual: destRect change not explained by plant x
    const resX = Math.abs(ddx - dx);
    const resP = Math.abs(dpiv - dx);
    const res = Math.max(resX, Math.abs(ddy), resP);
    const note = `ph=${cur.ph} g=${cur.gait} guard=${cur.guard} sheathe=${cur.sheathe.toFixed(0)} foot=${cur.footX} rise=${cur.rise.toFixed(0)} settle=${cur.settle.toFixed(0)}`;
    if(res>=1.5 || Math.abs(ddy)>=1.5 || Math.abs(drot)>=0.02){
      hits.push({i,res,ddx,ddy,dpiv,dx,drot,note});
      console.log(`  i=${i} res=${res.toFixed(2)} ddx=${ddx.toFixed(2)} ddy=${ddy.toFixed(2)} dpiv=${dpiv.toFixed(2)} dxPlant=${dx.toFixed(2)} drot=${drot.toFixed(4)} | ${note}`);
    }
    prev=cur;
  }
  if(!hits.length) console.log("  (no >=1.5px residual)");
  const max = hits.reduce((a,b)=>b.res>a.res?b:a, hits[0]||{res:0});
  console.log(`  MAX residual=${(max.res||0).toFixed(3)}`);
  return max;
}

// Guard raise/drop pure
isolate("GUARD raise/drop", null, (i)=>{
  if(i===5) V.keys.add("KeyS");
  if(i===25) V.keys.delete("KeyS");
}, 45);

// Guard raise while walking
isolate("GUARD from walk", ()=>{
  V.keys.add("KeyD");
  for(let k=0;k<25;k++){ V.keys.add("KeyD"); freezeRival(); V.update(STEP); }
}, (i)=>{
  if(i<3) V.keys.add("KeyD");
  else if(i===3){ V.keys.delete("KeyD"); V.keys.add("KeyS"); }
  else if(i<20) V.keys.add("KeyS");
  else V.keys.delete("KeyS");
}, 40);

// Slash from walk — focus frames around Space
isolate("SLASH from walk", ()=>{
  V.keys.add("KeyD");
  for(let k=0;k<30;k++){ V.keys.add("KeyD"); freezeRival(); V.update(STEP); }
}, (i)=>{
  if(i<5) V.keys.add("KeyD");
  else if(i===5){ V.keys.delete("KeyD"); V.attackEdge=true; }
}, 40);

// Recovery→idle sheathe onset (no keys)
isolate("RECOVERY→idle sheathe", ()=>{
  V.player.phase="recovery"; V.player.phaseT=V.RECOVERY-STEP; // next tick → idle
  V.player.sheatheT=0;
}, null, 30);

// Recovery→walk hold D
isolate("RECOVERY→walk hold D", ()=>{
  V.player.phase="recovery"; V.player.phaseT=V.RECOVERY-STEP;
  V.keys.add("KeyD");
}, (i)=>V.keys.add("KeyD"), 40);

// Stun end → walk
isolate("STUN→walk", ()=>{
  V.player.stunT = STEP*2; // ends in 2 frames
  V.keys.add("KeyD");
}, (i)=>V.keys.add("KeyD"), 30);

// Block→walk
isolate("BLOCK→walk", ()=>{
  V.keys.add("KeyS");
  freezeRival(); V.update(STEP); freezeRival(); V.update(STEP);
}, (i)=>{
  if(i<3) V.keys.add("KeyS");
  else { V.keys.delete("KeyS"); V.keys.add("KeyD"); }
}, 35);

// Walk start / stop
isolate("WALK start/stop", null, (i)=>{
  if(i>=5 && i<40) V.keys.add("KeyD");
  else V.keys.delete("KeyD");
}, 70);

// Walk reverse A↔D
isolate("WALK reverse", ()=>{
  V.keys.add("KeyD");
  
  for(let k=0;k<40;k++){ V.keys.add("KeyD"); freezeRival(); V.update(STEP); }
}, (i)=>{
  if(i<5) V.keys.add("KeyD");
  else { V.keys.delete("KeyD"); V.keys.add("KeyA"); }
}, 40);

// Opening lift stamp
isolate("OPENING lift", ()=>{
  // rewind openLeft near 0
  boot();
  // custom: openLeft almost done
}, null, 5); // will redo below

// Rival walk stop residual (who=rival)
boot(); wait(1700);
V.player.x=200; V.rival.x=1100; V.keys.clear();
let prev=full(V.rival);
console.log("\n## RIVAL walk-in/stop");
for(let i=0;i<200;i++){
  V.update(STEP);
  const cur=full(V.rival);
  const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
  const res=Math.max(Math.abs(ddx-dx), Math.abs(ddy), Math.abs(dpiv-dx));
  if(res>=1.5){
    console.log(`  i=${i} res=${res.toFixed(2)} ddx=${ddx.toFixed(2)} ddy=${ddy.toFixed(2)} dxPlant=${dx.toFixed(2)} g=${cur.gait} walkT=${cur.walkT.toFixed(0)} foot=${cur.footX} settle=${cur.settle.toFixed(0)} rise=${cur.rise.toFixed(0)}`);
  }
  prev=cur;
  if(i>20 && cur.gait===0 && prev.gait===0 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+20) {
    // continue a bit after stop
  }
}

// Sheet foot deltas static
console.log("\n## SHEET FOOT deltas (you)");
const poses=["idle","walk","windup","slash","block","hurt"];
// manually poke
boot(); wait(50);
const you=V.player;
you.phase="idle"; you.guarding=false; you.falling=false; you.stunT=0; you.gait=0; you.sheatheT=0; you.hp=3;
const idle=V.poseSheet(you);
console.log(" idle", idle.footX, idle.footY, idle.w, idle.h);
you.gait=1; you.walkT=100; // walk sheet if gaitWalkOn
const w=V.poseSheet(you);
console.log(" walk(on?)", w.footX, w.footY, "gaitWalk needs sin>0.28");
you.gait=0; you.walkT=0;
you.guarding=true;
const b=V.poseSheet(you);
console.log(" block", b.footX, b.footY, b.w, b.h, "ΔfootX", b.footX-idle.footX, "ΔfootY", b.footY-idle.footY);
you.guarding=false;
you.phase="startup";
const wu=V.poseSheet(you);
console.log(" windup", wu.footX, wu.footY, "ΔfootX", wu.footX-idle.footX, "ΔfootY", wu.footY-idle.footY);
you.phase="active";
const sl=V.poseSheet(you);
console.log(" slash", sl.footX, sl.footY, "ΔfootX", sl.footX-idle.footX, "ΔfootY", sl.footY-idle.footY);
you.phase="idle"; you.sheatheT=140;
const sh=V.poseSheet(you);
console.log(" sheathe", sh.footX, sh.footY, "ΔfootX", sh.footX-idle.footX);

// Opening settle isolated
boot();
console.log("\n## OPENING settle at lift");
prev=full(V.player);
for(let i=0;i<110;i++){
  V.update(STEP);
  const cur=full(V.player);
  const ddy=cur.dy-prev.dy;
  if(Math.abs(ddy)>=1.0 || (V.openLeft===0 && i>90)){
    if(Math.abs(ddy)>=0.5)
      console.log(`  i=${i} ddy=${ddy.toFixed(3)} settleT=${V.settleT} open=${V.openLeft.toFixed(0)} dy=${cur.dy.toFixed(2)}`);
  }
  prev=cur;
}
