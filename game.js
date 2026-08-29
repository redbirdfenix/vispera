/* Víspera — P0. Frame data Combate locked. No retocar ms.
 * Walk 240. Tajo 180 / 140 / 280. Hitbox solo en active.
 * Tajo limpio −10. Tajo a guarda 0 + empujón (1 hurtbox, 150ms).
 * Guarda S, de cara, raise 0, no andar ni tajar.
 * Choque: overlap active → 0 dmg, recovery 200ms.
 * AABB. Hitstop 140 hit / 60 block. Hitstun 350. Restart Espacio o R.
 * HP 100 barra. KO al 0. Guarda stamina 100: drain 40/s, regen 25/s tras 200ms, 10/s in threat + 1000ms leave lock (shared), break 400ms, no start <15.
 * Block −20 stam (hold drain still 40/s). Break at 0: steel asterisk on the guard + tiny destRect settle. AABB planted.
 * Rival guarda: commit 140 / 40%, hold through the exchange (swing+recovery), not the swing instant. Threat regen 10/s. Leave-threat keeps 10/s for 1000ms (shared lock; 25/s only after, idle/out). Stam<15 or break: walk out / punish. Never hold S forever.
 * Plant: destRect+AABB use each pose's real back foot (hurt is the planted boot).
 * KO ~45° is the hurt pose. No extra canvas rot (1.25 stacked to a log). Recovery holds slash.
 * Feel: sides locked, lunge 36, knockback 80/180, slash buffer 80, sword hitbox.
 * Blade = opaque tipX (no REACH cap). poseScale=world. Idle body GAP 120.
 * Recrop fill: body AABB retuned to new visual body (same plant). you slash tipX 991.
 * Rival HOLD = blade+lunge (not 320 leftover). Walk-in stops at HOLD, not HOLD+40 leftover. Cornered = cut, not walk-out freeze.
 * Walk: weight shift + lean around the planted foot. No hop. Hurtbox stays planted.
* Walk pose continuous across idle/walk sheet (no ox snap).
 * Walk reads as steps: 240ms plant, cadence pauses on boot, stride 14. No hop.
 * destRect plant stays with AABB: leftover gait ox (stride 14) does not ride destRect; Space / gait-drop used to snap ~13px.
 * KO settles onto stones (oy drop) + grit at 0.72 fall. Extra destRect rot stays 0.
 * Slash scale matches idle body (head, not blur). AABB stays idle-sized.
 * Clean hit: flesh spark at the cut (block already had steel, clash already had shards).
 * Plant grit: wet-stone stamp + specks at destRect plant on walk step and lunge stomp. No new art.
 * Space buffers whole startup/active/recovery (not only last 80ms). Bar still locks SLASH_BUFFER_MS=80.
 * slashBuf waits for measure (same hold gate as openBuf). Immediate fire after
 * a connected cut was always ~10px short (knock 80 − lunge 36) — whoosh in air.
 * Walk LEAN 0.05 (locked). Idle breath destRect-only. Title prompts Espacio.
 * Walk release eases leftover lean/dip (~160ms destRect-only). AABB planted. Combat poses still lock.
 * Walk start eases into that same lean/dip (~160ms destRect-only). First frame used to plant
 * rot 0.05 + oy 2 in one tick (a stomp). AABB stays planted. LEAN/DIP targets locked.
 * Sheathe destRect lift (-5) keeps through walk. Walking used to cut it in one tick
 * (5px drop, plus leftover breath ~6.6). Sheet still planted-only. Space still locks.
 * Sheathe envelope is a 0→−5→0 hump (sin). Linear T/MS planted −5 the same
 * slash sheet on recovery→idle (~7px with breath). AABB planted.
 * Walk grit stamps the boot plant (passing ends, abs cadence 320). A/D
 * start used to puff dust while destRect rise was still ~0 (no weight).
 * Walk-stop grit waits for weight (rise 160ms or a planted boot). A tap
 * used to puff on release with rise still ~0. Lunge stomp stays.
 * gaitWalkOn sheet unchanged.
 * Guard does not dump leftover sheathe lift. S mid-hump used to plant
 * destRect +5–7px in one tick (envelope + breath). Envelope keeps
 * through guarda (destRect-only). Space mid-hump keeps the envelope too
 * (startup no longer zeros sheatheT); stun still cuts.
 * Idle breath crossfades with walk rise/settle (destRect-only). A/D used to
 * drop the 1.6px chest in one tick before lean/dip had risen.
 * A/D reverse eases destRect lean 160ms +1→−1 (walkLeanGait). Gait sign
 * used to flip rot ~0.09 in one tick (~5°). AABB still follows gait. Combat
 * poses still lock (no lean into slash/guarda).
 * A+D overlap (the real reverse) used to zero gait: stop grit + settle +
 * new rise, so the 160ms lean ease never ran. Last walk key wins.
 * Walk start cadence sits on the plant curve (0.34). walkT<=0 used
 * to return 1 — first frame 4px slip, then ~2px (destRect rise still 0).
 * Left wall eats the A step (destRect dx clamp) but used to keep gait
 * −1: lean/dip/sheet cycle on a stuck plant. GAP 120 already zeros
 * gait; the wall now matches. AABB / clamp unchanged.
 * Inward walk stops at idle GAP 120. Walking skipped the pocket, so
 * releasing D next to a planted rival teleported both plants ~11–50px.
 * Recovery→idle GAP 120 slides (~160ms), not an 18px plant teleport. Idle-at-rest still instant 120.
 * Walk-stop / shove→idle GAP 120 slides the same 160ms (live dt). Pocket used to
 * teleport ±10px when ease was 0. Bar keepApart() no-dt stays instant.
 * Over prompts Espacio (KO stays on screen, no card covering the crumple).
 * Winner finishes the cut after KO (no freeze mid-slash) then sheathes 140ms. destRect-only dip.
 * KO fall keeps plant x (no 280/900 teleport). Soft edge nudge only if sheet clips.
 * Hurt crumple is KO only (hp 0 / falling). Stun keeps idle + flash + destRect flinch — the 45° sheet is a death, not a chip.
 * HUD life bar (hueso on pizarra) + thin óxido stamina. Drain/flash, no 3 pips.
 * Stam floor 15: hueso tick + pizarra-dim fill below (S no raise). Guard-break 400ms keeps that dead look even past 15. Both fighters.
 * Clash bounce: no instant ±90 teleport. Spark stays on the blades through
 * hitstop; bodies slide CLASH_STEP over KNOCK_MS after, same as hit knock.
 * After freeze the clash spark rides the live blade tip (planted world xy
 * sat in the ~55px gap for the leftover 110ms fade).
 * Flesh spark same: inset vs live hurt (cutPoint/AABB), not planted world xy
 * (after hitstop the body knocks ~80px and the 140ms fade hung in air).
 * Camera punch: 10px horizontal, courtyard scales just enough overscan
 * (no black edge, floor stays planted, no new art). Envelope squares.
 * Block asterisk sits on blade∩guard (cutPoint), not chest center.
 * Shove grit: boots scrape on block push and hit knock (clash already had it).
 * Opening now: wet-stone plant grit + destRect settle on title Space and when
 * OPENING_MS lifts. AABB stays planted. Title Space still starts only.
 * Spark hold: flesh/clash intensity frozen across hitstop; fade resumes after.
 * Hit flash + steel asterisk hold through freeze the same way (120 used to
 * die inside HITSTOP_HIT 140; block asterisk 60 died with HITSTOP_BLOCK).
 * Grit specks + HUD bar-drain clocks hold through freeze the same way
 * (dust and bar flash used to keep flying while time was frozen).
 * After freeze the block asterisk rides live cutPoint / blade (inset vs
 * the shoved guard when they part), not planted world xy (the 60ms fade
 * sat still while the 150ms shove left ~70px of empty air).
 * Camera punch + opening settle hold through freeze (shake duration
 * used to equal hitstop, so the slam faded to 0 before bodies moved).
 * K bolt: 200 startup / 280 recovery, -30 stam, one live dart (shared).
 * Horizontal brasa/oxido from the live blade tip (same tipX as the plant puff). Canvas only. Space/J slash.
 * K does not cancel a tajo. Same verb on the rival: range only (beyond HOLD),
 * not in the pocket, not during their slash/guard/stun/break/KO/opening.
 * After they throw, BOLT_AI_CD 1800 so they are not a fireball robot.
 * They still slash and guard. You block theirs; they block yours.
 * K plant (you + rival) plays brasa cast, not tajo whoosh. Space/J keep whoosh.
 * K connect (you + rival) plays brasa impacto / bloqueo / choque, not tajo steel.
 * Space/J keep impacto / bloqueo / choque.
 * K connect VFX is brasa, not tajo: ember puff / heat lick / ember scatter.
 * Same juice as slash sparks: hitstop gate, ride live contact, no hang in air.
 * Space/J keep flesh spark, steel asterisk, clash shards.
 * K plant (you + rival) also puffs brasa/oxido at the live blade tip
 * (canvas, spawnBrasaFx "cast") so the 200ms plant reads. Life 220 so the puff holds through dart birth (was 180, died ~20ms early). Same puff, no second spawn. Dart births from that same live tip.
 * Hitstop-safe, rides the blade. Dies after the first dart frames. Does not replace the dart.
 * Connect VFX stays ember puff / heat lick / ember scatter.
 */


(() => {
  "use strict";

  const W = 1280;
  const H = 720;
  const STEP = 1000 / 60;

  const WALK = 240;
  const WALK_STEP_MS = 320;
  const WALK_DIP_PX = 2;
  const WALK_LEAN = 0.05;
  const WALK_SETTLE_MS = 160;
  const GAP_EASE_MS = 160;
  const STARTUP = 180;
  const ACTIVE = 140;
  const RECOVERY = 280;
  const HITSTOP_HIT = 140;
  const HITSTOP_BLOCK = 60;
  const CLASH_RECOVERY = 200;
  const GUARD_PUSH_MS = 150;
  const TITLE_MS = 1400;
  const FALL_MS = 720;
  const OPENING_MS = 1600;
  const MAX_HP = 100;
  const SLASH_DMG = 10;
  const STAMINA_MAX = 100;
  const STAMINA_DRAIN = 40;
  const STAMINA_REGEN = 25;
  const STAMINA_REGEN_THREAT = 10;
  const STAMINA_REGEN_LOCK = 1000;
  const STAMINA_REGEN_DELAY = 200;
  const STAMINA_START_MIN = 15;
  const STAMINA_BLOCK = 20;
  const GUARD_BREAK_MS = 400;
  const GUARD_BREAK_SETTLE = 180;
  const HITSTUN = 350;
  const STANDOFF_MIN = 400;
  const STANDOFF_MAX = 800;
  const GUARD_COMMIT_MS = 140;
  const HIT_FLASH_MS = 120;
  const STEEL_FLASH_MS = 60;
  const CLASH_SPARK_MS = 110;
  const HIT_SPARK_MS = 140;
  const LUNGE_PX = 36;
  const KNOCK_PX = 80;
  const KNOCK_MS = 180;
  const SLASH_BUFFER_MS = 80;
  const SHEATHE_MS = 140;
  const SETTLE_MS = 260;
  const BOLT_STAM = 30;
  const BOLT_STARTUP = 200;
  const BOLT_RECOVERY = 280;
  const BOLT_SPEED = 880;
  const BOLT_W = 58;
  const BOLT_H = 13;
  const BOLT_AI_CD = 1800;
  const BOLT_CAST_FX_MS = 220;

  const CLASH_STEP = 90;
  const PUNCH_PX = 12;
  const FLOOR_Y = 658;
  const YOU_H = 350;

  const DESIGN = {
    you:       { w: 1186, h: 926, footX: 75,  footY: 921, body: { x: 84,  y: 18, w: 493, h: 890 } },
    rival:     { w: 877,  h: 945, footX: 729, footY: 940, body: { x: 301, y: 16, w: 470, h: 910 } },
    rivalFlip: { w: 885,  h: 956, footX: 150, footY: 947, body: { x: 108, y: 16, w: 470, h: 920 } },
  };

  const POSE = {
    you: {
      idle:   { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
      windup: { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
      slash:  { w: 1186, h: 926, footX: 75,  footY: 921, top: 4, tipX: 991 },
      block:  { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
      hurt:   { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
      walk:   { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
    },
    rival: {
      idle:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      windup: { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      slash:  { w: 877,  h: 945, footX: 729, footY: 940, top: 4, tipX: 0 },
      block:  { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      hurt:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      walk:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
    },
    rivalFlip: {
      idle:   { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
      windup: { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
      slash:  { w: 885,  h: 956, footX: 150, footY: 947, top: 8, tipX: 884 },
      block:  { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
      hurt:   { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
      walk:   { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
    },
  };

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const octx = off.getContext("2d");

  function loadImg(src) {
    const im = new Image();
    im.src = src;
    return im;
  }
  function ready(im) {
    return !!(im && im.complete && im.naturalWidth > 0);
  }

  function playSfx(a) {
    if (!a) return;
    try {
      const n = a.cloneNode();
      n.volume = 0.85;
      n.play();
    } catch (err) {}
  }
  const SFX = {
    whoosh: new Audio("sfx/sfx_whoosh_tajo.wav"),
    cast: new Audio("sfx/sfx_brasa_cast.wav"),
    impacto: new Audio("sfx/sfx_impacto_carne.wav"),
    bloqueo: new Audio("sfx/sfx_bloqueo_acero.wav"),
    choque: new Audio("sfx/sfx_choque_clash.wav"),
    brasaImpacto: new Audio("sfx/sfx_brasa_impacto.wav"),
    brasaBloqueo: new Audio("sfx/sfx_brasa_bloqueo.wav"),
    brasaChoque: new Audio("sfx/sfx_brasa_choque.wav"),
    ko: new Audio("sfx/sfx_ko_caida.wav"),
  };

  const ART = {
    yard: loadImg("art/courtyard.png"),
    yard2: loadImg("art/courtyard2.png"),
    you: loadImg("art/you.png"),
    rival: loadImg("art/rival.png"),
    rivalFlip: loadImg("art/rival_flip.png"),
    youWindup: loadImg("art/you_windup.png"),
    youSlash: loadImg("art/you_slash.png"),
    youBlock: loadImg("art/you_block.png"),
    rivalWindup: loadImg("art/rival_windup.png"),
    rivalSlash: loadImg("art/rival_slash.png"),
    rivalBlock: loadImg("art/rival_block.png"),
    rivalFlipWindup: loadImg("art/rival_flip_windup.png"),
    rivalFlipSlash: loadImg("art/rival_flip_slash.png"),
    rivalFlipBlock: loadImg("art/rival_flip_block.png"),
    youHurt: loadImg("art/you_hurt.png"),
    rivalHurt: loadImg("art/rival_hurt.png?v=56"),
    rivalFlipHurt: loadImg("art/rival_flip_hurt.png?v=56"),
    youWalk: loadImg("art/you_walk.png"),
    rivalWalk: loadImg("art/rival_walk.png?v=56"),
    rivalFlipWalk: loadImg("art/rival_flip_walk.png?v=56"),
  };

  const keys = new Set();
  let requestRestart = false;
  let requestStart = false;
  let attackEdge = false;
  let boltEdge = false;
  let bolt = null;
  let sfxUnlocked = false;
  let lastWalkCode = "";
  let walkHeldA = false;
  let walkHeldD = false;

  function unlockSfx() {
    if (sfxUnlocked) return;
    sfxUnlocked = true;
    for (const a of Object.values(SFX)) {
      try {
        a.muted = true;
        const p = a.play();
        const restore = () => {
          try {
            a.pause();
            a.currentTime = 0;
            a.muted = false;
          } catch (err) {}
        };
        if (p && typeof p.then === "function") p.then(restore).catch(restore);
        else restore();
      } catch (err) {}
    }
  }

  window.addEventListener("keydown", (e) => {
    const c = e.code;
    if (c === "Space" || c === "KeyA" || c === "KeyD" || c === "KeyJ" || c === "KeyR" || c === "KeyS" || c === "KeyK") {
      e.preventDefault();
    }
    if (e.repeat) return;
    keys.add(c);
    unlockSfx();
    if (c === "KeyR") requestRestart = true;
    if ((c === "Space" || c === "KeyJ") && !keys.has("KeyS")) attackEdge = true;
    if (c === "KeyK") boltEdge = true;
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.code);
  });
  window.addEventListener("pointerdown", () => {
    unlockSfx();
  });

  function worldScale() {
    return YOU_H / DESIGN.you.h;
  }

  function sheetOf(f) {
    if (f.kind === "you") return DESIGN.you;
    return f.facing > 0 ? DESIGN.rivalFlip : DESIGN.rival;
  }

  function dressRival(f) {
    f.facing = -1;
    f.img = ART.rival;
  }

  function poseBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    const wind = you ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
    const slash = you ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
    const block = you ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
    const hurt = you ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
    if ((f.falling || f.hp <= 0) && ready(hurt)) return hurt;
    if (f.guarding && ready(block)) return block;
    if (f.boltPhase === "startup" && ready(wind)) return wind;
    if (f.phase === "startup" && ready(wind)) return wind;
    if (f.phase === "active" && ready(slash)) return slash;
    if (f.phase === "recovery" && ready(slash)) return slash;
    if (sheathing(f) && ready(slash)) return slash;
    const walk = you ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
    if (gaitWalkOn(f) && ready(walk)) return walk;
    return f.img;
  }

  function poseFamily(f) {
    if (f.kind === "you") return POSE.you;
    return f.facing > 0 ? POSE.rivalFlip : POSE.rival;
  }

  function poseSheet(f) {
    const fam = poseFamily(f);
    const you = f.kind === "you";
    const right = f.facing > 0;
    const wind = you ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
    const slash = you ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
    const block = you ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
    const hurt = you ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
    if ((f.falling || f.hp <= 0) && ready(hurt)) return fam.hurt;
    if (f.guarding && ready(block)) return fam.block;
    if (f.boltPhase === "startup" && ready(wind)) return fam.windup;
    if (f.phase === "startup" && ready(wind)) return fam.windup;
    if (f.phase === "active" && ready(slash)) return fam.slash;
    if (f.phase === "recovery" && ready(slash)) return fam.slash;
    if (sheathing(f) && ready(slash)) return fam.slash;
    const walk = you ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
    if (gaitWalkOn(f) && ready(walk)) return fam.walk;
    return fam.idle;
  }

  function usingDedicatedPose(f) {
    const img = poseBitmap(f);
    return ready(img) && img !== f.img;
  }

  function makeFighter(kind) {
    const you = kind === "you";
    const f = {
      kind,
      img: ART.you,
      facing: you ? 1 : -1,
      x: you ? 150 : 1150,
      phase: "idle",
      phaseT: 0,
      falling: false,
      fallT: 0,
      hp: MAX_HP,
      stamina: STAMINA_MAX,
      stamRegenT: 0,
      stamThreatLockT: 0,
      guardBreakT: 0,
      hudGhost: MAX_HP,
      hudFlashT: 0,
      wantBlock: false,
      guarding: false,
      pushT: 0,
      pushVel: 0,
      stunT: 0,
      standWait: 0,
      standGoal: 0,
      guardChoice: 0,
      gait: 0,
      walkT: 0,
      walkSettleT: 0,
      walkSettleRot: 0,
      walkSettleOy: 0,
      walkRiseT: 0,
      walkLeanGait: 0,
      walkPlanted: false,
      closing: false,
      sheatheT: 0,
      boltPhase: "",
      boltT: 0,
      boltCd: 0,
      boltArmed: false,
    };
    if (!you) dressRival(f);
    return f;
  }

  let mode = "title";
  let modeT = 0;
  let player = makeFighter("you");
  let rival = makeFighter("rival");
  let koTarget = null;
  let shake = 0;
  let shakeDur = 0;
  let shakeMag = 0;
  let shakeDir = 1;
  let hitstopLeft = 0;
  let hitFlashT = 0;
  let steelFlashT = 0;
  let steelX = 0;
  let steelY = 0;
  let steelAtkYou = true;
  let steelHomeYou = false;
  let steelWoundDX = 0;
  let steelWoundDY = 0;
  let clashSparkT = 0;
  let clashX = 0;
  let clashY = 0;
  let clashHomeYou = true;
  let clashTipDX = 0;
  let clashTipDY = 0;
  let clashShards = [];
  let hitSparkT = 0;
  let hitSparkX = 0;
  let hitSparkY = 0;
  let hitHomeYou = true;
  let hitWoundDX = 0;
  let hitWoundDY = 0;
  let hitShards = [];
  let brasaFxT = 0;
  let brasaFxKind = "";
  let brasaX = 0;
  let brasaY = 0;
  let brasaHomeYou = true;
  let brasaWoundDX = 0;
  let brasaWoundDY = 0;
  let brasaDir = 1;
  let brasaBits = [];
  let plantDust = [];
  let slashBuf = false;
  let openBuf = false;
  let yardIndex = 0;
  let yardArmed = false;
  let openLeft = 0;
  let koLanded = false;
  let settleT = 0;
  let gapEaseT = 0;

  function resetRound() {
    if (yardArmed) yardIndex = 1 - yardIndex;
    yardArmed = true;
    player = makeFighter("you");
    rival = makeFighter("rival");
    mode = "play";
    modeT = 0;
    koTarget = null;
    requestRestart = false;
    requestStart = false;
    attackEdge = false;
    boltEdge = false;
    bolt = null;
    lastWalkCode = "";
    walkHeldA = false;
    walkHeldD = false;
    shake = 0;
    shakeDur = 0;
    shakeMag = 0;
    shakeDir = 1;
    hitstopLeft = 0;
    hitFlashT = 0;
    steelFlashT = 0;
    clashSparkT = 0;
    clashShards = [];
    hitSparkT = 0;
    hitShards = [];
    brasaFxT = 0;
    brasaFxKind = "";
    brasaBits = [];
    plantDust = [];
    slashBuf = false;
    openBuf = false;
    openLeft = OPENING_MS;
    koLanded = false;
    settleT = 0;
    gapEaseT = 0;
    stampNow(1.3);
  }

  function walking(f) {
    return f.gait !== 0 && f.phase === "idle" && !f.guarding && f.stunT <= 0 && !f.falling;
  }

  function gaitWalkOn(f) {
    if (!walking(f)) return false;
    const a = (f.walkT / WALK_STEP_MS) * Math.PI;
    // Passing frame is the peak; plant sheet holds the rest so it reads as a step.
    return Math.sin(a) > 0.28;
  }

  function tickGait(f, dt) {
    const was = f.walkT > 0;
    const pass0 = was && Math.abs(Math.sin((f.walkT / WALK_STEP_MS) * Math.PI)) > 0.28;
    if (walking(f)) {
      if (!was) {
        f.walkRiseT = 0;
        f.walkLeanGait = f.gait; // start: riseK owns the ease
        f.walkPlanted = false;
      } else {
        // Reverse: destRect lean +1→−1 in 160ms. Instant gait used to
        // flip rot ~0.09 (~5°) in one tick. AABB still follows gait.
        const maxStep = (2 * dt) / WALK_SETTLE_MS;
        const d = f.gait - f.walkLeanGait;
        if (Math.abs(d) <= maxStep) f.walkLeanGait = f.gait;
        else f.walkLeanGait += Math.sign(d) * maxStep;
      }
      f.walkRiseT = Math.min(WALK_SETTLE_MS, f.walkRiseT + dt);
      f.walkT += dt;
      const pose = walkPose(f);
      f.walkSettleRot = pose.rot;
      f.walkSettleOy = pose.oy;
      f.walkSettleT = 0;
      const pass1 = Math.abs(Math.sin((f.walkT / WALK_STEP_MS) * Math.PI)) > 0.28;
      // Grit on boot plant (passing ends). !was / lift used to puff
      // dust while destRect rise was still ~0. abs so both 320ms steps
      // stamp; gaitWalkOn sheet stays sin>0 (no extra art hitch).
      if (was && pass0 && !pass1) {
        spawnPlantDust(f, 1);
        f.walkPlanted = true;
      }
      return;
    }
    // Stop grit needs weight — a 2-frame A/D tap used to puff on
    // release with destRect rise still ~0 (same hole as start).
    // Rise 160ms (lean in) or a planted boot. Lunge stomp stays.
    if (was && (f.walkRiseT >= WALK_SETTLE_MS || f.walkPlanted)) spawnPlantDust(f, 0.8);
    f.walkT = 0;
    f.gait = 0;
    f.walkRiseT = 0;
    f.walkLeanGait = 0;
    f.walkPlanted = false;
    // Combat poses lock immediately — do not ease leftover lean into a slash.
    if (f.phase !== "idle" || f.guarding || f.stunT > 0 || f.falling || f.boltPhase) {
      f.walkSettleT = 0;
      return;
    }
    if (was) f.walkSettleT = WALK_SETTLE_MS;
    else if (f.walkSettleT > 0) f.walkSettleT = Math.max(0, f.walkSettleT - dt);
  }

  function walkRiseK(f) {
    if (!walking(f)) return 1;
    if (f.walkRiseT >= WALK_SETTLE_MS) return 1;
    const t = Math.max(0, f.walkRiseT / WALK_SETTLE_MS);
    return t * t;
  }

  function walkSettleK(f) {
    if (!f || f.walkSettleT <= 0) return 0;
    if (f.phase !== "idle" || f.guarding || f.stunT > 0 || f.falling) return 0;
    if (walking(f) || usingDedicatedPose(f)) return 0;
    const k = f.walkSettleT / WALK_SETTLE_MS;
    return k * k;
  }

  function walkCadence(f) {
    // walkT==0 is the planted boot (sin 0 → 0.34). Returning 1 used to
    // lurch the first frame a full 4px (destRect rise still ~0) then
    // slam to ~2px — the cadence pause on boot ran one tick late.
    const a = (f.walkT / WALK_STEP_MS) * Math.PI;
    return 0.34 + 0.96 * Math.abs(Math.sin(a));
  }

  function walkPose(f) {
    if (!walking(f)) return { rot: 0, ox: 0, oy: 0 };
    const a = (f.walkT / WALK_STEP_MS) * Math.PI;
    const stride = Math.sin(a);
    const plant = Math.abs(Math.cos(a));
    const k = walkRiseK(f);
    const g = f.walkLeanGait || 0;
    return {
      rot: g * WALK_LEAN * (0.55 + 0.45 * Math.abs(stride)) * k,
      ox: g * 14 * stride * k,
      oy: plant * WALK_DIP_PX * k,
    };
  }

  function idleBreath(f) {
    // Visual only (destRect). AABB stays planted. Offset so they don't breathe in sync.
    // Walking used to zero breath in one tick while rise was still ~0, so the
    // chest dropped ~1.6px then the lean/dip climbed — a hitch on every A/D.
    // Fade breath out with walkRise and back in with walkSettle.
    // Sheathe: fade amp with remaining T so Space/S mid-hump (and the final
    // hump tick) do not stack a 1.6 chest dump on the envelope step.
    if (f.falling || f.stunT > 0 || f.guardBreakT > 0) return 0;
    const t = (modeT + (f.kind === "you" ? 0 : 380)) / 2400;
    let amp = Math.sin(t * Math.PI * 2) * 1.6;
    if (f.sheatheT > 0) {
      amp *= f.sheatheT / SHEATHE_MS;
      if (walking(f)) return amp * (1 - walkRiseK(f));
      return amp;
    }
    if (f.phase !== "idle" || f.guarding) return 0;
    if (walking(f)) return amp * (1 - walkRiseK(f));
    if (f.walkSettleT > 0) return amp * (1 - walkSettleK(f));
    return amp;
  }

  function sheathing(f) {
    return f.sheatheT > 0 && f.phase === "idle" && !f.guarding && !f.falling && f.stunT <= 0 && !walking(f);
  }

  function sheatheDip(f) {
    // destRect-only. Walking must not cut the sheathe lift — recovery→walk
    // dropped the plant in one tick. sheathing() stays planted so the slash
    // sheet does not override walk. Guard same: S used to dump the hump
    // (~5–7px) while the block sheet locked. Space mid-hump used to zero
    // sheatheT + gate phase!==idle (~5.4 with breath); envelope now finishes
    // through startup/active/recovery. Stun still cuts (hit owns the plant).
    // Linear T/MS used to plant −5 on the same slash sheet the first idle
    // frame (~7px with breath). Hump starts and ends at 0.
    if (f.sheatheT <= 0 || f.falling || f.stunT > 0) return 0;
    const u = f.sheatheT / SHEATHE_MS;
    return -5 * Math.sin(Math.PI * u);
  }

  function tickSheathe(f, dt) {
    if (!f) return;
    if (f.stunT > 0 || f.falling) {
      f.sheatheT = 0;
      return;
    }
    if (f.sheatheT > 0) f.sheatheT = Math.max(0, f.sheatheT - dt);
  }

  function finishWinnerCut(dt) {
    const win = koTarget === player ? rival : player;
    if (!win || win.falling) return;
    if (win.phase !== "idle") advanceAttack(win, dt);
    tickSheathe(win, dt);
  }

  function slashPose(f) {
    if (f.falling) {
      const t = Math.min(1, f.fallT / FALL_MS);
      const lift = (1 - t) * (1 - t);
      return { rot: 0, ox: 0, oy: -10 * lift };
    }
    // Chip stun is not the KO crumple. Flinch is destRect rot around the
    // planted foot; AABB stays planted. ox -22 used to slide the sprite
    // off the AABB cut (spark inset vs hurt) by a full step.
    if (f.stunT > 0 && f.hp > 0) {
      const k = Math.min(1, f.stunT / HITSTUN);
      return { rot: f.facing * -0.16 * k, ox: 0, oy: 0 };
    }
    // Walk sheet is dedicated but still needs walkPose — zeroing it made
    // ox/oy snap at every idle↔walk swap (slide). Combat poses stay locked.
    if (walking(f)) return walkPose(f);
    if (usingDedicatedPose(f)) return { rot: 0, ox: 0, oy: 0 };
    if (f.guarding) return { rot: f.facing * -0.14, ox: f.facing * -12, oy: 6 };
    if (f.phase === "startup") return { rot: f.facing * -0.42, ox: f.facing * -36, oy: 4 };
    if (f.phase === "active") return { rot: f.facing * 0.55, ox: f.facing * 72, oy: -10 };
    return walkPose(f);
  }

  function fallK(f) {
    if (!f.falling) return 0;
    const t = Math.min(1, f.fallT / FALL_MS);
    return 0.7 * t + 0.3 * t * t;
  }

  function poseScale(f) {
    // Always worldScale. Inflating by idleCharH/charH (via pose top)
    // blew rival slash to near-fullscreen because slash top=475 on a full sheet.
    return worldScale();
  }

  function destRect(f) {
    const s = poseScale(f);
    const d = poseSheet(f);
    const pose = slashPose(f);
    const dw = d.w * s;
    const dh = d.h * s;
    // Plant with AABB. Walk stride ox (gait*14*sin) is leftover gait —
    // it rode destRect then snapped ~13px on Space / gait-drop while
    // AABB stayed. Keep walkPose (rot/dip) while walking; dedicated
    // slash pose must not inherit leftover gait ox.
    const ox = f.x + (walking(f) ? 0 : pose.ox);
    const sk = walkSettleK(f);
    let dy = FLOOR_Y - d.footY * s + pose.oy + f.walkSettleOy * sk + idleBreath(f) + sheatheDip(f) + settleDip();
    let dx = ox - d.footX * s;
    // Hurt pose is already the ~45° crumple. Extra canvas rot (0.785 / 1.25)
    // stacked it onto a log; facing* extra stood the rival back up.
    const rot = pose.rot + f.walkSettleRot * sk;
    return { dx, dy, dw, dh, rot, pivX: ox, pivY: FLOOR_Y };
  }

  function bodyAABB(f) {
    const s = worldScale();
    const d = poseFamily(f).idle;
    const pose = (walking(f) || (f.stunT > 0 && f.hp > 0)) ? { rot: 0, ox: 0, oy: 0 } : slashPose(f);
    const ox = f.x + pose.ox;
    const dy = FLOOR_Y - d.footY * s + pose.oy;
    const dx = ox - d.footX * s;
    const b = sheetOf(f).body;
    return { x: dx + b.x * s, y: dy + b.y * s, w: b.w * s, h: b.h * s };
  }

  function hurtW(f) {
    return bodyAABB(f).w;
  }

  function bladeTipX(f) {
    const r = destRect(f);
    const d = poseSheet(f);
    const s = poseScale(f);
    if (d.tipX != null) return r.dx + d.tipX * s;
    return f.facing > 0 ? r.dx + r.dw - 8 : r.dx + 8;
  }

  function bladeBox(f) {
    const b = bodyAABB(f);
    const hh = b.h * 0.38;
    const hy = b.y + b.h * 0.06;
    const tip = bladeTipX(f) + f.facing * 6;
    if (f.facing > 0) {
      const x0 = b.x + b.w * 0.62;
      return { x: x0, y: hy, w: Math.max(48, tip - x0), h: hh };
    }
    const x1 = b.x + b.w * 0.38;
    return { x: Math.min(tip, x1 - 48), y: hy, w: Math.max(48, x1 - tip), h: hh };
  }

  function bladeReach(f) {
    const b = bodyAABB(f);
    const tip = bladeTipX(f);
    if (f.facing > 0) return Math.max(0, tip - (b.x + b.w));
    return Math.max(0, b.x - tip);
  }

  function hitbox(f) {
    if (f.phase !== "active" || f.falling || f.guarding) return null;
    return bladeBox(f);
  }

  function overlaps(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function facingAttacker(def, atk) {
    if (def.facing > 0) return atk.x >= def.x;
    return atk.x <= def.x;
  }

  function facingRival(f, other) {
    return f.facing > 0 ? other.x >= f.x : other.x <= f.x;
  }

  function wantGuard(f) {
    if (f !== player) return false;
    if (f.stunT > 0) return false;
    if (f.boltPhase) return false;
    if (!keys.has("KeyS")) return false;
    if (f.phase !== "idle" && !f.guarding) return false;
    return facingRival(f, rival);
  }

  function startAttack(f) {
    if (f.falling || f.guarding || f.stunT > 0) return;
    if (f.boltPhase) return;
    if (f.phase !== "idle") return;
    if (openLeft > 0) return;
    if (f.kind === "rival") {
      if (player.stunT > 0 || player.falling) return;
    }
    f.phase = "startup";
    f.phaseT = 0;
    f.closing = false;
    // Keep sheatheT — tickSheathe finishes the 0→−5→0 hump through the
    // cut so Space mid-recovery does not plant the leftover dip in one tick.
  }

  function advanceAttack(f, dt) {
    if (f.falling || f.phase === "idle" || f.guarding) return;
    f.phaseT += dt;
    if (f.phase === "startup" && f.phaseT >= STARTUP) {
      f.phase = "active";
      f.phaseT = 0;
      let nx = f.x + f.facing * LUNGE_PX;
      if (f.kind === "you") nx = Math.min(nx, rival.x - 48);
      else nx = Math.max(nx, player.x + 48);
      f.x = nx;
      playSfx(SFX.whoosh);
      spawnPlantDust(f, 1.45);
    } else if (f.phase === "active" && f.phaseT >= ACTIVE) {
      f.phase = "recovery";
      f.phaseT = 0;
    } else if (f.phase === "recovery" && f.phaseT >= RECOVERY) {
      f.phase = "idle";
      f.phaseT = 0;
      f.sheatheT = SHEATHE_MS;
      gapEaseT = GAP_EASE_MS;
    }
  }

  function clampFighter(f) {
    const b = bodyAABB(f);
    if (b.x < 8) f.x += 8 - b.x;
    if (b.x + b.w > W - 8) f.x -= b.x + b.w - (W - 8);
    if (f.kind === "you") {
      const r = destRect(f);
      if (r.dx < 0) f.x += -r.dx;
    }
  }

  function inMotionFeel(f) {
    if (f.phase === "startup" || f.phase === "active" || f.phase === "recovery") return true;
    if (f.boltPhase) return true;
    if (f.pushT > 0 || f.stunT > 0) return true;
    return false;
  }

  function keepApart(dt) {
    player.facing = 1;
    rival.facing = -1;
    dressRival(rival);
    if (player.x >= rival.x) {
      const mid = (player.x + rival.x) / 2;
      player.x = mid - 1;
      rival.x = mid + 1;
    }
    const a = bodyAABB(player);
    const b = bodyAABB(rival);
    const push = a.x + a.w - b.x;
    if (push > 0) {
      const room = (W - 8) - (b.x + b.w);
      const rivalPush = Math.min(push / 2 + 1, Math.max(0, room));
      rival.x += rivalPush;
      player.x -= push + 1 - rivalPush;
    }
    const pocket = !inMotionFeel(player) && !inMotionFeel(rival) && !walking(player) && !walking(rival);
    if (!pocket) return;
    // Body gap, not plant gap. 280 plants was AABB-overlap (~-6 body), so the
    // rival always walked out of a dead 320 HOLD leftover from the old 500px blade.
    const GAP = 120;
    const g = bodyGap();
    if (g < GAP) {
      let need = (GAP - g) / 2;
      // Live frames slide into GAP 120. Recovery already arms gapEaseT;
      // walk-stop / shove leftover used to teleport plants ±10px in one
      // tick when pocket flipped true with ease=0. Bar calls
      // keepApart() with no dt — idle-at-rest stays instant 120.
      // Slash/stun/push still skip the pocket (lunge intact).
      if (dt > 0) {
        if (gapEaseT <= 0) gapEaseT = GAP_EASE_MS;
        need *= Math.min(1, dt / gapEaseT);
        gapEaseT = Math.max(0, gapEaseT - dt);
      } else {
        gapEaseT = 0;
      }
      player.x -= need;
      rival.x += need;
    } else {
      gapEaseT = 0;
    }
  }

  function bodyGap() {
    const a = bodyAABB(player);
    const b = bodyAABB(rival);
    return b.x - (a.x + a.w);
  }

  function absGap() {
    const a = bodyAABB(player);
    const b = bodyAABB(rival);
    if (a.x + a.w < b.x) return b.x - (a.x + a.w);
    if (b.x + b.w < a.x) return a.x - (b.x + b.w);
    return 0;
  }

  function rivalCanAct() {
    if (rival.falling || rival.stunT > 0) return false;
    if (rival.boltPhase) return false;
    if (rival.phase === "startup" || rival.phase === "active" || rival.phase === "recovery") return false;
    return true;
  }

  function startupShovePx(f) {
    if (f.pushT <= 0) return 0;
    return Math.max(0, f.pushVel) * Math.min(f.pushT, STARTUP);
  }

  function swingElapsed(f) {
    if (f.phase === "startup") return f.phaseT;
    if (f.phase === "active") return STARTUP + f.phaseT;
    return 0;
  }

  function rollStandoff() {
    return STANDOFF_MIN + Math.random() * (STANDOFF_MAX - STANDOFF_MIN);
  }

  function tickAI(dt) {
    rival.gait = 0;
    rival.wantBlock = false;
    if (openLeft > 0) return;
    if (!rivalCanAct()) return;
    if (player.stunT > 0 || player.falling) return;

    const dist = absGap();
    const HOLD = bladeReach(rival) + LUNGE_PX;
    const myReach = HOLD;
    if (rival.boltCd > 0) rival.boltCd = Math.max(0, rival.boltCd - dt);
    if (dist <= HOLD) rival.boltArmed = true;
    // Count the attacker's lunge: at true measure dist≈HOLD, so bare
    // dist<=HOLD never armed the 40% guard and the rival ate every Space.
    const boltIncoming = player.boltPhase === "startup" || !!(bolt && bolt.kind === "you");
    const inThreat = dist <= HOLD + LUNGE_PX || boltIncoming;
    const playerSwinging = player.phase === "startup" || player.phase === "active" || boltIncoming;
    const walkIn = (player.x < rival.x ? -1 : 1) * WALK * (dt / 1000);
    const walkOut = -walkIn;
    const rb = bodyAABB(rival);
    const roomBack = (W - 8) - (rb.x + rb.w) > 16;
    const canStartGuard = rival.stamina >= STAMINA_START_MIN && rival.guardBreakT <= 0;
    const broken = rival.stamina < STAMINA_START_MIN || rival.guardBreakT > 0;

    // Raise still commits at 140ms / 40%. Keep that raise through the
    // exchange (swing + recovery) so hold-drain + block-20 actually bite.
    // Drop when the player is idle — never hold S forever.
    if (!playerSwinging && player.phase !== "recovery" && player.boltPhase !== "recovery") {
      // After a hold they are often shoved past HOLD. Walk back in;
      // do not spend the special as a block-punish fireball.
      if (rival.guardChoice === 1 && dist > HOLD) rival.closing = true;
      rival.guardChoice = 0;
    } else if (rival.guardChoice === 0 && playerSwinging) {
      const telegraphT = player.boltPhase === "startup" ? player.boltT : swingElapsed(player);
      const canCommit = telegraphT >= GUARD_COMMIT_MS || !!bolt;
      if (canCommit) rival.guardChoice = (inThreat && canStartGuard && Math.random() < 0.4) ? 1 : -1;
    }
    if (rival.guardChoice === 1 && !(rival.guarding || canStartGuard)) {
      rival.guardChoice = -1;
    }

    if (rival.guardChoice === 1 && (rival.guarding || canStartGuard)) {
      rival.wantBlock = true;
      rival.phase = "idle";
      rival.phaseT = 0;
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.closing = false;
      return;
    }

    if (playerSwinging) {
      rival.closing = false;
      rival.standWait = 0;
      rival.standGoal = 0;
      return;
    }

    // Stam<15 or break: do not statue. Punish a recovery if it still
    // connects; otherwise walk out. Incoming swing already ate the hit.
    if (broken) {
      rival.closing = false;
      rival.standWait = 0;
      rival.standGoal = 0;
      const shove = startupShovePx(rival);
      if (player.phase === "recovery" && dist + shove <= myReach) {
        startAttack(rival);
        return;
      }
      if (roomBack) {
        rival.gait = Math.sign(walkOut);
        rival.x += walkOut * walkCadence(rival);
        return;
      }
      if (dist <= myReach) {
        startAttack(rival);
        return;
      }
      return;
    }

    if (player.phase === "recovery") {
      // Empujón slides the blocker out during our 180 startup.
      // Swing only if the predicted gap still connects; otherwise close.
      // Never take the old myReach+40 air slash.
      const shove = startupShovePx(rival);
      const pred = dist + shove;
      if (pred <= myReach) {
        startAttack(rival);
        rival.standWait = 0;
        rival.standGoal = 0;
        rival.closing = false;
        return;
      }
      rival.closing = true;
      rival.standWait = 0;
      rival.standGoal = 0;
    }

    if (rival.closing) {
      if (dist + startupShovePx(rival) <= myReach) {
        startAttack(rival);
        rival.standWait = 0;
        rival.standGoal = 0;
        rival.closing = false;
        return;
      }
      rival.gait = Math.sign(walkIn);
      rival.x += walkIn * walkCadence(rival);
      return;
    }

    // HOLD+40 was slack from the old 320 plant-HOLD. With blade+lunge ~166
    // that sat at ~206, 1px outside Space+lunge (~205) — first slash whiffs.
    if (dist > HOLD) {
      // Fireball is a spacing tool, not a shove-punish. Closing from
      // recovery walks back in first. HOLD+16 so measure jitter
      // (HOLD+4) is still the pocket — not a 1px fireball.
      if (rival.boltArmed && rival.boltCd <= 0 && dist > HOLD + 16 && canStartBolt(rival)) {
        startBolt(rival);
        rival.boltCd = BOLT_AI_CD;
        rival.closing = false;
        rival.standWait = 0;
        rival.standGoal = 0;
        return;
      }
      rival.gait = Math.sign(walkIn);
      rival.x += walkIn * walkCadence(rival);
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.closing = false;
      return;
    }
    if (dist < Math.max(20, myReach - 48)) {
      if (roomBack) {
        rival.gait = Math.sign(walkOut);
        rival.x += walkOut * walkCadence(rival);
        rival.standWait = 0;
        rival.standGoal = 0;
        rival.closing = false;
        return;
      }
      startAttack(rival);
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.closing = false;
      return;
    }

    if (player.phase === "idle") {
      if (rival.standGoal <= 0) rival.standGoal = rollStandoff();
      rival.standWait += dt;
      if (rival.standWait >= rival.standGoal) {
        rival.standWait = 0;
        rival.standGoal = rollStandoff();
        if (dist <= myReach) startAttack(rival);
        else rival.closing = true;
      }
    }
  }

  function bumpShake(mag, dir, ms) {
    shake = ms;
    shakeDur = ms;
    shakeMag = mag;
    shakeDir = dir || 1;
  }

  function applyPush(def, atk) {
    const dir = def.x >= atk.x ? 1 : -1;
    def.pushT = GUARD_PUSH_MS;
    def.pushVel = (hurtW(def) * dir) / GUARD_PUSH_MS;
  }

  function spawnClashSpark(x, y) {
    clashX = x;
    clashY = y;
    const pTip = bladeTipX(player);
    const rTip = bladeTipX(rival);
    clashHomeYou = Math.abs(x - pTip) <= Math.abs(x - rTip);
    const home = clashHomeYou ? player : rival;
    const hb = bladeBox(home);
    clashTipDX = x - bladeTipX(home);
    clashTipDY = y - (hb.y + hb.h * 0.45);
    clashSparkT = CLASH_SPARK_MS;
    clashShards = [];
    for (let i = 0; i < 11; i++) {
      const ang = (i / 11) * Math.PI * 2 + i * 0.13;
      clashShards.push({
        ang,
        len: 16 + (i % 4) * 7,
        brasa: i % 2 === 1,
      });
    }
  }

  function stampNow(power) {
    spawnPlantDust(player, power);
    spawnPlantDust(rival, power);
    settleT = SETTLE_MS;
  }

  function settleDip() {
    if (settleT <= 0) return 0;
    const k = settleT / SETTLE_MS;
    return 4 * k * k;
  }

  function spawnPlantDust(f, power) {
    if (!f) return;
    const r = destRect(f);
    const x = r.pivX;
    const y = FLOOR_Y - 1;
    if (plantDust.length > 40) plantDust.splice(0, plantDust.length - 40);
    plantDust.push({ x: x, y: y, t: 0, life: 200 + 80 * power, power: power, facing: f.facing });
    const n = power > 1.1 ? 6 : 4;
    for (let i = 0; i < n; i++) {
      const side = n <= 1 ? 0 : i / (n - 1) - 0.5;
      plantDust.push({
        x: x + side * 10,
        y: y,
        t: 0,
        life: 160 + i * 18,
        power: power * 0.55,
        facing: f.facing,
        vx: side * 55 * power + f.facing * 12 * power,
        vy: -28 - (i % 3) * 12,
        speck: true,
      });
    }
  }

  function hitWoundAnchor(f) {
    const bb = bodyAABB(f);
    return { x: bb.x + bb.w * 0.5, y: bb.y + bb.h * 0.28 };
  }

  function spawnHitSpark(x, y, dir, def) {
    hitSparkX = x;
    hitSparkY = y;
    hitHomeYou = !def || def === player;
    const a = hitWoundAnchor(def || player);
    hitWoundDX = x - a.x;
    hitWoundDY = y - a.y;
    hitSparkT = HIT_SPARK_MS;
    hitShards = [];
    const base = dir >= 0 ? 0.2 : Math.PI - 0.2;
    for (let i = 0; i < 9; i++) {
      const fan = (i / 8 - 0.5) * 2.2;
      hitShards.push({
        ang: base + fan,
        len: 26 + (i % 3) * 11,
        brasa: i % 3 !== 0,
      });
    }
  }

  function spawnBrasaFx(kind, x, y, dir, def) {
    brasaFxKind = kind;
    brasaX = x;
    brasaY = y;
    brasaDir = dir >= 0 ? 1 : -1;
    brasaHomeYou = !def || def === player;
    brasaBits = [];
    if (kind === "clash") {
      const home = brasaHomeYou ? player : rival;
      const hb = bladeBox(home);
      brasaWoundDX = x - bladeTipX(home);
      brasaWoundDY = y - (hb.y + hb.h * 0.45);
      brasaFxT = CLASH_SPARK_MS;
      for (let i = 0; i < 10; i++) {
        brasaBits.push({
          ang: (i / 10) * Math.PI * 2 + i * 0.17,
          len: 8 + (i % 4) * 4,
          r: 1.7 + (i % 3) * 0.7,
          tone: i % 3 === 0 ? "oxido" : (i % 3 === 1 ? "brasa" : "pizarra"),
        });
      }
      return;
    }
    if (kind === "cast") {
      const home = brasaHomeYou ? player : rival;
      const hb = bladeBox(home);
      brasaWoundDX = x - bladeTipX(home);
      brasaWoundDY = y - (hb.y + hb.h * 0.45);
      brasaFxT = BOLT_CAST_FX_MS;
      for (let i = 0; i < 6; i++) {
        brasaBits.push({
          ang: (i / 6) * Math.PI * 2 + i * 0.11,
          len: 5 + (i % 3) * 2,
          r: 1.4 + (i % 3) * 0.5,
          tone: i % 4 === 0 ? "oxido" : (i % 4 === 1 ? "brasa" : (i % 4 === 2 ? "pizarra" : "hueso")),
        });
      }
      return;
    }
    const a = hitWoundAnchor(def || player);
    brasaWoundDX = x - a.x;
    brasaWoundDY = y - a.y;
    if (kind === "block") {
      brasaFxT = STEEL_FLASH_MS;
      const base = brasaDir >= 0 ? 0.45 : Math.PI - 0.45;
      for (let i = 0; i < 5; i++) {
        brasaBits.push({
          ang: base + (i / 4 - 0.5) * 1.5,
          len: 7 + i * 3,
          r: 1.5 + (i % 2) * 0.8,
          flake: true,
          tone: i % 2 ? "oxido" : "pizarra",
        });
      }
      return;
    }
    brasaFxT = HIT_SPARK_MS;
    const base = brasaDir >= 0 ? 0.2 : Math.PI - 0.2;
    for (let i = 0; i < 8; i++) {
      const fan = (i / 7 - 0.5) * 2.5;
      brasaBits.push({
        ang: base + fan + (i % 2 ? 0.18 : -0.12),
        len: 9 + (i % 3) * 5,
        r: 2.0 + (i % 3) * 0.7,
        tone: i % 3 === 0 ? "oxido" : (i % 3 === 1 ? "brasa" : "hueso"),
      });
    }
  }

  function cutPoint(atk, def) {
    const ha = bladeBox(atk);
    const bb = bodyAABB(def);
    const x0 = Math.max(ha.x, bb.x);
    const y0 = Math.max(ha.y, bb.y);
    const x1 = Math.min(ha.x + ha.w, bb.x + bb.w);
    const y1 = Math.min(ha.y + ha.h, bb.y + bb.h);
    if (x1 > x0 && y1 > y0) return { x: (x0 + x1) * 0.5, y: (y0 + y1) * 0.5 };
    return { x: bb.x + bb.w * 0.5, y: bb.y + bb.h * 0.28 };
  }

  function doClash(cx, cy) {
    spawnClashSpark(cx, cy);
    player.phase = "recovery";
    player.phaseT = Math.max(0, RECOVERY - CLASH_RECOVERY);
    rival.phase = "recovery";
    rival.phaseT = Math.max(0, RECOVERY - CLASH_RECOVERY);
    // Bounce after hitstop (same pattern as knock). Instant ±90 used to
    // teleport the bodies off the spark, so the shards sat in empty air.
    player.pushT = KNOCK_MS;
    player.pushVel = -CLASH_STEP / KNOCK_MS;
    rival.pushT = KNOCK_MS;
    rival.pushVel = CLASH_STEP / KNOCK_MS;
    player.guarding = false;
    rival.guarding = false;
    clampFighter(player);
    clampFighter(rival);
    spawnPlantDust(player, 1.2);
    spawnPlantDust(rival, 1.2);
    bumpShake(10, 1, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    playSfx(SFX.choque);
  }

  function pulseBar(f, before) {
    f.hudGhost = Math.max(f.hudGhost, before);
    f.hudFlashT = 220;
  }

  function landHit(atk, def, dir) {
    if (openLeft > 0) return;
    const before = def.hp;
    def.hp = Math.max(0, def.hp - SLASH_DMG);
    pulseBar(def, before);
    atk.phase = "recovery";
    atk.phaseT = 0;
    bumpShake(10, dir, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playSfx(SFX.impacto);
    def.stunT = HITSTUN;
    def.phase = "idle";
    def.phaseT = 0;
    def.guarding = false;
    atk.closing = false;
    def.closing = def.kind === "rival";
    def.standWait = 0;
    def.standGoal = 0;
    hitFlashT = HIT_FLASH_MS;
    const pt = cutPoint(atk, def);
    spawnHitSpark(pt.x, pt.y, atk.facing, def);
    const kbDir = def.x >= atk.x ? 1 : -1;
    def.pushT = KNOCK_MS;
    def.pushVel = (KNOCK_PX * kbDir) / KNOCK_MS;
    spawnPlantDust(def, 1.15);
    if (def.hp <= 0) {
      koTarget = def;
    }
  }

  function guardSteelPoint(f) {
    const bb = bodyAABB(f);
    return {
      x: bb.x + bb.w * (f.facing > 0 ? 0.72 : 0.28),
      y: bb.y + bb.h * 0.36,
    };
  }

  function tripGuardBreak(f, atk) {
    f.guarding = false;
    f.stamina = 0;
    f.guardBreakT = GUARD_BREAK_MS;
    f.stamRegenT = STAMINA_REGEN_DELAY;
    const other = atk || (f === player ? rival : player);
    const pt = atk ? cutPoint(atk, f) : guardSteelPoint(f);
    spawnSteelFlash(pt.x, pt.y, other, f);
    // Tiny destRect settle only (AABB stays planted). Opening stamp is 260/4px.
    if (settleT < GUARD_BREAK_SETTLE) settleT = GUARD_BREAK_SETTLE;
  }

  function landBlock(atk, def, dir) {
    atk.phase = "recovery";
    atk.phaseT = 0;
    applyPush(def, atk);
    bumpShake(4, dir, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    playSfx(SFX.bloqueo);
    const pt = cutPoint(atk, def);
    spawnPlantDust(def, 1.0);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else spawnSteelFlash(pt.x, pt.y, atk, def);
  }

  function canStartBolt(f) {
    if (!f) return false;
    if (mode !== "play") return false;
    if (openLeft > 0) return false;
    if (f.falling || f.guarding || f.stunT > 0 || f.guardBreakT > 0) return false;
    if (f.phase !== "idle") return false;
    if (f.boltPhase) return false;
    if (bolt) return false;
    if (player.boltPhase === "startup" || rival.boltPhase === "startup") return false;
    if (f.stamina < BOLT_STAM) return false;
    return true;
  }

  function startBolt(f) {
    if (!canStartBolt(f || player)) return false;
    const u = f || player;
    u.stamina -= BOLT_STAM;
    u.stamRegenT = STAMINA_REGEN_DELAY;
    u.boltPhase = "startup";
    u.boltT = 0;
    u.gait = 0;
    playSfx(SFX.cast);
    const hb = bladeBox(u);
    spawnBrasaFx("cast", bladeTipX(u), hb.y + hb.h * 0.45, u.facing, u);
    return true;
  }

  function boltBox() {
    if (!bolt) return null;
    return { x: bolt.x, y: bolt.y, w: bolt.w, h: bolt.h };
  }

  function spawnBolt(f) {
    const u = f || player;
    const hb = bladeBox(u);
    const tip = bladeTipX(u);
    const w = BOLT_W;
    const h = BOLT_H;
    const y = hb.y + hb.h * 0.45 - h * 0.5;
    const x = u.facing > 0 ? tip : tip - w;
    bolt = { x: x, y: y, w: w, h: h, vx: u.facing * BOLT_SPEED, facing: u.facing, kind: u.kind };
  }

  function advanceBoltFighter(f, dt) {
    if (!f.boltPhase) return;
    if (f.stunT > 0 || f.falling) {
      f.boltPhase = "";
      f.boltT = 0;
      return;
    }
    f.boltT += dt;
    if (f.boltPhase === "startup" && f.boltT >= BOLT_STARTUP) {
      spawnBolt(f);
      f.boltPhase = "recovery";
      f.boltT = 0;
    } else if (f.boltPhase === "recovery" && f.boltT >= BOLT_RECOVERY) {
      f.boltPhase = "";
      f.boltT = 0;
    }
  }

  function advanceBolt(dt) {
    advanceBoltFighter(player, dt);
    advanceBoltFighter(rival, dt);
  }

  function tickBolt(dt) {
    if (!bolt) return;
    bolt.x += bolt.vx * (dt / 1000);
    if (bolt.x > W + 40 || bolt.x + bolt.w < -40) bolt = null;
  }

  function landBoltHit(def, atk, dir, pt) {
    if (openLeft > 0) return;
    const before = def.hp;
    def.hp = Math.max(0, def.hp - SLASH_DMG);
    pulseBar(def, before);
    bumpShake(10, dir, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playSfx(SFX.brasaImpacto);
    def.stunT = HITSTUN;
    def.phase = "idle";
    def.phaseT = 0;
    def.guarding = false;
    def.closing = def.kind === "rival";
    def.standWait = 0;
    def.standGoal = 0;
    hitFlashT = HIT_FLASH_MS;
    spawnBrasaFx("hit", pt.x, pt.y, atk.facing, def);
    const kbDir = def.x >= atk.x ? 1 : -1;
    def.pushT = KNOCK_MS;
    def.pushVel = (KNOCK_PX * kbDir) / KNOCK_MS;
    spawnPlantDust(def, 1.15);
    if (def.hp <= 0) koTarget = def;
  }

  function landBoltBlock(def, atk, dir, pt) {
    applyPush(def, atk);
    bumpShake(4, dir, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    playSfx(SFX.brasaBloqueo);
    spawnPlantDust(def, 1.0);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else spawnBrasaFx("block", pt.x, pt.y, atk.facing, def);
  }

  function resolveBolt() {
    if (!bolt || openLeft > 0) return;
    const atk = bolt.kind === "rival" ? rival : player;
    const def = atk === player ? rival : player;
    const dir = atk === player ? 1 : -1;
    const box = boltBox();
    const hb = hitbox(def);
    if (hb && overlaps(box, hb)) {
      spawnBrasaFx("clash", box.x + box.w * 0.5, box.y + box.h * 0.5, atk.facing, def);
      playSfx(SFX.brasaChoque);
      bolt = null;
      return;
    }
    const bb = bodyAABB(def);
    if (!overlaps(box, bb)) return;
    const x0 = Math.max(box.x, bb.x);
    const y0 = Math.max(box.y, bb.y);
    const x1 = Math.min(box.x + box.w, bb.x + bb.w);
    const y1 = Math.min(box.y + box.h, bb.y + bb.h);
    const pt = { x: (x0 + x1) * 0.5, y: (y0 + y1) * 0.5 };
    if (def.guarding && facingAttacker(def, atk)) landBoltBlock(def, atk, dir, pt);
    else landBoltHit(def, atk, dir, pt);
    bolt = null;
  }

  function resolveCuts() {
    if (openLeft > 0) return;
    const ha = hitbox(player);
    const hb = hitbox(rival);
    const ba = bodyAABB(player);
    const bb = bodyAABB(rival);
    const aHits = !!(ha && overlaps(ha, bb));
    const bHits = !!(hb && overlaps(hb, ba));
    const activesOverlap = !!(ha && hb && overlaps(ha, hb));
    if (activesOverlap) {
      const x0 = Math.max(ha.x, hb.x);
      const y0 = Math.max(ha.y, hb.y);
      const x1 = Math.min(ha.x + ha.w, hb.x + hb.w);
      const y1 = Math.min(ha.y + ha.h, hb.y + hb.h);
      doClash((x0 + x1) * 0.5, (y0 + y1) * 0.5);
      return;
    }
    if (aHits) {
      if (rival.guarding && facingAttacker(rival, player)) landBlock(player, rival, 1);
      else landHit(player, rival, 1);
      return;
    }
    if (bHits) {
      if (player.guarding && facingAttacker(player, rival)) landBlock(rival, player, -1);
      else landHit(rival, player, -1);
    }
  }

  function updateGuard(f, dt, want) {
    if (f.guardBreakT > 0) {
      f.guardBreakT = Math.max(0, f.guardBreakT - dt);
    }
    if (f.falling || f.stunT > 0) {
      f.guarding = false;
      want = false;
    }
    if (f.phase !== "idle" && !f.guarding) want = false;

    const canStart = f.stamina >= STAMINA_START_MIN && f.guardBreakT <= 0 && !f.falling && f.stunT <= 0;
    const canHold = f.stamina > 0 && f.guardBreakT <= 0 && !f.falling && f.stunT <= 0;
    const raise = !!(want && (f.guarding ? canHold : canStart));

    // Leave-threat lock: keep 10/s for STAMINA_REGEN_LOCK after the pocket.
    // Shared — player and rival. 25/s only once the window dies, still out.
    const threat = absGap() <= bladeReach(f) + LUNGE_PX + LUNGE_PX;
    const locked = threat || f.stamThreatLockT > 0;
    if (threat) f.stamThreatLockT = STAMINA_REGEN_LOCK;
    else if (f.stamThreatLockT > 0) f.stamThreatLockT = Math.max(0, f.stamThreatLockT - dt);

    if (raise) {
      f.guarding = true;
      f.phase = "idle";
      f.phaseT = 0;
      f.stamina = Math.max(0, f.stamina - STAMINA_DRAIN * (dt / 1000));
      f.stamRegenT = STAMINA_REGEN_DELAY;
      if (f.stamina <= 0) tripGuardBreak(f);
    } else {
      if (f.phase === "idle" || f.guarding) f.guarding = false;
      f.stamRegenT = Math.max(0, f.stamRegenT - dt);
      if (f.stamRegenT <= 0) {
        const regen = locked ? STAMINA_REGEN_THREAT : STAMINA_REGEN;
        f.stamina = Math.min(STAMINA_MAX, f.stamina + regen * (dt / 1000));
      }
    }
  }

  function beginFall() {
    if (mode === "falling" || mode === "over") return;
    if (!koTarget || koTarget.hp > 0) return;
    mode = "falling";
    modeT = 0;
    koTarget.falling = true;
    koTarget.fallT = 0;
    koTarget.pushT = 0;
    koTarget.pushVel = 0;
    // Stay where the kill landed. Old fixed 280/900 & 360/980
    // teleports snapped the winner mid-cut ~140–300px. Soft-nudge
    // only if the crumple sheet would leave the frame.
    const loser = koTarget;
    const winner = loser === player ? rival : player;
    const pad = 12;
    const lr = destRect(loser);
    if (lr.dx < pad) loser.x += pad - lr.dx;
    if (lr.dx + lr.dw > W - pad) loser.x -= (lr.dx + lr.dw) - (W - pad);
    const wr = destRect(winner);
    if (wr.dx < pad) winner.x += pad - wr.dx;
    if (wr.dx + wr.dw > W - pad) winner.x -= (wr.dx + wr.dw) - (W - pad);
    playSfx(SFX.ko);
    koLanded = false;
    spawnPlantDust(koTarget, 1.6);
    bolt = null;
  }

  function update(dt) {
    // Hold juice clocks through freeze. hitFlashT (120) used to die
    // inside HITSTOP_HIT (140); steel asterisk (60) died with HITSTOP_BLOCK.
    // Sparks already held. Grit specks + HUD bar-drain used to keep
    // flying while bodies were frozen. Camera punch used to share the
    // hitstop clock and fade to 0 before knock; settle dip same.
    // Fade after time resumes.
    if (hitstopLeft <= 0) {
      if (shake > 0) shake = Math.max(0, shake - dt);
      if (hitFlashT > 0) hitFlashT = Math.max(0, hitFlashT - dt);
      if (steelFlashT > 0) steelFlashT = Math.max(0, steelFlashT - dt);
      if (clashSparkT > 0) clashSparkT = Math.max(0, clashSparkT - dt);
      if (hitSparkT > 0) hitSparkT = Math.max(0, hitSparkT - dt);
      if (brasaFxT > 0) brasaFxT = Math.max(0, brasaFxT - dt);
      tickHudBar(player, dt);
      tickHudBar(rival, dt);
      for (let i = plantDust.length - 1; i >= 0; i--) {
        const p = plantDust[i];
        p.t += dt;
        if (p.speck) {
          p.x += p.vx * (dt / 1000);
          p.y += p.vy * (dt / 1000);
          p.vy += 520 * (dt / 1000);
          p.vx *= 0.9;
        }
        if (p.t >= p.life) plantDust.splice(i, 1);
      }
    }
    syncClashSpark();
    syncHitSpark();
    syncSteelFlash();
    syncBrasaFx();
    if (hitstopLeft <= 0 && settleT > 0) settleT = Math.max(0, settleT - dt);

    if (mode === "title") {
      modeT += dt;
      if (attackEdge || requestStart || requestRestart) {
        // Start is not a tajo. Title Space used to arm slashBuf and fire
        // at openLeft=0 from spawn (gap ~640) — a guaranteed air slash
        // then recovery while the rival walked in. Opening Spaces still
        // buffer and fire when openLeft hits 0.
        resetRound();
      }
      attackEdge = false;
      boltEdge = false;
      requestStart = false;
      return;
    }
    if (requestRestart) {
      resetRound();
      return;
    }
    if (mode === "over") {
      modeT += dt;
      finishWinnerCut(dt);
      if (attackEdge) resetRound();
      attackEdge = false;
      boltEdge = false;
      return;
    }
    if (hitstopLeft > 0) {
      hitstopLeft -= dt;
      if (attackEdge) slashBuf = true;
      attackEdge = false;
      boltEdge = false;
      keepApart();
      clampFighter(player);
      clampFighter(rival);
      if (hitstopLeft <= 0 && koTarget && koTarget.hp <= 0) {
        beginFall();
      }
      return;
    }
    if (mode === "play" && koTarget && koTarget.hp <= 0) {
      beginFall();
    }
    if (mode === "falling") {
      koTarget.fallT += dt;
      if (!koLanded && koTarget.fallT >= FALL_MS * 0.72) {
        koLanded = true;
        spawnPlantDust(koTarget, 2.4);
        bumpShake(5, koTarget.kind === "you" ? -1 : 1, 140);
      }
      if (koTarget.fallT >= FALL_MS) {
        mode = "over";
        modeT = 0;
      }
      finishWinnerCut(dt);
      attackEdge = false;
      boltEdge = false;
      return;
    }

    modeT += dt;
    const wasOpen = openLeft > 0;
    if (openLeft > 0) openLeft = Math.max(0, openLeft - dt);
    if (wasOpen && openLeft <= 0) stampNow(1.15);

    if (player.stunT > 0) player.stunT = Math.max(0, player.stunT - dt);
    if (rival.stunT > 0) rival.stunT = Math.max(0, rival.stunT - dt);
    tickSheathe(player, dt);
    tickSheathe(rival, dt);

    updateGuard(player, dt, wantGuard(player));
    if (player.falling || player.guarding) { slashBuf = false; openBuf = false; }
    if (attackEdge) {
      // Buffer any locked frame (full recovery, not only the last 80ms).
      // Early-recovery Space used to vanish because startAttack requires idle.
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      if (openLeft > 0) openBuf = true;
      else if (locked) slashBuf = true;
      else startAttack(player);
    }
    attackEdge = false;
    if (boltEdge) startBolt(player);
    boltEdge = false;

    const wantA = keys.has("KeyA");
    const wantD = keys.has("KeyD");
    if (wantA && !walkHeldA) lastWalkCode = "KeyA";
    if (wantD && !walkHeldD) lastWalkCode = "KeyD";
    walkHeldA = wantA;
    walkHeldD = wantD;
    let move = 0;
    if (!player.guarding && player.phase === "idle" && !player.falling && player.stunT <= 0 && !player.boltPhase) {
      if (wantA) move -= 1;
      if (wantD) move += 1;
      // A+D is how a keyboard reverse actually arrives. move==0 used to
      // dump gait (stop grit + 160 settle + new rise) so walkLeanGait
      // never saw +1→−1. Last walk key wins; AABB still follows gait.
      if (wantA && wantD) {
        if (lastWalkCode === "KeyA") move = -1;
        else if (lastWalkCode === "KeyD") move = 1;
      }
    }
    let step = move * WALK * walkCadence(player) * (dt / 1000);
    if (step > 0) {
      // Idle GAP 120. Walking skipped keepApart's pocket, so releasing D
      // next to a planted rival teleported both plants out to 120.
      const GAP = 120;
      const g = bodyGap();
      if (g <= GAP) { step = 0; move = 0; }
      else step = Math.min(step, g - GAP);
    }
    if (step < 0) {
      // destRect left clamp (dx>=0) used to eat the step after gait was
      // set, so A against the wall kept the walk cycle on a stuck plant
      // (lean ±0.05, dip, sheet). GAP 120 already zeros move; match that.
      const x0 = player.x;
      player.x += step;
      const r = destRect(player);
      if (r.dx < 0) {
        player.x += -r.dx;
        move = 0;
        step = player.x - x0;
      }
    } else {
      player.x += step;
    }
    player.gait = move;

    if (player.pushT > 0) {
      player.x += player.pushVel * dt;
      player.pushT = Math.max(0, player.pushT - dt);
    }
    if (rival.pushT > 0) {
      rival.x += rival.pushVel * dt;
      rival.pushT = Math.max(0, rival.pushT - dt);
    }
    syncClashSpark();
    syncHitSpark();
    syncSteelFlash();

    player.facing = 1;
    rival.facing = -1;
    dressRival(rival);
    tickAI(dt);
    updateGuard(rival, dt, !!rival.wantBlock);
    advanceAttack(player, dt);
    advanceAttack(rival, dt);
    advanceBolt(dt);
    tickBolt(dt);
    if (openBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling) {
      // Idle sheet pad is not the sword. Measure with slash tip.
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + LUNGE_PX;
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        openBuf = false;
        startAttack(player);
      }
    }
    if (slashBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling) {
      // Same hold gate as openBuf. Immediate fire after a landed cut sat
      // ~10px short (knock 80 − lunge 36) — whoosh + slash in empty air.
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + LUNGE_PX;
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        slashBuf = false;
        startAttack(player);
      }
    }
    tickGait(player, dt);
    tickGait(rival, dt);
    keepApart(dt);
    clampFighter(player);
    clampFighter(rival);
    resolveCuts();
    resolveBolt();
  }

  function drawCourtyard(ox) {
    const img = yardIndex === 1 ? ART.yard2 : ART.yard;
    if (!img.naturalWidth) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // Horizontal punch only. Vertical would uncover the bottom-aligned floor
    // (0px under-scan). Rest ox=0 keeps the old flush cover crop.
    const padX = ox ? Math.min(PUNCH_PX, Math.ceil(Math.abs(ox) + 0.5)) : 0;
    const sc = Math.max((W + padX * 2) / iw, H / ih);
    ctx.drawImage(img, (W - iw * sc) / 2, H - ih * sc, iw * sc, ih * sc);
  }

  function drawKnight(f) {
    const img = poseBitmap(f);
    if (!ready(img)) return;
    const { dx, dy, dw, dh, rot, pivX, pivY } = destRect(f);
    off.width = Math.max(1, Math.ceil(dw));
    off.height = Math.max(1, Math.ceil(dh));
    octx.clearRect(0, 0, off.width, off.height);
    octx.imageSmoothingEnabled = true;
    octx.imageSmoothingQuality = "high";
    octx.drawImage(img, 0, 0, dw, dh);
    if (f.stunT > 0 && !f.falling && hitFlashT > 0) {
      octx.globalCompositeOperation = "source-atop";
      const k = hitFlashT / HIT_FLASH_MS;
      octx.fillStyle = "rgba(255, 245, 238, " + (0.72 * k) + ")";
      octx.fillRect(0, 0, off.width, off.height);
      octx.globalCompositeOperation = "source-over";
    }
    ctx.save();
    ctx.translate(pivX, pivY);
    ctx.rotate(rot);
    ctx.translate(-pivX, -pivY);
    ctx.drawImage(off, dx, dy, dw, dh);
    ctx.restore();
  }

  const HUD_BAR_W = 252;
  const HUD_BAR_H = 16;
  const HUD_STAM_H = 5;
  const HUD_Y = 16;
  const HUD_PAD = 22;
  const COL_PIZARRA = "#3a342c";
  const COL_OXIDO = "#8a4a28";
  const COL_BRASA = "#c42818";
  const COL_HUESO = "#cfc3a8";
  const COL_NEGRO = "#0c0a08";
  const COL_TRACK = "rgba(18, 14, 10, 0.55)";
  const COL_EDGE = "rgba(30, 24, 18, 0.65)";

  function tickHudBar(f, dt) {
    if (f.hudFlashT > 0) f.hudFlashT = Math.max(0, f.hudFlashT - dt);
    else if (f.hudGhost > f.hp) f.hudGhost = Math.max(f.hp, f.hudGhost - 80 * (dt / 1000));
    else f.hudGhost = f.hp;
  }

  function hudBarX(left) {
    return left ? HUD_PAD : W - HUD_PAD - HUD_BAR_W;
  }

  function fillFrom(left, x, y, w, h, k) {
    const fw = w * Math.max(0, Math.min(1, k));
    if (left) ctx.fillRect(x, y, fw, h);
    else ctx.fillRect(x + w - fw, y, fw, h);
  }

  function drawLifeBar(f, left) {
    const x = hudBarX(left);
    const y = HUD_Y;
    const w = HUD_BAR_W;
    const h = HUD_BAR_H;
    const fill = f.hp / MAX_HP;
    const ghost = f.hudGhost / MAX_HP;
    ctx.fillStyle = COL_TRACK;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COL_PIZARRA;
    ctx.fillRect(x, y, w, h);
    if (ghost > fill) {
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.75;
      fillFrom(left, x, y, w, h, ghost);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = COL_HUESO;
    fillFrom(left, x, y, w, h, fill);
    if (f.hudFlashT > 0 && ghost > fill) {
      const k = f.hudFlashT / 220;
      const x0 = left ? x + w * fill : x + w - w * ghost;
      const fw = w * (ghost - fill);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.85 * k;
      ctx.fillRect(x0, y, fw, h);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = "#6d6456";
    ctx.fillRect(x, y + h - 2, w, 2);
    ctx.strokeStyle = COL_EDGE;
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    const sy = y + h + 3;
    const sh = HUD_STAM_H;
    const stam = f.stamina / STAMINA_MAX;
    const floor = STAMINA_START_MIN / STAMINA_MAX;
    ctx.fillStyle = COL_PIZARRA;
    ctx.fillRect(x, sy, w, sh);
    if (stam > 0) {
      ctx.fillStyle = f.guardBreakT > 0 ? COL_BRASA : COL_OXIDO;
      if (stam < floor || f.guardBreakT > 0) ctx.globalAlpha = 0.32;
      fillFrom(left, x, sy, w, sh, stam);
      ctx.globalAlpha = 1;
    }
    const tx = Math.round(left ? x + w * floor : x + w * (1 - floor));
    ctx.fillStyle = COL_HUESO;
    ctx.globalAlpha = 0.55;
    ctx.fillRect(tx, sy, 1, sh);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = COL_EDGE;
    ctx.strokeRect(x + 0.5, sy + 0.5, w - 1, sh - 1);
  }

  function drawHud() {
    drawLifeBar(player, true);
    drawLifeBar(rival, false);
  }

  function drawBolt() {
    if (!bolt) return;
    const cx = bolt.x + bolt.w * 0.5;
    const cy = bolt.y + bolt.h * 0.5;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(bolt.facing, 1);
    const hw = bolt.w * 0.5;
    const hh = bolt.h * 0.5;
    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(-hw + 2, hh + 2);
    ctx.lineTo(hw + 1, 2);
    ctx.lineTo(-hw + 2, -hh + 2);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = COL_PIZARRA;
    ctx.beginPath();
    ctx.moveTo(-hw, hh * 0.85);
    ctx.lineTo(hw * 0.35, hh * 0.55);
    ctx.lineTo(hw, 0);
    ctx.lineTo(hw * 0.35, -hh * 0.55);
    ctx.lineTo(-hw, -hh * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = COL_OXIDO;
    ctx.beginPath();
    ctx.moveTo(-hw + 3, hh * 0.55);
    ctx.lineTo(hw * 0.28, hh * 0.38);
    ctx.lineTo(hw - 2, 0);
    ctx.lineTo(hw * 0.28, -hh * 0.38);
    ctx.lineTo(-hw + 3, -hh * 0.55);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(-hw + 6, -hh * 0.28, hw * 1.05, hh * 0.56);
    ctx.fillStyle = COL_HUESO;
    ctx.beginPath();
    ctx.moveTo(hw * 0.22, -hh * 0.32);
    ctx.lineTo(hw, 0);
    ctx.lineTo(hw * 0.22, hh * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }


  function drawHitFlash() {
    /* Full-canvas white/red dropped. Per-sprite stun tint stays in drawKnight. */
  }

  function spawnSteelFlash(x, y, atk, def) {
    steelX = x;
    steelY = y;
    steelAtkYou = !atk || atk === player;
    steelHomeYou = !def || def === player;
    const a = hitWoundAnchor(def || player);
    steelWoundDX = x - a.x;
    steelWoundDY = y - a.y;
    steelFlashT = STEEL_FLASH_MS;
  }

  function syncSteelFlash() {
    if (steelFlashT <= 0) return;
    const atk = steelAtkYou ? player : rival;
    const def = steelHomeYou ? player : rival;
    const ha = bladeBox(atk);
    const bb = bodyAABB(def);
    const x0 = Math.max(ha.x, bb.x);
    const y0 = Math.max(ha.y, bb.y);
    const x1 = Math.min(ha.x + ha.w, bb.x + bb.w);
    const y1 = Math.min(ha.y + ha.h, bb.y + bb.h);
    if (x1 > x0 && y1 > y0) {
      steelX = (x0 + x1) * 0.5;
      steelY = (y0 + y1) * 0.5;
      const a = hitWoundAnchor(def);
      steelWoundDX = steelX - a.x;
      steelWoundDY = steelY - a.y;
      return;
    }
    const a = hitWoundAnchor(def);
    steelX = a.x + steelWoundDX;
    steelY = a.y + steelWoundDY;
  }

  function syncClashSpark() {
    if (clashSparkT <= 0) return;
    const home = clashHomeYou ? player : rival;
    const hb = bladeBox(home);
    clashX = bladeTipX(home) + clashTipDX;
    clashY = hb.y + hb.h * 0.45 + clashTipDY;
  }

  function syncHitSpark() {
    if (hitSparkT <= 0) return;
    const home = hitHomeYou ? player : rival;
    const a = hitWoundAnchor(home);
    hitSparkX = a.x + hitWoundDX;
    hitSparkY = a.y + hitWoundDY;
  }

  function drawClashSpark() {
    if (clashSparkT <= 0) return;
    syncClashSpark();
    const k = clashSparkT / CLASH_SPARK_MS;
    const grow = 1 - k;
    ctx.save();
    ctx.translate(clashX, clashY);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.7 * k;
    ctx.fillStyle = "#fff6e8";
    ctx.beginPath();
    ctx.arc(0, 0, 3 + 9 * grow, 0, Math.PI * 2);
    ctx.fill();
    for (const sh of clashShards) {
      const inner = sh.len * (0.12 + 0.2 * grow);
      const outer = sh.len * (0.55 + 1.05 * grow);
      const c = Math.cos(sh.ang);
      const sn = Math.sin(sh.ang);
      ctx.globalAlpha = (sh.brasa ? 0.9 : 1) * k;
      ctx.strokeStyle = sh.brasa ? "#e06028" : "#fffdf6";
      ctx.lineWidth = sh.brasa ? 2.4 : 1.7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c * inner, sn * inner);
      ctx.lineTo(c * outer, sn * outer);
      ctx.stroke();
      if (sh.brasa) {
        ctx.globalAlpha = 0.85 * k;
        ctx.fillStyle = "#ffb060";
        ctx.beginPath();
        ctx.arc(c * outer, sn * outer, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawHitSpark() {
    if (hitSparkT <= 0) return;
    syncHitSpark();
    const k = hitSparkT / HIT_SPARK_MS;
    const grow = 1 - k;
    ctx.save();
    ctx.translate(hitSparkX, hitSparkY);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.8 * k;
    ctx.fillStyle = "#fff1e0";
    ctx.beginPath();
    ctx.arc(0, 0, 4 + 11 * grow, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.55 * k;
    ctx.fillStyle = "#c42818";
    ctx.beginPath();
    ctx.arc(0, 0, 2 + 18 * grow, 0, Math.PI * 2);
    ctx.fill();
    for (const sh of hitShards) {
      const inner = sh.len * (0.08 + 0.18 * grow);
      const outer = sh.len * (0.6 + 1.15 * grow);
      const c = Math.cos(sh.ang);
      const sn = Math.sin(sh.ang);
      ctx.globalAlpha = (sh.brasa ? 0.95 : 1) * k;
      ctx.strokeStyle = sh.brasa ? "#c42818" : "#fff4e6";
      ctx.lineWidth = sh.brasa ? 3.2 : 2.0;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c * inner, sn * inner);
      ctx.lineTo(c * outer, sn * outer);
      ctx.stroke();
      if (sh.brasa) {
        ctx.globalAlpha = 0.9 * k;
        ctx.fillStyle = "#ff7040";
        ctx.beginPath();
        ctx.arc(c * outer, sn * outer, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function syncBrasaFx() {
    if (brasaFxT <= 0) return;
    const home = brasaHomeYou ? player : rival;
    if (brasaFxKind === "clash" || brasaFxKind === "cast") {
      const hb = bladeBox(home);
      brasaX = bladeTipX(home) + brasaWoundDX;
      brasaY = hb.y + hb.h * 0.45 + brasaWoundDY;
      return;
    }
    const a = hitWoundAnchor(home);
    brasaX = a.x + brasaWoundDX;
    brasaY = a.y + brasaWoundDY;
  }

  function brasaTone(tone) {
    if (tone === "oxido") return COL_OXIDO;
    if (tone === "hueso") return COL_HUESO;
    if (tone === "pizarra") return COL_PIZARRA;
    if (tone === "negro") return COL_NEGRO;
    return COL_BRASA;
  }

  function drawBrasaFx() {
    if (brasaFxT <= 0) return;
    syncBrasaFx();
    const life = brasaFxKind === "block" ? STEEL_FLASH_MS : (brasaFxKind === "clash" ? CLASH_SPARK_MS : (brasaFxKind === "cast" ? BOLT_CAST_FX_MS : HIT_SPARK_MS));
    const k = brasaFxT / life;
    const grow = 1 - k;
    ctx.save();
    ctx.translate(brasaX, brasaY);
    if (brasaFxKind === "hit") {
      ctx.globalAlpha = 0.4 * k;
      ctx.fillStyle = COL_OXIDO;
      ctx.beginPath();
      ctx.arc(0, 0, 7 + 14 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.72 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(0, 0, 4 + 8 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.55 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(brasaDir * 2, -1, 1.6 + 2.2 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.35 + 0.85 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.85 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d - 3 * grow, sh.r * (0.85 + 0.4 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "cast") {
      ctx.globalAlpha = 0.34 * k;
      ctx.fillStyle = COL_NEGRO;
      ctx.beginPath();
      ctx.arc(0, 0, 5 + 6 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.58 * k;
      ctx.fillStyle = COL_OXIDO;
      ctx.beginPath();
      ctx.arc(brasaDir * 1, -1, 3.6 + 4.5 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.72 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(brasaDir * 2, -1, 2 + 2.8 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.42 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(brasaDir * 2.4, -2, 1.0 + 1.3 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.22 + 0.65 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.8 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d + brasaDir * 1, sn * d - 2 * grow, sh.r * (0.85 + 0.3 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "block") {
      ctx.strokeStyle = COL_OXIDO;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.8 * k;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(-3 * brasaDir, 2);
      ctx.quadraticCurveTo(6 * brasaDir, -10 * k, 14 * brasaDir * k, -16 * k);
      ctx.stroke();
      ctx.strokeStyle = COL_BRASA;
      ctx.globalAlpha = 0.7 * k;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-1 * brasaDir, 1);
      ctx.quadraticCurveTo(4 * brasaDir, -7 * k, 10 * brasaDir * k, -12 * k);
      ctx.stroke();
      ctx.fillStyle = COL_PIZARRA;
      ctx.globalAlpha = 0.35 * k;
      ctx.beginPath();
      ctx.arc(0, 0, 3 + 5 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.4 + 0.9 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.save();
        ctx.translate(c * d, sn * d - 2 * grow);
        ctx.rotate(sh.ang);
        ctx.globalAlpha = 0.8 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.fillRect(-sh.r, -sh.r * 0.45, sh.r * 2.1, sh.r * 0.9);
        ctx.restore();
      }
    } else {
      ctx.globalAlpha = 0.35 * k;
      ctx.fillStyle = COL_OXIDO;
      ctx.beginPath();
      ctx.arc(0, 0, 3 + 6 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.55 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(0, 0, 2 + 3 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.3 + 1.05 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.88 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d + 2 * grow, sh.r * (0.8 + 0.35 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawPlantDust() {
    if (!plantDust.length) return;
    ctx.save();
    for (const p of plantDust) {
      const k = Math.max(0, 1 - p.t / p.life);
      if (p.speck) {
        ctx.globalAlpha = 0.5 * k * p.power;
        ctx.fillStyle = "#3a2e22";
        const rad = 1.7 + 1.3 * k;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, rad, rad * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.globalAlpha = 0.3 * k * Math.min(1.2, p.power);
        ctx.fillStyle = "#1a1410";
        const w = (16 + 20 * (1 - k)) * p.power;
        const h = (4.5 + 2 * k) * Math.min(1, p.power);
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, w, h, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawSteelFlash() {
    if (steelFlashT <= 0) return;
    syncSteelFlash();
    const k = steelFlashT / STEEL_FLASH_MS;
    ctx.save();
    ctx.translate(steelX, steelY);
    ctx.globalAlpha = 0.35 + 0.65 * k;
    ctx.strokeStyle = "#e8e2d2";
    ctx.fillStyle = "rgba(210, 205, 190, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-18 * k, 0);
    ctx.lineTo(18 * k, 0);
    ctx.moveTo(0, -14 * k);
    ctx.lineTo(0, 14 * k);
    ctx.moveTo(-12 * k, -10 * k);
    ctx.lineTo(12 * k, 10 * k);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 5 + 8 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawTitleCard() {
    const cw = 560;
    const ch = 176;
    const cx = (W - cw) / 2;
    const cy = (H - ch) / 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.94)";
    ctx.fillRect(cx, cy, cw, ch);
    ctx.strokeStyle = "rgba(216, 207, 194, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(cx + 0.5, cy + 0.5, cw - 1, ch - 1);
    ctx.fillStyle = "#d8cfc2";
    ctx.font = 'italic 76px Palatino, "Palatino Linotype", Georgia, serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Víspera", W / 2, H / 2);
    const fade = Math.max(0, Math.min(1, (modeT - 420) / 520));
    if (fade > 0) {
      ctx.globalAlpha = 0.55 * fade;
      ctx.font = '16px Palatino, "Palatino Linotype", Georgia, serif';
      ctx.fillStyle = "#a89b88";
      ctx.fillText("Espacio", W / 2, H / 2 + 54);
      ctx.globalAlpha = 1;
    }
  }

  function drawOverPrompt() {
    if (mode !== "over") return;
    const fade = Math.max(0, Math.min(1, modeT / 400));
    if (fade <= 0) return;
    ctx.save();
    ctx.globalAlpha = 0.6 * fade;
    ctx.font = '16px Palatino, "Palatino Linotype", Georgia, serif';
    ctx.fillStyle = "#a89b88";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Espacio", W / 2, H - 42);
    ctx.restore();
  }

  function draw() {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    let sx = 0;
    if (mode !== "title" && shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      const env = k * k;
      sx = shakeDir * shakeMag * env;
      sx = Math.max(-PUNCH_PX, Math.min(PUNCH_PX, sx));
    }
    ctx.setTransform(1, 0, 0, 1, sx, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(-PUNCH_PX - 2, -2, W + PUNCH_PX * 2 + 4, H + 4);
    drawCourtyard(sx);
    if (player.falling) {
      drawKnight(rival);
      drawKnight(player);
    } else {
      drawKnight(player);
      drawKnight(rival);
    }
    if (mode !== "title") {
      drawBolt();
      drawPlantDust();
      drawSteelFlash();
      drawClashSpark();
      drawHitSpark();
      drawBrasaFx();
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (mode === "title") {
      drawTitleCard();
      return;
    }
    drawHud();
    drawOverPrompt();
  }

  let last = 0;
  let acc = 0;
  function loop(now) {
    try {
      if (!last) last = now;
      let delta = now - last;
      last = now;
      if (delta > 50) delta = 50;
      acc += delta;
      while (acc >= STEP) {
        update(STEP);
        acc -= STEP;
      }
      draw();
    } catch (err) {
      try { window.__visperaErr = String(err && err.stack || err); } catch (e2) {}
    }
    requestAnimationFrame(loop);
  }
  window.__v = function () {
    return {
      mode: mode,
      modeT: modeT,
      openLeft: openLeft,
      php: player.hp,
      rhp: rival.hp,
      rph: rival.phase,
      px: player.x,
      rx: rival.x,
      err: window.__visperaErr || null,
    };
  };

  requestAnimationFrame(loop);
})();
