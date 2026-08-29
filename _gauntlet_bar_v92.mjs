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
    set attackEdge(v){attackEdge=v}, set mode(v){mode=v},
    keys, update, resetRound, bodyGap, absGap, bladeReach, bladeBox, bodyAABB, hitbox, destRect, poseBitmap, poseSheet, keepApart, inMotionFeel,
    STARTUP, ACTIVE, RECOVERY, LUNGE_PX, OPENING_MS, HITSTUN, KNOCK_PX, SLASH_BUFFER_MS, HITSTOP_HIT, HITSTOP_BLOCK, CLASH_SPARK_MS, GUARD_COMMIT_MS,
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
  Math.random = () => 0.99;
  for(let i=0;i<900;i++){
    V.update(STEP);
    if(V.modeT>1600 && V.bodyGap()<=V.bladeReach(V.rival)+V.LUNGE_PX+4 && V.rival.hp===3 && V.player.hp===3) break;
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
  if(V.rival.hp<3||V.player.hp<3) dmg=true;
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
check("full HP pre-hit", V.rival.hp===3, `hp=${V.rival.hp}`);
V.attackEdge=true;
for(let i=0;i<50;i++){ V.update(STEP); if(V.rival.hp<3||V.hitstopLeft>0) break; }
check("hit at measure", V.rival.hp===2, `g=${g0.toFixed(1)} hold=${hold.toFixed(1)}`);

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
for(let i=0;i<50;i++){ V.update(STEP); if(V.rival.hp<3) break; }
const xHit=V.rival.x; drainHitstop();
for(let i=0;i<20;i++) V.update(STEP);
check("knock ~80", (V.rival.x-xHit)>=50 && (V.rival.x-xHit)<=110, `kb=${(V.rival.x-xHit).toFixed(1)}`);

toMeasure();
for(let i=0;i<800;i++){ V.update(STEP); if(V.player.stunT>0||V.player.hp<3) break; }
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
V.rival.hp=1; V.attackEdge=true;
for(let i=0;i<400;i++){ V.update(STEP); if(V.mode==="over") break; }
check("KO over", V.mode==="over", `mode=${V.mode}`);
V.attackEdge=true; V.update(STEP);
check("yard alternate", V.yardIndex!==y0, `y0=${y0} y1=${V.yardIndex}`);
check("you left rival right", V.player.facing===1 && V.rival.facing===-1);

console.log("\n=== SUMMARY ===");
console.log("pass", pass.length, "fail", fail.length);
fail.forEach(f=>console.log("  FAIL", f));
process.exit(fail.length?1:0);
