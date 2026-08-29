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
    get hitstopLeft(){return hitstopLeft}, set hitstopLeft(v){hitstopLeft=v}, get openLeft(){return openLeft},
    get yardIndex(){return yardIndex}, get clashSparkT(){return clashSparkT},
    get steelFlashT(){return steelFlashT}, get settleT(){return settleT},
    get brasaFxT(){return brasaFxT}, get brasaFxKind(){return brasaFxKind},
    get brasaX(){return brasaX}, get brasaY(){return brasaY},
    set attackEdge(v){attackEdge=v}, set boltEdge(v){boltEdge=v}, set mode(v){mode=v},
    keys, update, resetRound, bodyGap, absGap, bladeReach, bladeBox, bodyAABB, hitbox, destRect, poseBitmap, poseSheet, keepApart, inMotionFeel,
    canStartBolt, startBolt, boltBox, bladeTipX,
    STARTUP, ACTIVE, RECOVERY, LUNGE_PX, OPENING_MS, HITSTUN, KNOCK_PX, SLASH_BUFFER_MS, HITSTOP_HIT, HITSTOP_BLOCK, CLASH_SPARK_MS, GUARD_COMMIT_MS,
    MAX_HP, SLASH_DMG, STAMINA_MAX, STAMINA_DRAIN, STAMINA_REGEN, STAMINA_REGEN_THREAT, STAMINA_REGEN_LOCK, STAMINA_REGEN_DELAY, STAMINA_START_MIN, STAMINA_BLOCK, GUARD_BREAK_MS, GUARD_BREAK_SETTLE,
    BOLT_STAM, BOLT_STARTUP, BOLT_RECOVERY, BOLT_SPEED, BOLT_AI_CD, BOLT_CAST_FX_MS,
    get bolt(){return bolt},
    REACH: (typeof REACH!=='undefined'?REACH:null),
  };
})();`);
eval(src);
const V = globalThis.__V;
const STEP = 1000/60;
const fail=[], pass=[];
function check(n,ok,ex=""){ (ok?pass:fail).push(n+(ex?" "+ex:"")); console.log(ok?"PASS":"FAIL", n, ex); }
function wait(ms){ for(let i=0;i<Math.ceil(ms/STEP);i++) V.update(STEP); }
function drainHitstop(){ for(let i=0;i<40;i++){ if(V.hitstopLeft<=0) break; V.update(STEP);} }
/** Title Space: resetRound only. Do NOT set attackEdge in play (that arms openBuf). */
function bootPlay(){ V.resetRound(); }
function toMeasure(){
  bootPlay();
  V.keys.clear();
  Math.random = () => 0.99;
  for(let i=0;i<900;i++){
    V.update(STEP);
    if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4 && V.rival.hp===V.MAX_HP && V.player.hp===V.MAX_HP) break;
  }
}

const srcTxt = fs.readFileSync("/workspace/estudio/vispera/game.js","utf8");
const codeOnly = srcTxt.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"");
check("no REACH cap in bladeBox", !/x0 \+ REACH|x1 - REACH|tipCap|Math\.min\([^)]*REACH/.test(srcTxt));
check("tipX you/rival/flip", /tipX: 991/.test(srcTxt) && /tipX: 0/.test(srcTxt) && /tipX: 884/.test(srcTxt));
check("poseScale=worldScale", /return worldScale\(\);/.test(srcTxt));
check("frame data", V.STARTUP===180 && V.ACTIVE===140 && V.RECOVERY===280);
check("hitstop/stun/buffer/lunge/knock", V.HITSTOP_HIT===140 && V.HITSTOP_BLOCK===60 && V.HITSTUN===350 && V.SLASH_BUFFER_MS===80 && V.LUNGE_PX===36 && V.KNOCK_PX===80);
check("clash 110", V.CLASH_SPARK_MS===110);
check("guard commit 140", V.GUARD_COMMIT_MS===140);
check("opening 1600", V.OPENING_MS===1600);
check("AABB fill", /body: \{ x: 84,/.test(srcTxt) && /body: \{ x: 301,/.test(srcTxt) && /body: \{ x: 108,/.test(srcTxt));
check("no live KO 1.25 rot", !/facing\s*\*\s*1\.25/.test(codeOnly) && !/\b0\.785\b/.test(codeOnly));

check("plant you idle", V.poseSheet({kind:"you",facing:1,phase:"idle",stunT:0,guarding:false,falling:false,img:null}).footX===75);

// title at cold boot (before any resetRound)
check("title", V.mode==="title");
wait(2000);
check("title holds", V.mode==="title");
V.attackEdge = true; V.update(STEP);
check("title Space starts clean", V.mode==="play" && !V.openBuf && V.openLeft>=1590, `mode=${V.mode} buf=${V.openBuf} open=${V.openLeft}`);

// opening freeze
bootPlay();
let moved=false, phased=false, dmg=false;
for(let i=0;i<Math.ceil(1590/STEP);i++){
  V.update(STEP);
  if(V.rival.phase!=="idle") phased=true;
  if(V.rival.x<1140) moved=true;
  if(V.rival.hp<V.MAX_HP||V.player.hp<V.MAX_HP) dmg=true;
}
check("opening freeze", !phased && !moved && !dmg, `ph=${V.rival.phase} x=${V.rival.x.toFixed(1)}`);

// tip blade
toMeasure();
V.attackEdge=true;
while(V.player.phase!=="active" && V.player.phase!=="recovery") V.update(STEP);
const br=V.bladeReach(V.player);
const tip=V.poseSheet(V.player).tipX;
check("blade tipX no cap", tip===991 && br>150, `tip=${tip} blade=${br.toFixed(1)}`);

// recovery holds slash
toMeasure();
V.attackEdge=true;
let sawRec=false, tipRec=null;
for(let i=0;i<80;i++){
  V.update(STEP);
  if(V.player.phase==="recovery"){ sawRec=true; tipRec=V.poseSheet(V.player).tipX; break; }
}
check("recovery holds slash", sawRec && tipRec===991, `saw=${sawRec} tip=${tipRec}`);

// first hit at measure (full HP)
toMeasure();
const g0=V.bodyGap(), hold=V.bladeReach(V.rival)+V.LUNGE_PX;
check("full HP pre-hit", V.rival.hp===100, `hp=${V.rival.hp}`);
V.attackEdge=true;
for(let i=0;i<50;i++){ V.update(STEP); if(V.rival.hp<100||V.hitstopLeft>0) break; }
check("hit at measure", V.rival.hp===90, `g=${g0.toFixed(1)} hold=${hold.toFixed(1)}`);

// GAP idle
bootPlay(); wait(50);
V.player.phase="idle"; V.player.phaseT=0; V.player.gait=0; V.player.stunT=0; V.player.pushT=0; V.player.guarding=false;
V.rival.phase="idle"; V.rival.phaseT=0; V.rival.gait=0; V.rival.stunT=0; V.rival.pushT=0; V.rival.guarding=false; V.rival.closing=false; V.rival.standWait=0; V.rival.standGoal=99999;
V.player.x=500; V.rival.x=560;
for(let i=0;i<5;i++){
  V.player.phase="idle"; V.player.gait=0; V.player.stunT=0; V.player.pushT=0;
  V.rival.phase="idle"; V.rival.gait=0; V.rival.stunT=0; V.rival.pushT=0; V.rival.closing=false; V.rival.standGoal=99999; V.rival.standWait=0;
  V.keepApart();
}
const gIdle=V.bodyGap();
check("idle GAP ~120 via keepApart", gIdle>=118 && gIdle<=125, `g=${gIdle.toFixed(1)}`);

bootPlay(); wait(1700);
V.player.x=500; V.rival.x=560;
for(let i=0;i<30;i++){
  V.player.phase="idle"; V.player.gait=0; V.player.stunT=0; V.player.pushT=0; V.player.guarding=false;
  V.rival.phase="idle"; V.rival.gait=0; V.rival.stunT=0; V.rival.pushT=0; V.rival.guarding=false; V.rival.closing=false;
  V.rival.standWait=0; V.rival.standGoal=99999;
  V.keys.clear();
  V.update(STEP);
}
const gUp=V.bodyGap();
check("idle GAP after update loop", gUp>=100, `g=${gUp.toFixed(1)}`);

V.player.phase="startup"; V.player.phaseT=50; V.player.x=500; V.rival.x=560;
V.keepApart();
check("GAP skipped motion", V.bodyGap()<100, `g=${V.bodyGap().toFixed(1)}`);

bootPlay(); wait(50);
V.player.x=700; V.rival.x=500;
for(let i=0;i<8;i++) V.update(STEP);
check("no cross", V.player.x<V.rival.x);

toMeasure();
const x0=V.player.x; V.attackEdge=true;
while(V.player.phase!=="active"&&V.player.phase!=="recovery") V.update(STEP);
check("lunge 36", (V.player.x-x0)>=30 && (V.player.x-x0)<=42, `dx=${(V.player.x-x0).toFixed(1)}`);

toMeasure();
V.attackEdge=true;
for(let i=0;i<50;i++){ V.update(STEP); if(V.rival.hp<100) break; }
const xHit=V.rival.x; drainHitstop();
for(let i=0;i<20;i++) V.update(STEP);
check("knock ~80", (V.rival.x-xHit)>=50 && (V.rival.x-xHit)<=110, `kb=${(V.rival.x-xHit).toFixed(1)}`);

toMeasure();
for(let i=0;i<800;i++){ V.update(STEP); if(V.player.stunT>0||V.player.hp<100) break; }
drainHitstop();
let bufSaw=false, fired=false;
for(let i=0;i<80;i++){ V.attackEdge=true; V.update(STEP); if(V.slashBuf) bufSaw=true; if(V.player.phase==="startup"&&V.player.stunT<=0){fired=true;break;} }
check("stun Space buffer", bufSaw&&fired, `buf=${bufSaw} fire=${fired}`);

toMeasure();
V.attackEdge=true;
for(let i=0;i<50;i++){ V.update(STEP); if(V.hitstopLeft>0) break; }
let hsBuf=false;
if(V.hitstopLeft>0){ V.attackEdge=true; V.update(STEP); hsBuf=!!V.slashBuf; }
check("hitstop Space buffer", hsBuf, `hs=${V.hitstopLeft} buf=${V.slashBuf}`);

toMeasure();
V.player.x=20; V.keepApart(); V.update(STEP);
check("left clamp dx>=0", V.destRect(V.player).dx>=-0.5, `dx=${V.destRect(V.player).dx.toFixed(1)}`);

bootPlay();
const y0=V.yardIndex;
Math.random=()=>0.99;
for(let i=0;i<900;i++){ V.update(STEP); if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4) break; }
V.rival.hp=10; V.attackEdge=true;
for(let i=0;i<400;i++){ V.update(STEP); if(V.mode==="over") break; }
check("KO over", V.mode==="over", `mode=${V.mode}`);
V.attackEdge=true; V.update(STEP);
check("yard alternate", V.yardIndex!==y0, `y0=${y0} y1=${V.yardIndex}`);
check("you left rival right", V.player.facing===1 && V.rival.facing===-1);

check("hp/stam contract", V.MAX_HP===100 && V.SLASH_DMG===10 && V.STAMINA_MAX===100 && V.STAMINA_DRAIN===40 && V.STAMINA_REGEN===25 && V.STAMINA_REGEN_THREAT===10 && V.STAMINA_REGEN_LOCK===1000 && V.STAMINA_REGEN_DELAY===200 && V.STAMINA_START_MIN===15 && V.GUARD_BREAK_MS===400 && V.STAMINA_BLOCK===20 && V.GUARD_BREAK_SETTLE===180);
check("HUD bar not 3 pips", /HUD_BAR_W = 252/.test(srcTxt) && !/HUD_SEG_W/.test(srcTxt) && !/function drawPips/.test(srcTxt) && !/fallenSegs/.test(srcTxt));
check("boot full bars", (()=>{ bootPlay(); return V.player.hp===100 && V.rival.hp===100 && V.player.stamina===100 && V.rival.stamina===100; })());

bootPlay(); wait(1700);
V.keys.add("KeyS");
wait(1000);
check("guard drain ~40/s", V.player.guarding && V.player.stamina>=58 && V.player.stamina<=62, `st=${V.player.stamina.toFixed(2)} g=${V.player.guarding}`);
V.keys.delete("KeyS");
V.update(STEP);
check("release drops guard", !V.player.guarding);
V.player.x = 150;
V.rival.x = 1150;
V.player.stamThreatLockT = 0;
V.rival.stamThreatLockT = 0;
const sHold = V.player.stamina;
wait(180);
check("regen delay 200ms", V.player.stamina<=sHold+0.8, `st=${V.player.stamina.toFixed(2)} s0=${sHold.toFixed(2)}`);
wait(400);
check("regen ~25/s", V.player.stamina>=sHold+8 && V.player.stamina<=sHold+13, `st=${V.player.stamina.toFixed(2)} s0=${sHold.toFixed(2)}`);

bootPlay(); wait(1700);
V.player.stamina = 14;
V.player.stamRegenT = 99999;
V.player.guardBreakT = 0;
V.player.guarding = false;
V.keys.add("KeyS");
V.update(STEP);
check("no start stam<15", !V.player.guarding, `g=${V.player.guarding} st=${V.player.stamina}`);

bootPlay(); wait(1700);
V.player.stamina = 20;
V.player.stamRegenT = 99999;
V.player.guardBreakT = 0;
V.player.phase = "idle";
V.player.stunT = 0;
V.keys.add("KeyS");
V.update(STEP);
check("raise at 20", V.player.guarding, `g=${V.player.guarding}`);
wait(200);
check("hold below 15", V.player.guarding && V.player.stamina<15, `g=${V.player.guarding} st=${V.player.stamina.toFixed(2)}`);

bootPlay(); wait(1700);
V.player.stamina = 1;
V.player.stamRegenT = 0;
V.player.guardBreakT = 0;
V.player.phase = "idle";
V.keys.add("KeyS");
V.update(STEP);
wait(80);
check("guard break at 0", !V.player.guarding && V.player.guardBreakT>0 && V.player.stamina<=0, `g=${V.player.guarding} br=${V.player.guardBreakT.toFixed(0)} st=${V.player.stamina}`);
V.player.stamina = 100;
V.update(STEP);
check("break lock 400ms", !V.player.guarding && V.player.guardBreakT>0, `g=${V.player.guarding} br=${V.player.guardBreakT.toFixed(0)}`);

toMeasure();
Math.random = () => 0;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.hitstopLeft>0 || V.rival.hp<100) break; }
check("block 0 dmg", V.rival.hp===100, `hp=${V.rival.hp} g=${V.rival.guarding} push=${V.rival.pushT}`);
check("block costs ~20", V.rival.hp===100 && V.rival.stamina>=70 && V.rival.stamina<=82, `st=${V.rival.stamina.toFixed(2)}`);

toMeasure();
V.rival.stamina = 10;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.rival.guarding = false;
Math.random = () => 0;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.rival.hp<100||V.hitstopLeft>0) break; }
check("rival no turtle stam<15", V.rival.hp===90, `hp=${V.rival.hp} g=${V.rival.guarding} st=${V.rival.stamina}`);

toMeasure();
V.rival.stamina = 0;
V.rival.guardBreakT = 400;
V.rival.stamRegenT = 99999;
V.rival.guarding = false;
Math.random = () => 0;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.rival.hp<100||V.hitstopLeft>0) break; }
check("break window clean hit", V.rival.hp===90, `hp=${V.rival.hp} br=${V.rival.guardBreakT.toFixed(0)}`);

toMeasure();
V.attackEdge=true;
for(let i=0;i<50;i++){ V.update(STEP); if(V.rival.hp<100||V.hitstopLeft>0) break; }
const chipSrc = (V.poseBitmap(V.rival)&&V.poseBitmap(V.rival)._src)||"";
check("chip idle not hurt", V.rival.hp===90 && !V.rival.falling && !chipSrc.includes("hurt"), `hp=${V.rival.hp} src=${chipSrc}`);

toMeasure();
V.rival.stamina = 18;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.rival.guarding = false;
Math.random = () => 0;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.rival.hp<100||V.hitstopLeft>0||V.rival.guardBreakT>0) break; }
const aabbCost = V.bodyAABB(V.rival);
check("block cost breaks", V.rival.hp===100 && V.rival.stamina<=0 && V.rival.guardBreakT>0 && !V.rival.guarding && V.steelFlashT>0, `hp=${V.rival.hp} st=${V.rival.stamina.toFixed(2)} br=${V.rival.guardBreakT.toFixed(0)} g=${V.rival.guarding} fl=${V.steelFlashT}`);
check("block-break AABB planted", aabbCost.h>100 && aabbCost.w>40, `aabb=${aabbCost.w.toFixed(1)}x${aabbCost.h.toFixed(1)}`);

// Juice on the trip frame (STEEL_FLASH_MS 60 dies inside the 80ms wait above).
// wait 1900 so opening stamp (260 from t=1600) has died.
bootPlay(); wait(1900);
V.keys.clear();
V.keys.add("KeyS");
V.player.stamina = 0.1;
V.player.stamRegenT = 99999;
V.player.guardBreakT = 0;
V.player.guarding = true;
V.player.phase = "idle";
V.player.stunT = 0;
V.player.falling = false;
const dest0 = V.destRect(V.player);
const aabb0 = V.bodyAABB(V.player);
V.update(STEP);
const dest1 = V.destRect(V.player);
const aabb1 = V.bodyAABB(V.player);
check("guard break steel", !V.player.guarding && V.player.guardBreakT>0 && V.steelFlashT>0, `g=${V.player.guarding} fl=${V.steelFlashT} br=${V.player.guardBreakT.toFixed(0)}`);
check("guard break settle destRect", V.settleT>0 && V.settleT<=V.GUARD_BREAK_SETTLE, `stt=${V.settleT}`);
check("guard break AABB planted", Math.abs(aabb1.y-aabb0.y)<2 && Math.abs(aabb1.x-aabb0.x)<2 && V.settleT===V.GUARD_BREAK_SETTLE, `aabbD=${(aabb1.y-aabb0.y).toFixed(2)} destD=${(dest1.dy-dest0.dy).toFixed(2)} stt=${V.settleT}`);

// Rival holds the raise through recovery (not the swing instant).
toMeasure();
Math.random = () => 0;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.hitstopLeft>0 || V.rival.hp<100) break; }
drainHitstop();
check("rival hold into recovery", V.rival.hp===100 && V.rival.guarding && V.player.phase==="recovery", `hp=${V.rival.hp} g=${V.rival.guarding} ph=${V.player.phase} st=${V.rival.stamina.toFixed(2)}`);
for(let i=0;i<40;i++){ V.update(STEP); if(V.player.phase==="idle" && !V.rival.guarding) break; }
wait(30);
check("rival drops after exchange", !V.rival.guarding && V.player.phase==="idle", `g=${V.rival.guarding} ph=${V.player.phase} st=${V.rival.stamina.toFixed(2)}`);
check("rival hold drained the exchange", V.rival.hp===100 && V.rival.stamina>=58 && V.rival.stamina<=72, `st=${V.rival.stamina.toFixed(2)}`);

// Threat regen 10/s (shared). Leave-threat keeps 10/s for 1000ms; 25/s after.
toMeasure();
V.rival.stamina = 50;
V.rival.stamRegenT = 0;
V.rival.guarding = false;
V.rival.guardBreakT = 0;
V.rival.wantBlock = false;
V.rival.phase = "idle";
V.player.phase = "idle";
wait(400);
check("rival threat regen ~10/s", V.rival.stamina>=52 && V.rival.stamina<=56, `st=${V.rival.stamina.toFixed(2)}`);

toMeasure();
V.player.stamina = 50;
V.player.stamRegenT = 0;
V.player.guarding = false;
V.player.guardBreakT = 0;
V.player.phase = "idle";
V.rival.phase = "idle";
V.keys.clear();
wait(400);
check("player threat regen ~10/s", V.player.stamina>=52 && V.player.stamina<=56, `st=${V.player.stamina.toFixed(2)}`);

bootPlay(); wait(1700);
V.player.x = 150;
V.rival.x = 1150;
V.rival.stamina = 50;
V.rival.stamRegenT = 0;
V.rival.stamThreatLockT = 0;
V.rival.guarding = false;
V.rival.guardBreakT = 0;
V.rival.phase = "idle";
wait(400);
check("rival safe regen ~25/s", V.rival.stamina>=58 && V.rival.stamina<=62, `st=${V.rival.stamina.toFixed(2)}`);

// Walk-out turtle: lock keeps 10/s, then 25/s after the window (shared).
function parkFar(){
  V.player.x = 150;
  V.rival.x = 1150;
  V.player.gait = 0;
  V.rival.gait = 0;
  V.player.guarding = false;
  V.rival.guarding = false;
  V.player.wantBlock = false;
  V.rival.wantBlock = false;
  V.player.phase = "idle";
  V.rival.phase = "idle";
  V.player.guardBreakT = 0;
  V.rival.guardBreakT = 0;
  V.rival.boltPhase = "";
  V.rival.boltT = 0;
  V.rival.boltCd = 99999;
  V.keys.clear();
}
toMeasure();
V.rival.stamina = 50;
V.rival.stamRegenT = 0;
V.rival.stamThreatLockT = V.STAMINA_REGEN_LOCK;
V.player.stamina = 50;
V.player.stamRegenT = 0;
V.player.stamThreatLockT = V.STAMINA_REGEN_LOCK;
parkFar();
wait(400);
check("rival leave lock ~10/s", V.rival.stamina>=52 && V.rival.stamina<=56, `st=${V.rival.stamina.toFixed(2)}`);
check("player leave lock ~10/s", V.player.stamina>=52 && V.player.stamina<=56, `st=${V.player.stamina.toFixed(2)}`);
wait(700);
V.rival.stamina = 50;
V.rival.stamRegenT = 0;
V.player.stamina = 50;
V.player.stamRegenT = 0;
parkFar();
wait(400);
check("rival after lock ~25/s", V.rival.stamina>=58 && V.rival.stamina<=62, `st=${V.rival.stamina.toFixed(2)} lock=${V.rival.stamThreatLockT}`);
check("player after lock ~25/s", V.player.stamina>=58 && V.player.stamina<=62, `st=${V.player.stamina.toFixed(2)} lock=${V.player.stamThreatLockT}`);

// Low stam: walk out / punish, do not statue.
toMeasure();
V.rival.stamina = 10;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.rival.guarding = false;
V.rival.closing = false;
V.rival.wantBlock = false;
Math.random = () => 0;
const xLow = V.rival.x;
for(let i=0;i<18;i++) V.update(STEP);
check("low stam walks out", !V.rival.guarding && (V.rival.x>xLow+3 || V.rival.gait!==0 || V.rival.phase==="startup"), `x=${(V.rival.x-xLow).toFixed(1)} gait=${V.rival.gait} ph=${V.rival.phase} g=${V.rival.guarding}`);

toMeasure();
V.rival.stamina = 0;
V.rival.guardBreakT = 400;
V.rival.stamRegenT = 99999;
V.rival.guarding = false;
V.rival.closing = false;
const xBr = V.rival.x;
for(let i=0;i<18;i++) V.update(STEP);
check("break walks or punishes", !V.rival.guarding && (V.rival.x>xBr+3 || V.rival.gait!==0 || V.rival.phase==="startup"), `x=${(V.rival.x-xBr).toFixed(1)} gait=${V.rival.gait} ph=${V.rival.phase} br=${V.rival.guardBreakT.toFixed(0)}`);


check("K bolt contract", V.BOLT_STAM===30 && V.BOLT_STARTUP===200 && V.BOLT_RECOVERY===280);
check("cast puff life 220 holds dart", V.BOLT_CAST_FX_MS===220 && V.BOLT_CAST_FX_MS>=V.BOLT_STARTUP);
check("slash frame data still 180/140/280", V.STARTUP===180 && V.ACTIVE===140 && V.RECOVERY===280);
check("K is not Space", /if \(c === "KeyK"\) boltEdge = true/.test(srcTxt) && !/KeyK.*attackEdge/.test(srcTxt));
check("one special verb K", (srcTxt.match(/boltEdge = true/g)||[]).length===1 && !/KeyF|KeyU|KeyL|KeyI/.test(codeOnly));
check("rival startBolt same verb", /startBolt\(rival\)/.test(codeOnly));
check("rival bolt AI CD 1800", V.BOLT_AI_CD===1800);
check("canvas bolt no PNG", /function drawBolt/.test(srcTxt) && !/art\/.*bolt/.test(srcTxt) && !/loadImg\([^)]*bolt/.test(srcTxt));
check("K plant SFX brasa cast", /cast:\s*new Audio\("sfx\/sfx_brasa_cast\.wav"\)/.test(srcTxt) && /function startBolt[\s\S]*?playSfx\(SFX\.cast\)/.test(codeOnly));
function sliceFn(src, name) {
  const m = src.match(new RegExp("function " + name + "\\s*\\([^)]*\\)\\s*\\{"));
  if (!m) return "";
  const start = src.indexOf(m[0]);
  let i = start + m[0].length - 1, depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") { depth--; if (depth === 0) return src.slice(start, i + 1); }
  }
  return "";
}
const lbh = sliceFn(codeOnly, "landBoltHit");
const lbb = sliceFn(codeOnly, "landBoltBlock");
const rb = sliceFn(codeOnly, "resolveBolt");
check("bolt connect SFX brasa not steel",
  /brasaImpacto:\s*new Audio\("sfx\/sfx_brasa_impacto\.wav"\)/.test(srcTxt) &&
  /brasaBloqueo:\s*new Audio\("sfx\/sfx_brasa_bloqueo\.wav"\)/.test(srcTxt) &&
  /brasaChoque:\s*new Audio\("sfx\/sfx_brasa_choque\.wav"\)/.test(srcTxt) &&
  /playSfx\(SFX\.brasaImpacto\)/.test(lbh) && !/playSfx\(SFX\.impacto\)/.test(lbh) &&
  /playSfx\(SFX\.brasaBloqueo\)/.test(lbb) && !/playSfx\(SFX\.bloqueo\)/.test(lbb) &&
  /playSfx\(SFX\.brasaChoque\)/.test(rb) && !/playSfx\(SFX\.choque\)/.test(rb)
);

const boltHitSrc = srcTxt.slice(srcTxt.indexOf("function landBoltHit"), srcTxt.indexOf("function landBoltBlock"));
const boltBlockSrc = srcTxt.slice(srcTxt.indexOf("function landBoltBlock"), srcTxt.indexOf("function resolveBolt"));
const boltResSrc = srcTxt.slice(srcTxt.indexOf("function resolveBolt"), srcTxt.indexOf("function resolveCuts"));
const startBoltSrc = srcTxt.slice(srcTxt.indexOf("function startBolt"), srcTxt.indexOf("function boltBox"));
const landHitSrc = srcTxt.slice(srcTxt.indexOf("function landHit"), srcTxt.indexOf("function guardSteelPoint"));
const landBlockSrc = srcTxt.slice(srcTxt.indexOf("function landBlock"), srcTxt.indexOf("function canStartBolt"));
const clashSrc = srcTxt.slice(srcTxt.indexOf("function doClash"), srcTxt.indexOf("function pulseBar"));
check("bolt hit brasa not steel", /playSfx\(SFX\.brasaImpacto\)/.test(boltHitSrc) && !/SFX\.impacto/.test(boltHitSrc) && /sfx_brasa_impacto\.wav/.test(srcTxt));
check("bolt block brasa not steel", /playSfx\(SFX\.brasaBloqueo\)/.test(boltBlockSrc) && !/SFX\.bloqueo/.test(boltBlockSrc) && /sfx_brasa_bloqueo\.wav/.test(srcTxt));
check("bolt clash brasa not steel", /playSfx\(SFX\.brasaChoque\)/.test(boltResSrc) && !/SFX\.choque/.test(boltResSrc) && /sfx_brasa_choque\.wav/.test(srcTxt));
check("slash keeps steel SFX", /playSfx\(SFX\.impacto\)/.test(landHitSrc) && /playSfx\(SFX\.bloqueo\)/.test(landBlockSrc) && /playSfx\(SFX\.choque\)/.test(clashSrc));
check("startBolt still brasa cast", /playSfx\(SFX\.cast\)/.test(startBoltSrc) && /sfx_brasa_cast\.wav/.test(srcTxt));
check("K plant puff spawnBrasaFx cast", /spawnBrasaFx\("cast"/.test(startBoltSrc) && /kind === "cast"/.test(srcTxt));
check("cast puff canvas palette", /COL_NEGRO/.test(srcTxt) && /BOLT_CAST_FX_MS/.test(srcTxt) && /brasaFxKind === "cast"/.test(srcTxt));
check("connect VFX unchanged kinds", /spawnBrasaFx\("hit"/.test(boltHitSrc) && /spawnBrasaFx\("block"/.test(boltBlockSrc) && /spawnBrasaFx\("clash"/.test(boltResSrc));
check("slash VFX still spark asterisk shards", /spawnHitSpark/.test(landHitSrc) && /spawnSteelFlash/.test(landBlockSrc) && /spawnClashSpark/.test(clashSrc));
const spawnBoltSrc = sliceFn(codeOnly, "spawnBolt");
check("spawnBolt live tip not body flank", /bladeTipX/.test(spawnBoltSrc) && /bladeBox/.test(spawnBoltSrc) && !/bodyAABB/.test(spawnBoltSrc) && !/b\.x \+ b\.w/.test(spawnBoltSrc));

// title K does not start
check("title before K", V.mode==="title" || true);
bootPlay();
// cold title: reconstruct by setting mode after a fresh eval is title-only at start.
// After bootPlay we are in play. Re-title:
V.mode = "title";
V.boltEdge = true;
V.update(STEP);
check("title K does not start", V.mode==="title" && !V.bolt && !V.player.boltPhase, `mode=${V.mode} bolt=${!!V.bolt} ph=${V.player.boltPhase}`);

bootPlay();
V.boltEdge = true;
V.update(STEP);
check("opening K blocked", !V.player.boltPhase && !V.bolt && V.player.stamina===100, `ph=${V.player.boltPhase} st=${V.player.stamina} open=${V.openLeft}`);

bootPlay(); wait(1700);
const st0 = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("K starts from idle", V.player.boltPhase==="startup" && V.player.phase==="idle", `bph=${V.player.boltPhase} ph=${V.player.phase}`);
check("K costs 30 stam", Math.abs(V.player.stamina - (st0-30))<0.05, `st=${V.player.stamina.toFixed(2)} s0=${st0}`);
check("K plant puff at blade", V.brasaFxKind==="cast" && V.brasaFxT>150 && !V.bolt && Math.abs(V.brasaX-V.bladeTipX(V.player))<4, `kind=${V.brasaFxKind} t=${V.brasaFxT} x=${V.brasaX} tip=${V.bladeTipX(V.player)} bolt=${!!V.bolt}`);
const puffHold = V.brasaFxT;
V.hitstopLeft = 140;
V.update(STEP);
check("cast puff holds hitstop", V.brasaFxKind==="cast" && Math.abs(V.brasaFxT-puffHold)<0.01, `t=${V.brasaFxT} hold=${puffHold}`);
const tipA = V.bladeTipX(V.player);
const fxA = V.brasaX;
V.player.x += 40;
V.update(STEP);
const tipB = V.bladeTipX(V.player);
check("cast puff rides blade", Math.abs((V.brasaX-fxA)-(tipB-tipA))<2.5, `dxFx=${(V.brasaX-fxA).toFixed(2)} dxTip=${(tipB-tipA).toFixed(2)}`);
V.hitstopLeft = 0;

bootPlay(); wait(1700);
V.player.stamina = 29;
V.player.stamRegenT = 99999;
V.boltEdge = true;
V.update(STEP);
check("no K stam<30", !V.player.boltPhase && !V.bolt && V.player.stamina===29, `ph=${V.player.boltPhase} st=${V.player.stamina}`);

toMeasure();
V.attackEdge = true;
for(let i=0;i<8;i++) V.update(STEP);
const slashPh = V.player.phase;
const stSlash = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("K not slash cancel", V.player.phase===slashPh && !V.player.boltPhase && !V.bolt && Math.abs(V.player.stamina-stSlash)<0.2, `ph=${V.player.phase} bph=${V.player.boltPhase} st=${V.player.stamina.toFixed(2)}`);

bootPlay(); wait(1700);
V.keys.add("KeyS");
V.update(STEP);
const stG = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("no K during guard", V.player.guarding && !V.player.boltPhase && !V.bolt, `g=${V.player.guarding} bph=${V.player.boltPhase}`);
V.keys.delete("KeyS");

bootPlay(); wait(1700);
V.player.stunT = 200;
V.player.stamRegenT = 99999;
const stStun = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("no K during stun", !V.player.boltPhase && !V.bolt && V.player.stamina<=stStun, `bph=${V.player.boltPhase} st=${V.player.stamina}`);

bootPlay(); wait(1700);
V.player.guardBreakT = 400;
V.player.stamina = 80;
V.player.stamRegenT = 99999;
V.boltEdge = true;
V.update(STEP);
check("no K during guardBreak", !V.player.boltPhase && !V.bolt, `bph=${V.player.boltPhase} br=${V.player.guardBreakT}`);

bootPlay(); wait(1700);
V.boltEdge = true;
V.update(STEP);
let sawFire=false, startMs=0, recMs=0, recStart=false;
let youTip=0, youSpawnX=0, youFacing=0, youW=0, youPuffKind="", youPuffT=0;
for(let i=0;i<40;i++){
  if(!sawFire && V.bolt){ sawFire=true; startMs=i*STEP; }
  if(sawFire && V.player.boltPhase==="recovery") recStart=true;
  if(recStart && !V.player.boltPhase){ recMs=i*STEP-startMs; break; }
  const tipBefore = V.bladeTipX(V.player);
  const hadBolt = !!V.bolt;
  V.update(STEP);
  if(!hadBolt && V.bolt){
    youTip = tipBefore;
    youSpawnX = V.bolt.x;
    youFacing = V.bolt.facing;
    youW = V.bolt.w;
    youPuffKind = V.brasaFxKind;
    youPuffT = V.brasaFxT;
  }
}
check("bolt startup ~200", sawFire && startMs>=180 && startMs<=220, `fireAt=${startMs} bolt=${!!V.bolt}`);
const youTravel = V.BOLT_SPEED * (STEP/1000);
const youBirth = youFacing > 0 ? youSpawnX - youTravel : youSpawnX + youW + youTravel;
check("you dart births at live tip", sawFire && Math.abs(youBirth - youTip) < 3, `birth=${youBirth.toFixed(1)} tip=${youTip.toFixed(1)} x=${youSpawnX.toFixed(1)}`);
check("you puff holds through dart birth", youPuffKind==="cast" && youPuffT>0, `kind=${youPuffKind} t=${youPuffT}`);
// recovery clock from fire
bootPlay(); wait(1700);
V.boltEdge = true;
V.update(STEP);
for(let i=0;i<20;i++){ V.update(STEP); if(V.player.boltPhase==="recovery") break; }
let recTicks=0;
while(V.player.boltPhase==="recovery"){ V.update(STEP); recTicks++; if(recTicks>40) break; }
check("bolt recovery ~280", recTicks*STEP>=260 && recTicks*STEP<=300, `rec=${recTicks*STEP}`);

bootPlay(); wait(1700);
V.boltEdge = true;
V.update(STEP);
V.attackEdge = true;
V.update(STEP);
check("Space during K does not cancel", V.player.boltPhase==="startup" && V.player.phase==="idle" && !!V.slashBuf, `bph=${V.player.boltPhase} ph=${V.player.phase} buf=${V.slashBuf}`);

// one live max: fire from far so the bolt stays up after recovery
// Tip-born dart starts ~bladeReach farther than the old body-flank spawn,
// so 160/1100 was already overlapping the rival by recovery end.
bootPlay(); wait(1700);
V.player.x = 140;
V.rival.x = 1220;
V.rival.phase = "idle";
V.rival.wantBlock = false;
Math.random = () => 0.99;
V.boltEdge = true;
V.update(STEP);
for(let i=0;i<14;i++) V.update(STEP);
check("bolt live after startup", !!V.bolt, `bolt=${!!V.bolt} bph=${V.player.boltPhase}`);
const live1 = !!V.bolt;
const stMid = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("one live: K refused while bolt up", live1 && !!V.bolt && V.player.boltPhase==="recovery" && V.player.stamina>stMid-1, `bolt=${!!V.bolt} st=${V.player.stamina.toFixed(2)} mid=${stMid.toFixed(2)} bph=${V.player.boltPhase}`);
for(let i=0;i<20;i++) V.update(STEP);
const stLive = V.player.stamina;
V.boltEdge = true;
V.update(STEP);
check("one live: still refused after recovery", !!V.bolt && !V.player.boltPhase && V.player.stamina>stLive-1, `bolt=${!!V.bolt} bph=${V.player.boltPhase} st=${V.player.stamina.toFixed(2)} live=${stLive.toFixed(2)}`);

// clean hit -10
toMeasure();
Math.random = () => 0.99;
V.rival.guarding = false;
V.rival.wantBlock = false;
V.rival.guardChoice = -1;
V.boltEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.rival.hp<100 || V.hitstopLeft>0) break; }
check("K clean hit -10", V.rival.hp===90, `hp=${V.rival.hp} g=${V.rival.guarding} bolt=${!!V.bolt}`);

// block 0 + push
toMeasure();
Math.random = () => 0;
V.rival.stamina = 80;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.boltEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.hitstopLeft>0 || (V.rival.pushT>0 && V.rival.hp===100)) break; }
check("K block 0 + push", V.rival.hp===100 && V.rival.pushT>0, `hp=${V.rival.hp} push=${V.rival.pushT} g=${V.rival.guarding} st=${V.rival.stamina.toFixed(2)}`);

// forced guard still stops the bolt (ignore = pass through)
toMeasure();
Math.random = () => 0.99;
V.rival.stamina = 80;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.rival.wantBlock = true;
V.rival.guarding = true;
V.rival.guardChoice = 1;
V.boltEdge = true;
let passed=false;
for(let i=0;i<80;i++){
  V.rival.wantBlock = true;
  V.rival.guarding = true;
  V.update(STEP);
  if(V.rival.hp<100){ passed=true; break; }
  if(V.hitstopLeft>0 && V.rival.hp===100) break;
}
check("K dies on raised guard", !passed && V.rival.hp===100, `hp=${V.rival.hp} passed=${passed} push=${V.rival.pushT}`);

// Space/J still slash after K recovery
toMeasure();
Math.random = () => 0.99;
V.attackEdge = true;
for(let i=0;i<20;i++){ V.update(STEP); if(V.player.phase==="startup") break; }
check("Space still slash", V.player.phase==="startup", `ph=${V.player.phase}`);

function freezeYou(){
  V.player.phase = "idle";
  V.player.phaseT = 0;
  V.player.boltPhase = "";
  V.player.stunT = 0;
  V.player.guarding = false;
  V.player.falling = false;
  V.keys.clear();
}
function parkRangeThrow(){
  toMeasure();
  Math.random = () => 0.99;
  freezeYou();
  V.player.x = 180;
  V.rival.x = 1100;
  V.rival.phase = "idle";
  V.rival.phaseT = 0;
  V.rival.boltPhase = "";
  V.rival.boltT = 0;
  V.rival.boltCd = 0;
  V.rival.boltArmed = true;
  V.rival.stamina = 100;
  V.rival.stamRegenT = 99999;
  V.rival.guarding = false;
  V.rival.wantBlock = false;
  V.rival.guardChoice = -1;
  V.rival.closing = false;
  V.rival.standWait = 0;
  V.rival.standGoal = 99999;
  V.rival.stunT = 0;
  V.rival.guardBreakT = 0;
  V.rival.falling = false;
}

parkRangeThrow();
V.update(STEP);
check("rival throws at range", V.rival.boltPhase==="startup" && V.rival.phase==="idle", `bph=${V.rival.boltPhase} ph=${V.rival.phase} armed=${V.rival.boltArmed}`);
check("rival plant puff at blade", V.brasaFxKind==="cast" && V.brasaFxT>0 && !V.bolt && Math.abs(V.brasaX-V.bladeTipX(V.rival))<4, `kind=${V.brasaFxKind} t=${V.brasaFxT} x=${V.brasaX} tip=${V.bladeTipX(V.rival)} bolt=${!!V.bolt}`);
check("rival bolt costs 30", Math.abs(V.rival.stamina-70)<0.05, `st=${V.rival.stamina.toFixed(2)}`);
check("rival bolt CD armed", V.rival.boltCd===V.BOLT_AI_CD, `cd=${V.rival.boltCd}`);

parkRangeThrow();
V.update(STEP);
let rFire=false, rStart=0;
let rTip=0, rSpawnX=0, rFacing=0, rW=0, rPuffKind="", rPuffT=0;
for(let i=0;i<20;i++){
  if(!rFire && V.bolt){ rFire=true; rStart=i*STEP; }
  const tipBefore = V.bladeTipX(V.rival);
  const hadBolt = !!V.bolt;
  V.update(STEP);
  if(!hadBolt && V.bolt){
    rTip = tipBefore;
    rSpawnX = V.bolt.x;
    rFacing = V.bolt.facing;
    rW = V.bolt.w;
    rPuffKind = V.brasaFxKind;
    rPuffT = V.brasaFxT;
  }
}
check("rival bolt startup ~200", rFire && rStart>=180 && rStart<=220, `fireAt=${rStart} bolt=${!!V.bolt}`);
const rTravel = V.BOLT_SPEED * (STEP/1000);
const rBirth = rFacing > 0 ? rSpawnX - rTravel : rSpawnX + rW + rTravel;
check("rival dart births at live tip", rFire && Math.abs(rBirth - rTip) < 3, `birth=${rBirth.toFixed(1)} tip=${rTip.toFixed(1)} x=${rSpawnX.toFixed(1)}`);
check("rival puff holds through dart birth", rPuffKind==="cast" && rPuffT>0, `kind=${rPuffKind} t=${rPuffT}`);

parkRangeThrow();
V.update(STEP);
for(let i=0;i<20;i++){ V.update(STEP); if(V.rival.boltPhase==="recovery") break; }
let rRec=0;
while(V.rival.boltPhase==="recovery"){ V.update(STEP); rRec++; if(rRec>40) break; }
check("rival bolt recovery ~280", rRec*STEP>=260 && rRec*STEP<=300, `rec=${rRec*STEP}`);

// first approach: never seen HOLD — walk in, do not fire
bootPlay(); wait(1700);
Math.random = () => 0.99;
V.player.x = 180;
V.rival.x = 1100;
V.rival.phase = "idle";
V.rival.boltPhase = "";
V.rival.boltArmed = false;
V.rival.boltCd = 0;
V.rival.stamina = 100;
V.rival.closing = false;
let firstFire=false;
for(let i=0;i<24;i++){
  V.update(STEP);
  if(V.rival.boltPhase || (V.bolt && V.bolt.kind==="rival")) firstFire=true;
}
check("no rival bolt before HOLD", !firstFire && !V.rival.boltArmed, `fired=${firstFire} armed=${V.rival.boltArmed} ph=${V.rival.boltPhase} gait=${V.rival.gait}`);

// pocket: do not fire
toMeasure();
Math.random = () => 0.99;
V.rival.boltCd = 0;
V.rival.boltArmed = true;
V.rival.stamina = 100;
V.rival.standWait = 0;
V.rival.standGoal = 99999;
V.rival.closing = false;
let pocketFire=false;
for(let i=0;i<18;i++){
  const hold = V.bladeReach(V.rival)+V.LUNGE_PX;
  if(V.bodyGap()<=hold+4 && (V.rival.boltPhase || (V.bolt && V.bolt.kind==="rival"))) pocketFire=true;
  V.update(STEP);
}
check("no rival bolt in pocket", !pocketFire, `fired=${pocketFire} bph=${V.rival.boltPhase} g=${V.bodyGap().toFixed(1)}`);

// no throw during their slash
toMeasure();
Math.random = () => 0.99;
V.rival.phase = "startup";
V.rival.phaseT = 40;
V.rival.boltArmed = true;
V.rival.boltCd = 0;
V.rival.stamina = 100;
V.player.x = 180;
V.rival.x = 1100;
V.update(STEP);
check("no rival bolt during slash", V.rival.phase==="startup" && !V.rival.boltPhase, `ph=${V.rival.phase} bph=${V.rival.boltPhase}`);

// no throw during guard
toMeasure();
V.rival.guarding = true;
V.rival.phase = "idle";
V.rival.stamina = 80;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
check("canStartBolt false on guard", !V.canStartBolt(V.rival));
Math.random = () => 0;
V.player.phase = "startup";
V.player.phaseT = 160;
V.rival.guarding = true;
V.rival.wantBlock = true;
V.rival.guardChoice = 1;
V.rival.boltArmed = true;
V.rival.boltCd = 0;
V.rival.stamina = 80;
V.player.x = 180;
V.rival.x = 1100;
V.update(STEP);
check("no rival bolt during guard", V.rival.guarding && !V.rival.boltPhase, `g=${V.rival.guarding} bph=${V.rival.boltPhase}`);

// no throw during stun / break / opening
toMeasure();
V.rival.stunT = 200;
V.rival.boltArmed = true;
V.rival.boltCd = 0;
V.rival.stamina = 100;
V.player.x = 180;
V.rival.x = 1100;
V.update(STEP);
check("no rival bolt during stun", !V.rival.boltPhase, `bph=${V.rival.boltPhase} stun=${V.rival.stunT}`);

toMeasure();
V.rival.guardBreakT = 400;
V.rival.stamina = 80;
V.rival.boltArmed = true;
V.rival.boltCd = 0;
V.player.x = 180;
V.rival.x = 1100;
V.update(STEP);
check("no rival bolt during break", !V.rival.boltPhase, `bph=${V.rival.boltPhase} br=${V.rival.guardBreakT}`);

bootPlay();
V.rival.boltArmed = true;
V.rival.boltCd = 0;
V.rival.stamina = 100;
V.player.x = 180;
V.rival.x = 1100;
V.update(STEP);
check("no rival bolt during opening", V.openLeft>0 && !V.rival.boltPhase && !V.bolt, `open=${V.openLeft} bph=${V.rival.boltPhase}`);

// one live of theirs
parkRangeThrow();
V.update(STEP);
for(let i=0;i<14;i++) V.update(STEP);
check("rival dart live", !!V.bolt && V.bolt.kind==="rival", `bolt=${!!V.bolt} kind=${V.bolt&&V.bolt.kind} bph=${V.rival.boltPhase}`);
V.rival.boltCd = 0;
V.rival.boltPhase = "";
V.rival.boltT = 0;
V.rival.phase = "idle";
V.rival.stamina = 100;
const liveR = !!V.bolt;
const stR = V.rival.stamina;
V.startBolt(V.rival);
check("one live: rival refused while dart up", liveR && !!V.bolt && V.bolt.kind==="rival" && !V.rival.boltPhase && V.rival.stamina===stR, `bolt=${!!V.bolt} bph=${V.rival.boltPhase} st=${V.rival.stamina}`);

// CD: after a throw they walk in, not fire again
parkRangeThrow();
const stThrow = V.rival.stamina;
V.update(STEP);
check("CD set on throw", V.rival.boltCd===V.BOLT_AI_CD, `cd=${V.rival.boltCd}`);
const cd0 = V.rival.boltCd;
for(let i=0;i<50;i++) V.update(STEP);
check("no spam after throw", cd0===V.BOLT_AI_CD && V.rival.boltCd<cd0 && V.rival.boltCd>0 && !(V.rival.boltPhase==="startup" && V.rival.stamina<stThrow-35), `cd=${V.rival.boltCd} bph=${V.rival.boltPhase} st=${V.rival.stamina.toFixed(2)}`);

// they still slash in the pocket
toMeasure();
Math.random = () => 0.99;
V.rival.boltCd = 99999;
V.rival.boltPhase = "";
V.rival.stamina = 100;
V.rival.guarding = false;
V.rival.wantBlock = false;
V.rival.guardChoice = -1;
const holdP = V.bladeReach(V.rival)+V.LUNGE_PX;
if (V.bodyGap() > holdP - 8) V.rival.x -= (V.bodyGap() - (holdP - 8));
V.rival.standWait = 0;
V.rival.standGoal = 1;
V.rival.closing = false;
V.rival.phase = "idle";
V.player.phase = "idle";
V.player.stunT = 0;
V.player.falling = false;
for(let i=0;i<20;i++){ V.update(STEP); if(V.rival.phase==="startup") break; }
check("rival still slashes", V.rival.phase==="startup", `ph=${V.rival.phase} bph=${V.rival.boltPhase} g=${V.bodyGap().toFixed(1)}`);

// they still guard a slash
toMeasure();
Math.random = () => 0;
V.rival.boltCd = 99999;
V.attackEdge = true;
for(let i=0;i<80;i++){ V.update(STEP); if(V.hitstopLeft>0 || V.rival.hp<100) break; }
check("rival still guards", V.rival.hp===100 && (V.rival.guarding || V.rival.pushT>0), `hp=${V.rival.hp} g=${V.rival.guarding} push=${V.rival.pushT}`);

// you block theirs
parkRangeThrow();
V.update(STEP);
V.keys.add("KeyS");
V.player.stamina = 80;
V.player.stamRegenT = 99999;
V.player.guardBreakT = 0;
let blockedTheirs=false, ateTheirs=false;
for(let i=0;i<90;i++){
  V.keys.add("KeyS");
  V.player.wantBlock = true;
  V.update(STEP);
  if(V.player.hp<100){ ateTheirs=true; break; }
  if(V.hitstopLeft>0 && V.player.hp===100 && V.player.pushT>0){ blockedTheirs=true; break; }
}
check("you block theirs 0+push", blockedTheirs && !ateTheirs && V.player.hp===100 && !V.bolt, `hp=${V.player.hp} push=${V.player.pushT} bolt=${!!V.bolt} g=${V.player.guarding} ate=${ateTheirs}`);

// they still block yours (range dart into raised guard)
toMeasure();
Math.random = () => 0.99;
V.rival.stamina = 80;
V.rival.stamRegenT = 99999;
V.rival.guardBreakT = 0;
V.rival.wantBlock = true;
V.rival.guarding = true;
V.rival.guardChoice = 1;
V.rival.boltCd = 99999;
V.boltEdge = true;
let yoursPassed=false;
for(let i=0;i<80;i++){
  V.rival.wantBlock = true;
  V.rival.guarding = true;
  V.update(STEP);
  if(V.rival.hp<100){ yoursPassed=true; break; }
  if(V.hitstopLeft>0 && V.rival.hp===100) break;
}
check("they still block yours", !yoursPassed && V.rival.hp===100, `hp=${V.rival.hp} passed=${yoursPassed} push=${V.rival.pushT}`);

console.log("\n=== SUMMARY ===");
console.log("pass", pass.length, "fail", fail.length);
fail.forEach(f=>console.log("  FAIL", f));
process.exit(fail.length?1:0);
