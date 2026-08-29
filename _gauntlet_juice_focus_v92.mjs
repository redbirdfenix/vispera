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
function full(f){
  const r=V.destRect(f);
  return { dx:r.dx, dy:r.dy, rot:r.rot, pivX:r.pivX, x:f.x, ph:f.phase, g:f.gait, guard:!!f.guarding, stun:f.stunT|0,
    sheathe:f.sheatheT||0, walkT:f.walkT||0, settle:f.walkSettleT||0, rise:f.walkRiseT||0 };
}
function isolate(name, setup, drive, frames){
  boot(); wait(1700); freezeRival();
  V.player.x=480; V.rival.x=780;
  V.player.phase="idle"; V.player.gait=0; V.player.guarding=false; V.player.stunT=0; V.player.sheatheT=0;
  V.player.walkSettleT=0; V.player.walkRiseT=0; V.player.walkT=0;
  V.keys.clear(); freezeRival();
  for(let k=0;k<3;k++){ freezeRival(); V.update(STEP); }
  setup && setup();
  let prev = full(V.player);
  console.log(`\n## ${name}`);
  console.log(`  start: dy=${prev.dy.toFixed(2)} dx=${prev.dx.toFixed(2)} ph=${prev.ph}`);
  let maxRes=0;
  for(let i=0;i<frames;i++){
    drive && drive(i);
    freezeRival();
    V.update(STEP);
    freezeRival();
    const cur=full(V.player);
    const ddx=cur.dx-prev.dx, ddy=cur.dy-prev.dy, dpiv=cur.pivX-prev.pivX, dx=cur.x-prev.x, drot=cur.rot-prev.rot;
    const res = Math.max(Math.abs(ddx - dx), Math.abs(ddy), Math.abs(dpiv - dx));
    if(res>=1.5 || Math.abs(ddy)>=1.5 || Math.abs(drot)>=0.02){
      console.log(`  i=${i} res=${res.toFixed(2)} ddx=${ddx.toFixed(2)} ddy=${ddy.toFixed(2)} dxPlant=${dx.toFixed(2)} drot=${drot.toFixed(4)} | ph=${cur.ph} g=${cur.g} guard=${cur.guard} sheathe=${cur.sheathe.toFixed(0)} rise=${cur.rise.toFixed(0)} settle=${cur.settle.toFixed(0)}`);
    }
    if(res>maxRes) maxRes=res;
    prev=cur;
  }
  console.log(`  MAX residual=${maxRes.toFixed(3)}`);
}

// Space from idle
isolate("SPACE from idle", null, (i)=>{
  if(i===5) V.attackEdge=true;
}, 50);

// S from idle (already in probe2 but reconfirm)
isolate("S from idle", null, (i)=>{
  if(i===5) V.keys.add("KeyS");
  if(i===30) V.keys.delete("KeyS");
}, 50);

// sheathe mid-hump then guard (guard keeps sheathe)
isolate("SHEATHE mid then S", ()=>{
  V.player.sheatheT=90;
}, (i)=>{
  if(i===3) V.keys.add("KeyS");
  if(i===25) V.keys.delete("KeyS");
}, 40);

// keepApart release residual (slide is intentional 160ms; look for destRect pop beyond plant)
isolate("keepApart release feel", ()=>{
  V.player.x=500; V.rival.x=560; // cramped
  for(let k=0;k<10;k++){ freezeRival(); V.update(STEP); }
  // shove rival far so gap ease releases
  V.rival.x=900;
}, (i)=>{
  // hold still
}, 40);

// breath dump: hold idle long then walk start (breath crossfade)
isolate("breath dump walk start", ()=>{
  // idle long enough for breath peak
  for(let k=0;k<90;k++){ freezeRival(); V.update(STEP); }
}, (i)=>{
  if(i>=5) V.keys.add("KeyD");
}, 50);

// recovery sheathe envelope peak frame-to-frame (already ~2)
isolate("sheathe envelope alone", ()=>{
  V.player.phase="idle"; V.player.sheatheT=140;
}, null, 30);

console.log("\nDONE");
