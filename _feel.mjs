import fs from "fs";
global.window = global;
global.requestAnimationFrame = () => 0;
class FakeImg {
  constructor(){this.complete=true;this.naturalWidth=1186;this.naturalHeight=926;this._src="";}
  set src(v){ this._src=v;
    if(v.includes("rival_flip")){this.naturalWidth=885;this.naturalHeight=956;}
    else if(v.includes("rival")){this.naturalWidth=877;this.naturalHeight=945;}
    else if(v.includes("courtyard")){this.naturalWidth=1536;this.naturalHeight=1024;}
    else {this.naturalWidth=1186;this.naturalHeight=926;}
  }
  get src(){return this._src;}
}
global.Image = FakeImg;
global.Audio = class { constructor(){this.volume=1;} cloneNode(){return new global.Audio();} play(){return Promise.resolve();} pause(){} };
const ctxStub = new Proxy({}, { get: () => () => {}, set: () => true });
global.document = { getElementById: () => ({width:1280,height:720,getContext:()=>ctxStub}), createElement: () => ({width:1,height:1,getContext:()=>ctxStub}) };
global.addEventListener = () => {};

let src = fs.readFileSync("/workspace/estudio/vispera/game.js","utf8");
src = src.replace("(() => {\n  \"use strict\";", "globalThis.__V = (() => {\n  \"use strict\";");
src = src.replace("  requestAnimationFrame(loop);\n})();", `
  return {
    get player(){return player}, get rival(){return rival},
    get mode(){return mode}, get modeT(){return modeT},
    get slashBuf(){return slashBuf}, get hitstopLeft(){return hitstopLeft},
    get yardIndex(){return yardIndex},
    set attackEdge(v){attackEdge=v},
    keys, update, resetRound, bodyGap, bladeReach, bladeBox, bodyAABB, destRect, poseSheet, poseBitmap,
    LUNGE_PX, STARTUP, ACTIVE, RECOVERY, OPENING_MS, HITSTUN, KNOCK_PX,
  };
})();`);
eval(src);
const V = globalThis.__V;
const STEP=1000/60;
Math.random = () => 0.99; // never guard

function play(){ V.attackEdge=true; V.update(STEP); }
function wait(ms){ for(let i=0;i<Math.ceil(ms/STEP);i++) V.update(STEP); }
function toHold(){
  play();
  for(let i=0;i<800;i++){
    V.update(STEP);
    const hold = V.bladeReach(V.rival)+V.LUNGE_PX;
    if(V.modeT>1600 && V.bodyGap()<=hold+2) return {i, hold, g:V.bodyGap()};
  }
  return {i:800, hold:V.bladeReach(V.rival)+V.LUNGE_PX, g:V.bodyGap()};
}

// 1) walk-in stops at HOLD (not overshoot into GAP then freeze)
V.resetRound();
const h = toHold();
const overshoot = h.g < h.hold - 20;
console.log("HOLD stop", {gap:h.g.toFixed(1), hold:h.hold.toFixed(1), overshoot, rph:V.rival.phase, close:V.rival.closing, gait:V.rival.gait});

// 2) cornered cuts (pin rival right)
V.resetRound(); play(); wait(1700);
V.rival.x = 1200; V.player.x = 1000;
V.rival.phase="idle"; V.rival.closing=false;
let cut=false, walkedOut=false;
for(let i=0;i<180;i++){
  const x0=V.rival.x;
  V.update(STEP);
  if(V.rival.phase==="startup") cut=true;
  if(V.rival.x > x0+1) walkedOut=true;
  if(cut) break;
}
console.log("cornered", {cut, walkedOut, rph:V.rival.phase, rx:V.rival.x.toFixed(1), gap:V.bodyGap().toFixed(1)});

// 3) after block: closing then cut (force guard)
V.resetRound();
Math.random = () => 0.1; // guard
const th = toHold();
V.attackEdge=true;
let blocked=false, sawClose=false, sawCut=false, airWhiff=false;
for(let i=0;i<200;i++){
  V.update(STEP);
  if(V.rival.guarding) blocked=true;
  if(blocked && V.rival.closing) sawClose=true;
  if(blocked && !V.rival.guarding && V.rival.phase==="startup"){
    sawCut=true;
    // if gap much larger than hold+shove, air
    const hold=V.bladeReach(V.rival)+V.LUNGE_PX;
    if(V.bodyGap() > hold+50) airWhiff=true;
    break;
  }
}
console.log("post-block", {blocked, sawClose, sawCut, airWhiff, gap:V.bodyGap().toFixed(1), rph:V.rival.phase});

// 4) after hit: closing
Math.random = () => 0.99;
V.resetRound(); toHold();
V.attackEdge=true;
for(let i=0;i<60;i++){ V.update(STEP); if(V.rival.hp<3) break; }
for(let i=0;i<30;i++){ if(V.hitstopLeft<=0) break; V.update(STEP); }
let closing=false;
for(let i=0;i<90;i++){ V.update(STEP); if(V.rival.closing||V.rival.phase==="startup"){ closing=true; break; } }
console.log("after hit close", {closing, rph:V.rival.phase, close:V.rival.closing, gap:V.bodyGap().toFixed(1)});

// 5) Space in early recovery lost? (not required by bar — late 80 only)
V.resetRound(); Math.random=()=>0.99; toHold();
V.attackEdge=true;
while(V.player.phase!=="recovery") V.update(STEP);
// press immediately at recovery start
V.attackEdge=true; V.update(STEP);
console.log("early recovery Space", {buf:V.slashBuf, ph:V.player.phase, phaseT:V.player.phaseT.toFixed(0)});

// 6) rematch yard flip via KO
V.resetRound(); Math.random=()=>0.99; toHold();
const y0=V.yardIndex;
V.rival.hp=1; V.attackEdge=true;
for(let i=0;i<300;i++){ V.update(STEP); if(V.mode==="over") break; }
for(let i=0;i<80;i++){ V.update(STEP); if(V.mode==="over") break; }
console.log("over1", V.mode, "yard", V.yardIndex);
V.attackEdge=true; V.update(STEP); // rematch
console.log("rematch yard", {from:y0, to:V.yardIndex, mode:V.mode});

// 7) knock into left wall not eating knock / plant
V.resetRound(); Math.random=()=>0.99; play(); wait(1700);
V.player.x=80; V.rival.x=300;
// get player hit
for(let i=0;i<400;i++){
  V.update(STEP);
  if(V.player.hp<3) break;
}
const dxBefore = V.destRect(V.player).dx;
for(let i=0;i<40;i++) V.update(STEP);
console.log("near-wall after hit", {dx:V.destRect(V.player).dx.toFixed(1), x:V.player.x.toFixed(1), dx0:dxBefore.toFixed(1), hp:V.player.hp});

// 8) HOLD numbers vs tip
V.resetRound(); play(); wait(50);
V.player.phase="active"; V.player.phaseT=20;
V.rival.phase="active"; V.rival.phaseT=20;
console.log("blade reaches active", {
  you: V.bladeReach(V.player).toFixed(1),
  rival: V.bladeReach(V.rival).toFixed(1),
  youBox: V.bladeBox(V.player),
  rivalBox: V.bladeBox(V.rival),
});
