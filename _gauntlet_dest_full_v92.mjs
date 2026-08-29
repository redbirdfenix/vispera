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
    keys, update, resetRound, bodyGap, bladeReach, destRect, poseSheet, poseBitmap, keepApart, bodyAABB,
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
function snap(f){
  const r=V.destRect(f);
  return { dx:r.dx, dy:r.dy, rot:r.rot, pivX:r.pivX, x:f.x, ph:f.phase, g:f.gait|0, guard:!!f.guarding,
    sheathe:f.sheatheT||0, rise:f.walkRiseT||0, settle:f.walkSettleT||0, stun:f.stunT|0, fall:!!f.falling, hp:f.hp };
}
function residual(prev, cur){
  const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
  return { res: Math.max(Math.abs(ddx - dx), Math.abs(ddy), Math.abs(dpiv - dx)), ddx, ddy, dx, dpiv };
}
function isolate(name, setup, drive, frames, who="you"){
  boot(); wait(1700); freezeRival();
  V.player.x=480; V.rival.x=780;
  V.player.phase="idle"; V.player.gait=0; V.player.guarding=false; V.player.stunT=0; V.player.sheatheT=0;
  V.player.walkSettleT=0; V.player.walkRiseT=0; V.player.walkT=0; V.player.falling=false;
  V.keys.clear(); freezeRival();
  for(let k=0;k<3;k++){ freezeRival(); V.update(STEP); }
  setup && setup();
  const get = () => who==="you" ? V.player : V.rival;
  let prev = snap(get());
  let maxRes=0, maxEvt=null;
  const flags=[];
  for(let i=0;i<frames;i++){
    drive && drive(i);
    freezeRival();
    V.update(STEP);
    freezeRival();
    const cur=snap(get());
    const {res,ddx,ddy,dx}=residual(prev,cur);
    if(res > maxRes){ maxRes=res; maxEvt={i,res,ddy,ph:cur.ph,sheathe:cur.sheathe}; }
    if(res>=2.2) flags.push({i,res:+res.toFixed(3),ddy:+ddy.toFixed(3),ph:cur.ph,sheathe:+cur.sheathe.toFixed(0),lunge:cur.ph==="startup"||cur.ph==="active"});
    prev=cur;
  }
  console.log(`## ${name} MAX=${maxRes.toFixed(3)}` + (maxEvt?` @i=${maxEvt.i} ddy=${maxEvt.ddy.toFixed(2)} ph=${maxEvt.ph} sheathe=${maxEvt.sheathe.toFixed(0)}`:''));
  if(flags.length) console.log("  FLAGS>=2.2", JSON.stringify(flags.slice(0,12)));
  return { name, maxRes, flags };
}

const out = {};
out.sheathe = isolate("sheathe recovery→idle", ()=>{ V.player.phase="idle"; V.player.sheatheT=140; }, null, 30);
out.space_mid = isolate("Space mid-sheathe", ()=>{ V.player.sheatheT=90; }, (i)=>{ if(i===3) V.attackEdge=true; }, 50);
out.guard_mid = isolate("Guard mid-sheathe", ()=>{ V.player.sheatheT=90; }, (i)=>{ if(i===3) V.keys.add("KeyS"); if(i===25) V.keys.delete("KeyS"); }, 40);
out.guard_raise = isolate("Guard raise idle", null, (i)=>{ if(i===5) V.keys.add("KeyS"); if(i===30) V.keys.delete("KeyS"); }, 50);
out.ad_lean = isolate("A+D lean", null, (i)=>{
  if(i<20) { V.keys.add("KeyD"); V.keys.delete("KeyA"); }
  else { V.keys.add("KeyD"); V.keys.add("KeyA"); }
}, 60);
out.wall_A = isolate("wall A", ()=>{ V.player.x=80; V.rival.x=700; }, (i)=>{ V.keys.add("KeyA"); }, 80);
out.slash_walk = isolate("slash-from-walk", ()=>{
  V.keys.add("KeyD");
  for(let k=0;k<20;k++){ freezeRival(); V.update(STEP); }
}, (i)=>{
  V.keys.add("KeyD");
  if(i===5) V.attackEdge=true;
}, 60);
out.rival_sheathe = isolate("rival sheathe", ()=>{
  V.rival.phase="idle"; V.rival.sheatheT=140; V.rival.gait=0;
}, null, 30, "rival");

// opening settle
boot();
let prev=snap(V.player), maxOpen=0, openAt=-1, openDdy=0;
for(let i=0;i<110;i++){
  V.update(STEP);
  const cur=snap(V.player);
  const {res,ddy}=residual(prev,cur);
  if(res>maxOpen){ maxOpen=res; openAt=i; openDdy=ddy; }
  prev=cur;
}
out.opening_settle = { maxRes: maxOpen, at: openAt, ddy: openDdy };
console.log(`## OPENING settle MAX=${maxOpen.toFixed(3)} @i=${openAt} ddy=${openDdy.toFixed(3)}`);

// KO winner sheathe (natural KO if possible)
boot(); wait(1700);
V.player.x=500; V.rival.x=620;
V.rival.hp=1; V.rival.phase="idle"; V.rival.stunT=0; V.rival.guarding=false;
freezeRival();
for(let k=0;k<3;k++) V.update(STEP);
V.attackEdge=true;
let koMax=0, koFlags=[], sawOver=false, winnerPrev=null;
for(let i=0;i<200;i++){
  V.update(STEP);
  if(V.mode==="over") sawOver=true;
  const w = V.player.hp>0 ? V.player : V.rival;
  if(!winnerPrev){ winnerPrev=snap(w); continue; }
  const cur=snap(w);
  const {res,ddy}=residual(winnerPrev,cur);
  if(res>koMax) koMax=res;
  if(res>=2.2) koFlags.push({i,res:+res.toFixed(3),ddy:+ddy.toFixed(3),ph:cur.ph,sheathe:+cur.sheathe.toFixed(0),mode:V.mode});
  winnerPrev=cur;
}
out.ko_winner = { maxRes: koMax, sawOver, flags: koFlags.slice(0,8) };
console.log(`## KO winner sheathe MAX=${koMax.toFixed(3)} over=${sawOver} flags=${koFlags.length}`);

// scramble: walk/guard/slash mixed, flag non-lunge >=2.2
boot(); wait(1700); freezeRival();
V.player.x=480; V.rival.x=780;
prev=snap(V.player);
const scramble=[];
for(let i=0;i<180;i++){
  V.keys.clear();
  if(i%40<15) V.keys.add("KeyD");
  else if(i%40<25) V.keys.add("KeyA");
  if(i%55===10) V.attackEdge=true;
  if(i%33<8) V.keys.add("KeyS");
  freezeRival(); V.update(STEP); freezeRival();
  const cur=snap(V.player);
  const {res,ddy}=residual(prev,cur);
  const isLunge = cur.ph==="startup"||cur.ph==="active"||prev.ph==="startup"||prev.ph==="active";
  if(res>=2.2 && !isLunge) scramble.push({i,res:+res.toFixed(3),ddy:+ddy.toFixed(3),ph:cur.ph,sheathe:+cur.sheathe.toFixed(0)});
  prev=cur;
}
out.scramble = scramble;
console.log(`## scramble non-lunge >=2.2 count=${scramble.length}`, scramble.length?JSON.stringify(scramble.slice(0,10)):"none");

// next-layer quick checks
boot();
let titleOk=false;
V.keys.clear();
// stay in title; Space should start
for(let i=0;i<5;i++) V.update(STEP);
const modeBefore=V.mode;
V.keys.add("Space");
for(let i=0;i<3;i++) V.update(STEP);
V.keys.delete("Space");
titleOk = (modeBefore==="title" || modeBefore==="play") && (V.mode==="play" || V.openLeft>0 || V.mode==="title");
// yards alternate via resetRound
boot(); const y0 = (typeof globalThis.__yard!=='undefined')?globalThis.__yard:null;
// SFX stub count already via Audio play
let sfx=0;
const OldAudio=global.Audio;
global.Audio = class extends OldAudio { play(){ sfx++; return Promise.resolve(); } };

const summary = {
  sheathe: +out.sheathe.maxRes.toFixed(3),
  space_mid: +out.space_mid.maxRes.toFixed(3),
  guard_mid: +out.guard_mid.maxRes.toFixed(3),
  guard_raise: +out.guard_raise.maxRes.toFixed(3),
  ad_lean: +out.ad_lean.maxRes.toFixed(3),
  wall_A: +out.wall_A.maxRes.toFixed(3),
  slash_walk: +out.slash_walk.maxRes.toFixed(3),
  rival_sheathe: +out.rival_sheathe.maxRes.toFixed(3),
  opening_settle: +out.opening_settle.maxRes.toFixed(3),
  ko_winner: +out.ko_winner.maxRes.toFixed(3),
  scramble_flags_ge_2_2: out.scramble.length ? out.scramble : "none",
};
console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(summary,null,2));
fs.writeFileSync("/tmp/vispera-dest-full-0824.json", JSON.stringify(summary,null,2));
