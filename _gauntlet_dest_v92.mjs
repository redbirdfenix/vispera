
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
  const a=V.bodyAABB(f);
  return { dx:r.dx, dy:r.dy, rot:r.rot, pivX:r.pivX, x:f.x, ax:a.x, ay:a.y, aw:a.w, ah:a.h,
    ph:f.phase, g:f.gait|0, guard:!!f.guarding, sheathe:f.sheatheT||0, rise:f.walkRiseT||0, settle:f.walkSettleT||0,
    stun:f.stunT|0, fall:!!f.falling, hp:f.hp };
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
  const big=[];
  for(let i=0;i<frames;i++){
    drive && drive(i);
    freezeRival();
    V.update(STEP);
    freezeRival();
    const cur=snap(get());
    const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
    const dax=cur.ax-prev.ax;
    const res = Math.max(Math.abs(ddx - dx), Math.abs(ddy), Math.abs(dpiv - dx));
    if(res > maxRes){ maxRes=res; maxEvt={i,res,ddx,ddy,dx,dax,ph:cur.ph,sheathe:cur.sheathe,rise:cur.rise,settle:cur.settle,guard:cur.guard,fall:cur.fall}; }
    if(res>=2.5) big.push({i,res: +res.toFixed(3), ddy:+ddy.toFixed(3), ddx:+ddx.toFixed(3), dx:+dx.toFixed(3), dax:+dax.toFixed(3), ph:cur.ph, sheathe:+cur.sheathe.toFixed(0), rise:+cur.rise.toFixed(0), settle:+cur.settle.toFixed(0), guard:cur.guard, fall:cur.fall, poseSwap: prev.ph!==cur.ph});
    prev=cur;
  }
  console.log(`\n## ${name}`);
  console.log(`  MAX residual=${maxRes.toFixed(3)}`, maxEvt?`@i=${maxEvt.i} ddy=${maxEvt.ddy.toFixed(2)} ph=${maxEvt.ph} sheathe=${maxEvt.sheathe.toFixed(0)}`:'');
  for(const b of big) console.log('  BIG', JSON.stringify(b));
}


isolate("A+D overlap last-key destRect", null, (i)=>{
  if(i<20) { V.keys.add("KeyD"); V.keys.delete("KeyA"); }
  else { V.keys.add("KeyD"); V.keys.add("KeyA"); }
}, 60);

isolate("A+D then release A keep D", null, (i)=>{
  V.keys.add("KeyD");
  if(i>=20 && i<40) V.keys.add("KeyA"); else V.keys.delete("KeyA");
}, 70);

isolate("A against left wall destRect", ()=>{ V.player.x=80; V.rival.x=700; }, (i)=>{
  V.keys.add("KeyA");
}, 80);

console.log("\n## A+D overlap functional");
boot(); wait(1700); freezeRival();
V.player.x=500; V.rival.x=900;
V.player.phase="idle"; V.player.gait=0; V.player.sheatheT=0; V.player.walkSettleT=0; V.player.walkRiseT=0; V.player.walkLeanGait=0;
V.keys.clear();
for(let k=0;k<3;k++){ freezeRival(); V.update(STEP); }
V.keys.add("KeyD");
let zeroGait=false, armedSettle=false, maxDrot=0, maxRes=0, leanSnap=0;
let prev = snap(V.player);
for(let i=0;i<70;i++){
  if(i>=20) V.keys.add("KeyA");
  freezeRival(); V.update(STEP); freezeRival();
  const cur=snap(V.player);
  const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
  const res=Math.max(Math.abs(ddx-dx), Math.abs(ddy), Math.abs(dpiv-dx));
  const drot=Math.abs(cur.rot-prev.rot);
  if(res>maxRes) maxRes=res;
  if(drot>maxDrot) maxDrot=drot;
  if(i>=20 && i<55){
    if(cur.g===0) zeroGait=true;
    if(cur.settle>0) armedSettle=true;
  }
  if(i===20) leanSnap=Math.abs(cur.lean-prev.lean);
  if(i===19 || i===20 || i===21 || i===29 || i===40 || i===55){
    console.log("  i="+i+" g="+cur.g+" lean="+cur.lean.toFixed(3)+" rot="+cur.rot.toFixed(4)+" rise="+cur.rise.toFixed(0)+" settle="+cur.settle.toFixed(0)+" res="+res.toFixed(3)+" drot="+(cur.rot-prev.rot).toFixed(4)+" dx="+dx.toFixed(2)+" x="+cur.x.toFixed(1));
  }
  prev=cur;
}
console.log("  zeroGait="+zeroGait+" armedSettle="+armedSettle+" maxDrot="+maxDrot.toFixed(4)+" maxRes="+maxRes.toFixed(3)+" leanSnap1f="+leanSnap.toFixed(3));

console.log("\n## A left wall functional");
boot(); wait(1700); freezeRival();
V.player.x=90; V.rival.x=700; V.keys.clear();
for(let k=0;k<3;k++){ freezeRival(); V.update(STEP); }
let gaitOn=0, stuck=0, minDx=999, maxLean=0, maxResW=0;
prev=snap(V.player);
for(let i=0;i<90;i++){
  V.keys.add("KeyA");
  freezeRival(); V.update(STEP); freezeRival();
  const cur=snap(V.player);
  const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
  const res=Math.max(Math.abs(ddx-dx), Math.abs(ddy), Math.abs(dpiv-dx));
  if(res>maxResW) maxResW=res;
  minDx=Math.min(minDx, cur.dx);
  maxLean=Math.max(maxLean, Math.abs(cur.rot));
  if(i>25){
    if(cur.g!==0) gaitOn++;
    if(cur.g!==0 && Math.abs(dx)<0.05) stuck++;
  }
  if(i===8 || i===20 || i===30 || i===50 || i===80){
    console.log("  i="+i+" x="+cur.x.toFixed(1)+" destDx="+cur.dx.toFixed(2)+" g="+cur.g+" lean="+cur.lean.toFixed(3)+" rot="+cur.rot.toFixed(4)+" rise="+cur.rise.toFixed(0)+" settle="+cur.settle.toFixed(0)+" res="+res.toFixed(3));
  }
  prev=cur;
}
console.log("  minDx="+minDx.toFixed(3)+" gaitOnAfter25="+gaitOn+" stuck="+stuck+" maxRes="+maxResW.toFixed(3)+" maxLean="+maxLean.toFixed(4));

console.log("\n## OPENING settle");
boot();
prev=snap(V.player);
let maxOpen=0, openAt=-1, openDdy=0;
for(let i=0;i<110;i++){
  V.update(STEP);
  const cur=snap(V.player);
  const ddy=cur.dy-prev.dy;
  const ddx=cur.dx-prev.dx, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x;
  const res=Math.max(Math.abs(ddx-dx), Math.abs(ddy), Math.abs(dpiv-dx));
  if(res>maxOpen){ maxOpen=res; openAt=i; openDdy=ddy; }
  if(Math.abs(ddy)>=1.5){
    console.log("  i="+i+" ddy="+ddy.toFixed(3)+" res="+res.toFixed(3)+" settleT="+V.settleT+" open="+V.openLeft.toFixed(0)+" dy="+cur.dy.toFixed(2));
  }
  prev=cur;
}
console.log("  MAX opening res="+maxOpen.toFixed(3)+" @i="+openAt+" ddy="+openDdy.toFixed(3));

console.log("\nDONE extra");
