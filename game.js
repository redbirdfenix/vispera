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
 * Walk LEAN 0.05 (locked). Idle breath destRect-only. Title menu: JUGAR/CONTROLES/OPCIONES/ESCENARIOS + remap.
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
 * Over prompts REVANCHA / R pixel (KO stays on screen, no card covering the crumple).
 * Winner finishes the cut after KO (no freeze mid-slash) then sheathes 140ms. destRect-only dip.
 * KO fall keeps plant x (no 280/900 teleport). Soft edge nudge only if sheet clips.
 * Hurt crumple is KO only (hp 0 / falling). Stun keeps idle + flash + destRect flinch — the 45° sheet is a death, not a chip.
 * HUD life bar: metal/pizarra frame, recessed well, hueso HP (brasa flash on hit), óxido stamina with start-min tick, super pip brasa when full. Palette pizarra/óxido/brasa/hueso/negro. Drain/flash, no 3 pips.
 * Stam floor 15: hueso tick + pizarra-dim fill below (S no raise). Guard-break 400ms keeps that dead look even past 15. Both fighters.
 * Clash bounce: no instant ±90 teleport. Spark stays on the blades through
 * hitstop; bodies slide CLASH_STEP over KNOCK_MS after, same as hit knock.
 * After freeze the clash spark rides the live blade tip (planted world xy
 * sat in the ~55px gap for the leftover 110ms fade).
 * Flesh spark same: inset vs live hurt (cutPoint/AABB), not planted world xy
 * (after hitstop the body knocks ~80px and the 140ms fade hung in air).
 * Camera punch: 10px horizontal, courtyard scales just enough overscan
 * (no black edge, floor stays planted, no new art). Envelope squares.
 * Camera punch leftover: overscan used to track |ox|, so the yard zoomed
 * as the slam squared out (fighters stayed put). Hold PUNCH_PX cover
 * while the punch is live (punchCover). Punch is a slide, not a zoom.
 * Rest ox=0 still flush. destRect/AABB planted. Envelope still squares.
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
 * K bolt: 200 startup / 280 recovery, -30 stam, one live dart (shared; answer opposing startup/live so birth can clash).
 * K dart blocked: chip −2 HP (not the clean −10). Spent super blocked chips −6 (not −28, not a full-bar wipe). Space/L blocked stay 0. Chip can KO at 1–2, never a full bar.
 * Horizontal brasa/oxido from the live blade tip (same tipX as the plant puff). Canvas only. Space/J slash.
 * Special cancel: last 100ms of Space or L recovery into K, hit/block only (whiff keeps full recovery). Clash late recovery (~last 100ms of the 200ms clash recovery) also doors into Space slash, L golpe, and K. Still −30 stam, no start <30. Not a free super. Not a K-from-whiff. Not a free fireball on clash. Not a cancel from guard or walk. Rival uses that same connected tajo/golpe → K door (chance after hit/block, not a mash, not from idle, not on whiff). Rival clash-cancels into K the same late door (40% once-per-clash, same −30 / 200, respects BOLT_AI_CD, not a dart robot, not from early clash recovery). Rival clash-cancels into Space slash or L golpe the same late door (40% once-per-clash, not a mash robot, not from early clash recovery). Clash-K keeps priority so that dart door is not stolen.
 * Same verb on the rival: range only (beyond HOLD),
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
 * (canvas, spawnBrasaFx "cast") so the 200ms plant reads. Life 220 so the puff holds through dart birth (was 180, died ~20ms early). Same puff, no second spawn. Dart births from castPlantXY (tip).
 * Hitstop-safe, rides the blade. Dies after the first dart frames. Does not replace the dart.
 * Connect VFX stays ember puff / heat lick / ember scatter.
 * Landscape pad under the 16:9 canvas (coarse pointer, or a real touch). Stick walks A/D, tap Space/L/K, hold S.
 * Keyboard bindings unchanged except L. Portrait: same pad in the bottom black letterbox; canvas stays 16:9; #giro hidden. Stick still horizontal A/D.
 * Pad feel: pressed palette (pizarra/oxido/brasa/hueso/negro), labels on the strip,
 * touch-action + preventDefault while a fight finger is down. No canvas overlay.
 * L golpe: 120 / 80 / 180. Lunge 18. Same −10 clean / 0 block. Hitbox solo en active.
 * Reuses slash sheets (time). One cancel: tajo→golpe in last 100ms of Space recovery, hit/block only (whiff keeps full recovery). Late active / early recovery still buffer into that window; idle otherwise. Clash late recovery (~last 100ms of the 200ms clash recovery) also doors into L. Early clash recovery still locked. Not a free mash on clash. Rival uses that same connected tajo→golpe door (chance after hit/block, not a mash, not from idle, not on whiff). Rival clash-cancels into L the same late door (40% once-per-clash, not a mash, not from early clash recovery).
 * Reverse door: golpe→tajo in last 100ms of L recovery, hit/block only (whiff keeps full recovery). Space from L still waits for idle until that window. Clash late recovery also doors into Space slash the same way. Not a combo list, not juggles. Rival uses that same connected golpe→tajo door (chance after hit/block, not a mash, not from idle, not on whiff). Rival clash-cancels into Space the same late door (40% once-per-clash, not a mash, not from early clash recovery).
 * Special cancel uses that same late-recovery door: tajo or golpe into K, hit/block only. Clash late recovery doors into Space slash, L golpe, and K the same way. Rival uses that same connected tajo/golpe → K door (40% once-per-connect, hit/block only, not a mash, not from idle, not on whiff). Clash late K is the same door for you and the rival (40% once-per-clash, respects BOLT_AI_CD). Clash late Space/L is the same door for you and the rival (40% once-per-clash). Clash-K keeps priority so that dart door is not stolen.
 * Special-cancel K holds the cut pose (slash/golpe sheet + destRect plant) through the 200ms startBolt plant and through K recovery. Dart still births from that live tip and leaves it. Recovery sheathes from the cut (existing 140ms envelope) instead of popping idle — breath used to seat destRect ~1.5px. No destRect hop. Idle/walk K still uses the windup plant.
 * Touch: golpe sits next to tajo in the right cluster (still smaller, both thumbable), not a sixth top-level button. Dart zone is a larger round hit target. KeyK tap still plants.
 * Rival uses golpe at close as a faster punish, not as their only cut. After a connected tajo (hit/block, not whiff) they can cancel into golpe in the last 100ms — same window as you, not every slash, not from idle. After a connected golpe they can reverse into tajo the same way — last 100ms, hit/block only, 40% once-per-connect, not a mash, not from idle, not on whiff. After a connected tajo or golpe they can special-cancel into K the same way — last 100ms, hit/block only, 40% once-per-connect, same −30 / 200 startup, respects BOLT_AI_CD, not a dart robot, not from idle, not on whiff. After a clash they can cancel into K in the last 100ms of clash recovery the same way — 40% once-per-clash, same −30 / 200, respects BOLT_AI_CD, not from early clash recovery. After a clash they can cancel into Space or L in that same last 100ms — 40% once-per-clash, not a mash, not from early clash recovery. Clash-K keeps priority so that dart door is not stolen. Space/J stay 180/140/280.
 * Close throw: Space+S chord (not a 6th button). Pad hold-guarda + tap-tajo is that same chord while absGap<=120.
 * Range absGap<=120 (keepApart pocket / overlap / very close). Not a fullscreen command grab.
 * Far pad chord does not throw (stay guard; no new far option). Keyboard Space+S unchanged (still starts, whiffs far).
 * 80 / 40 / 220. −20 hp. 0 stam. Beats hold-guard. Loses to a mashed Space or L already active. Whiff if too far.
 * Short startup. Throw tech: Space+S during the 80ms startup only (not active, not the 220 recovery). Both break apart, no damage, shared 160ms recovery. Too-late tech does nothing. Not a new attack. Whiff still whiffs. Pad uses the same chord.
 * Rival throws the same close throw: only vs hold-guard, absGap<=120, THROW_AI_CD 1800 so they are not a grab robot. Idle/walk still eats a slash or dart. Player techs with Space+S in the 80ms startup. Rival techs that same window (chance, not every throw, not after the window).
 * On hit: snap together + hurt-sheet knockdown (existing KO art, no redraw). Not a full KO from 100.
 * Throw will not grab knockdown or stun (stunT / thrownT). Short throw-invuln on wakeup so the first grounded frame is not a free re-grab. Not a wakeup super. Same-frame both-active throws tech (throw-break), not P1-wins. Rival still gated by THROW_AI_CD 1800.
 * Reversal from guard: hold S, tap L (not Space — Space+S is throw). Same L golpe frames/art (120/80/180). Short startup invuln so it beats a meaty Space slash. Costs REVERSAL_STAM 30 (a real chunk, not free). Loses to throw. On wakeup, L+S spends throw-invuln the same way (not a wakeup super). Far / out of throw range: L-from-guard still reverses, does not throw. Close: Space+S stays throw, L+S stays reversal. Chords do not collide. Pad: hold-guarda + tap-golpe, no 6th face button. Rival reversals that same L-from-guard: only while actually guarding AND a meaty Space slash or L golpe is coming (inThreat / incoming Space or L), REVERSAL_AI_CD 1800 + 40% once-per-swing so they are not a reversal robot. Not every block, not every L, not vs dart, not vs throw (throw still beats a bad reversal). Same 30 stam, same 120ms invuln, same L frames.
 * Wakeup reversal: after knockdown (thrownT/stunT expiry / throwInvuln window), tap L without holding S. Same 30 stam, same 120ms strike-invuln, same L frames (startReversal path). Still loses to throw — spends the throw-invuln so it is not a wakeup super. Hold-S tap-L on getup is that same spend (startReversal), not a second invuln. Too early (still down / thrownT) does nothing. Too late (window gone) is a normal L. One wakeup attempt per getup (wakeRev) so leftover throw-invuln cannot loop a free reversal. Pad: tap golpe on getup, no 6th button. Rival wakeup-reversals that same startReversal path: only on getup vs a meaty Space or L in pocket (incoming Space/L startup/active), REVERSAL_AI_CD 1800 + 40% once-per-getup so they are not a reversal robot. Not every wakeup, not every L, not vs dart, not vs throw (throw still beats a bad reversal). Same 30 stam, same 120ms invuln, same L frames.
 * Super meter: one stock. Connecting hits fill that fighter (slash/golpe/dart/throw) +20. Blocked specials fill a little (+10). Five connects fill one stock; two no longer dump a dart. Full bar: next K spends it for a heavier dart (−28, not a 100-to-0). Empty K is the normal −10 dart. Same 200 plant / −30 stam; super recovery 380 so it is a read. Empty chip stays −2; spent super blocked chips −6 (not −28). Pad still K, no 6th button. HUD: small brasa pip under stam fills while charging (pizarra/óxido/brasa/hueso), no new art.
 * Rival fills and spends the same stock. Range super only after a connect and inside SUPER_RANGE, never every full bar from fullscreen. Special-cancel K may spend (close, can hit). Still respects BOLT_AI_CD. Not a super robot.
 * Super spend sting: full-meter K (you + rival) layers pitched brasa/cast, not tajo whoosh. Empty K keeps the plant cast.
 * Super connect sting: spent dart (you + rival) pitches/layers brasa impacto on hit (including vs Space/L steel), brasa bloqueo on block. Empty dart vs steel still choque. Empty dart keeps the current impacto / bloqueo / choque.
 * Spent super dart vs Space/L steel is not a 0 clash (you + rival). It beats the slash: defender eats −28, slash loses. Empty dart vs steel still clashes 0 (including same-frame meaty cut — clash before landHit so cuts-first cannot orphan the dart). Guard still chips −6. One live dart: opposing birth clashes (equal cancel / spent beats empty / empty cannot erase spent) instead of silent overwrite.
 * Close-range same-frame Space/L cannot trade-delete a spent super: the meaty cut is skipped so the dart still lands (−28). Empty dart can still clash or lose. Guard still chips −6. Throw order unchanged.
 * Super spend freeze: full-meter K plant (you + rival) snaps existing hitstop + camera punch (HITSTOP_BLOCK 60 / mag 10), then the 200ms plant continues and the dart flies. Not the whole startup. Empty K stays the current plant. No new art.
 * Spent dart in the air (you + rival) is bigger and faster so it reads as a round closer, still −28, one stock, no new art. Empty dart stays 58×13 at 880. Comet tail is existing brasa/oxido/hueso rects (not a tick spawnBrasaFx). SUPER_RANGE 380. BOLT_AI_CD stays.
 * Spent dart land VFX (you + rival) reuses brasa hit/block puff at BOLT_SUPER_FX 1.55 so the ember matches the 96×24 bolt. Empty dart keeps the current puff. Clash puff uses that same scale. No new art.
 * Spent-super plant puff (you + rival) reuses spawnBrasaFx "cast" at BOLT_SUPER_FX 1.55 like the land puff. Empty K plant puff stays the current ember. Same tip, same 220 life. No new art.
 * Pushblock: hold S (guard), tap away from the rival (A if you face right, D if you face left). Extra guard push — more space than a normal block push. Costs PUSHBLOCK_STAM 25 (a real chunk, not free). Cannot if stam is empty / below 25. Toward is not pushblock. Walk-into-guard (A held, then S) is not a tap, not a teleport. Walk while not guarding unchanged. Space+S close stays throw, not pushblock. L+S stays reversal. Pad: hold guarda + tap the away walk button (same A/D keys, no 6th button). Rival pushblocks that same away extra push on a connecting block (landBlock), not the windup: startup shove used to make a meaty L/Space whiff the 240px before active. PUSHBLOCK_AI_CD 1800 + 40% once-per-block so they are not a pushblock robot. Not every block, not vs dart, not vs throw, not during startup. Same 25 stam, same 240px. Toward is not pushblock. landBlock's normal scrape does not overwrite that live shove.
 * Pushblock sting: successful shove (you + rival) pitches/layers block steel + clash scrape so the extra push reads. Normal block keeps the current bloqueo.
 * Pushblock dust: successful shove (you + rival) reuses plant dust at PUSHBLOCK_FX, scaled and offset along the away scrape so the 240px shove reads. Normal block keeps the current 1.0 plant. No new art.
 * Teach HUD (first fight): two discreet pixel lines — remap-aware BIND_ACTIONS labels —
 * A/D andar, S guarda, Espacio tajo, L golpe, K dardo,
 * S al filo PARRY→Espacio/L riposte leads line 2 (agarre/rev follow). Palette muted hueso (#a89b88).
 * Fades in on play; fades out after first connect (hit / block / throw / dart / clash / tech),
 * OR after 3+ distinct verbs, OR after ~12s (HINT_HOLD_MS). Patio clean (no card). Rematch stays gone.
 * Tutorial / escenarios contrast (v311): teach copy leads with PARRY (S al filo)→RIPOSTE.
 * Pushblock / clash readability (v312): pushblock connect juices distinct from normal block —
 * óxido steel asterisk + PUSHBLOCK_SHAKE 8 (block stays 4) + pitched bloqueo/choque sting.
 * No separate crush verb: clash gets clearer grit (CLASH_FX shove trails on top of locked 1.2),
 * CLASH_SHAKE 14 screen punch, layered choque sting, shards in pizarra/óxido/brasa/hueso.
 * Juice only — frames / damage / tipX / plants / pad / parry / AI / tutorial locked.
 * Throw-tech / tech-clash readability (v313): successful Space+S tech juices distinct from
 * failed throw (landThrow impacto) and normal block — hueso/brasa steel asterisk + TECH_SHAKE 9
 * (block 4 / pushblock 8 / clash 14) + pitched choque/bloqueo sting. Mutual break-apart gets
 * clearer grit (TECH_FX shove trails on top of locked 1.1). Juice only — THROW_TECH window /
 * recovery / damage / tipX / plants / pad / parry / AI / tutorial / pushblock-clash v312 locked.
 * Grab-connect readability (v314): successful landThrow juices distinct from tech / normal hit /
 * block — brief brasa/hueso grab puff + GRAB_SHAKE 11 (hit 10 / riposte 12) + pitched impacto
 * sting. Keeps unpitched impacto first. Juice only — THROW frames / dmg / tech window / tipX /
 * plants / pad / parry / AI / tutorial / pushblock-clash v312 / tech juice v313 locked.
 * Damage-number distinct leftover (v315): floating −N hit vs chip vs throw now read apart
 * (hueso 4 / óxido "-" 2 / brasa 3). Draw-only. Combat math / grab juice v314 locked.
 * Dust / hit spark polish (v316): cleaner flesh sparks — fewer muddy particles, sharper
 * brasa/hueso streaks, shorter post-freeze life so knock does not smear. Block steel
 * asterisks (push/tech/block steelKind) stay distinct. Slight quieter ground grit on
 * heavy connects (fewer knock specks). Draw-only. Combat math / dmg distinct v315 locked.
 * Feint cancel readability (v317): S during slash startup juices a distinct whoosh-down /
 * soft sheath sting (pitched whoosh + soft bloqueo) plus a tiny tip hueso fleck so the
 * cancel reads vs guard drop / whiff recovery. Discreet — not hit bloom, not parry gleam,
 * no shake. Juice only — FEINT_RECOVERY / frames / tipX / plants / pad / sparks v316 /
 * dmg nums / grab-tech-pushblock / parry-riposte locked.
 * Reversal juice (v319): L-from-guard / wakeup startReversal juices a distinct pitched whoosh-up
 * + soft choque sting plus a brief chest invuln fleck (hueso/brasa/pizarra) and light plant dust
 * so the cancel reads vs normal golpe. Discreet — not parry gleam, not hit bloom, no shake.
 * Juice only — FEINT_RECOVERY / frames / tipX / plants / pad / sparks v316 / feint v317 /
 * dmg nums / grab-tech-pushblock / parry-riposte locked.
 * Wakeup / getup readability (v320): rising from KD (thrownT expiry / throw-invuln arm) juices a
 * brief getup grit stamp so the grounded frame reads, plus an optional soft hueso wash on chest
 * (hueso/pizarra only — not reversal fleck, not parry gleam, no shake).
 * Soft getup foot-scrape SFX (v321): same getup arm plays pitched whoosh-down + very quiet
 * bloqueo plant scrape matching the grit stamp. Distinct from feint sheath sting, reversal
 * whoosh-up/choque, parry gleam, riposte, grab impacto. No shake / no frame-invuln retune.
 * Juice only — THROW_WAKE_INVULN / frames / tipX / plants / pad / sparks v316 / feint v317 / reversal v319 /
 * wakeup grit v320 / dmg nums / grab-tech-pushblock / parry-riposte locked.
 * Special-cancel K clarity (v322): connected Space/L→K (holdCut, not clash-K, not idle K)
 * layers a pitched cast/whoosh cancel sting so the cut→dart plant reads vs idle knife plant.
 * Soft plant dust on cancel. Keeps existing cast puff on slash tip (do not replace brasaFxKind cast).
 * Distinct from feint whoosh-down, reversal whoosh-up/choque, getup scrape, super spend brasa stack,
 * idle cast+knifeThrow. No shake / no frame retune.
 * Juice only — BOLT_CANCEL_MS / frames / tipX / plants / pad / sparks v316 / feint v317 / reversal v319 /
 * wakeup grit v320 / getup scrape v321 / dmg nums / grab-tech-pushblock / parry-riposte locked.
 * Steel flash ↔ punchCover (v323): block steel asterisk used to fade on its own STEEL_FLASH_MS
 * linear clock while punchCover held full through the slam — asterisk died mid-cover. Draw-only
 * (steelFlashK). Peak while cover is full (k>0.25); ease out over cover's last quarter (same
 * smoothstep as punchCover / hurtFlashK). No punch keeps linear steelFlashT fade. push/tech/block
 * steelKind variants unchanged. STEEL_FLASH_MS 60 arm unchanged.
 * KO land grit (v323): caida bumpShake used to re-arm punchCover after kill flash died — yard
 * punched with no white. Prefer grit+shake only on land (camera sx still slides); skip overscan
 * punch once koLanded. Do not re-arm HIT_FLASH. Juice only — hitFlash v301 / hudFlash / pushblock /
 * clash / wakeup / special-cancel K / tipX / plants / frames / pad / parry-riposte locked.
 * Meter fill ↔ punchCover (v324): fill-to-full / gain pulse used to fade on their own
 * METER_FLASH_MS / METER_GAIN_MS linear clocks while punchCover held full through the slam —
 * pip flash died mid-cover. Draw-only (meterFlashK / meterGainK). Peak while cover is full
 * (k>0.25); ease out over cover's last quarter (same smoothstep as punchCover / hurtFlashK /
 * steelFlashK). Hold armed clocks through live punch; clear when cover dies (no linear pop).
 * Spend flash stays linear (own freeze). No punch keeps linear fade. METER_FLASH_MS 220 /
 * METER_GAIN_MS 180 arm unchanged. Juice only — hitFlash v301 / steel v323 / hudFlash /
 * pushblock / clash / wakeup / special-cancel K / tipX / plants / frames / pad / parry-riposte locked.
 * Parry interrupt leftover (v325): perfect-parry used to pop the attacker slash/golpe
 * sheet to idle the same tick landParry set stunT (sheatheFade dies on stun; poseBitmap
 * idle immediately), so the freeze frame was standing idle while gleam sat on blades —
 * a snap, not a break. Draw-only (parryFade). Fade leftover slash→idle over SHEATHE_MS.
 * Hold clock through freeze. poseBitmap still idle (chip stun path). destRect eases
 * leftover active ox/rot into flinch (AABB planted). Tip eases slash→idle with fade.
 * PARRY_STAGGER 180 / PARRY_GLEAM 80 / frames / tipX / plants / pad locked.
 * Parry gleam ↔ punchCover (v326): perfect-parry brasa gleam used to fade on its own
 * PARRY_GLEAM_MS linear clock while punchCover held full through the slam — gleam died
 * mid-cover (steel asterisk sibling already fixed in v323). Draw-only (parryGleamK).
 * Peak while cover is full (k>0.25); ease out over cover's last quarter (same smoothstep
 * as punchCover / steelFlashK / hurtFlashK). No punch keeps linear parryGleamT fade.
 * PARRY_GLEAM_MS 80 / bumpShake 6 / HITSTOP_BLOCK 60 arm unchanged. Juice only —
 * parryFade v325 / steel v323 / meter v324 / tipX / plants / frames / pad locked.
 * Pad zone slide-off leftover (v327): hold-guarda (and other zone holds) used to dump on
 * lostpointercapture when the thumb drifted slightly off the hit target — capture loss
 * released KeyS while the finger was still down. Capture loss does not dump zone holds
 * (padByPtr). Window pointerup / pointercancel still release. Stick path unchanged.
 * Landscape/portrait pad 2×2, multi-touch chords (throw Space+S, reversal S+L) stay.
 * Juice/combat frames / tipX / plants locked. No 6th button.
 * Clash spark ↔ punchCover (v328): choque spark used to fade on its own
 * CLASH_SPARK_MS linear clock while punchCover held full through the slam —
 * shards died mid-cover (steel asterisk / parry gleam siblings). Draw-only (clashSparkK).
 * Peak while cover is full (k>0.25); ease out over cover's last quarter (same
 * smoothstep as punchCover / steelFlashK / hurtFlashK / parryGleamK). No punch
 * keeps linear clashSparkT fade. CLASH_SPARK_MS 110 / CLASH_SHAKE 14 /
 * HITSTOP_BLOCK 60 arm unchanged. Juice only — pad v327 / parry gleam v326 /
 * steel v323 / meter v324 / tipX / plants / frames locked.
 * Flesh hit spark ↔ punchCover (v329): clean flesh spark used to fade on its own
 * HIT_SPARK_MS 100 linear clock while punchCover held full through the slam —
 * shards died mid-cover (white still peaked via hurtFlashK). Draw-only (hitSparkK)
 * + hold armed clock through live punch; clear when cover dies (no linear pop).
 * Peak while cover is full (k>0.25); ease out over cover's last quarter (same
 * smoothstep as punchCover / clashSparkK / steelFlashK / hurtFlashK / parryGleamK).
 * Related dart ember draw (brasaFxKind hit / brasaHitK) same cover envelope; hold+clear
 * only for hit kind. BRASA_HIT_MS 140 stays longer than HIT_SPARK_MS 100 (dart ember
 * separated). No punch keeps linear fade. HIT_SPARK_MS 100 / BRASA_HIT_MS 140 /
 * HITSTOP_HIT 140 arm unchanged. Juice only — clashSparkK v328 / pad v327 /
 * parry gleam v326 / steel v323 / meter v324 / hitFlash v301 / tipX / plants / frames locked.
 * Knock grit / plant dust + floating −N ↔ punchCover (v330): connect grit and dmg nums used
 * to fade on their own t/life / DMG_NUM_MS linear clocks while punchCover held full through
 * the slam — dust / −N died mid-cover (white still peaked via hurtFlashK). Draw-only (plantDustK / dmgNumK).
 * Punch-marked particles (spawned while shake armed) hold peak while
 * cover is full (k>0.25); ease out over cover's last quarter (same smoothstep as punchCover /
 * hitSparkK / clashSparkK / steelFlashK / hurtFlashK / parryGleamK); floor at linear life fade
 * so post-cover does not pop. Walk/idle grit unmarked — stays linear. Rise still ages (alpha
 * only). Chip/clean/throw tints stay distinct. DMG_NUM_MS 600 / DMG_NUM_RISE 50 / grit life
 * formulas unchanged. No punch keeps linear. Juice only — hitSparkK v329 / clashSparkK v328 /
 * pad v327 / parry gleam v326 / steel v323 / meter v324 / hitFlash v301 / tipX / plants / frames locked.
 * HP drain flash + combo counter ↔ punchCover (v331): hudFlashT / comboT used to fade on their own
 * 220 / COMBO_SHOW_MS 640 linear clocks while punchCover held full through the slam — HP brasa
 * ghost flash / combo count died mid-cover (white still peaked via hurtFlashK). Draw-only (hudFlashK / comboK).
 * hudFlash already held through freeze (v301-era); now peaks with cover
 * (hold clock + clear when cover dies, same as meterFlashK / hitSparkK). Combo punch-marked on
 * 2+ connect holds peak while cover is full (k>0.25); ease out over cover's last quarter (same
 * smoothstep as punchCover / dmgNumK / plantDustK / hitSparkK); floor at linear so post-cover
 * does not pop. Rise still ages (alpha only). First connect stays silent. No punch keeps linear.
 * HUD_FLASH_MS 220 / COMBO_SHOW_MS 640 unchanged. Juice only — grit/dmg v330 / hitSparkK v329 /
 * clashSparkK v328 / pad v327 / parry gleam v326 / steel v323 / meter v324 / hitFlash v301 /
 * tipX / plants / frames / pad / parry-riposte locked.
 * Steel / parry gleam / clash spark clocks ↔ punchCover (v332): steelFlashT /
 * parryGleamT / clashSparkT used to keep draining on their own STEEL_FLASH_MS /
 * PARRY_GLEAM_MS / CLASH_SPARK_MS linear clocks while punchCover held full —
 * short T could zero mid-cover even though draw-K peaked (v323/v326/v328).
 * Hold armed clocks through live punch; clear when cover dies (same as
 * hitSparkT / hudFlashT / brasaHit). Draw-K envelopes unchanged. No punch
 * keeps linear fade. STEEL_FLASH_MS 60 / PARRY_GLEAM_MS 80 / CLASH_SPARK_MS 110
 * unchanged. Juice only — hud/combo v331 / grit/dmg v330 / hitSparkK v329 /
 * clashSparkK v328 / pad v327 / parry gleam v326 / steel v323 / meter v324 /
 * hitFlash v301 / tipX / plants / frames / pad / parry-riposte locked.
 * Short brasa flecks ↔ punchCover (v333): grab clinch puff (GRAB_FX_MS 90) used to
 * linear-drain mid-cover after throw connect (GRAB_SHAKE + HITSTOP_HIT) — puff died
 * while punchCover still held. Feint / reversal / wakeup flecks never arm shake
 * (inspect: no bumpShake on those paths) so they stay linear. Hit already hold+clear
 * (v329 brasaHitK). Hold grab (+ hit) brasaFxT through live punch; clear when cover
 * dies. Cast / block / clash brasa kinds unchanged. Draw uses brasaFxT/life peak while
 * held (no separate grab draw-K). GRAB_FX_MS 90 / FEINT_FX_MS 55 / REVERSAL_FX_MS 70 /
 * WAKE_FX_MS 65 unchanged. Juice only — steel/gleam/clash clocks v332 / hud/combo v331 /
 * grit/dmg v330 / hitSparkK v329 / clashSparkK v328 / pad v327 / parry gleam v326 /
 * steel v323 / meter v324 / hitFlash v301 / tipX / plants / frames / pad / parry-riposte locked.
 * Rematch (KO→REVANCHA) rotates yard +1 so consecutive bouts never repeat the same patio
 * (yards 2–5 get airtime; Escenarios picker still sticky for JUGAR / title start).
 * Escenarios labels carry a brief light tag (SOL/SOMBRA/OCASO/BRASA/LUNA). Draw-only.
 * KO over prompt: sparse one-line tip under REVANCHA rotating parry / dardo / golpe.
 * Tajo feint: during slash STARTUP only, tap S. Cancels before the blade is live
 * (no hitbox, no damage, no clash). Short recovery 100ms then sheathe. Faster
 * than full slash recovery, not free spam. Not golpe, not once active/recovery.
 * Once slash startup has begun, S is feint, not throw. Idle/walk close Space+S
 * still throws. Hold-S then tap Space from idle still throws. Pad: tap tajo then
 * tap guarda during startup = feint; hold-guarda then tap tajo from idle = throw.
 * Rival can feint too: 40% once vs a committed player guard on their slash
 * startup, FEINT_AI_CD 1800, not a feint robot.
 * Recovery→idle no longer pops the cut sheet. destRect sheathe hump already
 * eased the plant; the lunge bitmap still sat full-extension then snapped
 * to idle (and walking skipped the slash hold entirely). drawKnight
 * crossfades slash→idle/walk over SHEATHE_MS. poseBitmap still holds
 * slash while planted so the sheathe-from-cut check stays.
 * Walk plant↔pass no longer pops the walk sheet. destRect stride already
 * eased; gaitWalkOn still hard-cuts poseBitmap at abs(sin)>0.28 so the
 * plant sheet contract stays. Signed sin used to skip the passing sheet
 * every other 320ms boot (idle bob, then a cut). drawKnight crossfades
 * idle↔walk on both steps (leftover passing sheet eases out with walk
 * settle). AABB planted.
 * Golpe recovery no longer holds the tajo lunge sheet for 180ms then
 * sheathes. drawKnight fades slash→idle over that recovery (draw-only).
 * Slash recovery no longer holds full-extension lunge until idle.
 * Same stuck-cut as golpe: drawKnight fades slash→idle over that 280ms
 * (draw-only). Clash/tech keep the blade out, then sheathe.
 * poseBitmap still slash while planted.
 * Idle/walk K recovery no longer pops the windup plant the tick
 * the dart leaves the tip. Same stuck-cut as slash: drawKnight
 * fades windup→idle over that recovery (draw-only). Special-cancel
 * K still holds the cut sheet. poseBitmap still idle once bolt
 * recovery starts. AABB planted.
 * Getup no longer pops the 45° crumple to idle the same tick
 * throw-invuln arms. poseBitmap still idle once thrownT is 0
 * (AABB planted). drawKnight crossfades hurt→idle over
 * THROW_WAKE_INVULN so the window reads. Reversal/guard cut.
 * Meaty wakeup leftover: leftover getup fade no longer dies the tick
 * a meaty sets stunT. Chip stun without leftover invuln still 0.
 * Draw-only (wakeupFade). destRect/AABB planted. poseBitmap still idle.
 * Guard raise no longer plants destRect in one tick. Raise is still 0ms
 * (block the same frame). destRect-only weight (rot/oy around the planted
 * boot) eases over GUARD_RAISE_MS. AABB planted. Dedicated block sheet
 * still locks slashPose ox; leftover {rot -0.14, ox -12, oy 6} never ran.
 * Breath eases out with that same k (S used to dump the 1.6 chest).
 * Combat poses still snap leftover k (stun). Slash leftover k eases. Drop eases.
 * KO flash no longer dies the tick beginFall sets falling. Chip stun
 * already faded after freeze; the kill used to drop white the same
 * frame crumple started. Draw-only (hurtFlashK). destRect/AABB planted.
 * HIT_FLASH_MS 120 still holds through HITSTOP_HIT then fades.
 * Super pip leftover: leftover brasa pip no longer dies the tick
 * startBolt spends the stock. Empty K stays empty. Draw-only
 * (meterFlashK). destRect/AABB planted. Spend freeze still 60.
 * HUD bar-drain already holds through freeze; the pip did not.
 * KO rematch leftover: REVANCHA is the same pixel menu as JUGAR (caret,
 * brasa, 0.92). Dim #a89b88 at 0.72 used to die against the crumple.
 * Space / R still rematch. KO stays. No card. Draw-only (drawOverPrompt).
 * destRect/AABB planted.
 * Dart plant puff leftover: idle/walk K (you + rival) used to puff at destRect
 * sheet-edge (windup had no tipX) — empty air, not the raised blade. Draw-only
 * (castPlantXY). Special-cancel still rides the live slash tip. Dart still
 * births from castPlantXY (tip). AABB planted. Life 220.
 * Camera punch leftover: courtyard overscan used to track |ox|, so the yard
 * zoomed as the slam squared out. Draw-only (punchCover). Hold PUNCH_PX
 * cover while the punch is live. Rest flush. destRect/AABB planted.
 * Envelope still squares. No new art.
 * Portrait stick leftover: pad-local pointermove + lostpointercapture used
 * to dump A/D when the thumb left the thin letterbox strip onto the canvas
 * (the only throw room). Follow on window while stickPtr is live. Capture
 * loss does not dump the stick (window pointerup still releases). Bigger
 * thumb in the portrait strip (pad-h / --stick-size). Stick still
 * horizontal A/D. destRect/AABB planted. Keyboard path stays. No 6th button.
 * Rival telegraph leftover: idle→windup used to pop the same tick
 * startAttack/startThrow/startBolt, so the 180ms read was a sheet cut,
 * not a raise. Draw-only (telegraphFade). Fade idle→windup over
 * GUARD_RAISE_MS. poseBitmap still windup immediately. destRect leftover
 * breath no longer dumps (~1.6) that same tick. AABB planted. Cancel /
 * reversal / special-cancel still snap. No new combat verb.
 * Plant dust leftover: stamp used to sit at spawn world xy, so after freeze
 * the boot shoved 240 / knocked 80 / walked off and the grit hung on empty
 * stones. Draw-only (syncPlantDust). Stamps ride destRect.pivX (walk /
 * pushblock / land). Specks still fly. destRect/AABB planted. No new
 * combat verb.
 * Throw grab snap leftover: leftover 40px plants was ~300 AABB overlap
 * after recrop, so keepApart un-did the grab the next freeze tick — a
 * body-touch bump, not a dump. Snap to THROW_SNAP_GAP clinch (body).
 * keepApart skips overlap un-push while thrownT. Getup GAP 120 still
 * eases. Hurt sheet unchanged. destRect/AABB planted. No new combat verb.
 * Feint pose leftover: leftover windup used to pop to the tajo lunge
 * sheet the same tick startFeint armed sheatheT (sheathing() holds slash),
 * so the pull read as a cut then sheathe. Draw-only (feintFade). Fade
 * windup→idle over FEINT_RECOVERY. poseBitmap still idle once feintT is
 * set (no slash hold). destRect leftover breath eases. Clash/tech still
 * sheathe from slash. destRect/AABB planted. No new combat verb.
 * Hurt juice leftover: leftover lunge ox dump used to pull cutPoint
 * off the live blade∩hurt the same tick landHit set recovery, so
 * the flesh spark sat on chest (AABB fallback) not the cut — chips
 * at measure were a body puff. Draw-only (cut before recovery).
 * Ride still live hurt. destRect/AABB planted. Block asterisk /
 * clash shards stay. No new combat verb.
 * KO crumple leftover: leftover destRect oy used to dump −10 the
 * same tick beginFall set falling (freeze sat at 0), so the crumple
 * hopped off the stones then settled. destRect-only ease (crumpleFade).
 * AABB planted. poseBitmap still hurt (hp 0 / falling). Chip stun
 * unchanged. Extra destRect rot stays 0. No new combat verb.
 * Wakeup destRect leftover: leftover idle breath used to dump ~1.6 the
 * same tick throw-invuln armed (stunT/thrownT died together), so getup
 * hopped destRect while wakeupFade still held the crumple. destRect-only
 * (idleBreath eases with wakeupFade). AABB planted. poseBitmap still idle.
 * Chip stun / throw KD unchanged. Extra destRect rot stays 0. No new combat verb.
 * Throw recovery leftover: leftover windup used to pop to idle the same tick
 * throw recovery ended (wasThrow skips sheatheT), so the grab pose dumped —
 * a snap, not a release. Draw-only (throwPlantFade). Fade windup→idle over
 * that recovery. poseBitmap still windup while planted. destRect leftover
 * breath eases. Tech same path. Clash/slash still sheathe from slash.
 * destRect/AABB planted. Extra destRect rot stays 0. No new combat verb.
 * Dart recovery destRect leftover: leftover idle breath used to dump ~1.6 the
 * same tick dart birth popped boltPhase to recovery (telegraphFade died,
 * boltPlantFade still held windup), so destRect hopped while the plant
 * overlay was full. destRect-only (idleBreath eases with boltPlantFade).
 * AABB planted. poseBitmap still idle once bolt recovery starts.
 * Special-cancel still 0 (holdingCutBolt). Extra destRect rot stays 0.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Guard drop leftover: leftover block used to pop to idle the same tick
 * S released (destRect leftover k already eases), so the drop was a
 * sheet cut, not a release. Draw-only (guardDropFade). Fade leftover
 * block→idle over leftover guardPoseK. poseBitmap still idle once
 * guarding is 0 (no block hold). destRect leftover plant already eases.
 * Raise still 0ms. Combat poses still snap leftover k (stun). Slash leftover k eases. Guard break still snaps.
 * destRect/AABB planted. Extra destRect rot stays 0.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Guard break leftover: leftover block used to pop to idle the same tick
 * tripGuardBreak armed (tickGuardPose snapped leftover k, guardDropFade
 * gated on guardBreakT), so the break was a sheet cut, not a fail.
 * Draw-only (guardDropFade). Fade leftover block→idle over leftover
 * guardPoseK. destRect leftover plant already eases with leftover k.
 * poseBitmap still idle once guarding is 0. Combat poses still snap
 * leftover k (stun). Slash leftover k eases leftover destRect plant. Reversal leftover eases leftover k. Raise still 0ms. Extra destRect rot
 * stays 0. destRect/AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Reversal plant leftover: leftover block used to pop to windup the same
 * tick startReversal armed (tickGuardPose snapped leftover k, telegraph
 * false), so the raise was a sheet cut, not a plant. Draw-only (reversalPlantFade).
 * Fade leftover block→windup over leftover
 * guardPoseK. destRect leftover plant already eases with leftover k.
 * poseBitmap still windup immediately (guarding is 0). Stun leftover k
 * still snaps. Slash leftover k eases leftover destRect plant. Raise still 0ms. Telegraph still snaps. Extra destRect
 * rot stays 0. destRect/AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Slash leftover k: leftover destRect plant used to dump the same tick
 * startAttack armed (tickGuardPose snapped leftover k), so leftover
 * guard lean/oy hopped off the windup plant. destRect-only ease
 * (slashLeftoverPlanting). leftover k eases over leftover raise.
 * poseBitmap still windup immediately. leftover block overlay still
 * dies (guardDropFade idle). Telegraph still fades idle→windup.
 * Stun leftover k still snaps. Raise still 0ms. Extra destRect rot
 * stays 0. AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Stun leftover k: leftover destRect plant used to dump the same tick
 * landHit set stunT (tickGuardPose snapped leftover k), so leftover
 * guard lean/oy hopped off the stun flinch plant. destRect-only ease
 * (stunLeftoverPlanting). leftover k eases over leftover raise.
 * poseBitmap still idle immediately (chip stun is not hurt).
 * Throw KD leftover destRect plant eases leftover k. Raise still 0ms. Extra destRect rot
 * stays 0 (leftover guard rot eases with leftover k; stun rot scales
 * so leftover does not stack extra). AABB planted. Chip stun / throw KD
 * unchanged. No new combat verb.
 * Throw KD leftover destRect plant: leftover destRect plant used to dump
 * the same tick landThrow set thrownT (tickGuardPose snapped leftover k,
 * guardRaiseK gated thrownT), so leftover guard lean/oy hopped off the
 * hurt plant. destRect-only ease (throwKdLeftoverPlanting). leftover k
 * eases over leftover raise. poseBitmap still hurt immediately (thrownT).
 * Standing chip stun leftover k still eases leftover destRect plant
 * (stun leftover). Raise still 0ms. Extra destRect rot stays 0 (leftover
 * guard rot eases with leftover k; hurt rot stays 0 so leftover does not
 * stack extra). AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Clash leftover pose: leftover slash used to pop to windup the same
 * tick cancelIntoGolpe / cancelIntoSlash armed (telegraph false,
 * sheatheFade skipped clashRec), so the plant was a sheet cut, not a
 * raise. Draw-only (clashPlantFade). Fade leftover slash→windup over
 * GUARD_RAISE_MS. poseBitmap still windup immediately. destRect leftover
 * plant already 0 (dedicated slash/windup). AABB planted. Extra destRect
 * rot stays 0. Clash-K leftover slash used to stick through the K plant
 * (boltHoldCut), so the dart rode a leftover cut sheet, not a raise.
 * Fade leftover slash→windup over GUARD_RAISE_MS. poseBitmap still
 * windup immediately. destRect leftover plant already 0. Special-cancel
 * K still holds the cut (boltHoldCut). Connected slash/golpe cancel
 * leftover sheathe eases (linkPlantFade). Telegraph still snaps. Raise
 * still 0ms. Leftover-k destRect plant from leftover drop unchanged.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Connected slash-L leftover sheathe: leftover sheathe overlay used to pop
 * to windup the same tick cancelIntoGolpe / cancelIntoSlash armed (telegraph
 * false, sheatheFade died with recovery), so leftover sheathe dumped — a
 * snap, not a raise. Draw-only (linkPlantFade). Fade leftover sheathe→windup
 * over GUARD_RAISE_MS. poseBitmap still windup immediately. destRect leftover
 * plant already 0 (dedicated slash/windup). AABB planted. Extra destRect rot
 * stays 0. Clash leftover pose unchanged (clashPlantFade). Clash-K leftover pose unchanged.
 * Special-cancel K still holds the cut (boltHoldCut).
 * Telegraph still snaps. Raise still 0ms. Leftover-k destRect plant from
 * leftover drop unchanged. Chip stun / throw KD unchanged. No new combat verb.
 * Special-cancel K leftover sheathe: leftover recovery sheathe overlay used
 * to pop to the full cut the same tick cancelIntoBolt armed (sheatheFade
 * died with boltPhase), so leftover sheathe dumped — a snap, not a plant.
 * Draw-only (holdCutFade). Fade leftover sheathe→cut over GUARD_RAISE_MS.
 * poseBitmap still slash immediately (boltHoldCut). destRect leftover
 * plant already 0 (holdingCutBolt). AABB planted. Extra destRect rot
 * stays 0. Clash leftover pose unchanged (clashPlantFade). Clash-K leftover pose unchanged.
 * Connected slash-L leftover sheathe unchanged (linkPlantFade).
 * Special-cancel K still holds the cut (boltHoldCut). Telegraph still snaps.
 * Raise still 0ms. Leftover-k destRect plant from leftover drop unchanged.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Super spend freeze leftover: leftover idle overlay used to sit through
 * the 60ms freeze (boltT frozen at the first raise tick), so the punch
 * was leftover idle while the cast puff sat on the windup tip. Draw-only
 * (telegraphFade). Count freeze as raise time; after freeze keep that
 * elapsed raise so leftover idle does not pop back. Empty K still eases
 * leftover idle→windup over GUARD_RAISE_MS. poseBitmap still windup
 * immediately. destRect leftover breath eases with that k. Cast puff
 * still rides castPlantXY. AABB planted. Extra destRect rot stays 0.
 * Pip leftover still holds through freeze. Special-cancel still snaps leftover telegraph
 * (no leftover telegraph flag). Chip stun / throw KD
 * unchanged. No new combat verb.
 * Empty-K leftover destRect plant: leftover destRect plant used to dump
 * the same tick startBolt armed (startBolt zeroed leftover k, tickGuardPose
 * snapped leftover k), so leftover guard lean/oy hopped off the windup plant.
 * destRect-only ease (boltLeftoverPlanting). leftover k eases over leftover
 * raise. poseBitmap still windup immediately. leftover block overlay still dies
 * (guardDropFade idle). Telegraph still fades leftover idle→windup.
 * Super freeze leftover idle overlay unchanged. Special-cancel still snaps leftover k
 * (holdingCutBolt). Clash-K leftover destRect plant already 0.
 * Slash leftover k still eases leftover destRect plant. Stun leftover k
 * still eases leftover destRect plant. Throw KD leftover destRect plant
 * eases leftover k. Golpe leftover k eases leftover destRect plant. Throw-from-guard
 * plant leftover eases leftover k. Raise still 0ms. Extra destRect rot stays 0 (leftover
 * guard rot eases with leftover k; no extra). AABB planted. Chip stun /
 * throw KD unchanged. No new combat verb.
 * Throw-from-guard plant leftover: leftover block used to pop to windup the
 * same tick startThrow armed (tickGuardPose snapped leftover k, telegraph
 * false fromIdle), so Space+S from guarda was a sheet cut, not a plant —
 * reversal already faded leftover block→windup. Draw-only (throwGuardPlantFade).
 * Fade leftover block→windup over leftover guardPoseK. destRect leftover plant
 * eases with leftover k. poseBitmap still windup immediately (guarding is 0).
 * Throw recovery leftover unchanged (throwPlantFade). Idle/rival telegraph
 * throw still fades idle→windup. Golpe leftover k eases leftover destRect plant.
 * Raise still 0ms. Extra destRect rot stays 0 (leftover guard rot eases with
 * leftover k; no extra). AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Walk-out guard drop leftover: leftover block fade used to die the tick
 * A/D walk started (guardDropFade gated walking), so walk-out mid-drop was
 * a sheet cut while destRect leftover k still eased — same hole wakeup walk-out already closed.
 * Draw-only (guardDropFade). Keep leftover block through leftover guardPoseK if they step off.
 * poseBitmap still
 * idle / walk immediately (guarding is 0). destRect leftover plant already
 * eases. Raise still 0ms. Stun still cuts the fade. Combat / reversal /
 * throw-from-guard plants unchanged. Extra destRect rot stays 0. AABB planted.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Guard drop settle→walk destRect leftover: leftover raise k breath used to
 * seat ~1.3 mid-stride (idleBreath preferred walkRiseK over raise k), so the
 * chest hopped while leftover drop lean still rode destRect — a hop, not a
 * plant. Same hole cut recovery / feint settle→walk closed. destRect-only
 * (idleBreath). Math.max(raise k, rise k) so breath stays suppressed then
 * dies with rise. Pure idle→walk still eases with rise. Idle drop still
 * eases with raise. Walk-out sheet leftover unchanged (guardDropFade).
 * Extra destRect rot stays 0. AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Tech-from-guard plant leftover: leftover block used to pop to windup the
 * same tick landThrowTech armed (tickGuardPose snapped leftover k,
 * throwPlantFade held windup), so Space+S tech from guarda was a sheet cut
 * — throw-from-guard / reversal already faded leftover block→windup.
 * Draw-only (techGuardPlantFade). Fade leftover block→windup over leftover
 * guardPoseK. destRect leftover plant eases with leftover k. poseBitmap still
 * windup immediately (throw recovery). Throw recovery leftover unchanged
 * (throwPlantFade). Idle tech still snaps (no leftover k). Raise still 0ms.
 * Extra destRect rot stays 0. AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Feint→guard leftover: leftover windup fade used to die the tick S hold
 * raised guarda mid-pull (feintFade gated on guarding), so the raise was a
 * sheet cut — windup popped to block. Same hole walk-out guard drop already
 * closed for leftover block. Draw-only (feintFade). Keep leftover windup
 * through leftover feintT if they raise. poseBitmap still block once
 * guarding. Idle feint still fades windup→idle. destRect leftover breath
 * eases. Raise still 0ms. Stun still cuts. Extra destRect rot stays 0.
 * AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Golpe leftover k: leftover destRect plant used to dump the same tick
 * startAttack(golpe) armed (startAttack zeroed leftover k, tickGuardPose
 * snapped leftover k), so leftover guard lean/oy hopped off the windup plant
 * — slash / empty-K / stun / throw KD already eased leftover k. destRect-only
 * ease (golpeLeftoverPlanting). leftover k eases over leftover raise.
 * poseBitmap still windup immediately. leftover block overlay still dies
 * (guardDropFade idle). Telegraph still fades idle→windup. Reversal leftover
 * still eases leftover k (reversalPlanting). Raise still 0ms. Extra destRect
 * rot stays 0 (leftover guard rot eases with leftover k; no extra). AABB
 * planted. Chip stun / throw KD unchanged. No new combat verb.
 * Feint from leftover drop: leftover block fade used to sit on the pull the
 * same tick startFeint armed from leftover-drop slash (guardDropFade gated
 * only on idle + leftover k), so early S-feint mid-drop painted leftover
 * block over leftover windup — a sheet stack, not a pull. Draw-only
 * (guardDropFade). Skip leftover block through leftover feintT; feint owns
 * the windup overlay (feintFade / feint→guard). poseBitmap still idle
 * (block once they raise). destRect leftover k still eases. Walk-out /
 * guard break / S-release drop unchanged. Stun still cuts. Extra destRect
 * rot stays 0. AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Idle sheathe leftover: leftover clash/tech sheathe overlay used to dump
 * the same tick startAttack / startThrow / startBolt armed from idle sheathe
 * (sheatheFade died with phase/boltPhase), so mashy Space/L/K after clash
 * recovery popped the blade — a snap, not a raise. Draw-only (linkPlantFade).
 * Fade leftover sheathe→windup over GUARD_RAISE_MS. poseBitmap still windup
 * immediately. destRect leftover plant already 0 (dedicated slash/windup).
 * AABB planted. Extra destRect rot stays 0. Connected slash-L leftover sheathe
 * unchanged. Special-cancel K leftover sheathe unchanged (holdCutFade).
 * Clash leftover pose unchanged. Clash-K leftover pose unchanged. Telegraph
 * still snaps when no leftover sheathe. Raise still 0ms. Leftover-k destRect
 * plant from leftover drop unchanged. Chip stun / throw KD unchanged. No new
 * combat verb.
 * Spark origin leftover: clash-K / idle-sheathe-K cast puff used to sit on the
 * windup tip the same tick leftover slash still owned the sheet (clashPlantFade
 * / linkPlantFade), so the brasa hung off the visible blade (you tipX 323 vs
 * 991). Draw-only (castPlantXY). Ease origin slash→windup with that leftover
 * fade. Cast FX seats brasaX/Y on live castPlantXY with woundDX/DY 0 (re-seat
 * after clashPlant arms; track eased plant after boltT advances). Empty/telegraph
 * K still plants on the windup tip. Special-cancel still rides the live slash
 * tip. Dart births from castPlantXY (tip). AABB planted. Extra destRect rot stays
 * 0. No new combat verb.
 * Sheathe→guard leftover: leftover clash/tech sheathe overlay used to dump the
 * same tick S raised mid-sheathe (sheatheFade gated on guarding), so leftover
 * slash popped to block — a snap, not a plant. Same hole feint→guard already
 * closed for leftover windup. Draw-only (sheatheFade). Keep leftover sheathe
 * through leftover sheatheT if they raise. poseBitmap still block once
 * guarding. Idle sheathe still fades slash→idle. destRect leftover plant /
 * sheathe dip already eases. Raise still 0ms. Stun still cuts. Extra destRect
 * rot stays 0. AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Wakeup→guard leftover: leftover crumple fade used to die the tick S raised mid-getup
 * (wakeupFade gated on guarding), so leftover hurt popped to block — a snap, not a plant.
 * Same hole feint→guard already closed for leftover windup.
 * Draw-only (wakeupFade). Keep leftover crumple through leftover throw-invuln if they raise.
 * poseBitmap still block once guarding. Idle getup still fades hurt→idle.
 * destRect leftover breath eases with that k. Walk-out / meaty leftover still hold. Raise still 0ms.
 * Extra destRect rot stays 0. AABB planted. Chip stun / throw KD unchanged.
 * No new combat verb.
 * Wakeup→reversal leftover: leftover crumple fade used to die the tick startWakeReversal /
 * startReversal spent throw-invuln (wakeupFade gated phase + invuln), so leftover hurt popped
 * to windup — a snap, not a plant. Same hole wakeup→guard already closed for S-raise.
 * Draw-only (wakeupFade). Keep leftover crumple through leftover wakeRevFadeHold over
 * GUARD_RAISE_MS if they reverse mid-getup. poseBitmap still windup immediately.
 * Idle getup still fades hurt→idle. Guard reversal plant leftover unchanged (reversalPlantFade).
 * Throw still spends invuln. Extra destRect rot stays 0. AABB planted. Chip stun / throw KD
 * unchanged. No new combat verb.
 * Walk→guard leftover: leftover walk fade used to die the tick S raised mid-stride
 * (walkFade gated on guarding; tickGait zeroed walkFadeHold / walkSettleT), so leftover
 * walk popped to block — a snap, not a plant. Same hole feint→guard / sheathe→guard /
 * wakeup→guard already closed. Draw-only (walkFade). Keep leftover walk through leftover walkFadeHold if they raise.
 * poseBitmap still block once guarding. Idle walk settle still fades walk→idle.
 * Walk→guard destRect lean leftover: leftover walk lean/dip used to dump the tick S raised
 * mid-stride / mid-settle (walkSettleK gated guarding + dedicated block), so destRect lean
 * snapped into the guard plant while leftover walk sheet still eased — a plant hop, not a settle.
 * destRect-only ease (walkSettleK). Keep leftover settle rot/oy through leftover walkSettleT if they raise.
 * poseBitmap still block once guarding. Idle walk settle still eases. Stun / combat still snap.
 * Extra destRect rot stays 0 (leftover walk lean was already non-zero; this only stops the dump).
 * AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Idle settle→guard destRect leftover: leftover settle breath used to seat ~1.3 the tick
 * S raised mid-settle (idleBreath used only raise k, so (1-raiseK)≈1 while settle still
 * suppressed the chest), then ease out — a hop, not a plant. destRect-only (idleBreath).
 * Keep the stronger of settle k / raise k so breath stays suppressed then dies with raise.
 * Idle settle still crossfades breath when not guarding. Pure idle→guard still eases with raise.
 * Walk→guard lean / sheet leftover unchanged. Extra destRect rot stays 0. AABB planted.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Feint end destRect leftover: leftover idle breath used to dump ~1.3 the tick
 * feintT hit 0 (tickFeint zeros leftover sheatheT; idleBreath still scaled amp by
 * sheatheT/SHEATHE_MS through the pull), so the chest seated while feintFade was
 * already ~0 — a hop, not a settle. destRect-only (idleBreath). Skip sheathe amp
 * scale through feintT; ease with feintFade only. Sheathe dip already skipped.
 * poseBitmap still idle once feintT is set. Feint→guard / feint-from-drop unchanged.
 * Clash sheathe keeps breath 0 through sheathe (cutRecBreathT eases after).
 * Extra destRect rot stays 0. AABB planted.
 * Chip stun / throw KD unchanged. No new combat verb.
 * Stun end destRect leftover: leftover idle breath used to dump ~1.5 the tick
 * stunT hit 0 (idleBreath hard-zeroed through chip stun), so the chest seated
 * while stun flinch rot was already ~0 — a hop, not a settle. destRect-only
 * (idleBreath). Ease breath in over leftover GUARD_RAISE_MS while stunT drains.
 * Throw KD / wakeup invuln still hard-zero (wakeupFade owns getup). poseBitmap
 * still idle. Stun rot still scales with stunT/HITSTUN. Extra destRect rot stays 0.
 * AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Camera punch end leftover: leftover PUNCH_PX overscan used to dump the tick
 * shake hit 0 (punchCover held full cover through the live slam), so the yard
 * scaled ~17px in one tick while ox was already ~0 — a zoom hop, not a settle.
 * Draw-only (punchCover). Hold full PUNCH_PX through the live slam (no mid-punch
 * zoom); ease cover out over the last quarter of the slam envelope. Rest ox=0
 * still flush. Punch is a slide, not a zoom. destRect/AABB planted. Envelope
 * still squares. Chip stun / throw KD unchanged. No new combat verb.
 * Idle settle→guard destRect leftover: leftover settle breath used to seat ~1.3 the tick
 * S raised mid-settle (idleBreath used only raise k), so the chest hopped while leftover
 * lean still rode destRect — a hop, not a plant. destRect-only (idleBreath). Keep
 * Math.max(settle k, raise k) so breath stays suppressed then dies with raise. Idle settle
 * still crossfades when not guarding. Pure idle→guard still eases with raise. Extra
 * destRect rot stays 0. AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Throw / cut recovery fade leftover: leftover windup/slash overlay used to die the tick
 * fade dropped under 0.02 while poseBitmap still held the source sheet (restThrow /
 * sheathe idle-base gated > 0.02), so the last recovery frame flashed full grab/cut
 * then popped idle — a snap, not a settle. Draw-only (drawKnight). Keep the idle base
 * through any live throwPlantFade / sheatheFade (> 0); tiny overlay stays skipped.
 * poseBitmap still windup / slash while planted. Bolt / feint / guard-drop fades already
 * rest on idle poseBitmap. destRect leftover breath already eases. Extra destRect rot
 * stays 0. AABB planted. Chip stun / throw KD unchanged. No new combat verb.
 * Idle clash/tech sheathe now uses the same smoothstep as recovery (countdown sheatheT)
 * so the last frames stay under 0.02 with idle base still owned (draw-only; overlay still
 * skips tiny). Linear T/MS skipped that window at 60fps. No new combat verb.
 * Pushblock dust leftover: rival on-block shove used to keep landBlock's 1.0 plant under
 * the boot while PUSHBLOCK_FX scrape also spawned, so leftover block grit rode the 240px
 * trail beside the shove. Draw-only (landBlock). Skip the small plant when shove owns the
 * scrape. Your away shove still alone. Normal block still 1.0. Specks still fly. Stamps
 * still ride destRect.pivX. destRect/AABB planted. No new combat verb.
 * Player pushblock dust leftover: your away shove used to keep landBlock's 1.0 plant under
 * the boot (spawned on connect, shove arms after hitstop from the buffer), so leftover
 * block grit rode the 240px trail beside the PUSHBLOCK_FX scrape — rival landBlock already
 * skipped. Draw-only (tryPushblock). Drop leftover block plant stamps when shove owns the
 * scrape. Specks still fly. Normal block still 1.0. Rival landBlock skip unchanged. Stamps
 * still ride destRect.pivX. destRect/AABB planted. No new combat verb.
 * Clash dust leftover: both lunge plants (slash 1.45 / golpe 1.15 / throw 1.05) used to
 * ride under the boot when doClash also stamped 1.2 scrape, so leftover lunge grit stacked
 * under the choque — same hole pushblock already closed for block 1.0. Draw-only
 * (dropPlantUnderClash). Drop leftover plant stamps when clash owns the scrape. Specks
 * still fly. Pushblock scrape-only unchanged. Stamps still ride destRect.pivX.
 * destRect/AABB planted. No new combat verb.
 * Floating damage numbers: on HP loss (slash/golpe/dart/throw hit, dart chip on
 * block) spawn short-lived pixel text at the impact that rises ~50px and fades
 * (~600ms). Clean hit: bright hueso, larger. Chip: muted óxido/pizarra, smaller
 * with ASCII "-" so it never reads as a clean hit. Throw/grab: brasa third tint.
 * Stack offset so multi-hits do not fully overlap. Draw-only juice; both sides.
 * Damage number distinct leftover (v315): hit/chip used the same −N family
 * (brasa 3 / óxido 2), so dart chip looked like a soft clean hit. Draw-only (drawDmgNums / spawnDmgNum kind). Hit hueso 4 + unicode −; chip óxido 2 +
 * ASCII "-"; throw/grab brasa 3. Ride/rise/trail/MS locked. destRect/AABB
 * planted. No new combat verb. Frames / tipX / plants / pad / parry / AI /
 * tutorial / grab-tech-pushblock juice paths locked.
 * Knife tip plant leftover: throw_knife tip markers used to sit on the helmet
 * (you tipX 359/tipY 198) and mid-blade (rival 70 / flip 815), so idle/walk K
 * cast puff + dart birth hung off the raised knife — empty air / short of the
 * point after the new art. Draw-only (POSE.throwKnife tipX/tipY). Seat on the
 * live blade tip (you 268/109, rival 6/384, flip 873/391). castPlantXY /
 * bladeTipX / castPlantXY still ride that tip. Special-cancel still slash tip.
 * Dart births from castPlantXY (tip). destRect/AABB planted. Life 220. No new combat verb.
 * Damage number leftover: num used to sit at spawn world xy, so after freeze
 * the hurt knocked 80 / crumple dropped and the −N hung in empty air (flesh
 * spark already rides hitWoundAnchor). Ride live hurt (you + rival). Rise
 * still fades. destRect/AABB planted. No new combat verb.
 * Dart tip plant leftover: idle/walk K dart (you + rival) used to birth at
 * bladeBox chest Y while cast puff sat on throw_knife tipY — ~40px under the
 * raised knife (you) / ~60px above it (rival). Seat birth on live castPlantXY
 * (same tip the puff rides). Special-cancel still slash tip / chest fallback.
 * destRect/AABB planted. No new combat verb.
 * Slash tip plant leftover: slash tipY was missing, so special-cancel cast /
 * clash spark / castPlantXY fallback Y sat on bladeBox chest mid while the
 * opaque tip sat higher on the cut (~18px you / ~42px rival). Draw-only
 * (POSE.slash tipY + bladeTipY). tipX / bladeBox / reach unchanged. ThrowKnife
 * tip markers unchanged. destRect/AABB planted. No new combat verb.
 * Opening settle leftover: leftover settleDip used to plant full 4px the
 * same tick stampNow armed settleT (openLeft lift / title Space / rematch),
 * so the yard hop was a stomp, not a settle. destRect-only (settleDip).
 * Ease in over the first ~18% of settleT/settleMax, then the locked square
 * ease-out (open SETTLE_MS, guard-break GUARD_BREAK_SETTLE). AABB planted.
 * Extra destRect rot stays 0. Grit stamp unchanged. Chip stun / throw KD
 * unchanged. No new combat verb.
 * Block tip plant leftover: guard-break steel (hold-drain / pushblock trip
 * with no atk) used to sit on bodyAABB chest mid while the opaque guard tip
 * sat higher on the raised blade (~75px you). Draw-only (POSE.block tipY +
 * guardSteelPoint). tipX / bladeBox / reach unchanged. Cut-block asterisk still cutPoint.
 * destRect/AABB planted. No new combat verb.
 * Block steel X plant leftover: guard-break steel X used to sit on bodyAABB
 * chest fraction (0.72 / 0.28) while the opaque tip sat ~42px off on rival /
 * flip (~6px you). Draw-only (POSE.block steelX + guardSteelPoint). Not tipX —
 * tipX would retune bladeReach on guard. tipY / bladeBox / reach unchanged.
 * Cut-block asterisk still cutPoint. destRect/AABB planted. No new combat verb.
 * Guard-break steel sync leftover: hold-drain / pushblock tip plant used to
 * hop off the opaque tip the same tick draw ran syncSteelFlash — bladeBox∩body
 * mid re-centered the asterisk (~37px rival) while woundDX/DY already held the
 * tip. Draw-only (steelTipRide). Tip-planted guard-break rides wound only.
 * Cut-block still overlap-syncs to cutPoint. tipY / steelX / bladeBox / reach
 * unchanged. destRect/AABB planted. No new combat verb.
 * Windup tip plant leftover: windup tip markers used to sit in empty air
 * above the cocked blade (you 323/55, rival 443/4, flip 436/4) while the
 * opaque tip sat on the raised point (you 359/105, rival 738/224, flip
 * 141/231). Startup / throw / telegraph juice that rides bladeTip hung off
 * the sheet. Draw-only (POSE.windup tipX/tipY). ThrowKnife / slash / block tip markers unchanged.
 * bladeBox still tip-born. destRect/AABB planted. No new combat verb.
 * Cut recovery destRect leftover: slash/golpe recovery used to hard-zero idle
 * breath (phase!==idle) while sheatheFade already eased the cut sheet to idle,
 * so the chest dumped ~1.6 the tick recovery popped idle — a hop, not a settle.
 * Throw / dart already eased with throwPlantFade / boltPlantFade. destRect-only
 * (idleBreath / cutRecBreathT). Keep recovery breath 0 (special-cancel K plant
 * stays seated), then ease breath in over GUARD_RAISE_MS after non-clash/tech
 * cut recovery ends. Clash/tech still sheatheT path. Tip / steel markers
 * unchanged. AABB planted. No new combat verb.
 * Clash sheathe destRect leftover: clash/tech (and special-cancel from-cut)
 * idle sheathe used to scale amp by sheatheT/SHEATHE_MS, so the chest seated
 * full breath (~1.5) the tick recovery armed sheatheT, then dumped again
 * (~1.8) the tick T hit 0 — two hops, not a settle. Cut recovery already
 * eased non-clash with cutRecBreathT. destRect-only (idleBreath / cutRecBreathT).
 * Keep breath 0 through sheathe (sheatheDip hump unchanged), then ease in over
 * GUARD_RAISE_MS when sheathe ends. Feint still feintFade (skips sheathe).
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Cut recovery settle→guard destRect leftover: leftover cutRecBreath used to
 * seat ~0.8 the tick S raised mid-ease (tickSheathe zeroed cutRecBreathT on
 * guarding; idleBreath used only cutRec k until then, then raise-only), so the
 * chest hopped while leftover raise still climbed — a hop, not a plant. Same
 * hole idle settle→guard already closed for walkSettle. destRect-only
 * (idleBreath / cutRecBreathT). Keep cutRecBreathT through raise (hold, do
 * not drain under raise); Math.max(cutRec k, raise k) so breath stays
 * suppressed then dies with raise. Clear cutRec when raise k owns.
 * Idle cut recovery settle still eases when not guarding. Pure idle→guard still eases with raise.
 * Clash sheathe / cut recovery arm paths unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Cut recovery settle→walk destRect leftover: leftover cutRecBreath used to
 * seat ~0.6 mid-stride the tick A/D walked through post-cut ease (idleBreath
 * preferred cutRec k over walkRiseK), then dump ~0.6 the tick cutRecBreathT
 * hit 0 while rise was full — a hop, not a settle. Same hole cut recovery
 * settle→guard already closed for raise. destRect-only (idleBreath /
 * cutRecBreathT). Keep cutRecBreathT through rise (hold, do not drain under
 * rise); Math.max(cutRec k, rise k) so breath stays suppressed then dies with
 * rise. Clear cutRec when rise k owns. Idle cut recovery settle still eases
 * when not walking. Pure idle→walk still eases with rise. Cut recovery
 * Cut recovery settle→guard unchanged. Clash sheathe / cut recovery arm paths unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Feint settle→guard destRect leftover: leftover feintFade breath used to
 * seat ~0.65 the tick S raised mid-pull (idleBreath used only feintFade k),
 * so the chest hopped while leftover raise still climbed — then dumped ~0.9
 * the tick feintT hit 0 while raise was still mid — a hop, not a plant. Same
 * hole cut recovery settle→guard already closed for cutRec. destRect-only
 * (idleBreath). Math.max(feintFade, raise k) so breath stays suppressed then
 * dies with raise. Idle feint still eases with feintFade. Pure idle→guard
 * still eases with raise. Feint→guard sheet leftover unchanged (feintFade
 * keeps windup through raise). FEINT_RECOVERY / combat lock unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Feint settle→walk destRect leftover: leftover feintFade breath used to
 * seat ~0.65 mid-stride the tick A/D walked through mid-pull (idleBreath
 * used only feintFade k), then dump ~1.1 the tick feintT hit 0 while rise
 * was full — a hop, not a settle. Same hole feint settle→guard already
 * closed for raise / cut recovery settle→walk for cutRec. destRect-only
 * (idleBreath). Math.max(feintFade, rise k) so breath stays suppressed then
 * dies with rise. Idle feint still eases with feintFade. Pure idle→walk
 * still eases with rise. Feint settle→guard unchanged. Feint→guard sheet
 * leftover unchanged. FEINT_RECOVERY / combat lock unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Clash sheathe settle→walk destRect leftover: leftover sheathe end used to
 * seat ~0.86 mid-stride the tick A/D walked through clash/tech sheathe
 * (tickSheathe skipped cutRecBreathT when walking — "rise owns breath" — but
 * mid-rise wk~0.27 does not suppress; idleBreath then preferred rise-only),
 * so the chest hopped while leftover rise still climbed — a hop, not a
 * settle. Same hole cut recovery settle→walk already closed for cutRec.
 * destRect-only (idleBreath / cutRecBreathT). Arm cutRecBreathT when sheathe
 * ends mid-stride too; existing Math.max(cutRec k, rise k) + hold-under-rise
 * keep breath suppressed then die with rise. Idle clash sheathe still eases
 * with cutRec when not walking. Pure idle→walk still eases with rise.
 * Clash sheathe keep-0 through sheathe unchanged. Feint / cutRec settle
 * paths unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Clash sheathe settle→guard destRect leftover: leftover sheathe end used to
 * seat ~0.43 mid-raise the tick S raised through clash/tech sheathe
 * (tickSheathe skipped cutRecBreathT when guarding — "raise owns breath" —
 * but mid-raise rk~0.68 does not suppress; idleBreath then preferred
 * raise-only), so the chest hopped while leftover raise still climbed — a
 * hop, not a plant. Same hole clash sheathe settle→walk already closed for
 * walk / cut recovery settle→guard for cutRec. destRect-only (idleBreath /
 * cutRecBreathT). Arm cutRecBreathT when sheathe ends mid-raise too;
 * existing Math.max(cutRec k, raise k) + hold-under-raise keep breath
 * suppressed then die with raise. Idle clash sheathe still eases with
 * cutRec when not guarding. Pure idle→guard still eases with raise.
 * Clash sheathe settle→walk unchanged. Clash sheathe keep-0 through sheathe
 * unchanged. Feint / cutRec settle paths unchanged.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Wakeup settle→walk destRect leftover: leftover wakeupFade breath used to
 * seat ~1.4 mid-stride the tick A/D walked through getup (idleBreath used only wakeupFade k —
 * fade eases breath IN while rise wants OUT; invuln 80 dies before rise 160 owns),
 * so the chest hopped while leftover rise still climbed — a hop, not a settle.
 * Same hole feint settle→walk closed for feintFade / clash sheathe settle→walk for cutRec.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walk-out getup; arm cutRecBreathT when throw-invuln ends mid-stride
 * so existing Math.max(cutRec k, rise k) + hold-under-rise keep breath suppressed then die with rise.
 * Wakeup settle→guard: keep breath 0 through raise mid-getup; arm cutRec on invuln mid-end too.
 * Idle getup still eases with wakeupFade. Pure idle→walk / idle→guard still eases.
 * Wakeup→guard / walk-out sheet leftover unchanged (wakeupFade). Tip / steel markers unchanged.
 * AABB planted. No new combat verb.
 * Wakeup settle→walk plant-release destRect leftover: leftover wakeupFade breath used to seat ~1.4
 * mid-stride the tick A/D / rival closing walked through getup after tele/walk-in (idleBreath
 * preferred plant release — only gated walking(f), not walkFadeHold / recoveryWalkOut; restWakeWalk /
 * walkFadeHold already rested walk under the crumple), then ease — a hop, not a plant. Same hole
 * feint / telegraph / chip stun / bolt / throw settle→walk already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walking / walk-out / leftover
 * walkFadeHold during wakeup fade plant; tickThrowState arm cutRecBreathT when throw-invuln ends
 * mid-stride / mid-raise / under walkFadeHold so max(ck, wk) / hold-under-rise own the post-getup seat.
 * Idle getup still eases with wakeupFade. Wakeup settle→guard unchanged. restWakeWalk / wakeupFade unchanged.
 * THROW_WAKE_INVULN / combat lock unchanged. AABB planted. No new combat verb.
 * Throw plant end destRect leftover: leftover throwPlantFade used to fall through to
 * phase!==idle hard-zero the tick fade hit ~0 (last recovery frame), so the chest dumped
 * ~1.6 then seated full on idle — a hop, not a settle. destRect-only (idleBreath). Stay on
 * the plant ease through throw recovery (fade 0 = full amp ready for idle). Idle still
 * inherits that plant. Pure idle→walk / idle→guard still eases. Sheet still fades via
 * throwPlantFade. Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Damage number trail leftover: −N used to rise as a single glyph, so the float read as a
 * teleport hop off the wound, not a streak. Draw-only (drawDmgNums). Ghosts along the rise path; live −N still on top. Ride still live hurt. Rise still fades. Hit/chip/throw
 * palette scale owned by v315 distinct leftover. destRect/AABB planted. No new combat verb.
 * Special dart trail leftover: K dart (empty + super) used to fly as a single body, so the
 * flight read as a teleport hop across the yard, not a streak. Draw-only (drawBolt). Ghosts
 * along the flight path; live dart still on top. Super wake still attached. Empty dart still
 * smaller. destRect/AABB planted. No new combat verb.
 * Meter fill flash leftover: full brasa pip used to pop on the same tick gainMeter crossed
 * METER_MAX (meterFlashK hard-zeroed while full; only spend armed meterFlashT), so the stock
 * landing had no pulse — spend freeze already flashes the spent pip. Draw-only (gainMeter /
 * meterFlashK / drawLifeBar). Arm meterFlashT on fill-to-full; while full, pulse the meter
 * well. Spend flash still meter=0. Partial fills stay quiet. destRect/AABB planted. No new
 * combat verb.
 * Meter / combo feedback: brasa pip fill pulse on every gain (meterGainT scale/glow,
 * pizarra/óxido/brasa/hueso). Stock-complete keeps distinct full-pip flash (meterFlashKind
 * full). Super spend empties with a bite remnant (kind spend), not a tip pop-off. Sparse
 * pixel combo count near the attacker on 2+ connects (fades fast; no SF-size numbers).
 * Draw-only HUD juice. Does not obscure HP/stam or teach HUD. destRect/AABB planted.
 * No new combat verb. No new art.
 * Yard switch pop leftover: Escenarios used to hard-cut the courtyard the same tick
 * setYardIndex armed a new patio (ART[yardN] swapped under the menu), so the yard popped —
 * a cut, not a settle. Draw-only (drawCourtyard / setYardIndex). Crossfade prev→next over
 * YARD_SWITCH_MS. Same-yard confirm stays quiet. Boot / rematch stay on the chosen yard
 * (no fade). Punch cover still rides the live crop. destRect/AABB planted. No new combat verb.
 * Title music pop leftover: title↔duel bed swaps used to hard-cut (pause one / play the
 * other at full gain) on KO→over, rematch, Esc→title — a pop, not a settle. Falling used
 * to map to no bed (silence) if sync ran mid-crumple. Juice-only (syncMusic / tickMusicFade).
 * Crossfade beds over MUSIC_FADE_MS. Falling keeps duel. Same-bed sync stays quiet.
 * destRect/AABB planted. No new combat verb.
 * Knife plant end destRect leftover: leftover boltPlantFade >0 gate used to fall through
 * the tick fade hit ~0 (last recovery frame). Throw plant end already stayed on plant ease
 * through throw recovery; knife still used the >0 gate, so the chest could dump then seat
 * full on idle — a hop, not a settle. destRect-only (idleBreath). Stay on the plant ease
 * through bolt recovery (fade 0 = full amp ready for idle). Special-cancel still zeros
 * (holdingCutBolt). Sheet still boltPlantFade. Idle still inherits that plant. Tip / steel
 * markers unchanged. AABB planted. No new combat verb.
 * Feint walk-out pose leftover: leftover windup used to rest on idle while
 * gaitWalkOn already flipped poseBitmap to walk (A/D mid-pull; rival same),
 * so the pull dumped standing idle then popped the passing sheet when fade
 * dropped under 0.02 — a hop, not a plant. Draw-only (drawKnight). Rest
 * leftover windup on the walk sheet when gaitWalkOn. Idle pull still rests
 * on idle. Feint→guard sheet leftover unchanged (restFeintGuard). Live walk
 * still one opaque poseBitmap sheet (no idle+walk stack). destRect breath
 * already Math.max(feintFade, rise). FEINT_RECOVERY / combat lock unchanged.
 * AABB planted. No new combat verb.
 * Sheathe walk-out pose leftover: leftover slash used to rest on idle while
 * gaitWalkOn already flipped poseBitmap to walk (A/D mid-sheathe; rival same —
 * sheathing() skips walk so poseBitmap hard-cuts to walk), so the sheathe
 * dumped standing idle then popped the passing sheet when fade hit 0 — a hop,
 * not a plant. Same hole feint walk-out already closed for leftover windup.
 * Draw-only (drawKnight). Rest leftover slash on the walk sheet when gaitWalkOn.
 * Idle sheathe still rests on idle. Sheathe→guard sheet leftover unchanged
 * (block once guarding). Live walk still one opaque poseBitmap sheet (no
 * idle+walk stack). Recovery slash/golpe fade still rests on idle (phase not
 * idle — no gaitWalkOn). destRect sheathe dip / breath already ease. SHEATHE_MS
 * / combat lock unchanged. AABB planted. No new combat verb.
 * Wakeup walk-out pose leftover: leftover crumple used to rest on idle while
 * gaitWalkOn already flipped poseBitmap to walk (A/D mid-getup; rival same),
 * so the getup dumped standing idle then popped the passing sheet when fade
 * dropped under 0.02 — a hop, not a plant. Same hole feint / sheathe walk-out
 * already closed for leftover windup / slash. Draw-only (drawKnight). Rest
 * leftover crumple on the walk sheet when gaitWalkOn. Idle getup still rests
 * on idle. Wakeup→guard / wakeup→reversal sheet leftovers unchanged
 * (restWakeGuard / restWakeRev). Live walk still one opaque poseBitmap sheet
 * (no idle+walk stack). destRect breath already 0 through walk-out getup.
 * THROW_WAKE_INVULN / combat lock unchanged. AABB planted. No new combat verb.
 * Guard drop walk-out pose leftover: leftover block used to rest on idle while
 * gaitWalkOn already flipped poseBitmap to walk (A/D mid-drop; rival same),
 * so the drop dumped standing idle then popped the passing sheet when fade
 * dropped under 0.02 — a hop, not a plant. Same hole feint / sheathe / wakeup
 * walk-out already closed for leftover windup / slash / crumple. Draw-only
 * (drawKnight). Rest leftover block on the walk sheet when gaitWalkOn. Idle
 * drop still rests on idle. Walk-out fade / destRect raise×rise already ease
 * (guardDropFade / idleBreath). Live walk still one opaque poseBitmap sheet
 * (no idle+walk stack). Feint-from-drop skip unchanged. GUARD_RAISE_MS /
 * combat lock unchanged. AABB planted. No new combat verb.
 * Link plant sword raise leftover: leftover sheathe→windup used throw_knife
 * (boltPlant prefers knife when ready), so mashy Space/L/throw after clash/tech
 * sheathe faded idle+slash into knife then snapped windup when fade dropped
 * under 0.02 — a hop, not a raise. Same hole telegraph already closed with
 * telePlant (bolt→knife, else windup). Draw-only (drawKnight). Rest leftover
 * raise on windup when not bolt. Idle/K sheathe raise still rests on knife.
 * Clash leftover pose / special-cancel holdCut unchanged. poseBitmap still windup/knife immediately.
 * destRect plant already 0. AABB planted. No new combat verb.
 * Telegraph walk-in pose leftover: leftover walk used to dump to idle the tick
 * startAttack/startThrow/startBolt armed from mid-stride (tickGait zeroed
 * walkFadeHold; restTele rested on idle), so the raise hopped walk→idle under
 * windup/knife — a hop, not a plant. Same hole walk→guard already closed for
 * block. Draw-only (drawKnight + tickGait hold). Rest leftover walk under the
 * telePlant raise when walkFadeHold. Idle telegraph still rests on idle.
 * poseBitmap still windup/knife immediately. Walk→guard leftover unchanged.
 * Stun / non-tele combat still snap. Raise still 0ms. AABB planted. No new
 * combat verb.
 * Link plant walk-in pose leftover: leftover walk used to dump to idle the tick
 * startAttack/startThrow/startBolt armed from mid-stride sheathe (tickGait zeroed
 * walkFadeHold; restLink rested on idle; telegraph false on linkPlant), so the
 * raise hopped walk→idle under windup/knife — a hop, not a plant. Same hole
 * telegraph walk-in already closed for telePlant. Draw-only (drawKnight + tickGait
 * hold). Rest leftover walk under the linkSheet raise when walkFadeHold. Idle
 * sheathe raise still rests on idle. poseBitmap still windup/knife immediately.
 * Telegraph walk-in / clash / holdCut unchanged. Stun / non-link combat still snap.
 * Raise still 0ms. AABB planted. No new combat verb.
 * Portrait pad leftover: landscape zone mins (guarda 52 / tajo 52 / golpe 48 /
 * dardo 56) stayed cramped in the taller portrait letterbox next to the bigger
 * stick — a stamp, not a thumb plant. Same hole portrait stick already closed
 * for the dial. Draw-only (style.css). Bigger hit targets in portrait only.
 * Landscape mins unchanged. Stick size unchanged. Canvas stays 16:9. Keyboard
 * path untouched. No 6th button. No new combat verb.
 * Recovery walk-out pose leftover: leftover slash / windup / knife used to rest
 * on idle through cut / throw / bolt recovery (and chip stun) while A/D was
 * already held — gaitWalkOn stays false while phase / bolt / stun locks
 * walking(), so the fade dumped standing idle then popped the walk sheet the
 * tick recovery ended — a hop, not a plant. Same hole sheathe / feint / wakeup
 * / guard-drop walk-out already closed for gaitWalkOn. Draw-only (drawKnight).
 * Rest leftover cut / grab / knife / stun idle on the walk sheet when A/D is
 * held through that recovery. Idle recovery still rests on idle. Sheathe walk-out gaitWalkOn path unchanged.
 * poseBitmap still slash / windup / knife / idle. ThrowPlantFade / boltPlantFade / sheatheFade / hurtFlash clocks
 * unchanged. AABB planted. No new combat verb.
 * HoldCut walk-in pose leftover: leftover cut used to rest on idle while A/D
 * was held through special-cancel K plant (recovery walk-out already rested cut
 * on walk through recovery; tickGait zeros walkFadeHold on boltPhase), so the
 * plant dumped walk→idle under the cut — a hop, not a plant. Same hole link
 * plant from recovery (restLinkWalk only walkFadeHold). Draw-only (drawKnight).
 * Rest leftover cut / link raise on walk when recoveryWalkOut. Idle plant still rests on idle.
 * Telegraph / link mid-stride walkFadeHold unchanged. Clash walk-in rests separately.
 * poseBitmap still slash / windup. HoldCutFade / linkPlantFade clocks unchanged.
 * AABB planted. No new combat verb.
 * Rival recovery walk-out pose leftover: leftover slash / windup / knife / stun
 * idle used to rest on idle through cut / throw / bolt recovery (and chip stun)
 * while rival.closing was already armed — recoveryWalkOut was you-only (A/D pad),
 * so the fade dumped standing idle then popped the walk sheet the tick stun /
 * recovery ended and closing set gait — a hop, not a plant. Same hole recovery
 * walk-out already closed for you A/D. Draw-only (recoveryWalkOut). Rest leftover
 * cut / grab / knife / stun idle on the walk sheet when closing. Idle recovery
 * (closing false) still rests on idle. You A/D path unchanged. poseBitmap still
 * slash / windup / knife / idle. Fade clocks unchanged. AABB planted. No new combat verb.
 * Clash walk-in pose leftover: leftover cut used to dump walk the tick clash-Space/L/K
 * armed from recovery while A/D (or rival closing) was already held — recovery walk-out
 * / holdCut / link already rested cut on walk through recovery; clashPlantFade skipped
 * sheathe and rested cut on windup/knife with no walk base, so the cancel dumped walk→raise under the fading slash — a hop, not a plant. Same hole holdCut walk-in
 * already closed for special-cancel K. Draw-only (drawKnight). Rest leftover cut raise
 * on the walk sheet when recoveryWalkOut. Idle clash plant still rests on windup/knife
 * (poseBitmap). HoldCut / link / telegraph walk-in unchanged. poseBitmap still windup/knife
 * immediately. ClashPlantFade clock unchanged. AABB planted. No new combat verb.
 * Telegraph recovery walk-in pose leftover: leftover walk used to dump to idle the tick
 * startAttack/startThrow/startBolt armed from recovery while A/D (or rival closing) was
 * already held — recovery walk-out rested cut on walk through recovery; walkFadeHold stayed
 * 0 (phase lock); restTeleWalk only checked walkFadeHold, so the buffered raise hopped
 * walk→idle under windup/knife — a hop, not a plant. Same hole link plant walk-in already
 * closed for recoveryWalkOut. Draw-only (drawKnight + startAttack/startThrow/startBolt
 * walkFadeHold arm). Rest leftover walk under the telePlant raise when walkFadeHold or
 * recoveryWalkOut. Rival closing clears on raise — arm walkFadeHold so the plant holds.
 * Idle telegraph still rests on idle. Mid-stride walkFadeHold path unchanged. poseBitmap
 * still windup/knife immediately. Clash / holdCut / link walk-in unchanged. TelegraphFade
 * clock unchanged. AABB planted. No new combat verb.
 * Reversal plant walk-in pose leftover: leftover walk used to dump the tick startReversal
 * armed from walk→guard / A/D / rival closing (tickGait zeroed walkFadeHold on phase;
 * restRev rested block on windup with no walk base; closing cleared with no walkFadeHold
 * arm), so the reverse hopped walk→raise under the fading block — a hop, not a plant.
 * Same hole telegraph recovery / clash walk-in already closed. Draw-only (drawKnight + startReversal walkFadeHold arm + tickGait hold).
 * Rest leftover block raise on walk when
 * walkFadeHold or recoveryWalkOut. Idle guard reverse still rests on windup. Rival closing
 * clears on reverse — arm walkFadeHold so the plant holds. Walk→guard / clash / holdCut / link / telegraph walk-in unchanged.
 * poseBitmap still windup immediately. ReversalPlantFade clock unchanged. AABB planted. No new combat verb.
 * Throw-from-guard plant walk-in pose leftover: leftover walk used to dump the tick startThrow
 * armed from walk→guard / A/D / rival closing (tickGait zeroed walkFadeHold on phase;
 * restThrowGuard rested block on windup with no walk base), so Space+S from guarda hopped
 * walk→raise under the fading block — a hop, not a plant. Same hole reversal plant walk-in
 * already closed. Draw-only (drawKnight + startThrow walkFadeHold arm + tickGait hold).
 * Rest leftover block raise on walk when walkFadeHold or recoveryWalkOut. Idle throw-from-guard
 * still rests on windup. Rival closing clears on throw — arm walkFadeHold so the plant holds.
 * Tech-from-guard plant walk-in: same rest on walk under leftover block (restTechGuardWalk;
 * landThrowTech walkFadeHold arm + tickGait hold). Idle tech-from-guard still rests on windup.
 * Reversal / clash / holdCut / link / telegraph walk-in unchanged. poseBitmap still windup
 * immediately. ThrowGuardPlantFade / TechGuardPlantFade clocks unchanged. AABB planted.
 * No new combat verb.
 * Wakeup→reversal walk-in pose leftover: leftover walk used to dump the tick startWakeReversal
 * armed from A/D / rival closing mid-getup (restWakeRev rested crumple on windup with no walk
 * base; temporary guarding made recoveryWalkOut false so walkFadeHold was not armed;
 * reversalPlantFade was 0 without leftover guardPoseK so tickGait zeroed walkFadeHold), so the
 * reverse hopped walk→raise under the fading crumple — a hop, not a plant. Same hole reversal
 * plant walk-in already closed for guard reverse. Draw-only (drawKnight + startWakeReversal
 * walkFadeHold arm + tickGait hold). Rest leftover crumple raise on walk when walkFadeHold or
 * recoveryWalkOut (and no leftover guard plant — restRevWalk owns that). Idle getup reverse
 * still rests on windup. Wakeup→guard / wakeup walk-out / guard reversal walk-in unchanged.
 * poseBitmap still windup immediately. WakeupFade / wakeRevFadeHold clocks unchanged. AABB
 * planted. No new combat verb.
 * Wakeup→guard walk-in pose leftover: leftover walk used to dump the tick S raised mid-getup
 * from A/D / rival closing (restWakeGuard rested crumple on block with no walk base;
 * guarding made recoveryWalkOut false; tickGait could zero walkFadeHold when settle was
 * not armed from a plant-frame raise), so the raise hopped walk→block under the fading
 * crumple — a hop, not a plant. Same hole wakeup→reversal walk-in already closed for getup L.
 * Draw-only (drawKnight + updateGuard walkFadeHold arm + tickGait hold). Rest leftover
 * crumple raise on walk when walkFadeHold. Idle getup guard still rests on block.
 * Wakeup→reversal walk-in / wakeup walk-out / walk→guard unchanged. poseBitmap still block
 * once guarding. WakeupFade clock unchanged. AABB planted. No new combat verb.
 * Feint walk-in pose leftover: leftover walk used to dump to idle the tick startFeint armed
 * from telegraph / A/D / rival closing (tickGait zeroed walkFadeHold once telegraphing ended;
 * restFeintWalk only checked gaitWalkOn; startFeint zeroed gait with no walkFadeHold arm), so
 * the pull hopped walk→idle under the fading windup — a hop, not a plant. Same hole telegraph
 * walk-in already closed for telePlant. Draw-only (drawKnight + startFeint walkFadeHold arm +
 * tickGait hold). Rest leftover windup on walk when gaitWalkOn or walkFadeHold or recoveryWalkOut.
 * Idle pull still rests on idle. Feint walk-out / feint→guard unchanged. poseBitmap still idle
 * once feintT is set. FeintFade clock unchanged. AABB planted. No new combat verb.
 * Wakeup walk-out recoveryWalkOut pose leftover: leftover crumple used to rest on idle while
 * recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn false
 * (restWakeWalk only checked gaitWalkOn), so the getup dumped standing idle then popped walk
 * the tick gaitWalkOn flipped / closing set gait — a hop, not a plant. Same hole rival recovery
 * walk-out / feint walk-in already closed for recoveryWalkOut. Draw-only (drawKnight). Rest
 * leftover crumple on walk when gaitWalkOn or walkFadeHold or recoveryWalkOut. Idle getup still
 * rests on idle. Wakeup→guard / wakeup→reversal walk-in unchanged. poseBitmap still idle / walk.
 * WakeupFade clock unchanged. AABB planted. No new combat verb.
 * Guard drop walk-out recoveryWalkOut pose leftover: leftover block used to rest on idle while
 * recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn false
 * (restGuardWalk only checked gaitWalkOn), so the drop dumped standing idle then popped walk
 * the tick gaitWalkOn flipped / closing set gait — a hop, not a plant. Same hole wakeup walk-out
 * recoveryWalkOut / feint walk-in already closed. Draw-only (drawKnight). Rest leftover block on
 * walk when gaitWalkOn or walkFadeHold or recoveryWalkOut. Idle drop still rests on idle.
 * Mid-stride gaitWalkOn path unchanged. Feint-from-drop skip unchanged. poseBitmap still idle /
 * walk. GuardDropFade clock unchanged. AABB planted. No new combat verb.
 * Clash walk-in walkFadeHold pose leftover: leftover cut used to dump walk the tick clash-Space/L/K
 * armed from recovery while A/D (or rival closing) was already held — cancelInto* cleared closing with
 * no walkFadeHold arm; tickGait zeroed walkFadeHold on phase / boltPhase; restClashWalk only checked
 * recoveryWalkOut, so rival closing (and any buffered hold) hopped walk→raise under the fading slash —
 * a hop, not a plant. Same hole telegraph recovery / link plant walk-in already closed for walkFadeHold.
 * Draw-only (drawKnight + cancelIntoGolpe/Slash/Bolt walkFadeHold arm + tickGait hold). Rest leftover
 * cut raise on walk when walkFadeHold or recoveryWalkOut. Idle clash plant still rests on windup/knife
 * (poseBitmap). Rival closing clears on cancel — arm walkFadeHold so the plant holds. You A/D path
 * unchanged. HoldCut / link / telegraph walk-in unchanged. poseBitmap still windup/knife immediately.
 * ClashPlantFade clock unchanged. AABB planted. No new combat verb.
 * HoldCut walk-in walkFadeHold pose leftover: leftover cut used to dump walk the tick
 * special-cancel K armed from recovery while A/D (or rival closing) was already held —
 * cancelIntoBolt cleared closing with no walkFadeHold arm on the holdCut branch; tickGait
 * zeroed walkFadeHold on boltPhase; restHoldCutWalk only checked recoveryWalkOut, so rival
 * closing (and any buffered hold) hopped walk→idle under the fading sheathe — a hop, not a
 * plant. Same hole clash walk-in walkFadeHold already closed for clashPlant. Draw-only (drawKnight + cancelIntoBolt walkFadeHold arm + tickGait hold).
 * Rest leftover cut raise on
 * walk when walkFadeHold or recoveryWalkOut. Idle holdCut plant still rests on idle. Rival
 * closing clears on cancel — arm walkFadeHold so the plant holds. You A/D path unchanged.
 * Clash / link / telegraph walk-in unchanged. poseBitmap still slash immediately. HoldCutFade
 * clock unchanged. AABB planted. No new combat verb.
 * Sheathe walk-out recoveryWalkOut pose leftover: leftover slash used to rest on idle while
 * recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn false
 * (restSheatheWalk only checked gaitWalkOn||recoveryWalkResting — idle sheathe is not recovery),
 * so the sheathe dumped standing idle then popped walk the tick gaitWalkOn flipped / closing set
 * gait — a hop, not a plant. Same hole wakeup walk-out recoveryWalkOut / guard drop walk-out
 * recoveryWalkOut already closed. Draw-only (drawKnight). Rest leftover slash on walk when
 * gaitWalkOn or walkFadeHold or recoveryWalkOut. Idle sheathe still rests on idle. Mid-stride
 * gaitWalkOn path unchanged. Recovery A/D path unchanged (recoveryWalkOut covers it). Sheathe→guard
 * unchanged. poseBitmap still idle / walk. SheatheFade clock unchanged. AABB planted. No new combat verb.
 * Bolt recovery settle→walk destRect leftover: leftover boltPlantFade breath used to seat ~1.1
 * mid-stride (plant ease climbed to full amp through recovery while A/D / rival closing already
 * held — recoveryWalkOut / restBoltWalk planted the sheet, but idleBreath preferred plant release
 * over walkRise), then dump when rise finally owned — a hop, not a plant. Same hole wakeup
 * settle→walk / clash sheathe settle→walk / cut recovery settle→walk already closed. destRect-only
 * (idleBreath / cutRecBreathT). Keep breath 0 through walk-out bolt recovery; arm cutRecBreathT when
 * bolt recovery ends mid-stride / mid-raise so max(ck, wk) / hold-under-rise own the post-recovery
 * seat. Idle knife plant still eases with boltPlantFade (knife plant end unchanged). Special-cancel
 * still zeros (holdingCutBolt) / sheathe path unchanged. Sheet still boltPlantFade / restBoltWalk.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Bolt recovery settle→walk plant-release destRect leftover: leftover boltPlantFade breath used to
 * seat mid-stride the tick A/D / rival closing walked through bolt recovery after tele/walk-in (idleBreath
 * preferred plant release — only gated recoveryWalkOut / guard, not walking / walkFadeHold; restBoltWalk /
 * walkFadeHold already rested walk under the plant), then ease — a hop, not a plant. Same hole
 * throw / chip stun / wakeup settle→walk plant-release already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walking / walk-out / leftover
 * walkFadeHold during bolt plant; advanceBoltFighter arm cutRecBreathT when bolt recovery ends
 * mid-stride / mid-raise / under walkFadeHold so max(ck, wk) / hold-under-rise own the post-recovery seat.
 * Idle knife plant still eases with boltPlantFade. Bolt recovery settle→guard unchanged.
 * Special-cancel still zeros (holdingCutBolt). Sheet still boltPlantFade / restBoltWalk.
 * Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Throw recovery settle→walk destRect leftover: leftover throwPlantFade breath used to seat ~0.96
 * mid-stride (plant ease climbed to full amp through recovery while A/D / rival closing already
 * held — recoveryWalkOut / restThrowWalk planted the sheet, but idleBreath preferred plant release
 * over walkRise), then dump when rise finally owned — a hop, not a plant. Same hole bolt recovery
 * settle→walk / wakeup settle→walk / clash sheathe settle→walk / cut recovery settle→walk already
 * closed. destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walk-out throw recovery;
 * advanceAttack arm cutRecBreathT when throw recovery ends mid-stride / mid-raise so max(ck, wk) /
 * hold-under-rise own the post-recovery seat. Idle throw plant still eases with throwPlantFade
 * (throw plant end unchanged). Sheet still throwPlantFade / restThrowWalk. Tip / steel markers
 * unchanged. AABB planted. No new combat verb.
 * Throw recovery settle→walk plant-release destRect leftover: leftover throwPlantFade breath used to
 * seat mid-stride the tick A/D / rival closing walked through throw recovery after tele/walk-in (idleBreath
 * preferred plant release — only gated recoveryWalkOut / guard, not walking / walkFadeHold; restThrowWalk /
 * walkFadeHold already rested walk under the plant), then ease — a hop, not a plant. Same hole
 * chip stun / wakeup / feint settle→walk plant-release already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walking / walk-out / leftover
 * walkFadeHold during throw plant; advanceAttack arm cutRecBreathT when throw recovery ends
 * mid-stride / mid-raise / under walkFadeHold so max(ck, wk) / hold-under-rise own the post-recovery seat.
 * Idle throw plant still eases with throwPlantFade. Throw recovery settle→guard unchanged.
 * Sheet still throwPlantFade / restThrowWalk. Tip / steel markers unchanged. AABB planted. No new combat verb.
 * Chip stun settle→walk destRect leftover: leftover stun-end breath ease-in (stunT/GUARD_RAISE_MS)
 * used to seat mid-stride under A/D / recoveryWalkOut while the walk sheet was already planted
 * (recoveryWalkOut / recoveryWalkResting), then dump when rise finally owned — a hop, not a plant.
 * Same hole throw / bolt recovery settle→walk already closed. destRect-only (idleBreath /
 * cutRecBreathT). Keep breath 0 through walk-out / guard during stun-end; tickStun arm
 * cutRecBreathT when chip stun ends mid-stride / mid-raise so max(ck, wk) / hold-under-rise own
 * the post-stun seat. Idle chip stun still eases with stunT/GUARD_RAISE_MS (stun end unchanged).
 * Throw KD / wakeup invuln still hard-zero (wakeupFade owns getup). poseBitmap still idle. Stun
 * rot still scales with stunT/HITSTUN. Extra destRect rot stays 0. AABB planted. No new combat verb.
 * Chip stun settle→walk plant-release destRect leftover: leftover stun-end breath ease-in used to
 * seat mid-stride the tick A/D / rival closing walked through chip stun after tele/walk-in (idleBreath
 * preferred plant release — only gated recoveryWalkOut / guard, not walking / walkFadeHold; rest stun
 * walk / walkFadeHold already rested walk under the flinch), then ease — a hop, not a plant. Same hole
 * wakeup / feint settle→walk plant-release already closed. destRect-only (idleBreath / cutRecBreathT).
 * Keep breath 0 through walking / walk-out / leftover walkFadeHold during stun-end; tickStun arm cutRecBreathT when chip stun ends
 * mid-stride / mid-raise / under walkFadeHold so max(ck, wk) / hold-under-rise own the post-stun seat.
 * Idle chip stun still eases with stunT/GUARD_RAISE_MS.
 * Chip stun settle→guard unchanged. Throw KD / wakeup invuln still hard-zero. poseBitmap still idle.
 * Stun rot still scales with stunT/HITSTUN. Extra destRect rot stays 0. AABB planted. No new combat verb.
 * Telegraph settle→walk destRect leftover: leftover telegraphFade breath used to seat ~1.4 mid-stride
 * the tick Space/L/throw/K armed from A/D / rival closing (idleBreath preferred plant release over
 * walk plant — recoveryWalkOut / walkFadeHold already rested walk under telePlant), then ease out —
 * a hop, not a plant. Same hole chip stun / bolt / throw recovery settle→walk already closed.
 * destRect-only (idleBreath). Keep breath 0 through walk-out / leftover walkFadeHold during
 * telegraph; idle telegraph still eases with telegraphFade. No cutRec arm (telegraph ends into
 * active; phase!==idle keeps breath 0; recovery settle→walk already arms cutRec). AABB planted.
 * No new combat verb.
 * Feint settle→walk plant-release destRect leftover: leftover feintFade breath used to seat ~1.1
 * mid-stride the tick A/D / rival closing walked through the pull after tele/walk-in (idleBreath
 * preferred plant release — max(feintFade, rise) climbed as feintFade died while walkRise restarted
 * from 0; restFeintWalk / walkFadeHold already rested walk under the pull), then ease — a hop, not
 * a plant. Same hole telegraph / chip stun / bolt / throw recovery settle→walk already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walking / walk-out / leftover
 * walkFadeHold during feint; tickFeint arm cutRecBreathT when feint ends mid-stride / mid-raise so
 * max(ck, wk) / hold-under-rise own the post-feint seat. Idle feint still eases with feintFade.
 * Feint settle→guard unchanged (max feintFade, raise k). restFeintWalk / feintFade unchanged.
 * Cut recovery settle→walk plant-release destRect leftover: leftover cutRecBreathT ease-in used to
 * seat mid-stride the tick A/D / rival closing walked through cut recovery after tele/walk-in (idleBreath
 * preferred plant release — only gated walking(f)→max(ck, wk), not walkFadeHold / recoveryWalkOut; rest
 * walk / walkFadeHold already rested walk under the settle), then ease — a hop, not a plant. Same hole
 * chip stun / throw / bolt / wakeup settle→walk plant-release already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walk-out / leftover walkFadeHold
 * during cutRec ease (walking still max(ck, wk)); tickCutRecBreath hold cutRec under recoveryWalkOut /
 * walkFadeHold so max(ck, wk) / hold-under-rise own the post-recovery seat when stride arms.
 * Idle cut recovery settle still eases when not walking / walk-out / hold. Cut recovery settle→guard
 * unchanged (max ck, rk). AABB planted. No new combat verb.
 * FEINT_RECOVERY / combat lock unchanged. AABB planted. No new combat verb.
 * Telegraph settle→walk keep-0: add walking(f) alongside recoveryWalkOut / walkFadeHold (sibling
 * keep-0 parity with feint / wakeup / stun / throw / bolt). Idle telegraph still eases with
 * telegraphFade. AABB planted. No new combat verb.
 * Guard drop settle→walk plant-release destRect leftover: leftover raise k / max(rk, wk) used to
 * seat mid-stride the tick A/D / rival closing walked through drop after tele/walk-in (walkRise
 * restarted from 0; restGuardWalk / walkFadeHold already rested walk under the drop), then ease —
 * a hop, not a plant. Same hole feint / cutRec / chip stun settle→walk plant-release already closed.
 * destRect-only (idleBreath / cutRecBreathT). Keep breath 0 through walking / walk-out / leftover
 * walkFadeHold during drop; tickGuardPose arm cutRecBreathT when drop ends mid-stride / under
 * walkFadeHold so max(ck, wk) / hold-under-rise own the post-drop seat. Idle drop still eases with
 * raise k. Pure idle→walk still eases with rise. Walk-out sheet leftover unchanged (guardDropFade).
 * AABB planted. No new combat verb.
 * Plant walk-in destRect lean leftover: mid-stride Space/L/K / clash / holdCut / reverse /
 * throw-guard / tech / feint used to dump walkSettleRot/Oy the same tick plant armed
 * (tickGait kept walkFadeHold for the sheet but zeroed walkSettleT; walkSettleK also gated
 * phase!==idle), so destRect lean hopped ~0.05 while restLinkWalk/restClashWalk/restTeleWalk
 * still showed walk under the raise — a hop, not a plant. Same hole walk→guard destRect lean
 * leftover already closed. destRect-only ease (walkSettleK). Keep leftover settle through
 * leftover walkSettleT under plant fades (arm on was-walk; drain; do not invent from bare
 * walkFadeHold). walkSettleK keeps through telegraph/link/clash/holdCut/reversal/throw-guard/
 * tech/feint like guarding. Idle plant still rests. Stun / non-plant combat still snap.
 * sheatheDip hump unchanged. AABB planted. No new combat verb.
 * Sheathe settle lean under walkFadeHold: A/D release mid-clash-sheathe (and
 * other idle sheathe under walkFadeHold) used to dump walkSettleRot/Oy the same
 * tick settle armed (tickGait armed walkSettleT on the idle path, but walkSettleK
 * gated usingDedicatedPose while sheathing() held slash), so destRect lean hopped
 * to 0 while sheatheDip still rode the hump — a hop, not a settle. Same hole plant
 * walk-in / walk→guard destRect lean leftover already closed. destRect-only ease
 * (walkSettleK). Keep leftover settle through leftover walkSettleT under sheathe
 * (mirror plant fades / guarding). Idle settle still eases. sheatheDip hump
 * unchanged. AABB planted. No new combat verb.
 * Settle→plant destRect breath leftover: mid-settle Space/L/throw/K used to dump
 * leftover settle breath the tick telegraph armed (idleBreath keep-0 on
 * walkFadeHold while walkSettleK still kept lean under restTeleWalk /
 * restLinkWalk/restClashWalk siblings) — a hop, not a plant. Same hole idle
 * settle→guard destRect leftover already closed. destRect-only (idleBreath).
 * Math.max(settle k, telegraphFade) when A/D already released under leftover
 * walkFadeHold so breath stays suppressed then dies with raise. A/D-held
 * walk-in / rival closing still keep 0 (telegraph settle→walk). Clash/link/holdCut
 * still hard-0 (recovery/sheathe breath already 0). Idle telegraph still eases
 * with telegraphFade. sheatheDip hump unchanged. AABB planted. No new combat verb.
 * Feint settle→plant destRect breath leftover: mid-settle Space cancel used to dump
 * leftover settle breath the tick feint armed (idleBreath keep-0 on walkFadeHold
 * while walkSettleK still kept lean under restFeintWalk) — a hop, not a plant.
 * Same hole tele settle→plant already closed. destRect-only (idleBreath).
 * Math.max(settle k, feintFade) when A/D already released under leftover
 * walkFadeHold so breath stays suppressed then dies with pull. A/D-held walk-in /
 * rival closing still keep 0 (feint settle→walk plant-release). Idle feint still
 * eases with feintFade. Feint settle→guard unchanged (max fk, rk). AABB planted.
 * No new combat verb.
 * TipX under plant fades leftover: connected slash-L / clash-Space/L used to dump
 * bladeTip onto windup the same tick poseBitmap flipped while leftover slash still
 * owned the sheet (linkPlantFade / clashPlantFade), so tip juice hopped ~240px off
 * the visible blade — a hop, not a plant. Same hole spark origin leftover already
 * closed for clash-K / idle-sheathe-K castPlantXY. Draw-only (bladeTipX / bladeTipY).
 * Ease slash→pose tip with that leftover fade. HoldCut still slash tip (holdingCutBolt).
 * Telegraph / idle K cast still rides castPlantXY. tip markers / bladeBox formula /
 * active hitbox unchanged. AABB planted. No new combat verb.
 * Reversal/throw-guard settle→plant destRect breath leftover: mid-settle L / Space+S
 * from guard used to dump leftover settle breath (~0.27→0) the tick reverse/throw
 * armed (idleBreath phase!==idle hard-0 while walkSettleK still kept lean under
 * restRevWalk / restThrowGuardWalk) — a hop, not a plant. Same hole tele/feint
 * settle→plant already closed. destRect-only (idleBreath). Math.max(settle k,
 * reversalPlantFade / throwGuardPlantFade) when A/D already released under leftover
 * walkFadeHold so breath stays suppressed then dies with plant. A/D-held walk-in /
 * rival closing still keep 0. Idle guard reverse/throw still eases with plant fade.
 * Clash/link/holdCut still hard-0. Tip also hops guard→windup under plant fade —
 * ease block→pose tip with max(reversalPlantFade, throwGuardPlantFade) (mirror
 * tipX under plant fades for link/clash). tip markers / steelX / bladeBox /
 * active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under telegraphFade leftover: idle/walk Space/L/throw/K used to dump
 * bladeTip onto windup (or throwKnife) the same tick poseBitmap flipped while
 * leftover idle still owned the sheet (telegraphFade), so tip juice hopped
 * ~300px — a hop, not a plant. Same hole tipX under plant fades / reversal
 * tip already closed for link/clash/guard. Draw-only (bladeTipX / bladeTipY).
 * Ease idle-edge→pose tip with telegraphFade. Rival same path. TipX under plant
 * fades / reversal/throw-guard tip unchanged. castPlantXY K path unchanged.
 * tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
 * No new combat verb.
 * Tip under feintFade leftover: windup→idle (Space feint) used to dump
 * bladeTip onto idle-edge the same tick poseBitmap flipped while
 * leftover windup still owned the sheet (feintFade), so tip juice hopped ~304px while
 * fk high — a hop, not a plant. Same hole tip under telegraphFade already
 * closed for idle→windup. Draw-only (bladeTipX / bladeTipY).
 * Ease windup→pose tip with feintFade (fk dies 1→0; mirror plant fades /
 * tele tip ease). Rival same path. Tip under telegraphFade / tipX under plant
 * fades / reversal tip unchanged. castPlantXY K path unchanged (puff≠bladeTip).
 * tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
 * No new combat verb.
 * Tip under throw-guard short raise leftover: Space+S from short guarda used to
 * dump bladeTip onto windup (~304px) the same tick leftover gpk / tgf died
 * (throwGuardPlantFade rides guardRaiseK; short raise clears in one tick) —
 * a hop, not a plant. Hold-one-tick is not enough (arm already near windup
 * when tgf≈0.1). Same hole tip under telegraphFade already closed for
 * idle→windup over GUARD_RAISE_MS. Draw-only (bladeTipX / bladeTipY).
 * Ease block→pose tip with max(throwGuardPlantFade, 1−raiseT) while
 * throwGuardPlanting (raiseT = smoothstep(phaseT/GUARD_RAISE_MS); mirror
 * tele tip ease). Full raise: gpk from 1 tracks the same smoothstep mirror
 * (no-op vs leftover pk). Reverse short-raise tip mirrors (see tip under
 * reverse short raise leftover). Tech-guard short-raise tip mirrors (see tip
 * under tech-guard short raise leftover). Sheet throwGuardPlantFade / tickGuardPose
 * drain unchanged. castPlantXY K path unchanged (snap on tele K intentional).
 * tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
 * No new combat verb.
 * Tip under reverse short raise leftover: L+S from short guarda used to
 * dump bladeTip onto windup (~304px) the same tick leftover gpk / rpf died
 * (reversalPlantFade rides guardRaiseK; short raise clears in one tick) —
 * a hop, not a plant. Same hole tip under throw-guard short raise already
 * closed for Space+S (v290 left reversal on pk alone). Draw-only
 * (bladeTipX / bladeTipY). Ease block→pose tip with max(reversalPlantFade,
 * 1−raiseT) while reversalPlanting (raiseT = smoothstep(phaseT/GUARD_RAISE_MS);
 * mirror throw-guard tipPlantK). Full raise: gpk from 1 tracks the same
 * smoothstep mirror (no-op vs leftover pk). Sheet reversalPlantFade /
 * tickGuardPose drain unchanged. castPlantXY K path unchanged. tip markers /
 * steelX / bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under tech-guard short raise leftover: Space+S tech from short guarda used to
 * dump bladeTip onto windup (~304px) the same tick leftover gpk / tecf died
 * (techGuardPlantFade rides guardRaiseK; short raise clears in one tick;
 * techGuardPlanting requires leftover k so tipPlantK dropped with gpk) —
 * a hop, not a plant. Same hole tip under throw-guard / reverse short raise
 * already closed (v291 left tech on pk alone; pk lacked techGuardPlantFade).
 * Draw-only (bladeTipX / bladeTipY). Ease block→pose tip with
 * max(techGuardPlantFade, 1−raiseT) while techGuardPlanting or techGuardTip
 * (raiseT = smoothstep(phaseT/GUARD_RAISE_MS); mirror throw/reverse tipPlantK).
 * techGuardTip latches from leftover k at landThrowTech so phaseT ease holds
 * after gpk dies (throwGuardPlanting stays true whole startup; tech planting
 * does not). Idle tech still snaps (no techGuardTip). Full raise: gpk from 1
 * tracks the same smoothstep mirror. Sheet techGuardPlantFade / tickGuardPose
 * drain unchanged. castPlantXY K path unchanged. tip markers / steelX /
 * bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under slash/golpe leftover short raise leftover: Space/L from short
 * leftover drop used to dump bladeTip onto windup (~304px) the same tick
 * leftover gpk died when telegraph was off (slashLeftoverPlanting /
 * golpeLeftoverPlanting sat outside tipPlantK; short raise clears in one
 * tick) — a hop, not a plant. Same hole tip under throw-guard / reverse /
 * tech-guard short raise already closed (v292 left slash/golpe on tele tip
 * alone; tele off / sheathe plant still dumped). Draw-only (bladeTipX /
 * bladeTipY). Ease block→pose tip with max(pk, 1−raiseT) while
 * (slashLeftoverPlanting || golpeLeftoverPlanting) and leftoverPlantTip
 * and not telegraphing (raiseT = smoothstep(phaseT/GUARD_RAISE_MS); mirror
 * tech-guard tipPlantK). Tele tip still owns idle Space/L ease; tipPlantK
 * covers tele-off / sheathe-plant leftover drop. leftoverPlantTip latches
 * from leftover k at startAttack so idle Space/L still snaps (no latch)
 * and cancelIntoSlash/Golpe still snap (no leftover k). Full raise: phaseT ease tracks the same smoothstep mirror. Sheet
 * slash/golpe leftover k / tickGuardPose drain unchanged. castPlantXY K
 * path unchanged. tip markers / steelX / bladeBox / active hitbox
 * unchanged. AABB planted. No new combat verb.
 * Tip under bolt leftover short raise leftover: K from short leftover drop
 * used to dump bladeTip onto windup (~304px) the same tick leftover gpk
 * died when telegraph was off (boltLeftoverPlanting sat outside tipPlantK;
 * short raise clears in one tick; sheathe-plant sets tele off) — a hop,
 * not a plant. Same hole tip under slash/golpe leftover short raise already
 * closed (v293 left bolt on tele tip alone; tele off / sheathe plant still
 * dumped). Draw-only (bladeTipX / bladeTipY). Ease block→pose tip with
 * max(pk, 1−raiseT) while boltLeftoverPlanting and leftoverPlantTip and not
 * telegraphing (raiseT = smoothstep((boltT|phaseT)/GUARD_RAISE_MS); mirror
 * slash/golpe tipPlantK; bolt startup uses boltT). Tele tip still owns idle
 * K ease; tipPlantK covers tele-off / sheathe-plant leftover drop.
 * leftoverPlantTip latches from leftover k at startBolt so idle K still
 * snaps (no latch) and special-cancel still snaps (holdingCutBolt / no
 * leftover k). Full raise: boltT ease tracks the same smoothstep mirror.
 * Sheet bolt leftover k / tickGuardPose drain unchanged. castPlantXY K
 * path unchanged. tip markers / steelX / bladeBox / active hitbox
 * unchanged. AABB planted. No new combat verb.
 * Tip under stun leftover short raise leftover: chip stun from short leftover
 * drop / leftover plant used to dump bladeTip onto idle (~sheet-edge) the
 * same tick landHit set stunT (stunLeftoverPlanting sat outside tipPlantK;
 * poseBitmap still idle immediately; short leftover gpk clears in one tick)
 * — a hop, not a plant. Same hole tip under slash/golpe/bolt leftover short
 * raise already closed (v294 left stun on destRect ease alone; tip dumped).
 * Draw-only (bladeTipX / bladeTipY). Ease block→pose tip with
 * max(pk, guardRaiseK) while stunLeftoverPlanting (gpk already smoothsteps
 * leftover drain; no phaseT/boltT attack raise). No leftoverPlantTip latch
 * (stunLeftoverPlanting already requires gpk>0 + stunT). Standing chip stun
 * without leftover k still snaps. Sheet stun leftover k / tickGuardPose
 * drain unchanged. castPlantXY K path unchanged. tip markers / steelX /
 * bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under throwKd leftover short raise leftover: throw knockdown from
 * short leftover drop / leftover plant used to dump bladeTip onto hurt
 * (~sheet-edge) the same tick landThrow set thrownT (throwKdLeftoverPlanting
 * sat outside tipPlantK; poseBitmap still hurt immediately; short leftover
 * gpk clears in one tick) — a hop, not a plant. Same hole tip under stun
 * leftover short raise sibling (mirror). Draw-only (bladeTipX / bladeTipY).
 * Ease block→pose tip with max(pk, guardRaiseK) while throwKdLeftoverPlanting
 * (gpk already smoothsteps leftover drain; no phaseT/boltT attack raise).
 * No leftoverPlantTip latch (throwKdLeftoverPlanting already requires gpk>0
 * + thrownT). Throw KD without leftover k still snaps. Sheet throwKd leftover
 * k / tickGuardPose drain unchanged. castPlantXY K path unchanged. tip
 * markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
 * No new combat verb.
 * Tip under guard drop leftover: S-release / guard-break from leftover raise
 * used to dump bladeTip onto idle (~40px tipY) the same tick guarding
 * cleared while guardDropFade still owned the block sheet (guardDropFade sat outside tipPlantK;
 * poseBitmap still idle immediately; leftover gpk drains over raise) — a hop, not a plant.
 * Same hole tip under stun / throwKd leftover short raise already closed
 * (v295 left drop on sheet fade alone; tip dumped). Draw-only (bladeTipX / bladeTipY).
 * Ease block→pose tip with max(pk, guardRaiseK) while guardDropFade (gdf already
 * smoothsteps leftover drain via guardRaiseK; no phaseT). No leftoverPlantTip latch
 * (guardDropFade already requires gpk>0 + idle drop). Idle without leftover k still snaps.
 * Guard break same path (gdf no longer gates guardBreakT). Sheet guardDropFade /
 * tickGuardPose drain unchanged. castPlantXY K path unchanged. tip markers /
 * steelX / bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * KO caida audio sync leftover: sfx_ko_caida used to fire the same tick
 * beginFall armed crumple (fallT=0), so the caída sting led the stone land by
 * ~520ms — soft start grit 1.6 had audio, land grit 2.4 + punch at
 * FALL_MS*0.72 stayed silent. Juice-only (playSfx). Arm caida on koLanded with
 * the land dust / bumpShake. beginFall still plants soft grit + soft-nudge;
 * FALL_MS / crumpleFade / KO flash / title music crossfade unchanged.
 * destRect/AABB planted. No new combat verb.
 * Portrait pad horizontal pack leftover: portrait bigger mins (guarda 64 /
 * tajo 64 / golpe 58 / dardo 68) + cut-cluster 130/42% still overflowed the right budget
 * beside the 120px stick on ~390px phones — buttons spilled past the strip.
 * Same hole portrait pad leftover already closed for stamp size, but the packed
 * strip was still wider than the letterbox. Draw-only (style.css). Pack pad
 * gap/padding + pad-right/cluster gaps + mins so guarda/tajo/golpe/dardo fit
 * (56/56/50/56, cluster 112/40%). Stick size unchanged. Landscape mins
 * unchanged. Letterbox + canvas 16:9 unchanged. Keyboard path untouched. No
 * 6th button. No new combat verb.
 * Stick Esc→JUGAR leftover: Escape goTitleFromPlay keys.clear used to leave
 * stickHeldA/D true while KeyA/D were gone, so JUGAR with the thumb still on
 * the stick did not walk until release+re-nudge (stickApply only edges).
 * Pad juice: resetRound re-feeds A/D from stickHeld while stickPtr is live.
 * Title still drops walk (keys.clear + actionHeld requires keys). Harness
 * stickApply without stickPtr does not re-arm. stickRelease / deadzone /
 * portrait follow unchanged. Pad zones keep padHoldN (finger still down).
 * destRect/AABB planted. No new combat verb.
 * Tech-guard settle→plant destRect breath leftover: mid-settle Space+S tech
 * from guard used to dump leftover settle breath the tick landThrowTech armed
 * (idleBreath fell through throw recovery — walkFadeHold keep-0 / throwPlantFade
 * while walkSettleK still kept lean under restTechGuardWalk) — a hop, not a plant.
 * Same hole reverse/throw-guard settle→plant already closed. destRect-only
 * (idleBreath). Math.max(settle k, techGuardPlantFade) when A/D already released
 * under leftover walkFadeHold so breath stays suppressed then dies with plant.
 * A/D-held walk-in / rival closing still keep 0. Idle tech-from-guard still eases
 * with techGuardPlantFade. Reverse/throw-guard settle→plant / tipPlantK / tip under
 * guard drop unchanged. Clash/link/holdCut still hard-0. AABB planted. No new combat verb.
 * Hit flash vs knock resume leftover: leftover white used to stay at full
 * HIT_FLASH_MS 120 the tick freeze ended (knock / crumple resume) and fade on its
 * own linear clock while punchCover held full through the slam — flash did not
 * die with cover. Draw-only (hurtFlashK). Hold peak while cover is full (k>0.25);
 * ease out over cover's last quarter (same smoothstep as punchCover). hitFlashT
 * clock holds through the live punch and clears when cover dies. Freeze still
 * holds the clock; HIT_FLASH_MS 120 arm unchanged; steel asterisk / sparks /
 * HUD drain unchanged. destRect/AABB planted. No new combat verb.
 * Portrait pad 2x2 clarity leftover: portrait row pack still lost golpe+dardo
 * on ~390px (golpe nested stamp inside cut-cluster; dardo a side stamp) — not
 * clearly visible equal to guarda/tajo. Draw-only (style.css). Portrait-only
 * 2x2 on pad-right; cut-cluster display:contents so the four zones are equal
 * cells (≥56). Order: TL guarda | TR tajo / BL golpe | BR dardo — throw chord
 * hold-guarda+tap-tajo (top row); reversal hold-guarda+tap-golpe (left column).
 * Slightly taller --pad-h so two rows fit. Landscape single-row + keyboard
 * path untouched. No 6th button. No new combat verb.
 * Parry (Combate final): timing window vs hold-guarda. Still S — no new button.
 * TRIGGER: guard-raise EDGE (press S / start raising). PARRY_WIN 140ms from
 * raise-start (includes raise anim). Only vs rival melee active (Space/L) —
 * NOT throw, NOT dart chip. elapsed_guard < 140 → perfect parry; ≥ 140 →
 * normal hold-block.
 * Hold-block: 0 dmg + push 150 + steel 60. Does NOT arm RIPOSTE_WIN (v308 —
 * riposte no longer from hold).
 * Perfect parry: 0 dmg + rival stagger PARRY_STAGGER 180ms (can't act) + ARM
 * RIPOSTE_WIN 280ms + distinct gleam PARRY_GLEAM 80ms (not block steel) +
 * pitched steel SFX. Player only — rival AI does not parry (hold-block only,
 * reaction GUARD_COMMIT 140). tipPlantK / settle leftovers untouched.
 * Riposte (reward path after perfect parry): Space OR L in RIPOSTE_WIN 280ms
 * fire a riposte slash: RIPOSTE_STARTUP 130 / ACTIVE 140 / RECOVERY 280 — same clean
 * −10 as normal tajo (no +dmg). Hitstop/hitstun/flash stay 140/350/120.
 * One use; spent on press (even whiff). Player 80ms buffer. Player only — rival AI does not
 * riposte. Guard-zone brasa flash + floating "!" + chest ring/teach while window live (v360). No 6th button.
 * Riposte SFX + connect juice: spend Space/L in window fires sfx_riposte
 * (snappy steel whoosh, sharper than tajo). No arm-window tick (prefer spend).
 * Active skips normal whoosh when riposte (spend already owns the cut air).
 * Clean connect: pitched impacto stack + RIPOSTE_HIT_SHAKE 12 (feel micro;
 * HITSTOP_HIT 140 / HITSTUN 350 / HIT_FLASH_MS 120 / dmg −10 / frames
 * 130/140/280 locked). Reuses impacto buffer; no procedural beep.
 * Rival AI variety (v310): no rival parry (still hold-block / GUARD_COMMIT 140).
 * Soft mix — not random every frame, not a cancel robot. Mid: AI_MID_DART /
 * AI_MID_WALK_PAUSE soft roll (high roll still darts for harness 0.99). Close: mix golpe punish + throw (existing
 * THROW_AI_CD) + occasional hold-guard bait, cut pure Space mash. After player
 * blocks their cut or after a whiff: bias reset (backstep / dart) instead of
 * another slash. Cancel doors stay chance-based (base AI_LINK_CHANCE 0.4); when
 * follow-up still reaches, AI_LINK_RANGE_CHANCE 0.55 so tajo→golpe / golpe→tajo /
 * →K actually fire more in range. Clash doors stay 0.4. CDs / stam / reversal /
 * pushblock / feint rules unchanged. Space/L/K/riposte frames untouched.
 * Rival AI idle-mix bait end (v361): one readable non-robot beat. When hold-guard
 * bait sees player recovery in pocket, rivalPunishCut (golpe if close) — clearer bait→punish,
 * not sit-on-S. When bait timer ends without a bite: occasional
 * feint-into-retreat (AI_BAIT_FEINT, FEINT_AI_CD gated, ~70ms readable tele then
 * startFeint + retreat) — show steel, pull, walk out. Else soft reset as before.
 * Not a feint robot / not another Space mash. Remainder path still Space on
 * harness Math.random=0.99. No rival parry. No 6th button. Frames / tipX /
 * plants / AI_*_CD locked.
 * Combo / meter HUD clarity leftover (v362): 2+ combo count used to sit as a flat
 * hueso glyph at fixed scale 2 with no birth pulse / brasa accent, so mid-exchange
 * connects read as a quiet stamp against the yard — not a readable hit chain.
 * Meter pip gain/full/spend flashes were similarly soft (1px grow, weak
 * brasa-vs-óxido contrast). Draw-only (drawComboCount / drawLifeBar). Birth scale
 * punch + brasa ghost under live hueso; stronger gain glow + óxido lip; full/spend
 * pulses keep distinct. comboK / meterGainK / meterFlashK punchCover envelopes kept.
 * COMBO_SHOW_MS 640 / METER_FLASH_MS 220 / METER_GAIN_MS 180 / fill rules locked.
 * destRect/AABB planted. No new combat verb. No new art.
 * Perfect-parry / riposte commit juice leftover (v363): Space/L spend in RIPOSTE_WIN
 * used to fire only sfx_riposte while the window hint died the same tick — feint /
 * reversal / holdCut already seat fleck+dust on commit, so the reward press read as
 * a quiet whoosh into a normal slash, not a committed riposte. Draw/SFX only (trySpendRiposteInput).
 * Soft plant dust + brief brasa chest fleck (RIPOSTE_FX); existing spend sting kept.
 * No shake / no hit bloom / no second whoosh on active.
 * RIPOSTE_WIN_MS 280 / PARRY_GLEAM_MS 80 / frames 130/140/280 / tipX / plants / pad locked.
 * No new combat verb.
 * Guard-break readability leftover (v364): tripGuardBreak used to fire the same
 * silver block asterisk as a chip hold-block (steelKind stayed "block"; push/tech
 * already distinct), so a 400ms guard shatter read as another quiet steel ping —
 * not a break. Draw/SFX only (tripGuardBreak / spawnSteelFlash / drawSteelFlash / drawLifeBar).
 * steelKind "break" = brasa spokes + pizarra ring; pitched bloqueo/
 * choque sting; soft plant dust; brief stam-bar brasa birth tick over the dead
 * dim. GUARD_BREAK_MS 400 / GUARD_BREAK_SETTLE 180 / STEEL_FLASH_MS 60 / tipX /
 * plants / pad / frames / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Link / clash-cancel Space/L juice leftover (v365): connected slash→golpe /
 * golpe→slash and clash late Space/L used to arm only the plant fade (linkPlantFade /
 * clashPlantFade) with no commit sting or grit — holdCut K already seats cast/whoosh
 * + dust, so the blade cancel read as a silent sheet swap, not a raise into the next
 * cut. Draw/SFX only (cancelIntoGolpe / cancelIntoSlash). Soft whoosh raise sting
 * (playLinkSting) + light plant dust. Distinct from holdCut cast bite, feint sheath,
 * reversal whoosh-up/choque, riposte spend, plant scrape. No fleck / no shake / no
 * frame retune. Clash-K / idle K / holdCut path unchanged. SLASH_CANCEL_MS /
 * GOLPE_CANCEL_MS / CLASH_RECOVERY / tipX / plants / pad / frames / RIPOSTE_WIN /
 * AI_CD locked. No new combat verb.
 * Tip under throw-startup→tech tipY leftover (v366): mid-tele throw→tech used to dump
 * tipY ~22px onto full windup the same tick landThrowTech latched tipK while tipX held
 * the raise×tele blend — tipY tipK biased block tipY, but you/rival block tipY matches
 * windup tipY (105/224), so tipK was a no-op on Y while live tipY was tele-only (idle
 * chest→windup). tip under throw-startup→tech v341 closed tipX; bar live used telegraph
 * off. Draw-only (bladeTipY / armHitInterruptFade). Latch tipKy = 1 − telegraphFade on
 * throw startup; ease tipY from idle-chest tipY with tipKy (mirror tip under telegraphFade
 * tipY). tipK tipX path / idle tech snap / tech-from-guard / tipX locks 991/0/884 / plants /
 * frames / pad locked. No new combat verb.
 * Tip under throwPlantFade tech-from-guard leftover (v367): Space+S tech from guarda used to
 * dump tip ~303px onto idle-edge the same tick THROW_TECH_REC ended — after techGuardPlantFade
 * / tipPlantK raise finished, techGuardTip still blocked throwPlantFade tip ease for the rest
 * of recovery, so tip sat on full windup while restThrow already faded idle, then hopped when
 * techRec cleared (poseBitmap idle). Same hole tip under throwPlantFade tech v354 closed for
 * idle tech. Draw-only (bladeTipX / bladeTipY). Keep tech-guard skip while tipPlantK raise is
 * live (phaseT < GUARD_RAISE_MS); once raise done, ease windup→idle-edge with throwPlantFade
 * even while techGuardTip latched. Live tgf still owns block→windup. Idle tech / tip under
 * throw-startup→tech tipY v366 / tipX locks 991/0/884 / plants / frames / pad locked. No new
 * combat verb.
 * Spent-super cast plant leftover (v368): spent-super plant puff used to hard-clear the same
 * tick spend-freeze punchCover died (v350 hold+clear), so the leftover ~140ms of BOLT_STARTUP
 * + bolt birth sat with no cast ember — empty K linear cast still rode through birth. Draw-only (update brasaFxT).
 * Hold cast through live punch; on cover die, resume linear drain of remaining
 * BOLT_CAST_FX_MS (do not zero). Hit/grab/block/clash still clear-on-die. Empty cast still linear
 * (no shake). BOLT_CAST_FX_MS 220 / BOLT_SUPER_STOP 60 / BOLT_SUPER_FX 1.55 / meter rules locked.
 * No new combat verb.
 * Mid-range bolt-CD leftover (v369): mid while boltCd > 0 used to force 100%
 * walk-in for the full BOLT_AI_CD — a robot approach, not a spacing read.
 * Soft mix: AI_MID_CD_PAUSE stands a beat (rollStandoff), AI_MID_CD_RETREAT
 * occasional backstep (prefer dart after), remainder short walk commit
 * (AI_MID_APPROACH_MS) then re-mix. Ready-band AI_MID_DART / AI_MID_WALK_PAUSE
 * unchanged (harness 0.99 still darts). Not a feint robot / not Space mash from
 * mid. BOLT_AI_CD 1800 / AI_MID_* / close mix / cancel doors locked. No new
 * combat verb.
 * Empty-K cast sibling leftover (v370): interrupted empty-K (and spent) plant
 * used to keep brasaFxKind cast through the foreign hit punchCover — cast sits in
 * brasaCoverHold, so leftover plant ember rode the stun freeze + slam instead of
 * dying with the cancelled knife. Spent-super own spend-freeze hold+resume (v368)
 * and empty linear birth path stay. Draw-only (armHitInterruptFade). Clear
 * caster-owned cast when hit/throw/tech interrupt dumps boltPhase. Hit spark
 * path unchanged. BOLT_CAST_FX_MS 220 / BOLT_SUPER_STOP 60 / meter rules locked.
 * No new combat verb.
 * Clash-K cancel grit leftover (v371): clash late K used to arm only clashPlantFade
 * + plain cast/knifeThrow (startBolt) with no boot plant — clash Space/L already seat
 * whoosh+dust (v365), holdCut K seats pitched cast+dust, so the clash→dart cancel
 * read as cast-only without the grit the other cancel doors got. Draw-only (cancelIntoBolt).
 * Soft plant dust 0.85 (match link/clash blade). Plain cast stays
 * (distinct from holdCut pitched sting / playLinkSting). Idle K unchanged.
 * CLASH_RECOVERY / BOLT_CANCEL_MS / tipX / plants / pad / frames / RIPOSTE_WIN /
 * AI_CD locked. No new combat verb.
 * Cornered broken leftover (v372): broken (stam < STAMINA_START_MIN / guardBreakT)
 * while !roomBack and out of punish reach used to return idle — a statue on the
 * wall. Comment said do not statue; open mid walks out; close punishes. Walk in
 * toward measure so a recovery punish can still land. Not a dart robot / not
 * Space mash. BOLT_AI_CD 1800 / AI_MID_* / close mix / cancel doors / tipX /
 * plants / pad / frames / RIPOSTE_WIN locked. No new combat verb.
 * Cornered post-reset dart leftover (v373): after block/whiff reset while
 * !roomBack, rivalDoPostReset's final rivalTryDartNow had no range gate — mid
 * dart mix needs dist > HOLD+16 / post-reset mid band needs HOLD+8, but the
 * cornered fallthrough fired point-blank from pocket (a fireball robot when
 * retreat was impossible). Gate the final dart on dist > HOLD+8; cornered close
 * returns false so close mix (golpe/slash/bait) owns the pocket. Open-room
 * retreat + mid dart bands unchanged. AI_POST_RESET 0.55 / AI_RESET_MS 900 /
 * BOLT_AI_CD 1800 / AI_MID_* / tipX / plants / pad / frames / RIPOSTE_WIN locked.
 * No new combat verb.
 * Cornered mid bolt-CD leftover (v374): mid while boltCd > 0 and !roomBack used
 * to convert AI_MID_CD_RETREAT rolls into approach — pinned mid-CD stayed a
 * walk-in robot (open soft-mix retreat cannot fire). Soft: stand a beat
 * (rollStandoff) when the retreat band hits with no roomBack; remainder still
 * short walk commit. Open-room retreat + ready-band AI_MID_DART / pause
 * unchanged (harness 0.99 still darts). Not a feint robot / not Space mash.
 * BOLT_AI_CD 1800 / AI_MID_* / close mix / cancel doors / tipX / plants / pad /
 * frames / RIPOSTE_WIN locked. No new combat verb.
 * Post-reset spent-dart mid ready leftover (v375): after rivalDoPostReset's
 * mid dart cleared boltArmed, BOLT_AI_CD expiry left mid on the CD soft-mix
 * (pause / retreat / approach) forever — ready-band AI_MID_DART never returned
 * until pocket touch or a retreat re-arm. A spacing robot that forgot it had
 * cooled. Re-arm boltArmed when boltCd decays to 0 so the ready band returns
 * after the spent lockout. Opening still starts unarmed (no dart before HOLD).
 * CD soft-mix while boltCd > 0 / cornered mid-CD stand / HOLD-arm / tipX /
 * plants / pad / frames / RIPOSTE_WIN locked. No new combat verb.
 * Pushblock walk-stop grit leftover (v376): dropBlockPlantUnderShove used to
 * cull only landBlock's power-1.0 unshifted plant, so walk-stop 0.8 / stampNow
 * 1.3 / feint 0.9 grit rode the boot beside the live PUSHBLOCK_FX trail —
 * same hole knock already closed for unmarked walk stamps. Draw-only
 * (dropBlockPlantUnderShove). Cull all non-shove stamps for the shoving
 * fighter — including punch-marked landBlock 1.0 (knock keeps punch-marked
 * connect; shove must own the boot). Specks still fly. Shove trail stays.
 * landBlock 1.0 skip / PUSHBLOCK_FX 1.85 / 240px / 25 stam / tipX / plants /
 * pad / frames locked. No new combat verb.
 * Guard-break plant grit leftover (v377): tripGuardBreak used to stamp 1.25 on
 * top of landBlock's 1.0 / landParry's 1.05 / landBoltBlock's 1.0 / leftover
 * walk-stop grit, so chip plant rode under the shatter — same hole knock /
 * clash / pushblock already closed. Pushblock-trip stacked 1.25 beside the
 * live PUSHBLOCK_FX trail. Draw-only (dropPlantUnderBreak). Cull all non-shove
 * stamps for the breaking fighter before the 1.25 plant; skip landBlock /
 * landParry small plant when break owns; skip 1.25 when shove already owns
 * (pushT). Specks still fly. Shove trails stay. GUARD_BREAK_MS 400 / steel
 * break / tipX / plants / pad / frames locked. No new combat verb.
 * Stamina chunk spend leftover (v378): pushblock −25 / bolt −30 / reversal −30 /
 * block−chip −20 used to dump the óxido stam bar with no ghost flash, while HP
 * already ghosts+flashes on hit and break already pulses the dead well — a silent
 * chunk, not a readable spend. Draw-only (pulseStam / stamFlashK / drawLifeBar /
 * tickHudBar). Arm stamGhost + stamFlashT on those chunk spends; ease ghost over
 * HUD_FLASH_MS (hold through live punchCover like hudFlash). Hold-drain still
 * live shrink (no pulse spam). Break birth pulse unchanged. tipX / plants / pad /
 * frames / PUSHBLOCK_STAM 25 / BOLT_STAM 30 / REVERSAL_STAM 30 / STAMINA_BLOCK 20
 * locked. No new combat verb.
 * Teach / CONTROLES clarity leftover (v379): remap-aware teach claimed BIND_ACTIONS
 * labels, but PARRY still hard-coded "S AL FILO" (and OVER tips hard-coded S/K/L)
 * while AGARRE/REV already followed the remapped guard — so a remapped guarda
 * taught the wrong parry key. CONTROLES EMPUJON said AWAY (EN) and the pad chord
 * line read GUARDA+TAJO / GOLPE, so pushblock + pad agarre/rev stayed unread.
 * Draw-only (controlsHintLines / overTips / drawTitleCard controls / drawOverPrompt).
 * Guard label owns AL FILO; OVER tips use codeLabel; ATRAS for EMPUJON; pad spells
 * GUARDA+TAJO AGARRE + GUARDA+GOLPE REV. Keyboard chords / two-line teach / tipX /
 * plants / frames / pad 2×2 / RIPOSTE_WIN locked. No new combat verb.
 * Special-cancel K holdCut juice leftover (v380): connected Space/L→K still layered a
 * plain unpitched cast from startBolt under the pitched holdCut sting (knifeThrow already skipped),
 * and playHoldCutSting had only one soft whoosh — so cut→dart read muddier / weaker than link Space/L's
 * clean double-whoosh raise (v365). Draw/SFX only (startBolt / playHoldCutSting). Skip plain cast
 * when holdingCutBolt so the pitched sting owns the bite; layer a second raise whoosh
 * (rate 1.12 / vol 0.42) mirroring playLinkSting. Cast puff + dust 0.95 kept. Clash-K / idle K /
 * link path unchanged. BOLT_CANCEL_MS / frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked.
 * No new combat verb.
 * Hit-confirm / late-recovery cancel teach cue leftover (v381): connected last-100ms
 * cancel doors (tajo→golpe / golpe→tajo / cut→K) and clash late Space/L/K used to open
 * with no draw teach — only RIPOSTE_WIN had a live remap cue (v360), so hit-confirm /
 * late-recovery / clash-cancel windows stayed unread until the sting fired. Draw-only (drawCancelHint).
 * Soft tip-side pulse + remap-aware labels while any cancel window is
 * live; Clash-K listed first so dart priority reads. Riposte hint still owns its window.
 * Whiff silent. SLASH/GOLPE/BOLT_CANCEL_MS 100 / CLASH_RECOVERY / frames / tipX / plants /
 * pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Clash-K cancel priority leftover (v382): same-frame Space/L + K on clash late
 * used to let Space/L steal the dart door (attackEdge/golpeEdge flush before boltEdge;
 * buffered Space/L flush before boltBuf) while rival AI already yields linkBolt over
 * clash Space/L — teach listed K first (v381) but the player door lied. Yield Space/L
 * cancel edges + buffer flush when clashRec + K armed + cutToBoltWindow. Last-press-wins
 * still; non-clash hit-confirm Space/L→K order unchanged. CLASH_RECOVERY / BOLT_CANCEL_MS /
 * frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Hit-confirm special-cancel K priority leftover (v383): same-frame Space/L + K on
 * connected late recovery used to let Space/L steal the dart door (attackEdge/golpeEdge
 * before boltEdge; buffered Space/L flush before boltBuf) while clash late already yields
 * to K (v382) — SF special-cancel lost to the normal cancel on hit-confirm. Yield Space/L
 * cancel edges + buffer flush when !clashRec + cutHit door + K armed + cutToBoltWindow.
 * Clash path still playerClashBoltPriority (v382). Whiff silent. Space/L alone unchanged.
 * SLASH/GOLPE/BOLT_CANCEL_MS / frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked.
 * No new combat verb.
 * Cancel / combo HUD clarity leftover (v384): 2+ combo stamp used to stack on the same
 * chest x as the live cancel teach (~10px) during hit-confirm / clash late doors, so the
 * actionable cancel cue and the combo count muddied each other — riposte already owns
 * cancel (v381), but combo never yielded to the cancel window. Draw-only (drawComboCount).
 * Cancel window owns the silhouette while any cancel door is live; comboT still ages;
 * rival combo unchanged; riposte still owns cancel. Whiff silent. COMBO_SHOW_MS 640 /
 * SLASH/GOLPE/BOLT_CANCEL_MS / frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked.
 * No new combat verb.
 * Hit-confirm cancel teach K-first leftover (v385): non-clash cancel teach listed
 * Space/L before K while hit-confirm same-frame already yields to special-cancel K
 * (v383) — teach lied the same way clash teach lied before Clash-K-first (v381/v382).
 * Draw-only (drawCancelHint). List K first whenever the cut→K door is live
 * (hit-confirm + clash); Space/L-only doors unchanged; riposte still owns cancel;
 * combo yield (v384) unchanged. Whiff silent. SLASH/GOLPE/BOLT_CANCEL_MS /
 * frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Cancel-resolve combo HUD leftover (v386): after taking a cancel door, the 2+ combo
 * stamp used to pop back at birth scale over the live link/clash/holdCut plant raise
 * (~GUARD_RAISE_MS) the same tick the cancel teach vanished — v384 yielded only while
 * the cancel window was open, so cancel juice and the combo count muddied each other
 * on resolve. Draw-only (drawComboCount). Also yield the player combo stamp while
 * linkPlantFade / clashPlantFade / holdCutFade > 0; comboT still ages; rival unchanged;
 * cancel teach / riposte / K-first (v385) / window yield (v384) kept. Whiff silent.
 * COMBO_SHOW_MS 640 / SLASH/GOLPE/BOLT_CANCEL_MS / GUARD_RAISE_MS / frames / tipX /
 * plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Special-cancel teach K brasa leftover (v387): cancel teach joined K/Space/L into one
 * hueso label, so special-cancel K read as a normal cancel — SF dart door unread as
 * special while Space/L stayed bone. Draw-only (drawCancelHint). Paint the leading K
 * glyph COL_BRASA when cut→K is live (hit-confirm + clash); Space/L stay COL_HUESO;
 * "/" separators hueso; K-first order (v385) / Clash-K first / riposte own / combo
 * yields (v384/v386) kept. Whiff silent. Space/L-only doors unchanged. SLASH/GOLPE/
 * BOLT_CANCEL_MS / frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new
 * combat verb.
 * Cancel-resolve combo birth leftover (v388): after taking a cancel door, v386 yielded the
 * 2+ combo stamp only while linkPlantFade / clashPlantFade / holdCutFade > 0 (~GUARD_RAISE_MS),
 * then the stamp re-popped at birth scale 3 over the live cancel startup — planting flags stay
 * true through full startup, but fade dies first, so cancel juice and the combo birth muddied
 * each other past the plant raise. Draw-only (drawComboCount). Also yield while
 * linkPlanting / clashPlanting / holdCutPlanting; fade yield (v386) kept; comboT still ages;
 * rival unchanged; cancel teach / riposte / K-first (v385) / window yield (v384) / K brasa (v387)
 * kept. Whiff silent. COMBO_SHOW_MS 640 / GUARD_RAISE_MS / SLASH/GOLPE/BOLT_CANCEL_MS / frames /
 * tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Throw-tech window readability leftover (v389): rival throw startup used to open
 * with no draw teach — only RIPOSTE_WIN (v360) and cancel doors (v381) had live
 * remap cues, so the Space+S tech door stayed unread until the sting fired.
 * Draw-only (drawThrowTechHint). Soft defender pulse + remap-aware slash+guard
 * chord while throwTechWindow(rival) && in-range && player can tech. Riposte still
 * owns its window; cancel teach yields to tech. Out-of-range / active-mash / KD
 * silent. THROW_TECH_MS 80 / THROW_STARTUP 80 / THROW_TECH_REC 160 / THROW_RANGE
 * 120 / frames / tipX / plants / pad locked. No new combat verb.
 * Reversal window readability leftover (v390): meaty Space/L vs hold-guard used to
 * open with no draw teach — only RIPOSTE_WIN (v360), cancel doors (v381), and
 * throw-tech (v389) had live remap cues, so the guard+golpe REV door stayed unread
 * until the sting fired. Draw-only (drawReversalHint). Soft defender pulse +
 * remap-aware guard+golpe chord while meatyMeleeAtPlayerGuard && stam can pay.
 * Riposte / throw-tech still own; cancel + combo yield. No-meaty / broke / KD
 * silent. REVERSAL_STAM 30 / REVERSAL_INVULN / L frames / tipX / plants / pad /
 * THROW_TECH / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Throw commit juice leftover (v391): Space+S / idle throw used to arm only the
 * windup sheet with no commit sting or grit — feint / reversal / riposte / holdCut /
 * link already seat fleck+dust or whoosh+dust on press, so the grab press read as a
 * quiet windup into clinch, not a committed throw. Draw/SFX only (startThrow). Soft
 * clinch whoosh sting (playThrowCommitSting) + light plant dust. Distinct from
 * grab-connect impacto (landThrow), tech choque, slash whoosh, feint sheath,
 * reversal whoosh-up/choque, link raise, holdCut cast. No fleck / no shake / no
 * frame retune. Active still plants 1.05 (no whoosh). Connect / tech juice kept.
 * THROW_STARTUP 80 / THROW_ACTIVE 40 / THROW_RECOVERY 220 / THROW_TECH /
 * THROW_RANGE 120 / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Especial stock ready linger leftover (v392): full meter after stock-complete flash
 * used to sit as quiet solid brasa with no remap teach — only cancel doors showed K
 * (v381/v387) while the stock was live, so idle full-stock especial stayed unread
 * until the spend sting. Draw-only (drawEspecialHint / drawLifeBar). Soft tip-pip
 * brasa/hueso breath while quiet full (mf dead; stock-complete flash + spend bite
 * still own mf). Remap-aware K glyph by the player meter while meterFull && idle-
 * capable. Riposte / throw-tech / reversal / cancel teach still own; empty / spend /
 * boltPhase / KD silent. Rival breath only (no teach). METER_FLASH_MS 220 /
 * METER_GAIN_MS 180 / fill rules / BOLT frames / tipX / plants / pad / RIPOSTE_WIN /
 * AI_CD locked. No new combat verb.
 * Especial connect juice leftover (v393): spent dart land (you + rival) already
 * pitched brasa impacto/bloqueo + BOLT_SUPER_FX 1.55 puff, but camera punch /
 * boot grit / floating −N still matched empty-dart 10 / 1.15 / hit-hueso — so
 * the −28 round-closer read as a soft −10. Feel micro (landBoltHit / landBoltBlock / drawDmgNums).
 * BOLT_SUPER_HIT_SHAKE 12 (riposte peak; empty stays 10). BOLT_SUPER_BLOCK_SHAKE 6
 * (between chip-block 4 and pushblock 8; empty stays 4). Spent hit grit 1.45.
 * −N kind "super" brasa scale 5. HITSTOP / meter / BOLT_SUPER_FX 1.55 / spend-freeze
 * mag 10 / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Feint window readability leftover (v394): Space slash startup used to open
 * with no draw teach — only RIPOSTE_WIN (v360), cancel doors (v381), throw-tech
 * (v389), reversal (v390), and especial ready (v392) had live remap cues, so the
 * tap-guarda FINTA door stayed unread until the sheath sting. Draw-only (drawFeintHint).
 * Soft attacker pulse + remap-aware guard glyph while canFeint(player). Riposte /
 * throw-tech / reversal / cancel still own; golpe / active / KD silent.
 * FEINT_RECOVERY 100 / Space startup 180 / tipX / plants / pad / RIPOSTE_WIN /
 * AI_CD locked. No new combat verb.
 * Dart recovery punish leftover (v395): after a player K dart resolved (block /
 * hit / whiff-clear), boltPhase recovery still ran BOLT_RECOVERY 280 /
 * BOLT_SUPER_RECOVERY 380 with phase idle — so tickAI only punished Space/L
 * phase===recovery and fell through to idle standoff while the caster was
 * stuck recovering. Live you-dart still freezes AI via boltIncoming. Soft:
 * same punish/close as melee recovery when boltPhase===recovery && !live
 * you-dart. BOLT_AI_CD / AI_MID_* / harness 0.99 / tipX / plants / pad /
 * RIPOSTE_WIN / frames locked. No new combat verb.
 * Dart recovery punish early-path leftover (v396): v395 closed idle-standoff
 * fall-through for boltPhase recovery, but bait→punish and broken stam still
 * keyed only on phase===recovery — so AI sat on S through resolved-K recovery
 * (bait) or walked out when in reach (broken roomBack before the close
 * punish). Soft: same dartRecPunish gate on those early returns. Live you-dart
 * freeze / main punish/close / BOLT_AI_CD / AI_MID_* / harness 0.99 / tipX /
 * plants / pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Recovery punish retreat early-path leftover (v397): soft retreat (aiRetreatT)
 * still walked out through Space/L phase===recovery and resolved-K boltPhase
 * recovery even in reach — retreat 220–480 often outlasts RECOVERY 280 /
 * BOLT_RECOVERY 280, so the free window burned and AI never punished. Soft:
 * abort retreat when recovery || dartRecPunish so main punish/close owns the
 * window (same gate family as v396 bait/broken). Live you-dart freeze / bait /
 * broken / main punish / BOLT_AI_CD / AI_MID_* / harness 0.99 / tipX / plants /
 * pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Feint recovery punish leftover (v398): Space slash feint pulls to phase idle
 * with feintT FEINT_RECOVERY 100 — locked (no Space/L/K/throw) while tickAI only
 * punished phase===recovery / dartRecPunish, so soft retreat walked out, bait
 * sat on S, and pocket too-close walked away through the free window (Space/L
 * recovery already punished the same spacing). Soft: hoist feintRecPunish
 * (feintT > 0) onto the same bait / retreat-abort / broken / main punish/close
 * gates. Live you-dart freeze / dartRecPunish / Space recovery / soft retreat
 * without feint kept. FEINT_RECOVERY 100 / BOLT_AI_CD / AI_MID_* / harness 0.99 /
 * tipX / plants / pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Guard-break punish leftover (v399): tripGuardBreak leaves phase idle with
 * guardBreakT GUARD_BREAK_MS 400 (cannot re-raise) while tickAI only punished
 * phase===recovery / dartRecPunish / feintRecPunish — soft retreat walked out,
 * bait sat on S, broken walked out, and pocket too-close walked away through
 * the free window (Space/L recovery already punished the same spacing). Soft:
 * hoist guardBreakPunish (guardBreakT > 0) onto the same bait / retreat-abort /
 * broken / main punish/close gates. Live you-dart freeze / dartRecPunish /
 * feintRecPunish / Space recovery / soft retreat without break kept.
 * GUARD_BREAK_MS 400 / BOLT_AI_CD / AI_MID_* / harness 0.99 / tipX / plants /
 * pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Hitstun meaty leftover (v400): tickAI used to return through player.stunT > 0,
 * so after a connect the frame-advantage seat burned into standoff — never a
 * meaty (Space/L / dart / feint / guardBreak recovery free-window family already
 * closed; standing hitstun was a hard freeze). Soft: when stunT > 0 && thrownT
 * <= 0, same punish/close as recovery (rivalPunishCut / walk-in). Throw KD
 * (thrownT) / falling still freeze — wakeup owns getup. HITSTUN 350 /
 * GOLPE_STARTUP 120 / Space startup 180 / BOLT_AI_CD / AI_MID_* / harness 0.99 /
 * tipX / plants / pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Wakeup meaty leftover (v401): after throw KD, thrownT freeze correctly
 * yields getup to wakeup-rev, but once throwInvuln armed tickAI fell through
 * to idle standoff (400–800ms) — never a meaty into the 80ms invuln, so the
 * meaty-vs-wakeup-rev mixup never opened (standing stun meaty v400 already
 * closed; getup was still a free walk). Soft: while wakeupWindow(player),
 * same punish/close as hitstun meaty (start during invuln so active lands
 * after). Throw KD / falling still freeze. THROW_WAKE_INVULN 80 / HITSTUN 350 /
 * GOLPE_STARTUP 120 / Space startup 180 / BOLT_AI_CD / AI_MID_* / harness 0.99 /
 * tipX / plants / pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Riposte window respect leftover (v402): after perfect-parry stagger ended,
 * too-close / leftover idle-commit used to mash into live RIPOSTE_WIN (player
 * reward unread as a threat — pocket follow-up ate the remaining ~100ms after
 * PARRY_STAGGER). Soft: while player.riposteWindowT > 0, freeze (no punish-cut
 * / idle commit / closing). Stagger still locks via rivalCanAct. Player riposte
 * startup already freezes via playerSwinging. RIPOSTE_WIN 280 / PARRY_STAGGER
 * 180 / frames 130/140/280 / tipX / plants / pad / AI_CD locked. No new combat verb.
 * Throw-recovery K buffer fairness leftover (v403): buffered K during throw
 * recovery (no cut→K cancel door) used to die the tick recovery popped idle
 * (boltBuf hard-clear) while buffered Space/L at the same clinch fired via the
 * idle hold-gate flush — so a meaty dart after agarre was stricter than a meaty
 * tajo/golpe, and worse than pressing K on the idle frame (boltEdge already
 * startBolt). Soft: idle boltBuf flush mirrors Space/L hold-gate — fire
 * startBolt when bodyGap <= blade+lunge+2 && canStartBolt; else clear (keeps
 * whiff-fullscreen "not a free dart" lock). Cancel-window / clash-K /
 * hit-confirm K priority unchanged. BOLT_CANCEL_MS / THROW_RECOVERY 220 /
 * THROW_KD / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Hitstun K buffer fairness leftover (v404): buffered K during standing hitstun
 * used to die the same idle tick (boltBuf else-if hard-clear while phase stays
 * idle through stunT) while buffered Space/L at the same flesh wait for stun
 * exit via the idle hold-gate flush — so a meaty dart after chip/flesh was
 * stricter than a meaty tajo/golpe, and worse than pressing K on the first free
 * frame (boltEdge already startBolt). Soft: idle boltBuf else-clear skips while
 * stunT > 0; on stun exit the v403 hold-gate fires startBolt when bodyGap <=
 * blade+lunge+2 && canStartBolt, else clears (whiff-fullscreen not a free dart).
 * Throw-recovery flush / cancel doors / clash-K / hit-confirm K / AI hitstun
 * meaty unchanged. HITSTUN 350 / HITSTOP_HIT 140 / tipX / plants / pad /
 * RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Dart-recovery Space/L buffer fairness leftover (v405): buffered Space/L during
 * own dart (boltPhase; phase stays idle through plant/flight/recovery) used to
 * die the same idle tick — slashBuf/golpeBuf hold-gate cleared + startAttack
 * while startAttack no-ops on boltPhase — so a meaty tajo/golpe after K was
 * eaten mid-dart, stricter than throwBuf (already !boltPhase) and worse than
 * pressing Space/L on the first free frame (attackEdge already startAttack).
 * Soft: idle Space/L hold-gate skips while boltPhase; on bolt end the existing
 * hold-gate fires when bodyGap <= blade+lunge+2 (golpe: +GOLPE_LUNGE). Out of
 * range still waits (not a free whiff). Cancel doors / clash-K / hit-confirm /
 * v403–404 K fairness / AI dartRec punish unchanged. BOLT plant/recovery /
 * tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Player pushblock connect leftover (v406): hold-S tap-away during rival startup
 * (or same-frame as connect) used to arm the 240px shove + óxido / PUSHBLOCK_SHAKE 8
 * / pushblock sting, then landBlock applyPush + bumpShake(4) + block steel +
 * bloqueo + 1.0 plant clobbered it — so a spent 25-stam PB read as a normal chip
 * block and lost the scrape. Header already said landBlock must not overwrite a
 * live shove; rival already re-arms via rivalPushblockOnBlock after applyPush.
 * Soft: when shove already owns (|pushVel|·GUARD_PUSH_MS ≈ PUSHBLOCK_PX), keep
 * pushVel, refresh pushT + PUSHBLOCK_SHAKE + óxido steel, skip bloqueo / 1.0
 * plant. Stam chip / HITSTOP_BLOCK / tripGuardBreak / rival path unchanged.
 * PUSHBLOCK 240/25/1.85 / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked.
 * No new combat verb.
 * Player pushblock dart-connect leftover (v407): hold-S tap-away vs rival K dart
 * (startup or live bolt) used to arm the 240px shove + óxido / PUSHBLOCK_SHAKE 8
 * / pushblock sting, then landBoltBlock applyPush + bumpShake(4) + brasa block +
 * 1.0 plant clobbered it — spent 25-stam PB vs dart read as a normal chip block
 * and lost the scrape. Same hole landBlock already closed (v406). Soft: when
 * shove already owns (|pushVel|·GUARD_PUSH_MS ≈ PUSHBLOCK_PX), keep pushVel,
 * refresh pushT + PUSHBLOCK_SHAKE + óxido steel, skip bolt-block sting / brasa
 * block / 1.0 plant. Chip HP / stam / HITSTOP_BLOCK / tripGuardBreak unchanged.
 * Rival still does not pushblock vs dart. PUSHBLOCK 240/25/1.85 / tipX / plants /
 * pad / RIPOSTE_WIN / AI_CD / BOLT chip locked. No new combat verb.
 * Tick-throw buffer fairness leftover (v408): buffered throw during your recovery
 * (or idle flush) used to die the same tick phase popped idle while the foe was
 * still throwLocked (stunT / thrownT / throwInvuln) — throwBuf cleared then
 * startThrow no-op'd — so a tick throw after a confirming cut / meaty grab on
 * stun-exit or wakeup was stricter than pressing Space+S on the free frame, and
 * worse than slashBuf/golpeBuf (only clear when they fire). Soft: idle throwBuf
 * flush holds while throwLocked(foe); tryThrowTech still spends immediately;
 * unlocked foe still startThrow (whiff-fullscreen unchanged). v403–405 K/Space/L
 * fairness / pushblock connect / AI meaty / tipX / plants / pad / RIPOSTE_WIN /
 * THROW_TECH / frames locked. No new combat verb.
 * Guard-break action lock leftover (v409): tripGuardBreak leaves phase idle with
 * guardBreakT GUARD_BREAK_MS 400 (cannot re-raise) while tickAI already punishes
 * (v399), but Space/L/throw still armed — feintT already locks startAttack /
 * startThrow / edge locked / idle flush; canStartBolt already refuses
 * guardBreakT — so a mash stole the free window (AI punish traded into a
 * contested startup). Soft: treat guardBreakT like feintT on edge locked +
 * startAttack/startThrow refuse; idle Space/L/K/throw/openBuf flush holds
 * through guardBreakT (mirror feintT). K edge also locks so the press is not
 * eaten. Live AI GB punish / feint lock / canStartBolt refuse kept.
 * GUARD_BREAK_MS 400 / FEINT_RECOVERY 100 / tipX / plants / pad / RIPOSTE_WIN /
 * AI_CD / frames locked. No new combat verb.
 * Rematch patio contrast leftover (v410): KeyR during KO falling used to
 * resetRound while mode was still "falling", so rotateYardForContrast
 * (gated on over only) never ran — consecutive bouts repeated the same
 * patio after skip-crumple R. Space/R from over already rotated +1.
 * Soft: rotate on falling too (crumple live = rematch after KO). Mid-play
 * KeyR stays practice restart (no rotate). Escenarios sticky on title→JUGAR
 * unchanged. tipX / plants / pad / RIPOSTE_WIN / frames locked. No new combat verb.
 * Winner K finish leftover (v411): killing dart left winner boltPhase
 * recovery frozen through falling/over — finishWinnerCut only advanced
 * melee phase (Space/L/throw recovery + sheathe already ran), so the knife
 * plant sat locked for the whole crumple while a finished cut sheathed.
 * Soft: advanceBoltFighter(win) on recovery so empty/spent 280/380 completes
 * then sheathes (holdCut) like a finished cut; undelivered startup cancels
 * without birthing a dart into the crumple (beginFall already nulls bolt).
 * Loser bolt still snaps via falling gate. Live projectile still dies at
 * beginFall. tipX / plants / pad / BOLT_* / BOLT_SUPER_RECOVERY 380 / meter
 * / frames locked. No new combat verb.
 * Dart vs dart leftover (v412): second K birth used to overwrite the one live
 * opposing dart (silent delete) — empty could even erase a spent super. Soft:
 * equal → mutual cancel (clash FX, no birth); spent beats empty (eat + birth);
 * empty into spent → no birth (spent keeps flying). One live dart kept.
 * tipX / plants / pad / BOLT_* / meter / frames / AI_CD locked. No new button.
 * Mutual throw leftover (v413): both active throws same frame used to resolve
 * player→rival first — P1 always won the grab (asymmetric), never a tech/trade.
 * Soft: same-frame both-active throw in range → landThrowTech (existing
 * throw-break juice / THROW_TECH_REC 160). One-sided throw / active-strike-beats-
 * throw / throwLocked / startup mash-tech unchanged. tipX / plants / pad /
 * THROW_* frames / THROW_TECH / AI_CD locked. No new combat verb.
 * Empty dart vs meaty steel leftover (v414): same-frame empty dart on Space/L
 * steel used to lose to cuts-first — landHit/landBlock snapped the striker to
 * recovery so resolveBolt never saw steel, and the dart kept flying (silent
 * survive), never the locked empty-vs-steel clash 0. Soft: clash empty dart on
 * that steel before the cut lands (mirror spentSuperBeatsCut gate; spent super
 * still beats the cut). Resolve order / empty clash juice / tipX / plants /
 * BOLT_* / meter / frames locked. No new combat verb.
 * Winner feint finish leftover (v415): killing dart after a post-recovery feint
 * left winner feintT frozen through falling/over — finishWinnerCut advanced
 * melee phase + bolt recovery + sheathe (v411) but never tickFeint, so the
 * 100ms pull sat locked for the whole crumple while a finished cut sheathed.
 * Soft: tickFeint(win) so FEINT_RECOVERY completes then eases (feintFade) like
 * a finished cut. Natural: empty dart KO ~50ms after bolt recovery while the
 * follow-up feint pull is still live. Winner bolt finish (v411) kept.
 * FEINT_RECOVERY 100 / tipX / plants / pad / BOLT_* / meter / frames locked.
 * No new combat verb.
 * Winner push finish leftover (v416): live pushblock / clash shove on the
 * winner used to freeze through falling/over — finishWinnerCut advanced
 * melee + bolt recovery + sheathe + feint (v411/v415) but never drained
 * pushT, so a 240px PB shove (or clash bounce) sat locked for the whole
 * crumple while the loser already zeroed push in beginFall. Soft: slide +
 * drain win.pushT (mirror play) then clamp. Natural: PB then killing dart
 * while shove still live. Winner feint/bolt finish kept. PUSHBLOCK_PX 240 /
 * GUARD_PUSH_MS 150 / tipX / plants / pad / frames locked. No new combat verb.
 * KO Esc→title handoff leftover (v417): Escape during falling/over used to
 * no-op (only play called goTitleFromPlay), so crumple + REVANCHA trapped you
 * with Space/R rematch only — no title exit from the KO handoff. Soft: Esc on
 * falling/over also goTitleFromPlay (same as mid-play). Space/R rematch kept.
 * Mid-play Esc unchanged. tipX / plants / pad / frames / AI_CD locked. No new
 * combat verb.
 * Winner riposte finish leftover (v418): perfect-parry riposte window live on the
 * winner (NATURAL: parry then already-flying dart KOs the staggered rival) used
 * to freeze through falling/over — finishWinnerCut advanced melee + bolt +
 * sheathe + feint + push (v411/v415/v416) but never tickRiposte, so RIPOSTE_WIN
 * pad gleam sat locked for the whole crumple while play already drains under
 * hitstop. Soft: tickRiposte(win) + syncRipostePad so the window completes and
 * zone-S clears (mirror tickFeint). Winner push/feint/bolt finish kept.
 * RIPOSTE_WIN_MS 280 / tipX / plants / pad / frames locked. No new combat verb.
 * Dart-recovery K buffer fairness leftover (v419): buffered K during own dart
 * (boltPhase; phase stays idle through plant/flight/recovery) used to die the
 * same idle tick — boltBuf else-if hard-clear while Space/L already skip
 * hold-gate through boltPhase (v405) — so a meaty follow-up dart after K was
 * eaten mid-recovery, worse than pressing K on the first free frame
 * (boltEdge already startBolt). Soft: idle boltBuf else-clear skips while
 * boltPhase; on bolt end the existing hold-gate fires when bodyGap <=
 * blade+lunge+2 && canStartBolt. Out of range still clears (whiff-fullscreen
 * not a free dart). v403–405 K/Space/L fairness / cancel doors / AI dartRec
 * punish unchanged. BOLT plant/recovery / tipX / plants / pad / RIPOSTE_WIN /
 * AI_CD locked. No new combat verb.
 * Wakeup reversal window readability leftover (v420): meaty Space/L on getup
 * used to open with no draw teach — only hold-guard REV (v390) had a live remap
 * cue, so the tap-golpe wakeRev door stayed unread until the sting fired while
 * AI already meaties into the 80ms invuln (v401). Draw-only (drawWakeReversalHint).
 * Soft rising pulse + remap-aware golpe while meatyMeleeAtPlayerWake && stam can
 * pay. Riposte / throw-tech / hold-guard REV still own; cancel + combo yield.
 * Guarding / no-meaty / broke / KD silent. REVERSAL_STAM 30 / THROW_WAKE_INVULN 80 /
 * L frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Pushblock window readability leftover (v421): meaty Space/L vs hold-guard used to
 * open with only REV teach (v390) — EMPUJON (guard+away, PUSHBLOCK_STAM 25) stayed unread
 * in-round (CONTROLES alone listed it), so the safer 240px escape on the same meaty door
 * was invisible until the sting. Draw-only (drawPushblockHint). Soft away-side pulse +
 * remap-aware away key while meatyMeleeAtPlayerGuard && stam can pay PB. Riposte /
 * throw-tech still own; hold-guard REV keeps chest (coexist). Cancel / feint / especial /
 * combo yield. No-meaty / broke / KD / already shoving silent. PUSHBLOCK_STAM 25 /
 * PUSHBLOCK_PX 240 / tipX / plants / pad / RIPOSTE_WIN / REVERSAL_STAM / AI_CD locked.
 * No new combat verb.
 * Parry window readability leftover (v422): meaty Space/L vs open (not hold-guard) used to
 * open with no draw teach — only hold-guard REV (v390) / PB (v421) had live remap cues on
 * meaty, so the rising-S PARRY door (PARRY_WIN 140) stayed unread until the gleam fired
 * (CONTROLES alone listed S al filo). Draw-only (drawParryHint). Soft tip-side filo pulse +
 * remap-aware guard key while meatyMeleeAtPlayerOpen && can raise. Riposte / throw-tech /
 * wake REV still own; hold-guard meaty stays REV/PB. Cancel / feint / especial / combo yield.
 * Guarding / no-meaty / broke / KD / busy silent. PARRY_WIN 140 / PARRY_STAGGER 180 /
 * PARRY_GLEAM 80 / RIPOSTE_WIN 280 / tipX / plants / pad / AI_CD locked. No new combat verb.
 * Special-cancel combo counter leftover (v424): connected Space→K (empty or spent)
 * used to drop the 2+ combo stamp back to a silent 1 — Space recovery 280 + late
 * cancel window leaves ~167ms hitstun, BOLT_STARTUP 200 eats it before the dart
 * lands, so noteCombo saw stunT 0 and restarted the count. Golpe→K still chained
 * (shorter L recovery). Soft: arm comboBolt on holdCut special-cancel while the
 * foe is still in hitstun/KD; noteCombo treats that as a chain then clears it.
 * Clash-K / idle K unchanged. HITSTUN 350 / Space 180/140/280 / K 200/280 /
 * cancel doors / tipX / plants / pad locked. No new combat verb.
 * Especial quiet-full gain leftover (v425): connects / blocked specials while
 * already at METER_MAX used to re-arm meterGainT over quiet-full breath (mf
 * dead after stock-complete), so the ready pip kept pulsing as a charging tick
 * — muddy vs v392 linger / drawEspecialHint. Soft: gainMeter skips the gain
 * pulse when was already full; stock-complete flash + partial fills + spend
 * bite unchanged. METER_GAIN_MS 180 / METER_FLASH_MS 220 / fill rules /
 * BOLT frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
 * Opening K open-mix leftover (v426): K during OPENING_MS used to refuse with no
 * buffer while Space openBuf / L golpeBuf already held through the measure and
 * fired on walk-in — and same-frame Space/L+K cleared those buffers then refused
 * K, so both opens died. Soft: openBoltBuf mirrors openBuf (arm on boltEdge
 * while openLeft > 0; flush after open with hold-gate + canStartBolt; persist
 * out of range for walk-in). Mid-combat boltBuf else-clear / whiff-fullscreen
 * refuse kept. Opening still will not plant mid-measure. tipX / plants / pad /
 * BOLT_* / OPENING_MS / frames locked. No new combat verb.
 * Online / versus 2P scaffolding leftover (v427): root menu was CPU-only
 * (JUGAR) with drawTitleCard already seating locked + PRÓXIMAMENTE, but no
 * versus/online seat, no matchKind flag, and confirmTitle had no locked
 * no-op — 2P path unread. Soft: VERSUS row locked (PRÓXIMAMENTE) via
 * VERSUS_2P_READY / ONLINE_2P_READY false stubs; matchKind "cpu"|
 * "versus"|"online" (JUGAR arms cpu; locked VERSUS confirm is no-op, no
 * duel start). ROOT_ITEMS + titlePointer + rootCount wrap. tipX / plants /
 * pad / frames / AI / BOLT / OPENING_MS locked. No new combat verb.
 * Hit-confirm especial cancel priority leftover (v428): rival AI hit-confirm
 * same-frame linkGolpe/linkSlash + linkBolt used to let tajo↔golpe steal the
 * dart door (rivalTrySlashGolpe / rivalTryGolpeSlash before rivalTryCutBolt)
 * while clash late already yields to linkBolt and player hit-confirm already
 * yields Space/L to K (v383) — so a full+superArmed especial cancel never
 * showed when the normal cancel also rolled. Soft: rivalHitConfirmBoltPriority
 * yields Space/L doors when !clashRec + linkBolt + boltCd ready + meterFull +
 * superArmed + cutToBoltWindow. Empty-meter combo-first kept. Clash-K yield
 * kept. BOLT_CANCEL_MS / AI_LINK_* / tipX / plants / pad / RIPOSTE_WIN /
 * AI_CD / frames locked. No new combat verb.
 * Versus local P2 input seat leftover (v429): matchKind versus existed (v427)
 * but rival still ran tickAI with no P2 key/pad seat — 2P path unread past
 * the locked VERSUS row. Soft: DEFAULT_P2_BINDS (arrows + O/P/[) + p2ActionHeld
 * + gamepadAt / secondGamepad; tickAI no-ops when matchKind==="versus";
 * tickVersusP2 drives rival walk/guard/slash/golpe/dart (+ throw/rev chords)
 * from P2. VERSUS_2P_READY stays false (menu locked). Rival auto-link cancels
 * skipped in versus. tipX / plants / pad / frames / AI_CD / BOLT / OPENING_MS
 * locked. No new combat verb.
 * Versus local 2P playable unlock leftover (v430): v429 seated P2 but
 * VERSUS_2P_READY stayed false (menu PRÓXIMAMENTE), CONTROLES listed P1 only,
 * secondGamepad was unread in p2ActionHeld, and human cancel doors / feint /
 * pushblock / throw-tech were deferred — so local 2P was unplayable past the
 * stub. Soft: VERSUS_2P_READY true (VERSUS starts matchKind versus); CONTROLES
 * lists P2 flechas + O/P/[ (+ chords); p2ActionHeld also polls secondGamepad
 * via DEFAULT_PAD; tickVersusP2 human cancel doors (slash↔golpe / cut→bolt),
 * rising-guard feint, away-tap pushblock, throw-tech on O+DOWN. ONLINE_2P_READY
 * stays false. tipX / plants / pad / frames / AI_CD / BOLT / OPENING_MS locked.
 * No new combat verb.
 * Versus fair-open leftover (v431): P2 used to early-return while openLeft > 0 —
 * mid-measure O/P/[ taps died, and hold-through fired ungated on lift via stale
 * p2Held (no hold-gate). Soft: p2OpenBuf / p2OpenGolpeBuf / p2OpenBoltBuf arm on
 * rising edges during OPENING_MS (mirror P1 openBuf / golpeBuf / openBoltBuf);
 * flush after open with the same bladeReach+LUNGE / GOLPE_LUNGE hold-gate;
 * p2Held updates through the measure so lift is not a free edge. VERSUS_2P_READY
 * stays true. tipX / plants / pad / frames / AI_CD / BOLT / OPENING_MS locked.
 * No new combat verb.
 * Versus HUD P2 leftover (v432): versus duel (v430+) used the same unlabeled
 * life bars as CPU — no seat tags, and especial ready teach (v392) stayed
 * player-only while rival silence was for CPU breath, so human P2 full stock
 * had no dart teach on the right pip. Soft: when matchKind==="versus", draw
 * P1/P2 under each bar; mirror especial mote+label for rival meter with
 * DEFAULT_P2_BINDS dart (drawEspecialHintP2). CPU still silent. tipX / plants /
 * pad / frames / AI_CD / VERSUS_2P_READY / ONLINE_2P_READY locked. No new combat verb.
 * Versus P2 remap leftover (v433): versus (v430+) seated DEFAULT_P2_BINDS +
 * CONTROLES / especial P2 labels, but OPCIONES remap was P1-only — P2 keys
 * stayed fixed (arrows + O/P/[) with no persist, so a remapped couch duel
 * could not rebind the right seat. Soft: p2Binds (LS vispera.p2binds.v1) +
 * setP2BindCode / p2BindPrimary; OPCIONES REMAP P2 page (kb_p2 capture);
 * CONTROLES + drawEspecialHintP2 read p2BindPrimary; RESTABLECER resets P2;
 * reject P1-owned + menu-reserved codes (arrows still assignable for P2).
 * Pad slot 2 still DEFAULT_PAD. tipX / plants / pad / frames / AI_CD /
 * VERSUS_2P_READY / ONLINE_2P_READY locked. No new combat verb.
 * Online stub leftover (v434): ONLINE_2P_READY existed since v427 (matchKind
 * "online" reserved) but the root menu never seated an ONLINE row — so the
 * stub flag was unread past VERSUS unlock. Soft: ONLINE root row locked
 * (PRÓXIMAMENTE) via ONLINE_2P_READY; ROOT_LOCKED.online; confirmTitle /
 * titlePointer no-op while locked (mirror early VERSUS). No net path, no
 * duel start. VERSUS_2P_READY stays true. tipX / plants / pad / frames /
 * AI_CD / BOLT / OPENING_MS locked. No new combat verb.
 * AI opening mix leftover (v435): tickAI hard-returned while openLeft > 0 with no open intent,
 * so after the 1600ms measure the CPU always fell into the unarmed
 * mid walk-in — P1 openBuf / golpeBuf / openBoltBuf and P2 p2Open* already
 * persist a chosen open through the measure and fire on walk-in. Soft:
 * armRivalOpenMix once per round during OPENING_MS (golpe / slash / dart / bait;
 * remainder incl. harness 0.99 stays empty so existing walk-in owns the high
 * roll). rivalFlushOpenMix after open walks in to the same blade+lunge /
 * GOLPE_LUNGE hold-gate as P1, or raises bait. Opening still will not plant
 * mid-measure. Versus skipped (human P2 owns p2Open*). tipX / plants / pad /
 * frames / AI_CD / AI_MID_* / OPENING_MS / BOLT locked. No new combat verb.
 * AI mid-round super mix leftover (v436): mid ready dart used to dump the
 * stock every time rivalShouldSuper (armed + SUPER_RANGE) — a super robot
 * after one connect, so empty K as the mid spacing tool stayed unread while
 * close mix / opening already mix. Soft: AI_MID_SUPER high band of the dart
 * roll spends (incl. harness 0.99); remainder of AI_MID_DART stays empty.
 * rivalShouldSuper / SUPER_RANGE 380 / fullscreen empty / vs-steel chip -6 /
 * cancel spend / opening dart still spend when should. Versus skipped.
 * tipX / plants / pad / frames / AI_CD / AI_MID_DART / OPENING_MS / BOLT locked.
 * No new combat verb.
 * Roster / character differentiation hooks leftover (v437): seats were only
 * kind you|rival with no fighterId / ROSTER — second fighter and character
 * select path unread (greenfield while versus/online already stubbed). Soft:
 * ROSTER (roan ready + cid second-fighter stub locked), fighterId on
 * makeFighter from p1FighterId/p2FighterId, rosterEntry / setP1FighterId /
 * setP2FighterId refuse !ready while ROSTER_SELECT_READY false. No new root
 * menu row (not another ONLINE-style stub). Sheets / frames / tipX / plants /
 * pad / AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY locked.
 * No new combat verb.
 * Answer-dart / fireball-war reach leftover (v438): canStartBolt / cutToBoltWindow
 * used to refuse while opposing boltPhase startup OR any live bolt — so v412
 * opposing-birth clash (equal cancel / spent beats empty / empty into spent)
 * stayed harness-only (second start always blocked; same-frame second loses).
 * Soft: allow K when the other owns startup or live dart; still refuse own
 * boltPhase / own live dart. AI: soft empty answer band during boltIncoming
 * (AI_DART_ANSWER high roll incl. harness 0.99) after readable tele /
 * live dart (GUARD_COMMIT_MS) instead of freeze-only; spent still mid/open/
 * cancel. Guard raise kept. Versus skipped. BOLT_AI_CD /
 * AI_MID_* / AI_OPEN_* / tipX / plants / pad / frames / OPENING_MS locked.
 * No new combat verb.
 * AI close-range super mix leftover (v439): close mix used to never spend
 * the stock except cancel (v428 hit-confirm) — a round-closer in pocket
 * stayed unread while mid already mixes AI_MID_SUPER / opening already
 * mixes. Soft: AI_CLOSE_SUPER low band of close mix spends when
 * rivalShouldSuper (armed + SUPER_RANGE + full) after BOLT_AI_CD; remainder
 * of close mix stays golpe/slash/bait/reset. Harness 0.99 still Space.
 * rivalShouldSuper / SUPER_RANGE 380 / fullscreen empty / vs-steel chip -6 /
 * cancel spend / opening dart / mid AI_MID_SUPER still spend when should.
 * Versus skipped. tipX / plants / pad / frames / AI_CD / AI_CLOSE_* /
 * AI_MID_* / AI_OPEN_* / OPENING_MS / BOLT locked. No new combat verb.
 * Roster select path leftover (v440): v437 seated fighterId + ROSTER +
 * ROSTER_SELECT_READY false, but JUGAR / VERSUS / ONLINE still requestStart
 * with no select — unlock path for character select stayed unread (hooks
 * only). Soft: titlePage "roster" (ROSTER rows + VOLVER); when
 * ROSTER_SELECT_READY, beginMatchFromTitle routes cpu/versus/online into
 * roster (pendingMatchKind) instead of immediate start; confirm ready id
 * via setP1FighterId then requestStart; !ready stays PRÓXIMAMENTE no-op.
 * When !ROSTER_SELECT_READY keep direct start (menu seat still locked —
 * measurable by flipping the flag). No new root menu row. P2 seat stays
 * DEFAULT_P2 until a later pick step. Sheets / frames / tipX / plants /
 * pad / AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY locked.
 * No new combat verb.
 * Roster select unlock leftover (v441): v440 seated titlePage "roster" +
 * beginMatchFromTitle gate but ROSTER_SELECT_READY stayed false — JUGAR /
 * VERSUS still direct-started, so the selectable roster UI stayed unread
 * (path-only). Soft: ROSTER_SELECT_READY true; JUGAR/VERSUS/ONLINE enter
 * ELEGIR. Draw roster faces from seated ART.you / ART.rival crops + pending
 * match-kind chip (VS CPU / VERSUS / ONLINE). CID stays !ready PRÓXIMAMENTE;
 * setP* always refuse !ready. No new root menu row. Sheets / frames / tipX /
 * plants / pad / AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY
 * locked. No new combat verb.
 * Second fighter stub / CID unlock leftover (v442): v441 unlocked ELEGIR but
 * CID stayed !ready PRÓXIMAMENTE — second fighter and fighterId→sheet path
 * unread (roster polish only). Soft: CID ready; DEFAULT_P2_FIGHTER_ID cid
 * (CPU/P2 owns rival sheets until a later P2 pick); art/DESIGN/POSE/bitmaps
 * key off fighterId (roan→you family, cid→rival/rivalFlip by facing); dress
 * both seats; roster confirm seats P2 on DEFAULT_P2; HUD nameplates ROAN/CID.
 * Same frames / tipX / plants. No youFlip (roan stays left-facing seat). No
 * new root row / combat verb. Sheets / frames / tipX / plants / pad / AI_CD /
 * BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY / ROSTER_SELECT_READY
 * locked.
 * Roster face crop polish leftover (v443): v442 unlocked CID + fighterId→sheet
 * but ELEGIR still cropped ART.you/rival with sy≈2% / 28% box — rival head
 * sits near y≈215 so CID face read near-empty black (ROAN also off-head). Soft:
 * per-row face {sx,sy,sw,sh} on ROSTER (roan head box on you; cid head box on
 * rival); drawTitleCard uses e.face. CID stays ready; setP* / dress / HUD unchanged.
 * No new root row / combat verb. Sheets / frames / tipX / plants / pad / AI_CD /
 * BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY / ROSTER_SELECT_READY
 * locked.
 * Roster P2 mirror leftover (v444): v442/v443 unlocked CID + face crops but
 * roster confirm always setP2FighterId(DEFAULT_P2) — P1 CID seated both seats
 * on cid art family (mirror-when-P1-cid comment unread). Soft: confirm seats P2
 * on the other ready roster id (P1 cid → roan; P1 roan → cid). Later P2 pick
 * page still deferred. No face crop / combat / ONLINE unlock. Sheets / frames /
 * tipX / plants / pad / AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY /
 * ONLINE_2P_READY / ROSTER_SELECT_READY locked.
 * CID/ROAN move kit leftover (v445): v442–v444 seated fighterId + art families
 * but cutLunge / WALK stayed global — CID ACTIVE HOLD measures ~152 vs ROAN
 * ~192 (−40 from tip art 884/0 vs 991) while verbs/frames stayed identical, so
 * the second fighter unread as kit (same verbs, no identity). Soft: ROSTER kit
 * (roan LARGO walk 240 golpeLunge 18; cid CORTO walk 288 golpeLunge 28);
 * walkSpeed(f) / golpeLungeOf(f) / cutLunge CID golpe; ELEGIR kit tag. Space
 * LUNGE 36 / tipX / frames / K / plants / pad / AI_CD / BOLT / OPENING_MS /
 * VERSUS_2P_READY / ONLINE_2P_READY / ROSTER_SELECT_READY locked. No new combat
 * verb.
 * CID/ROAN Space slash-lunge kit leftover (v446): v445 seated CORTO/LARGO walk +
 * golpeLunge but cutLunge slash stayed global LUNGE_PX 36 — CID Space ACTIVE HOLD
 * measures ~149 vs ROAN ~192 (tip already −43) while Space lunge stayed identical,
 * so LARGO poke / CORTO pocket unread on Space (golpe/walk owned; Space tip-only).
 * Soft: ROSTER slashLunge (roan LARGO 44; cid CORTO 28); slashLungeOf(f) /
 * cutLunge slash; Space HOLD gates ride slashLungeOf. LUNGE_PX 36 baseline /
 * tipX 991/0/884 / Space frames 180/140/280 / walk+golpe kit / K / plants / pad /
 * AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY /
 * ROSTER_SELECT_READY locked. No new combat verb.
 * CID/ROAN Space HOLD meaty-pad kit leftover (v447): v446 seated slashLungeOf on
 * Space HOLD but meaty/threat pocket still padded with global LUNGE_PX 36 —
 * ROAN LARGO under-pads meaty (−8 vs slashLunge 44) / CID CORTO over-pads (+8 vs
 * 28), so kit identity unread on reversal/wake/threat gates. Soft: meaty +
 * inThreat + stam-threat pads ride slashLungeOf(f). LUNGE_PX 36 baseline /
 * slashLunge kit / tipX / frames / walk+golpe / K / plants / pad / AI_CD /
 * BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY / ROSTER_SELECT_READY
 * locked. No new combat verb.
 * CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): v447 seated slashLungeOf
 * on Space meaty/threat pads but L golpe meaty gates still padded with
 * slashLungeOf — ROAN LARGO slash pad 44 vs golpe 18 (−26×2 pocket) / CID
 * CORTO both 28, so kit identity unread on golpe reversal/wake/teach gates.
 * Soft: meaty slash|golpe gates ride cut-matched lungeOf (golpe→golpeLungeOf,
 * slash→slashLungeOf) on the same fighter as HOLD. Space meaty-pad / inThreat /
 * stam-threat / tipX / frames / walk+golpe / slashLunge / K / plants / pad /
 * AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY /
 * ROSTER_SELECT_READY locked. No new combat verb.
 * CID/ROAN L golpe inThreat/stam-threat kit leftover (v449): v448 seated
 * cut-matched meaty slash|golpe pads but AI inThreat + stam-threat still
 * padded with slashLungeOf only — ROAN LARGO slash pad 44 vs golpe 18
 * (−26×2 pocket) / CID CORTO both 28, so kit identity unread on guard-commit
 * threat + leave-threat regen while a live L golpe is in pocket. Soft:
 * inThreat + stam-threat ride cut-matched lungeOf when the other seat's
 * live cut is golpe (golpe→golpeLungeOf; else slash→slashLungeOf) on the
 * same fighter as HOLD. Meaty slash|golpe gates / Space meaty-pad /
 * walk+golpe / slashLunge / tipX / frames / K / plants / pad / AI_CD /
 * BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY /
 * ROSTER_SELECT_READY locked. No new combat verb.
 * CID/ROAN you-family P2 facing flip leftover (v450): v444 seats P2 as the
 * other ready id (P1 CID → ROAN) but you-family has no youFlip — ROAN P2
 * kept right-facing tipX/body/draw while facing −1, so tip pointed away and
 * ACTIVE max-connect measured 0 (LARGO kit unread on the right seat). Soft:
 * when you-family faces left, mirror pose tipX/steelX/body about footX and
 * canvas-scale(−1) draw about the foot so tip/hitbox/sprite face the foe.
 * tipX markers 991/0/884 stay; CID rival/rivalFlip path unchanged. Kit walk/
 * golpe/slashLunge / Space/L meaty / inThreat/stam-threat / plants / pad /
 * AI_CD / BOLT / OPENING_MS / VERSUS_2P_READY / ONLINE_2P_READY /
 * ROSTER_SELECT_READY locked. No new combat verb.
 * Tip under boltPlantFade leftover: idle/walk K recovery used to dump
 * bladeTip onto idle-edge (~339px) the same tick dart birth popped
 * boltPhase to recovery while leftover knife still owned the sheet
 * (boltPlantFade; poseBitmap already idle) — a hop, not a plant. Same hole
 * tip under feintFade already closed for windup→idle. Draw-only
 * (bladeTipX / bladeTipY). Ease throwKnife→pose tip with boltPlantFade
 * (bf dies 1→0; mirror feintFade). Special-cancel still 0 (holdingCutBolt).
 * castPlantXY K path unchanged (already rides knife through fade). Tip under
 * feintFade / telegraphFade / tipX under plant fades / reversal tip unchanged.
 * tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
 * No new combat verb.
 * Hurt pose snap leftover: leftover crumple used to pop hurt→idle when
 * throw-invuln died (wakeupFade dies with THROW_WAKE_INVULN 80) — meaty stun
 * past that window / getup settle read as a sheet cut, not a plant. Same hole
 * parryFade closed for slash→idle on interrupt. Draw-only (hurtFade). Fade
 * Fade leftover hurt→idle over SHEATHE_MS from thrownT clear (poseBitmap still idle
 * once thrownT is 0). Keep through stun / guard / wakeRev like wakeupFade.
 * wakeupFade still owns invuln-window / wakeRevFadeHold. Tip under hurt did not
 * hop (hurt/idle share sheet-edge; no tipX). destRect/AABB planted. Stun frames /
 * damage / THROW_WAKE_INVULN / tip under boltPlantFade v334 / cover family locked.
 * No new combat verb.
 * Hit interrupt leftover (v336): landHit / landBoltHit used to pop the defender
 * slash/windup/knife sheet to idle the same tick stun armed (sheatheFade dies on
 * stun; poseBitmap idle immediately), so freeze/flinch hard-cut the attack sheet
 * with a ~66px tip hop — a snap, not a plant. Sibling of attacker parryFade
 * (v325). Draw-only (parryFade). Arm SHEATHE_MS on def when interrupting a cut
 * pose; latch parryFadeSheet (slash/windup/knife). Clear bolt plant so poseBitmap
 * stays idle (chip path). Hold clock through freeze. destRect eases leftover
 * ox/rot into flinch; tip eases under fade. Idle chip stun still 0. Throw KD /
 * wakeupFade / crumpleFade / dart tip v334 / cover-family / HITSTUN 350 /
 * HITSTOP_HIT 140 / HIT_FLASH_MS 120 / frames / tipX / pad locked. No new combat verb.
 * Clash/tech/pushblock dust ↔ punchCover (v337): choque scrape + CLASH_FX /
 * TECH_FX / PUSHBLOCK_FX shove trails used to spawnPlantDust before bumpShake,
 * so punch mark never armed — grit faded on its own t/life linear clock while
 * punchCover held full (clash spark / steel / knock grit already peaked). Sibling
 * of knock grit v330 (landHit bumps shake first). Draw-only (plantDustK). Arm
 * shake before dust so punch-marked stamps/specks hold peak with cover. Walk/idle
 * grit unmarked — stays linear. Clash dust leftover cull / pushblock skip-1.0 /
 * CLASH_FX 1.7 / TECH_FX 1.5 / PUSHBLOCK_FX 1.85 / HITSTOP_BLOCK 60 / cover family /
 * hit interrupt v336 / hurtFade v335 / dart tip v334 / tipX / plants / frames /
 * pad locked. No new combat verb.
 * Hurt settle→walk plant-release destRect leftover (v338): leftover hurtFade breath used to
 * seat mid-stride / mid-raise the tick hurtFadeT cleared after throw-invuln already ended idle
 * (no cutRec arm) or after cutRec drained — idleBreath keep-0 through walking/recoveryWalkOut/
 * walkFadeHold while hurtFade>0, but nothing armed cutRec when SHEATHE_MS hurtFade died under
 * plant (wakeup/feint/stun already closed that hole on their clocks). destRect-only (idleBreath /
 * cutRecBreathT). Keep breath 0 through walk during hurtFade (already); tickHurtFade arms
 * cutRecBreathT when hurtFadeT clears mid-stride / mid-raise / under walkFadeHold so max(ck, wk) /
 * hold-under-rise own the post-hurt seat. Idle hurt→idle still eases with hurtFade. Sheet
 * hurtFade / wakeupFade / THROW_WAKE_INVULN / SHEATHE_MS / dust cover v337 / hit interrupt v336 /
 * tipX / plants / frames / pad locked. No new combat verb.
 * Throw interrupt leftover (v339): landThrow used to pop the defender mid-cut /
 * windup / knife / sheathe sheet to hurt the same tick thrownT armed (poseBitmap
 * hurt immediately; no fade) — startup tip hopped ~270px, a snap not a plant.
 * Sibling of hit interrupt v336 (landHit mid-cut→idle via parryFade). Draw-only
 * (parryFade). Arm SHEATHE_MS on def when interrupting a cut pose; latch
 * parryFadeSheet. Rest leftover cut on hurt while pf live (poseBitmap still hurt
 * immediately). destRect eases leftover ox/rot into plant; tip eases under fade.
 * Idle throw still snaps (no cut sheet → pf 0). Hold clock through freeze.
 * THROW_KD_MS 520 / THROW_DMG 20 / HITSTOP_HIT 140 / hurt settle→walk v338 /
 * dust cover v337 / hit interrupt v336 / hurtFade v335 / tipX / plants / frames /
 * pad locked. No new combat verb.
 * Tech / KO interrupt leftover (v340): landThrowTech used to dump slash / sheathe /
 * knife → throw windup the same tick techRec armed (poseBitmap windup; no fade) —
 * tip hopped ~270px, a snap not a plant. KO mid-cut / windup landHit also latched
 * parryFadeSheet but parryFade died on hp<=0, so killing blows still hard-cut to
 * hurt crumple. Sibling of throw interrupt v339. Draw-only (parryFade). Arm
 * armHitInterruptFade on both fighters before landThrowTech phase dump; allow
 * parryFade through techRec throw recovery and through hp<=0 / falling while
 * latched. Rest leftover cut on windup (tech) or hurt (KO). Tip eases under fade.
 * Idle tech / tech-from-guard still own their snaps (no cut sheet → pf 0; guard
 * plant stays techGuardPlantFade). Clash mid-active sheet stays slash (no snap).
 * THROW_RECOVERY 220 / HITSTOP_BLOCK 60 / throw interrupt v339 / hit interrupt
 * v336 / tipX / plants / frames / pad locked. No new combat verb.
 * Tip under throw-startup→tech leftover (v341): attacker throw startup→tech used to
 * dump tipX ~152px onto windup tip the same tick landThrowTech cleared
 * throwGuardPlanting / tipPlantK while the sheet stayed windup (poseBitmap windup;
 * parryFade latched windup→windup — a no-op vs the tipPlantK edge blend) — a hop,
 * not a plant. Same hole tip under feintFade / parryFade / boltPlantFade closed for
 * marker hops. Draw-only (parryFade). Latch tipPlantK raise fraction at
 * armHitInterruptFade (throw startup only); ease tipX/tipY from that blend through
 * the interrupt fade envelope. Idle tech / tech-from-guard still own their snaps
 * (no tipK latch). Defender mid-cut tech / KO interrupt v340 unchanged. tipX locks
 * 991/0/884 / plants / frames / pad locked. No new combat verb.
 * Tip under guard raise leftover (v342): S-press / guard raise used to dump bladeTip
 * onto block tipY (~43px) the same tick poseBitmap flipped to block while raise k
 * still low (guardRaiseK sat outside tip ease; poseBitmap still block immediately)
 * — a hop, not a raise. Same hole tip under guard drop leftover already closed for
 * S-release (mirror). Draw-only (bladeTipX / bladeTipY). Ease idle→block tip with
 * guardRaiseK while guarding idle (rk rises 0→1; mirror telegraphFade). Full raise:
 * rk=1 is a no-op vs block tip. Drop still tipPlantK+guardDropFade. Plant-from-guard
 * (throw/reverse/tech) still tipPlantK (phase startup). tip markers / steelX /
 * bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under tipPlantK+tele leftover stack (v343): Space/L/K from short leftover drop
 * with telegraph on used to dump bladeTip onto idle-edge (~21px tipY at gpk≈0.5) the
 * same tick startAttack/startBolt armed while leftoverPlantTip latched but tele tip
 * still eased idle-edge→pose (tipPlantK gated !telegraphing; tele base ignored the
 * leftover block blend) — a hop, not a plant. Same hole tip under slash/golpe/bolt
 * leftover short raise already closed for tele-off. Draw-only (bladeTipX / bladeTipY).
 * Latch leftoverPlantTipK = guardRaiseK at startAttack/startBolt; ease leftover
 * tip→pose with telegraphFade (bias idle-edge/chest toward block by tipK). Tele-off
 * tipPlantK / idle tele / clash-cancel / holdCut / link tip unchanged. tip markers /
 * steelX / bladeBox / active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under mid-tele feint leftover (v344): Space feint mid-telegraph used to dump
 * bladeTip onto full windup (~122px hop at tf≈0.5; ~308px at tf≈0) the same tick
 * startFeint cleared telegraph while feintFade latched fk=1 onto windup tip
 * (tip under feintFade already eased windup→idle, but mid-tele tip was still between
 * idle-edge and windup) — a hop, not a pull. Same hole tip under tipPlantK+tele
 * leftover stack closed for leftover→tele. Draw-only (bladeTipX / bladeTipY).
 * Latch feintTipK = telegraphFade at startFeint BEFORE phase/tele clear
 * (telegraphing needs startup; 1 when tele already seated); bias windup tip toward
 * idle-edge by tipK so feintFade eases mid-tele→idle. Late tele feint (tipK=1) /
 * tip under feintFade / tele tip unchanged. tip markers / steelX / bladeBox /
 * active hitbox unchanged. AABB planted. No new combat verb.
 * Tip under sheathe↔guardDrop tip gate (v345): sheatheFade and guardDrop tip used to
 * fight mid-transition — (1) S-raise mid-sheathe dumped tip onto idle-edge (~70px) the
 * same tick poseBitmap flipped to block while sheatheFade still owned the slash overlay
 * (tip under guard raise eased idle→block; no tip under sheatheFade); (2) S-release mid-
 * sheathe pulled tip toward slash (~45px) then dumped idle-edge because guardDropFade
 * zeroed sheatheFade (block owns sheet) while sheathing() still held slash in poseSheet
 * so tipPlantK eased block→slash; (3) pure idle sheathe sat on full slash tip then dumped
 * ~68px onto idle-edge when sheatheT died. Same hole tip under feintFade / guard raise /
 * guard drop closed for marker hops. Draw-only (bladeTipX / bladeTipY). Seat tip on
 * idle-edge while guardDropFade && sheatheT so tipPlantK eases block→idle (mirror sheet).
 * Ease slash→pose tip with sheatheFade (mirror feintFade). Recovery sheatheFade tip
 * seats idle-edge too (v346 holdCut door). When sheathing keep poseSheet on slash, seat
 * pose tip on idle-edge so ease matches restSheathe. Raise mid-sheathe keeps block tip
 * after rk ease. Drop / raise / feint / tele tip family
 * v342–344 unchanged. tip markers / steelX / bladeBox / active hitbox unchanged. AABB
 * planted. No new combat verb.
 * Tip under holdCutFade / boltPlant leftover (v346): special-cancel cut→K tip used to
 * sit on full slash while leftover sheathe still owned the sheet (holdCutFade draw sk =
 * 1 − hf·(1−linkSheathe); recovery tip stayed hard slash), so tip / cast juice hopped
 * ~26px off the visible blade when the dart planted from the cut pose — a hop, not a
 * plant. Same hole tip under sheatheFade / linkPlantFade closed for marker hops.
 * Draw-only (bladeTipX / bladeTipY). Seat recovery sheatheFade tip on idle-edge (mirror
 * idle sheathing) so tip tracks restSheathe into the cancel door. Ease leftover-sheathe
 * tip→slash with holdCutFade (mirror draw sk). castPlantXY follows bladeTip so puff
 * tracks the cut; after holdCutFade dies tip/cast sit on slash for dart birth. Tip under boltPlantFade v334 idle
 * path unchanged (holdingCutBolt still 0). tipX locks / castPlantXY / v343 tele stack /
 * v345 sheathe gate unchanged. AABB planted. No new combat verb.
 * KO slashPose ox under pf leftover (v347): mid-cut / windup / knife KO used to
 * dump destRect ox/rot the same tick hp hit 0 / beginFall set falling (stun path
 * gated hp>0; falling hard-zeroed), while parryFade still owned the cut→hurt sheet
 * — a hop, not a plant. Chip stun already eases fromOx under pf. Mirror throw /
 * hit interrupt. destRect-only (slashPose). AABB planted (bodyAABB zeros falling).
 * poseBitmap still hurt. Ease leftover cut ox/rot under parryFade into crumple;
 * idle KO (no pf) still ox 0 + crumple oy. Extra destRect rot stays 0 once pf dies.
 * tip under holdCut / link / clash / tipX 991/0/884 / plants / frames / pad locked.
 * No new combat verb.
 * Knock grit leftover walk stamps ↔ punchCover (v348): leftover walk/idle plant
 * stamps used to ride the knock boot (syncPlantDust) and fade on their own t/life
 * linear clock while punchCover held full through the slam — unmarked grit died
 * mid-cover beside punch-marked connect grit (clash / pushblock cull siblings).
 * Draw-only (dropPlantUnderKnock). Cull leftover unmarked non-shove stamps for the
 * hurt fighter before landHit / landBoltHit / landThrow connect grit. Specks still
 * fly. Shove trails stay. Clash dropPlantUnderClash / pushblock dropBlockPlantUnderShove
 * unchanged. Walk/idle grit unmarked when no knock. plantDustK / HITSTOP_HIT /
 * KNOCK_PX / tipX / plants / frames / pad locked. No new combat verb.
 * Knock grit leftover atk walk stamps ↔ punchCover (v349): landHit / landBoltHit
 * used to cull only the hurt fighter (v348), so the attacker's leftover walk/idle
 * / lunge plant stamps kept riding syncPlantDust and faded on their own t/life
 * linear clock while punchCover held full — unmarked atk grit died mid-cover
 * beside punch-marked connect grit on the hurt boot (landThrow / landThrowTech
 * already culled both). Draw-only (dropPlantUnderKnock). Cull leftover unmarked
 * non-shove stamps for atk too before landHit / landBoltHit connect grit. Specks
 * still fly. Shove trails stay. Def-only connect grit spawn unchanged. Clash /
 * pushblock culls unchanged. Walk/idle grit unmarked when no knock. plantDustK /
 * HITSTOP_HIT / KNOCK_PX / tipX / plants / frames / pad locked. No new combat verb.
 * Cast brasa ↔ punchCover (v350): spent-super plant puff (BOLT_CAST_FX_MS 220) used to
 * linear-drain mid-cover after startBolt spend freeze (BOLT_SUPER_STOP + mag 10) —
 * cast puff faded while punchCover still held full (hit|grab already hold+clear).
 * Empty K never arms shake — stays linear. Feint / reversal / wakeup never arm shake
 * — stay linear. Block / clash brasa kinds still linear (steel/clash clocks already
 * cover-held). Hold cast (+ hit + grab) brasaFxT through live punch; clear when cover
 * dies. Draw uses brasaFxT/life peak while held (no separate cast draw-K). BOLT_CAST_FX_MS
 * 220 / BOLT_SUPER_STOP 60 / BOLT_SUPER_FX 1.55 unchanged. Juice only — grit culls v348/
 * v349 / short flecks v333 / tipX / plants / frames / pad locked. No new combat verb.
 * Block|clash brasa ↔ punchCover (v351): bolt block / empty-dart clash flecks
 * (STEEL_FLASH_MS 60 / CLASH_SPARK_MS 110) used to linear-drain mid-cover while
 * steelFlashT / clashSparkT already hold+clear — flecks faded while punchCover
 * still held full (hit|grab|cast already hold+clear). Feint / reversal / wakeup
 * never arm shake — stay linear. Empty cast no shake — linear. Hold block|clash (+ hit + grab + cast) brasaFxT through live punch; clear when cover
 * dies. Draw uses brasaFxT/life peak while held (no separate block/clash draw-K).
 * STEEL_FLASH_MS 60 / CLASH_SPARK_MS 110 / HITSTOP_BLOCK 60 unchanged. Juice only — cast v350 /
 * grit culls v348/v349 / short flecks v333 / tipX / plants / frames / pad locked.
 * No new combat verb.
 * Walk / opening plant grit audio sync leftover (v352): walk boot plant / walk-stop grit
 * and opening stampNow settle grit used to stamp wet-stone dust silent while getup scrape
 * (v321) and KO caida (v298) already armed SFX with their grit — plant led the ear by the
 * whole step. Juice-only (playPlantScrape). Soft whoosh-down + quieter bloqueo on walk boot
 * plant / weighted stop and on stampNow (openLeft / rematch / title), distinct from getup
 * scrape rates. Walk settle lean / WALK_SETTLE_MS / destRect ease unchanged. tipX / plants /
 * frames / pad / grit culls v348/v349 / brasa cover v350/v351 locked. No new combat verb.
 * Tip under throwPlantFade leftover (v353): throw recovery tip used to sit on full
 * windup while restThrow already faded idle under throwPlantFade, then dump ~308px
 * onto idle-edge the tick recovery ended (poseBitmap still windup through recovery;
 * tip under boltPlantFade already eased knife→idle) — a hop, not a plant. Same hole
 * tip under boltPlantFade / feintFade / sheatheFade closed for marker hops. Draw-only
 * (bladeTipX / bladeTipY). Ease windup→idle-edge tip with throwPlantFade (trf dies 1→0;
 * poseSheet stays windup so target idle-edge, not pose tip). Tech throw recovery same
 * path. Tech / KO interrupt + tech-from-guard skip (parryFade / techGuardPlantFade own
 * tip). Idle throw still snaps (trf 0). tipX locks 991/0/884 / plants / frames / pad /
 * grit culls v348/v349 / brasa cover v350/v351 / plant scrape v352 locked. No new combat verb.
 * Tip under throwPlantFade tech leftover (v354): tech throw recovery tip used to sit on
 * windup while parryFade owned the interrupt (v353 skipped techRec so tip under
 * throwPlantFade never eased), then dump ~303px onto idle-edge the tick recovery ended
 * after pf died (poseBitmap still windup through THROW_TECH_REC; pf SHEATHE_MS 140 dies
 * before rec 160; tip under pf eased windup→pose tip but pose was windup — a no-op) — a
 * hop, not a plant. Same hole tip under throwPlantFade v353 closed for idle throw.
 * Draw-only (bladeTipX / bladeTipY). Ease windup→idle-edge with throwPlantFade during tech
 * throw recovery even while pf is live; pf blends tipK-sx→eased tip (throw-startup→tech
 * still seats windup at pk=1). Tech-from-guard still skips (techGuardPlantFade /
 * techGuardTip). Idle throw
 * / tip under throw-startup→tech v341 unchanged. tipX locks 991/0/884 / plants / frames /
 * pad / v352–v353 locked. No new combat verb.
 * Stick/pad release linger leftover (v355): stickRelease used to hard-set
 * translate(0,0) the same tick the thumb lifted (knob snap-home) and padUp
 * removed .held the same tick as keyup on data-tap zones (Space/L/K) — tap
 * zones felt dead; hold-guarda KeyS must stay honest. Pad juice (visual only):
 * ease stick-knob back to center over WALK_SETTLE_MS with smoothstep; keep
 * tap .held for GUARD_RAISE_MS after real lift while keyup stays immediate.
 * New pointerdown cancels in-flight knob ease / tap linger (no snap fight).
 * stickApply(0) still immediate (A/D drop on lift). KeyS drops .held on lift.
 * padMarkChordLook / slide-off v327 / portrait follow / Esc→JUGAR / tipX /
 * plants / frames / tip leftovers through v354 locked. No new combat verb.
 * Stick .held chrome linger leftover (v356): stickRelease still dumped
 * .stick.held the same tick the thumb lifted while the knob eased home —
 * oxido held chrome snapped to idle while the knob was still moving.
 * Keep .held on the stick through knob ease (WALK_SETTLE_MS); drop when
 * ease settles or on re-grab. CSS zone :active removed so pressed look is
 * only .held-driven (no sticky :active ghost after tap linger ends).
 * Tap .held linger / KeyS honest / A/D immediate / tipX / plants / frames /
 * pad 2×2 / slide-off / v355 locked. No new combat verb.
 * Lunge / active plant grit audio sync leftover (v357): slash / golpe / throw
 * active stamps (riposte shares the path) used to stamp wet-stone dust silent
 * while walk boot / walk-stop / opening stampNow already armed playPlantScrape
 * (v352) with their grit — lunge plant led the eye with no ear. Juice-only
 * (playPlantScrape). Same soft whoosh-down + quieter bloqueo rates as walk
 * (discreet under tajo whoosh). One fire on startup→active only — no frame spam,
 * no double with walk scrape (walk plant is earlier / separate grit). stick/pad
 * v355–v356 / tip leftovers through v354 / walk scrape v352 / grit culls /
 * brasa cover locked. No new combat verb.
 * Camera punch end cover settle leftover (v358): last-quarter punchCover ease
 * still dumped ~8–9px yard scale in one frame while ox was already ~0
 * (HITSTOP_HIT two-frame ease 8.9→1.1; short slam / 90ms skip-zone 12→~2.5)
 * — a zoom hop, not a settle. Draw-only (punchCover). Keep k>0.25 full cover
 * + last-quarter smoothstep target; rate-limit coverShown toward that target
 * (~GUARD_RAISE_MS*0.75 step) so mid-ease dCover stays plant-sized. shake→0
 * still hard-flushes (v211 rest flush / FX cover clocks). KO land skip / tipX /
 * plants / frames / pad / v352–v357 locked. No new combat verb.
 * Lunge plant scrape ↔ knock cull leftover (v359): playPlantScrape used to fire in
 * advanceAttack the same tick landHit / landThrow / landBoltHit / landThrowTech
 * dropPlantUnderKnock (v349) culled the unmarked lunge stamp — scrape for a plant
 * the eye never saw (under whoosh+impacto). Clash dropPlantUnderClash same hole on
 * same-tick active. Whiff keeps grit+scrape. Juice-only: arm lungePlantSfx with the
 * stamp; flushLungePlantScrape after resolveCuts only when the unmarked grit still
 * rides the boot. Walk / opening stampNow scrape (v352) unchanged. tipX / plants /
 * frames / pad / v352–v358 locked. No new combat verb.
 * Riposte window readability leftover (v360): perfect-parry RIPOSTE_WIN used
 * to leave only a tiny floating bang after PARRY_GLEAM died at 80ms, so the
 * leftover ~200ms reward window went unread once tip gleam faded. Draw-only (drawRiposteHint).
 * Soft brasa chest ring + remap teach pulse ride the full 280ms window; bang kept.
 * RIPOSTE_WIN_MS 280 / PARRY_GLEAM_MS 80 / frames / tipX / plants / pad locked. No new combat verb.
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
  const GUARD_RAISE_MS = 80;
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
  const HINT_IN_MS = 520;
  const HINT_FADE_MS = 640;
  const HINT_HOLD_MS = 12000;
  const HINT_VERB_N = 3;
  const MAX_HP = 100;
  const SLASH_DMG = 10;
  // Riposte: faster tajo after a perfect parry (not hold-block). Same −10. No +dmg.
  const RIPOSTE_WIN_MS = 280;
  const RIPOSTE_STARTUP = 130;
  const RIPOSTE_ACTIVE = 140;
  const RIPOSTE_RECOVERY = 280;
  // Feel micro only: punchier camera punch on riposte connect. Same 140ms hitstop.
  const RIPOSTE_HIT_SHAKE = 12;
  // Parry (Combate): raise-edge window. Named for Combate retune.
  const PARRY_WIN_MS = 140;
  const PARRY_STAGGER_MS = 180;
  const PARRY_GLEAM_MS = 80;
  const STAMINA_MAX = 100;
  const STAMINA_DRAIN = 40;
  const STAMINA_REGEN = 25;
  const STAMINA_REGEN_THREAT = 10;
  const STAMINA_REGEN_LOCK = 1000;
  const STAMINA_REGEN_DELAY = 200;
  const STAMINA_START_MIN = 15;
  const STAMINA_BLOCK = 20;
  const PUSHBLOCK_STAM = 25;
  const PUSHBLOCK_PX = 240;
  const PUSHBLOCK_AI_CD = 1800;
  const PUSHBLOCK_AI_CHANCE = 0.4;
  const PUSHBLOCK_FX = 1.85;
  // Pushblock camera punch — stronger than hold-block 4, under riposte 12.
  const PUSHBLOCK_SHAKE = 8;
  // Clash screen punch (no separate crush): saturates PUNCH_PX harder than old 10.
  const CLASH_SHAKE = 14;
  // Extra clash grit on top of locked scrape 1.2 (shove trails; draw-only).
  const CLASH_FX = 1.7;
  // Throw-tech camera punch — between pushblock 8 and clash 14 / throw-land 10.
  const TECH_SHAKE = 9;
  // Extra tech grit on top of locked scrape 1.1 (shove trails; draw-only).
  const TECH_FX = 1.5;
  // Grab-connect camera punch — slightly above normal hit 10, under riposte 12.
  const GRAB_SHAKE = 11;
  // Brief grab puff life (under hit spark 140; steel asterisk 60 reads too snappy alone).
  const GRAB_FX_MS = 90;
  const GUARD_BREAK_MS = 400;
  const GUARD_BREAK_SETTLE = 180;
  const HITSTUN = 350;
  const STANDOFF_MIN = 400;
  const STANDOFF_MAX = 800;
  const GUARD_COMMIT_MS = 140;
  const HIT_FLASH_MS = 120;
  const STEEL_FLASH_MS = 60;
  const CLASH_SPARK_MS = 110;
  const HIT_SPARK_MS = 100;
  // Brasa dart hit/ember puff keeps pre-polish life (flesh spark alone shortened).
  const BRASA_HIT_MS = 140;
  const DMG_NUM_MS = 600;
  const DMG_NUM_RISE = 50;
  const LUNGE_PX = 36;
  const GOLPE_STARTUP = 120;
  const GOLPE_ACTIVE = 80;
  const GOLPE_RECOVERY = 180;
  const GOLPE_LUNGE_PX = 18;
  const KNOCK_PX = 80;
  const KNOCK_MS = 180;
  const SLASH_BUFFER_MS = 80;
  const SLASH_CANCEL_MS = 100;
  const GOLPE_CANCEL_MS = 100;
  const SHEATHE_MS = 140;
  const SETTLE_MS = 260;
  const BOLT_STAM = 30;
  const BOLT_CHIP = 2;
  const BOLT_SUPER_CHIP = 6;
  const BOLT_STARTUP = 200;
  const BOLT_RECOVERY = 280;
  const BOLT_CANCEL_MS = 100;
  const BOLT_SPEED = 880;
  const BOLT_SUPER_SPEED = 1280;
  const BOLT_W = 58;
  const BOLT_H = 13;
  const BOLT_SUPER_W = 96;
  const BOLT_SUPER_H = 24;
  const BOLT_AI_CD = 1800;
  const THROW_AI_CD = 1800;
  const BOLT_CAST_FX_MS = 220;
  const BOLT_SUPER_DMG = 28;
  const BOLT_SUPER_RECOVERY = 380;
  const BOLT_SUPER_STOP = HITSTOP_BLOCK;
  const BOLT_SUPER_FX = 1.55;
  // Especial connect juice leftover (v393): spent land punchier than empty dart.
  // Hit saturates with riposte (12); block sits between chip 4 and pushblock 8.
  const BOLT_SUPER_HIT_SHAKE = 12;
  const BOLT_SUPER_BLOCK_SHAKE = 6;
  const BOLT_SUPER_GRIT = 1.45;
  const METER_MAX = 100;
  const METER_HIT = 20;
  const METER_BLOCK_SPECIAL = 10;
  const METER_FLASH_MS = 220;
  const METER_GAIN_MS = 180;
  const HUD_FLASH_MS = 220;
  const COMBO_SHOW_MS = 640;
  const YARD_SWITCH_MS = 280;
  const SUPER_RANGE = 380;
  const THROW_STARTUP = 80;
  const THROW_ACTIVE = 40;
  const THROW_RECOVERY = 220;
  const THROW_DMG = 20;
  const THROW_RANGE = 120;
  const THROW_SNAP_GAP = 24;
  const THROW_KD_MS = 520;
  const THROW_STAM = 0;
  const THROW_TECH_MS = THROW_STARTUP;
  const THROW_TECH_REC = 160;
  const THROW_TECH_CHANCE = 0.45;
  const THROW_WAKE_INVULN = 80;
  const REVERSAL_STAM = 30;
  const REVERSAL_INVULN = GOLPE_STARTUP;
  const REVERSAL_AI_CD = 1800;
  const REVERSAL_AI_CHANCE = 0.4;
  const FEINT_RECOVERY = 100;
  const FEINT_FX_MS = 55;
  const REVERSAL_FX_MS = 70;
  const WAKE_FX_MS = 65;
  // Riposte commit fleck — between reversal invuln mote and grab clinch puff.
  const RIPOSTE_FX_MS = 75;
  const FEINT_AI_CD = 1800;
  const FEINT_AI_CHANCE = 0.4;
  // Rival AI variety weights (readable personality, not noise).
  const AI_LINK_CHANCE = 0.4;
  const AI_LINK_RANGE_CHANCE = 0.55;
  const AI_CLOSE_GOLPE = 0.32;
  const AI_CLOSE_SLASH = 0.28;
  const AI_CLOSE_BAIT = 0.18;
  const AI_CLOSE_RESET = 0.14;
  // AI close-range super mix leftover (v439): low band of close mix spends.
  // Remainder of close mix stays golpe/slash/bait/reset so harness 0.99 is Space.
  const AI_CLOSE_SUPER = 0.16;
  const AI_POST_RESET = 0.55;
  const AI_BAIT_MS_MIN = 380;
  const AI_BAIT_MS_MAX = 720;
  const AI_RESET_MS = 900;
  const AI_RETREAT_MS_MIN = 220;
  const AI_RETREAT_MS_MAX = 480;
  const AI_MID_DART = 0.72;
  // AI mid-round super mix leftover (v436): high band of the dart roll spends.
  // Remainder of AI_MID_DART stays empty so mid K is not a super robot.
  const AI_MID_SUPER = 0.50;
  const AI_MID_WALK_PAUSE = 0.22;
  const AI_MID_CD_PAUSE = 0.28;
  const AI_MID_CD_RETREAT = 0.18;
  const AI_MID_APPROACH_MS_MIN = 280;
  const AI_MID_APPROACH_MS_MAX = 520;
  const AI_BAIT_FEINT = 0.35;
  // AI opening mix leftover (v435): once-per-round open intent. Remainder
  // (incl. harness 0.99) stays empty so unarmed mid walk-in owns the high roll.
  const AI_OPEN_GOLPE = 0.20;
  const AI_OPEN_SLASH = 0.16;
  const AI_OPEN_DART = 0.12;
  const AI_OPEN_BAIT = 0.10;
  // Answer-dart leftover (v438): high band answers opposing dart (incl. harness 0.99).
  // Empty only — spent still mid/open/cancel. Not a dart robot (BOLT_AI_CD).
  const AI_DART_ANSWER = 0.40;

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
      // Windup tip plant leftover: tip on cocked opaque tip (was empty air 323/55).
      windup: { w: 1186, h: 926, footX: 75,  footY: 921, top: 4, tipX: 359, tipY: 105 },
      // Knife tip plant leftover: tip on raised blade, not helmet (was 359/198).
      throwKnife: { w: 1186, h: 926, footX: 75,  footY: 921, top: 4, tipX: 268, tipY: 109 },
      // Slash tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      slash:  { w: 1186, h: 926, footX: 75,  footY: 921, top: 4, tipX: 991, tipY: 270 },
      // Block tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      // Block steel X plant leftover: steelX on opaque tip (was bodyAABB chest fraction).
      block:  { w: 1186, h: 926, footX: 75,  footY: 921, top: 4, tipY: 105, steelX: 424 },
      hurt:   { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
      walk:   { w: 1186, h: 926, footX: 75,  footY: 921, top: 4 },
    },
    rival: {
      idle:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      // Windup tip plant leftover: tip on cocked opaque tip (was empty air 443/4).
      windup: { w: 877,  h: 945, footX: 729, footY: 940, top: 4, tipX: 738, tipY: 224 },
      // Knife tip plant leftover: tip on forward point, not mid-blade (was 70/383).
      throwKnife: { w: 877,  h: 945, footX: 729, footY: 940, top: 4, tipX: 6, tipY: 384 },
      // Slash tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      slash:  { w: 877,  h: 945, footX: 729, footY: 940, top: 4, tipX: 0, tipY: 338 },
      // Block tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      // Block steel X plant leftover: steelX on opaque tip (was bodyAABB chest fraction).
      block:  { w: 877,  h: 945, footX: 729, footY: 940, top: 4, tipY: 223, steelX: 544 },
      hurt:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
      walk:   { w: 877,  h: 945, footX: 729, footY: 940, top: 4 },
    },
    rivalFlip: {
      idle:   { w: 885,  h: 956, footX: 150, footY: 947, top: 8 },
      // Windup tip plant leftover: tip on cocked opaque tip (was empty air 436/4).
      windup: { w: 885,  h: 956, footX: 150, footY: 947, top: 8, tipX: 141, tipY: 231 },
      // Knife tip plant leftover: tip on forward point, not mid-blade (was 815/390).
      throwKnife: { w: 885,  h: 956, footX: 150, footY: 947, top: 8, tipX: 873, tipY: 391 },
      // Slash tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      slash:  { w: 885,  h: 956, footX: 150, footY: 947, top: 8, tipX: 884, tipY: 338 },
      // Block tip plant leftover: tipY on opaque tip (was bladeBox chest mid).
      // Block steel X plant leftover: steelX on opaque tip (was bodyAABB chest fraction).
      block:  { w: 885,  h: 956, footX: 150, footY: 947, top: 8, tipY: 230, steelX: 335 },
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

  function playSfx(a, opts) {
    if (!a) return;
    try {
      const n = a.cloneNode();
      const base = opts && opts.volume != null ? opts.volume : 0.85;
      n.volume = Math.max(0, Math.min(1, base * (volSfx / 100)));
      if (opts && opts.rate) n.playbackRate = opts.rate;
      n.play();
    } catch (err) {}
  }
  const SFX = {
    whoosh: new Audio("sfx/sfx_whoosh_tajo.wav"),
    riposte: new Audio("sfx/sfx_riposte.wav"),
    cast: new Audio("sfx/sfx_brasa_cast.wav"),
    impacto: new Audio("sfx/sfx_impacto_carne.wav"),
    bloqueo: new Audio("sfx/sfx_bloqueo_acero.wav"),
    choque: new Audio("sfx/sfx_choque_clash.wav"),
    brasaImpacto: new Audio("sfx/sfx_brasa_impacto.wav"),
    brasaBloqueo: new Audio("sfx/sfx_brasa_bloqueo.wav"),
    brasaChoque: new Audio("sfx/sfx_brasa_choque.wav"),
    ko: new Audio("sfx/sfx_ko_caida.wav"),
    knifeThrow: new Audio("sfx/sfx_cuchillo_lanzamiento.wav"),
    uiMenu: new Audio("sfx/sfx_ui_menu.wav"),
  };
  let lastBoltSfx = "";
  let lastBoltConnectSfx = "";
  let lastPushblockSfx = "";
  let lastClashSfx = "";
  let lastThrowTechSfx = "";
  let lastGrabSfx = "";
  let lastRiposteSfx = "";
  let lastGuardBreakSfx = "";
  let lastParrySfx = "";
  let lastFeintSfx = "";
  let lastReversalSfx = "";
  let lastGetupSfx = "";
  let lastPlantSfx = "";
  let lastHoldCutSfx = "";
  let lastLinkSfx = "";
  let lastThrowCommitSfx = "";
  let lastKoSfx = "";
  const MUSIC = {
    title: new Audio("music/music_titulo.ogg"),
    duel: new Audio("music/music_duelo_loop.ogg"),
  };
  try { MUSIC.title.loop = true; MUSIC.duel.loop = true; } catch (err) {}
  let musicUnlocked = false;
  let musicBed = "";
  // Title music pop leftover: hard-cut bed swaps used to pop on KO→over /
  // rematch / Esc→title. Crossfade over MUSIC_FADE_MS. Falling keeps duel.
  const MUSIC_FADE_MS = 320;
  let musicFadeFrom = "";
  let musicFadeT = 0;
  function musicGain() { return Math.max(0, Math.min(1, volMusic / 100)); }
  function musicWant() {
    // Title pages + KO rematch (over) sit on title bed; duel loops in play
    // and through the crumple fall (falling used to map to "" and silence).
    if (mode === "title" || mode === "over") return "title";
    if (mode === "play" || mode === "falling") return "duel";
    return "";
  }
  function musicFadeK() {
    if (musicFadeT <= 0 || MUSIC_FADE_MS <= 0) return 1;
    const u = 1 - Math.max(0, Math.min(1, musicFadeT / MUSIC_FADE_MS));
    return u * u * (3 - 2 * u);
  }
  function bedAudio(bed) {
    if (bed === "title") return MUSIC.title;
    if (bed === "duel") return MUSIC.duel;
    return null;
  }
  function applyMusicVol() {
    // Juice-only. While crossfading, from fades out and to fades in.
    // Settled bed owns full gain; the other stays muted.
    const g = musicGain();
    const k = musicFadeK();
    try {
      if (musicFadeT > 0) {
        const fromA = bedAudio(musicFadeFrom);
        const toA = bedAudio(musicBed);
        if (fromA) fromA.volume = g * (1 - k);
        if (toA && toA !== fromA) toA.volume = g * k;
        if (musicFadeFrom !== "title" && musicBed !== "title") MUSIC.title.volume = 0;
        if (musicFadeFrom !== "duel" && musicBed !== "duel") MUSIC.duel.volume = 0;
      } else {
        MUSIC.title.volume = musicBed === "title" ? g : 0;
        MUSIC.duel.volume = musicBed === "duel" ? g : 0;
      }
    } catch (err) {}
  }
  function unlockAudio() {
    if (musicUnlocked) return;
    musicUnlocked = true;
    applyMusicVol();
    syncMusic(true);
  }
  function syncMusic(force) {
    // Title music pop leftover: bed swaps used to hard-cut (pause one / play
    // the other at full gain) on KO→over, rematch, Esc→title — a pop, not a
    // settle. Crossfade beds over MUSIC_FADE_MS. Falling keeps duel. Same-bed
    // sync stays quiet. Juice-only. destRect/AABB planted.
    const want = musicWant();
    if (!force && want === musicBed && musicFadeT <= 0) return;
    if (want === musicBed) {
      if (musicFadeT > 0) { applyMusicVol(); return; }
      if (!musicUnlocked || !want) { applyMusicVol(); return; }
      try {
        const a = bedAudio(want);
        if (a) {
          a.volume = musicGain();
          const p = a.play();
          if (p && p.catch) p.catch(function () {});
        }
      } catch (err) {}
      applyMusicVol();
      return;
    }
    musicFadeFrom = musicBed;
    musicBed = want;
    musicFadeT = MUSIC_FADE_MS;
    if (!musicUnlocked) { applyMusicVol(); return; }
    try {
      const toA = bedAudio(want);
      if (toA) {
        toA.volume = 0;
        const p = toA.play();
        if (p && p.catch) p.catch(function () {});
      }
      applyMusicVol();
    } catch (err) {}
  }
  function tickMusicFade(dt) {
    // Title music pop leftover: crossfade drains on title / falling / over
    // (not a combat clock). Pause the from-bed only after the fade settles.
    if (musicFadeT <= 0) return;
    musicFadeT = Math.max(0, musicFadeT - dt);
    applyMusicVol();
    if (musicFadeT > 0) return;
    try {
      const fromA = bedAudio(musicFadeFrom);
      if (fromA && musicFadeFrom !== musicBed) fromA.pause();
    } catch (err) {}
    musicFadeFrom = "";
    applyMusicVol();
  }
  function playPushblockSting() {
    // Pushblock sting: pitched/layered block steel + clash scrape so the extra shove reads.
    // Lower+higher bloqueo stack + soft choque — distinct from plain landBlock bloqueo.
    // Normal block keeps the current bloqueo.
    lastPushblockSfx = "pushblock";
    playSfx(SFX.bloqueo, { rate: 0.66, volume: 0.96 });
    playSfx(SFX.bloqueo, { rate: 1.42, volume: 0.54 });
    playSfx(SFX.choque, { rate: 0.50, volume: 0.44 });
  }
  function playClashSting() {
    // Clash sting (crush-stand-in): layered choque so choque reads heavier than a block.
    // doClash still fires the unpitched choque first (bar lock).
    lastClashSfx = "clash";
    playSfx(SFX.choque, { rate: 0.58, volume: 0.52 });
    playSfx(SFX.choque, { rate: 1.26, volume: 0.42 });
  }
  function playThrowTechSting() {
    // Throw-tech sting: pitched choque stack + soft bloqueo so tech reads vs failed throw impacto
    // and plain block bloqueo. landThrowTech still fires the unpitched choque first (bar lock).
    lastThrowTechSfx = "tech";
    playSfx(SFX.choque, { rate: 0.74, volume: 0.88 });
    playSfx(SFX.choque, { rate: 1.34, volume: 0.46 });
    playSfx(SFX.bloqueo, { rate: 1.16, volume: 0.34 });
  }
  function playGrabConnectSting() {
    // Grab-connect sting: pitched impacto so clinch reads vs normal hit impacto and tech choque.
    // landThrow still fires the unpitched impacto first (bar lock).
    lastGrabSfx = "grab";
    playSfx(SFX.impacto, { rate: 0.72, volume: 0.90 });
    playSfx(SFX.impacto, { rate: 1.16, volume: 0.44 });
  }
  function playSuperSting() {
    // Super spend sting: pitched brasa/cast stack so the dump reads. Not tajo whoosh.
    lastBoltSfx = "super";
    playSfx(SFX.cast, { rate: 0.66, volume: 0.92 });
    playSfx(SFX.cast, { rate: 1.38, volume: 0.58 });
    playSfx(SFX.brasaImpacto, { rate: 0.48, volume: 0.42 });
  }
  function playBoltHitSting(spent) {
    // Spent super dart: pitched/layered brasa impacto. Empty dart keeps the current impacto.
    if (spent) {
      lastBoltConnectSfx = "super-hit";
      playSfx(SFX.brasaImpacto, { rate: 0.62, volume: 0.94 });
      playSfx(SFX.brasaImpacto, { rate: 1.26, volume: 0.50 });
    } else {
      lastBoltConnectSfx = "impacto";
      playSfx(SFX.brasaImpacto);
    }
  }
  function playBoltBlockSting(spent) {
    // Spent super dart: pitched/layered brasa bloqueo. Empty dart keeps the current bloqueo.
    if (spent) {
      lastBoltConnectSfx = "super-block";
      playSfx(SFX.brasaBloqueo, { rate: 0.68, volume: 0.92 });
      playSfx(SFX.brasaBloqueo, { rate: 1.22, volume: 0.48 });
    } else {
      lastBoltConnectSfx = "bloqueo";
      playSfx(SFX.brasaBloqueo);
    }
  }
  function playBoltClashSting(spent) {
    // Spent super dart: pitched/layered brasa choque. Empty dart keeps the current choque.
    if (spent) {
      lastBoltConnectSfx = "super-clash";
      playSfx(SFX.brasaChoque, { rate: 0.56, volume: 0.94 });
      playSfx(SFX.brasaChoque, { rate: 1.30, volume: 0.52 });
    } else {
      lastBoltConnectSfx = "choque";
      playSfx(SFX.brasaChoque);
    }
  }
  function playRiposteSpendSting() {
    // Riposte spend: dedicated snappy steel whoosh (sfx_riposte). Sharper than tajo whoosh.
    // Prefer spend over arm-window tick (window already has pad flash + "!").
    lastRiposteSfx = "spend";
    playSfx(SFX.riposte, { volume: 0.92 });
  }
  function playRiposteHitSting() {
    // Riposte connect: punchier flesh — pitched impacto stack. Hitstop ms stay 140.
    lastRiposteSfx = "hit";
    playSfx(SFX.impacto, { rate: 0.88, volume: 0.94 });
    playSfx(SFX.impacto, { rate: 1.22, volume: 0.46 });
  }
  function playParrySting() {
    // Perfect parry: distinct steel — bloqueo pitched higher + light choque.
    // Not normal bloqueo rate, not riposte whoosh.
    lastParrySfx = "parry";
    playSfx(SFX.bloqueo, { rate: 1.48, volume: 0.92 });
    playSfx(SFX.choque, { rate: 1.22, volume: 0.42 });
  }
  function playGuardBreakSting() {
    // Guard-break sting: heavy low bloqueo + soft choque so shatter reads vs chip
    // block bloqueo and pushblock stack. tripGuardBreak owns this (draw/SFX only).
    lastGuardBreakSfx = "break";
    playSfx(SFX.bloqueo, { rate: 0.52, volume: 0.98 });
    playSfx(SFX.bloqueo, { rate: 0.88, volume: 0.48 });
    playSfx(SFX.choque, { rate: 0.62, volume: 0.40 });
  }
  function playFeintSting() {
    // Feint cancel sting: whoosh-down sheath pull + soft bloqueo tip retract.
    // Distinct from slash whoosh (unpitched active), guard-drop silence, parry gleam,
    // and full impacto. Soft — not a hit or tech choque stack.
    lastFeintSfx = "feint";
    playSfx(SFX.whoosh, { rate: 0.66, volume: 0.70 });
    playSfx(SFX.whoosh, { rate: 1.08, volume: 0.28 });
    playSfx(SFX.bloqueo, { rate: 1.18, volume: 0.26 });
  }
  function playReversalSting() {
    // Reversal cancel sting: pitched whoosh-up + soft choque bite.
    // Distinct from golpe whoosh (unpitched active), parry gleam (bloqueo 1.48+choque 1.22),
    // riposte spend, feint whoosh-down, grab impacto, clash, pushblock, tech.
    lastReversalSfx = "reversal";
    playSfx(SFX.whoosh, { rate: 1.32, volume: 0.78 });
    playSfx(SFX.choque, { rate: 0.94, volume: 0.36 });
  }
  function playGetupScrape() {
    // Soft getup foot-scrape: whoosh pitched further down + very quiet bloqueo plant.
    // Matches grit stamp on throw-invuln arm. Distinct from feint sheath (0.66/1.08 + bloqueo 1.18),
    // reversal whoosh-up/choque, parry gleam, riposte, grab impacto, clash, pushblock, tech.
    lastGetupSfx = "getup";
    playSfx(SFX.whoosh, { rate: 0.48, volume: 0.46 });
    playSfx(SFX.bloqueo, { rate: 0.82, volume: 0.14 });
  }

  function playPlantScrape() {
    // Walk / opening / lunge-active plant grit audio sync: soft stone scrape with grit stamp.
    // Quieter + slightly higher whoosh than getup scrape so step/open/lunge plant read vs wakeup.
    // Same soft rates for walk boot and lunge stomp (discreet under tajo whoosh).
    // Distinct from getup (0.48/0.46 + bloqueo 0.82/0.14), feint sheath, KO caida.
    lastPlantSfx = "plant";
    playSfx(SFX.whoosh, { rate: 0.55, volume: 0.30 });
    playSfx(SFX.bloqueo, { rate: 0.74, volume: 0.10 });
  }

  function playHoldCutSting() {
    // Special-cancel K sting: pitched cast bite + layered whoosh raise so cut→dart
    // reads vs idle plant and matches link Space/L raise clarity (v365 / v380).
    // Plain startBolt cast skipped when holdingCutBolt — this sting owns the bite.
    // Distinct from idle cast (unpitched), super spend (cast 0.66/1.38 + brasaImpacto),
    // feint whoosh-down, reversal whoosh-up/choque, getup scrape, knifeThrow plant,
    // playLinkSting (whoosh-only, no cast).
    lastHoldCutSfx = "holdCut";
    playSfx(SFX.cast, { rate: 1.28, volume: 0.72 });
    playSfx(SFX.whoosh, { rate: 0.88, volume: 0.34 });
    // Raise layer (v380): mirror playLinkSting primary whoosh so cancel raise clears.
    playSfx(SFX.whoosh, { rate: 1.12, volume: 0.42 });
  }

  function playLinkSting() {
    // Link/clash cancel Space/L sting: soft whoosh raise into the next cut.
    // Distinct from holdCut cast bite, feint whoosh-down, reversal whoosh-up/choque,
    // riposte spend, plant scrape, getup scrape. Soft — not a hit or tech choque stack.
    lastLinkSfx = "link";
    playSfx(SFX.whoosh, { rate: 1.12, volume: 0.52 });
    playSfx(SFX.whoosh, { rate: 0.78, volume: 0.22 });
  }

  function playThrowCommitSting() {
    // Throw commit sting: soft clinch whoosh so grab press reads vs silent windup.
    // Distinct from grab-connect impacto (landThrow), tech choque stack, slash whoosh
    // (unpitched active), feint sheath (0.66/1.08 + bloqueo 1.18), reversal whoosh-up/
    // choque, link raise (1.12/0.78), holdCut cast, plant scrape. Soft — not a hit.
    lastThrowCommitSfx = "throwCommit";
    playSfx(SFX.whoosh, { rate: 0.84, volume: 0.58 });
    playSfx(SFX.whoosh, { rate: 1.22, volume: 0.26 });
    playSfx(SFX.bloqueo, { rate: 0.96, volume: 0.18 });
  }

  // Yard lazy-load (v423): five courtyard PNGs are ~2–2.5MB each (~6MB
  // decoded RGBA). Boot used to arm all five + every fighter sheet at once,
  // so mobile Brave could drop yard/rival decode while smaller you.png
  // still painted — black fillRect patio + invisible rival. Only the live
  // yardIndex sheet is armed at boot; setYardIndex / rotateYardForContrast
  // / drawCourtyard preload the next (and prev for crossfade). Same paths,
  // no re-encode. Fighter sheets still boot-load.
  const YARD_SRC = {
    yard: "art/courtyard.png",
    yard2: "art/courtyard2.png",
    yard3: "art/courtyard3.png",
    yard4: "art/courtyard4.png",
    yard5: "art/courtyard5.png",
  };
  function bareImg() {
    return new Image();
  }
  const ART = {
    yard: bareImg(),
    yard2: bareImg(),
    yard3: bareImg(),
    yard4: bareImg(),
    yard5: bareImg(),
    you: loadImg("art/you.png?v=304"),
    rival: loadImg("art/rival.png?v=304"),
    rivalFlip: loadImg("art/rival_flip.png?v=304"),
    youWindup: loadImg("art/you_windup.png?v=304"),
    youThrowKnife: loadImg("art/you_throw_knife.png?v=304"),
    youSlash: loadImg("art/you_slash.png?v=304"),
    youBlock: loadImg("art/you_block.png?v=304"),
    rivalWindup: loadImg("art/rival_windup.png?v=304"),
    rivalThrowKnife: loadImg("art/rival_throw_knife.png?v=304"),
    rivalSlash: loadImg("art/rival_slash.png?v=304"),
    rivalBlock: loadImg("art/rival_block.png?v=304"),
    rivalFlipWindup: loadImg("art/rival_flip_windup.png?v=304"),
    rivalFlipThrowKnife: loadImg("art/rival_flip_throw_knife.png?v=304"),
    rivalFlipSlash: loadImg("art/rival_flip_slash.png?v=304"),
    rivalFlipBlock: loadImg("art/rival_flip_block.png?v=304"),
    youHurt: loadImg("art/you_hurt.png?v=304"),
    rivalHurt: loadImg("art/rival_hurt.png?v=304"),
    rivalFlipHurt: loadImg("art/rival_flip_hurt.png?v=304"),
    youWalk: loadImg("art/you_walk.png?v=304"),
    rivalWalk: loadImg("art/rival_walk.png?v=304"),
    rivalFlipWalk: loadImg("art/rival_flip_walk.png?v=304"),
  };

  const keys = new Set();

  const BIND_ACTIONS = ["left", "right", "guard", "slash", "golpe", "dart"];
  const DEFAULT_BINDS = {
    left: ["KeyA"],
    right: ["KeyD"],
    guard: ["KeyS"],
    slash: ["Space", "KeyJ"],
    golpe: ["KeyL"],
    dart: ["KeyK"],
  };
  const DEFAULT_CODE_ACTION = {
    KeyA: "left",
    KeyD: "right",
    KeyS: "guard",
    Space: "slash",
    KeyJ: "slash",
    KeyL: "golpe",
    KeyK: "dart",
  };
  const DEFAULT_PAD = {
    left: ["axis-0-", "btn-14"],
    right: ["axis-0+", "btn-15"],
    guard: ["btn-4"],
    slash: ["btn-0"],
    golpe: ["btn-2"],
    dart: ["btn-3"],
  };
  const RESERVED_CODES = new Set([
    "Escape", "KeyR", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
    "Enter", "KeyW", "KeyS", "MetaLeft", "MetaRight", "ControlLeft", "ControlRight",
    "AltLeft", "AltRight", "ShiftLeft", "ShiftRight", "CapsLock", "Tab",
  ]);
  const LS_BINDS = "vispera.binds.v1";
  const LS_PAD = "vispera.pad.v1";
  const LS_VOL = "vispera.vol.v1";
  const LS_YARD = "vispera.yard.v1";
  const YARD_KEYS = ["yard", "yard2", "yard3", "yard4", "yard5"];
  const yardSrcArmed = Object.create(null);
  function ensureYard(key) {
    const k = (key && YARD_SRC[key]) ? key : "yard";
    const im = ART[k];
    if (!im) return im;
    if (!yardSrcArmed[k]) {
      im.src = YARD_SRC[k];
      yardSrcArmed[k] = 1;
    }
    return im;
  }
  function ensureYardIndex(i) {
    const n = YARD_KEYS.length;
    const ix = Math.max(0, Math.min(n - 1, i | 0));
    return ensureYard(YARD_KEYS[ix] || "yard");
  }

  function cloneBinds(src) {
    const out = {};
    for (const a of BIND_ACTIONS) out[a] = (src[a] || DEFAULT_BINDS[a]).slice();
    return out;
  }
  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const v = JSON.parse(raw);
      return v && typeof v === "object" ? v : fallback;
    } catch (err) {
      return fallback;
    }
  }
  function saveJson(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (err) {}
  }
  function sanitizeBinds(raw) {
    const out = cloneBinds(DEFAULT_BINDS);
    if (!raw || typeof raw !== "object") return out;
    for (const a of BIND_ACTIONS) {
      const list = raw[a];
      if (!Array.isArray(list) || !list.length) continue;
      const codes = [];
      for (const c of list) {
        if (typeof c === "string" && c && !RESERVED_CODES.has(c) && codes.indexOf(c) < 0) codes.push(c);
      }
      if (codes.length) out[a] = codes;
    }
    return out;
  }
  function sanitizePad(raw) {
    const out = cloneBinds(DEFAULT_PAD);
    if (!raw || typeof raw !== "object") return out;
    for (const a of BIND_ACTIONS) {
      const list = raw[a];
      if (!Array.isArray(list) || !list.length) continue;
      const codes = [];
      for (const c of list) {
        if (typeof c === "string" && c && codes.indexOf(c) < 0) codes.push(c);
      }
      if (codes.length) out[a] = codes;
    }
    return out;
  }
  let binds = sanitizeBinds(loadJson(LS_BINDS, null));
  const gpHeld = Object.create(null);
  let padBinds = sanitizePad(loadJson(LS_PAD, null));
  const volStored = loadJson(LS_VOL, null) || {};
  let volMusic = (volStored && typeof volStored.music === "number") ? Math.max(0, Math.min(100, volStored.music | 0)) : 80;
  let volSfx = (volStored && typeof volStored.sfx === "number") ? Math.max(0, Math.min(100, volStored.sfx | 0)) : 60;
  function persistVol() { saveJson(LS_VOL, { music: volMusic, sfx: volSfx }); applyMusicVol(); }
  function persistBinds() { saveJson(LS_BINDS, binds); }
  function persistPad() { saveJson(LS_PAD, padBinds); }

  function actionOfCode(code) {
    for (const a of BIND_ACTIONS) {
      const list = binds[a];
      for (let i = 0; i < list.length; i++) if (list[i] === code) return a;
    }
    return null;
  }
  function actionHeld(action) {
    if (gpHeld[action]) return true;
    const list = binds[action] || [];
    for (let i = 0; i < list.length; i++) if (keys.has(list[i])) return true;
    // Touch on-screen pad: fixed default zones in v1 (do not remap).
    const defs = DEFAULT_BINDS[action] || [];
    for (let i = 0; i < defs.length; i++) {
      const c = defs[i];
      if ((padHoldN[c] || 0) > 0) return true;
    }
    // Stick mirrors KeyA/KeyD via feedKey; require the key still in `keys`
    // so freezeYouAI / Esc keys.clear() drops walk (stickHeld alone must not
    // leak). resetRound re-feeds from stickHeld after Esc→JUGAR.
    if (action === "left" && stickHeldA && keys.has("KeyA")) return true;
    if (action === "right" && stickHeldD && keys.has("KeyD")) return true;
    return false;
  }
  function applyActionEdge(act) {
    // Chords resolve by ACTION after remap, not raw keys.
    // Space+S throw, L+S reversal, etc. — same verbs.
    // Slash startup: tap S is feint, not throw. Idle hold-S tap-Space still throws.
    if (act === "guard") {
      if (canFeint(player)) feintEdge = true;
      else if (actionHeld("slash")) throwEdge = true;
    } else if (act === "slash") {
      if (actionHeld("guard")) throwEdge = true;
      else attackEdge = true;
    } else if (act === "golpe") {
      if (actionHeld("guard")) reversalEdge = true;
      else golpeEdge = true;
    } else if (act === "dart") {
      boltEdge = true;
    }
  }
  function bindPrimary(action) {
    const list = binds[action] || [];
    return list[0] || (DEFAULT_BINDS[action] && DEFAULT_BINDS[action][0]) || "";
  }
  function codeLabel(code) {
    if (!code) return "?";
    if (code === "Space") return "ESPACIO";
    if (code === "BracketLeft") return "[";
    if (code === "BracketRight") return "]";
    if (code.indexOf("Key") === 0 && code.length === 4) return code.slice(3);
    if (code.indexOf("Digit") === 0) return code.slice(5);
    if (code.indexOf("Arrow") === 0) return code.slice(5).toUpperCase();
    return code.toUpperCase();
  }
  function setBindCode(action, code) {
    if (!BIND_ACTIONS.includes(action)) return false;
    if (!code || RESERVED_CODES.has(code)) return false;
    if (code === "ShiftLeft" || code === "ShiftRight") return false;
    // Versus P2 remap leftover (v433): refuse P2-owned codes (no seat steal).
    if (typeof p2OwnsCode === "function" && p2OwnsCode(code)) {
      padMsg = "P2 USA";
      padMsgT = 900;
      return false;
    }
    // Swap if occupied.
    let other = null;
    for (const a of BIND_ACTIONS) {
      if (a === action) continue;
      const ix = binds[a].indexOf(code);
      if (ix >= 0) { other = a; binds[a].splice(ix, 1); if (!binds[a].length) binds[a] = DEFAULT_BINDS[a].slice(); break; }
    }
    const prev = binds[action][0];
    binds[action] = [code];
    // Keep KeyJ as slash alias only while slash still defaults include it via explicit assign.
    // Spec: if user remaps Tajo, J leaves unless assigned.
    if (other && prev && binds[other].indexOf(prev) < 0 && prev !== code) {
      // After taking `code` from other, give other our previous primary (swap).
      binds[other] = [prev];
    }
    persistBinds();
    playSfx(SFX.uiMenu, { volume: 0.55 });
    return true;
  }
  function setPadBind(action, code) {
    if (!BIND_ACTIONS.includes(action)) return false;
    if (!code) return false;
    let other = null;
    let prev = padBinds[action][0];
    for (const a of BIND_ACTIONS) {
      if (a === action) continue;
      const ix = padBinds[a].indexOf(code);
      if (ix >= 0) { other = a; padBinds[a].splice(ix, 1); if (!padBinds[a].length) padBinds[a] = DEFAULT_PAD[a].slice(); break; }
    }
    padBinds[action] = [code];
    if (other && prev && prev !== code) padBinds[other] = [prev];
    persistPad();
    playSfx(SFX.uiMenu, { volume: 0.55 });
    return true;
  }
  function resetBindsDefaults() {
    binds = cloneBinds(DEFAULT_BINDS);
    padBinds = cloneBinds(DEFAULT_PAD);
    p2Binds = cloneP2Binds(DEFAULT_P2_BINDS);
    try { localStorage.removeItem(LS_BINDS); } catch (err) {}
    try { localStorage.removeItem(LS_PAD); } catch (err) {}
    try { localStorage.removeItem(LS_P2_BINDS); } catch (err) {}
  }
  let remapCapture = null; // { kind:"kb"|"pad"|"kb_p2", action }
  let padMsgT = 0;
  let padMsg = "";
  function padCodeActive(gp, code) {
    if (!gp || !code) return false;
    if (code.indexOf("btn-") === 0) {
      const i = +code.slice(4);
      const b = gp.buttons && gp.buttons[i];
      return !!(b && (b.pressed || (b.value|0) > 0.5 || b.value > 0.5));
    }
    if (code === "axis-0-") return ((gp.axes && gp.axes[0]) || 0) <= -0.55;
    if (code === "axis-0+") return ((gp.axes && gp.axes[0]) || 0) >= 0.55;
    return false;
  }

  function gamepadAt(index) {
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : null;
      if (!pads || index < 0 || index >= pads.length) return null;
      return pads[index] || null;
    } catch (err) {}
    return null;
  }

  function firstGamepad() {
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : null;
      if (!pads) return null;
      for (let i = 0; i < pads.length; i++) if (pads[i]) return pads[i];
    } catch (err) {}
    return null;
  }

  function secondGamepad() {
    // Versus local P2 pad seat (v429): prefer index 1; else the second non-null
    // pad after firstGamepad's seat. Poll wiring stays P1-first until versus.
    const at1 = gamepadAt(1);
    if (at1) return at1;
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : null;
      if (!pads) return null;
      let seen = 0;
      for (let i = 0; i < pads.length; i++) {
        if (!pads[i]) continue;
        seen++;
        if (seen === 2) return pads[i];
      }
    } catch (err) {}
    return null;
  }

  function p2ActionHeld(action) {
    const list = p2Binds[action] || DEFAULT_P2_BINDS[action] || [];
    for (let i = 0; i < list.length; i++) if (keys.has(list[i])) return true;
    // Versus local 2P playable unlock leftover (v430): second pad was unread —
    // teclado-only seat. Soft: poll secondGamepad with DEFAULT_PAD mirrors.
    const gp = secondGamepad();
    if (gp) {
      const plist = DEFAULT_PAD[action] || [];
      for (let j = 0; j < plist.length; j++) {
        if (padCodeActive(gp, plist[j])) return true;
      }
    }
    return false;
  }

  function pollGamepadPlay() {
    if (remapCapture && remapCapture.kind === "pad") return;
    const gp = firstGamepad();
    for (let i = 0; i < BIND_ACTIONS.length; i++) {
      const a = BIND_ACTIONS[i];
      const list = padBinds[a] || [];
      let on = false;
      if (gp) {
        for (let j = 0; j < list.length; j++) {
          if (padCodeActive(gp, list[j])) { on = true; break; }
        }
      }
      const was = !!gpHeld[a];
      gpHeld[a] = on;
      if (on && !was && mode !== "title") applyActionEdge(a);
    }
  }

  let requestRestart = false;
  let requestStart = false;
  let attackEdge = false;
  let golpeEdge = false;
  let boltEdge = false;
  let throwEdge = false;
  let reversalEdge = false;
  let feintEdge = false;
  let bolt = null;
  let sfxUnlocked = false;
  let lastWalkCode = "";
  let walkHeldA = false;
  let walkHeldD = false;
  let pushblockBuf = 0;

  function unlockSfx() {
    unlockAudio();
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
    if (c === "Space" || c === "KeyA" || c === "KeyD" || c === "KeyJ" || c === "KeyR" || c === "KeyS" || c === "KeyK" || c === "KeyL" || c === "KeyO" || c === "KeyP" || c === "BracketLeft" || c === "ArrowUp" || c === "ArrowDown" || c === "ArrowLeft" || c === "ArrowRight" || c === "Enter" || c === "KeyW" || c === "Escape") {
      e.preventDefault();
    }
    if (e.repeat) return;
    unlockSfx();
    if (mode === "title") {
      if (remapCapture && remapCapture.kind === "kb") {
        if (c === "Escape" || c === "Enter") {
          remapCapture = null;
          return;
        }
        if (RESERVED_CODES.has(c)) return;
        if (c === "ShiftLeft" || c === "ShiftRight" || c === "ControlLeft" || c === "ControlRight" || c === "AltLeft" || c === "AltRight" || c === "MetaLeft" || c === "MetaRight") return;
        if (setBindCode(remapCapture.action, c)) remapCapture = null;
        return;
      }
      if (remapCapture && remapCapture.kind === "kb_p2") {
        if (c === "Escape" || c === "Enter") {
          remapCapture = null;
          return;
        }
        if (P2_RESERVED_CODES.has(c)) return;
        if (c === "ShiftLeft" || c === "ShiftRight" || c === "ControlLeft" || c === "ControlRight" || c === "AltLeft" || c === "AltRight" || c === "MetaLeft" || c === "MetaRight") return;
        if (setP2BindCode(remapCapture.action, c)) remapCapture = null;
        return;
      }
      if (c === "Escape") {
        handleTitleBack();
        return;
      }
      const menuKey = c === "ArrowUp" || c === "ArrowDown" || c === "ArrowLeft" || c === "ArrowRight" || c === "Enter" || c === "Space" || c === "KeyW" || c === "KeyS";
      if (menuKey) {
        handleTitleKey(c);
        return;
      }
      return;
    }
    // KO Esc→title handoff leftover (v417): Escape during falling/over used to
    // no-op (only play called goTitleFromPlay), so crumple + REVANCHA trapped
    // you with Space/R rematch only — no title exit from the KO handoff. Soft:
    // Esc on falling/over also goTitleFromPlay (same as mid-play). Space/R
    // rematch kept. Mid-play Esc unchanged.
    if ((mode === "play" || mode === "falling" || mode === "over") && c === "Escape") {
      goTitleFromPlay();
      return;
    }
    if (e.__pad) {
      // Touch zones are fixed in v1 — always the default verbs, even after kb remap.
      keys.add(c);
      const act = DEFAULT_CODE_ACTION[c];
      if (act) applyActionEdge(act);
      return;
    }
    keys.add(c);
    if (c === "KeyR") requestRestart = true;
    // Action layer: chords by ACTION (guard+slash throw, guard+golpe reversal).
    // Defaults still KeyA/KeyD/KeyS/Space/KeyJ/KeyL/KeyK — remap swaps codes.
    const act = actionOfCode(c);
    if (act) applyActionEdge(act);
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.code);
  });

  /* Pad: landscape under canvas, portrait in the bottom letterbox. Same keys as teclado.
     Coarse or a real touch shows it. Stick horizontal feeds KeyA/KeyD. Hold S, tap Space/L/K.
     Hold S + tap Space is the throw chord in range. Hold S + tap L is the reversal chord (not throw).
     Tap tajo then tap guarda during slash startup is feint (not throw).
     Keyboard path stays the verb table. Vertical stick does nothing.
     Portrait stick leftover: follow on window while stickPtr is live so the
     thumb can leave the thin letterbox strip. Capture loss does not dump A/D.
     Pad zone slide-off leftover: capture loss does not dump zone holds (padByPtr).
     Window pointerup / pointercancel still release. */
  let padShown = false;
  const padHoldN = Object.create(null);
  const padByPtr = new Map();
  // Stick/pad release linger leftover (v355): tap zones keep .held briefly after lift.
  const padTapLinger = new Map();
  const STICK_DEAD = 0.28;
  let stickPtr = null;
  let stickEl = null;
  let stickHeldA = false;
  let stickHeldD = false;
  // Stick-knob release linger (v355): ease dx/dy → 0 over WALK_SETTLE_MS (visual).
  let stickKnobDx = 0;
  let stickKnobDy = 0;
  let stickKnobFromDx = 0;
  let stickKnobFromDy = 0;
  let stickKnobEaseT = 0;
  // Stick .held chrome linger (v356): keep held chrome while knob eases home.
  let stickEaseEl = null;
  let titlePage = "root";
  let titleSel = 0;
  let menuHits = [];
  // Online / versus 2P scaffolding leftover (v427): match seat + ready stubs.
  // JUGAR keeps cpu; VERSUS unlocked (v430). Online stub leftover (v434):
  // ONLINE root row locked until ONLINE_2P_READY (net path still reserved).
  let matchKind = "cpu"; // "cpu" | "versus" | "online"
  const VERSUS_2P_READY = true;
  const ONLINE_2P_READY = false;
  // Roster / character differentiation hooks leftover (v437): fighterId + ROSTER
  // (roan ready; cid second-fighter stub locked). setP*FighterId refuses !ready.
  // No new root menu row.
  // Roster select path leftover (v440): let so harness can flip the unlock;
  // titlePage "roster" + beginMatchFromTitle gate the select.
  // Roster select unlock leftover (v441): default true — JUGAR/VERSUS enter
  // ELEGIR (faces + kind chip). Harness may still force false for locked-path locks.
  // Second fighter stub / CID unlock leftover (v442): CID ready; DEFAULT_P2 cid
  // (rival sheets). Art keys off fighterId. Harness may still force !ready.
  let ROSTER_SELECT_READY = true;
  let pendingMatchKind = "cpu"; // "cpu" | "versus" | "online" while on roster
  const DEFAULT_P1_FIGHTER_ID = "roan";
  const DEFAULT_P2_FIGHTER_ID = "cid";
  // Roster face crop polish leftover (v443): head boxes (you 1186×926 / rival 877×945).
  // CID/ROAN move kit leftover (v445): art tip already shorts CID HOLD ~40px;
  // kit makes that identity (CORTO walk+golpe pocket vs ROAN LARGO baseline).
  const ROSTER = [
    { id: "roan", label: "ROAN", ready: true, kit: "LARGO", walk: 240, golpeLunge: 18, slashLunge: 44, face: { sx: 80, sy: 100, sw: 400, sh: 400 } },
    { id: "cid", label: "CID", ready: true, kit: "CORTO", walk: 288, golpeLunge: 28, slashLunge: 28, face: { sx: 350, sy: 220, sw: 260, sh: 260 } },
  ];
  let p1FighterId = DEFAULT_P1_FIGHTER_ID;
  let p2FighterId = DEFAULT_P2_FIGHTER_ID;
  function rosterEntry(id) {
    if (!id) return null;
    for (let i = 0; i < ROSTER.length; i++) if (ROSTER[i].id === id) return ROSTER[i];
    return null;
  }
  // CID/ROAN move kit leftover (v445): per-fighterId walk / golpe lunge.
  function walkSpeed(f) {
    const e = rosterEntry(f && f.fighterId);
    if (e && e.walk != null) return e.walk;
    return WALK;
  }
  function golpeLungeOf(f) {
    const e = rosterEntry(f && f.fighterId);
    if (e && e.golpeLunge != null) return e.golpeLunge;
    return GOLPE_LUNGE_PX;
  }
  // CID/ROAN Space slash-lunge kit leftover (v446): per-fighterId Space lunge.
  // CID/ROAN Space HOLD meaty-pad kit leftover (v447): meaty/threat pads ride slashLungeOf.
  // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe meaty pads ride golpeLungeOf.
  // CID/ROAN L golpe inThreat/stam-threat kit leftover (v449): live golpe threat pads ride golpeLungeOf.
  function slashLungeOf(f) {
    const e = rosterEntry(f && f.fighterId);
    if (e && e.slashLunge != null) return e.slashLunge;
    return LUNGE_PX;
  }
  function setP1FighterId(id) {
    const e = rosterEntry(id);
    if (!e) return false;
    // Second fighter stub / CID unlock leftover (v442): refuse !ready only
    // (CID ready). Dress seat art to the chosen fighterId family.
    if (!e.ready) return false;
    p1FighterId = e.id;
    if (player) {
      player.fighterId = p1FighterId;
      dressFighter(player);
    }
    return true;
  }
  function setP2FighterId(id) {
    const e = rosterEntry(id);
    if (!e) return false;
    if (!e.ready) return false;
    p2FighterId = e.id;
    if (rival) {
      rival.fighterId = p2FighterId;
      dressFighter(rival);
    }
    return true;
  }
  function rosterCount() { return ROSTER.length + 1; } // + VOLVER
  function rosterSelIndex() {
    for (let i = 0; i < ROSTER.length; i++) if (ROSTER[i].id === p1FighterId) return i;
    return 0;
  }
  // Roster select path leftover (v440) / unlock (v441): when ready, park on roster before start.
  function beginMatchFromTitle(kind) {
    const k = kind === "versus" || kind === "online" ? kind : "cpu";
    if (ROSTER_SELECT_READY) {
      pendingMatchKind = k;
      titlePage = "roster";
      titleSel = rosterSelIndex();
      return;
    }
    matchKind = k;
    requestStart = true;
  }
  // Versus local 2P playable unlock leftover (v430): P2 teclado seat when
  // matchKind versus. Arrows walk/guard; O tajo; P golpe; [ dardo. Pad slot 2
  // via secondGamepad in p2ActionHeld (DEFAULT_PAD). VERSUS_2P_READY true.
  const DEFAULT_P2_BINDS = {
    left: ["ArrowLeft"],
    right: ["ArrowRight"],
    guard: ["ArrowDown"],
    slash: ["KeyO"],
    golpe: ["KeyP"],
    dart: ["BracketLeft"],
  };
  // Versus P2 remap leftover (v433): mutable P2 teclado binds (defaults above).
  // Menu / rematch reserved stay off-limits; ArrowLeft/Right/Down stay assignable
  // (P2 seat defaults). P1-owned codes rejected so seats do not collide.
  const LS_P2_BINDS = "vispera.p2binds.v1";
  const P2_RESERVED_CODES = new Set([
    "Escape", "KeyR", "ArrowUp", "Enter", "KeyW",
    "MetaLeft", "MetaRight", "ControlLeft", "ControlRight",
    "AltLeft", "AltRight", "ShiftLeft", "ShiftRight", "CapsLock", "Tab",
  ]);
  function cloneP2Binds(src) {
    const out = {};
    for (const a of BIND_ACTIONS) out[a] = (src[a] || DEFAULT_P2_BINDS[a]).slice();
    return out;
  }
  function sanitizeP2Binds(raw) {
    const out = cloneP2Binds(DEFAULT_P2_BINDS);
    if (!raw || typeof raw !== "object") return out;
    for (const a of BIND_ACTIONS) {
      const list = raw[a];
      if (!Array.isArray(list) || !list.length) continue;
      const codes = [];
      for (const c of list) {
        if (typeof c === "string" && c && !P2_RESERVED_CODES.has(c) && codes.indexOf(c) < 0) codes.push(c);
      }
      if (codes.length) out[a] = codes;
    }
    return out;
  }
  let p2Binds = sanitizeP2Binds(loadJson(LS_P2_BINDS, null));
  function persistP2Binds() { saveJson(LS_P2_BINDS, p2Binds); }
  function p2BindPrimary(action) {
    const list = p2Binds[action] || [];
    return list[0] || (DEFAULT_P2_BINDS[action] && DEFAULT_P2_BINDS[action][0]) || "";
  }
  function p2OwnsCode(code) {
    for (const a of BIND_ACTIONS) {
      const list = p2Binds[a] || [];
      for (let i = 0; i < list.length; i++) if (list[i] === code) return a;
    }
    return null;
  }
  function setP2BindCode(action, code) {
    if (!BIND_ACTIONS.includes(action)) return false;
    if (!code || P2_RESERVED_CODES.has(code)) return false;
    if (code === "ShiftLeft" || code === "ShiftRight") return false;
    // Soft: refuse P1-owned codes (no seat steal).
    if (actionOfCode(code)) {
      padMsg = "P1 USA";
      padMsgT = 900;
      return false;
    }
    let other = null;
    for (const a of BIND_ACTIONS) {
      if (a === action) continue;
      const ix = p2Binds[a].indexOf(code);
      if (ix >= 0) { other = a; p2Binds[a].splice(ix, 1); if (!p2Binds[a].length) p2Binds[a] = DEFAULT_P2_BINDS[a].slice(); break; }
    }
    const prev = p2Binds[action][0];
    p2Binds[action] = [code];
    if (other && prev && p2Binds[other].indexOf(prev) < 0 && prev !== code) {
      p2Binds[other] = [prev];
    }
    persistP2Binds();
    playSfx(SFX.uiMenu, { volume: 0.55 });
    return true;
  }
  const p2Held = { left: false, right: false, guard: false, slash: false, golpe: false, dart: false };
  // Versus fair-open leftover (v431): P2 opening buffers (mirror P1 openBuf /
  // golpeBuf / openBoltBuf). Arm mid-measure; flush after open with hold-gate.
  let p2OpenBuf = false;
  let p2OpenGolpeBuf = false;
  let p2OpenBoltBuf = false;

  function revealPad() {
    if (padShown) return;
    const body = document.body;
    if (!body || !body.classList) return;
    padShown = true;
    body.classList.add("touch-on");
  }

  function feedKey(code, down) {
    const type = down ? "keydown" : "keyup";
    const ev = new KeyboardEvent(type, { code: code, bubbles: true, cancelable: true });
    try { ev.__pad = true; } catch (err) {}
    window.dispatchEvent(ev);
  }

  function padChordHeld() {
    // Touch zones fixed: hold guarda + tap tajo — same Space+S throw as teclado.
    return actionHeld("guard") && actionHeld("slash");
  }

  function padMarkChordLook() {
    // Pressed look on both guarda and tajo while the chord is held.
    padByPtr.forEach((v) => {
      if (!v || !v.el || !v.el.classList) return;
      if (v.code === "KeyS" || v.code === "Space" || v.code === "KeyJ") v.el.classList.add("held");
    });
  }

  function padZoneIsHold(code, el) {
    // Hold-guarda stays honest: KeyS / data-hold drop .held on real lift.
    if (code === "KeyS") return true;
    if (el && typeof el.getAttribute === "function" && el.getAttribute("data-hold")) return true;
    return false;
  }

  function padDown(code, pointerId, el) {
    if (padByPtr.has(pointerId)) return;
    // Stick/pad release linger leftover: re-press during tap linger restarts cleanly.
    if (el) padTapLinger.delete(el);
    const isHold = padZoneIsHold(code, el);
    padByPtr.set(pointerId, { code: code, el: el, isHold: isHold });
    if (el && el.classList) el.classList.add("held");
    padHoldN[code] = (padHoldN[code] || 0) + 1;
    if (padHoldN[code] === 1) {
      feedKey(code, true);
      // Touch pad v1: fixed zone → action (not remapped).
      const tact = DEFAULT_CODE_ACTION[code];
      if (tact && mode === "play") applyActionEdge(tact);
    }
    if (padChordHeld()) {
      // Hold-guarda + tap-tajo: same Space+S throw as teclado.
      padMarkChordLook();
      if (mode === "play" && !throwInRange()) throwEdge = false;
    }
  }

  function padUp(pointerId) {
    stickRelease(pointerId);
    const h = padByPtr.get(pointerId);
    if (!h) return;
    padByPtr.delete(pointerId);
    let still = false;
    padByPtr.forEach((v) => { if (v.el === h.el) still = true; });
    padHoldN[h.code] = Math.max(0, (padHoldN[h.code] || 0) - 1);
    if (padHoldN[h.code] === 0) feedKey(h.code, false);
    // Stick/pad release linger leftover: data-tap keep .held briefly; KeyS dumps now.
    if (h.el && h.el.classList && !still) {
      if (h.isHold) {
        padTapLinger.delete(h.el);
        h.el.classList.remove("held");
      } else {
        padTapLinger.set(h.el, GUARD_RAISE_MS);
      }
    }
  }

  function tickPadTapLinger(dt) {
    if (padTapLinger.size === 0) return;
    const dead = [];
    padTapLinger.forEach((t, el) => {
      const n = t - dt;
      if (n <= 0) dead.push(el);
      else padTapLinger.set(el, n);
    });
    for (let i = 0; i < dead.length; i++) {
      const el = dead[i];
      padTapLinger.delete(el);
      let still = false;
      padByPtr.forEach((v) => { if (v.el === el) still = true; });
      if (!still && el && el.classList) el.classList.remove("held");
    }
  }

  window.addEventListener("pointerdown", (e) => {
    unlockSfx();
    if (e && e.pointerType === "touch") revealPad();
  });
  window.addEventListener("touchstart", () => {
    revealPad();
  }, { passive: true });

  if (canvas && typeof canvas.addEventListener === "function") {
    canvas.addEventListener("pointerdown", (e) => {
      unlockSfx();
      if (mode === "over") requestStart = true;
      else if (mode === "title") titlePointer(e);
    });
  }

  function bindPad() {
    const pad = document.getElementById("pad");
    if (!pad || typeof pad.addEventListener !== "function") return;
    const eat = (e) => { if (e && e.cancelable) e.preventDefault(); };
    const eatFight = (e) => {
      if (padByPtr.size === 0 && stickPtr == null) return;
      eat(e);
    };
    pad.addEventListener("pointerdown", (e) => {
      eat(e);
      const st = e.target && e.target.closest ? e.target.closest(".stick") : null;
      if (st && (!pad.contains || pad.contains(st))) {
        stickPointerDown(e, st);
        return;
      }
      const z = e.target && e.target.closest ? e.target.closest(".zone") : null;
      if (!z || (pad.contains && !pad.contains(z))) return;
      unlockSfx();
      revealPad();
      const code = z.getAttribute("data-hold") || z.getAttribute("data-tap");
      if (!code) return;
      try { z.setPointerCapture(e.pointerId); } catch (err) {}
      padDown(code, e.pointerId, z);
    }, { passive: false });
    pad.addEventListener("pointermove", (e) => {
      eat(e);
      stickPointerMove(e);
    }, { passive: false });
    const up = (e) => { padUp(e.pointerId); };
    pad.addEventListener("pointerup", up);
    pad.addEventListener("pointercancel", up);
    pad.addEventListener("lostpointercapture", (e) => {
      // Portrait stick leftover: capture loss used to dump A/D when the thumb
      // left the thin letterbox strip onto the canvas. Window pointerup still
      // releases. Capture loss does not dump the stick.
      // Pad zone slide-off leftover: hold-guarda dumps on lostpointercapture when
      // the thumb drifts off the zone. Keep padByPtr holds while still down;
      // window pointerup / pointercancel still release. Stick has no padByPtr row.
      if (stickPtr != null && e.pointerId === stickPtr) return;
      if (padByPtr.has(e.pointerId)) return;
      padUp(e.pointerId);
    });
    pad.addEventListener("contextmenu", eat);
    pad.addEventListener("touchstart", eat, { passive: false });
    pad.addEventListener("touchmove", eat, { passive: false });
    pad.addEventListener("touchend", eat, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("pointermove", (e) => {
      // Portrait stick leftover: pad-local move used to freeze the stick
      // the tick the thumb left the strip. Follow while stickPtr is live.
      if (stickPtr == null) return;
      eat(e);
      stickPointerMove(e);
    }, { passive: false });
    window.addEventListener("touchmove", eatFight, { passive: false });
    window.addEventListener("gesturestart", eat, { passive: false });
  }

  try {
    bindPad();
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) revealPad();
  } catch (err) {}

  function worldScale() {
    return YOU_H / DESIGN.you.h;
  }

  // Second fighter stub / CID unlock leftover (v442): sheets follow fighterId
  // (roan→you family; cid→rival/rivalFlip by facing). Seat kind still drives
  // input/AI; no youFlip so roan stays the left-facing family.
  function fighterUsesCidArt(f) {
    if (!f) return false;
    if (f.fighterId === "cid") return true;
    if (f.fighterId === "roan") return false;
    // Harness / partial seats without fighterId: keep seat-kind fallback.
    return f.kind === "rival";
  }

  // CID/ROAN you-family P2 facing flip leftover (v450): no youFlip art — when
  // you-family faces left, mirror pose markers about footX and flip draw.
  function sheetFlipX(f) {
    return !!(f && !fighterUsesCidArt(f) && f.facing < 0);
  }
  function poseMarkLocalX(f, d, x) {
    if (x == null || !d) return x;
    if (!sheetFlipX(f)) return x;
    return 2 * d.footX - x;
  }
  function poseMarkWorldX(f, d, localX, r, s) {
    const lx = poseMarkLocalX(f, d, localX);
    if (lx == null) return null;
    return r.dx + lx * s;
  }
  function sheetEdgeTipWorldX(f, d, r, s) {
    // you-family faces left via flip: forward edge is the mirrored right edge.
    if (sheetFlipX(f) && d) return r.dx + poseMarkLocalX(f, d, d.w - 8) * s;
    return f.facing > 0 ? r.dx + r.dw - 8 : r.dx + 8;
  }

  function sheetOf(f) {
    if (!fighterUsesCidArt(f)) return DESIGN.you;
    return f.facing > 0 ? DESIGN.rivalFlip : DESIGN.rival;
  }

  function dressFighter(f) {
    if (!f) return;
    if (fighterUsesCidArt(f)) f.img = f.facing > 0 ? ART.rivalFlip : ART.rival;
    else f.img = ART.you;
  }

  function dressRival(f) {
    f.facing = -1;
    dressFighter(f);
  }

  function holdingCutBolt(f) {
    return !!(f && f.boltHoldCut && f.boltPhase);
  }

  function poseBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    const wind = !cid ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
    const slash = !cid ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
    const block = !cid ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
    const hurt = !cid ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
    if ((f.falling || f.hp <= 0) && ready(hurt)) return hurt;
    if (f.thrownT > 0 && ready(hurt)) return hurt;
    if (f.guarding && ready(block)) return block;
    if (f.cut === "throw" && (f.phase === "startup" || f.phase === "active" || f.phase === "recovery") && ready(wind)) return wind;
    // Special-cancel K: keep the cut sheet through the 200ms plant and K recovery.
    // Generic bolt startup used to swap slash→windup (idle plant) in one tick;
    // dart birth used to drop boltHoldCut and seat idle breath ~1.5px.
    const throwK = !cid ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
    if (holdingCutBolt(f) && ready(slash)) return slash;
    // Idle/walk K plant: throw_knife sheet (not sword windup). Special-cancel keeps cut.
    if (f.boltPhase === "startup" && ready(throwK)) return throwK;
    if (f.phase === "startup" && ready(wind)) return wind;
    if (f.phase === "active" && ready(slash)) return slash;
    if (f.phase === "recovery" && ready(slash)) return slash;
    if (sheathing(f) && ready(slash)) return slash;
    const walk = !cid ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
    if (gaitWalkOn(f) && ready(walk)) return walk;
    return f.img;
  }

  function poseFamily(f) {
    if (!fighterUsesCidArt(f)) return POSE.you;
    return f.facing > 0 ? POSE.rivalFlip : POSE.rival;
  }

  function poseSheet(f) {
    const fam = poseFamily(f);
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    const wind = !cid ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
    const slash = !cid ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
    const block = !cid ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
    const hurt = !cid ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
    if ((f.falling || f.hp <= 0) && ready(hurt)) return fam.hurt;
    if (f.thrownT > 0 && ready(hurt)) return fam.hurt;
    if (f.guarding && ready(block)) return fam.block;
    if (f.cut === "throw" && (f.phase === "startup" || f.phase === "active" || f.phase === "recovery")) return fam.windup;
    const throwK = !cid ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
    if (holdingCutBolt(f) && ready(slash)) return fam.slash;
    if (f.boltPhase === "startup" && ready(throwK)) return fam.throwKnife;
    if (f.phase === "startup" && ready(wind)) return fam.windup;
    if (f.phase === "active" && ready(slash)) return fam.slash;
    if (f.phase === "recovery" && ready(slash)) return fam.slash;
    if (sheathing(f) && ready(slash)) return fam.slash;
    const walk = !cid ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
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
      // Roster / character differentiation hooks leftover (v437): seat id.
      fighterId: you ? p1FighterId : p2FighterId,
      img: ART.you,
      facing: you ? 1 : -1,
      x: you ? 150 : 1150,
      phase: "idle",
      phaseT: 0,
      cut: "slash",
      cutHit: false,
      linkGolpe: false,
      linkSlash: false,
      linkBolt: false,
      clashRec: false,
      falling: false,
      fallT: 0,
      hp: MAX_HP,
      stamina: STAMINA_MAX,
      stamRegenT: 0,
      stamThreatLockT: 0,
      guardBreakT: 0,
      hudGhost: MAX_HP,
      hudFlashT: 0,
      stamGhost: STAMINA_MAX,
      stamFlashT: 0,
      meterFlashT: 0,
      meterGainT: 0,
      meterFlashKind: "",
      comboN: 0,
      comboT: 0,
      comboPunch: false,
      comboBolt: false,
      wantBlock: false,
      guarding: false,
      guardPoseK: 0,
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
      lungePlantSfx: false,
      walkFadeHold: 0,
      closing: false,
      sheatheT: 0,
      boltPhase: "",
      boltHoldCut: false,
      boltT: 0,
      boltCd: 0,
      throwCd: 0,
      boltArmed: false,
      boltSuper: false,
      meter: 0,
      superArmed: false,
      thrownT: 0,
      throwInvulnT: 0,
      wakeRevFadeHold: 0,
      cutRecBreathT: 0,
      wakeRev: false,
      techRec: false,
      techGuardTip: false,
      leftoverPlantTip: false,
      leftoverPlantTipK: 0,
      feintTipK: 1,
      throwTechArmed: 0,
      reversal: false,
      revCd: 0,
      revArmed: 0,
      wakeRevArmed: 0,
      pbCd: 0,
      pbArmed: 0,
      feintT: 0,
      parryFadeT: 0,
      parryFadeSheet: "",
      parryFadeTipK: 0,
      parryFadeTipKy: 0,
      hurtFadeT: 0,
      feintCd: 0,
      feintArmed: 0,
      telegraph: false,
      clashPlant: false,
      linkPlant: false,
      holdCutPlant: false,
      linkSheathe: 0,
      riposteWindowT: 0,
      riposteArmed: false,
      riposte: false,
      guardRaiseElapsed: 0,
      aiResetT: 0,
      aiBaitT: 0,
      aiRetreatT: 0,
      aiMidApproachT: 0,
      aiSawBlock: false,
      aiFeintRetreat: false,
      aiOpen: "",
      aiOpenArmed: false,
      aiOpenHold: 0,
    };
    // Second fighter stub / CID unlock leftover (v442): dress by fighterId
    // (roan→you; cid→rival family). Rival seat still faces −1.
    if (!you) f.facing = -1;
    dressFighter(f);
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
  // Camera punch end cover settle leftover (v358): rate-limited yard cover.
  let coverShown = 0;
  let coverTick = -1;
  let updateTick = 0;
  let hitstopLeft = 0;
  let hitFlashT = 0;
  let steelFlashT = 0;
  let steelX = 0;
  let steelY = 0;
  let parryGleamT = 0;
  let parryGleamX = 0;
  let parryGleamY = 0;
  let parryGleamHomeYou = true;
  let steelAtkYou = true;
  let steelHomeYou = false;
  let steelWoundDX = 0;
  let steelWoundDY = 0;
  // Guard-break steel sync leftover: tip plant rides wound, not blade∩body mid.
  let steelTipRide = false;
  // Pushblock steel: "push" draws óxido/hueso asterisk; throw-tech "tech" draws hueso/brasa;
  // normal block stays silver.
  let steelKind = "block";
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
  let brasaFxScale = 1;
  let plantDust = [];
  let dmgNums = [];
  let slashBuf = false;
  let golpeBuf = false;
  let boltBuf = false;
  let throwBuf = false;
  let reversalBuf = false;
  let openBuf = false;
  let openBoltBuf = false;
  let yardIndex = (() => {
    const raw = loadJson(LS_YARD, null);
    const n = (raw && typeof raw.index === "number") ? (raw.index | 0) : 0;
    return Math.max(0, Math.min(YARD_KEYS.length - 1, n));
  })();
  ensureYardIndex(yardIndex);
  function persistYard() { saveJson(LS_YARD, { index: yardIndex }); }
  let yardPrevIndex = -1;
  let yardSwitchT = 0;
  function setYardIndex(i) {
    // Yard switch pop leftover: hard-cut used to pop the courtyard under
    // Escenarios the same tick index flipped. Arm crossfade; same yard quiet.
    const next = Math.max(0, Math.min(YARD_KEYS.length - 1, i | 0));
    if (next === yardIndex) return;
    // Preload next (and keep prev armed) before crossfade ticks.
    ensureYardIndex(yardIndex);
    ensureYardIndex(next);
    yardPrevIndex = yardIndex;
    yardSwitchT = YARD_SWITCH_MS;
    yardIndex = next;
    persistYard();
  }
  function yardSwitchK() {
    // Draw-only. 0 = full prev yard, 1 = full next. Smoothstep.
    if (yardSwitchT <= 0 || YARD_SWITCH_MS <= 0) return 1;
    const u = 1 - Math.max(0, Math.min(1, yardSwitchT / YARD_SWITCH_MS));
    return u * u * (3 - 2 * u);
  }
  function rotateYardForContrast() {
    // Rematch contrast: never the same patio back-to-back. +1 cycle so
    // yards 2–5 get airtime (Escenarios picker still sticky on JUGAR).
    const n = YARD_KEYS.length;
    if (n <= 1) return;
    setYardIndex((yardIndex + 1) % n);
  }
  function overTips() {
    // Teach / CONTROLES clarity leftover (v379): OVER tips used to hard-code
    // S/K/L while remap already owned BIND_ACTIONS — wrong key after remap.
    const g = codeLabel(bindPrimary("guard"));
    const k = codeLabel(bindPrimary("dart"));
    const l = codeLabel(bindPrimary("golpe"));
    return [
      "TIP: " + g + " AL FILO → PARRY",
      "TIP: " + k + " DARDO",
      "TIP: " + l + " GOLPE",
    ];
  }
  let overTipI = 0;
  let yardArmed = false;
  let openLeft = 0;
  let koLanded = false;
  let settleT = 0;
  let settleMax = SETTLE_MS;
  let gapEaseT = 0;
  let hintIn = 0;
  let hintFade = 0;
  let hintDone = false;
  let hintAge = 0;
  let hintVerbN = 0;
  const hintVerbs = Object.create(null);

  function armHintFade() {
    if (hintDone && hintFade <= 0) return;
    if (hintFade <= 0) hintFade = HINT_FADE_MS;
    hintDone = true;
  }

  function noteConnect() {
    armHintFade();
  }

  function noteCombo(atk, def) {
    // Sparse multi-connect count. Chain while defender still stunned /
    // falling / thrown from a prior hit. First connect stays silent (1);
    // 2+ arms a brief pixel count near the attacker. Draw-only.
    // Combo ↔ punchCover (v331): punch-mark when 2+ arms so draw can hold
    // peak with cover (same idea as dmgNum punch mark). Alpha only — rise
    // still ages. First connect stays silent (no mark).
    // Special-cancel combo counter leftover (v424): holdCut Space→K plant used
    // to land after leftover hitstun died (280 rec late door + 200 startup),
    // so stunT 0 restarted the count while golpe→K still chained. comboBolt
    // keeps that cancel string for one land; cleared here. Clash/idle K stay
    // stun-gated.
    if (!atk || !def) return;
    const chain = atk.comboN > 0 && (def.stunT > 0 || def.falling || (def.thrownT || 0) > 0 || atk.comboBolt);
    atk.comboN = chain ? atk.comboN + 1 : 1;
    atk.comboT = atk.comboN >= 2 ? COMBO_SHOW_MS : 0;
    atk.comboPunch = atk.comboT > 0;
    atk.comboBolt = false;
    def.comboN = 0;
    def.comboT = 0;
    def.comboPunch = false;
    def.comboBolt = false;
  }

  function noteHintVerb(v) {
    if (!v) return;
    if (hintDone && hintFade <= 0) return;
    if (hintVerbs[v]) return;
    hintVerbs[v] = true;
    hintVerbN += 1;
    if (hintVerbN >= HINT_VERB_N) armHintFade();
  }

  function tickHint(dt) {
    if (mode === "title" || mode === "over") return;
    if (hintIn < HINT_IN_MS) hintIn = Math.min(HINT_IN_MS, hintIn + dt);
    if (!hintDone) {
      hintAge += dt;
      if (hintAge >= HINT_HOLD_MS) armHintFade();
      if (actionHeld("left") || actionHeld("right")) noteHintVerb("walk");
      if (player && (player.guarding || wantGuard(player))) noteHintVerb("guard");
    }
    if (hintFade > 0) hintFade = Math.max(0, hintFade - dt);
  }


  function resetRound() {
    // Escenarios picker sticky on title→JUGAR. Rematch (KO→over) rotates patio.
    // Rematch patio contrast leftover (v410): KeyR during falling used to
    // resetRound while mode was still "falling", so rotateYardForContrast
    // (gated on over only) never ran — same patio back-to-back after skip-
    // crumple R. Space/R from over already rotated. Soft: also rotate on
    // falling (KO crumple live = rematch after KO). Mid-play KeyR stays
    // practice restart (mode play, no rotate). Escenarios sticky on JUGAR
    // unchanged. tipX / plants / pad / frames locked. No new combat verb.
    if (mode === "over" || mode === "falling") rotateYardForContrast();
    yardArmed = true;
    player = makeFighter("you");
    rival = makeFighter("rival");
    mode = "play";
    modeT = 0;
    syncMusic(true);
    titlePage = "root";
    titleSel = 0;
    remapCapture = null;
    koTarget = null;
    requestRestart = false;
    requestStart = false;
    attackEdge = false;
    golpeEdge = false;
    boltEdge = false;
    throwEdge = false;
    reversalEdge = false;
    feintEdge = false;
    bolt = null;
    lastWalkCode = "";
    walkHeldA = false;
    walkHeldD = false;
    // Stick Esc→JUGAR leftover: keys.clear left stickHeld without KeyA/D, so
    // JUGAR with thumb still held did not walk until release+re-nudge.
    // Only while stickPtr is live (real thumb). Harness stickApply alone must
    // not re-arm walk after freezeYouAI keys.clear.
    if (stickPtr != null) {
      if (stickHeldA && !keys.has("KeyA")) feedKey("KeyA", true);
      if (stickHeldD && !keys.has("KeyD")) feedKey("KeyD", true);
    }
    pushblockBuf = 0;
    shake = 0;
    shakeDur = 0;
    shakeMag = 0;
    shakeDir = 1;
    coverShown = 0;
    coverTick = -1;
    updateTick = 0;
    hitstopLeft = 0;
    hitFlashT = 0;
    steelFlashT = 0;
    parryGleamT = 0;
    steelTipRide = false;
    steelKind = "block";
    clashSparkT = 0;
    clashShards = [];
    hitSparkT = 0;
    hitShards = [];
    brasaFxT = 0;
    brasaFxKind = "";
    brasaBits = [];
    brasaFxScale = 1;
    plantDust = [];
    dmgNums = [];
    slashBuf = false;
    golpeBuf = false;
    boltBuf = false;
    throwBuf = false;
    reversalBuf = false;
    openBuf = false;
    openBoltBuf = false;
    p2OpenBuf = false;
    p2OpenGolpeBuf = false;
    p2OpenBoltBuf = false;
    openLeft = OPENING_MS;
    koLanded = false;
    lastKoSfx = "";
    settleT = 0;
    settleMax = SETTLE_MS;
    gapEaseT = 0;
    if (hintDone) hintFade = 0;
    stampNow(1.3);
  }

  function walking(f) {
    return f.gait !== 0 && f.phase === "idle" && !f.guarding && f.stunT <= 0 && !f.falling;
  }

  function gaitWalkOn(f) {
    if (!walking(f)) return false;
    const a = (f.walkT / WALK_STEP_MS) * Math.PI;
    // Passing frame is the peak; plant sheet holds the rest so it reads as a step.
    // Both 320ms boots. Signed sin skipped the back step (idle bob, then a cut).
    return Math.abs(Math.sin(a)) > 0.28;
  }

  function walkSheetK(f) {
    // Visual only. poseBitmap still hard-cuts at gaitWalkOn (abs sin>0.28).
    if (!walking(f)) return 0;
    const a = (f.walkT / WALK_STEP_MS) * Math.PI;
    const u = Math.abs(Math.sin(a));
    return u * u * (3 - 2 * u);
  }


  function drainWalkSettleUnderPlant(f, dt, was) {
    // destRect-only. Plant walk-in destRect lean leftover: keep leftover lean/dip
    // through plant raise (mirror walk→guard). Arm settle the tick was-walking
    // stops into plant; drain leftover settleT; do not invent settle from a bare
    // walkFadeHold arm (recoveryWalkOut) with stale rot/oy.
    if (!f) return;
    if (was && f.walkSettleT <= 0) f.walkSettleT = WALK_SETTLE_MS;
    else if (f.walkSettleT > 0) f.walkSettleT = Math.max(0, f.walkSettleT - dt);
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
      // stamp; gaitWalkOn sheet now abs so both boots share the passing frame.
      if (was && pass0 && !pass1) {
        spawnPlantDust(f, 1);
        // Walk plant grit audio sync leftover: grit stamped silent (getup/KO already synced).
        playPlantScrape();
        f.walkPlanted = true;
      }
      f.walkFadeHold = walkSheetK(f);
      return;
    }
    // Stop grit needs weight — a 2-frame A/D tap used to puff on
    // release with destRect rise still ~0 (same hole as start).
    // Rise 160ms (lean in) or a planted boot. Lunge stomp stays.
    if (was && (f.walkRiseT >= WALK_SETTLE_MS || f.walkPlanted)) {
      spawnPlantDust(f, 0.8);
      // Weighted walk-stop grit audio sync (mirror boot plant). Tap with no weight stays silent.
      playPlantScrape();
    }
    f.walkT = 0;
    f.gait = 0;
    f.walkRiseT = 0;
    f.walkLeanGait = 0;
    f.walkPlanted = false;
    // Telegraph walk-in pose leftover: leftover walk used to die the tick
    // startAttack/startThrow/startBolt armed from mid-stride (this zeroed
    // walkFadeHold), so leftover walk dumped to idle under the raise — a hop,
    // not a plant. Keep leftover walkFadeHold through leftover telegraph raise.
    // poseBitmap still windup/knife immediately. Idle telegraph still rests on
    // idle. Walk→guard leftover unchanged. Stun / non-tele combat still snap.
    // Raise still 0ms. AABB planted. No new combat verb.
    if (telegraphing(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through telegraph raise
      // (was zeroed walkSettleT while walkFadeHold held the sheet — lean hop).
      if (telegraphFade(f) >= 0.98) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Link plant walk-in pose leftover: leftover walk used to die the tick
    // startAttack/startThrow/startBolt armed from mid-stride sheathe (this zeroed
    // walkFadeHold; telegraph false on linkPlant), so leftover walk dumped to idle
    // under the raise — a hop, not a plant. Keep leftover walkFadeHold through
    // leftover link plant raise. poseBitmap still windup/knife immediately. Idle
    // sheathe raise still rests on idle. Telegraph walk-in unchanged. Stun /
    // non-link combat still snap. Raise still 0ms. AABB planted. No new combat verb.
    if (linkPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through link raise.
      if (linkPlantFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Clash walk-in walkFadeHold pose leftover: leftover walk used to die the tick
    // cancelIntoGolpe/Slash/Bolt armed clashPlant from recovery (this zeroed
    // walkFadeHold on phase / boltPhase; restClashWalk only recoveryWalkOut; closing
    // cleared with no walkFadeHold arm), so leftover walk dumped under the clash raise —
    // a hop, not a plant. Keep leftover walkFadeHold through leftover clash plant.
    // poseBitmap still windup/knife immediately. Idle clash plant still rests on windup/knife.
    // HoldCut / link / telegraph walk-in unchanged. Stun / non-clash combat still snap.
    // Raise still 0ms. AABB planted. No new combat verb.
    if (clashPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through clash raise.
      if (clashPlantFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // HoldCut walk-in walkFadeHold pose leftover: leftover walk used to die the tick
    // cancelIntoBolt armed holdCutPlant from recovery (this zeroed walkFadeHold on
    // boltPhase; restHoldCutWalk only recoveryWalkOut; closing cleared with no
    // walkFadeHold arm on the holdCut branch), so leftover walk dumped under the cut —
    // a hop, not a plant. Keep leftover walkFadeHold through leftover holdCut plant.
    // poseBitmap still slash immediately. Idle holdCut plant still rests on idle.
    // Clash / link / telegraph walk-in unchanged. Stun / non-holdCut combat still snap.
    // Raise still 0ms. AABB planted. No new combat verb.
    if (holdCutPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through holdCut raise.
      if (holdCutFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Reversal plant walk-in pose leftover: leftover walk used to die the tick
    // startReversal armed from walk→guard / A/D / rival closing (this zeroed
    // walkFadeHold on phase), so leftover walk dumped under the reverse raise —
    // a hop, not a plant. Keep leftover walkFadeHold through leftover reversal plant.
    // poseBitmap still windup immediately. Idle guard reverse still rests on windup.
    // Clash / holdCut / link / telegraph walk-in unchanged. Stun / non-rev combat still snap.
    // Raise still 0ms. AABB planted. No new combat verb.
    if (reversalPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Wakeup→reversal walk-in: guardPoseK is often 0 (tap-L getup), so
      // reversalPlantFade is already <=0.02 — keep hold through leftover
      // wakeupFade / wakeRevFadeHold crumple plant instead of zeroing.
      // Plant walk-in destRect lean leftover: keep settle through reverse raise.
      if (reversalPlantFade(f) <= 0.02 && wakeupFade(f) <= 0.02 && hurtFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Throw-from-guard plant walk-in pose leftover: leftover walk used to die the tick
    // startThrow armed from walk→guard / A/D / rival closing (this zeroed walkFadeHold on
    // phase; restThrowGuard rested block on windup with no walk base), so leftover walk
    // dumped under the throw raise — a hop, not a plant. Keep leftover walkFadeHold through
    // leftover throw-from-guard plant. poseBitmap still windup immediately. Idle throw-from-guard
    // still rests on windup. Reversal / clash / holdCut / link / telegraph walk-in unchanged.
    // Stun / non-throw-guard combat still snap. Raise still 0ms. AABB planted. No new combat verb.
    if (throwGuardPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through throw-guard raise.
      if (throwGuardPlantFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Tech-from-guard plant walk-in pose leftover: leftover walk used to die the tick
    // landThrowTech armed from walk→guard / A/D / rival closing (this zeroed walkFadeHold on
    // phase; restTechGuard rested block on windup with no walk base), so leftover walk dumped
    // under the tech raise — a hop, not a plant. Keep leftover walkFadeHold through leftover
    // tech-from-guard plant. poseBitmap still windup immediately. Idle tech-from-guard still
    // rests on windup. Throw-from-guard / reversal walk-in unchanged. Stun / non-tech combat
    // still snap. Raise still 0ms. AABB planted. No new combat verb.
    if (techGuardPlanting(f) && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through tech-guard raise.
      if (techGuardPlantFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Feint walk-in pose leftover: leftover walk used to die the tick startFeint
    // armed from telegraph / A/D / rival closing (this zeroed walkFadeHold once
    // telegraphing ended; gait already 0), so leftover walk dumped to idle under
    // the pull — a hop, not a plant. Keep leftover walkFadeHold through leftover
    // feintFade. poseBitmap still idle once feintT is set. Idle pull still rests
    // on idle. Feint walk-out gaitWalkOn unchanged. Stun / non-feint combat still
    // snap. Raise still 0ms. AABB planted. No new combat verb.
    if (f.feintT > 0 && (f.walkFadeHold > 0 || f.walkSettleT > 0)) {
      // Plant walk-in destRect lean leftover: keep settle through feint pull.
      if (feintFade(f) <= 0.02) f.walkFadeHold = 0;
      drainWalkSettleUnderPlant(f, dt, was);
      return;
    }
    // Combat poses lock immediately — do not ease leftover lean into a slash.
    // Walk→guard leftover: leftover walk fade used to die the tick S raised
    // (this zeroed walkFadeHold / walkSettleT on guarding), so walk popped to
    // block. Keep leftover hold through leftover settle if they raise.
    // poseBitmap still block once guarding. destRect lean eases with walkSettleK
    // through leftover settle if they raise. Stun / combat still snap.
    if (f.phase !== "idle" || f.stunT > 0 || f.falling || f.boltPhase) {
      f.walkSettleT = 0;
      f.walkFadeHold = 0;
      return;
    }
    if (f.guarding) {
      if (was) f.walkSettleT = WALK_SETTLE_MS;
      else if (f.walkSettleT > 0) f.walkSettleT = Math.max(0, f.walkSettleT - dt);
      // Wakeup→guard walk-in: keep leftover walkFadeHold through leftover crumple
      // plant (settle may be 0 on a plant-frame / rival closing arm). Walk→guard
      // settle path unchanged once wakeupFade dies.
      if (wakeupFade(f) > 0.02 && f.walkFadeHold > 0) return;
      if (hurtFade(f) > 0.02 && f.walkFadeHold > 0) return;
      if (f.walkSettleT <= 0) f.walkFadeHold = 0;
      return;
    }
    if (was) f.walkSettleT = WALK_SETTLE_MS;
    else if (f.walkSettleT > 0) f.walkSettleT = Math.max(0, f.walkSettleT - dt);
    if (f.walkSettleT <= 0) f.walkFadeHold = 0;
  }

  function walkRiseK(f) {
    if (!walking(f)) return 1;
    if (f.walkRiseT >= WALK_SETTLE_MS) return 1;
    const t = Math.max(0, f.walkRiseT / WALK_SETTLE_MS);
    return t * t;
  }

  function walkSettleK(f) {
    if (!f || f.walkSettleT <= 0) return 0;
    if (f.stunT > 0 || f.falling) return 0;
    if (walking(f)) return 0;
    // Plant walk-in destRect lean leftover: leftover lean/dip used to dump the
    // tick mid-stride Space/L/K / clash / holdCut / reverse / throw-guard / tech /
    // feint armed (this gated phase!==idle while walkFadeHold still held the sheet),
    // so destRect lean hopped off the plant while rest*Walk still showed walk under
    // the raise. Keep leftover settle through leftover walkSettleT under plant fades
    // (mirror walk→guard). poseBitmap still windup/knife/slash/idle. Idle settle
    // still eases. Stun / non-plant combat still snap (settleT already zeroed).
    if (
      telegraphing(f) ||
      linkPlanting(f) ||
      clashPlanting(f) ||
      holdCutPlanting(f) ||
      reversalPlanting(f) ||
      throwGuardPlanting(f) ||
      techGuardPlanting(f) ||
      f.feintT > 0
    ) {
      const k = f.walkSettleT / WALK_SETTLE_MS;
      return k * k;
    }
    if (f.phase !== "idle") return 0;
    // Walk→guard destRect lean leftover: leftover lean/dip used to dump the
    // tick S raised (this gated guarding + dedicated block), so destRect
    // lean snapped into the guard plant while leftover walk sheet still
    // eased. Keep leftover settle through leftover walkSettleT if they raise.
    // poseBitmap still block. Idle settle still eases. Stun /
    // combat still snap (settleT already zeroed).
    if (f.guarding) {
      const k = f.walkSettleT / WALK_SETTLE_MS;
      return k * k;
    }
    // Sheathe settle lean under walkFadeHold: leftover lean/dip used to dump the
    // tick A/D released mid-clash-sheathe (this gated usingDedicatedPose while
    // sheathing() held slash; tickGait already armed walkSettleT on the idle path),
    // so destRect lean hopped to 0 while sheatheDip still rode the hump — a hop,
    // not a settle. Same hole plant walk-in / walk→guard already closed. Keep
    // leftover settle through leftover walkSettleT under sheathe (mirror plant
    // fades / guarding). poseBitmap still slash. Idle settle still eases.
    // sheatheDip hump unchanged. Stun / combat still snap (settleT already zeroed).
    if (f.sheatheT > 0) {
      const k = f.walkSettleT / WALK_SETTLE_MS;
      return k * k;
    }
    if (usingDedicatedPose(f)) return 0;
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
    // Guard break leftover: leftover k used to snap (and this gated
    // breath to 0 for the whole window), so idle breath dumped ~1.6
    // the tick the window died. Ease with leftover k like S-release.
    if (f.falling) return 0;
    // Stun end destRect leftover: leftover idle breath used to dump ~1.5 the
    // tick stunT hit 0 (this hard-zeroed through chip stun), so the chest
    // seated while stun flinch rot was already ~0 — a hop, not a settle.
    // Ease breath in over leftover GUARD_RAISE_MS while stunT drains.
    // Throw KD / wakeup invuln still hard-zero (wakeupFade owns getup).
    // poseBitmap still idle. Stun rot still scales with stunT/HITSTUN.
    // Extra destRect rot stays 0. AABB planted.
    if (f.stunT > 0) {
      if (f.thrownT > 0 || f.throwInvulnT > 0 || f.hp <= 0) return 0;
      if (holdingCutBolt(f)) return 0;
      // Chip stun settle→walk destRect leftover: leftover stun-end breath ease-in used to seat
      // mid-stride (stunT/GUARD_RAISE_MS climbed to full amp while A/D / rival closing already
      // held — recoveryWalkOut planted the walk sheet, but idleBreath preferred plant release
      // over walkRise), then dump when rise finally owned — a hop, not a plant. Same hole
      // throw / bolt recovery settle→walk already closed. Keep breath 0 through walk-out /
      // guard during stun-end; tickStun arms cutRecBreathT when stun ends mid-stride /
      // mid-raise so max(ck, wk) / hold-under-rise own the post-stun seat. Idle chip stun
      // still eases with stunT/GUARD_RAISE_MS. AABB planted.
      // Chip stun settle→walk plant-release destRect leftover: leftover stun-end breath ease-in used to
      // seat mid-stride the tick A/D / rival closing walked through chip stun after tele/walk-in
      // (idleBreath preferred plant release — only gated recoveryWalkOut / guard, not walking /
      // walkFadeHold; rest stun walk / walkFadeHold already rested walk under the flinch), then
      // ease — a hop, not a plant. Same hole wakeup / feint settle→walk plant-release already
      // closed. Keep breath 0 through walking / walk-out / leftover walkFadeHold during stun-end;
      // tickStun arms cutRecBreathT when chip stun ends mid-stride / mid-raise / under walkFadeHold
      // so max(ck, wk) / hold-under-rise own the post-stun seat. Idle chip stun still eases with
      // stunT/GUARD_RAISE_MS. Chip stun settle→guard unchanged. AABB planted.
      if (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      if (f.guarding || f.guardPoseK > 0) return 0;
      const tStun = (modeT + (f.kind === "you" ? 0 : 380)) / 2400;
      const ampStun = Math.sin(tStun * Math.PI * 2) * 1.6;
      if (GUARD_RAISE_MS <= 0) return 0;
      const uStun = Math.max(0, Math.min(1, f.stunT / GUARD_RAISE_MS));
      return ampStun * (1 - uStun * uStun * (3 - 2 * uStun));
    }
    // Special-cancel K holds the cut destRect; idle breath used to seat ~1.6px
    // the same tick the sheet popped to windup.
    if (holdingCutBolt(f)) return 0;
    const t = (modeT + (f.kind === "you" ? 0 : 380)) / 2400;
    let amp = Math.sin(t * Math.PI * 2) * 1.6;
    // Feint end destRect leftover: leftover sheatheT amp scale used to dump
    // ~1.3 the tick feintT hit 0 (tickFeint zeros sheatheT), so the chest
    // seated while feintFade was already ~0 — a hop, not a settle. Sheathe
    // dip already skips through feintT; clash sheathe keeps breath 0 (no amp
    // scale). Ease with feintFade only. AABB planted.
    // Clash sheathe destRect leftover: amp scale moved into the sheatheT
    // block below (keep 0 through sheathe; cutRecBreathT eases after).
    // Rival telegraph leftover: startup used to dump leftover breath (~1.6)
    // the same tick windup popped. Ease with telegraphFade. AABB planted.
    // Telegraph settle→walk / walk→telegraph destRect leftover: leftover telegraphFade breath
    // used to seat ~1.4 mid-stride the tick Space/L/throw/K armed from A/D / rival closing
    // (idleBreath preferred plant release over walk plant — recoveryWalkOut / walkFadeHold
    // already rested walk under telePlant), then ease out — a hop, not a plant. Same hole
    // chip stun / bolt / throw recovery settle→walk already closed. Keep breath 0 through walking /
    // walk-out / leftover walkFadeHold during telegraph; idle telegraph still eases with
    // telegraphFade. No cutRec arm (ends into active). AABB planted.
    if (telegraphing(f)) {
      // Settle→plant destRect breath leftover: mid-settle Space/L/throw/K used
      // to dump leftover settle breath the tick telegraph armed (keep-0 on
      // walkFadeHold while walkSettleK still kept lean under restTeleWalk) —
      // a hop, not a plant. Same hole idle settle→guard already closed.
      // Math.max(settle k, telegraphFade) when A/D already released (not
      // walking / recoveryWalkOut) so breath stays suppressed then dies with
      // raise. A/D-held walk-in / rival closing still keep 0 (telegraph
      // settle→walk). Idle telegraph still eases with telegraphFade.
      // Clash/link/holdCut still hard-0. AABB planted.
      if (walking(f) || recoveryWalkOut(f)) return 0;
      if (f.walkSettleT > 0 && f.walkFadeHold > 0.02) {
        const sk = walkSettleK(f);
        const tk = telegraphFade(f);
        return amp * (1 - Math.max(sk, tk));
      }
      if (f.walkFadeHold > 0.02) return 0;
      return amp * (1 - telegraphFade(f));
    }
    // Clash-K leftover: leftover slash recovery had breath 0. Idle-phase
    // bolt plant used to dump ~1.6 the same tick clash-K armed. Keep 0.
    if (clashPlanting(f)) return 0;
    // Connected slash-L leftover sheathe: leftover recovery breath was 0.
    // Startup used to dump ~1.6 the same tick leftover sheathe popped to
    // windup. Keep 0. AABB planted.
    if (linkPlanting(f)) return 0;
    // Special-cancel leftover sheathe: leftover recovery breath was 0.
    // Startup used to dump ~1.6 the same tick leftover sheathe popped to
    // the full cut. Keep 0. AABB planted.
    if (holdCutPlanting(f)) return 0;
    // Reversal/throw-guard settle→plant destRect breath leftover: mid-settle
    // L / Space+S from guard used to dump leftover settle breath the tick
    // reverse/throw armed (phase!==idle hard-0 while walkSettleK still kept
    // lean under restRevWalk / restThrowGuardWalk) — a hop, not a plant.
    // Same hole tele/feint settle→plant already closed. Math.max(settle k,
    // plant fade) when A/D already released under leftover walkFadeHold so
    // breath stays suppressed then dies with plant. A/D-held walk-in / rival
    // closing still keep 0. Idle guard reverse/throw still eases with plant
    // fade. Clash/link/holdCut still hard-0. AABB planted.
    if (reversalPlanting(f)) {
      if (walking(f) || recoveryWalkOut(f)) return 0;
      if (f.walkSettleT > 0 && f.walkFadeHold > 0.02) {
        const sk = walkSettleK(f);
        const rf = reversalPlantFade(f);
        return amp * (1 - Math.max(sk, rf));
      }
      if (f.walkFadeHold > 0.02) return 0;
      return amp * (1 - reversalPlantFade(f));
    }
    if (throwGuardPlanting(f)) {
      if (walking(f) || recoveryWalkOut(f)) return 0;
      if (f.walkSettleT > 0 && f.walkFadeHold > 0.02) {
        const sk = walkSettleK(f);
        const tgf = throwGuardPlantFade(f);
        return amp * (1 - Math.max(sk, tgf));
      }
      if (f.walkFadeHold > 0.02) return 0;
      return amp * (1 - throwGuardPlantFade(f));
    }
    // Tech-guard settle→plant destRect breath leftover: mid-settle Space+S tech
    // from guard used to dump leftover settle breath the tick landThrowTech
    // armed (fell through throw recovery — walkFadeHold keep-0 / throwPlantFade
    // while walkSettleK still kept lean under restTechGuardWalk) — a hop, not
    // a plant. Same hole reverse/throw-guard settle→plant already closed.
    // Math.max(settle k, techGuardPlantFade) when A/D already released under
    // leftover walkFadeHold so breath stays suppressed then dies with plant.
    // A/D-held walk-in / rival closing still keep 0. Idle tech-from-guard still
    // eases with techGuardPlantFade. Reverse/throw-guard settle→plant /
    // tipPlantK unchanged. Clash/link/holdCut still hard-0. AABB planted.
    if (techGuardPlanting(f)) {
      if (walking(f) || recoveryWalkOut(f)) return 0;
      if (f.walkSettleT > 0 && f.walkFadeHold > 0.02) {
        const sk = walkSettleK(f);
        const tef = techGuardPlantFade(f);
        return amp * (1 - Math.max(sk, tef));
      }
      if (f.walkFadeHold > 0.02) return 0;
      return amp * (1 - techGuardPlantFade(f));
    }
    // Feint pose leftover: pull used to dump leftover breath (~1.6) the
    // same tick windup popped to slash. Ease with feintFade. AABB planted.
    // Feint settle→guard destRect leftover: leftover feintFade breath used to
    // seat ~0.65 the tick S raised mid-pull (idleBreath used only feintFade
    // k), so the chest hopped while leftover raise still climbed — then
    // dumped ~0.9 the tick feintT hit 0 while raise was still mid. Same hole
    // cut recovery settle→guard closed for cutRec. Math.max(feintFade, raise
    // k) so breath stays suppressed then dies with raise. Idle feint still
    // eases with feintFade. Pure idle→guard still eases with raise. Feint→
    // guard sheet leftover unchanged (feintFade keeps windup). AABB planted.
    // Feint settle→walk destRect leftover: leftover feintFade breath used to
    // seat ~0.65 mid-stride (feintFade k preferred over walkRiseK), then dump
    // ~1.1 the tick feintT hit 0 while rise was full. Same hole feint
    // settle→guard closed for raise / cut recovery settle→walk for cutRec.
    // Math.max(feintFade, rise k) so breath stays suppressed then dies with
    // rise — closed dump-on-end when rise already full. AABB planted.
    // Feint settle→walk plant-release destRect leftover: leftover feintFade breath used to
    // seat ~1.1 mid-stride the tick A/D / rival closing walked through the pull after
    // tele/walk-in (max(feintFade, rise) climbed as feintFade died while walkRise restarted
    // from 0; restFeintWalk / walkFadeHold already rested walk under the pull), then ease —
    // a hop, not a plant. Same hole telegraph / chip stun / bolt / throw settle→walk already
    // closed. Keep breath 0 through walking / walk-out; leftover walkFadeHold keep-0 when
    // no mid-settle (fresh walk-in / closing). Mid-settle release under walkFadeHold uses
    // max(settle k, feintFade) below (feint settle→plant). tickFeint arms cutRecBreathT when
    // feint ends mid-stride / mid-raise so max(ck, wk) / hold-under-rise own the post-feint
    // seat. Idle feint still eases with feintFade. Feint settle→guard unchanged (max fk, rk).
    // AABB planted.
    if (f.feintT > 0) {
      if (f.guarding || f.guardPoseK > 0) {
        const fk = feintFade(f);
        const rk = guardRaiseK(f);
        return amp * (1 - Math.max(fk, rk));
      }
      // Feint settle→plant destRect breath leftover: mid-settle Space cancel used
      // to dump leftover settle breath the tick feint armed (keep-0 on
      // walkFadeHold while walkSettleK still kept lean under restFeintWalk) —
      // a hop, not a plant. Same hole tele settle→plant already closed.
      // Math.max(settle k, feintFade) when A/D already released (not walking /
      // recoveryWalkOut) so breath stays suppressed then dies with pull.
      // A/D-held walk-in / rival closing still keep 0 (feint settle→walk
      // plant-release). Idle feint still eases with feintFade. Feint
      // settle→guard unchanged (max fk, rk). AABB planted.
      if (walking(f) || recoveryWalkOut(f)) return 0;
      if (f.walkSettleT > 0 && f.walkFadeHold > 0.02) {
        const sk = walkSettleK(f);
        const fk = feintFade(f);
        return amp * (1 - Math.max(sk, fk));
      }
      if (f.walkFadeHold > 0.02) return 0;
      return amp * (1 - feintFade(f));
    }
    // Wakeup destRect leftover: leftover breath used to dump ~1.6 the
    // same tick throw-invuln armed. Ease with wakeupFade. AABB planted.
    // Wakeup settle→walk destRect leftover: leftover wakeupFade breath used
    // to seat ~1.4 mid-stride (fade eases breath IN while rise wants OUT;
    // invuln 80 dies before rise 160 owns). Same hole feint settle→walk /
    // clash sheathe settle→walk closed. Keep breath 0 through walk-out
    // getup; tickThrowState arms cutRec on invuln mid-end so max(ck, wk) /
    // hold-under-rise own the post-getup seat. Wakeup settle→guard: keep
    // breath 0 through raise mid-getup; arm cutRec on invuln mid-end too.
    // Idle getup still eases with wakeupFade. Pure idle→walk / idle→guard
    // still eases. Wakeup→guard sheet leftover unchanged. AABB planted.
    // Wakeup settle→walk plant-release destRect leftover: leftover wakeupFade breath used to
    // seat ~1.4 mid-stride the tick A/D / rival closing walked through getup after tele/walk-in
    // (idleBreath preferred plant release — only gated walking(f), not walkFadeHold /
    // recoveryWalkOut; restWakeWalk / walkFadeHold already rested walk under the crumple), then
    // ease — a hop, not a plant. Same hole feint / telegraph / chip stun / bolt / throw
    // settle→walk already closed. Keep breath 0 through walking / walk-out / leftover
    // walkFadeHold during wakeup fade plant; tickThrowState arms cutRecBreathT when throw-invuln
    // ends mid-stride / mid-raise / under walkFadeHold so max(ck, wk) / hold-under-rise own the
    // post-getup seat. Idle getup still eases with wakeupFade. Wakeup settle→guard unchanged.
    // AABB planted.
    // Hurt pose snap leftover: also suppress breath through hurtFade (SHEATHE_MS)
    // so chest does not seat when invuln window dies. AABB planted.
    // Hurt settle→walk plant-release destRect leftover: leftover hurtFade breath used to
    // seat mid-stride / mid-raise the tick hurtFadeT cleared after throw-invuln already ended
    // idle (no cutRec arm) or after cutRec drained (idleBreath preferred plant release — keep-0
    // through walking / walk-out / walkFadeHold while hurtFade>0, but no arm when SHEATHE_MS
    // died under plant), then ease — a hop, not a plant. Same hole wakeup / feint / chip stun
    // settle→walk plant-release already closed. Keep breath 0 through walking / walk-out /
    // leftover walkFadeHold during hurtFade plant; tickHurtFade arms cutRecBreathT when
    // hurtFadeT clears mid-stride / mid-raise / under walkFadeHold so max(ck, wk) /
    // hold-under-rise own the post-hurt seat. Idle hurt→idle still eases with hurtFade.
    // Hurt settle→guard: keep 0 through raise; arm cutRec on clear mid-raise too. AABB planted.
    if (wakeupFade(f) > 0 || hurtFade(f) > 0) {
      if (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      if (f.guarding || f.guardPoseK > 0) return 0;
      return amp * (1 - Math.max(wakeupFade(f), hurtFade(f)));
    }
    // Throw recovery leftover: leftover breath used to dump ~1.6 the
    // same tick recovery popped idle. Ease with throwPlantFade. AABB planted.
    // Throw plant end destRect leftover: leftover throwPlantFade used to
    // fall through to phase!==idle hard-zero the tick fade hit ~0 (last
    // recovery frame), so the chest dumped ~1.6 then seated full on idle —
    // a hop, not a settle. Stay on the plant ease through throw recovery
    // (fade 0 = full amp ready for idle). Idle still inherits that plant.
    // Pure idle→walk / idle→guard still eases with rise/raise. Sheet still
    // fades via throwPlantFade. AABB planted.
    // Throw recovery settle→walk destRect leftover: leftover throwPlantFade breath used to
    // seat ~0.96 mid-stride (plant ease climbed to full amp through recovery while A/D /
    // rival closing already held — recoveryWalkOut / restThrowWalk planted the sheet, but
    // idleBreath preferred plant release over walkRise), then dump when rise finally owned —
    // a hop, not a plant. Same hole bolt recovery settle→walk / wakeup settle→walk / cut
    // recovery settle→walk already closed. Keep breath 0 through walk-out throw recovery;
    // advanceAttack arms cutRecBreathT when recovery ends mid-stride / mid-raise so
    // max(ck, wk) / hold-under-rise own the post-recovery seat. Idle throw plant still eases
    // with throwPlantFade. Sheet still throwPlantFade / restThrowWalk. AABB planted.
    // Throw recovery settle→walk plant-release destRect leftover: leftover throwPlantFade breath
    // used to seat mid-stride the tick A/D / rival closing walked through throw recovery after
    // tele/walk-in (idleBreath preferred plant release — only gated recoveryWalkOut / guard, not
    // walking / walkFadeHold; restThrowWalk / walkFadeHold already rested walk under the plant),
    // then ease — a hop, not a plant. Same hole chip stun / wakeup / feint settle→walk plant-release
    // already closed. Keep breath 0 through walking / walk-out / leftover walkFadeHold during throw
    // plant; advanceAttack arms cutRecBreathT when recovery ends mid-stride / mid-raise / under
    // walkFadeHold so max(ck, wk) / hold-under-rise own the post-recovery seat. Idle throw plant
    // still eases with throwPlantFade. Throw recovery settle→guard unchanged. AABB planted.
    if (f.cut === "throw" && f.phase === "recovery") {
      if (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      if (f.guarding || f.guardPoseK > 0) return 0;
      return amp * (1 - throwPlantFade(f));
    }
    // Dart recovery destRect leftover: leftover breath used to dump ~1.6 the
    // same tick dart birth popped idle. Ease with boltPlantFade. AABB planted.
    // Knife plant end destRect leftover: leftover boltPlantFade >0 gate used to
    // fall through the tick fade hit ~0 (last recovery frame). Throw plant end
    // already stayed on plant ease through throw recovery; knife still used the
    // >0 gate, so the chest could dump then seat full on idle — a hop, not a
    // settle. Stay on the plant ease through bolt recovery (fade 0 = full amp
    // ready for idle). Special-cancel still zeros (holdingCutBolt). Sheet still
    // boltPlantFade. Idle still inherits that plant. AABB planted.
    // Bolt recovery settle→walk destRect leftover: leftover boltPlantFade breath used to
    // seat ~1.1 mid-stride (plant ease climbed to full amp through recovery while A/D /
    // rival closing already held — recoveryWalkOut / restBoltWalk planted the sheet, but
    // idleBreath preferred plant release over walkRise), then dump when rise finally owned —
    // a hop, not a plant. Same hole wakeup settle→walk / clash sheathe settle→walk / cut
    // recovery settle→walk already closed. Keep breath 0 through walk-out bolt recovery;
    // advanceBoltFighter arms cutRecBreathT when recovery ends mid-stride / mid-raise so
    // max(ck, wk) / hold-under-rise own the post-recovery seat. Idle knife plant still eases
    // with boltPlantFade. Special-cancel still zeros (holdingCutBolt). Sheet still
    // boltPlantFade. AABB planted.
    // Bolt recovery settle→walk plant-release destRect leftover: leftover boltPlantFade breath
    // used to seat mid-stride the tick A/D / rival closing walked through bolt recovery after
    // tele/walk-in (idleBreath preferred plant release — only gated recoveryWalkOut / guard, not
    // walking / walkFadeHold; restBoltWalk / walkFadeHold already rested walk under the plant),
    // then ease — a hop, not a plant. Same hole throw / chip stun / wakeup settle→walk plant-release
    // already closed. Keep breath 0 through walking / walk-out / leftover walkFadeHold during bolt
    // plant; advanceBoltFighter arms cutRecBreathT when recovery ends mid-stride / mid-raise / under
    // walkFadeHold so max(ck, wk) / hold-under-rise own the post-recovery seat. Idle knife plant
    // still eases with boltPlantFade. Bolt recovery settle→guard unchanged. Special-cancel still
    // zeros (holdingCutBolt). AABB planted.
    if (f.boltPhase === "recovery" && !holdingCutBolt(f)) {
      if (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      if (f.guarding || f.guardPoseK > 0) return 0;
      return amp * (1 - boltPlantFade(f));
    }
    // Cut recovery destRect leftover: slash/golpe recovery used to hard-zero
    // leftover breath (phase!==idle) while sheatheFade already eased the cut
    // sheet to idle, so the chest dumped ~1.6 the tick recovery popped idle —
    // a hop, not a settle. Throw / dart already eased. destRect-only
    // (idleBreath / cutRecBreathT). Keep recovery breath 0 so special-cancel K
    // destRect plant stays seated; ease breath in over GUARD_RAISE_MS after
    // non-clash/tech cut recovery ends. Clash/tech still sheatheT path.
    // AABB planted.
    if (f.cutRecBreathT > 0) {
      if (GUARD_RAISE_MS <= 0) return 0;
      const u = Math.max(0, Math.min(1, f.cutRecBreathT / GUARD_RAISE_MS));
      const ck = u * u * (3 - 2 * u);
      // Cut recovery settle→guard destRect leftover: tickSheathe used to zero
      // cutRecBreathT on guarding, so idleBreath dumped cutRec k then seated
      // amp*(1-raiseK≈0) while raise still climbed — a hop, not a plant.
      // Same hole idle settle→guard closed for walkSettle. Keep cutRec held
      // through raise (tickSheathe); Math.max(cutRec k, raise k) so breath
      // stays suppressed then dies with raise. Idle cut recovery settle still
      // eases when not guarding. Pure idle→guard still eases with raise.
      // Cut recovery settle→walk destRect leftover: leftover cutRecBreath used
      // to seat ~0.6 mid-stride (cutRec k preferred over walkRiseK), then dump
      // the tick T hit 0 while rise was full. Same hole settle→guard closed
      // for raise. Keep cutRec held through rise; Math.max(cutRec k, rise k).
      // Idle cut recovery settle still eases when not walking. Pure idle→walk
      // still eases with rise. AABB planted.
      if (f.guarding || f.guardPoseK > 0) {
        const rk = guardRaiseK(f);
        return amp * (1 - Math.max(ck, rk));
      }
      if (walking(f)) {
        const wk = walkRiseK(f);
        return amp * (1 - Math.max(ck, wk));
      }
      // Cut recovery settle→walk plant-release destRect leftover: leftover cutRecBreathT ease-in used to
      // seat mid-stride the tick A/D / rival closing walked through cut recovery after tele/walk-in
      // (idleBreath preferred plant release — only gated walking(f)→max(ck, wk), not walkFadeHold /
      // recoveryWalkOut; rest walk / walkFadeHold already rested walk under the settle), then ease —
      // a hop, not a plant. Same hole chip stun / throw / bolt / wakeup settle→walk plant-release
      // already closed. Keep breath 0 through walk-out / leftover walkFadeHold during cutRec ease;
      // tickCutRecBreath holds cutRec under recoveryWalkOut / walkFadeHold so max(ck, wk) /
      // hold-under-rise own the post-recovery seat when stride arms. Idle cut recovery settle still
      // eases when not walking / walk-out / hold. Cut recovery settle→guard unchanged. AABB planted.
      if (recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      return amp * (1 - ck);
    }
    if (f.sheatheT > 0) {
      // Clash sheathe destRect leftover: sheatheT/SHEATHE_MS amp scale used
      // to seat full breath the tick clash/tech / from-cut recovery armed
      // sheatheT (~1.5), then dump again the tick T hit 0 (~1.8). Keep 0
      // through sheathe (same as cut recovery). cutRecBreathT eases after
      // sheathe ends (tickSheathe). Feint already returned via feintFade.
      // Guard/walk mid-sheathe stay 0 (raise/rise plant from 0). Clash sheathe
      // settle→walk: arm cutRec on walk mid-end so max(ck, wk) owns the
      // post-sheathe seat (was rise-only ~0.86 mid-stride). Clash sheathe
      // settle→guard: arm cutRec on guard mid-end so max(ck, rk) owns the
      // post-sheathe seat (was raise-only ~0.43 mid-raise). sheatheDip hump
      // unchanged. AABB planted.
      return 0;
    }
    if (f.phase !== "idle") return 0;
    // Guard drop settle→walk destRect leftover: leftover raise k breath used to
    // seat ~1.3 mid-stride (walking preferred over raise k), so the chest hopped
    // while leftover drop lean still rode destRect — a hop, not a plant. Same
    // hole cut recovery / feint settle→walk closed. Math.max(raise k, rise k)
    // so breath stays suppressed then dies with rise. Pure idle→walk still
    // eases with rise. Idle drop still eases with raise. Walk-out sheet
    // leftover unchanged (guardDropFade). AABB planted.
    // Guard drop settle→walk plant-release destRect leftover: leftover raise k / max(rk, wk)
    // used to seat mid-stride the tick A/D / rival closing walked through drop after tele/walk-in
    // (walkRise restarted from 0 under max(rk, wk); restGuardWalk / walkFadeHold already rested
    // walk under the drop), then ease — a hop, not a plant. Same hole feint / cutRec / chip stun
    // settle→walk plant-release already closed. Keep breath 0 through walking / walk-out /
    // leftover walkFadeHold during drop; tickGuardPose arms cutRecBreathT when drop ends
    // mid-stride / under walkFadeHold so max(ck, wk) / hold-under-rise own the post-drop seat.
    // Idle drop still eases with raise k. Pure idle→walk still eases with rise. Walk-out sheet
    // leftover unchanged (guardDropFade). AABB planted.
    if (f.guardPoseK > 0 && !f.guarding && (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02)) {
      return 0;
    }
    if (walking(f)) return amp * (1 - walkRiseK(f));
    // Walk→guard destRect lean leftover: settle k now holds through raise.
    // Idle settle→guard destRect leftover: raise-only k used to seat ~1.3
    // the tick S raised mid-settle ((1-raiseK)≈1 while settle still suppressed
    // the chest), then ease out — a hop, not a plant. Keep the stronger of
    // settle k / raise k so breath stays suppressed then dies with raise.
    // Idle settle still crossfades breath when not guarding. Pure idle→guard
    // still eases with raise k below.
    if (f.walkSettleT > 0) {
      if (f.guarding || f.guardPoseK > 0) {
        const sk = walkSettleK(f);
        const rk = guardRaiseK(f);
        return amp * (1 - Math.max(sk, rk));
      }
      return amp * (1 - walkSettleK(f));
    }
    // S used to dump leftover breath (~1.6) the same tick the block sheet
    // locked. Ease with destRect raise k. Raise still 0ms.
    if (f.guarding || f.guardPoseK > 0) return amp * (1 - guardRaiseK(f));
    return amp;
  }

  function sheathing(f) {
    return f.sheatheT > 0 && f.phase === "idle" && !f.guarding && !f.falling && f.stunT <= 0 && !walking(f) && f.feintT <= 0;
  }

  function tickGuardPose(f, dt) {
    if (!f) return;
    // Combat poses lock immediately — leftover raise must not ride a slash.
    // Guard break leftover eases leftover k (forced drop is a release,
    // not a combat pose). Fall / KO still snap leftover k.
    // Reversal plant leftover: leftover k used to snap (leftover block
    // dumped into windup). Ease leftover k like S-release.
    // Slash leftover k: leftover destRect plant used to dump the same
    // tick startAttack armed. Ease leftover k like reversal.
    // Golpe leftover k: leftover destRect plant used to dump the same
    // tick startAttack(golpe) armed. Ease leftover k like slash leftover.
    // Empty-K leftover destRect plant: leftover destRect plant used to dump
    // the same tick startBolt armed. Ease leftover k like slash leftover.
    // Stun leftover k: leftover destRect plant used to dump the same
    // tick landHit set stunT. Ease leftover k like slash leftover.
    // Throw KD leftover destRect plant: leftover destRect plant used to
    // dump the same tick landThrow set thrownT. Ease leftover k like
    // stun leftover.
    // Throw-from-guard plant leftover: leftover k used to snap (leftover
    // block dumped into windup). Ease leftover k like reversal.
    // Tech-from-guard plant leftover: leftover k used to snap (leftover
    // block dumped into windup). Ease leftover k like throw-from-guard.
    if (f.falling || f.hp <= 0) {
      f.guardPoseK = 0;
      return;
    }
    if (f.thrownT > 0) {
      if (throwKdLeftoverPlanting(f)) {
        const step = dt / GUARD_RAISE_MS;
        if (f.guardPoseK <= step) f.guardPoseK = 0;
        else f.guardPoseK -= step;
        return;
      }
      f.guardPoseK = 0;
      return;
    }
    if (f.stunT > 0) {
      if (stunLeftoverPlanting(f)) {
        const step = dt / GUARD_RAISE_MS;
        if (f.guardPoseK <= step) f.guardPoseK = 0;
        else f.guardPoseK -= step;
        return;
      }
      f.guardPoseK = 0;
      return;
    }
    if (f.phase !== "idle" || f.boltPhase) {
      if (reversalPlanting(f) || throwGuardPlanting(f) || techGuardPlanting(f) || slashLeftoverPlanting(f) || golpeLeftoverPlanting(f) || boltLeftoverPlanting(f)) {
        const step = dt / GUARD_RAISE_MS;
        if (f.guardPoseK <= step) f.guardPoseK = 0;
        else f.guardPoseK -= step;
        return;
      }
      f.guardPoseK = 0;
      return;
    }
    const want = f.guarding ? 1 : 0;
    const step = dt / GUARD_RAISE_MS;
    const prevGuardK = f.guardPoseK;
    const d = want - f.guardPoseK;
    if (Math.abs(d) <= step) f.guardPoseK = want;
    else f.guardPoseK += Math.sign(d) * step;
    // Guard drop settle→walk plant-release destRect leftover: walk / walkFadeHold mid-end
    // used to dump breath when guardPoseK cleared while plant-release had already seated
    // under restGuardWalk; arm cutRec and let cut recovery settle→walk max(ck, wk) /
    // hold-under-rise own it. Idle drop still eases with raise k (no cutRec arm).
    if (
      prevGuardK > 0 &&
      f.guardPoseK === 0 &&
      !f.guarding &&
      f.phase === "idle" &&
      !f.boltPhase &&
      f.feintT <= 0 &&
      (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02)
    ) {
      f.cutRecBreathT = GUARD_RAISE_MS;
    }
  }

  function guardRaiseK(f) {
    if (!f || f.falling || f.hp <= 0) return 0;
    if (f.thrownT > 0 && !throwKdLeftoverPlanting(f)) return 0;
    if (f.stunT > 0 && f.thrownT <= 0 && !stunLeftoverPlanting(f)) return 0;
    if ((f.phase !== "idle" || f.boltPhase) && !reversalPlanting(f) && !throwGuardPlanting(f) && !techGuardPlanting(f) && !slashLeftoverPlanting(f) && !golpeLeftoverPlanting(f) && !boltLeftoverPlanting(f) && !stunLeftoverPlanting(f) && !throwKdLeftoverPlanting(f)) return 0;
    const u = Math.max(0, Math.min(1, f.guardPoseK || 0));
    return u * u * (3 - 2 * u);
  }

  function guardPlant(f) {
    // destRect-only. AABB stays planted. Raise is still 0ms.
    const k = guardRaiseK(f);
    if (k <= 0) return { rot: 0, oy: 0 };
    return { rot: f.facing * -0.10 * k, oy: 4 * k };
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
    // Feint never extended. Leftover sheathe dip would plant −5 on the
    // pull. destRect leftover breath eases with feintFade instead.
    if (f.feintT > 0) return 0;
    const u = f.sheatheT / SHEATHE_MS;
    return -5 * Math.sin(Math.PI * u);
  }

  function tickSheathe(f, dt) {
    if (!f) return;
    if (f.stunT > 0 || f.falling) {
      f.sheatheT = 0;
      f.cutRecBreathT = 0;
      return;
    }
    if (f.sheatheT > 0) {
      const prevSheathe = f.sheatheT;
      f.sheatheT = Math.max(0, f.sheatheT - dt);
      // Clash sheathe destRect leftover: when clash/tech / from-cut sheathe
      // drains, arm cutRecBreathT so breath eases in (was a ~1.8 dump the
      // tick T hit 0). Feint zeros sheatheT in tickFeint (feintFade owns
      // that settle).
      // Clash sheathe settle→walk destRect leftover: walk mid-end used to
      // skip cutRec ("rise owns") but mid-rise seats ~0.86; arm cutRec and
      // let cut recovery settle→walk max(ck, wk) / hold-under-rise own it.
      // Clash sheathe settle→guard destRect leftover: guard mid-end used to
      // skip cutRec ("raise owns") but mid-raise seats ~0.43; arm cutRec and
      // let cut recovery settle→guard max(ck, rk) / hold-under-raise own it.
      if (prevSheathe > 0 && f.sheatheT === 0 && f.phase === "idle" && !f.boltPhase && f.feintT <= 0) {
        f.cutRecBreathT = GUARD_RAISE_MS;
      }
    }
  }

  // Cut recovery destRect leftover: drain post-cut breath ease.
  // Runs after updateGuard so raise owns the same tick (tickSheathe used to
  // drain one frame before guarding armed — a seat on S mid-ease).
  // Cut recovery settle→guard: keep cutRecBreathT through raise. Do not
  // drain while raise still climbs under cutRec k (draining both made a
  // valley / seat). When raise k owns the suppress, clear cutRec. Idle
  // settle still drains. Cut recovery settle→walk: same hold under rise;
  // clear when rise k owns. Combat / feint / bolt still cut. AABB planted.
  function tickCutRecBreath(f, dt) {
    if (!f || f.cutRecBreathT <= 0) return;
    if (f.stunT > 0 || f.falling) {
      f.cutRecBreathT = 0;
      return;
    }
    if (f.phase !== "idle" || f.boltPhase || f.feintT > 0) f.cutRecBreathT = 0;
    else if (f.guarding || f.guardPoseK > 0) {
      if (GUARD_RAISE_MS <= 0) f.cutRecBreathT = 0;
      else {
        const u = Math.max(0, Math.min(1, f.cutRecBreathT / GUARD_RAISE_MS));
        const ck = u * u * (3 - 2 * u);
        if (guardRaiseK(f) >= ck) f.cutRecBreathT = 0;
      }
    } else if (walking(f)) {
      if (GUARD_RAISE_MS <= 0) f.cutRecBreathT = 0;
      else {
        const u = Math.max(0, Math.min(1, f.cutRecBreathT / GUARD_RAISE_MS));
        const ck = u * u * (3 - 2 * u);
        if (walkRiseK(f) >= ck) f.cutRecBreathT = 0;
      }
    } else if (recoveryWalkOut(f) || f.walkFadeHold > 0.02) {
      // Cut recovery settle→walk plant-release: hold cutRec through early-step hold /
      // recoveryWalkOut (do not drain — idleBreath keep-0). Walking branch owns once
      // stride arms (max ck, wk / clear when rise owns). Idle settle still drains.
    } else f.cutRecBreathT = Math.max(0, f.cutRecBreathT - dt);
  }

  function finishWinnerCut(dt) {
    const win = koTarget === player ? rival : player;
    if (!win || win.falling) return;
    if (win.phase !== "idle") {
      advanceAttack(win, dt);
      flushLungePlantScrape(win);
    }
    // Winner K finish leftover (v411): killing dart left boltPhase recovery
    // frozen through falling/over — finishWinnerCut only advanced melee phase
    // (Space/L/throw recovery + sheathe already ran), so the knife plant sat
    // locked for the whole crumple while a finished cut sheathed. Soft:
    // advanceBoltFighter(win) on recovery so empty/spent 280/380 completes
    // then sheathes (holdCut) like a finished cut. Undelivered startup cancels
    // without birthing a dart into the crumple (beginFall already nulls bolt).
    // Loser bolt still snaps via falling gate. tipX / plants / BOLT_* / meter
    // / frames locked. No new combat verb.
    if (win.boltPhase === "recovery") {
      advanceBoltFighter(win, dt);
    } else if (win.boltPhase === "startup") {
      const fromCut = win.boltHoldCut;
      win.boltPhase = "";
      win.boltT = 0;
      win.boltHoldCut = false;
      win.boltSuper = false;
      win.clashPlant = false;
      win.linkPlant = false;
      win.holdCutPlant = false;
      win.linkSheathe = 0;
      win.telegraph = false;
      if (fromCut) win.sheatheT = SHEATHE_MS;
      if (brasaFxKind === "cast") {
        const home = brasaHomeYou ? player : rival;
        if (home === win) {
          brasaFxT = 0;
          brasaFxKind = "";
        }
      }
    }
    // Winner feint finish leftover (v415): killing dart after a post-recovery
    // feint left feintT frozen through falling/over — finishWinnerCut advanced
    // melee + bolt recovery + sheathe (v411) but never tickFeint, so the 100ms
    // pull sat locked for the whole crumple. Soft: tickFeint(win) so
    // FEINT_RECOVERY completes then eases (feintFade). Winner bolt finish
    // (v411) kept. FEINT_RECOVERY 100 / tipX / plants / pad / frames locked.
    tickFeint(win, dt);
    tickSheathe(win, dt);
    tickCutRecBreath(win, dt);
    // Winner push finish leftover (v416): live pushblock / clash shove on the
    // winner used to freeze through falling/over — finishWinnerCut advanced
    // melee + bolt + sheathe + feint (v411/v415) but never drained pushT, so a
    // 240px PB shove sat locked for the whole crumple (loser already zeroed in
    // beginFall). Soft: slide + drain win.pushT (mirror play) then clamp.
    // Winner feint/bolt finish kept. PUSHBLOCK_PX 240 / GUARD_PUSH_MS 150 /
    // tipX / plants / pad / frames locked. No new combat verb.
    if (win.pushT > 0) {
      win.x += win.pushVel * dt;
      win.pushT = Math.max(0, win.pushT - dt);
      clampFighter(win);
    }
    // Winner riposte finish leftover (v418): perfect-parry RIPOSTE_WIN live on
    // the winner used to freeze through falling/over — finishWinnerCut never
    // tickRiposte, so zone-S pad gleam sat locked for the crumple (play already
    // drains under hitstop). Soft: tickRiposte(win) + syncRipostePad. Winner
    // push/feint/bolt finish kept. RIPOSTE_WIN_MS 280 locked. No new combat verb.
    tickRiposte(win, dt);
    syncRipostePad();
  }

  function slashPose(f) {
    // KO slashPose ox under pf leftover (v347): mid-cut / windup / knife KO used to
    // dump destRect ox/rot the same tick hp hit 0 / beginFall set falling (stun path
    // gated hp>0; falling hard-zeroed ox), while parryFade still owned the cut→hurt
    // sheet — a hop, not a plant. Chip stun already eases fromOx under pf. Mirror
    // throw interrupt / hit interrupt. destRect-only. AABB planted (bodyAABB zeros
    // falling). poseBitmap still hurt. Extra destRect rot stays 0 once pf dies.
    // Idle KO (no parryFadeT) still ox 0 + crumple oy. tipX / plants / frames locked.
    if (f.falling || (f.hp <= 0 && (f.parryFadeT || 0) > 0)) {
      const t = f.falling ? Math.min(1, f.fallT / FALL_MS) : 0;
      const lift = f.falling ? (1 - t) * (1 - t) : 0;
      const pk = parryFade(f);
      if (pk > 0.02) {
        const sheet = f.parryFadeSheet || "slash";
        const golpe = f.cut === "golpe";
        let fromRot;
        let fromOx;
        let fromOy;
        if (sheet === "windup") {
          fromRot = golpe ? -0.24 : -0.42;
          fromOx = golpe ? -18 : -36;
          fromOy = golpe ? 2 : 4;
        } else if (sheet === "knife") {
          fromRot = 0;
          fromOx = 0;
          fromOy = 0;
        } else {
          fromRot = golpe ? 0.32 : 0.55;
          fromOx = golpe ? 40 : 72;
          fromOy = golpe ? -6 : -10;
        }
        return {
          rot: f.facing * fromRot * pk,
          ox: f.facing * fromOx * pk,
          oy: fromOy * pk + (-10 * lift * crumpleFade(f)),
        };
      }
      if (f.falling) {
        // destRect-only. AABB planted. Freeze sat at oy 0; −10 used
        // to dump the same tick beginFall set falling. Ease leftover
        // plant into the lift. Extra rot stays 0.
        return { rot: 0, ox: 0, oy: -10 * lift * crumpleFade(f) };
      }
    }
    // Throw knockdown reuses hurt/KO art. destRect planted; no extra rot.
    // Throw KD leftover destRect plant: leftover k still drives destRect
    // via guardPlant. Hurt rot stays 0 so leftover guard rot does not
    // stack extra. Extra destRect rot stays 0.
    // Throw interrupt leftover (v339): ease leftover mid-cut / windup / knife
    // ox/rot into plant over parryFade (landThrow armed pf). Idle throw still
    // snaps (pf 0). AABB planted (bodyAABB zeros via stunT). No new combat verb.
    if (f.thrownT > 0 && f.hp > 0) {
      const pk = parryFade(f);
      if (pk > 0.02) {
        const sheet = f.parryFadeSheet || "slash";
        const golpe = f.cut === "golpe";
        let fromRot;
        let fromOx;
        let fromOy;
        if (sheet === "windup") {
          fromRot = golpe ? -0.24 : -0.42;
          fromOx = golpe ? -18 : -36;
          fromOy = golpe ? 2 : 4;
        } else if (sheet === "knife") {
          fromRot = 0;
          fromOx = 0;
          fromOy = 0;
        } else {
          fromRot = golpe ? 0.32 : 0.55;
          fromOx = golpe ? 40 : 72;
          fromOy = golpe ? -6 : -10;
        }
        return {
          rot: f.facing * fromRot * pk,
          ox: f.facing * fromOx * pk,
          oy: fromOy * pk,
        };
      }
      return { rot: 0, ox: 0, oy: 0 };
    }
    // Chip stun is not the KO crumple. Flinch is destRect rot around the
    // planted foot; AABB stays planted. ox -22 used to slide the sprite
    // off the AABB cut (spark inset vs hurt) by a full step.
    if (f.stunT > 0 && f.hp > 0) {
      const k = Math.min(1, f.stunT / HITSTUN);
      // Stun leftover k: leftover destRect plant used to dump the same
      // tick landHit set stunT. leftover k still drives destRect via
      // guardPlant. Scale stun rot so leftover guard rot does not stack
      // extra. Extra destRect rot stays 0.
      const lk = stunLeftoverPlanting(f) ? guardRaiseK(f) : 0;
      // Parry interrupt leftover (v325): leftover active ox/rot used to dump
      // the same tick landParry set stunT (poseBitmap idle). Ease into flinch
      // over parryFade. AABB planted (bodyAABB still zeros stun ox).
      const pk = parryFade(f);
      if (pk > 0.02) {
        // Hit interrupt leftover (v336): ease leftover windup/knife/slash ox into flinch.
        // Attacker perfect-parry still latches slash (active ox). AABB planted.
        const sheet = f.parryFadeSheet || "slash";
        const golpe = f.cut === "golpe";
        let fromRot;
        let fromOx;
        let fromOy;
        if (sheet === "windup") {
          fromRot = golpe ? -0.24 : -0.42;
          fromOx = golpe ? -18 : -36;
          fromOy = golpe ? 2 : 4;
        } else if (sheet === "knife") {
          fromRot = 0;
          fromOx = 0;
          fromOy = 0;
        } else {
          fromRot = golpe ? 0.32 : 0.55;
          fromOx = golpe ? 40 : 72;
          fromOy = golpe ? -6 : -10;
        }
        const flinch = -0.16 * k * (1 - lk);
        return {
          rot: f.facing * (fromRot * pk + flinch * (1 - pk)),
          ox: f.facing * fromOx * pk,
          oy: fromOy * pk,
        };
      }
      return { rot: f.facing * -0.16 * k * (1 - lk), ox: 0, oy: 0 };
    }
    // Walk sheet is dedicated but still needs walkPose — zeroing it made
    // ox/oy snap at every idle↔walk swap (slide). Combat poses stay locked.
    if (walking(f)) return walkPose(f);
    if (usingDedicatedPose(f)) return { rot: 0, ox: 0, oy: 0 };
    // Dead: dedicated block sheet zeros this. destRect-only plant is guardPlant.
    if (f.guarding) return { rot: f.facing * -0.14, ox: f.facing * -12, oy: 6 };
    if (f.phase === "startup") {
      if (f.cut === "golpe") return { rot: f.facing * -0.24, ox: f.facing * -18, oy: 2 };
      return { rot: f.facing * -0.42, ox: f.facing * -36, oy: 4 };
    }
    if (f.phase === "active") {
      if (f.cut === "golpe") return { rot: f.facing * 0.32, ox: f.facing * 40, oy: -6 };
      return { rot: f.facing * 0.55, ox: f.facing * 72, oy: -10 };
    }
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
    const gp = guardPlant(f);
    let dy = FLOOR_Y - d.footY * s + pose.oy + f.walkSettleOy * sk + idleBreath(f) + sheatheDip(f) + settleDip() + gp.oy;
    let dx = ox - d.footX * s;
    // Hurt pose is already the ~45° crumple. Extra canvas rot (0.785 / 1.25)
    // stacked it onto a log; facing* extra stood the rival back up.
    const rot = pose.rot + f.walkSettleRot * sk + gp.rot;
    return { dx, dy, dw, dh, rot, pivX: ox, pivY: FLOOR_Y };
  }

  function bodyAABB(f) {
    const s = worldScale();
    const d = poseFamily(f).idle;
    // KO slashPose ox under pf leftover (v347): hp<=0 used to fall through to
    // slashPose while stunT>0&&hp>0 was the only chip-stun zero — after pf ox
    // ease, AABB would ride leftover cut ox. Keep hurt box planted on KO.
    const pose = (walking(f) || (f.stunT > 0 && f.hp > 0) || f.falling || f.hp <= 0) ? { rot: 0, ox: 0, oy: 0 } : slashPose(f);
    const ox = f.x + pose.ox;
    const dy = FLOOR_Y - d.footY * s + pose.oy;
    const dx = ox - d.footX * s;
    const sh = sheetOf(f);
    const b = sh.body;
    // CID/ROAN you-family P2 facing flip leftover (v450): mirror body about foot.
    let bx = b.x;
    if (sheetFlipX(f)) bx = 2 * sh.footX - (b.x + b.w);
    return { x: dx + bx * s, y: dy + b.y * s, w: b.w * s, h: b.h * s };
  }

  function hurtW(f) {
    return bodyAABB(f).w;
  }

  function bladeTipX(f) {
    // TipX under plant fades leftover: connected slash-L / clash-Space/L used to
    // dump tip onto windup the same tick poseBitmap flipped while leftover slash
    // still owned the sheet (linkPlantFade / clashPlantFade), so tip juice hopped
    // ~240px off the visible blade — a hop, not a plant. Same hole spark origin
    // leftover already closed for clash-K / idle-sheathe-K castPlantXY. Ease
    // slash→pose tip with that leftover fade. HoldCut still slash tip after holdCutFade
    // (v346 eases leftover sheathe→slash under holdCutFade). Telegraph /
    // idle K cast still rides castPlantXY. Active hitbox still phase===active only.
    // Reversal/throw-guard settle→plant tip leftover: ease block→pose tip with
    // max(reversalPlantFade, throwGuardPlantFade) (mirror link/clash). AABB planted.
    // Tip under telegraphFade leftover: ease idle-edge→pose tip with telegraphFade
    // (mirror plant fades; tf rises 0→1). AABB planted. No new combat verb.
    // Tip under feintFade leftover: ease windup→pose tip with feintFade
    // (fk dies 1→0; mirror plant fades / tele tip ease). AABB planted.
    const r = destRect(f);
    const d = poseSheet(f);
    const s = poseScale(f);
    let tip = d.tipX != null ? poseMarkWorldX(f, d, d.tipX, r, s) : sheetEdgeTipWorldX(f, d, r, s);
    const k = Math.max(clashPlantFade(f), linkPlantFade(f));
    if (k > 0.02) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipX != null) {
        const sx = poseMarkWorldX(f, sl, sl.tipX, r, s);
        // Tip under holdCutFade / boltPlant leftover (v346): recovery sheathe tip may
        // sit mid-sheathe into connected slash-L — start ease from leftover sheathe blend
        // (linkSheathe) so tip does not hop mid-sheathe→full slash the tick linkPlant arms.
        // Clash leftover pose still full slash (linkSheathe 0). HoldCut uses holdCutFade.
        let from = sx;
        if (linkPlantFade(f) > 0.02 && (f.linkSheathe || 0) > 0.02) {
          const ex = sheetEdgeTipWorldX(f, d, r, s);
          from = ex + (sx - ex) * (f.linkSheathe || 0);
          tip = from + (tip - from) * (1 - k);
        } else {
          tip = sx + (tip - sx) * (1 - k);
        }
      }
    }
    // Reversal/throw-guard settle→plant tip leftover: tip used to hop
    // guard→windup the same tick poseBitmap flipped while leftover block
    // still owned the sheet (reversalPlantFade / throwGuardPlantFade) —
    // a hop, not a plant. Mirror tipX under plant fades (slash→pose for
    // link/clash). Ease block→pose tip with that leftover fade. Block has
    // no tipX (steelX is flash-only); sheet-edge fallback matches guard tip.
    // tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
    const pk = Math.max(reversalPlantFade(f), throwGuardPlantFade(f), techGuardPlantFade(f));
    // Tip under throw-guard short raise leftover: leftover gpk / tgf can die
    // in one tick (~304px tip dump while raise short). Hold-one-tick is not
    // enough (arm already near windup when tgf≈0.1). Mirror telegraphFade —
    // ease block→pose tip over GUARD_RAISE_MS from plant start (phaseT).
    // Full raise: gpk from 1 tracks the same smoothstep mirror, so max is a
    // no-op vs leftover pk. Tip under reverse short raise leftover: same
    // gpk one-tick hole on L+S; mirror tipPlantK while reversalPlanting.
    // Tip under tech-guard short raise leftover: same gpk one-tick hole on
    // Space+S tech; mirror tipPlantK while techGuardPlanting || techGuardTip
    // (tech planting requires leftover k; tip latch holds phaseT ease after
    // gpk dies). Tip under slash/golpe leftover short raise leftover: same
    // gpk one-tick hole on Space/L from leftover drop when tele off; mirror
    // tipPlantK while (slashLeftoverPlanting || golpeLeftoverPlanting ||
    // boltLeftoverPlanting) && leftoverPlantTip && !telegraphing (latch from
    // leftover k at startAttack / startBolt; tele tip still owns idle ease;
    // idle/cancel/special-cancel still snap). raiseT uses boltT on bolt
    // startup (mirror linkPlantFade). Sheet plant fades / tickGuardPose drain unchanged. castPlantXY K
    // path unchanged. AABB planted. No new combat verb.
    let tipPlantK = pk;
    // Tip under stun / throwKd leftover short raise leftover: leftover gpk
    // dies while poseBitmap already idle/hurt — tip dumped off block. Ease
    // block→pose tip with max(pk, guardRaiseK) while stunLeftoverPlanting ||
    // throwKdLeftoverPlanting (gpk smoothsteps leftover drain; no phaseT).
    // Tip under guard drop leftover: S-release / guard-break leftover tip used
    // to dump onto idle (~40px tipY) the same tick guarding cleared while
    // guardDropFade still owned the block sheet — a hop, not a plant. Same
    // hole tip under stun/throwKd already closed for leftover gpk drain.
    // Ease block→pose tip with max(pk, guardRaiseK) while guardDropFade
    // (gdf === guardRaiseK on idle drop; no phaseT). Attack leftover short
    // raise still uses phaseT/boltT raiseT below.
    if (stunLeftoverPlanting(f) || throwKdLeftoverPlanting(f) || guardDropFade(f) > 0.02) {
      tipPlantK = Math.max(pk, guardRaiseK(f));
    } else if ((throwGuardPlanting(f) || reversalPlanting(f) || techGuardPlanting(f) || f.techGuardTip || ((slashLeftoverPlanting(f) || golpeLeftoverPlanting(f) || boltLeftoverPlanting(f)) && f.leftoverPlantTip && !telegraphing(f))) && GUARD_RAISE_MS > 0) {
      const tRaise = f.boltPhase === "startup" ? f.boltT : (f.phaseT || 0);
      const u = Math.max(0, Math.min(1, tRaise / GUARD_RAISE_MS));
      const raiseT = u * u * (3 - 2 * u);
      tipPlantK = Math.max(pk, 1 - raiseT);
    }
    if (tipPlantK > 0.02) {
      const bl = poseFamily(f).block;
      if (bl) {
        const bx = bl.tipX != null
          ? poseMarkWorldX(f, bl, bl.tipX, r, s)
          : sheetEdgeTipWorldX(f, d, r, s);
        tip = bx + (tip - bx) * (1 - tipPlantK);
      }
    }
    // Tip under sheathe↔guardDrop tip gate (v345): guardDropFade zeros sheatheFade so
    // block owns the sheet, but sheathing() still holds slash in poseSheet — tipPlantK
    // eased block→slash (~45px) while draw went block→idle. Raise mid-sheathe tip was
    // slash→block under sf; release dumped onto pure block then idle. Overwrite: ease
    // slash-biased block (sf from sheatheT) → idle-edge with gdf (mirror restGuard +
    // unfinished sheathe). Pure drop (no sheatheT) still tipPlantK above. AABB planted.
    if (guardDropFade(f) > 0.02 && f.sheatheT > 0) {
      const gdf = guardDropFade(f);
      const u = 1 - Math.max(0, Math.min(1, f.sheatheT / SHEATHE_MS));
      const sf = 1 - u * u * (3 - 2 * u);
      const sl = poseFamily(f).slash;
      const sx = sl && sl.tipX != null
        ? poseMarkWorldX(f, sl, sl.tipX, r, s)
        : sheetEdgeTipWorldX(f, d, r, s);
      const bl = poseFamily(f).block;
      const bx = bl && bl.tipX != null
        ? poseMarkWorldX(f, bl, bl.tipX, r, s)
        : sheetEdgeTipWorldX(f, d, r, s);
      const ex = sheetEdgeTipWorldX(f, d, r, s);
      const mid = bx + (sx - bx) * sf;
      tip = mid + (ex - mid) * (1 - gdf);
    }
    // Tip under guard raise leftover (v342): S-press used to dump tip onto block
    // (~sheet-edge / tipY) the same tick poseBitmap flipped while raise k still
    // low — a hop, not a raise. Mirror tip under telegraphFade (rk rises 0→1).
    // Ease idle-edge→block tip with guardRaiseK while guarding idle. Drop still
    // tipPlantK+guardDropFade (guarding cleared). Plant-from-guard still tipPlantK
    // (phase startup). Full raise rk=1 no-op. AABB planted. No new combat verb.
    if (f.guarding && f.phase === "idle" && !f.boltPhase) {
      const rk = guardRaiseK(f);
      if (rk < 0.98) {
        const ex = sheetEdgeTipWorldX(f, d, r, s);
        tip = ex + (tip - ex) * rk;
      }
    }
    // Tip under sheatheFade leftover (v345): tip used to sit on full slash then dump
    // idle-edge (~68px) when sheatheT died (poseSheet slash via sheathing; draw rested
    // idle+slash). Raise mid-sheathe dumped ~70px onto idle-edge the tick block flipped
    // while sheatheFade still owned slash overlay. Mirror tip under feintFade. Ease
    // slash→pose tip with sheatheFade (sf dies 1→0). Raise mid-sheathe: pose tip is block
    // after rk ease — slash→block under sf. Drop mid-sheathe still tipPlantK+idle seat
    // above (sf 0 while gdf). tip under guard raise / feint / tele / tipPlantK+tele
    // v342–344 unchanged. castPlantXY K path unchanged. tip markers / steelX / bladeBox /
    // active hitbox unchanged. AABB planted.
    // Tip under holdCutFade / boltPlant leftover (v346): recovery sheatheFade also seats
    // pose tip on idle-edge (mirror restSheathe / sheathing) so tip tracks the fading cut
    // into the special-cancel door — holdCutFade then eases leftover-sheathe→slash.
    // holdCutFade zeros sheatheFade during plant. >0 (not 0.02): last smoothstep tick
    // must not snap back onto full slash then dump idle-edge (~68px). Mirror restSheathe.
    const sfTip = sheatheFade(f);
    if (sfTip > 0) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipX != null) {
        const sx = poseMarkWorldX(f, sl, sl.tipX, r, s);
        let poseTip = tip;
        // sheathing / recovery fade keep poseSheet on slash while draw rests idle+slash —
        // tip would no-op on slash→slash. Seat pose tip on idle-edge (mirror restSheathe).
        // Raise mid-sheathe: pose tip is block after rk ease — slash→block under sf.
        if (sheathing(f) || (f.phase === "recovery" && (f.cut === "golpe" || f.cut === "slash") && !f.clashRec && !f.techRec && f.sheatheT <= 0)) {
          poseTip = sheetEdgeTipWorldX(f, d, r, s);
        }
        tip = sx + (poseTip - sx) * (1 - sfTip);
      }
    }
    // Tip under holdCutFade leftover (v346): tip / cast used to sit on full slash while
    // leftover sheathe still owned the sheet (holdCutFade; draw sk =
    // 1 − hf·(1−linkSheathe)), so juice hopped ~26px off the visible blade when the dart
    // planted from the cut pose — a hop, not a plant. Mirror tip under sheatheFade /
    // linkPlantFade. Ease leftover-sheathe tip→slash with holdCutFade (sk mirrors draw).
    // After hf dies tip stays slash through bolt plant. castPlantXY follows bladeTip
    // (slash once hf dies) so dart birth stays on cut tip. Tip under boltPlantFade still 0
    // (holdingCutBolt). tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
    const hfTip = holdCutFade(f);
    if (hfTip > 0) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipX != null) {
        const sx = poseMarkWorldX(f, sl, sl.tipX, r, s);
        const ex = sheetEdgeTipWorldX(f, d, r, s);
        const sheatheK = f.linkSheathe || 0;
        const sk = 1 - hfTip * (1 - sheatheK);
        tip = ex + (sx - ex) * sk;
      }
    }
    // Tip under telegraphFade leftover: tip used to hop idle/walk→windup
    // (throwKnife on K) the same tick poseBitmap flipped while leftover idle
    // still owned the sheet (telegraphFade) — a hop, not a plant. Mirror tipX
    // under plant fades. Ease idle-edge→pose tip with telegraphFade (tf rises
    // 0→1). Idle/walk have no tipX; sheet-edge matches pre-tele tip. Rival same.
    // Tip under tipPlantK+tele leftover stack (v343): leftoverPlantTip + tele used
    // to dump tip onto idle-edge while leftover block blend still owned the tip
    // (tipPlantK gated !telegraphing). Bias idle-edge toward block by latched
    // leftoverPlantTipK so tele eases leftover→pose. TipX under plant fades /
    // reversal tip / tele-off tipPlantK unchanged. castPlantXY K path unchanged.
    // tip markers / steelX / bladeBox / active hitbox unchanged. AABB planted.
    if (telegraphing(f)) {
      const tf = telegraphFade(f);
      if (tf < 0.98) {
        let ex = sheetEdgeTipWorldX(f, d, r, s);
        const tipK = f.leftoverPlantTipK || 0;
        if (f.leftoverPlantTip && tipK > 0.02) {
          const bl = poseFamily(f).block;
          const bx = bl && bl.tipX != null
            ? poseMarkWorldX(f, bl, bl.tipX, r, s)
            : sheetEdgeTipWorldX(f, d, r, s);
          ex = ex + (bx - ex) * tipK;
        }
        tip = ex + (tip - ex) * tf;
      }
    }
    // Tip under feintFade leftover: tip used to hop windup→idle the same tick
    // poseBitmap flipped while leftover windup still owned the sheet
    // (feintFade) — a hop, not a plant (~304px while fk high). Mirror tip
    // under telegraphFade / tipX under plant fades. Ease windup→pose tip with
    // feintFade (fk dies 1→0). Rival same. Tip under telegraphFade / tipX
    // under plant fades / reversal tip unchanged. castPlantXY K path
    // unchanged. tip markers / steelX / bladeBox / active hitbox unchanged.
    // AABB planted.
    // Tip under mid-tele feint leftover (v344): mid-tele startFeint used to dump
    // tip onto full windup (~122px at tf≈0.5) when fk latched 1 while tele tip
    // was still mid-edge→windup. Bias windup tip toward idle-edge by latched
    // feintTipK so feintFade eases mid-tele→idle. Late tele tipK=1 is a no-op.
    // tip under feintFade / tele tip unchanged. AABB planted.
    const fk = feintFade(f);
    if (fk > 0.02) {
      const wu = poseFamily(f).windup;
      if (wu && wu.tipX != null) {
        let wx = poseMarkWorldX(f, wu, wu.tipX, r, s);
        const tipK = (f.feintTipK == null) ? 1 : f.feintTipK;
        if (tipK < 0.98) {
          const ex = sheetEdgeTipWorldX(f, d, r, s);
          wx = ex + (wx - ex) * tipK;
        }
        tip = wx + (tip - wx) * (1 - fk);
      }
    }
    // Tip under boltPlantFade leftover: tip used to hop knife→idle the same tick
    // dart birth popped boltPhase to recovery while leftover knife still owned
    // the sheet (boltPlantFade; poseBitmap already idle) — a hop, not a plant
    // (~339px while bf high). Mirror tip under feintFade. Ease throwKnife→pose
    // tip with boltPlantFade (bf dies 1→0). Special-cancel still 0
    // (holdingCutBolt). castPlantXY K path unchanged. tip markers / steelX /
    // bladeBox / active hitbox unchanged. AABB planted.
    const bfTip = boltPlantFade(f);
    if (bfTip > 0.02) {
      const knife = poseFamily(f).throwKnife || poseFamily(f).windup;
      if (knife && knife.tipX != null) {
        const kx = poseMarkWorldX(f, knife, knife.tipX, r, s);
        tip = kx + (tip - kx) * (1 - bfTip);
      }
    }
    // Tip under throwPlantFade leftover (v353): tip used to sit on full windup while
    // restThrow already faded idle under throwPlantFade, then dump ~308px onto
    // idle-edge the tick recovery ended (poseBitmap still windup through recovery;
    // tip under boltPlantFade already eased knife→idle) — a hop, not a plant.
    // Mirror tip under boltPlantFade. Ease windup→idle-edge with throwPlantFade
    // (trf dies 1→0). poseSheet stays windup so target idle-edge, not pose tip.
    // Tip under throwPlantFade tech leftover (v354): techRec used to skip this ease
    // so tip sat on windup while pf eased windup→pose (pose still windup — no-op),
    // then dumped ~303px when recovery ended after pf died. Allow ease once pf
    // dies (tech-from-guard / live pf still skip). Idle throw unchanged.
    // Idle throw still snaps (trf 0). tip markers / steelX / bladeBox / active
    // hitbox unchanged. AABB planted.
    const trfTip = throwPlantFade(f);
    // Keep ease through any live throwPlantFade (>0). >0.02 used to drop tip
    // back onto windup the last recovery ticks (poseBitmap still windup; restThrow
    // keeps idle base through trf>0) — a late dump, not a plant. Mirror restThrow.
    // Tip under throwPlantFade tech leftover (v354): tech throw recovery (not
    // tech-from-guard) eases windup→idle-edge with trf even while pf is live so
    // pf can blend tipK-sx→eased tip (pose was windup — a no-op; handoff after
    // pf died used to dump ~303px). Tech-from-guard still skips (techGuardPlantFade).
    // Idle throw / live-pf non-tech still eases when pf≤0.02.
    // Tip under throwPlantFade tech-from-guard leftover (v367): after tipPlantK raise
    // done, techGuardTip used to keep blocking trf → ~303px dump at rec end. Allow
    // ease once phaseT >= GUARD_RAISE_MS; live raise / tgf still skip.
    // Tip under throwPlantFade tech-from-guard leftover (v367): after tipPlantK raise
    // done, techGuardTip used to keep blocking trf → ~303px dump at rec end. Allow
    // ease once phaseT >= GUARD_RAISE_MS; live raise / tgf still skip.
    // Remap leftover recovery after raise into a fresh 1→0 ease so handoff seats windup (not mid-trf).
    if (trfTip > 0 && techGuardPlantFade(f) <= 0 && !f.techGuardTip) {
      const techThrowRec = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
      if (techThrowRec || parryFade(f) <= 0.02) {
        const wu = poseFamily(f).windup;
        if (wu && wu.tipX != null) {
          const wx = poseMarkWorldX(f, wu, wu.tipX, r, s);
          const ex = sheetEdgeTipWorldX(f, d, r, s);
          tip = wx + (ex - wx) * (1 - trfTip);
        }
      }
    } else if (trfTip > 0 && techGuardPlantFade(f) <= 0 && f.techGuardTip && GUARD_RAISE_MS > 0 && (f.phaseT || 0) >= GUARD_RAISE_MS) {
      const techThrowRec = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
      if (techThrowRec || parryFade(f) <= 0.02) {
        const wu = poseFamily(f).windup;
        if (wu && wu.tipX != null) {
          const wx = poseMarkWorldX(f, wu, wu.tipX, r, s);
          const ex = sheetEdgeTipWorldX(f, d, r, s);
          const rec = cutRecovery(f);
          const rem = Math.max(1, rec - GUARD_RAISE_MS);
          const u = Math.max(0, Math.min(1, ((f.phaseT || 0) - GUARD_RAISE_MS) / rem));
          const trfTipK = 1 - u * u * (3 - 2 * u);
          tip = wx + (ex - wx) * (1 - trfTipK);
        }
      }
    }
    // Tip under parryFade leftover: tip used to hop slash→idle the same tick
    // landParry set stunT while leftover cut still owned the sheet — a hop, not
    // a break. Mirror tip under feintFade. Ease slash→pose tip with parryFade
    // (pk dies 1→0). tip markers / bladeBox / active hitbox unchanged. AABB planted.
    // Hit interrupt leftover (v336): same ease for defender mid-cut / windup / knife
    // → idle (landHit / landBoltHit). Latch parryFadeSheet picks tip markers.
    // Throw interrupt leftover (v339): same ease mid-cut → hurt (landThrow).
    // Tech / KO interrupt leftover (v340): landThrowTech mid-cut → windup; KO mid-cut → hurt.
    // Tip under throw-startup→tech leftover (v341): tipPlantK edge blend used to dump
    // ~152px onto windup tip while sheet stayed windup. Latch tipK; ease blend→pose
    // through pf (mirror tip under feintFade). Idle tech / tech-from-guard still 0.
    const pkTip = parryFade(f);
    if (pkTip > 0.02) {
      const fam = poseFamily(f);
      const sheet = f.parryFadeSheet || "slash";
      const sl = sheet === "windup" ? fam.windup
        : sheet === "knife" ? (fam.throwKnife || fam.windup)
        : fam.slash;
      if (sl && sl.tipX != null) {
        let sx = poseMarkWorldX(f, sl, sl.tipX, r, s);
        const tipK = f.parryFadeTipK || 0;
        if (tipK > 0.02) {
          // Mirror tipPlantK from (block has no tipX → sheet-edge).
          const ex = sheetEdgeTipWorldX(f, d, r, s);
          sx = ex + (sx - ex) * (1 - tipK);
        }
        // Tip under throwPlantFade tech leftover (v354): tip may already be
        // throwPlant-eased toward idle-edge (tech throw recovery). Blend tipK-sx
        // → that eased tip with pk so throw-startup→tech still seats windup at
        // pk=1 while recovery eases out (no ~303 dump). Other pf paths unchanged
        // (tip still pose tip when throwPlant skipped).
        tip = sx + (tip - sx) * (1 - pkTip);
      }
    }
    return tip;
  }

  function bladeTipY(f) {
    // Draw-only. Slash tip plant leftover: juice Y used to sit on bladeBox
    // chest mid when tipY was missing.
    // TipX under plant fades leftover: ease slash→pose tipY with link/clash plant
    // fade (mirror bladeTipX). tip markers / active hitbox unchanged. AABB planted.
    const r = destRect(f);
    const d = poseSheet(f);
    const s = poseScale(f);
    let tip;
    if (d.tipY != null) tip = r.dy + d.tipY * s;
    else {
      const hb = bladeBox(f);
      tip = hb.y + hb.h * 0.45;
    }
    const k = Math.max(clashPlantFade(f), linkPlantFade(f));
    if (k > 0.02 && d.tipY != null) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipY != null) {
        const sy = r.dy + sl.tipY * s;
        let from = sy;
        if (linkPlantFade(f) > 0.02 && (f.linkSheathe || 0) > 0.02) {
          const id = poseFamily(f).idle;
          let ey;
          if (id && id.tipY != null) ey = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
          from = ey + (sy - ey) * (f.linkSheathe || 0);
          tip = from + (tip - from) * (1 - k);
        } else {
          tip = sy + (tip - sy) * (1 - k);
        }
      }
    }
    // Reversal/throw-guard settle→plant tip leftover: ease block→pose tipY
    // with max(reversalPlantFade, throwGuardPlantFade) (mirror bladeTipX).
    // Block tipY marked. tip markers / steelX / bladeBox unchanged. AABB planted.
    const pk = Math.max(reversalPlantFade(f), throwGuardPlantFade(f), techGuardPlantFade(f));
    // Tip under throw-guard / reverse / tech-guard / slash-golpe / bolt leftover
    // short raise leftover: ease block→pose tipY over GUARD_RAISE_MS from
    // plant start when throwGuardPlanting, reversalPlanting, techGuardPlanting,
    // techGuardTip, or (slash/golpe/bolt leftover planting && leftoverPlantTip &&
    // !telegraphing) (mirror bladeTipX tipPlantK; boltT on bolt startup). Tip
    // under stun / throwKd / guard-drop leftover: ease block→pose tipY
    // with max(pk, guardRaiseK) while stunLeftoverPlanting ||
    // throwKdLeftoverPlanting || guardDropFade (mirror bladeTipX; gpk drain,
    // no phaseT). Sheet plant fades / tickGuardPose drain
    // unchanged. AABB planted.
    let tipPlantK = pk;
    // Tip under stun / throwKd leftover short raise leftover: leftover gpk
    // dies while poseBitmap already idle/hurt — tip dumped off block. Ease
    // block→pose tip with max(pk, guardRaiseK) while stunLeftoverPlanting ||
    // throwKdLeftoverPlanting (gpk smoothsteps leftover drain; no phaseT).
    // Tip under guard drop leftover: S-release / guard-break leftover tip used
    // to dump onto idle (~40px tipY) the same tick guarding cleared while
    // guardDropFade still owned the block sheet — a hop, not a plant. Same
    // hole tip under stun/throwKd already closed for leftover gpk drain.
    // Ease block→pose tip with max(pk, guardRaiseK) while guardDropFade
    // (gdf === guardRaiseK on idle drop; no phaseT). Attack leftover short
    // raise still uses phaseT/boltT raiseT below.
    if (stunLeftoverPlanting(f) || throwKdLeftoverPlanting(f) || guardDropFade(f) > 0.02) {
      tipPlantK = Math.max(pk, guardRaiseK(f));
    } else if ((throwGuardPlanting(f) || reversalPlanting(f) || techGuardPlanting(f) || f.techGuardTip || ((slashLeftoverPlanting(f) || golpeLeftoverPlanting(f) || boltLeftoverPlanting(f)) && f.leftoverPlantTip && !telegraphing(f))) && GUARD_RAISE_MS > 0) {
      const tRaise = f.boltPhase === "startup" ? f.boltT : (f.phaseT || 0);
      const u = Math.max(0, Math.min(1, tRaise / GUARD_RAISE_MS));
      const raiseT = u * u * (3 - 2 * u);
      tipPlantK = Math.max(pk, 1 - raiseT);
    }
    if (tipPlantK > 0.02) {
      const bl = poseFamily(f).block;
      if (bl && bl.tipY != null) {
        const by = r.dy + bl.tipY * s;
        tip = by + (tip - by) * (1 - tipPlantK);
      }
    }
    // Tip under sheathe↔guardDrop tip gate (v345): ease slash-biased block tipY
    // → idle chest with gdf while sheatheT (mirror bladeTipX). Pure drop still
    // tipPlantK above. AABB planted.
    if (guardDropFade(f) > 0.02 && f.sheatheT > 0) {
      const gdf = guardDropFade(f);
      const u = 1 - Math.max(0, Math.min(1, f.sheatheT / SHEATHE_MS));
      const sf = 1 - u * u * (3 - 2 * u);
      const sl = poseFamily(f).slash;
      const sy = sl && sl.tipY != null ? r.dy + sl.tipY * s : tip;
      const bl = poseFamily(f).block;
      let by = tip;
      if (bl && bl.tipY != null) by = r.dy + bl.tipY * s;
      const id = poseFamily(f).idle;
      let ey;
      if (id && id.tipY != null) ey = r.dy + id.tipY * s;
      else {
        const b = bodyAABB(f);
        ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
      }
      const mid = by + (sy - by) * sf;
      tip = mid + (ey - mid) * (1 - gdf);
    }
    // Tip under guard raise leftover (v342): ease idle→block tipY with
    // guardRaiseK while guarding idle (rk rises 0→1; mirror bladeTipX /
    // telegraphFade). Idle has no tipY; bodyAABB chest mid matches pre-raise
    // tipY fallback without bladeBox (tipX-live). Drop still tipPlantK+
    // guardDropFade. Plant-from-guard still tipPlantK. AABB planted.
    if (f.guarding && f.phase === "idle" && !f.boltPhase) {
      const rk = guardRaiseK(f);
      if (rk < 0.98) {
        const id = poseFamily(f).idle;
        let ey;
        if (id && id.tipY != null) ey = r.dy + id.tipY * s;
        else {
          const b = bodyAABB(f);
          ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
        }
        tip = ey + (tip - ey) * rk;
      }
    }
    // Tip under sheatheFade leftover (v345): ease slash→pose tipY with sheatheFade
    // (sf dies 1→0; mirror bladeTipX / feintFade). When sheathing seat pose tipY on idle
    // chest mid. Raise mid-sheathe keeps block tipY after rk. Drop mid-sheathe still
    // tipPlantK+idle seat above. tip under guard raise / feint / tele / tipPlantK+tele
    // v342–344 unchanged. tip markers / steelX / bladeBox unchanged. AABB planted.
    // Tip under holdCutFade / boltPlant leftover (v346): recovery sheatheFade also seats
    // pose tipY on idle chest (mirror bladeTipX / restSheathe). holdCutFade zeros
    // sheatheFade during plant. >0 mirror bladeTipX.
    const sfTipY = sheatheFade(f);
    if (sfTipY > 0) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipY != null) {
        const sy = r.dy + sl.tipY * s;
        let poseTip = tip;
        if (sheathing(f) || (f.phase === "recovery" && (f.cut === "golpe" || f.cut === "slash") && !f.clashRec && !f.techRec && f.sheatheT <= 0)) {
          const id = poseFamily(f).idle;
          if (id && id.tipY != null) poseTip = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            poseTip = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
        }
        tip = sy + (poseTip - sy) * (1 - sfTipY);
      }
    }
    // Tip under holdCutFade leftover (v346): ease leftover-sheathe tipY→slash with
    // holdCutFade (sk mirrors draw / bladeTipX). After hf dies tipY stays slash through
    // bolt plant. tip markers / steelX / bladeBox unchanged. AABB planted.
    const hfTipY = holdCutFade(f);
    if (hfTipY > 0) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipY != null) {
        const sy = r.dy + sl.tipY * s;
        const id = poseFamily(f).idle;
        let ey;
        if (id && id.tipY != null) ey = r.dy + id.tipY * s;
        else {
          const b = bodyAABB(f);
          ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
        }
        const sheatheK = f.linkSheathe || 0;
        const sk = 1 - hfTipY * (1 - sheatheK);
        tip = ey + (sy - ey) * sk;
      }
    }
    // Tip under telegraphFade leftover: ease idle-edge→pose tipY with
    // telegraphFade (mirror bladeTipX). Idle/walk have no tipY; bodyAABB
    // chest mid matches pre-tele tipY fallback without bladeBox (tipX-live).
    // Tip under tipPlantK+tele leftover stack (v343): bias idle tipY toward
    // block tipY by latched leftoverPlantTipK so tele eases leftover→pose
    // (mirror bladeTipX). tip markers / steelX / bladeBox unchanged. AABB planted.
    if (telegraphing(f)) {
      const tf = telegraphFade(f);
      if (tf < 0.98) {
        const id = poseFamily(f).idle;
        let ey;
        if (id && id.tipY != null) ey = r.dy + id.tipY * s;
        else {
          const b = bodyAABB(f);
          ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
        }
        const tipK = f.leftoverPlantTipK || 0;
        if (f.leftoverPlantTip && tipK > 0.02) {
          const bl = poseFamily(f).block;
          if (bl && bl.tipY != null) {
            const by = r.dy + bl.tipY * s;
            ey = ey + (by - ey) * tipK;
          }
        }
        tip = ey + (tip - ey) * tf;
      }
    }
    // Tip under feintFade leftover: ease windup→pose tipY with feintFade
    // (fk dies 1→0; mirror bladeTipX). tip markers / steelX / bladeBox
    // unchanged. AABB planted.
    // Tip under mid-tele feint leftover (v344): bias windup tipY toward idle
    // tipY by latched feintTipK (mirror bladeTipX). Late tele tipK=1 no-op.
    const fk = feintFade(f);
    if (fk > 0.02) {
      const wu = poseFamily(f).windup;
      if (wu && wu.tipY != null) {
        let wy = r.dy + wu.tipY * s;
        const tipK = (f.feintTipK == null) ? 1 : f.feintTipK;
        if (tipK < 0.98) {
          // Mirror tele idle tipY base (bodyAABB chest; idle has no tipY).
          const id = poseFamily(f).idle;
          let ey;
          if (id && id.tipY != null) ey = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
          wy = ey + (wy - ey) * tipK;
        }
        tip = wy + (tip - wy) * (1 - fk);
      }
    }
    // Tip under boltPlantFade leftover: ease throwKnife→pose tipY with
    // boltPlantFade (bf dies 1→0; mirror bladeTipX). tip markers / steelX /
    // bladeBox unchanged. AABB planted.
    const bfTipY = boltPlantFade(f);
    if (bfTipY > 0.02) {
      const knife = poseFamily(f).throwKnife || poseFamily(f).windup;
      if (knife && knife.tipY != null) {
        const ky = r.dy + knife.tipY * s;
        tip = ky + (tip - ky) * (1 - bfTipY);
      }
    }
    // Tip under throwPlantFade leftover (v353): ease windup→idle-edge tipY with
    // throwPlantFade (trf dies 1→0; mirror bladeTipX). Idle has no tipY — chest
    // fallback matches tip under feintFade / tele idle base. tip markers / steelX /
    // bladeBox unchanged. AABB planted.
    // Tip under throwPlantFade tech leftover (v354): mirror bladeTipX — allow ease
    // once pf dies (tech-from-guard / live pf still skip).
    const trfTipY = throwPlantFade(f);
    // Keep ease through any live throwPlantFade (>0). Mirror bladeTipX / restThrow.
    // Tip under throwPlantFade tech leftover (v354): mirror bladeTipX — tech throw
    // recovery eases even while pf live; tech-from-guard skips.
    // Tip under throwPlantFade tech-from-guard leftover (v367): mirror bladeTipX —
    // after tipPlantK raise done, allow trf even while techGuardTip latched.
    // Tip under throwPlantFade tech-from-guard leftover (v367): mirror bladeTipX —
    // after tipPlantK raise done, allow trf even while techGuardTip latched.
    if (trfTipY > 0 && techGuardPlantFade(f) <= 0 && !f.techGuardTip) {
      const techThrowRec = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
      if (techThrowRec || parryFade(f) <= 0.02) {
        const wu = poseFamily(f).windup;
        if (wu && wu.tipY != null) {
          const wy = r.dy + wu.tipY * s;
          const id = poseFamily(f).idle;
          let ey;
          if (id && id.tipY != null) ey = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
          tip = wy + (ey - wy) * (1 - trfTipY);
        }
      }
    } else if (trfTipY > 0 && techGuardPlantFade(f) <= 0 && f.techGuardTip && GUARD_RAISE_MS > 0 && (f.phaseT || 0) >= GUARD_RAISE_MS) {
      const techThrowRec = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
      if (techThrowRec || parryFade(f) <= 0.02) {
        const wu = poseFamily(f).windup;
        if (wu && wu.tipY != null) {
          const wy = r.dy + wu.tipY * s;
          const id = poseFamily(f).idle;
          let ey;
          if (id && id.tipY != null) ey = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
          const rec = cutRecovery(f);
          const rem = Math.max(1, rec - GUARD_RAISE_MS);
          const u = Math.max(0, Math.min(1, ((f.phaseT || 0) - GUARD_RAISE_MS) / rem));
          const trfTipYK = 1 - u * u * (3 - 2 * u);
          tip = wy + (ey - wy) * (1 - trfTipYK);
        }
      }
    }
    // Tip under parryFade leftover: ease slash→pose tipY with parryFade
    // (pk dies 1→0; mirror bladeTipX). tip markers / steelX / bladeBox
    // / active hitbox unchanged. AABB planted.
    // Hit interrupt leftover (v336): defender mid-cut / windup / knife tipY too.
    // Throw interrupt leftover (v339): landThrow mid-cut → hurt tipY too.
    // Tech / KO interrupt leftover (v340): tech mid-cut → windup tipY; KO mid-cut → hurt tipY.
    // Tip under throw-startup→tech leftover (v341): tipPlantK edge blend tipY too
    // (mirror bladeTipX). Tip under throw-startup→tech tipY leftover (v366): tipKy +
    // idle-chest tipY (block tipY == windup tipY was a no-op). Idle tech / tech-from-guard still 0.
    const pkTipY = parryFade(f);
    if (pkTipY > 0.02) {
      const fam = poseFamily(f);
      const sheet = f.parryFadeSheet || "slash";
      const sl = sheet === "windup" ? fam.windup
        : sheet === "knife" ? (fam.throwKnife || fam.windup)
        : fam.slash;
      if (sl && sl.tipY != null) {
        let sy = r.dy + sl.tipY * s;
        // Tip under throw-startup→tech tipY leftover (v366): tipK tipX path uses
        // sheet-edge; tipY used block tipY which matches windup tipY (no-op), so
        // mid-tele tech dumped tipY onto windup while tipX held. Latched tipKy
        // (tele-only) eases idle-chest→windup (mirror telegraphFade tipY). tipKy 0 + tipK (tele off) keeps block bias
        // — a no-op vs windup tipY so tipY holds (v341 bar telegraph-off). Idle tech / non-throw tipK 0 unchanged.
        const tipKy = f.parryFadeTipKy || 0;
        const tipK = f.parryFadeTipK || 0;
        if (tipKy > 0.02) {
          const id = fam.idle;
          let ey;
          if (id && id.tipY != null) ey = r.dy + id.tipY * s;
          else {
            const b = bodyAABB(f);
            ey = b.y + b.h * 0.06 + b.h * 0.38 * 0.45;
          }
          sy = ey + (sy - ey) * (1 - tipKy);
        } else if (tipK > 0.02) {
          const bl = fam.block;
          if (bl && bl.tipY != null) {
            const by = r.dy + bl.tipY * s;
            sy = by + (sy - by) * (1 - tipK);
          }
        }
        // Tip under throwPlantFade tech leftover (v354): tip may already be
        // throwPlant-eased (mirror bladeTipX). Blend tipK-sy → eased tipY.
        tip = sy + (tip - sy) * (1 - pkTipY);
      }
    }
    return tip;
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
    if (f.cut === "throw") return null;
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
    // Riposte armed: don't re-raise over the spent Space/L (S may still be held).
    if (f.riposteArmed) return false;
    if (!actionHeld("guard")) return false;
    if (f.phase !== "idle" && !f.guarding) return false;
    return facingRival(f, rival);
  }

  function cutStartup(f) {
    if (f.cut === "throw") return THROW_STARTUP;
    if (f.riposte) return RIPOSTE_STARTUP;
    return f.cut === "golpe" ? GOLPE_STARTUP : STARTUP;
  }
  function cutActive(f) {
    if (f.cut === "throw") return THROW_ACTIVE;
    if (f.riposte) return RIPOSTE_ACTIVE;
    return f.cut === "golpe" ? GOLPE_ACTIVE : ACTIVE;
  }
  function cutRecovery(f) {
    if (f.techRec) return THROW_TECH_REC;
    if (f.cut === "throw") return THROW_RECOVERY;
    if (f.riposte) return RIPOSTE_RECOVERY;
    return f.cut === "golpe" ? GOLPE_RECOVERY : RECOVERY;
  }
  function cutLunge(f) {
    if (f.cut === "throw") return 0;
    // CID/ROAN move kit leftover (v445): CID golpe pocket lunge.
    // CID/ROAN Space slash-lunge kit leftover (v446): slash rides slashLungeOf.
    return f.cut === "golpe" ? golpeLungeOf(f) : slashLungeOf(f);
  }

  function startAttack(f, kind) {
    if (f.falling || f.guarding || f.stunT > 0) return;
    if (f.boltPhase) return;
    if (f.feintT > 0) return;
    // Guard-break action lock leftover (v409): mirror feintT — GB free window
    // (v399) used to let mash Space/L contest the punish.
    if (f.guardBreakT > 0) return;
    if (f.phase !== "idle") return;
    if (openLeft > 0) return;
    if (f.kind === "rival") {
      // Hitstun meaty leftover (v400): used to refuse startAttack while player.stunT,
      // so tickAI meaty could never arm. Allow standing stun; KD/falling still refuse.
      if (player.falling || player.thrownT > 0) return;
    }
    // Riposte: Space/L in window both fire a faster slash (130/140/280), same −10.
    // Spent on press (riposteArmed); kind is ignored — always slash.
    const doRiposte = !!(f.riposteArmed);
    if (doRiposte) {
      f.riposteArmed = false;
      f.riposteWindowT = 0;
      kind = "slash";
    }
    // Idle sheathe leftover: capture before phase flips (sheatheFade dies
    // with startup). Mashy Space/L after clash/tech sheathe used to dump
    // the blade. Fade leftover sheathe→windup (linkPlantFade).
    const leftoverSheathe = sheatheFade(f);
    f.cut = kind === "golpe" ? "golpe" : "slash";
    f.riposte = doRiposte;
    if (f.kind === "you") noteHintVerb(doRiposte ? "riposte" : (f.cut === "golpe" ? "golpe" : "slash"));
    f.cutRecBreathT = 0;
    f.phase = "startup";
    f.phaseT = 0;
    // Slash leftover k: leftover destRect plant used to dump the same tick
    // startAttack armed (tickGuardPose snapped leftover k), so leftover
    // guard lean/oy hopped off the windup plant. Ease leftover k.
    // Golpe leftover k: leftover destRect plant used to dump the same tick
    // startAttack(golpe) armed (this zeroed leftover k). Ease leftover k like slash.
    // Stun leftover k eases leftover destRect plant.
    // Telegraph recovery walk-in pose leftover: capture walk intent before
    // closing clears (rival has no A/D pad). Arm walkFadeHold so restTeleWalk /
    // restLinkWalk keep the walk base through the raise. You A/D still live via
    // recoveryWalkOut. Mid-stride walkFadeHold path unchanged. Draw-only.
    const teleRecWalk = recoveryWalkOut(f);
    f.closing = false;
    f.cutHit = false;
    f.parryFadeT = 0;
    f.parryFadeSheet = "";
    f.parryFadeTipK = 0;
    f.parryFadeTipKy = 0;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.clashRec = false;
    f.reversal = false;
    f.clashPlant = false;
    f.holdCutPlant = false;
    // Tip under slash/golpe leftover short raise leftover: latch tip raise when
    // leftover k planted so tipPlantK phaseT ease holds after gpk dies
    // (slash/golpe planting stays true whole startup; idle Space/L still snaps
    // with no latch). Draw-only.
    // Tip under tipPlantK+tele leftover stack (v343): also latch tipK so tele tip
    // eases leftover blend→pose (idle-edge base ignored leftover block tip).
    f.leftoverPlantTip = (f.guardPoseK || 0) > 0;
    f.leftoverPlantTipK = f.leftoverPlantTip ? guardRaiseK(f) : 0;
    if (leftoverSheathe > 0.02) {
      f.linkPlant = true;
      f.linkSheathe = leftoverSheathe;
      f.telegraph = false;
    } else {
      f.linkPlant = false;
      f.linkSheathe = 0;
      f.telegraph = true;
    }
    if (teleRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Keep sheatheT — tickSheathe finishes the 0→−5→0 hump through the
    // cut so Space mid-recovery does not plant the leftover dip in one tick.
  }

  function canFeint(f) {
    // Slash STARTUP only. Not golpe, not throw, not once the blade is live.
    if (!f) return false;
    if (f.falling || f.stunT > 0) return false;
    if (f.boltPhase) return false;
    if (openLeft > 0) return false;
    if (f.phase !== "startup") return false;
    if (f.cut !== "slash") return false;
    return true;
  }

  function startFeint(f) {
    // Pull the cut before active. No hitbox, no damage, no clash.
    // 100ms lock so it is faster than 280 recovery, not a free mash.
    // Leftover windup fades to idle over FEINT_RECOVERY (draw-only).
    // Do not hold the tajo lunge sheet. Next tick raises guard if S is still held
    // — leftover windup keeps through that raise (feint→guard leftover).
    // Feint walk-in pose leftover: capture walk intent before gait zeros
    // (telegraph walkFadeHold / A/D / rival closing). Arm walkFadeHold for
    // restFeintWalk. Mid-stride gaitWalkOn path unchanged. Draw-only.
    if (!canFeint(f)) return false;
    const feintRecWalk = recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.walkT > 0 || f.gait !== 0;
    // Tip under mid-tele feint leftover (v344): latch tele blend BEFORE phase/tele
    // clear (telegraphing needs startup). Late tele seats tipK=1.
    const feintTipLatch = telegraphing(f) ? telegraphFade(f) : 1;
    f.phase = "idle";
    f.phaseT = 0;
    f.cut = "slash";
    f.cutHit = false;
    f.clashRec = false;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.reversal = false;
    f.clashPlant = false;
    f.linkPlant = false;
    f.holdCutPlant = false;
    f.linkSheathe = 0;
    f.leftoverPlantTip = false;
    f.leftoverPlantTipK = 0;
    f.gait = 0;
    f.cutRecBreathT = 0;
    f.parryFadeT = 0;
    f.parryFadeSheet = "";
    f.parryFadeTipK = 0;
    f.parryFadeTipKy = 0;
    f.feintT = FEINT_RECOVERY;f.feintT = FEINT_RECOVERY;
    f.sheatheT = SHEATHE_MS;
    f.feintTipK = feintTipLatch;
    f.telegraph = false;
    if (feintRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Feint cancel juice (v317): whoosh-down / soft sheath sting + tiny tip hueso fleck.
    // Dust plant stays. No shake, no hit flash, no steel asterisk / parry gleam.
    playFeintSting();
    spawnPlantDust(f, 0.9);
    spawnBrasaFx("feint", bladeTipX(f), bladeTipY(f), f.facing, f);
    if (f.kind === "you") noteHintVerb("feint");
    return true;
  }

  function tickFeint(f, dt) {
    if (!f) return;
    if (f.stunT > 0 || f.falling) {
      f.feintT = 0;
      return;
    }
    if (f.feintT > 0) {
      const prevFeint = f.feintT;
      f.feintT = Math.max(0, f.feintT - dt);
      // Leftover sheatheT after the 100ms pull would hold slash ~40ms
      // (sheathing() gate drops) — a delayed lunge flash. destRect-only.
      if (f.feintT === 0) f.sheatheT = 0;
      // Feint settle→walk plant-release destRect leftover: walk / walkFadeHold / raise mid-end
      // used to dump breath when feintT cleared while plant-release had already seated under
      // restFeintWalk; arm cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-rise
      // own it. Feint settle→guard: same arm on guard mid-end so max(ck, rk) / hold-under-raise
      // own it. Idle feint still eases with feintFade (no cutRec arm).
      if (
        prevFeint > 0 &&
        f.feintT === 0 &&
        f.phase === "idle" &&
        !f.boltPhase &&
        (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0)
      ) {
        f.cutRecBreathT = GUARD_RAISE_MS;
      }
    }
  }

  function throwLocked(def) {
    // Knockdown, thrown stun, or the short wakeup throw-invuln.
    // First grounded frame is not a free re-grab. Not a wakeup super.
    if (!def) return true;
    if (def.falling || def.hp <= 0) return true;
    if (def.stunT > 0 || def.thrownT > 0) return true;
    if (def.throwInvulnT > 0) return true;
    return false;
  }

  function throwFoe(f) {
    return f === player ? rival : player;
  }

  function tickStun(f, dt) {
    if (!f || f.stunT <= 0) {
      if (f) {
        // Tip under throw-startup→tech leftover (v341): techRec throw recovery has
        // stunT 0, so this used to zero parryFadeT the tick freeze ended — tip/sheet
        // dumped instead of easing through SHEATHE_MS. Keep latched pf while techCut
        // owns the interrupt (parryFade gate / tip under pf). Hit/throw KD still clear
        // via stunT > 0 path below. Idle tech still 0 (no parryFadeT).
        const techCut = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
        if (!techCut) {
          f.parryFadeT = 0;
          f.parryFadeSheet = "";
          f.parryFadeTipK = 0;
          f.parryFadeTipKy = 0;
        }
      }
      return;
    }
    const prevStun = f.stunT;
    f.stunT = Math.max(0, f.stunT - dt);
    if (f.stunT === 0) { f.parryFadeT = 0; f.parryFadeSheet = ""; f.parryFadeTipK = 0; f.parryFadeTipKy = 0; }
    // Chip stun settle→walk destRect leftover: walk / raise mid-end used to dump breath
    // when stunT cleared while stun-end ease had already seated full amp under planted
    // walk-out; arm cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-rise
    // own it. Chip stun settle→guard: same arm on guard mid-end so max(ck, rk) /
    // hold-under-raise own it. Idle chip stun still eases with stunT/GUARD_RAISE_MS
    // (no cutRec arm). Throw KD / wakeup still hard-zero via idleBreath gates.
    // Chip stun settle→walk plant-release destRect leftover: walk / walkFadeHold /
    // recoveryWalkOut / raise mid-end used to dump breath when stunT cleared while
    // plant-release had already seated under rest stun walk; arm cutRec and let cut
    // recovery settle→walk max(ck, wk) / hold-under-rise own it. Idle chip stun still
    // eases with stunT/GUARD_RAISE_MS (no cutRec arm).
    if (
      prevStun > 0 &&
      f.stunT === 0 &&
      f.hp > 0 &&
      !f.falling &&
      f.thrownT <= 0 &&
      f.throwInvulnT <= 0 &&
      f.phase === "idle" &&
      !f.boltPhase &&
      f.feintT <= 0 &&
      (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0)
    ) {
      f.cutRecBreathT = GUARD_RAISE_MS;
    }
  }

  function tickThrowState(f, dt) {
    if (!f) return;
    if (f.throwInvulnT > 0 && f.thrownT <= 0) {
      const prevInv = f.throwInvulnT;
      f.throwInvulnT = Math.max(0, f.throwInvulnT - dt);
      if (f.throwInvulnT === 0) {
        f.wakeRev = false;
        // Wakeup settle→walk destRect leftover: walk mid-end used to dump
        // breath ~1.4 when wakeupFade hit 0 while rise was still mid; arm
        // cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-
        // rise own it. Wakeup settle→guard: same arm on guard mid-end so
        // max(ck, rk) / hold-under-raise own it. Idle getup still eases
        // with wakeupFade (no cutRec arm). Feint still feintFade.
        // Wakeup settle→walk plant-release destRect leftover: walk / walkFadeHold /
        // recoveryWalkOut / raise mid-end used to dump breath when throw-invuln
        // cleared while plant-release had already seated under restWakeWalk; arm
        // cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-rise
        // own it. Idle getup still eases with wakeupFade (no cutRec arm).
        if (
          prevInv > 0 &&
          f.phase === "idle" &&
          !f.boltPhase &&
          f.feintT <= 0 &&
          (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0)
        ) {
          f.cutRecBreathT = GUARD_RAISE_MS;
        }
      }
    }
    if (f.thrownT > 0) {
      f.thrownT = Math.max(0, f.thrownT - dt);
      if (f.thrownT === 0 && f.hp > 0 && !f.falling) {
        f.throwInvulnT = THROW_WAKE_INVULN;
        f.wakeRev = true;
        // Hurt pose snap leftover: arm SHEATHE_MS hurt→idle fade (invuln-window fade
        // alone died at 80). Draw-only (hurtFade). Stun / invuln clocks unchanged.
        f.hurtFadeT = SHEATHE_MS;
        // Wakeup / getup readability (v320/v321): brief grit + soft hueso wash + soft foot-scrape
        // on throw-invuln start. Not reversal fleck, not parry gleam, not feint sting. No shake.
        playGetupScrape();
        spawnPlantDust(f, 1.15);
        {
          const chest = hitWoundAnchor(f);
          spawnBrasaFx("wakeup", chest.x, chest.y, f.facing, f);
        }
      }
    }
  }

  function tickHurtFade(f, dt) {
    if (!f || f.hurtFadeT <= 0) return;
    const prevHurt = f.hurtFadeT;
    f.hurtFadeT = Math.max(0, f.hurtFadeT - dt);
    // Hurt settle→walk plant-release destRect leftover: walk / walkFadeHold /
    // recoveryWalkOut / raise mid-end used to dump breath when hurtFadeT cleared while
    // plant-release had already seated under rest hurt walk (invuln already idle — no
    // cutRec arm — or cutRec already drained); arm cutRec and let cut recovery
    // settle→walk max(ck, wk) / hold-under-rise own it. Hurt settle→guard: same arm on
    // guard mid-end so max(ck, rk) / hold-under-raise own it. Idle hurt→idle still eases
    // with hurtFade (no cutRec arm). Mirror tickThrowState invuln-end / tickStun chip-end.
    if (
      prevHurt > 0 &&
      f.hurtFadeT === 0 &&
      f.hp > 0 &&
      !f.falling &&
      f.thrownT <= 0 &&
      f.throwInvulnT <= 0 &&
      f.phase === "idle" &&
      !f.boltPhase &&
      f.feintT <= 0 &&
      (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0)
    ) {
      f.cutRecBreathT = GUARD_RAISE_MS;
    }
  }

  function startThrow(f) {
    // Close throw. Same verb on you and the rival. Not a cancel door.
    if (!f) return false;
    if (f.falling || f.stunT > 0) return false;
    if (f.feintT > 0) return false;
    // Guard-break action lock leftover (v409): mirror feintT — mash grab during
    // GB used to steal the free punish window.
    if (f.guardBreakT > 0) return false;
    if (throwLocked(throwFoe(f))) return false;
    if (f.boltPhase) return false;
    if (f.phase !== "idle" && !f.guarding) return false;
    if (openLeft > 0) return false;
    const fromIdle = !f.guarding;
    // Idle sheathe leftover: capture before phase flips. Space after
    // clash/tech sheathe used to dump the blade into throw windup.
    const leftoverSheathe = fromIdle ? sheatheFade(f) : 0;
    f.guarding = false;
    f.riposteWindowT = 0;
    f.riposteArmed = false;
    f.riposte = false;
    f.cut = "throw";
    f.cutRecBreathT = 0;
    f.phase = "startup";
    f.phaseT = 0;
    // Throw-from-guard plant leftover: leftover k used to snap here, so leftover
    // block dumped into windup. Ease leftover k (tickGuardPose). Reversal plant
    // leftover same path. Golpe leftover k eases leftover destRect plant.
    // Telegraph recovery walk-in pose leftover: capture walk intent before
    // closing clears. Arm walkFadeHold for restTeleWalk / restLinkWalk. Draw-only.
    // Throw-from-guard plant walk-in pose leftover: same arm for restThrowGuardWalk
    // when Space+S from walk→guard / A/D / rival closing (tickGait keeps hold).
    const teleRecWalk = recoveryWalkOut(f);
    f.closing = false;
    f.cutHit = false;
    f.parryFadeT = 0;
    f.parryFadeSheet = "";
    f.parryFadeTipK = 0;
    f.parryFadeTipKy = 0;
    f.clashRec = false;
    f.techRec = false;
    f.techGuardTip = false;
    f.leftoverPlantTip = false;
    f.leftoverPlantTipK = 0;
    f.gait = 0;
    f.reversal = false;
    f.clashPlant = false;
    f.holdCutPlant = false;
    if (leftoverSheathe > 0.02) {
      f.linkPlant = true;
      f.linkSheathe = leftoverSheathe;
      f.telegraph = false;
    } else {
      f.linkPlant = false;
      f.linkSheathe = 0;
      f.telegraph = fromIdle;
    }
    if (teleRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Throw commit juice leftover (v391): grab press used to arm only windup with no
    // commit sting/grit — feint/reversal/riposte/holdCut/link already seat juice on
    // press. Soft clinch whoosh + light plant dust. Draw/SFX only. Active 1.05 /
    // connect / tech juice kept. THROW frames locked.
    playThrowCommitSting();
    spawnPlantDust(f, 0.9);
    if (f.kind === "you") noteHintVerb("throw");
    return true;
  }

  function startReversal(f) {
    // Guard reversal. Hold S, tap L. Not Space+S (that is throw).
    // Same L frames/art. Short startup invuln beats a meaty slash.
    // Costs a real stam chunk. Loses to throw. Works far (does not throw).
    if (!f) return false;
    if (f.falling || f.stunT > 0) return false;
    if (f.feintT > 0) return false;
    if (f.boltPhase) return false;
    if (!f.guarding) return false;
    if (f.guardBreakT > 0) return false;
    if (openLeft > 0) return false;
    if (f.stamina < REVERSAL_STAM) return false;
    // Stamina chunk spend leftover (v378): ghost+flash the −30.
    pulseStam(f, f.stamina);
    f.stamina -= REVERSAL_STAM;
    f.stamRegenT = STAMINA_REGEN_DELAY;
    f.guarding = false;
    f.riposteWindowT = 0;
    f.riposteArmed = false;
    f.riposte = false;
    f.cut = "golpe";
    f.cutRecBreathT = 0;
    f.phase = "startup";
    f.phaseT = 0;
    // Reversal plant leftover: leftover k used to snap here, so leftover
    // block dumped into windup. Ease leftover k (tickGuardPose). Stun leftover
    // k eases leftover destRect plant. Slash leftover k eases leftover destRect plant.
    // Reversal plant walk-in pose leftover: capture walk intent after unguard
    // before closing clears. Arm walkFadeHold for restRevWalk. Draw-only.
    const revRecWalk = recoveryWalkOut(f);
    f.closing = false;
    f.cutHit = false;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.clashRec = false;
    f.techRec = false;
    f.techGuardTip = false;
    f.leftoverPlantTip = false;
    f.leftoverPlantTipK = 0;
    f.gait = 0;
    f.reversal = true;
    f.clashPlant = false;
    f.linkPlant = false;
    f.holdCutPlant = false;
    f.linkSheathe = 0;
    if (revRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Spend wakeup throw-invuln. L+S on getup used to keep it, so throw
    // could not start for 80ms and the reversal was already active — a
    // wakeup super. Tap-L wakeup already spent it (startWakeReversal).
    // Wakeup→reversal leftover: leftover crumple used to die the tick
    // throw-invuln spent (getup fade gated phase + invuln), so leftover
    // hurt popped to windup. Capture leftover fade into wakeRevFadeHold
    // before spend; draw eases crumple→windup over GUARD_RAISE_MS.
    // Combat still spends invuln this tick. poseBitmap still windup.
    if (f.throwInvulnT > 0) {
      const u = 1 - Math.max(0, Math.min(1, f.throwInvulnT / THROW_WAKE_INVULN));
      f.wakeRevFadeHold = 1 - u * u * (3 - 2 * u);
    }
    f.throwInvulnT = 0;
    f.wakeRev = false;
    f.telegraph = false;
    // Reversal juice (v319): pitched whoosh-up / soft choque sting + chest invuln fleck.
    // Soft plant dust. No shake, no hit bloom, no steel asterisk / parry gleam.
    playReversalSting();
    spawnPlantDust(f, 1.0);
    {
      const chest = hitWoundAnchor(f);
      spawnBrasaFx("reversal", chest.x, chest.y, f.facing, f);
    }
    if (f.kind === "you") noteHintVerb("reversal");
    return true;
  }

  function wakeupWindow(f) {
    // Getup after knockdown: thrownT/stunT expired, throw-invuln live, one attempt.
    // Still down is not this window. After invuln it is a normal L.
    if (!f) return false;
    if (f.falling || f.hp <= 0) return false;
    if (f.thrownT > 0 || f.stunT > 0) return false;
    if (f.throwInvulnT <= 0) return false;
    if (!f.wakeRev) return false;
    if (f.boltPhase) return false;
    if (f.phase !== "idle") return false;
    return true;
  }

  function startWakeReversal(f) {
    // Tap L on getup, no S. Same reversal as guard (startReversal).
    // Gives up throw-invuln so throw still beats it. One attempt per getup.
    if (!wakeupWindow(f)) return false;
    const held = f.guarding;
    // Wakeup→reversal walk-in pose leftover: capture walk intent before
    // temporary guard (recoveryWalkOut gates on guarding). Arm walkFadeHold
    // for restWakeRevWalk. startReversal's revRecWalk sees guarding true.
    // Draw-only.
    const wakeRecWalk = recoveryWalkOut(f);
    f.guarding = true;
    const ok = startReversal(f);
    if (!ok) {
      f.guarding = held;
      return false;
    }
    f.wakeRev = false;
    f.throwInvulnT = 0;
    if (wakeRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    return true;
  }

  function reversalInvuln(f) {
    // Startup strike invuln (REVERSAL_INVULN = golpe startup). First active
    // frame stays invuln so a meaty Space slash does not clash-trade.
    // Throw still grabs — this is strike invuln only.
    if (!f || !f.reversal || f.cut !== "golpe") return false;
    if (f.phase === "startup") return f.phaseT < REVERSAL_INVULN;
    if (f.phase === "active" && f.phaseT <= STEP) return true;
    return false;
  }

  function throwInRange() {
    return absGap() <= THROW_RANGE;
  }

  function slashToGolpeWindow(f) {
    // Last SLASH_CANCEL_MS of tajo recovery, hit or block only.
    // Late active / early recovery still queue L; this is when golpe may start.
    // Clash recovery uses the same late door (~last 100ms of the 200ms
    // clash recovery) into L. Early clash recovery still locked.
    // Connected tajo→golpe is the same door for you and the rival.
    // Clash late L is the same door for you and the rival (rival 40% once-per-clash).
    if (!f) return false;
    if (f.falling || f.guarding || f.stunT > 0 || f.boltPhase) return false;
    if (openLeft > 0) return false;
    if (f.phase !== "recovery") return false;
    if (f.clashRec) {
      return (cutRecovery(f) - f.phaseT) <= SLASH_CANCEL_MS;
    }
    if (f.cut !== "slash" || !f.cutHit) return false;
    return (cutRecovery(f) - f.phaseT) <= SLASH_CANCEL_MS;
  }

  function cancelIntoGolpe(f) {
    if (!slashToGolpeWindow(f)) return false;
    // Clash leftover pose: leftover slash used to pop to windup the same
    // tick this armed (telegraph false, sheatheFade skipped clashRec), so
    // the plant was a sheet cut, not a raise. Fade leftover slash→windup
    // (clashPlantFade). Connected slash-L leftover sheathe eases leftover
    // sheathe overlay (linkPlantFade). Clash-K leftover slash eases in cancelIntoBolt.
    const leftoverSheathe = sheatheFade(f);
    // Clash walk-in walkFadeHold pose leftover: capture walk intent before
    // closing clears (rival has no A/D pad). Arm walkFadeHold for restClashWalk
    // / restLinkWalk. You A/D still live via recoveryWalkOut. Draw-only.
    const clashRecWalk = recoveryWalkOut(f);
    f.clashPlant = !!f.clashRec;
    f.linkPlant = !f.clashRec;
    f.linkSheathe = f.linkPlant ? leftoverSheathe : 0;
    f.cut = "golpe";
    f.phase = "startup";
    f.phaseT = 0;
    f.closing = false;
    f.cutHit = false;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.clashRec = false;
    f.telegraph = false;
    // Tip latch: cancel usually has no leftover k; idle snap path.
    f.leftoverPlantTip = (f.guardPoseK || 0) > 0;
    f.leftoverPlantTipK = f.leftoverPlantTip ? guardRaiseK(f) : 0;
    if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Link / clash-cancel Space/L juice leftover (v365): soft whoosh raise + light plant dust.
    // Connected slash→golpe and clash late L used to plant silent. holdCut K already juices.
    playLinkSting();
    spawnPlantDust(f, 0.85);
    return true;
  }

  function golpeToSlashWindow(f) {
    // Last GOLPE_CANCEL_MS of golpe recovery, hit or block only.
    // Late active / early recovery still queue Space; this is when tajo may start.
    // Clash recovery uses the same late door (~last 100ms of the 200ms
    // clash recovery) into Space. Early clash recovery still locked.
    // Connected golpe→tajo is the same door for you and the rival.
    // Clash late Space is the same door for you and the rival (rival 40% once-per-clash).
    if (!f) return false;
    if (f.falling || f.guarding || f.stunT > 0 || f.boltPhase) return false;
    if (openLeft > 0) return false;
    if (f.phase !== "recovery") return false;
    if (f.clashRec) {
      return (cutRecovery(f) - f.phaseT) <= GOLPE_CANCEL_MS;
    }
    if (f.cut !== "golpe" || !f.cutHit) return false;
    return (cutRecovery(f) - f.phaseT) <= GOLPE_CANCEL_MS;
  }

  function cancelIntoSlash(f) {
    if (!golpeToSlashWindow(f)) return false;
    // Clash leftover pose: leftover slash used to pop to windup the same
    // tick this armed (telegraph false, sheatheFade skipped clashRec), so
    // the plant was a sheet cut, not a raise. Fade leftover slash→windup
    // (clashPlantFade). Connected golpe-Space leftover sheathe eases leftover
    // sheathe overlay (linkPlantFade). Clash-K leftover slash eases in cancelIntoBolt.
    const leftoverSheathe = sheatheFade(f);
    // Clash walk-in walkFadeHold pose leftover: capture walk intent before
    // closing clears. Arm walkFadeHold for restClashWalk / restLinkWalk. Draw-only.
    const clashRecWalk = recoveryWalkOut(f);
    f.clashPlant = !!f.clashRec;
    f.linkPlant = !f.clashRec;
    f.linkSheathe = f.linkPlant ? leftoverSheathe : 0;
    f.cut = "slash";
    f.phase = "startup";
    f.phaseT = 0;
    f.closing = false;
    f.cutHit = false;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.clashRec = false;
    f.telegraph = false;
    // Tip latch: cancel usually has no leftover k; idle snap path.
    f.leftoverPlantTip = (f.guardPoseK || 0) > 0;
    f.leftoverPlantTipK = f.leftoverPlantTip ? guardRaiseK(f) : 0;
    if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    // Link / clash-cancel Space/L juice leftover (v365): soft whoosh raise + light plant dust.
    // Connected golpe→slash and clash late Space used to plant silent. holdCut K already juices.
    playLinkSting();
    spawnPlantDust(f, 0.85);
    return true;
  }

  function cutToBoltWindow(f) {
    // Last BOLT_CANCEL_MS of tajo or golpe recovery, hit or block only.
    // Clash recovery uses the same late door (~last 100ms of the 200ms
    // clash recovery) into K, same as Space/L. Not a free fireball: same K,
    // same 200 startup, −30.
    // Late active / early recovery still queue K; this is when the dart may start.
    // Connected tajo/golpe → K is the same door for you and the rival.
    // Clash late K is the same door for you and the rival (rival 40% once-per-clash).
    if (!f) return false;
    if (f.cut !== "slash" && f.cut !== "golpe") return false;
    if (f.falling || f.guarding || f.stunT > 0 || f.boltPhase) return false;
    if (openLeft > 0) return false;
    if (f.phase !== "recovery") return false;
    if (f.stamina < BOLT_STAM) return false;
    // Answer-dart leftover (v438): opposing startup / live dart may be answered
    // so v412 birth clash can fire from a cancel door too. Own live still refuses.
    if (bolt && bolt.kind === f.kind) return false;
    if (f.clashRec) {
      return (cutRecovery(f) - f.phaseT) <= BOLT_CANCEL_MS;
    }
    if (!f.cutHit) return false;
    return (cutRecovery(f) - f.phaseT) <= BOLT_CANCEL_MS;
  }

  function playerClashBoltPriority() {
    // Clash-K cancel priority leftover (v382): same-frame Space/L + K on clash late
    // used to let Space/L steal the dart door (attackEdge/golpeEdge before boltEdge;
    // slashBuf/golpeBuf flush before boltBuf) while rival AI already yields linkBolt.
    // Teach listed K first (v381) but the player door lied. True when clashRec + K
    // armed (boltEdge or boltBuf) + cutToBoltWindow. Non-clash unchanged here —
    // hit-confirm special-cancel K is playerHitConfirmBoltPriority (v383).
    if (!player || !player.clashRec) return false;
    if (!(boltEdge || boltBuf)) return false;
    return cutToBoltWindow(player);
  }

  function playerHitConfirmBoltPriority() {
    // Hit-confirm special-cancel K priority leftover (v383): same-frame Space/L + K on
    // connected late recovery used to let Space/L steal the dart door while clash late
    // already yields to K (v382) — SF special-cancel lost to the normal cancel on
    // hit-confirm. True when !clashRec + K armed (boltEdge or boltBuf) + cutToBoltWindow
    // (implies cutHit + late recovery). Whiff / clash path unchanged.
    if (!player || player.clashRec) return false;
    if (!(boltEdge || boltBuf)) return false;
    return cutToBoltWindow(player);
  }

  function cancelIntoBolt(f) {
    if (!cutToBoltWindow(f)) return false;
    // Clash leftover pose: leftover slash used to stick through the K
    // plant (boltHoldCut), so the dart rode a leftover cut sheet, not a
    // raise. Fade leftover slash→windup (clashPlantFade). Special-cancel
    // K still holds the cut. Connected slash/golpe leftover sheathe
    // eases (linkPlantFade). Special-cancel leftover sheathe used to pop
    // to the full cut the same tick this armed (sheatheFade died with
    // boltPhase). Fade leftover sheathe→cut (holdCutFade). Telegraph still snaps.
    const fromClash = !!f.clashRec;
    const leftoverSheathe = fromClash ? 0 : sheatheFade(f);
    // Clash walk-in walkFadeHold pose leftover: capture walk intent before
    // closing clears (startBolt's teleRecWalk would see closing already false).
    // Arm walkFadeHold for restClashWalk / restHoldCutWalk. Draw-only.
    // HoldCut walk-in walkFadeHold pose leftover: same capture — holdCut branch
    // used to skip the arm (only fromClash armed), so rival closing hopped.
    const clashRecWalk = recoveryWalkOut(f);
    f.phase = "idle";
    f.phaseT = 0;
    f.closing = false;
    f.cutHit = false;
    f.clashRec = false;
    f.linkGolpe = false;
    f.linkSlash = false;
    f.linkBolt = false;
    f.boltHoldCut = !fromClash;
    const ok = startBolt(f, true);
    if (!ok) f.boltHoldCut = false;
    else if (fromClash) {
      f.clashPlant = true;
      f.telegraph = false;
      // Spark origin leftover: startBolt spawned the cast on the windup tip
      // before clashPlant armed. Re-seat on live castPlantXY (wound 0) so the
      // puff sits on leftover slash this tick, then eases with clashPlantFade.
      syncBrasaFx();
      if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
      // Clash-K cancel grit leftover (v371): clash late K used to arm only
      // clashPlantFade + plain cast with no boot plant — clash Space/L already
      // seat whoosh+dust (v365), holdCut K seats pitched cast+dust. Soft plant
      // dust 0.85 (match link). Plain cast / knifeThrow stay (no playLinkSting /
      // no holdCut sting). Idle K unchanged. Draw-only.
      spawnPlantDust(f, 0.85);
    } else {
      f.holdCutPlant = true;
      f.linkSheathe = leftoverSheathe;
      if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
      // Special-cancel K clarity (v322) + holdCut juice leftover (v380): pitched
      // cast + layered whoosh raise sting + soft plant dust. Plain startBolt cast
      // skipped under holdingCutBolt. Clash-K / idle startBolt stay plain cast
      // (Clash-K grit dust seats above, v371). Cast puff already from startBolt.
      playHoldCutSting();
      spawnPlantDust(f, 0.95);
      // Special-cancel combo counter leftover (v424): Space rec + K plant used to
      // eat leftover hitstun before land — arm comboBolt while foe still locked
      // so noteCombo keeps the string. Clash-K skips (no holdCut). Idle K none.
      if (f.comboN > 0) {
        const foe = f === player ? rival : player;
        if (foe && (foe.stunT > 0 || foe.falling || (foe.thrownT || 0) > 0)) f.comboBolt = true;
      }
    }
    return ok;
  }

  function advanceAttack(f, dt) {
    if (f.falling || f.phase === "idle" || f.guarding) return;
    f.phaseT += dt;
    if (f.phase === "startup" && f.phaseT >= cutStartup(f)) {
      f.phase = "active";
      f.phaseT = 0;
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
      let nx = f.x + f.facing * cutLunge(f);
      if (f.kind === "you") nx = Math.min(nx, rival.x - 48);
      else nx = Math.max(nx, player.x + 48);
      f.x = nx;
      // Riposte spend already fired sfx_riposte; skip normal tajo whoosh (no double).
      if (f.cut !== "throw" && !f.riposte) playSfx(SFX.whoosh);
      spawnPlantDust(f, f.cut === "golpe" ? 1.15 : (f.cut === "throw" ? 1.05 : 1.45));
      // Lunge / active plant grit audio sync leftover: grit stamped silent while
      // walk/opening already matched scrape (v352). One scrape on startup→active.
      // Lunge plant scrape ↔ knock cull leftover (v359): defer playPlantScrape until
      // after resolveCuts — same-tick connect dropPlantUnderKnock (v349) culls this
      // unmarked stamp; scrape only if grit still rides the boot (flushLungePlantScrape).
      f.lungePlantSfx = true;
    } else if (f.phase === "active" && f.phaseT >= cutActive(f)) {
      f.phase = "recovery";
      f.phaseT = 0;
    } else if (f.phase === "recovery" && f.phaseT >= cutRecovery(f)) {
      // Rival post-string: whiff or blocked cut biases a reset next commit.
      if (f.kind === "rival" && (f.cut === "slash" || f.cut === "golpe")) {
        if (!f.cutHit || f.aiSawBlock) f.aiResetT = AI_RESET_MS;
        f.aiSawBlock = false;
      }
      f.phase = "idle";
      f.phaseT = 0;
      f.riposte = false;
      const wasThrow = f.cut === "throw";
      // Golpe/slash already faded the cut during recovery. Re-arming sheatheT
      // would pop the tajo lunge back to full then fade it again.
      const golpeSheathed = f.cut === "golpe" && !f.clashRec && !f.techRec;
      const slashSheathed = f.cut === "slash" && !f.clashRec && !f.techRec;
      // Throw recovery settle→walk destRect leftover: walk / raise mid-end used to dump
      // breath ~0.96 when recovery cleared while plant ease had already seated full amp;
      // arm cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-rise own it.
      // Throw recovery settle→guard: same arm on guard mid-end so max(ck, rk) / hold-under-
      // raise own it. Idle throw plant still eases with throwPlantFade (no cutRec arm).
      // Clash/tech sheathe path unchanged. Feint still feintFade.
      // Throw recovery settle→walk plant-release destRect leftover: walk / walkFadeHold /
      // recoveryWalkOut / raise mid-end used to dump breath when recovery cleared while
      // plant-release had already seated under restThrowWalk; arm cutRec and let cut
      // recovery settle→walk max(ck, wk) / hold-under-rise own it. Idle throw plant still
      // eases with throwPlantFade (no cutRec arm).
      const walkOutEnd = wasThrow && (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0);
      f.cut = "slash";
      f.cutHit = false;
      f.linkGolpe = false;
      f.linkSlash = false;
      f.linkBolt = false;
      f.clashRec = false;
      f.techRec = false;
      f.techGuardTip = false;
      f.leftoverPlantTip = false;
      f.leftoverPlantTipK = 0;
      f.reversal = false;
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
      if (!wasThrow && !golpeSheathed && !slashSheathed) f.sheatheT = SHEATHE_MS;
      // Cut recovery destRect leftover: ease idle breath in after the sheet
      // already settled (recovery stayed breath 0 for special-cancel plant).
      if (golpeSheathed || slashSheathed) f.cutRecBreathT = GUARD_RAISE_MS;
      else if (walkOutEnd) f.cutRecBreathT = GUARD_RAISE_MS;
      else f.cutRecBreathT = 0;
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
    // Draw-only. Wall clamp used to leave leftover stamps one knock
    // frame off destRect.pivX (sync sat before clamp). Specks fly.
    syncPlantDust();
  }

  function inMotionFeel(f) {
    if (f.phase === "startup" || f.phase === "active" || f.phase === "recovery") return true;
    if (f.boltPhase) return true;
    if (f.pushT > 0 || f.stunT > 0) return true;
    return false;
  }

  function throwGrabHold() {
    return (player && player.thrownT > 0) || (rival && rival.thrownT > 0);
  }

  function throwSnapTogether(atk, def) {
    // Clinch body gap. Leftover 40px plants was ~300 AABB overlap after
    // recrop, so keepApart un-did the grab the next freeze tick.
    // Only yank in if farther than the clinch; already-close stays.
    // destRect/AABB planted. Hurt sheet unchanged. No new combat verb.
    if (!atk || !def) return;
    const dir = def.x >= atk.x ? 1 : -1;
    const ha = bodyAABB(atk);
    const hb = bodyAABB(def);
    const gap = dir > 0 ? hb.x - (ha.x + ha.w) : ha.x - (hb.x + hb.w);
    if (gap > THROW_SNAP_GAP) def.x -= dir * (gap - THROW_SNAP_GAP);
  }

  function keepApart(dt) {
    player.facing = 1;
    rival.facing = -1;
    dressFighter(player);
    dressRival(rival);
    if (player.x >= rival.x) {
      const mid = (player.x + rival.x) / 2;
      player.x = mid - 1;
      rival.x = mid + 1;
    }
    const a = bodyAABB(player);
    const b = bodyAABB(rival);
    const push = a.x + a.w - b.x;
    // Throw grab snap leftover: leftover 40px plants overlapped ~300 AABB
    // so this un-push ate the dump the next freeze tick. Hold the clinch
    // while thrownT. Pocket GAP 120 still eases on getup.
    if (push > 0 && !throwGrabHold()) {
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

  function startupShovePx(f, ms) {
    if (f.pushT <= 0) return 0;
    const win = ms == null ? cutStartup(f) : ms;
    return Math.max(0, f.pushVel) * Math.min(f.pushT, win);
  }

  function swingElapsed(f) {
    if (f.phase === "startup") return f.phaseT;
    if (f.phase === "active") return cutStartup(f) + f.phaseT;
    return 0;
  }

  function rivalPunishCut() {
    const dist = absGap();
    const gReach = bladeReach(rival) + golpeLungeOf(rival);
    const shove = startupShovePx(rival, GOLPE_STARTUP);
    if (dist + shove <= gReach) startAttack(rival, "golpe");
    else startAttack(rival);
  }

  function rivalLinkRoll(inRange) {
    // Base 40%. In-range follow-up bumps to 55% so cancels fire more when they connect.
    // Clash doors stay AI_LINK_CHANCE (not a mash robot).
    return Math.random() < (inRange ? AI_LINK_RANGE_CHANCE : AI_LINK_CHANCE);
  }

  function armRivalSlashLink(atk) {
    // One roll per connected tajo. Not every slash, not from idle, not on whiff.
    if (!atk || atk.kind !== "rival" || atk.cut !== "slash") return;
    const gReach = bladeReach(rival) + golpeLungeOf(rival);
    atk.linkGolpe = rivalLinkRoll(absGap() <= gReach);
  }

  function rivalHitConfirmBoltPriority() {
    // Hit-confirm especial cancel priority leftover (v428): same-frame
    // linkGolpe/linkSlash + linkBolt on connected late recovery used to let
    // tajo↔golpe steal the dart door while clash late already yields to
    // linkBolt and player hit-confirm already yields Space/L to K (v383) —
    // full+superArmed especial cancel never showed when the normal cancel
    // also rolled. True when !clashRec + linkBolt + boltCd ready + meterFull
    // + superArmed + cutToBoltWindow. Empty-meter combo-first unchanged.
    // Clash path still clashRec && linkBolt yield above.
    if (!rival || rival.clashRec) return false;
    if (!rival.linkBolt || rival.boltCd > 0) return false;
    if (!meterFull(rival) || !rival.superArmed) return false;
    return cutToBoltWindow(rival);
  }

  function rivalTrySlashGolpe() {
    // Same last-100ms door as the player. Chance was armed on connect.
    // Clash late recovery uses that same L door (40% once-per-clash).
    // Clash-K keeps priority so the 40% dart door is not stolen.
    // Hit-confirm especial (v428): full+superArmed linkBolt yields same way.
    if (!rival.linkGolpe) return false;
    if (rival.clashRec && rival.linkBolt) return false;
    if (rivalHitConfirmBoltPriority()) return false;
    if (!slashToGolpeWindow(rival)) return false;
    return cancelIntoGolpe(rival);
  }

  function armRivalGolpeLink(atk) {
    // One roll per connected golpe. Not every L, not from idle, not on whiff.
    if (!atk || atk.kind !== "rival" || atk.cut !== "golpe") return;
    const sReach = bladeReach(rival) + slashLungeOf(rival);
    atk.linkSlash = rivalLinkRoll(absGap() <= sReach);
  }

  function rivalTryGolpeSlash() {
    // Same last-100ms reverse door as the player. Chance was armed on connect.
    // Clash late recovery uses that same Space door (40% once-per-clash).
    // Clash-K keeps priority so the 40% dart door is not stolen.
    // Hit-confirm especial (v428): full+superArmed linkBolt yields same way.
    if (!rival.linkSlash) return false;
    if (rival.clashRec && rival.linkBolt) return false;
    if (rivalHitConfirmBoltPriority()) return false;
    if (!golpeToSlashWindow(rival)) return false;
    return cancelIntoSlash(rival);
  }

  function armRivalBoltLink(atk) {
    // One roll per connected tajo or golpe. Not every hit, not from idle, not on whiff.
    // Dart always "reaches" — bump when still mid/close so the door fires more in pocket.
    if (!atk || atk.kind !== "rival") return;
    if (atk.cut !== "slash" && atk.cut !== "golpe") return;
    const HOLD = bladeReach(rival) + slashLungeOf(rival);
    atk.linkBolt = rivalLinkRoll(absGap() <= HOLD + 80);
  }

  function armRivalClashBolt() {
    // One roll per clash. Last-100ms K door, not a dart robot, not from early recovery.
    rival.linkBolt = Math.random() < AI_LINK_CHANCE;
  }

  function armRivalClashCut() {
    // One roll per clash. Last-100ms Space or L, not a mash robot, not from early recovery.
    // Independent of clash-K (don't steal that door).
    const want = Math.random() < AI_LINK_CHANCE;
    if (!want) {
      rival.linkGolpe = false;
      rival.linkSlash = false;
      return;
    }
    if (Math.random() < 0.5) {
      rival.linkGolpe = true;
      rival.linkSlash = false;
    } else {
      rival.linkSlash = true;
      rival.linkGolpe = false;
    }
  }

  function rivalTryCutBolt() {
    // Same last-100ms special-cancel door as the player. Chance was armed on connect.
    // Clash late recovery uses that same K door (40% once-per-clash).
    // Combo doors fire first so the 40% tajo↔golpe once-per-connect is unchanged
    // (empty meter). Hit-confirm especial (v428): full+superArmed linkBolt
    // yields Space/L first via rivalHitConfirmBoltPriority — same as player v383.
    if (!rival.linkBolt) return false;
    if (rival.boltCd > 0) return false;
    if (!cutToBoltWindow(rival)) return false;
    const ok = cancelIntoBolt(rival);
    if (ok) rival.boltCd = BOLT_AI_CD;
    return ok;
  }

  function rivalTryThrow() {
    // Same throw as the player. Only a close hold-guard punish.
    if (rival.throwCd > 0) return false;
    if (!player.guarding) return false;
    if (absGap() > THROW_RANGE) return false;
    if (!startThrow(rival)) return false;
    rival.throwCd = THROW_AI_CD;
    rival.closing = false;
    rival.standWait = 0;
    rival.standGoal = 0;
    return true;
  }

  function meatySpaceAtGuard() {
    // Incoming Space slash or L golpe while they are actually guarding, in threat.
    // Not dart, not throw; L and Space both count as meaty melee. Meaty = already live (startup/active).
    if (!rival.guarding) return false;
    if (rival.guardBreakT > 0) return false;
    if (player.cut !== "slash" && player.cut !== "golpe") return false;
    if (player.phase !== "startup" && player.phase !== "active") return false;
    if (player.boltPhase === "startup") return false;
    if (bolt && bolt.kind === "you") return false;
    const dist = absGap();
    // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe pocket rides golpeLungeOf.
    if (player.cut === "golpe") {
      const HOLD = bladeReach(rival) + golpeLungeOf(rival);
      if (dist > HOLD + golpeLungeOf(rival)) return false;
      return true;
    }
    const HOLD = bladeReach(rival) + slashLungeOf(rival);
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): pad rides slashLungeOf(rival), not LUNGE_PX.
    if (dist > HOLD + slashLungeOf(rival)) return false;
    return true;
  }

  function meatyMeleeAtPlayerGuard() {
    // Player-side mirror of meatySpaceAtGuard. Incoming rival Space/L while you hold
    // guard, in threat. Not dart, not throw. Teach gate for drawReversalHint (v390) +
    // drawPushblockHint (v421).
    if (!player || !rival) return false;
    if (!player.guarding) return false;
    if (player.guardBreakT > 0) return false;
    if (rival.cut !== "slash" && rival.cut !== "golpe") return false;
    if (rival.phase !== "startup" && rival.phase !== "active") return false;
    if (rival.boltPhase === "startup") return false;
    if (bolt && bolt.kind === "rival") return false;
    const dist = absGap();
    // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe pocket rides golpeLungeOf.
    if (rival.cut === "golpe") {
      const HOLD = bladeReach(player) + golpeLungeOf(player);
      if (dist > HOLD + golpeLungeOf(player)) return false;
      return true;
    }
    const HOLD = bladeReach(player) + slashLungeOf(player);
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): pad rides slashLungeOf(player), not LUNGE_PX.
    if (dist > HOLD + slashLungeOf(player)) return false;
    return true;
  }

  function meatyMeleeAtPlayerOpen() {
    // Incoming rival Space/L in threat while you are open (not holding guard).
    // Not dart, not throw. Teach gate for drawParryHint (v422). Hold-guard meaty
    // stays REV/PB (v390/v421).
    if (!player || !rival) return false;
    if (player.guarding) return false;
    if (player.guardBreakT > 0) return false;
    if (rival.cut !== "slash" && rival.cut !== "golpe") return false;
    if (rival.phase !== "startup" && rival.phase !== "active") return false;
    if (rival.boltPhase === "startup") return false;
    if (bolt && bolt.kind === "rival") return false;
    const dist = absGap();
    // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe pocket rides golpeLungeOf.
    if (rival.cut === "golpe") {
      const HOLD = bladeReach(player) + golpeLungeOf(player);
      if (dist > HOLD + golpeLungeOf(player)) return false;
      return true;
    }
    const HOLD = bladeReach(player) + slashLungeOf(player);
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): pad rides slashLungeOf(player), not LUNGE_PX.
    if (dist > HOLD + slashLungeOf(player)) return false;
    return true;
  }

  function armRivalReversal() {
    // One roll per incoming meaty Space/L. Not every block, not a mash robot.
    if (rival.revArmed) return;
    rival.revArmed = Math.random() < REVERSAL_AI_CHANCE ? 1 : -1;
  }

  function rivalTryReversal() {
    // Same L-from-guard as the player. Only while actually guarding vs a meaty Space/L.
    if (!meatySpaceAtGuard()) {
      rival.revArmed = 0;
      return false;
    }
    if (rival.revCd > 0) return false;
    armRivalReversal();
    if (rival.revArmed !== 1) return false;
    if (!startReversal(rival)) return false;
    rival.revCd = REVERSAL_AI_CD;
    rival.guardChoice = 0;
    rival.wantBlock = false;
    rival.closing = false;
    rival.standWait = 0;
    rival.standGoal = 0;
    return true;
  }

  function armRivalPushblock() {
    // One roll per incoming meaty Space/L. Not every block, not a mash robot.
    if (rival.pbArmed) return;
    rival.pbArmed = Math.random() < PUSHBLOCK_AI_CHANCE ? 1 : -1;
  }

  function rivalTryPushblock() {
    // Same hold-S tap-away as the player. Only while actually guarding vs a meaty Space/L.
    // Not dart, not throw, not toward. Real CD so they are not a pushblock robot.
    if (!meatySpaceAtGuard()) {
      rival.pbArmed = 0;
      return false;
    }
    if (rival.guardChoice !== 1) return false;
    if (rival.pbCd > 0) return false;
    armRivalPushblock();
    if (rival.pbArmed !== 1) return false;
    if (!tryPushblock(rival, awayWalkDir(rival))) return false;
    rival.pbCd = PUSHBLOCK_AI_CD;
    return true;
  }

  function rivalPushblockOnBlock() {
    // Connecting block is the meaty. landBlock already set atk to recovery, so
    // meatySpaceAtGuard is false — do not use that gate here. Same 40%/CD/25/240.
    if (!rival.guarding) return false;
    if (rival.guardBreakT > 0) return false;
    if (rival.pbCd > 0) return false;
    armRivalPushblock();
    if (rival.pbArmed !== 1) return false;
    if (!tryPushblock(rival, awayWalkDir(rival))) return false;
    rival.pbCd = PUSHBLOCK_AI_CD;
    return true;
  }

  function meatySpaceAtWake() {
    // Incoming Space slash or L golpe on getup, in pocket. Not dart, not throw; L and Space both count as meaty melee.
    // Wakeup window is the gate — they are not guarding.
    if (!wakeupWindow(rival)) return false;
    if (player.cut !== "slash" && player.cut !== "golpe") return false;
    if (player.phase !== "startup" && player.phase !== "active") return false;
    if (player.boltPhase === "startup") return false;
    if (bolt && bolt.kind === "you") return false;
    const dist = absGap();
    // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe pocket rides golpeLungeOf.
    if (player.cut === "golpe") {
      const HOLD = bladeReach(rival) + golpeLungeOf(rival);
      if (dist > HOLD + golpeLungeOf(rival)) return false;
      return true;
    }
    const HOLD = bladeReach(rival) + slashLungeOf(rival);
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): pad rides slashLungeOf(rival), not LUNGE_PX.
    if (dist > HOLD + slashLungeOf(rival)) return false;
    return true;
  }

  function meatyMeleeAtPlayerWake() {
    // Player-side mirror of meatySpaceAtWake. Incoming rival Space/L on getup, in pocket.
    // Not dart, not throw. Hold-guard uses meatyMeleeAtPlayerGuard + drawReversalHint.
    // Teach gate for drawWakeReversalHint (v420).
    if (!player || !rival) return false;
    if (!wakeupWindow(player)) return false;
    if (player.guarding) return false;
    if (rival.cut !== "slash" && rival.cut !== "golpe") return false;
    if (rival.phase !== "startup" && rival.phase !== "active") return false;
    if (rival.boltPhase === "startup") return false;
    if (bolt && bolt.kind === "rival") return false;
    const dist = absGap();
    // CID/ROAN L golpe HOLD meaty-pad kit leftover (v448): golpe pocket rides golpeLungeOf.
    if (rival.cut === "golpe") {
      const HOLD = bladeReach(player) + golpeLungeOf(player);
      if (dist > HOLD + golpeLungeOf(player)) return false;
      return true;
    }
    const HOLD = bladeReach(player) + slashLungeOf(player);
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): pad rides slashLungeOf(player), not LUNGE_PX.
    if (dist > HOLD + slashLungeOf(player)) return false;
    return true;
  }

  function armRivalWakeReversal() {
    // One roll per getup. Not every wakeup, not a mash robot.
    if (rival.wakeRevArmed) return;
    rival.wakeRevArmed = Math.random() < REVERSAL_AI_CHANCE ? 1 : -1;
  }

  function rivalTryWakeReversal() {
    // Same startWakeReversal path as the player. Only vs a meaty Space/L in pocket.
    if (!meatySpaceAtWake()) {
      if (!wakeupWindow(rival)) rival.wakeRevArmed = 0;
      return false;
    }
    if (rival.revCd > 0) return false;
    armRivalWakeReversal();
    if (rival.wakeRevArmed !== 1) return false;
    if (!startWakeReversal(rival)) return false;
    rival.revCd = REVERSAL_AI_CD;
    rival.guardChoice = 0;
    rival.wantBlock = false;
    rival.closing = false;
    rival.standWait = 0;
    rival.standGoal = 0;
    return true;
  }

  function armRivalThrowTech() {
    // One roll per incoming throw startup. Not every throw, not after the window.
    if (rival.throwTechArmed) return;
    rival.throwTechArmed = Math.random() < THROW_TECH_CHANCE ? 1 : -1;
  }

  function rivalTryThrowTech() {
    // Space+S equivalent. Same 80ms startup, 0 dmg, shared 160ms recovery.
    if (!throwTechWindow(player)) {
      rival.throwTechArmed = 0;
      return false;
    }
    armRivalThrowTech();
    if (rival.throwTechArmed !== 1) return false;
    return tryThrowTech(rival);
  }

  function armRivalFeint() {
    // One roll per their slash startup. Not every slash, not a feint robot.
    if (rival.feintArmed) return;
    rival.feintArmed = Math.random() < FEINT_AI_CHANCE ? 1 : -1;
  }

  function rivalTryFeint() {
    // Same startFeint as the player. Only vs a committed player guard on
    // their slash startup. Not vs dart, not vs throw, not every slash.
    if (!canFeint(rival)) {
      if (rival.phase !== "startup" || rival.cut !== "slash") rival.feintArmed = 0;
      return false;
    }
    if (!player.guarding) return false;
    if (rival.feintCd > 0) return false;
    armRivalFeint();
    if (rival.feintArmed !== 1) return false;
    if (!startFeint(rival)) return false;
    rival.feintCd = FEINT_AI_CD;
    rival.feintArmed = 0;
    rival.wantBlock = false;
    rival.closing = false;
    return true;
  }

  function rivalTryFeintRetreat() {
    // Bait→feint-into-retreat (v361): show readable tele, pull, walk out.
    // Only when aiFeintRetreat armed after bait (no bite). FEINT_AI_CD gated.
    if (!rival.aiFeintRetreat) return false;
    if (!canFeint(rival)) {
      if (rival.phase !== "startup" || rival.cut !== "slash") rival.aiFeintRetreat = false;
      return false;
    }
    // ~70ms windup so the fake commit reads — not a twitch cancel.
    if (rival.phaseT < 70) return false;
    if (rival.feintCd > 0) {
      rival.aiFeintRetreat = false; // CD gate: finish the honest slash
      return false;
    }
    if (!startFeint(rival)) {
      rival.aiFeintRetreat = false;
      return false;
    }
    rival.feintCd = FEINT_AI_CD;
    rival.aiFeintRetreat = false;
    rival.wantBlock = false;
    rival.closing = false;
    rivalStartRetreat();
    return true;
  }

  function rollStandoff() {
    return STANDOFF_MIN + Math.random() * (STANDOFF_MAX - STANDOFF_MIN);
  }

  function rivalClearCommit() {
    rival.standWait = 0;
    rival.standGoal = 0;
    rival.closing = false;
    rival.aiMidApproachT = 0;
  }

  function rivalStartRetreat() {
    rival.aiRetreatT = AI_RETREAT_MS_MIN + Math.random() * (AI_RETREAT_MS_MAX - AI_RETREAT_MS_MIN);
    rivalClearCommit();
  }

  function rivalTryDartNow() {
    if (rival.boltCd > 0) return false;
    if (!canStartBolt(rival)) return false;
    startBolt(rival, rivalShouldSuper());
    rival.boltCd = BOLT_AI_CD;
    rivalClearCommit();
    return true;
  }

  function rivalDoPostReset(roomBack, HOLD, dist) {
    // After block/whiff: prefer backstep or dart over another Space.
    // Cornered post-reset dart leftover (v373): final rivalTryDartNow used to
    // fire with no range gate when !roomBack — point-blank dart from pocket
    // (mid mix needs HOLD+16 / mid post-reset band HOLD+8). Gate on HOLD+8;
    // cornered close falls through to close mix. Open-room retreat unchanged.
    const r = Math.random();
    if (r < 0.45 && roomBack) {
      rival.boltArmed = true;
      rivalStartRetreat();
      return true;
    }
    if (r < 0.75 && dist > HOLD + 8 && rivalTryDartNow()) {
      rival.boltArmed = false;
      return true;
    }
    if (roomBack) {
      rival.boltArmed = true;
      rivalStartRetreat();
      return true;
    }
    // Cornered: only dart from mid+, never point-blank from pocket.
    if (dist > HOLD + 8 && rivalTryDartNow()) return true;
    return false;
  }

  function rivalIdleCommit(roomBack, canStartGuard, myReach, HOLD, dist) {
    // Soft close mix: golpe / slash / bait / reset. High rolls stay slash so
    // harness Math.random=0.99 still reads a Space commit.
    rivalClearCommit();

    if (rival.aiResetT > 0) {
      const wantReset = Math.random() < AI_POST_RESET;
      rival.aiResetT = 0;
      if (wantReset && rivalDoPostReset(roomBack, HOLD, dist)) return;
    }

    const gReach = bladeReach(rival) + golpeLungeOf(rival);
    const shove = startupShovePx(rival, GOLPE_STARTUP);
    const golpeOk = dist + shove <= gReach;
    const r = Math.random();
    const tGolpe = AI_CLOSE_GOLPE;
    const tSlash = tGolpe + AI_CLOSE_SLASH;
    const tBait = tSlash + AI_CLOSE_BAIT;
    const tReset = tBait + AI_CLOSE_RESET;
    // AI close-range super mix leftover (v439): close mix used to never spend
    // the stock except cancel (v428). Soft: AI_CLOSE_SUPER low band spends when
    // rivalShouldSuper; remainder of close mix stays golpe/slash/bait/reset.
    // Harness 0.99 still Space. Not a super robot (BOLT_AI_CD). Versus skipped.
    if (rivalShouldSuper() && rival.boltCd <= 0 && canStartBolt(rival) && r < AI_CLOSE_SUPER) {
      startBolt(rival, true);
      rival.boltCd = BOLT_AI_CD;
      return;
    }

    if (r < tGolpe) {
      if (golpeOk) startAttack(rival, "golpe");
      else startAttack(rival);
      return;
    }
    if (r < tSlash) {
      startAttack(rival);
      return;
    }
    if (r < tBait && canStartGuard) {
      rival.aiBaitT = AI_BAIT_MS_MIN + Math.random() * (AI_BAIT_MS_MAX - AI_BAIT_MS_MIN);
      rival.guardChoice = 1;
      rival.wantBlock = true;
      return;
    }
    if (r < tReset && roomBack) {
      rival.boltArmed = true;
      rivalStartRetreat();
      return;
    }
    // Remainder (incl. harness 0.99): readable Space, not noise.
    startAttack(rival);
  }


  function tickVersusP2(dt) {
    // Versus local 2P playable unlock leftover (v430): drive rival from
    // DEFAULT_P2_BINDS (+ secondGamepad) when matchKind versus. Soft walk/guard
    // + rising-edge slash/golpe/dart; guard+slash throw / throw-tech;
    // guard+golpe reversal / wakeup-rev; rising-guard feint; away-tap pushblock;
    // human cancel doors (slash↔golpe / cut→bolt). CPU path unchanged.
    // Auto-link cancels skipped at call site. VERSUS_2P_READY true.
    // Versus fair-open leftover (v431): mid-measure edges arm p2Open*Buf
    // (mirror P1); flush after open with hold-gate; p2Held tracks through open.
    if (matchKind !== "versus") return;
    if (mode !== "play") return;

    const wantL = p2ActionHeld("left");
    const wantR = p2ActionHeld("right");
    const wantG = p2ActionHeld("guard");
    const wantSlash = p2ActionHeld("slash");
    const wantGolpe = p2ActionHeld("golpe");
    const wantDart = p2ActionHeld("dart");

    const edgeSlash = wantSlash && !p2Held.slash;
    const edgeGolpe = wantGolpe && !p2Held.golpe;
    const edgeDart = wantDart && !p2Held.dart;
    const edgeGuard = wantG && !p2Held.guard;
    const edgeL = wantL && !p2Held.left;
    const edgeR = wantR && !p2Held.right;

    p2Held.left = wantL;
    p2Held.right = wantR;
    p2Held.guard = wantG;
    p2Held.slash = wantSlash;
    p2Held.golpe = wantGolpe;
    p2Held.dart = wantDart;

    if (openLeft > 0) {
      // Soft open buffers — no walk/attack mid-measure (mirror P1 refuse).
      if (edgeDart) {
        p2OpenBoltBuf = true;
        p2OpenBuf = false;
        p2OpenGolpeBuf = false;
      } else if (edgeGolpe && !wantG) {
        p2OpenGolpeBuf = true;
        p2OpenBuf = false;
        p2OpenBoltBuf = false;
      } else if (edgeSlash && !wantG) {
        p2OpenBuf = true;
        p2OpenBoltBuf = false;
        p2OpenGolpeBuf = false;
      }
      rival.wantBlock = false;
      rival.gait = 0;
      rival.closing = false;
      return;
    }

    if (rival.falling || rival.stunT > 0 || (rival.thrownT || 0) > 0 || rival.guardBreakT > 0) {
      rival.wantBlock = false;
      rival.gait = 0;
      rival.closing = false;
      p2OpenBuf = false;
      p2OpenGolpeBuf = false;
      p2OpenBoltBuf = false;
      // Wakeup L still reachable while thrownT drains via edge below? thrownT
      // gates here — wakeupWindow runs after thrownT clears (idle path).
      return;
    }

    // Flush opening buffers with the same hold-gates as P1 openBuf / openBoltBuf / golpeBuf.
    if (p2OpenBuf && rival.phase === "idle" && !rival.guarding && rival.stunT <= 0 && !rival.falling && rival.feintT <= 0 && rival.guardBreakT <= 0 && !rival.boltPhase) {
      const ph = rival.phase;
      rival.phase = "active";
      const hold = bladeReach(rival) + slashLungeOf(rival);
      rival.phase = ph;
      if (bodyGap() <= hold + 2) {
        p2OpenBuf = false;
        p2OpenGolpeBuf = false;
        p2OpenBoltBuf = false;
        startAttack(rival);
      }
    }
    if (p2OpenBoltBuf && rival.phase === "idle" && !rival.guarding && rival.stunT <= 0 && !rival.falling && rival.feintT <= 0 && rival.guardBreakT <= 0 && !rival.boltPhase) {
      const ph = rival.phase;
      rival.phase = "active";
      const hold = bladeReach(rival) + slashLungeOf(rival);
      rival.phase = ph;
      if (bodyGap() <= hold + 2) {
        if (canStartBolt(rival)) {
          p2OpenBoltBuf = false;
          p2OpenBuf = false;
          p2OpenGolpeBuf = false;
          startBolt(rival, true);
        } else {
          p2OpenBoltBuf = false;
        }
      }
    }
    if (p2OpenGolpeBuf && rival.phase === "idle" && !rival.guarding && rival.stunT <= 0 && !rival.falling && rival.feintT <= 0 && rival.guardBreakT <= 0 && !rival.boltPhase) {
      const ph = rival.phase;
      rival.phase = "active";
      const hold = bladeReach(rival) + golpeLungeOf(rival);
      rival.phase = ph;
      if (bodyGap() <= hold + 2) {
        p2OpenGolpeBuf = false;
        p2OpenBuf = false;
        p2OpenBoltBuf = false;
        startAttack(rival, "golpe");
      }
    }

    const canGuard = rival.stamina >= STAMINA_START_MIN && rival.guardBreakT <= 0;
    rival.wantBlock = wantG && canGuard;

    // Rising-guard feint during slash startup (mirror P1 tap-S).
    if (edgeGuard && canFeint(rival)) {
      startFeint(rival);
    } else if (rival.guarding && (edgeL || edgeR)) {
      // Away-tap pushblock while holding guarda.
      if (edgeL) tryPushblock(rival, -1);
      if (edgeR) tryPushblock(rival, 1);
    } else if (edgeDart && cutToBoltWindow(rival) && cancelIntoBolt(rival)) {
      // Human cut→K / clash-K door.
    } else if (edgeGolpe && slashToGolpeWindow(rival) && cancelIntoGolpe(rival)) {
      // Human slash→golpe / clash-L door.
    } else if (edgeSlash && golpeToSlashWindow(rival) && cancelIntoSlash(rival)) {
      // Human golpe→slash / clash-Space door.
    } else if (rival.phase === "idle" && !rival.boltPhase && rival.feintT <= 0) {
      if (edgeSlash && wantG) {
        if (tryThrowTech(rival)) {
          /* tech */
        } else if (throwInRange()) {
          startThrow(rival);
        }
      } else if (edgeGolpe && wantG) {
        if (wakeupWindow(rival)) startWakeReversal(rival);
        else if (rival.guarding) startReversal(rival);
        else startAttack(rival, "golpe");
      } else if (edgeSlash && !wantG) {
        startAttack(rival);
      } else if (edgeGolpe && !wantG) {
        startAttack(rival, "golpe");
      } else if (edgeDart) {
        // Mirror player full-bar spend (startBolt spendSuper !== false).
        startBolt(rival, true);
      }
    } else if (edgeGolpe && wakeupWindow(rival)) {
      startWakeReversal(rival);
    }

    let move = 0;
    if (!rival.guarding && rival.phase === "idle" && !rival.boltPhase && rival.feintT <= 0 && rival.guardBreakT <= 0) {
      if (wantL) move -= 1;
      if (wantR) move += 1;
    }
    rival.closing = false;
    rival.gait = move;
    if (move !== 0) {
      let step = move * walkSpeed(rival) * walkCadence(rival) * (dt / 1000);
      const GAP = 120;
      const g = bodyGap();
      if (move > 0) {
        // Rival on the right facing left: +x walks away; pocket clamp unused.
        rival.x += step;
      } else {
        if (g <= GAP) { step = 0; move = 0; rival.gait = 0; }
        else step = -Math.min(-step, g - GAP);
        rival.x += step;
      }
    }
  }

  function armRivalOpenMix(dt) {
    // AI opening mix leftover (v435): one roll per round during OPENING_MS.
    // Never plant mid-measure. Versus skipped (human P2 owns p2Open*).
    if (matchKind === "versus") return;
    if (!rival.aiOpenArmed) {
      rival.aiOpenArmed = true;
      const r = Math.random();
      const tGolpe = AI_OPEN_GOLPE;
      const tSlash = tGolpe + AI_OPEN_SLASH;
      const tDart = tSlash + AI_OPEN_DART;
      const tBait = tDart + AI_OPEN_BAIT;
      if (r < tGolpe) rival.aiOpen = "golpe";
      else if (r < tSlash) rival.aiOpen = "slash";
      else if (r < tDart) rival.aiOpen = "dart";
      else if (r < tBait) rival.aiOpen = "bait";
      else rival.aiOpen = ""; // Remainder (incl. harness 0.99): existing walk-in.
    }
    rival.aiOpenHold = (rival.aiOpenHold || 0) + (dt || 0);
  }

  function rivalFlushOpenMix(dt) {
    // After OPENING_MS: persist walk-in / bait like P1 openBuf. Opening still
    // will not plant mid-measure. Versus skipped (human P2 owns p2Open*).
    if (!rival.aiOpen) return false;
    if (matchKind === "versus") { rival.aiOpen = ""; return false; }
    // Skip-measure (bootPlay + short wait + openLeft=0) must not inherit a
    // half-armed open. Only flush if the full OPENING_MS seated.
    if ((rival.aiOpenHold || 0) < OPENING_MS - STEP * 2) {
      rival.aiOpen = "";
      return false;
    }
    // holdRivalStill / freezeRivalAI park standGoal at 99999 (> STANDOFF_MAX 800).
    if (rival.standGoal > STANDOFF_MAX) return false;
    if (!rivalCanAct()) return false;
    if (rival.feintT > 0 || rival.guardBreakT > 0 || (rival.thrownT || 0) > 0) return false;

    const walkIn = (player.x < rival.x ? -1 : 1) * walkSpeed(rival) * (dt / 1000);

    if (rival.aiOpen === "bait") {
      const canStartGuard = rival.stamina >= STAMINA_START_MIN && rival.guardBreakT <= 0;
      if (canStartGuard) {
        rival.aiBaitT = AI_BAIT_MS_MIN + Math.random() * (AI_BAIT_MS_MAX - AI_BAIT_MS_MIN);
        rival.guardChoice = 1;
        rival.wantBlock = true;
      }
      rival.aiOpen = "";
      return true;
    }

    if (rival.aiOpen === "slash" || rival.aiOpen === "golpe" || rival.aiOpen === "dart") {
      const isGolpe = rival.aiOpen === "golpe";
      const isDart = rival.aiOpen === "dart";
      const ph = rival.phase;
      rival.phase = "active";
      const hold = bladeReach(rival) + (isGolpe ? golpeLungeOf(rival) : slashLungeOf(rival));
      rival.phase = ph;
      if (bodyGap() <= hold + 2) {
        const kind = rival.aiOpen;
        if (isDart) {
          if (canStartBolt(rival)) {
            rival.aiOpen = "";
            startBolt(rival, rivalShouldSuper());
            rival.boltCd = BOLT_AI_CD;
            rival.closing = false;
            return true;
          }
          rival.aiOpen = "";
          return false;
        }
        rival.aiOpen = "";
        rival.closing = false;
        if (kind === "golpe") startAttack(rival, "golpe");
        else startAttack(rival);
        return true;
      }
      rival.closing = true;
      rival.gait = Math.sign(walkIn);
      rival.x += walkIn * walkCadence(rival);
      return true;
    }
    rival.aiOpen = "";
    return false;
  }

  function tickAI(dt) {
    rival.gait = 0;
    rival.wantBlock = false;
    if (openLeft > 0) {
      // AI opening mix leftover (v435): arm once, never plant mid-measure.
      armRivalOpenMix(dt);
      return;
    }
    // Versus local 2P playable unlock leftover (v430): human P2 owns the rival —
    // skip CPU mix when matchKind versus (VERSUS_2P_READY true).
    if (matchKind === "versus") return;
    if (rival.throwCd > 0) rival.throwCd = Math.max(0, rival.throwCd - dt);
    if (rival.revCd > 0) rival.revCd = Math.max(0, rival.revCd - dt);
    if (rival.pbCd > 0) rival.pbCd = Math.max(0, rival.pbCd - dt);
    if (rival.feintCd > 0) rival.feintCd = Math.max(0, rival.feintCd - dt);
    if (rival.aiResetT > 0) rival.aiResetT = Math.max(0, rival.aiResetT - dt);
    if (rival.aiMidApproachT > 0) rival.aiMidApproachT = Math.max(0, rival.aiMidApproachT - dt);
    // AI opening mix leftover (v435): flush buffered open after OPENING_MS.
    if (rivalFlushOpenMix(dt)) return;
    if (rivalTryThrowTech()) return;
    if (rivalTryFeint()) return;
    if (rivalTryFeintRetreat()) return;
    if (!rivalCanAct()) return;
    // Hitstun meaty leftover (v400): standing flesh/chip stun used to hard-freeze
    // AI (stunT > 0 return), so after a connect the frame-advantage seat burned
    // into standoff — never a meaty. Throw KD (thrownT) / falling still freeze —
    // wakeup owns getup. Soft: punish/close while stunT > 0 && thrownT <= 0.
    if (player.falling || player.thrownT > 0) return;
    if (player.stunT > 0) {
      // holdRivalStill / freezeRivalAI park standGoal at 99999 (> STANDOFF_MAX 800).
      // Honor that harness freeze so chip-stun destRect tests stay planted.
      if (rival.standGoal > STANDOFF_MAX) return;
      const distStun = absGap();
      const holdStun = bladeReach(rival) + slashLungeOf(rival);
      const shoveStun = startupShovePx(rival);
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.aiRetreatT = 0;
      rival.aiBaitT = 0;
      rival.guardChoice = 0;
      rival.wantBlock = false;
      if (distStun + shoveStun <= holdStun) {
        rival.closing = false;
        rivalPunishCut();
      } else {
        rival.closing = true;
        const walkInStun = (player.x < rival.x ? -1 : 1) * walkSpeed(rival) * (dt / 1000);
        rival.gait = Math.sign(walkInStun);
        rival.x += walkInStun * walkCadence(rival);
      }
      return;
    }
    if (rivalTryWakeReversal()) return;
    // Wakeup meaty leftover (v401): after thrownT freeze, throwInvuln getup used
    // to fall into idle standoff (400–800ms) — never a meaty into the 80ms
    // window, so meaty-vs-wakeup-rev never opened. Soft: same punish/close as
    // standing stun while wakeupWindow(player). KD/falling still freeze above.
    if (wakeupWindow(player)) {
      // holdRivalStill / freezeRivalAI park standGoal at 99999 (> STANDOFF_MAX 800).
      if (rival.standGoal > STANDOFF_MAX) return;
      const distWake = absGap();
      const holdWake = bladeReach(rival) + slashLungeOf(rival);
      const shoveWake = startupShovePx(rival);
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.aiRetreatT = 0;
      rival.aiBaitT = 0;
      rival.guardChoice = 0;
      rival.wantBlock = false;
      if (distWake + shoveWake <= holdWake) {
        rival.closing = false;
        rivalPunishCut();
      } else {
        rival.closing = true;
        const walkInWake = (player.x < rival.x ? -1 : 1) * walkSpeed(rival) * (dt / 1000);
        rival.gait = Math.sign(walkInWake);
        rival.x += walkInWake * walkCadence(rival);
      }
      return;
    }
    // Riposte window respect leftover (v402): after perfect-parry stagger
    // ended, too-close / leftover idle-commit used to mash into live
    // RIPOSTE_WIN (player reward unread as a threat — pocket follow-up ate
    // the remaining ~100ms). Soft: while player.riposteWindowT > 0, freeze
    // (no punish-cut / idle commit / closing). Stagger still locks via
    // rivalCanAct. Player riposte startup already freezes via playerSwinging.
    // holdRivalStill / freezeRivalAI park standGoal at 99999 (> STANDOFF_MAX 800).
    if (player.riposteWindowT > 0) {
      if (rival.standGoal > STANDOFF_MAX) return;
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.aiRetreatT = 0;
      rival.aiBaitT = 0;
      rival.guardChoice = 0;
      rival.wantBlock = false;
      rival.closing = false;
      return;
    }

    const dist = absGap();
    const HOLD = bladeReach(rival) + slashLungeOf(rival);
    const myReach = HOLD;
    if (rival.boltCd > 0) {
      rival.boltCd = Math.max(0, rival.boltCd - dt);
      // Post-reset spent-dart mid ready leftover (v375): spent dart cleared
      // boltArmed; CD expiry used to leave mid on CD soft-mix forever (ready
      // band never returned). Re-arm when cooled so AI_MID_DART owns mid again.
      // Opening still starts unarmed (cd already 0 — this gate does not fire).
      if (rival.boltCd <= 0) rival.boltArmed = true;
    }
    if (dist <= HOLD) rival.boltArmed = true;
    // Count the attacker's lunge: at true measure dist≈HOLD, so bare
    // dist<=HOLD never armed the 40% guard and the rival ate every Space.
    const boltIncoming = player.boltPhase === "startup" || !!(bolt && bolt.kind === "you");
    // Dart recovery punish early-path leftover (v396): hoist so bait→punish and
    // broken stam share the same resolved-K gate as the main punish/close.
    const dartRecPunish = player.boltPhase === "recovery" && !(bolt && bolt.kind === "you");
    // Feint recovery punish leftover (v398): feint leaves phase idle + feintT lock —
    // same free window family as Space/L recovery / dartRecPunish for AI punish.
    const feintRecPunish = player.feintT > 0;
    // Guard-break punish leftover (v399): guardBreakT lock is phase idle too —
    // same free window family (cannot re-raise) for AI punish/close.
    const guardBreakPunish = player.guardBreakT > 0;
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): threat pad rides slashLungeOf(rival).
    // CID/ROAN L golpe inThreat/stam-threat kit leftover (v449): live golpe pocket rides golpeLungeOf.
    let inThreat = dist <= HOLD + slashLungeOf(rival) || boltIncoming;
    if (
      (player.phase === "startup" || player.phase === "active") &&
      player.cut === "golpe" &&
      player.boltPhase !== "startup" &&
      !(bolt && bolt.kind === "you")
    ) {
      const gHold = bladeReach(rival) + golpeLungeOf(rival);
      inThreat = dist <= gHold + golpeLungeOf(rival) || boltIncoming;
    }
    const playerSwinging = player.phase === "startup" || player.phase === "active" || boltIncoming;
    const walkIn = (player.x < rival.x ? -1 : 1) * walkSpeed(rival) * (dt / 1000);
    const walkOut = -walkIn;
    const rb = bodyAABB(rival);
    const roomBack = (W - 8) - (rb.x + rb.w) > 16;
    const canStartGuard = rival.stamina >= STAMINA_START_MIN && rival.guardBreakT <= 0;
    const broken = rival.stamina < STAMINA_START_MIN || rival.guardBreakT > 0;

    // Occasional hold-guard bait (no perfect-parry AI). Keep raise while baiting
    // even if the player is idle; drop when timer ends, then resume mix.
    // Bait end mix (v361): punish recovery if they bit; else occasional
    // feint-into-retreat; else soft reset — not another Space mash.
    if (rival.aiBaitT > 0 && !playerSwinging) {
      rival.aiBaitT = Math.max(0, rival.aiBaitT - dt);
      // Bait→punish: they swung into the hold — cut on recovery, don't sit on S.
      // Dart recovery punish early-path leftover (v396): resolved K leaves phase
      // idle while boltPhase recovery still runs — same free window as Space/L.
      // Feint recovery punish leftover (v398): feintT lock is phase idle too —
      // bait used to sit on S through the pull.
      // Guard-break punish leftover (v399): guardBreakT lock is phase idle too —
      // bait used to sit on S through the shatter.
      if ((player.phase === "recovery" || dartRecPunish || feintRecPunish || guardBreakPunish) && dist <= myReach) {
        rival.aiBaitT = 0;
        rival.guardChoice = 0;
        rival.wantBlock = false;
        rival.guarding = false; // startAttack rejects guarding
        rivalClearCommit();
        rivalPunishCut();
        return;
      }
      if (canStartGuard || rival.guarding) {
        rival.wantBlock = true;
        rival.guardChoice = 1;
        rival.phase = "idle";
        rival.phaseT = 0;
        rivalClearCommit();
        if (rival.aiBaitT <= 0) {
          rival.guardChoice = 0;
          rival.wantBlock = false;
          rival.guarding = false; // startAttack rejects guarding
          // No bite: occasional feint-into-retreat (FEINT_AI_CD), else soft reset.
          if (roomBack && rival.feintCd <= 0 && Math.random() < AI_BAIT_FEINT) {
            startAttack(rival);
            if (rival.phase === "startup") {
              rival.aiFeintRetreat = true;
              return;
            }
          }
          if (dist <= myReach) rival.aiResetT = Math.max(rival.aiResetT, 200);
        }
        return;
      }
      rival.aiBaitT = 0;
      rival.guardChoice = 0;
    }

    // Soft retreat after reset / bait — walk out, then prefer dart if ready.
    // Recovery punish retreat early-path leftover (v397): Space/L recovery and
    // resolved-K dartRecPunish used to lose to aiRetreatT walk-out — retreat
    // often outlasts the free window. Abort so main punish/close owns it.
    // Feint recovery punish leftover (v398): same abort for feintT lock.
    // Guard-break punish leftover (v399): same abort for guardBreakT lock.
    if (rival.aiRetreatT > 0 && !playerSwinging) {
      if (player.phase === "recovery" || dartRecPunish || feintRecPunish || guardBreakPunish) {
        rival.aiRetreatT = 0;
        rivalClearCommit();
        // Fall through to main punish/close (and broken/throw as needed).
      } else {
        rival.aiRetreatT = Math.max(0, rival.aiRetreatT - dt);
        rivalClearCommit();
        if (roomBack) {
          rival.gait = Math.sign(walkOut);
          rival.x += walkOut * walkCadence(rival);
        }
        if (rival.aiRetreatT <= 0) {
          if (rival.boltArmed && rival.boltCd <= 0 && dist > HOLD + 16 && canStartBolt(rival)) {
            rivalTryDartNow();
          }
        }
        return;
      }
    }

    // Raise still commits at 140ms / 40%. Keep that raise through the
    // exchange (swing + recovery) so hold-drain + block-20 actually bite.
    // Drop when the player is idle — never hold S forever (bait timer owns idle hold).
    if (!playerSwinging && player.phase !== "recovery" && player.boltPhase !== "recovery") {
      // After a hold they are often shoved past HOLD. Walk back in;
      // do not spend the special as a block-punish fireball.
      if (rival.aiBaitT <= 0) {
        if (rival.guardChoice === 1 && dist > HOLD) rival.closing = true;
        rival.guardChoice = 0;
      }
    } else if (rival.guardChoice === 0 && playerSwinging) {
      const telegraphT = player.boltPhase === "startup" ? player.boltT : swingElapsed(player);
      const canCommit = telegraphT >= GUARD_COMMIT_MS || !!bolt;
      if (canCommit) rival.guardChoice = (inThreat && canStartGuard && Math.random() < 0.4) ? 1 : -1;
    }
    if (rival.guardChoice === 1 && !(rival.guarding || canStartGuard)) {
      rival.guardChoice = -1;
    }

    // L-from-guard only while the raise is actually up vs a meaty Space/L.
    if (rivalTryReversal()) return;
    // Pushblock on connecting landBlock, not here. Startup shove made meaty L/Space
    // whiff the 240px before active. Guard hold still runs below.

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
      // Answer-dart leftover (v438): boltIncoming used to freeze AI with no K, and
      // canStartBolt refused opposing startup/live — v412 birth clash stayed
      // harness-only. Soft: AI_DART_ANSWER high band (incl. harness 0.99) empty
      // answers when ready. Spent still mid/open/cancel. Guard raise above kept.
      // Not a dart robot (BOLT_AI_CD). Versus skipped earlier.
      if (boltIncoming && rival.boltCd <= 0 && canStartBolt(rival)) {
        // Readable tele / live dart before answer (mirror GUARD_COMMIT_MS) —
        // not a same-frame mash into the knife raise.
        const ansTele = player.boltPhase === "startup" ? player.boltT : 1e9;
        if (ansTele >= GUARD_COMMIT_MS || !!bolt) {
          const rAns = Math.random();
          if (rAns >= 1 - AI_DART_ANSWER) {
            startBolt(rival, false);
            rival.boltCd = BOLT_AI_CD;
            rival.closing = false;
            rival.standWait = 0;
            rival.standGoal = 0;
            rival.aiRetreatT = 0;
            return;
          }
        }
      }
      rival.closing = false;
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.aiRetreatT = 0;
      return;
    }

    // Guard punish, not a grab robot: hold-guard + throw range + CD.
    // Idle/walk still eats a slash or dart.
    if (rivalTryThrow()) return;

    // Stam<15 or break: do not statue. Punish a recovery if it still
    // connects; otherwise walk out. Incoming swing already ate the hit.
    // Cornered broken leftover (v372): !roomBack + out of punish reach used
    // to return idle — a statue on the wall. Walk in toward measure instead.
    if (broken) {
      rival.closing = false;
      rival.standWait = 0;
      rival.standGoal = 0;
      const shove = startupShovePx(rival);
      // Dart recovery punish early-path leftover (v396): phase-only missed resolved
      // K recovery, so roomBack walked out before the in-reach punish.
      // Feint recovery punish leftover (v398): same gate for feintT lock.
      // Guard-break punish leftover (v399): same gate for guardBreakT lock.
      if ((player.phase === "recovery" || dartRecPunish || feintRecPunish || guardBreakPunish) && dist + shove <= myReach) {
        rivalPunishCut();
        return;
      }
      if (roomBack) {
        rival.gait = Math.sign(walkOut);
        rival.x += walkOut * walkCadence(rival);
        return;
      }
      if (dist <= myReach) {
        rivalPunishCut();
        return;
      }
      // Cornered broken leftover (v372): no roomBack and out of punish reach
      // used to return idle — a statue (open mid walks out; close punishes;
      // comment said do not statue). Walk in toward measure so a recovery
      // punish can still land. Not a dart robot / not Space mash. BOLT_AI_CD /
      // AI_MID_* / close mix / cancel doors locked.
      rival.gait = Math.sign(walkIn);
      rival.x += walkIn * walkCadence(rival);
      return;
    }

    // Dart recovery punish leftover (v395): Space/L phase===recovery already
    // punished/closed, but after a resolved K dart (bolt null) the caster stays
    // in boltPhase recovery with phase idle — AI fell through to idle standoff
    // and the 280/380 recovery went free. Live you-dart still owns boltIncoming
    // freeze above. Same punish/close when dart is gone.
    // dartRecPunish hoisted above (v396) for bait/broken early paths.
    // Feint recovery punish leftover (v398): feintRecPunish same gate (hoisted).
    // Guard-break punish leftover (v399): guardBreakPunish same gate (hoisted).
    if (player.phase === "recovery" || dartRecPunish || feintRecPunish || guardBreakPunish) {
      // Empujón slides the blocker out during our 180 startup.
      // Swing only if the predicted gap still connects; otherwise close.
      // Never take the old myReach+40 air slash.
      const shove = startupShovePx(rival);
      const pred = dist + shove;
      if (pred <= myReach) {
        rivalPunishCut();
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
        rivalPunishCut();
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
      // Mid: prefer dardo / walk-in (not a close Space mash). Fireball is a
      // spacing tool, not a shove-punish. Closing from recovery walks back in
      // first. HOLD+16 so measure jitter (HOLD+4) is still the pocket — not a
      // 1px fireball. Soft mix when armed+ready: high band (AI_MID_DART, incl.
      // harness 0.99) darts; AI_MID_WALK_PAUSE stands a beat; remainder walks in.
      // AI mid-round super mix leftover (v436): of those darts, AI_MID_SUPER high
      // band spends (harness 0.99); rest of the dart band stays empty K.
      if (rival.boltArmed && rival.boltCd <= 0 && dist > HOLD + 16 && canStartBolt(rival)) {
        rival.aiMidApproachT = 0;
        const rMid = Math.random();
        if (rMid >= 1 - AI_MID_DART) {
          startBolt(rival, rivalShouldSuper() && rMid >= 1 - AI_MID_SUPER);
          rival.boltCd = BOLT_AI_CD;
          rival.closing = false;
          rival.standWait = 0;
          rival.standGoal = 0;
          return;
        }
        if (rMid < AI_MID_WALK_PAUSE) {
          rival.closing = false;
          rival.standWait = 0;
          rival.standGoal = rollStandoff();
          return;
        }
        // Remainder (~0.06): fall through to walk-in below.
      } else if (dist > HOLD + 16 && rival.aiRetreatT <= 0) {
        // Mid-range bolt-CD leftover (v369): bolt cooling used to force 100%
        // walk-in for the full BOLT_AI_CD — a robot approach, not a spacing
        // read. Soft mix pause / occasional retreat / short walk commit.
        // Ready-band dart mix above unchanged (harness 0.99 still darts).
        // Not a feint robot / not Space mash from mid. BOLT_AI_CD / AI_MID_* locked.
        if (rival.standGoal > 0) {
          rival.closing = false;
          rival.standWait += dt;
          if (rival.standWait < rival.standGoal) return;
          rival.standWait = 0;
          rival.standGoal = 0;
        }
        if (rival.aiMidApproachT > 0) {
          rival.gait = Math.sign(walkIn);
          rival.x += walkIn * walkCadence(rival);
          rival.closing = false;
          rival.standWait = 0;
          rival.standGoal = 0;
          return;
        }
        if (rival.standGoal <= 0) {
          const rCd = Math.random();
          if (rCd < AI_MID_CD_PAUSE) {
            rival.closing = false;
            rival.standWait = 0;
            rival.standGoal = rollStandoff();
            return;
          }
          if (rCd < AI_MID_CD_PAUSE + AI_MID_CD_RETREAT && roomBack) {
            rival.boltArmed = true;
            rivalStartRetreat();
            return;
          }
          // Cornered mid bolt-CD leftover (v374): retreat band with !roomBack
          // used to fall through to approach — pinned mid-CD stayed a walk-in
          // robot (open soft-mix retreat cannot fire). Soft: stand a beat
          // instead. Open retreat above unchanged. Remainder walk commit below.
          if (rCd < AI_MID_CD_PAUSE + AI_MID_CD_RETREAT && !roomBack) {
            rival.closing = false;
            rival.standWait = 0;
            rival.standGoal = rollStandoff();
            return;
          }
          // Remainder: short walk-in commit, then re-mix (not forever).
          rival.aiMidApproachT = AI_MID_APPROACH_MS_MIN + Math.random() * (AI_MID_APPROACH_MS_MAX - AI_MID_APPROACH_MS_MIN);
          rival.gait = Math.sign(walkIn);
          rival.x += walkIn * walkCadence(rival);
          rival.closing = false;
          rival.standWait = 0;
          rival.standGoal = 0;
          return;
        }
      }
      rival.gait = Math.sign(walkIn);
      rival.x += walkIn * walkCadence(rival);
      rival.standWait = 0;
      rival.standGoal = 0;
      rival.closing = false;
      rival.aiMidApproachT = 0;
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
      rivalPunishCut();
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
        if (dist <= myReach) rivalIdleCommit(roomBack, canStartGuard, myReach, HOLD, dist);
        else rival.closing = true;
      }
    }
  }

  function bumpShake(mag, dir, ms) {
    shake = ms;
    shakeDur = ms;
    shakeMag = mag;
    shakeDir = dir || 1;
    // Camera punch end cover settle leftover (v358): re-seat rate-limit at full.
    coverShown = PUNCH_PX;
    coverTick = -1;
  }

  function applyPush(def, atk) {
    const dir = def.x >= atk.x ? 1 : -1;
    def.pushT = GUARD_PUSH_MS;
    def.pushVel = (hurtW(def) * dir) / GUARD_PUSH_MS;
  }

  function awayWalkDir(f) {
    // Face right → A. Face left → D. Facing already looks at the rival.
    return f.facing > 0 ? -1 : 1;
  }

  function tryPushblock(f, dir) {
    // Hold S, tap away. Not toward. Not Space+S (throw). Not L+S (reversal).
    // Real stam chunk. Walk-into-guard is not a tap (caller uses walk edges).
    // Throw beats hold-guard: do not shove vs an incoming throw (startup/active).
    if (!f) return false;
    if (!f.guarding) return false;
    if (f.falling || f.stunT > 0) return false;
    if (f.guardBreakT > 0) return false;
    if (openLeft > 0) return false;
    const foe = f === player ? rival : player;
    if (foe && foe.cut === "throw" && (foe.phase === "startup" || foe.phase === "active")) return false;
    const away = awayWalkDir(f);
    if (dir !== away) return false;
    if (f.stamina < PUSHBLOCK_STAM) return false;
    // Stamina chunk spend leftover (v378): ghost+flash the −25.
    pulseStam(f, f.stamina);
    f.stamina -= PUSHBLOCK_STAM;
    f.stamRegenT = STAMINA_REGEN_DELAY;
    f.pushT = GUARD_PUSH_MS;
    f.pushVel = (PUSHBLOCK_PX * away) / GUARD_PUSH_MS;
    // Clash/tech/pushblock dust ↔ punchCover (v337): PUSHBLOCK_FX shove used to
    // spawn before bumpShake (no hitstop), so punch mark never armed — grit faded
    // linear through live cover while óxido steel held. Arm shake first (plantDustK).
    bumpShake(PUSHBLOCK_SHAKE, away, HITSTOP_BLOCK);
    spawnPlantDust(f, PUSHBLOCK_FX, away);
    // Player pushblock dust leftover: landBlock's 1.0 plant used to ride under
    // the boot after hitstop while PUSHBLOCK_FX scrape also spawned (shove arms
    // from the buffer after connect). Draw-only. Drop leftover block plant stamps
    // when shove owns the scrape. Rival landBlock already skips the small plant.
    // Pushblock walk-stop grit leftover (v376): also cull walk-stop / settle /
    // feint unmarked grit (was power 1.0 only). Specks still fly. Normal block
    // still plants 1.0.
    dropBlockPlantUnderShove(f);
    playPushblockSting();
    // Distinct connect juice vs normal block: stronger camera punch + óxido steel.
    // Hitstop ms / shove px / stam cost unchanged. Draw-only flash + shake mag.
    {
      const foe = f === player ? rival : player;
      const pt = guardSteelPoint(f);
      spawnSteelFlash(pt.x, pt.y, foe, f, true, "push");
    }
    if (f.stamina <= 0) tripGuardBreak(f);
    return true;
  }

  function dropBlockPlantUnderShove(f) {
    // Draw-only. Cull leftover landBlock plant stamps (and walk-stop / settle /
    // feint grit) for this fighter so shove scrape alone rides the boot.
    // Pushblock walk-stop grit leftover (v376): was power 1.0 unshifted only —
    // walk-stop 0.8 / stampNow 1.3 / feint 0.9 rode the 240px trail beside
    // PUSHBLOCK_FX. landBlock 1.0 is punch-marked (spawned under bumpShake) —
    // still cull it (unlike knock, which keeps punch-marked connect grit).
    // Specks keep flying. Shove trail stays.
    if (!f) return;
    const homeYou = f.kind === "you";
    for (let i = plantDust.length - 1; i >= 0; i--) {
      const p = plantDust[i];
      if (p.speck || p.shove) continue;
      if (p.homeYou !== homeYou) continue;
      plantDust.splice(i, 1);
    }
  }

  function dropPlantUnderBreak(f) {
    // Draw-only. Guard-break plant grit leftover (v377): cull leftover landBlock /
    // landParry / landBoltBlock / walk-stop stamps for this fighter so break
    // 1.25 alone rides the boot. Specks keep flying. Shove trails stay
    // (pushblock-trip skips 1.25 when pushT owns). Mirror dropBlockPlantUnderShove.
    if (!f) return;
    const homeYou = f.kind === "you";
    for (let i = plantDust.length - 1; i >= 0; i--) {
      const p = plantDust[i];
      if (p.speck || p.shove) continue;
      if (p.homeYou !== homeYou) continue;
      plantDust.splice(i, 1);
    }
  }

  function dropPlantUnderClash() {
    // Draw-only. Cull leftover plant stamps (lunge / walk / block) so clash
    // scrape alone rides the boot. Specks keep flying. Pushblock shove stamps
    // (if any) stay — clash bounce is not a shove trail.
    for (let i = plantDust.length - 1; i >= 0; i--) {
      const p = plantDust[i];
      if (p.speck || p.shove) continue;
      plantDust.splice(i, 1);
    }
  }

  function dropPlantUnderKnock(f) {
    // Draw-only. Knock grit leftover walk stamps ↔ punchCover (v348/v349): leftover
    // walk/idle plant stamps used to ride the knock boot (syncPlantDust) and
    // fade linear mid-cover beside punch-marked connect grit — a camera-punch
    // orphan (clash dropPlantUnderClash / pushblock dropBlockPlantUnderShove
    // siblings). Cull leftover unmarked non-shove stamps for this fighter so
    // connect knock grit alone rides the boot through punchCover. v349: landHit /
    // landBoltHit also cull atk (throw/tech already did). Specks still
    // fly. Shove trails stay. Already-marked connect grit stays. Walk/idle grit
    // unmarked when no knock. destRect/AABB planted.
    if (!f) return;
    const homeYou = f.kind === "you";
    for (let i = plantDust.length - 1; i >= 0; i--) {
      const p = plantDust[i];
      if (p.speck || p.shove) continue;
      if (p.homeYou !== homeYou) continue;
      if (p.punch) continue;
      plantDust.splice(i, 1);
    }
  }

  function flushLungePlantScrape(f) {
    // Lunge plant scrape ↔ knock cull leftover (v359): playPlantScrape used to
    // fire in advanceAttack the same tick landHit / landThrow / landBoltHit /
    // landThrowTech dropPlantUnderKnock culled the unmarked lunge stamp — scrape
    // for a plant the eye never saw (under whoosh+impacto). Clash cull same hole.
    // Whiff keeps grit+scrape. Juice-only. Arm lungePlantSfx with the stamp; flush
    // after resolveCuts only when unmarked grit still rides the boot.
    if (!f || !f.lungePlantSfx) return;
    f.lungePlantSfx = false;
    const homeYou = f.kind === "you";
    const live = plantDust.some((p) => !p.speck && !p.shove && !p.punch && p.homeYou === homeYou && p.t < STEP);
    if (live) playPlantScrape();
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
    clashTipDY = y - bladeTipY(home);
    clashSparkT = CLASH_SPARK_MS;
    clashShards = [];
    // Clearer clash shards: denser ring + óxido/brasa/hueso mix (palette).
    for (let i = 0; i < 15; i++) {
      const ang = (i / 15) * Math.PI * 2 + i * 0.11;
      clashShards.push({
        ang,
        len: 18 + (i % 5) * 8,
        brasa: i % 3 === 1,
        oxido: i % 3 === 2,
      });
    }
  }

  function stampNow(power) {
    spawnPlantDust(player, power);
    spawnPlantDust(rival, power);
    // Opening settle grit audio sync leftover: stamp dust armed settleT silent while
    // getup scrape / KO caida already matched grit. One scrape for the yard plant.
    playPlantScrape();
    settleT = SETTLE_MS;
    settleMax = SETTLE_MS;
  }

  function settleDip() {
    // destRect-only. Opening settle leftover: full 4 * u^2 used to plant
    // 4px the same tick stampNow armed settleT (openLeft lift / title
    // Space / rematch), so the yard hop was a stomp, not a settle.
    // Ease in over the first ~18% of settleT/settleMax, then the locked
    // square ease-out. Guard-break keeps GUARD_BREAK_SETTLE via settleMax.
    // AABB planted.
    if (settleT <= 0) return 0;
    const max = settleMax > 0 ? settleMax : SETTLE_MS;
    const u = settleT / max;
    const elapsed = 1 - u;
    const IN = 0.18;
    let rise = 1;
    if (elapsed < IN) {
      const t = elapsed / IN;
      rise = t * t * (3 - 2 * t);
    }
    return 4 * u * u * rise;
  }

  function spawnPlantDust(f, power, shoveDir) {
    if (!f) return;
    const r = destRect(f);
    const shove = shoveDir === -1 || shoveDir === 1;
    const dir = shove ? shoveDir : 0;
    // ~18px * power along shove so the 240px push reads (block scrape stays unshifted).
    const x = r.pivX + dir * (18 * power);
    const y = FLOOR_Y - 1;
    const plantDX = x - r.pivX;
    const homeYou = f.kind === "you";
    // Knock grit ↔ punchCover (v330): mark connect grit spawned while shake is
    // armed so draw can hold peak with cover (walk/idle grit stays unmarked).
    const punch = shake > 0 && shakeDur > 0;
    if (plantDust.length > 40) plantDust.splice(0, plantDust.length - 40);
    plantDust.push({
      x: x,
      y: y,
      t: 0,
      life: shove ? 240 + 90 * power : 200 + 80 * power,
      power: power,
      facing: f.facing,
      shoveDir: dir,
      shove: shove,
      vx: shove ? dir * (420 + 60 * power) : 0,
      homeYou: homeYou,
      plantDX: plantDX,
      punch: punch,
    });
    // Dust polish (v316): heavy connect grit (knock/scrape) used 6 long-lived
    // specks and read as noise under the boot; shove trails stay dense.
    const n = shove ? 7 : (power > 1.1 ? 5 : 4);
    for (let i = 0; i < n; i++) {
      const side = n <= 1 ? 0 : i / (n - 1) - 0.5;
      plantDust.push({
        x: x + side * (shove ? 14 : 10) * power + dir * (16 * power),
        y: y,
        t: 0,
        life: (shove ? 190 : 145) + i * 16,
        power: power * 0.55,
        facing: f.facing,
        // Shove trail follows shoveDir; walk/block/knock keep facing*12.
        vx: side * 55 * power + (shove ? dir * (150 + 50 * power) : f.facing * 12 * power),
        vy: -28 - (i % 3) * 12 - (shove ? 8 : 0),
        speck: true,
        shoveDir: dir,
        shove: shove,
        homeYou: homeYou,
        punch: punch,
      });
    }
    // Draw-only. Glue this tick so a later destRect.pivX move
    // (lunge keepApart / wall clamp) does not leave the stamp
    // on the spawn world xy. Specks still fly.
    syncPlantDust();
  }

  function syncPlantDust() {
    // Draw-only. Plant dust leftover: stamp used to sit at spawn world xy,
    // so after freeze the boot shoved 240 / knocked 80 / walked off and
    // the grit hung on empty stones. Stamps ride destRect.pivX (you + rival).
    // Specks still fly. destRect/AABB planted.
    for (const p of plantDust) {
      if (p.speck) continue;
      const f = p.homeYou ? player : rival;
      if (!f) continue;
      const r = destRect(f);
      p.x = r.pivX + (p.plantDX || 0);
      p.y = FLOOR_Y - 1;
    }
  }

  function hitWoundAnchor(f) {
    const bb = bodyAABB(f);
    return { x: bb.x + bb.w * 0.5, y: bb.y + bb.h * 0.28 };
  }

  function spawnDmgNum(x, y, amount, chip, def, kind) {
    // Draw-only. Damage number leftover: num used to sit at spawn world xy,
    // so after freeze the hurt knocked 80 / crumple dropped and the −N hung
    // in empty air (flesh spark already rides hitWoundAnchor). Ride live
    // hurt (you + rival). Rise still fades. destRect/AABB planted.
    // Damage number distinct leftover (v315): optional kind "hit"/"chip"/
    // "throw" so draw can tint clean vs chip vs grab without retuning dmg.
    const amt = Math.max(0, amount | 0);
    if (amt <= 0) return;
    const stack = dmgNums.length;
    const ox = ((stack % 3) - 1) * 16;
    const oy = -((stack % 4) * 12);
    const home = def || null;
    const a = home ? hitWoundAnchor(home) : { x: x, y: y };
    const plantDX = (x + ox) - a.x;
    const plantDY = (y + oy) - a.y;
    const k = kind || (chip ? "chip" : "hit");
    // Floating −N ↔ punchCover (v330): dmg nums only spawn on connect — always
    // punch-mark so draw can hold peak with cover even when spawn precedes
    // bumpShake (landHit arms −N before shake). Alpha only — rise still ages.
    // No live shake still fades linear via dmgNumK.
    const punch = true;
    dmgNums.push({
      x: x + ox,
      y: y + oy,
      t: 0,
      life: DMG_NUM_MS,
      amt: amt,
      chip: !!chip || k === "chip",
      kind: k,
      homeYou: home ? home.kind === "you" : null,
      plantDX: plantDX,
      plantDY: plantDY,
      punch: punch,
    });
    syncDmgNums();
  }

  function syncDmgNums() {
    // Draw-only. Damage number leftover: glue −N to live hurt wound
    // (hitWoundAnchor), not spawn world xy. Rise still fades from that
    // plant. destRect/AABB planted.
    for (const p of dmgNums) {
      if (p.homeYou !== true && p.homeYou !== false) continue;
      const f = p.homeYou ? player : rival;
      if (!f) continue;
      const a = hitWoundAnchor(f);
      p.x = a.x + (p.plantDX || 0);
      p.y = a.y + (p.plantDY || 0);
    }
  }

  function tickDmgNums(dt) {
    for (let i = dmgNums.length - 1; i >= 0; i--) {
      const p = dmgNums[i];
      p.t += dt;
      if (p.t >= p.life) dmgNums.splice(i, 1);
    }
  }

  function drawDmgNums() {
    if (!dmgNums.length) return;
    syncDmgNums();
    for (let i = 0; i < dmgNums.length; i++) {
      const p = dmgNums[i];
      const u = Math.min(1, p.t / p.life);
      const rise = DMG_NUM_RISE * u;
      // Floating −N ↔ punchCover (v330): cover envelope via dmgNumK (alpha).
      // Rise still linear u. Chip/clean/throw tints stay distinct.
      const fade = dmgNumK(p);
      // Draw-only. Damage number distinct leftover (v315): hit/chip used the
      // same −N family (brasa 3 / óxido 2), so dart chip looked like a soft
      // clean hit. Clean hit: bright hueso, larger (4). Chip: muted
      // óxido/pizarra, smaller (2) + ASCII "-" so it never reads as clean.
      // Throw/grab: brasa third tint (3). Trail ghosts keep the same tint.
      // Ride still live hurt. Rise still fades. destRect/AABB planted.
      const kind = p.kind || (p.chip ? "chip" : "hit");
      let scale = 4;
      let col = COL_HUESO;
      let label = "−" + p.amt;
      if (kind === "chip" || p.chip) {
        scale = 2;
        col = COL_OXIDO;
        label = "-" + p.amt;
      } else if (kind === "throw") {
        scale = 3;
        col = COL_BRASA;
        label = "−" + p.amt;
      } else if (kind === "super") {
        // Especial connect juice leftover (v393): spent −28 brasa, larger than hit/throw.
        scale = 5;
        col = COL_BRASA;
        label = "−" + p.amt;
      }
      // Damage number trail leftover: −N used to rise as a single glyph, so
      // the float read as a teleport hop off the wound, not a streak. Ghosts along the rise path; live −N still on top.
      ctx.save();
      for (let g = 3; g >= 1; g--) {
        const gu = Math.max(0, u - g * 0.08);
        if (gu <= 0) continue;
        const riseG = DMG_NUM_RISE * gu;
        const fadeG = fade * (0.28 / g);
        if (fadeG < 0.03) continue;
        // Chip ghosts lean pizarra so the trail stays muted vs clean hueso.
        const gcol = (kind === "chip" || p.chip) ? COL_PIZARRA : col;
        ctx.globalAlpha = fadeG;
        drawPixelText(label, p.x, p.y - riseG, scale, gcol, "center");
      }
      ctx.globalAlpha = Math.max(0, fade);
      drawPixelText(label, p.x, p.y - rise, scale, col, "center");
      ctx.restore();
    }
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
    // Dust / hit spark polish (v316): 9 wide muddy fans smeared through knock;
    // fewer sharper brasa/hueso streaks, tighter fan. Ride still live hurt.
    const base = dir >= 0 ? 0.15 : Math.PI - 0.15;
    for (let i = 0; i < 5; i++) {
      const fan = (i / 4 - 0.5) * 1.35;
      hitShards.push({
        ang: base + fan,
        len: 24 + (i % 2) * 9,
        brasa: i % 2 === 0,
      });
    }
  }

  function castPlantXY(f) {
    // Draw-only. Idle/walk K plant puff used to sit on destRect sheet-edge
    // (windup had no tipX) — empty air, not the raised blade.
    // Special-cancel keeps the live slash tip. Dart births from castPlantXY (tip).
    // Ride the throwKnife tip through leftover boltPlantFade so dart birth does not
    // dump the puff onto idle sheet-edge. destRect/AABB planted.
    // Spark origin leftover: clash-K / idle-sheathe-K cast puff used to sit on
    // the plant tip the same tick leftover slash still owned the sheet
    // (clashPlantFade / linkPlantFade), so the brasa hung off the visible blade.
    // Ease origin slash→throwKnife with that leftover fade.
    // spawnBrasaFx/syncBrasaFx seat cast on this live plant (wound 0).
    // Empty/telegraph K still plants on the throwKnife tip. Special-cancel
    // still rides the live slash tip. AABB planted. No new combat verb.
    const hb = bladeBox(f);
    const fallback = { x: bladeTipX(f), y: bladeTipY(f) };
    if (!f) return fallback;
    // Tip under holdCutFade / boltPlant leftover (v346): special-cancel cast follows
    // bladeTip (eased under holdCutFade with leftover sheathe) so puff tracks the visible
    // blade; after holdCutFade dies tip/cast sit on slash for dart birth. Idle/walk K
    // still throwKnife below. holdingCutBolt still skips knife plant path.
    if (holdingCutBolt(f)) return fallback;
    if (f.boltPhase !== "startup" && boltPlantFade(f) <= 0) return fallback;
    // Idle/walk K cast/puff rides the raised knife tip (throwKnife), not sword windup.
    const d = poseFamily(f).throwKnife || poseFamily(f).windup;
    if (d.tipX == null) return fallback;
    const r = destRect(f);
    const sc = poseScale(f);
    let x = poseMarkWorldX(f, d, d.tipX, r, sc);
    let y = d.tipY != null ? r.dy + d.tipY * sc : fallback.y;
    const cf = clashPlantFade(f);
    const lf = linkPlantFade(f);
    const k = Math.max(cf, lf);
    if (k > 0.02) {
      const sl = poseFamily(f).slash;
      if (sl.tipX != null) {
        const sx = poseMarkWorldX(f, sl, sl.tipX, r, sc);
        const sy = sl.tipY != null ? r.dy + sl.tipY * sc : y;
        x = sx + (x - sx) * (1 - k);
        y = sy + (y - sy) * (1 - k);
      }
    }
    return { x, y };
  }

  function spawnBrasaFx(kind, x, y, dir, def, scale) {
    brasaFxKind = kind;
    brasaX = x;
    brasaY = y;
    brasaDir = dir >= 0 ? 1 : -1;
    brasaHomeYou = !def || def === player;
    brasaBits = [];
    brasaFxScale = scale > 0 ? scale : 1;
    if (kind === "clash") {
      // Hold+clear through punchCover (v351): empty-dart vs steel can ride an armed
      // punch; no-punch path stays linear. Same tip, same CLASH_SPARK_MS 110 life.
      const home = brasaHomeYou ? player : rival;
      const hb = bladeBox(home);
      brasaWoundDX = x - bladeTipX(home);
      brasaWoundDY = y - bladeTipY(home);
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
      // Spark origin leftover: seat on live castPlantXY. Wound offset used to
      // bake against the pre-clashPlant / pre-advance origin, so brasaX stuck
      // on windup (clash-K) or raw slash tip (idle-sheathe) after ease.
      // Hold+clear through punchCover (v350): startBolt spend arms BOLT_SUPER_STOP.
      // Empty cast never arms shake — linear. Same tip, same 220 life.
      const p = castPlantXY(home);
      brasaX = p.x;
      brasaY = p.y;
      brasaWoundDX = 0;
      brasaWoundDY = 0;
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
      // Hold+clear through punchCover (v351): landBoltBlock arms bumpShake + HITSTOP_BLOCK.
      // No-punch path stays linear. Same tip, same STEEL_FLASH_MS 60 life.
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
    if (kind === "grab") {
      // Brief clinch puff — fewer / tighter bits than dart hit. Brasa/hueso/pizarra.
      // Hold+clear through punchCover (v333): landThrow arms GRAB_SHAKE + HITSTOP_HIT.
      brasaFxT = GRAB_FX_MS;
      for (let i = 0; i < 6; i++) {
        brasaBits.push({
          ang: (i / 6) * Math.PI * 2 + i * 0.13,
          len: 4 + (i % 3) * 2.2,
          r: 1.2 + (i % 3) * 0.4,
          tone: i % 3 === 0 ? "brasa" : (i % 3 === 1 ? "hueso" : "pizarra"),
        });
      }
      return;
    }
    if (kind === "feint") {
      // Tiny tip sheath fleck — ride live bladeTip. Hueso/pizarra only; not hit bloom.
      const home = brasaHomeYou ? player : rival;
      brasaX = bladeTipX(home);
      brasaY = bladeTipY(home);
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaFxT = FEINT_FX_MS;
      for (let i = 0; i < 3; i++) {
        brasaBits.push({
          ang: (brasaDir >= 0 ? -0.55 : Math.PI + 0.55) + i * 0.42,
          len: 2.2 + i * 1.1,
          r: 0.95 + (i % 2) * 0.3,
          tone: i === 1 ? "pizarra" : "hueso",
        });
      }
      return;
    }
    if (kind === "reversal") {
      // Discreet invuln flash mote on chest — ride live hitWoundAnchor. Hueso/brasa/pizarra.
      // Not parry gleam ring, not hit bloom.
      const home = brasaHomeYou ? player : rival;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaFxT = REVERSAL_FX_MS;
      for (let i = 0; i < 4; i++) {
        brasaBits.push({
          ang: (i / 4) * Math.PI * 2 + i * 0.11,
          len: 3 + (i % 3) * 1.6,
          r: 1.05 + (i % 2) * 0.35,
          tone: i % 3 === 0 ? "hueso" : (i % 3 === 1 ? "brasa" : "pizarra"),
        });
      }
      return;
    }
    if (kind === "riposte") {
      // Reward commit fleck on chest — ride live hitWoundAnchor. Brasa-forward vs reversal.
      // Not parry gleam ring, not hit bloom, not window teach bang.
      const home = brasaHomeYou ? player : rival;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaFxT = RIPOSTE_FX_MS;
      for (let i = 0; i < 5; i++) {
        brasaBits.push({
          ang: (i / 5) * Math.PI * 2 + i * 0.13,
          len: 3.2 + (i % 3) * 1.7,
          r: 1.1 + (i % 2) * 0.38,
          tone: i % 3 === 0 ? "brasa" : (i % 3 === 1 ? "hueso" : "pizarra"),
        });
      }
      return;
    }
    if (kind === "wakeup") {
      // Soft hueso wash on throw-invuln start — ride live hitWoundAnchor. Hueso/pizarra only.
      // Not reversal fleck (no brasa), not parry gleam, not hit bloom.
      const home = brasaHomeYou ? player : rival;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaFxT = WAKE_FX_MS;
      for (let i = 0; i < 3; i++) {
        brasaBits.push({
          ang: (i / 3) * Math.PI * 2 + i * 0.19,
          len: 2.4 + (i % 2) * 1.2,
          r: 0.9 + (i % 2) * 0.25,
          tone: i === 1 ? "pizarra" : "hueso",
        });
      }
      return;
    }
    brasaFxT = BRASA_HIT_MS;
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
    noteConnect();
    spawnClashSpark(cx, cy);
    // Drop leftover dart / bolt plant so clash recovery is a clean blade
    // lock. Leftover special-cancel K used to keep boltPhase startup or a
    // live bolt, so the other fighter's late clash-K door stayed shut
    // (cutToBoltWindow: boltPhase startup / bolt live). Clash leftover
    // pose plant also cleared — fresh leftover slash recovery, not a
    // stale cancel plant into idle.
    bolt = null;
    for (const f of [player, rival]) {
      f.boltPhase = "";
      f.boltT = 0;
      f.boltHoldCut = false;
      f.boltSuper = false;
      f.riposteWindowT = 0;
      f.riposteArmed = false;
      f.riposte = false;
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
      f.telegraph = false;
    }
    player.phase = "recovery";
    player.phaseT = Math.max(0, cutRecovery(player) - CLASH_RECOVERY);
    player.cutHit = false;
    player.clashRec = true;
    rival.phase = "recovery";
    rival.phaseT = Math.max(0, cutRecovery(rival) - CLASH_RECOVERY);
    rival.cutHit = false;
    rival.clashRec = true;
    armRivalClashBolt();
    armRivalClashCut();
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
    // Clash dust leftover: both lunge plants used to ride under the boot while
    // clash also stamped 1.2 scrape, so leftover lunge grit stacked under choque.
    // Draw-only. Drop leftover plant stamps when clash owns the scrape.
    // Specks still fly. Pushblock scrape-only unchanged.
    dropPlantUnderClash();
    // Clash/tech/pushblock dust ↔ punchCover (v337): scrape + shove used to spawn
    // before bumpShake, so punch mark never armed — grit faded linear mid-cover
    // while clash spark held. Arm shake first so plantDustK holds with cover
    // (same as landHit knock grit v330). Walk/idle grit unmarked.
    bumpShake(CLASH_SHAKE, 1, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    spawnPlantDust(player, 1.2);
    spawnPlantDust(rival, 1.2);
    // Clearer clash grit: outward shove trails on top of locked 1.2 scrape.
    // Draw-only (CLASH_FX). Specks still fly. 1.2 stamps stay for bar lock.
    spawnPlantDust(player, CLASH_FX, -1);
    spawnPlantDust(rival, CLASH_FX, 1);
    playSfx(SFX.choque);
    playClashSting();
  }

  function pulseBar(f, before) {
    f.hudGhost = Math.max(f.hudGhost, before);
    f.hudFlashT = HUD_FLASH_MS;
  }

  function pulseStam(f, before) {
    // Stamina chunk spend leftover (v378): arm ghost+flash on discrete −N spends.
    // Hold-drain stays live shrink. Mirror pulseBar. Draw-only.
    if (!f) return;
    const b = before == null ? f.stamina : before;
    f.stamGhost = Math.max(f.stamGhost || 0, b);
    f.stamFlashT = HUD_FLASH_MS;
  }

  function armHitInterruptFade(def) {
    // Hit interrupt leftover (v336): mid-cut / windup / knife → idle used to snap
    // the same tick landHit / landBoltHit set stunT (sheatheFade dies on stun;
    // poseBitmap idle). Reuse parryFadeT (attacker perfect-parry sibling). Latch
    // sheet for draw/tip. Clear bolt plant so poseBitmap stays idle during freeze
    // (advanceBolt would wait for hitstop). Idle chip stun (no cut sheet) still 0.
    // Throw interrupt leftover (v339): landThrow reuses the same latch; draw rests
    // leftover cut on hurt (poseBitmap hurt on thrownT). Idle throw still 0.
    // Tech / KO interrupt leftover (v340): landThrowTech reuses the same latch
    // before phase dump (slash/sheathe/knife → throw windup); KO mid-cut keeps the
    // latch through hp<=0 / falling (parryFade no longer dies on crumple). Idle
    // tech / tech-from-guard still 0. Draw-only. AABB planted. No new combat verb.
    // Tip under throw-startup→tech leftover (v341): latch tipPlantK raise fraction
    // on throw startup so tip ease under parryFade holds the edge blend while the
    // sheet stays windup. Idle tech / tech-from-guard still 0 (no sheet / no tipK).
    if (!def) return;
    let sheet = "";
    let tipK = 0;
    def.parryFadeTipKy = 0;
    // Empty-K cast sibling leftover (v370): latch before boltPhase dump.
    const interruptedBoltPlant = !!(def.boltPhase === "startup" || holdingCutBolt(def));
    if (holdingCutBolt(def) || def.phase === "active" || def.phase === "recovery") {
      sheet = "slash";
    } else if (def.boltPhase === "startup") {
      sheet = def.boltHoldCut ? "slash" : "knife";
    } else if (def.phase === "startup") {
      sheet = "windup";
      // Mirror tipPlantK throw-startup raise clock (throwGuardPlanting path).
      // Latch before phase dump. Raise done (tipK≈0) stays a windup→windup no-op.
      if (def.cut === "throw" && GUARD_RAISE_MS > 0) {
        const tRaise = def.phaseT || 0;
        const u = Math.max(0, Math.min(1, tRaise / GUARD_RAISE_MS));
        const raiseT = u * u * (3 - 2 * u);
        // tipPlantK then telegraphFade both ease edge→windup; latch the
        // combined blend so mid-tele tech holds the visible tip (not tipK alone).
        let blend = raiseT;
        let tipKy = 0;
        if (telegraphing(def)) {
          const tf = telegraphFade(def);
          if (tf < 0.98) {
            blend = raiseT * tf;
            // Tip under throw-startup→tech tipY leftover (v366): tipPlantK tipY is a
            // no-op (block tipY == windup tipY), so live tipY is tele-only. Latch
            // tipKy from tf (not raise×tele) so tipY holds chest→windup through pf.
            tipKy = 1 - tf;
          }
        }
        tipK = 1 - blend;
        def.parryFadeTipKy = tipKy;
      }
    } else if (def.sheatheT > 0 && def.phase === "idle") {
      sheet = "slash";
    }
    def.boltPhase = "";
    def.boltT = 0;
    def.boltHoldCut = false;
    def.boltSuper = false;
    def.clashPlant = false;
    def.linkPlant = false;
    def.holdCutPlant = false;
    def.linkSheathe = 0;
    def.telegraph = false;
    def.sheatheT = 0;
    // Empty-K cast sibling leftover (v370): cancelled plant must not keep cast
    // ember through foreign hit cover (brasaCoverHold). Own spend-freeze still
    // holds while boltSuper startup is live (no interrupt). Caster-owned only.
    if (interruptedBoltPlant && brasaFxKind === "cast") {
      const home = brasaHomeYou ? player : rival;
      if (home === def) {
        brasaFxT = 0;
        brasaFxKind = "";
      }
    }
    if (sheet) {
      def.parryFadeT = SHEATHE_MS;
      def.parryFadeSheet = sheet;
      def.parryFadeTipK = tipK;
      if (def.parryFadeTipKy == null) def.parryFadeTipKy = 0;
    } else {
      def.parryFadeT = 0;
      def.parryFadeSheet = "";
      def.parryFadeTipK = 0;
      def.parryFadeTipKy = 0;
    }
  }

  function landHit(atk, def, dir) {
    if (openLeft > 0) return;
    // Hurt juice leftover: leftover lunge ox dump used to pull cutPoint
    // off the live blade∩hurt the same tick recovery armed, so the
    // flesh spark sat on chest (AABB fallback) not the cut. Draw-only.
    // Ride still live hurt. destRect/AABB planted.
    const pt = cutPoint(atk, def);
    noteConnect();
    noteCombo(atk, def);
    const before = def.hp;
    def.hp = Math.max(0, def.hp - SLASH_DMG);
    pulseBar(def, before);
    spawnDmgNum(pt.x, pt.y, before - def.hp, false, def);
    gainMeter(atk, METER_HIT);
    if (atk.kind === "rival") {
      atk.superArmed = true;
      atk.aiSawBlock = false;
    }
    atk.phase = "recovery";
    atk.phaseT = 0;
    atk.cutHit = true;
    armRivalSlashLink(atk);
    armRivalGolpeLink(atk);
    armRivalBoltLink(atk);
    // Riposte connect: punchier shake mag (RIPOSTE_HIT_SHAKE) + pitched impacto.
    // HITSTOP_HIT 140 / HITSTUN 350 / HIT_FLASH_MS 120 / −10 locked.
    if (atk.riposte) {
      bumpShake(RIPOSTE_HIT_SHAKE, dir, HITSTOP_HIT);
      hitstopLeft = HITSTOP_HIT;
      playRiposteHitSting();
    } else {
      bumpShake(10, dir, HITSTOP_HIT);
      hitstopLeft = HITSTOP_HIT;
      playSfx(SFX.impacto);
    }
    def.stunT = HITSTUN;
    // Hit interrupt leftover (v336): fade leftover cut→idle (sheatheFade dies on stun).
    armHitInterruptFade(def);
    def.phase = "idle";
    def.phaseT = 0;
    def.guarding = false;
    def.reversal = false;
    def.riposteWindowT = 0;
    def.riposteArmed = false;
    def.riposte = false;
    atk.closing = false;
    def.closing = def.kind === "rival";
    def.standWait = 0;
    def.standGoal = 0;
    hitFlashT = HIT_FLASH_MS;
    spawnHitSpark(pt.x, pt.y, atk.facing, def);
    const kbDir = def.x >= atk.x ? 1 : -1;
    def.pushT = KNOCK_MS;
    def.pushVel = (KNOCK_PX * kbDir) / KNOCK_MS;
    // Knock grit leftover walk stamps ↔ punchCover (v348/v349): cull leftover
    // unmarked walk/idle stamps on def + atk so connect grit alone rides the boot.
    dropPlantUnderKnock(atk);
    dropPlantUnderKnock(def);
    spawnPlantDust(def, 1.15);
    if (def.hp <= 0) {
      koTarget = def;
    }
  }

  function landThrow(atk, def) {
    if (openLeft > 0) return;
    noteConnect();
    noteCombo(atk, def);
    const before = def.hp;
    def.hp = Math.max(0, def.hp - THROW_DMG);
    pulseBar(def, before);
    {
      const bb = bodyAABB(def);
      spawnDmgNum(bb.x + bb.w * 0.5, bb.y + bb.h * 0.28, before - def.hp, false, def, "throw");
    }
    gainMeter(atk, METER_HIT);
    if (atk.kind === "rival") atk.superArmed = true;
    atk.phase = "recovery";
    atk.phaseT = 0;
    atk.cutHit = true;
    atk.cut = "throw";
    atk.techRec = false;
    atk.techGuardTip = false;
    atk.leftoverPlantTip = false;
    atk.leftoverPlantTipK = 0;
    def.techRec = false;
    def.techGuardTip = false;
    def.leftoverPlantTip = false;
    def.leftoverPlantTipK = 0;
    // Grab-connect juice: GRAB_SHAKE + pitched impacto sting + brief brasa/hueso puff.
    // Hitstop / THROW_DMG / KD / frames unchanged. Distinct from tech steel + normal hit spark.
    bumpShake(GRAB_SHAKE, atk.facing, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playSfx(SFX.impacto);
    playGrabConnectSting();
    // Throw interrupt leftover (v339): fade leftover mid-cut / windup / knife /
    // sheathe → hurt (poseBitmap hurt on thrownT). Latch before phase/bolt clear.
    // Idle throw still 0. Sibling of landHit armHitInterruptFade (v336).
    armHitInterruptFade(def);
    def.guarding = false;
    def.reversal = false;
    def.riposteWindowT = 0;
    def.riposteArmed = false;
    def.riposte = false;
    def.phase = "idle";
    def.phaseT = 0;
    def.boltPhase = "";
    def.boltHoldCut = false;
    def.stunT = THROW_KD_MS;
    def.thrownT = THROW_KD_MS;
    def.throwInvulnT = 0;
    def.hurtFadeT = 0;
    def.wakeRev = false;
    def.pushT = 0;
    def.pushVel = 0;
    def.gait = 0;
    throwSnapTogether(atk, def);
    atk.closing = false;
    def.closing = def.kind === "rival";
    def.standWait = 0;
    def.standGoal = 0;
    hitFlashT = HIT_FLASH_MS;
    // Knock grit leftover walk stamps ↔ punchCover (v348): cull leftover
    // unmarked walk/idle stamps under grab grit (same hole as landHit).
    dropPlantUnderKnock(atk);
    dropPlantUnderKnock(def);
    spawnPlantDust(atk, 1.2);
    spawnPlantDust(def, 1.4);
    // Discreet clinch puff at body mid — brasa/hueso, not tech steel asterisk / slash spark.
    {
      const aa = bodyAABB(atk);
      const bb = bodyAABB(def);
      const mx = (aa.x + aa.w * 0.5 + bb.x + bb.w * 0.5) * 0.5;
      const my = (aa.y + aa.h * 0.36 + bb.y + bb.h * 0.36) * 0.5;
      spawnBrasaFx("grab", mx, my, atk.facing, def);
    }
    if (def.hp <= 0) koTarget = def;
  }

  function resolveThrow(atk, def) {
    if (!atk || !def) return;
    if (atk.cut !== "throw" || atk.phase !== "active" || atk.cutHit) return;
    if (atk.falling || atk.stunT > 0) return;
    if (throwLocked(def)) return;
    // Loses to a mashed Space or L that is already active.
    if (def.phase === "active" && def.cut !== "throw") return;
    if (!throwInRange()) return;
    landThrow(atk, def);
  }

  function throwTechWindow(atk) {
    // Startup only. Not active, not the 220 recovery.
    return !!(atk && atk.cut === "throw" && atk.phase === "startup" && !atk.falling);
  }

  function landThrowTech(atk, def) {
    noteConnect();
    const dir = def.x >= atk.x ? 1 : -1;
    const sep = 48;
    atk.pushT = KNOCK_MS;
    atk.pushVel = (-dir * sep) / KNOCK_MS;
    def.pushT = KNOCK_MS;
    def.pushVel = (dir * sep) / KNOCK_MS;
    // Tech interrupt leftover (v340): fade leftover mid-cut / sheathe / knife →
    // throw windup (poseBitmap windup on techRec). Latch before phase/bolt/cut
    // dump. Idle tech still 0. Tech-from-guard still techGuardPlantFade (no cut
    // sheet). Sibling of landThrow armHitInterruptFade (v339).
    // Tip under throw-startup→tech leftover (v341): arm also latches tipPlantK on
    // throw startup so tip eases under pf while sheet stays windup.
    armHitInterruptFade(atk);
    armHitInterruptFade(def);
    for (const f of [atk, def]) {
      // Tech-from-guard plant leftover: leftover k used to snap here, so
      // leftover block dumped into windup. Ease leftover k (tickGuardPose).
      // Throw-from-guard / reversal plant leftover same path. Idle tech
      // still snaps (no leftover k).
      f.guarding = false;
      f.phase = "recovery";
      f.phaseT = 0;
      f.cut = "throw";
      f.cutHit = false;
      f.clashRec = false;
      f.techRec = true;
      // Tip under tech-guard short raise leftover: latch tip raise when leftover
      // k planted so tipPlantK phaseT ease holds after gpk dies (techGuardPlanting
      // requires leftover k). Idle tech still snaps (no latch). Draw-only.
      f.techGuardTip = (f.guardPoseK || 0) > 0;
      f.leftoverPlantTip = false;
      f.leftoverPlantTipK = 0;
      f.gait = 0;
      f.boltPhase = "";
      f.boltHoldCut = false;
      f.stunT = 0;
      f.thrownT = 0;
      f.throwInvulnT = 0;
      f.wakeRev = false;
      f.closing = f.kind === "rival";
      f.standWait = 0;
      f.standGoal = 0;
      // Tech-from-guard plant walk-in pose leftover: capture walk intent after
      // unguard / closing arm. Arm walkFadeHold for restTechGuardWalk. Draw-only.
      if (recoveryWalkOut(f) && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    }
    // Clash/tech/pushblock dust ↔ punchCover (v337): tech scrape + shove used to
    // spawn before bumpShake (no hitstop), so punch mark never armed — grit faded
    // linear through live cover while steel held. Arm shake first (plantDustK).
    bumpShake(TECH_SHAKE, dir, HITSTOP_BLOCK);
    // Knock grit leftover walk stamps ↔ punchCover (v348): cull leftover
    // unmarked walk/idle stamps under tech scrape (clash cull sibling).
    dropPlantUnderKnock(atk);
    dropPlantUnderKnock(def);
    spawnPlantDust(atk, 1.1);
    spawnPlantDust(def, 1.1);
    // Clearer tech-clash grit: outward shove trails on top of locked 1.1 scrape.
    // Draw-only (TECH_FX). Specks still fly. 1.1 stamps stay for bar lock.
    spawnPlantDust(atk, TECH_FX, -dir);
    spawnPlantDust(def, TECH_FX, dir);
    // Distinct connect juice vs failed throw / normal block: tech steel + pitched sting.
    // Hitstop / tech window / recovery / damage unchanged. Draw-only flash + shake mag.
    {
      const aa = bodyAABB(atk);
      const bb = bodyAABB(def);
      const mx = (aa.x + aa.w * 0.5 + bb.x + bb.w * 0.5) * 0.5;
      const my = (aa.y + aa.h * 0.32 + bb.y + bb.h * 0.32) * 0.5;
      spawnSteelFlash(mx, my, atk, def, true, "tech");
    }
    playSfx(SFX.choque);
    playThrowTechSting();
  }

  function tryThrowTech(def) {
    if (!def || def.falling || def.hp <= 0) return false;
    if (def.thrownT > 0 || def.stunT > 0) return false;
    if (openLeft > 0) return false;
    // Winning mash already beats the throw. Tech is not a new attack.
    if (def.phase === "active" && def.cut !== "throw") return false;
    const atk = def === player ? rival : player;
    if (!throwTechWindow(atk)) return false;
    if (!throwInRange()) return false;
    landThrowTech(atk, def);
    return true;
  }

  function guardSteelPoint(f) {
    // Draw-only. Block tip plant leftover: guard-break steel used to sit on
    // bodyAABB chest mid while the opaque guard tip sat higher on the raised
    // blade. Seat Y on live bladeTipY when block tipY is marked. tipX /
    // bladeBox / reach unchanged (sheet-edge tipX fallback stays). Cut-block
    // asterisk still cutPoint. destRect/AABB planted.
    // Block steel X plant leftover: X used to sit on bodyAABB chest fraction
    // (0.72 / 0.28) while the opaque tip sat ~42px off on rival / flip.
    // Seat X on POSE.block steelX when marked — not tipX (tipX would retune
    // bladeReach on guard). tipY / bladeBox / reach unchanged. Cut-block
    // still cutPoint. destRect/AABB planted.
    const bb = bodyAABB(f);
    const d = poseSheet(f);
    const r = destRect(f);
    const sc = poseScale(f);
    let x = bb.x + bb.w * (f.facing > 0 ? 0.72 : 0.28);
    if (d && d.steelX != null) x = poseMarkWorldX(f, d, d.steelX, r, sc);
    if (d && d.tipY != null) return { x, y: bladeTipY(f) };
    return { x, y: bb.y + bb.h * 0.36 };
  }

  function tripGuardBreak(f, atk) {
    // Block tip plant leftover: plant steel while leftover block sheet still
    // owns tipY. guarding used to clear first, so guardSteelPoint sat on idle
    // chest mid. Draw-only plant order. Cut-block still cutPoint.
    const other = atk || (f === player ? rival : player);
    const pt = atk ? cutPoint(atk, f) : guardSteelPoint(f);
    f.guarding = false;
    f.stamina = 0;
    f.guardBreakT = GUARD_BREAK_MS;
    f.stamRegenT = STAMINA_REGEN_DELAY;
    // Guard-break readability leftover (v364): silver block asterisk used to
    // fire here — same as chip hold-block. Break kind + sting + soft dust.
    // Guard-break steel sync leftover: tip plant (!atk) must ride wound — sync
    // blade∩body mid used to hop the asterisk off the opaque tip.
    spawnSteelFlash(pt.x, pt.y, other, f, !atk, "break");
    playGuardBreakSting();
    // Guard-break plant grit leftover (v377): landBlock 1.0 / landParry 1.05 /
    // landBoltBlock 1.0 / walk-stop grit used to ride under the 1.25 shatter —
    // same hole knock/clash/pushblock already closed. Cull non-shove for this
    // fighter so break alone owns the boot. Pushblock-trip: shove trail already
    // owns (pushT) — skip 1.25 so PUSHBLOCK_FX alone rides. Specks still fly.
    dropPlantUnderBreak(f);
    if (!(f.pushT > 0)) spawnPlantDust(f, 1.25);
    // Tiny destRect settle only (AABB stays planted). Opening stamp is 260/4px.
    if (settleT < GUARD_BREAK_SETTLE) {
      settleT = GUARD_BREAK_SETTLE;
      settleMax = GUARD_BREAK_SETTLE;
    }
  }



  function syncRipostePad() {
    // Guard-zone brasa flash while riposte window is live. Draw-only pad class.
    const el = typeof document !== "undefined" && document.getElementById
      ? document.getElementById("zone-s")
      : null;
    if (!el || !el.classList) return;
    const on = !!(player && player.riposteWindowT > 0);
    if (on) el.classList.add("riposte");
    else el.classList.remove("riposte");
  }

  function tickRiposte(f, dt) {
    if (!f) return;
    if (f.riposteWindowT > 0) {
      f.riposteWindowT = Math.max(0, f.riposteWindowT - dt);
    }
  }

  function trySpendRiposteInput() {
    // Space OR L in window spends the one-shot and arms riposte slash (even on whiff).
    // Player only. Space+S in throw range stays throw; L+S while guarding stays reversal.
    if (!player || player.riposteWindowT <= 0) return false;
    if (player.falling || player.stunT > 0 || player.thrownT > 0) return false;
    const space = !!attackEdge;
    const l = !!golpeEdge;
    if (!space && !l) return false;
    if (space && actionHeld("guard") && throwInRange()) return false;
    if (l && actionHeld("guard")) return false;
    player.riposteWindowT = 0;
    player.riposteArmed = true;
    player.guarding = false;
    // Perfect-parry / riposte commit juice leftover (v363): spend used to fire only
    // sfx_riposte while the window hint died — feint/reversal/holdCut already seat
    // fleck+dust. Soft plant dust + brief brasa chest fleck; sting kept. Draw/SFX only.
    // RIPOSTE_WIN_MS / frames locked. No shake / no hit bloom.
    playRiposteSpendSting();
    spawnPlantDust(player, 0.95);
    {
      const chest = hitWoundAnchor(player);
      spawnBrasaFx("riposte", chest.x, chest.y, player.facing, player);
    }
    slashBuf = true;
    golpeBuf = false;
    boltBuf = false;
    throwBuf = false;
    openBuf = false;
    openBoltBuf = false;
    attackEdge = false;
    golpeEdge = false;
    return true;
  }

  function tryFireRiposte() {
    if (!player || !player.riposteArmed) return false;
    if (openLeft > 0) return false;
    if (player.phase !== "idle" || player.guarding || player.stunT > 0 || player.falling) return false;
    if (player.feintT > 0 || player.boltPhase) return false;
    // Spent on press even on whiff — no measure gate (reward is earlier startup).
    slashBuf = false;
    golpeBuf = false;
    startAttack(player);
    return true;
  }

  function isPerfectParry(atk, def) {
    // Player only. Raise-edge window vs melee Space/L. Not throw, not dart.
    // landBlock is never dart/throw — still gate cut for clarity.
    if (def !== player) return false;
    if (!(atk.cut === "slash" || atk.cut === "golpe")) return false;
    return (def.guardRaiseElapsed || 0) < PARRY_WIN_MS;
  }

  function landParry(atk, def, dir) {
    // Perfect parry (Combate): 0 dmg, rival stagger 180, arm RIPOSTE_WIN 280,
    // distinct gleam 80. No double-damage — riposte slash still −10 on connect.
    noteConnect();
    if (def && def.kind === "you") noteHintVerb("parry");
    const pt = cutPoint(atk, def);
    // Interrupt attacker into idle + stagger (can't act). Not recovery cancel bait.
    atk.phase = "idle";
    atk.phaseT = 0;
    atk.cutHit = true;
    atk.closing = false;
    atk.reversal = false;
    atk.riposte = false;
    atk.riposteArmed = false;
    atk.riposteWindowT = 0;
    atk.stunT = PARRY_STAGGER_MS;
    // Parry interrupt leftover (v325): fade leftover cut→idle (sheatheFade dies on stun).
    atk.parryFadeT = SHEATHE_MS;
    atk.parryFadeSheet = "slash";
    atk.parryFadeTipK = 0;
    atk.parryFadeTipKy = 0;
    atk.linkGolpe = false;
    atk.linkSlash = false;
    atk.linkBolt = false;
    atk.clashRec = false;
    // Light push on the rival (stagger shove), not defender hold-block push.
    {
      const kbDir = atk.x >= def.x ? 1 : -1;
      atk.pushT = GUARD_PUSH_MS;
      atk.pushVel = (hurtW(atk) * kbDir) / GUARD_PUSH_MS;
    }
    bumpShake(6, dir, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    lastPushblockSfx = "parry";
    playParrySting();
    // Stamina chunk spend leftover (v378): ghost+flash the −20 chip.
    pulseStam(def, def.stamina);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    // Reward path: arm existing riposte window (same RIPOSTE_WIN 280).
    if (def.stamina > 0) {
      def.riposteWindowT = RIPOSTE_WIN_MS;
      def.riposteArmed = false;
    }
    spawnParryGleam(pt.x, pt.y, def);
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    // Guard-break plant grit leftover (v377): skip 1.05 when break owns the boot.
    else spawnPlantDust(def, 1.05);
  }

  function landBlock(atk, def, dir) {
    // Hold-block vs perfect parry (player raise-edge only).
    if (isPerfectParry(atk, def)) {
      landParry(atk, def, dir);
      return;
    }
    noteConnect();
    atk.phase = "recovery";
    atk.phaseT = 0;
    atk.cutHit = true;
    if (atk.kind === "rival") atk.aiSawBlock = true;
    armRivalSlashLink(atk);
    armRivalGolpeLink(atk);
    armRivalBoltLink(atk);
    // Player pushblock connect leftover (v406): tryPushblock before resolveCuts
    // (hold-S tap-away during startup / same-frame) used to arm the 240px shove
    // + óxido/shake-8/pushblock sting, then applyPush + bumpShake(4) + block
    // steel + bloqueo + 1.0 plant clobbered it — spent 25-stam PB read as a
    // normal chip block and lost the scrape. Rival already re-arms via
    // rivalPushblockOnBlock after applyPush. Soft: when shove already owns
    // (|pushVel|·GUARD_PUSH_MS ≈ PUSHBLOCK_PX), keep pushVel, refresh pushT +
    // PUSHBLOCK_SHAKE + óxido steel, skip bloqueo/1.0 plant. Stam chip /
    // HITSTOP_BLOCK / tripGuardBreak unchanged. Rival path unchanged.
    let shoved = false;
    const shoveOwns =
      def.pushT > 0 &&
      Math.abs(def.pushVel) * GUARD_PUSH_MS >= PUSHBLOCK_PX - 0.5;
    if (shoveOwns) {
      shoved = true;
      def.pushT = GUARD_PUSH_MS;
      bumpShake(PUSHBLOCK_SHAKE, awayWalkDir(def), HITSTOP_BLOCK);
    } else {
      applyPush(def, atk);
      bumpShake(4, dir, HITSTOP_BLOCK);
    }
    hitstopLeft = HITSTOP_BLOCK;
    if (!shoveOwns) {
      lastPushblockSfx = "block";
      playSfx(SFX.bloqueo);
    }
    const pt = cutPoint(atk, def);
    // Stamina chunk spend leftover (v378): ghost+flash the −20 chip.
    pulseStam(def, def.stamina);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    // Hold-block does NOT arm RIPOSTE_WIN (Combate v308 — riposte from parry only).
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else if (shoveOwns) spawnSteelFlash(pt.x, pt.y, atk, def, true, "push");
    else spawnSteelFlash(pt.x, pt.y, atk, def);
    // After the block sting so a successful rival shove keeps lastPushblockSfx.
    // tryPushblock overwrites the small block vel with the 240px shove.
    // Pushblock dust leftover: landBlock's 1.0 plant used to stack under the
    // live PUSHBLOCK_FX scrape, so leftover block grit rode the 240px trail.
    // Draw-only. Skip the small plant when shove owns the scrape.
    // Player pushblock connect leftover (v406): shoveOwns already skips 1.0;
    // rival still re-arms after applyPush (|| shoved keeps early player latch).
    if (def === rival) shoved = rivalPushblockOnBlock() || shoved;
    // Guard-break plant grit leftover (v377): skip 1.0 when break owns the boot
    // (tripGuardBreak already planted 1.25). Shove skip unchanged.
    if (!shoved && def.guardBreakT <= 0) spawnPlantDust(def, 1.0);
  }

  function meterFull(f) {
    return !!(f && f.meter >= METER_MAX);
  }

  function gainMeter(f, amt) {
    if (!f || !(amt > 0)) return;
    const was = f.meter || 0;
    f.meter = Math.min(METER_MAX, was + amt);
    // Meter / combo feedback: every gain pulses the pip (meterGainT). Partial
    // fills used to stay quiet — now a brief scale/glow. meterFlashT stays
    // reserved for stock-complete + spend (old partial-quiet lock).
    // Especial quiet-full gain leftover (v425): connects while already full
    // used to re-arm meterGainT over quiet-full breath (mf dead), so the ready
    // pip kept pulsing as a charging tick — muddy vs v392 linger. Soft: skip
    // gain pulse when was already at stock; stock-complete flash + partial
    // fills unchanged.
    if (was < METER_MAX) f.meterGainT = METER_GAIN_MS;
    // Meter fill flash leftover: full brasa pip used to pop on the same tick
    // gainMeter crossed METER_MAX (no meterFlashT; meterFlashK hard-zeroed
    // while full), so the stock landing had no pulse — spend freeze already
    // flashes the spent pip. Arm fill flash; partial fills stay quiet on
    // meterFlashT (gain pulse rides meterGainT instead).
    if (was < METER_MAX && f.meter >= METER_MAX) {
      f.meterFlashT = METER_FLASH_MS;
      f.meterFlashKind = "full";
    }
  }

  function rivalShouldSuper() {
    // After a connect, and only where the dart can actually hit.
    // Fullscreen range dart stays a normal K even with a full bar.
    if (!meterFull(rival)) return false;
    if (!rival.superArmed) return false;
    if (absGap() > SUPER_RANGE) return false;
    return true;
  }

  function boltRecMs(f) {
    return f && f.boltSuper ? BOLT_SUPER_RECOVERY : BOLT_RECOVERY;
  }

  function canStartBolt(f) {
    if (!f) return false;
    if (mode !== "play") return false;
    if (openLeft > 0) return false;
    if (f.falling || f.guarding || f.stunT > 0 || f.guardBreakT > 0) return false;
    if (f.feintT > 0) return false;
    if (f.phase !== "idle") return false;
    if (f.boltPhase) return false;
    // Answer-dart leftover (v438): opposing startup / live dart may be answered
    // so v412 birth clash can fire in play (not harness-only). Own live refuses.
    if (bolt && bolt.kind === f.kind) return false;
    if (f.stamina < BOLT_STAM) return false;
    return true;
  }

  function startBolt(f, spendSuper) {
    if (!canStartBolt(f || player)) return false;
    const u = f || player;
    let wantSuper = false;
    if (meterFull(u)) {
      if (u.kind === "you") wantSuper = spendSuper !== false;
      else wantSuper = spendSuper === true;
    }
    // Stamina chunk spend leftover (v378): ghost+flash the −30.
    pulseStam(u, u.stamina);
    u.stamina -= BOLT_STAM;
    u.stamRegenT = STAMINA_REGEN_DELAY;
    u.boltSuper = wantSuper;
    // Telegraph recovery walk-in pose leftover: capture walk intent before
    // gait zeros (rival closing / you A/D). Arm walkFadeHold for restTeleWalk /
    // restLinkWalk through the knife raise. Draw-only.
    const teleRecWalk = recoveryWalkOut(u);
    u.gait = 0;
    if (teleRecWalk && u.walkFadeHold < 0.02) u.walkFadeHold = 1;
    // Empty-K leftover destRect plant: leftover destRect plant used to dump
    // the same tick this armed (zeroed leftover k, tickGuardPose snapped
    // leftover k), so leftover guard lean/oy hopped off the windup plant.
    // Ease leftover k (boltLeftoverPlanting). Special-cancel / clash-K
    // leftover destRect plant already 0. Golpe leftover k eases leftover destRect plant.
    // Idle sheathe leftover: capture before boltPhase flips (sheatheFade
    // dies with boltPhase). Mashy K after clash/tech sheathe used to dump
    // the blade. Fade leftover sheathe→windup (linkPlantFade). Special-cancel
    // still arms holdCutPlant after this returns.
    const leftoverSheathe = sheatheFade(u);
    u.cutRecBreathT = 0;
    u.boltPhase = "startup";
    u.boltT = 0;
    if (u.kind === "you") noteHintVerb("dart");
    u.clashPlant = false;
    u.holdCutPlant = false;
    u.parryFadeT = 0;
    u.parryFadeSheet = "";
    u.parryFadeTipK = 0;
    u.parryFadeTipKy = 0;
    // Tip under bolt leftover short raise leftover: latch tip raise when
    // leftover k planted so tipPlantK boltT ease holds after gpk dies
    // (boltLeftoverPlanting stays true whole startup; idle K still snaps
    // with no latch; special-cancel still snaps). Draw-only.
    // Tip under tipPlantK+tele leftover stack (v343): also latch tipK so tele tip
    // eases leftover blend→pose (idle-edge base ignored leftover block tip).
    u.leftoverPlantTip = (u.guardPoseK || 0) > 0;
    u.leftoverPlantTipK = u.leftoverPlantTip ? guardRaiseK(u) : 0;
    if (!holdingCutBolt(u) && leftoverSheathe > 0.02) {
      u.linkPlant = true;
      u.linkSheathe = leftoverSheathe;
    } else {
      u.linkPlant = false;
      u.linkSheathe = 0;
    }
    if (wantSuper) {
      u.meter = 0;
      u.superArmed = false;
      u.meterFlashT = METER_FLASH_MS;
      u.meterFlashKind = "spend";
      playSuperSting();
      // Snap of stop + punch, then the 200ms plant continues. Not the whole startup.
      bumpShake(10, u.facing, BOLT_SUPER_STOP);
      hitstopLeft = BOLT_SUPER_STOP;
      if (!holdingCutBolt(u)) playSfx(SFX.knifeThrow, { volume: 0.88 });
    } else {
      lastBoltSfx = "cast";
      // Special-cancel K holdCut juice leftover (v380): plain unpitched cast used to
      // layer under playHoldCutSting's pitched bite — muddy vs idle, weaker than link
      // raise. Skip when holdingCutBolt so the sting owns cast; idle/clash-K keep plain.
      if (!holdingCutBolt(u)) playSfx(SFX.cast);
      // Idle/walk knife plant: throw whoosh. Special-cancel cut-hold already rode tajo whoosh.
      if (!holdingCutBolt(u)) playSfx(SFX.knifeThrow, { volume: 0.88 });
    }
    u.telegraph = !holdingCutBolt(u) && !u.linkPlant;
    const p = castPlantXY(u);
    spawnBrasaFx("cast", p.x, p.y, u.facing, u, wantSuper ? BOLT_SUPER_FX : 1);
    return true;
  }

  function boltBox() {
    if (!bolt) return null;
    return { x: bolt.x, y: bolt.y, w: bolt.w, h: bolt.h };
  }

  function spawnBolt(f) {
    const u = f || player;
    // Dart tip plant leftover: idle/walk K used to birth at bladeBox chest Y
    // while cast puff sat on throw_knife tipY (~40px under you / ~60px over
    // rival). Seat on live castPlantXY (same tip the puff rides). Special-cancel
    // still slash tip / chest fallback via castPlantXY. destRect/AABB planted.
    const plant = castPlantXY(u);
    const tip = plant.x;
    const superOn = !!u.boltSuper;
    // Dart vs dart leftover (v412): second birth used to overwrite the one live
    // opposing dart — silent delete, not a fireball war. Empty could even erase
    // a spent super. Soft: equal → mutual cancel (clash FX, no birth); spent
    // beats empty (eat empty + birth super); empty into spent → no birth (spent
    // keeps flying). One live dart kept. Caller already armed recovery.
    if (bolt && bolt.kind !== u.kind) {
      const liveSuper = !!bolt.super;
      const foe = u === player ? rival : player;
      if (superOn && !liveSuper) {
        // Spent beats empty — clear empty with clash juice, then birth super.
        spawnBrasaFx("clash", bolt.x + bolt.w * 0.5, bolt.y + bolt.h * 0.5, u.facing, foe, 1);
        playBoltClashSting(false);
        noteConnect();
        bolt = null;
      } else if (!superOn && liveSuper) {
        // Empty loses to live spent — no birth; spent keeps flying.
        spawnBrasaFx("clash", tip, plant.y, u.facing, foe, BOLT_SUPER_FX);
        playBoltClashSting(true);
        noteConnect();
        return;
      } else {
        // Equal (empty×empty or super×super) — mutual cancel, no birth.
        const cx = (bolt.x + bolt.w * 0.5 + tip) * 0.5;
        const cy = (bolt.y + bolt.h * 0.5 + plant.y) * 0.5;
        spawnBrasaFx("clash", cx, cy, u.facing, foe, (superOn || liveSuper) ? BOLT_SUPER_FX : 1);
        playBoltClashSting(!!(superOn || liveSuper));
        noteConnect();
        bolt = null;
        return;
      }
    }
    const w = superOn ? BOLT_SUPER_W : BOLT_W;
    const h = superOn ? BOLT_SUPER_H : BOLT_H;
    const y = plant.y - h * 0.5;
    const x = u.facing > 0 ? tip : tip - w;
    const spd = superOn ? BOLT_SUPER_SPEED : BOLT_SPEED;
    bolt = { x: x, y: y, w: w, h: h, vx: u.facing * spd, facing: u.facing, kind: u.kind, super: superOn };
  }

  function advanceBoltFighter(f, dt) {
    if (!f.boltPhase) return;
    if (f.stunT > 0 || f.falling) {
      f.boltPhase = "";
      f.boltT = 0;
      f.boltHoldCut = false;
      f.boltSuper = false;
      f.comboBolt = false;
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
      // Empty-K cast sibling leftover (v370): stun/fall cancel same cast clear.
      if (brasaFxKind === "cast") {
        const home = brasaHomeYou ? player : rival;
        if (home === f) {
          brasaFxT = 0;
          brasaFxKind = "";
        }
      }
      return;
    }
    f.boltT += dt;
    if (f.boltPhase === "startup" && f.boltT >= BOLT_STARTUP) {
      spawnBolt(f);
      f.boltPhase = "recovery";
      f.boltT = 0;
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
      // Keep boltHoldCut through recovery so the cut sheet does not pop idle
      // (idle breath used to seat destRect ~1.5px the same tick the dart left).
    } else if (f.boltPhase === "recovery" && f.boltT >= boltRecMs(f)) {
      const fromCut = f.boltHoldCut;
      // Bolt recovery settle→walk destRect leftover: walk / raise mid-end used to dump
      // breath ~1.1 when boltPhase cleared while plant ease had already seated full amp;
      // arm cutRec and let cut recovery settle→walk max(ck, wk) / hold-under-rise own it.
      // Bolt recovery settle→guard: same arm on guard mid-end so max(ck, rk) / hold-under-
      // raise own it. Idle knife plant still eases with boltPlantFade (no cutRec arm).
      // Special-cancel sheathe path unchanged (fromCut). Feint still feintFade.
      // Bolt recovery settle→walk plant-release destRect leftover: walk / walkFadeHold /
      // recoveryWalkOut / raise mid-end used to dump breath when boltPhase cleared while
      // plant-release had already seated under restBoltWalk; arm cutRec and let cut
      // recovery settle→walk max(ck, wk) / hold-under-rise own it. Idle knife plant still
      // eases with boltPlantFade (no cutRec arm).
      const walkOutEnd = walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02 || f.guarding || f.guardPoseK > 0;
      f.boltPhase = "";
      f.boltT = 0;
      f.boltHoldCut = false;
      f.boltSuper = false;
      f.comboBolt = false;
      f.holdCutPlant = false;
      if (fromCut) f.sheatheT = SHEATHE_MS;
      else if (walkOutEnd) f.cutRecBreathT = GUARD_RAISE_MS;
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

  function boltLandFxScale() {
    return (bolt && bolt.super) ? BOLT_SUPER_FX : 1;
  }

  function landBoltHit(def, atk, dir, pt) {
    if (openLeft > 0) return;
    noteConnect();
    noteCombo(atk, def);
    const before = def.hp;
    const spent = !!(bolt && bolt.super);
    const dmg = spent ? BOLT_SUPER_DMG : SLASH_DMG;
    def.hp = Math.max(0, def.hp - dmg);
    pulseBar(def, before);
    // Especial connect juice leftover (v393): spent −N reads brasa/super, not soft hit-hueso.
    spawnDmgNum(pt.x, pt.y, before - def.hp, false, def, spent ? "super" : "hit");
    gainMeter(atk, METER_HIT);
    if (atk.kind === "rival") atk.superArmed = true;
    // Especial connect juice leftover (v393): spent saturates with riposte; empty stays 10.
    bumpShake(spent ? BOLT_SUPER_HIT_SHAKE : 10, dir, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playBoltHitSting(!!(bolt && bolt.super));
    def.stunT = HITSTUN;
    // Hit interrupt leftover (v336): same mid-cut → idle fade as landHit.
    armHitInterruptFade(def);
    def.phase = "idle";
    def.phaseT = 0;
    def.guarding = false;
    def.closing = def.kind === "rival";
    def.standWait = 0;
    def.standGoal = 0;
    hitFlashT = HIT_FLASH_MS;
    spawnBrasaFx("hit", pt.x, pt.y, atk.facing, def, boltLandFxScale());
    const kbDir = def.x >= atk.x ? 1 : -1;
    def.pushT = KNOCK_MS;
    def.pushVel = (KNOCK_PX * kbDir) / KNOCK_MS;
    // Knock grit leftover walk stamps ↔ punchCover (v348/v349): cull leftover
    // unmarked walk/idle stamps on def + atk so connect grit alone rides the boot.
    dropPlantUnderKnock(atk);
    dropPlantUnderKnock(def);
    spawnPlantDust(def, spent ? BOLT_SUPER_GRIT : 1.15);
    if (def.hp <= 0) koTarget = def;
  }

  function landBoltBlock(def, atk, dir, pt) {
    noteConnect();
    // Player pushblock dart-connect leftover (v407): tryPushblock before
    // resolveBolt used to arm the 240px shove + óxido/shake-8/pushblock sting,
    // then applyPush + bumpShake(4) + brasa block + 1.0 plant clobbered it —
    // spent 25-stam PB vs dart read as a normal chip block and lost the scrape.
    // Same hole landBlock already closed (v406). Soft: when shove already owns
    // (|pushVel|·GUARD_PUSH_MS ≈ PUSHBLOCK_PX), keep pushVel, refresh pushT +
    // PUSHBLOCK_SHAKE + óxido steel, skip bolt-block sting / brasa block / 1.0
    // plant. Chip HP / stam / HITSTOP_BLOCK / tripGuardBreak unchanged. Rival
    // still does not pushblock vs dart.
    let shoved = false;
    const shoveOwns =
      def.pushT > 0 &&
      Math.abs(def.pushVel) * GUARD_PUSH_MS >= PUSHBLOCK_PX - 0.5;
    if (shoveOwns) {
      shoved = true;
      def.pushT = GUARD_PUSH_MS;
      bumpShake(PUSHBLOCK_SHAKE, awayWalkDir(def), HITSTOP_BLOCK);
    } else {
      applyPush(def, atk);
      const spent = !!(bolt && bolt.super);
      // Especial connect juice leftover (v393): spent chip punch between block 4 and pushblock 8.
      bumpShake(spent ? BOLT_SUPER_BLOCK_SHAKE : 4, dir, HITSTOP_BLOCK);
    }
    hitstopLeft = HITSTOP_BLOCK;
    if (!shoveOwns) playBoltBlockSting(!!(bolt && bolt.super));
    const before = def.hp;
    const chip = (bolt && bolt.super) ? BOLT_SUPER_CHIP : BOLT_CHIP;
    def.hp = Math.max(0, def.hp - chip);
    pulseBar(def, before);
    spawnDmgNum(pt.x, pt.y, before - def.hp, true, def);
    gainMeter(atk, METER_BLOCK_SPECIAL);
    if (def.hp <= 0) koTarget = def;
    // Stamina chunk spend leftover (v378): ghost+flash the −20 chip.
    pulseStam(def, def.stamina);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else if (shoveOwns) spawnSteelFlash(pt.x, pt.y, atk, def, true, "push");
    else spawnBrasaFx("block", pt.x, pt.y, atk.facing, def, boltLandFxScale());
    // Player pushblock dart-connect leftover (v407): shoveOwns already skips
    // brasa; skip 1.0 when shove / break owns the boot (mirror landBlock).
    if (!shoved && def.guardBreakT <= 0) spawnPlantDust(def, 1.0);
  }

  function resolveBolt() {
    if (!bolt || openLeft > 0) return;
    const atk = bolt.kind === "rival" ? rival : player;
    const def = atk === player ? rival : player;
    const dir = atk === player ? 1 : -1;
    const box = boltBox();
    const hb = hitbox(def);
    if (hb && overlaps(box, hb)) {
      if (bolt.super) {
        // Spent super beats Space/L steel. Empty dart still clashes for 0.
        const x0 = Math.max(box.x, hb.x);
        const y0 = Math.max(box.y, hb.y);
        const x1 = Math.min(box.x + box.w, hb.x + hb.w);
        const y1 = Math.min(box.y + box.h, hb.y + hb.h);
        landBoltHit(def, atk, dir, { x: (x0 + x1) * 0.5, y: (y0 + y1) * 0.5 });
        bolt = null;
        return;
      }
      spawnBrasaFx("clash", box.x + box.w * 0.5, box.y + box.h * 0.5, atk.facing, def, boltLandFxScale());
      playBoltClashSting(!!(bolt && bolt.super));
      noteConnect();
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

  function spentSuperBeatsCut(atk) {
    // Close-range same-frame Space/L cannot trade-delete a spent super.
    // Empty dart still clashes or loses after cuts. Guard still chips −6.
    if (!bolt || !bolt.super || openLeft > 0) return false;
    if (!atk || atk.falling || atk.phase !== "active") return false;
    if (atk.cut === "throw") return false;
    if (bolt.kind === atk.kind) return false;
    const box = boltBox();
    const steel = hitbox(atk);
    if (steel && overlaps(box, steel)) return true;
    return overlaps(box, bodyAABB(atk));
  }

  function emptyDartClashesCut(atk) {
    // Empty dart vs meaty steel leftover (v414): cuts-first landHit used to
    // snap steel away before resolveBolt — dart survived instead of clash 0.
    if (!bolt || bolt.super || openLeft > 0) return false;
    if (!atk || atk.falling || atk.phase !== "active") return false;
    if (atk.cut === "throw") return false;
    if (bolt.kind === atk.kind) return false;
    const box = boltBox();
    const steel = hitbox(atk);
    return !!(box && steel && overlaps(box, steel));
  }

  function clashEmptyDartVsSteel(atk) {
    if (!emptyDartClashesCut(atk)) return false;
    const box = boltBox();
    const foe = atk === player ? rival : player;
    spawnBrasaFx("clash", box.x + box.w * 0.5, box.y + box.h * 0.5, atk.facing, foe, 1);
    playBoltClashSting(false);
    noteConnect();
    bolt = null;
    return true;
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
    const aInv = reversalInvuln(player);
    const bInv = reversalInvuln(rival);
    // Reversal startup invuln: a meaty slash whiffs instead of trading a clash.
    // Throw still resolves after cuts (reversal loses to throw).
    if (activesOverlap && !aInv && !bInv) {
      const x0 = Math.max(ha.x, hb.x);
      const y0 = Math.max(ha.y, hb.y);
      const x1 = Math.min(ha.x + ha.w, hb.x + hb.w);
      const y1 = Math.min(ha.y + ha.h, hb.y + hb.h);
      doClash((x0 + x1) * 0.5, (y0 + y1) * 0.5);
      return;
    }
    if (aHits && !bInv && !spentSuperBeatsCut(player)) {
      // Empty dart vs meaty steel leftover (v414): clash empty-on-steel before
      // landHit snaps recovery (else resolveBolt never sees steel).
      clashEmptyDartVsSteel(player);
      if (rival.guarding && facingAttacker(rival, player)) landBlock(player, rival, 1);
      else landHit(player, rival, 1);
      return;
    }
    if (bHits && !aInv && !spentSuperBeatsCut(rival)) {
      clashEmptyDartVsSteel(rival);
      if (player.guarding && facingAttacker(player, rival)) landBlock(rival, player, -1);
      else landHit(rival, player, -1);
      return;
    }
    // Mutual throw leftover (v413): both active throws same frame used to
    // resolve player→rival first — P1 always won the grab, never a tech/trade.
    // Soft: same-frame both-active throw in range → landThrowTech (existing
    // throw-break). One-sided throw / active-strike-beats-throw / throwLocked
    // unchanged. THROW_TECH_REC 160 / frames locked.
    const bothThrowActive =
      player.cut === "throw" && player.phase === "active" && !player.cutHit &&
      rival.cut === "throw" && rival.phase === "active" && !rival.cutHit;
    if (
      bothThrowActive &&
      throwInRange() &&
      !player.falling && !rival.falling &&
      player.stunT <= 0 && rival.stunT <= 0 &&
      !throwLocked(player) && !throwLocked(rival)
    ) {
      landThrowTech(player, rival);
      return;
    }
    resolveThrow(player, rival);
    resolveThrow(rival, player);
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
    // CID/ROAN Space HOLD meaty-pad kit leftover (v447): stam-threat pad rides slashLungeOf(f).
    // CID/ROAN L golpe inThreat/stam-threat kit leftover (v449): live golpe pocket rides golpeLungeOf(f).
    let threat = absGap() <= bladeReach(f) + slashLungeOf(f) + slashLungeOf(f);
    {
      const other = f === player ? rival : player;
      if (
        other &&
        (other.phase === "startup" || other.phase === "active") &&
        other.cut === "golpe" &&
        other.boltPhase !== "startup"
      ) {
        const gL = golpeLungeOf(f);
        threat = absGap() <= bladeReach(f) + gL + gL;
      }
    }
    const locked = threat || f.stamThreatLockT > 0;
    if (threat) f.stamThreatLockT = STAMINA_REGEN_LOCK;
    else if (f.stamThreatLockT > 0) f.stamThreatLockT = Math.max(0, f.stamThreatLockT - dt);

    if (raise) {
      // Wakeup→guard walk-in pose leftover: capture walk intent before guarding
      // (recoveryWalkOut gates on guarding; rival AI may clear closing first).
      // Arm walkFadeHold for restWakeGuardWalk. Draw-only.
      const rising = !f.guarding;
      // throwInvuln mid-getup (avoid calling wakeupFade here — draw-only arm).
      const wakeGuardWalk = rising && f.throwInvulnT > 0 && f.thrownT <= 0 && f.phase === "idle" && !f.boltPhase && f.hp > 0 && !f.falling && (recoveryWalkOut(f) || f.walkT > 0 || f.gait !== 0 || f.walkFadeHold > 0.02);
      f.guarding = true;
      // Parry clock: rising edge resets; hold accumulates. Combate PARRY_WIN 140.
      if (rising) f.guardRaiseElapsed = 0;
      else f.guardRaiseElapsed = (f.guardRaiseElapsed || 0) + dt;
      f.phase = "idle";
      f.phaseT = 0;
      f.stamina = Math.max(0, f.stamina - STAMINA_DRAIN * (dt / 1000));
      f.stamRegenT = STAMINA_REGEN_DELAY;
      if (wakeGuardWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
      if (f.stamina <= 0) tripGuardBreak(f);
    } else {
      if (f.phase === "idle" || f.guarding) f.guarding = false;
      f.guardRaiseElapsed = 0;
      f.stamRegenT = Math.max(0, f.stamRegenT - dt);
      if (f.stamRegenT <= 0) {
        const regen = locked ? STAMINA_REGEN_THREAT : STAMINA_REGEN;
        f.stamina = Math.min(STAMINA_MAX, f.stamina + regen * (dt / 1000));
      }
    }
    tickGuardPose(f, dt);
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
    // KO caida audio sync leftover: caida waits for koLanded (land grit +
    // punch). Soft crumple grit still plants here. Juice-only.
    koLanded = false;
    lastKoSfx = "";
    spawnPlantDust(koTarget, 1.6);
    bolt = null;
  }

  function update(dt) {
    // Yard switch pop leftover: Escenarios crossfade drains even on the
    // title sub-pages (early return) and is not a combat clock.
    if (yardSwitchT > 0) yardSwitchT = Math.max(0, yardSwitchT - dt);
    // Title music pop leftover: bed crossfade drains on title / falling / over
    // (not a combat clock).
    tickMusicFade(dt);
    // Stick/pad release linger leftover: pad juice clocks drain on title too
    // (not combat). Knob ease + tap .held linger are visual-only.
    tickStickKnobEase(dt);
    tickPadTapLinger(dt);
    // Hold juice clocks through freeze. hitFlashT (120) used to die
    // inside HITSTOP_HIT (140); steel asterisk (60) died with HITSTOP_BLOCK.
    // Sparks already held. Grit specks + HUD bar-drain used to keep
    // flying while bodies were frozen. Camera punch used to share the
    // hitstop clock and fade to 0 before knock; settle dip same.
    // Fade after time resumes.
    updateTick++;
    if (hitstopLeft <= 0) {
      if (shake > 0) shake = Math.max(0, shake - dt);
      // Hit flash vs knock resume leftover: linear hitFlashT used to start
      // draining the tick freeze ended while punchCover still held full, so
      // white died on its own clock — not with cover. Hold the armed clock
      // through the live punch; clear when cover dies. No-punch fallback
      // still linear. Freeze already held the clock.
      if (hitFlashT > 0) {
        if (shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (shakeDur > 0) {
          // Cover just died (shake hit 0 this tick or earlier) — die with it.
          hitFlashT = 0;
        } else {
          hitFlashT = Math.max(0, hitFlashT - dt);
        }
      }
      // Steel / parry gleam / clash spark clocks ↔ punchCover (v332): linear
      // steelFlashT / parryGleamT / clashSparkT used to start draining the tick
      // freeze ended while punchCover still held full, so short T (60/80/110)
      // could zero mid-cover even though draw-K peaked (v323/v326/v328). Hold
      // armed clocks through the live punch; clear when cover dies (same as
      // hitSparkT / hudFlashT). No-punch fallback still linear. Freeze already held.
      if (steelFlashT > 0) {
        if (shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (shakeDur > 0) {
          // Cover just died — die with it.
          steelFlashT = 0;
        } else {
          steelFlashT = Math.max(0, steelFlashT - dt);
        }
      }
      if (parryGleamT > 0) {
        if (shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (shakeDur > 0) {
          // Cover just died — die with it.
          parryGleamT = 0;
        } else {
          parryGleamT = Math.max(0, parryGleamT - dt);
        }
      }
      if (player.parryFadeT > 0) player.parryFadeT = Math.max(0, player.parryFadeT - dt);
      if (rival.parryFadeT > 0) rival.parryFadeT = Math.max(0, rival.parryFadeT - dt);
      // hurtFadeT drains in tickHurtFade (arms cutRec on plant-release clear).
      if (clashSparkT > 0) {
        if (shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (shakeDur > 0) {
          // Cover just died — die with it.
          clashSparkT = 0;
        } else {
          clashSparkT = Math.max(0, clashSparkT - dt);
        }
      }
      // Flesh hit spark ↔ punchCover (v329): linear hitSparkT used to start
      // draining the tick freeze ended while punchCover still held full, so
      // shards died on their own clock — not with cover (HIT_SPARK_MS 100 <
      // leftover slam). Hold the armed clock through the live punch; clear
      // when cover dies. No-punch fallback still linear. Freeze already held.
      if (hitSparkT > 0) {
        if (shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (shakeDur > 0) {
          // Cover just died — die with it.
          hitSparkT = 0;
        } else {
          hitSparkT = Math.max(0, hitSparkT - dt);
        }
      }
      // Dart ember (brasaFxKind hit) ↔ punchCover (v329) + short grab fleck (v333)
      // + cast plant puff (v350) + block|clash flecks (v351): same hold+clear for flesh
      // ember, grab clinch puff (GRAB_FX_MS 90), spent-super cast (BOLT_CAST_FX_MS 220
      // after BOLT_SUPER_STOP), bolt block (STEEL_FLASH_MS 60), and empty-dart clash
      // (CLASH_SPARK_MS 110). Feint / reversal / wakeup never arm shake — stay linear.
      // Empty cast no shake — linear. BRASA_HIT_MS 140 keeps longer no-punch life than
      // HIT_SPARK_MS 100.
      // Spent-super cast plant leftover (v368): cast holds through live punch then
      // resumes linear on cover die (does not zero) so plant+birth still read.
      if (brasaFxT > 0) {
        const brasaCoverHold = brasaFxKind === "hit" || brasaFxKind === "grab" || brasaFxKind === "cast" || brasaFxKind === "block" || brasaFxKind === "clash";
        if (brasaCoverHold && shake > 0 && shakeDur > 0) {
          /* hold through live cover */
        } else if (brasaCoverHold && shakeDur > 0) {
          // Cover just died. Hit/grab/block/clash die with it.
          // Spent-super cast plant leftover (v368): cast spans the plant — resume
          // linear drain of remaining BOLT_CAST_FX_MS so birth still reads (empty K
          // linear already rides through birth; v350 clear killed spend cast early).
          if (brasaFxKind === "cast") brasaFxT = Math.max(0, brasaFxT - dt);
          else brasaFxT = 0;
        } else {
          brasaFxT = Math.max(0, brasaFxT - dt);
        }
      }
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
        // Stamps ride destRect.pivX (syncPlantDust). vx used to slide
        // them off the boot while shove/knock/walk left empty stones.
        if (p.t >= p.life) plantDust.splice(i, 1);
      }
      tickDmgNums(dt);
    }
    syncPlantDust();
    syncClashSpark();
    syncHitSpark();
    syncDmgNums();
    syncSteelFlash();
    syncParryGleam();
    syncBrasaFx();
    if (hitstopLeft <= 0 && settleT > 0) settleT = Math.max(0, settleT - dt);
    if (hitstopLeft <= 0) tickHint(dt);

    pollGamepadPlay();
    if (mode === "title") {
      modeT += dt;
      if (padMsgT > 0) padMsgT = Math.max(0, padMsgT - dt);
      if (titlePage !== "root") {
        attackEdge = false;
        golpeEdge = false;
        boltEdge = false;
        throwEdge = false;
        reversalEdge = false;
        feintEdge = false;
        requestStart = false;
        requestRestart = false;
        return;
      }
      if (attackEdge || throwEdge || requestStart || requestRestart) {
        // Start is not a tajo. Title Space used to arm slashBuf and fire
        // at openLeft=0 from spawn (gap ~640) — a guaranteed air slash
        // then recovery while the rival walked in. Opening Spaces still
        // buffer and fire when openLeft hits 0.
        // Menu: JUGAR (default) is that same requestStart. CONTROLES is a page.
        resetRound();
      }
      attackEdge = false;
      golpeEdge = false;
      boltEdge = false;
      throwEdge = false;
      reversalEdge = false;
      feintEdge = false;
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
      if (attackEdge || throwEdge || requestStart) resetRound();
      attackEdge = false;
      golpeEdge = false;
      boltEdge = false;
      throwEdge = false;
      reversalEdge = false;
      feintEdge = false;
      requestStart = false;
      return;
    }
    if (hitstopLeft > 0) {
      hitstopLeft -= dt;
      // Riposte WIN includes block hitstop — clock + spend still run under freeze.
      tickRiposte(player, dt);
      tickRiposte(rival, dt);
      trySpendRiposteInput();
      syncRipostePad();
      if (attackEdge) { slashBuf = true; golpeBuf = false; boltBuf = false; throwBuf = false; }
      if (golpeEdge) {
        if (player.thrownT > 0) { /* still down — wakeup L is not a mash from knockdown */ }
        else { golpeBuf = true; slashBuf = false; boltBuf = false; throwBuf = false; }
      }
      if (boltEdge) { boltBuf = true; slashBuf = false; golpeBuf = false; throwBuf = false; }
      if (throwEdge) { throwBuf = true; slashBuf = false; golpeBuf = false; boltBuf = false; reversalBuf = false; }
      if (reversalEdge) { reversalBuf = true; slashBuf = false; golpeBuf = false; boltBuf = false; throwBuf = false; }
      attackEdge = false;
      golpeEdge = false;
      boltEdge = false;
      throwEdge = false;
      reversalEdge = false;
      feintEdge = false;
      const wantAhs = actionHeld("left");
      const wantDhs = actionHeld("right");
      if (player.guarding) {
        if (wantAhs && !walkHeldA) pushblockBuf = -1;
        if (wantDhs && !walkHeldD) pushblockBuf = 1;
      }
      if (wantAhs && !walkHeldA) lastWalkCode = "KeyA";
      if (wantDhs && !walkHeldD) lastWalkCode = "KeyD";
      walkHeldA = wantAhs;
      walkHeldD = wantDhs;
      keepApart();
      clampFighter(player);
      clampFighter(rival);
      syncPlantDust();
      syncDmgNums();
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
        // Juice-only. KO caida audio sync leftover: caída used to fire at
        // beginFall (fallT=0) while land grit 2.4 + punch armed here silent —
        // sting led the stone plant by ~520ms. Arm with the land beat.
        playSfx(SFX.ko);
        lastKoSfx = "caida";
        spawnPlantDust(koTarget, 2.4);
        // KO land grit (v323): bumpShake keeps camera shake; punchCover
        // skips overscan once koLanded (no orphan yard / no HIT_FLASH).
        bumpShake(5, koTarget.kind === "you" ? -1 : 1, 140);
      }
      if (koTarget.fallT >= FALL_MS) {
        mode = "over";
        modeT = 0;
        overTipI = (overTipI + 1) % overTips().length;
        syncMusic(true);
      }
      finishWinnerCut(dt);
      attackEdge = false;
      golpeEdge = false;
      boltEdge = false;
      throwEdge = false;
      reversalEdge = false;
      feintEdge = false;
      return;
    }

    modeT += dt;
    const wasOpen = openLeft > 0;
    if (openLeft > 0) openLeft = Math.max(0, openLeft - dt);
    if (wasOpen && openLeft <= 0) stampNow(1.15);

    tickStun(player, dt);
    tickStun(rival, dt);
    // Drain hurtFade before throw-state arm so getup SHEATHE_MS seats full this frame
    // (same-frame drain after arm used to land ~123 instead of 140 — v335 live lock).
    tickHurtFade(player, dt);
    tickHurtFade(rival, dt);
    tickThrowState(player, dt);
    tickThrowState(rival, dt);
    tickSheathe(player, dt);
    tickSheathe(rival, dt);
    tickFeint(player, dt);
    tickFeint(rival, dt);
    tickRiposte(player, dt);
    tickRiposte(rival, dt);
    updateGuard(player, dt, wantGuard(player));
    tickCutRecBreath(player, dt);
    if (player.falling || player.guarding) { slashBuf = false; golpeBuf = false; boltBuf = false; openBuf = false; openBoltBuf = false; }
    if (player.thrownT > 0) { golpeBuf = false; reversalBuf = false; }
    if (feintEdge || (throwEdge && canFeint(player))) {
      // Slash startup: S is feint, not throw. Idle Space+S still throws.
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      openBuf = false;
      openBoltBuf = false;
      throwBuf = false;
      attackEdge = false;
      if (openLeft > 0) { /* opening feint refused */ }
      else startFeint(player);
      throwEdge = false;
    }
    feintEdge = false;
    if (throwEdge) {
      // Space+S chord. Not a 6th button. Not a cancel door.
      // L+S is reversal — do not steal that chord.
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      openBuf = false;
      openBoltBuf = false;
      attackEdge = false;
      golpeEdge = false;
      reversalBuf = false;
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
        player.guardBreakT > 0 ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      if (openLeft > 0) { /* opening throw refused */ }
      else if (tryThrowTech(player)) throwBuf = false;
      else if (locked) throwBuf = true;
      else startThrow(player);
    }
    throwEdge = false;
    if (reversalEdge) {
      // Hold S, tap L. Not Space (Space+S is throw). Same L frames.
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      throwBuf = false;
      openBuf = false;
      openBoltBuf = false;
      attackEdge = false;
      golpeEdge = false;
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
        player.guardBreakT > 0 ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      if (openLeft > 0) { /* opening reversal refused */ }
      else if (player.guarding) startReversal(player);
      else if (locked) reversalBuf = true;
    }
    reversalEdge = false;
    // Riposte spend: Space/L in window (not throw chord, not L+S reversal).
    trySpendRiposteInput();
    if (attackEdge) {
      // Buffer any locked frame (full recovery, not only the last 80ms).
      // Early-recovery Space used to vanish because startAttack requires idle.
      // Golpe recovery has one reverse door: last 100ms after hit/block
      // cancels into tajo instead of waiting for idle.
      // Clash recovery has that same late Space door (not a free mash).
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
        player.guardBreakT > 0 ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      // Clash-K cancel priority leftover (v382) + hit-confirm special-cancel K (v383):
      // yield to dart when cut→K door live + K armed (clash late or connected late).
      const yieldClashK = playerClashBoltPriority();
      const yieldHitK = playerHitConfirmBoltPriority();
      const yieldBoltK = yieldClashK || yieldHitK;
      golpeBuf = false;
      if (!yieldBoltK) boltBuf = false;
      if (openLeft > 0) { openBuf = true; openBoltBuf = false; }
      else if (yieldBoltK) slashBuf = false;
      else if (golpeToSlashWindow(player) && cancelIntoSlash(player)) slashBuf = false;
      else if (locked) slashBuf = true;
      else startAttack(player);
    }
    attackEdge = false;
    if (golpeEdge) {
      // Buffer any locked frame. Tajo recovery has one door: last 100ms
      // after hit/block cancels into golpe instead of waiting for idle.
      // Clash recovery has that same late L door (not a free mash).
      // Wakeup: tap L after knockdown (throwInvuln window) is reversal, no S.
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
        player.guardBreakT > 0 ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      // Clash-K cancel priority leftover (v382) + hit-confirm special-cancel K (v383):
      // yield to dart when cut→K door live + K armed (clash late or connected late).
      const yieldClashK = playerClashBoltPriority();
      const yieldHitK = playerHitConfirmBoltPriority();
      const yieldBoltK = yieldClashK || yieldHitK;
      slashBuf = false;
      openBuf = false;
      openBoltBuf = false;
      if (!yieldBoltK) boltBuf = false;
      if (openLeft > 0) golpeBuf = true;
      else if (yieldBoltK) golpeBuf = false;
      else if (slashToGolpeWindow(player) && cancelIntoGolpe(player)) golpeBuf = false;
      else if (player.thrownT > 0) { /* still down — too early, not a wakeup mash */ }
      else if (wakeupWindow(player) && startWakeReversal(player)) golpeBuf = false;
      else if (player.guarding) startReversal(player);
      else if (locked) golpeBuf = true;
      else startAttack(player, "golpe");
    }
    golpeEdge = false;
    if (boltEdge) {
      // Buffer any locked frame. Tajo/golpe recovery has one special door:
      // last 100ms after hit/block cancels into K instead of waiting for idle.
      // Clash recovery has that same late K door (not a free fireball).
      // Space/L share that late clash door.
      slashBuf = false;
      golpeBuf = false;
      openBuf = false;
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
        player.guardBreakT > 0 ||
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      // Opening K open-mix leftover (v426): mirror Space openBuf / L golpeBuf —
      // hold through OPENING_MS, fire on walk-in. Still refused mid-measure.
      if (openLeft > 0) openBoltBuf = true;
      else if (cutToBoltWindow(player) && cancelIntoBolt(player)) boltBuf = false;
      else if (locked) boltBuf = true;
      else startBolt(player);
    }
    boltEdge = false;

    const wantA = actionHeld("left");
    const wantD = actionHeld("right");
    if (wantA && !walkHeldA) lastWalkCode = "KeyA";
    if (wantD && !walkHeldD) lastWalkCode = "KeyD";
    let tapWalk = 0;
    if (wantA && !walkHeldA) tapWalk = -1;
    if (wantD && !walkHeldD) tapWalk = 1;
    if (tapWalk) {
      tryPushblock(player, tapWalk);
      pushblockBuf = 0;
    } else if (pushblockBuf) {
      tryPushblock(player, pushblockBuf);
      pushblockBuf = 0;
    }
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
    let step = move * walkSpeed(player) * walkCadence(player) * (dt / 1000);
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
    syncPlantDust();
    syncClashSpark();
    syncHitSpark();
    syncDmgNums();
    syncSteelFlash();

    player.facing = 1;
    rival.facing = -1;
    dressFighter(player);
    dressRival(rival);
    tickAI(dt);
    tickVersusP2(dt);
    updateGuard(rival, dt, !!rival.wantBlock);
    tickCutRecBreath(rival, dt);
    advanceAttack(player, dt);
    advanceAttack(rival, dt);
    // Versus local 2P (v430): human cancel doors in tickVersusP2; skip AI auto-link.
    if (matchKind !== "versus") {
      rivalTrySlashGolpe();
      rivalTryGolpeSlash();
      rivalTryCutBolt();
    }
    advanceBolt(dt);
    tickBolt(dt);
    // Spark origin leftover: castPlantXY blend follows boltT / clashPlant /
    // linkPlant. Mid-frame cancel + bolt advance used to leave brasaX on the
    // spawn tip until draw. Ride live origin after bolt clocks move.
    syncBrasaFx();
    syncRipostePad();
    if (openBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0 && player.guardBreakT <= 0) {
      // Idle sheet pad is not the sword. Measure with slash tip.
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + slashLungeOf(player);
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        openBuf = false;
        openBoltBuf = false;
        startAttack(player);
      }
    }
    // Opening K open-mix leftover (v426): openBoltBuf mirrors openBuf — persist
    // out of range for walk-in; canStartBolt refuse clears (no forever-hold on
    // empty stam). Mid-combat boltBuf else-clear unchanged.
    if (openBoltBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0 && player.guardBreakT <= 0 && !player.boltPhase) {
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + slashLungeOf(player);
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        if (canStartBolt(player)) {
          openBoltBuf = false;
          openBuf = false;
          slashBuf = false;
          golpeBuf = false;
          boltBuf = false;
          startBolt(player);
        } else {
          openBoltBuf = false;
        }
      }
    }
    // Clash-K cancel priority leftover (v382) + hit-confirm special-cancel K (v383):
    // buffered Space yields to boltBuf when cut→K door live (clash late or connected late).
    if (slashBuf && openLeft <= 0 && golpeToSlashWindow(player) && !player.guarding && player.stunT <= 0 && !player.falling && !(boltBuf && cutToBoltWindow(player))) {
      slashBuf = false;
      golpeBuf = false;
      cancelIntoSlash(player);
    }
    // Riposte armed from window press — fire as faster slash when idle/unguarded.
    tryFireRiposte();
    // Dart-recovery Space/L buffer fairness leftover (v405): hold-gate used to
    // clear slashBuf + startAttack while boltPhase still owned the body (phase
    // idle through dart) — startAttack no-ops, buffered meaty tajo eaten.
    // Mirror throwBuf !boltPhase; edge on free frame unchanged.
    // Guard-break action lock leftover (v409): hold-gate used to fire Space
    // while guardBreakT still owned the free window (startAttack armed) — mash
    // stole the v399 punish. Mirror feintT <= 0 hold.
    if (slashBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0 && player.guardBreakT <= 0 && !player.boltPhase) {
      // Same hold gate as openBuf. Immediate fire after a landed cut sat
      // ~10px short (knock 80 − lunge 36) — whoosh + slash in empty air.
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + slashLungeOf(player);
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        slashBuf = false;
        golpeBuf = false;
        openBoltBuf = false;
        startAttack(player);
      }
    }
    // Clash-K cancel priority leftover (v382) + hit-confirm special-cancel K (v383):
    // buffered L yields to boltBuf when cut→K door live (clash late or connected late).
    if (golpeBuf && openLeft <= 0 && slashToGolpeWindow(player) && !player.guarding && player.stunT <= 0 && !player.falling && !(boltBuf && cutToBoltWindow(player))) {
      golpeBuf = false;
      slashBuf = false;
      cancelIntoGolpe(player);
    }
    // Dart-recovery Space/L buffer fairness leftover (v405): same !boltPhase gate
    // for golpeBuf idle hold-flush (startAttack no-op ate buffered meaty L).
    // Guard-break action lock leftover (v409): same guardBreakT <= 0 hold for
    // golpeBuf idle flush (mirror feintT).
    if (golpeBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0 && player.guardBreakT <= 0 && !player.boltPhase) {
      if (player.thrownT > 0) {
        golpeBuf = false;
      } else if (wakeupWindow(player) && startWakeReversal(player)) {
        golpeBuf = false;
        slashBuf = false;
      } else {
        const ph = player.phase;
        player.phase = "active";
        const hold = bladeReach(player) + golpeLungeOf(player);
        player.phase = ph;
        if (bodyGap() <= hold + 2) {
          golpeBuf = false;
          slashBuf = false;
          openBoltBuf = false;
          startAttack(player, "golpe");
        }
      }
    }
    if (boltBuf && openLeft <= 0 && cutToBoltWindow(player) && !player.guarding && player.stunT <= 0 && !player.falling) {
      boltBuf = false;
      slashBuf = false;
      golpeBuf = false;
      cancelIntoBolt(player);
    }
    // Throw-recovery K buffer fairness leftover (v403): boltBuf used to hard-clear
    // at idle while slashBuf/golpeBuf idle-flushed in hold range — throw recovery
    // (no cut→K door) ate a buffered meaty dart. Mirror Space/L hold-gate; out of
    // range still clears (whiff-fullscreen not a free dart).
    // Hitstun K buffer fairness leftover (v404): else-if hard-clear used to eat
    // boltBuf while stunT > 0 (phase stays idle through flesh) — Space/L wait.
    // Skip else-clear through stun; hold-gate owns the free frame.
    // Guard-break action lock leftover (v409): hold through guardBreakT so
    // canStartBolt refuse does not else-clear a meaty K (mirror feintT / stun).
    // Dart-recovery K buffer fairness leftover (v419): else-if hard-clear used to
    // eat boltBuf while boltPhase still owned the body (phase idle through dart)
    // — Space/L already wait (v405). Skip else-clear through boltPhase; hold-gate
    // owns the free frame.
    if (boltBuf && openLeft <= 0 && player.phase === "idle" && player.feintT <= 0 && player.guardBreakT <= 0 && !player.guarding && player.stunT <= 0 && !player.falling && !player.boltPhase) {
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + slashLungeOf(player);
      player.phase = ph;
      if (bodyGap() <= hold + 2 && canStartBolt(player)) {
        boltBuf = false;
        slashBuf = false;
        golpeBuf = false;
        openBoltBuf = false;
        startBolt(player);
      } else {
        boltBuf = false;
      }
    } else if (boltBuf && player.phase === "idle" && player.feintT <= 0 && player.guardBreakT <= 0 && player.stunT <= 0 && !player.boltPhase) {
      boltBuf = false;
    }
    // Tick-throw buffer fairness leftover (v408): throwBuf used to clear then
    // startThrow no-op while foe still throwLocked (stun/KD/wakeup invuln) —
    // tick throw / meaty grab on free frame eaten. Hold while locked; tech still
    // spends; unlocked still startThrow (whiff-fullscreen unchanged).
    // Guard-break action lock leftover (v409): hold throwBuf through guardBreakT
    // (mirror feintT) so mash grab does not arm during the free window.
    if (throwBuf && openLeft <= 0 && (player.phase === "idle" || player.guarding) && player.stunT <= 0 && !player.falling && !player.boltPhase && player.feintT <= 0 && player.guardBreakT <= 0) {
      if (tryThrowTech(player)) {
        throwBuf = false;
        slashBuf = false;
        golpeBuf = false;
        boltBuf = false;
        reversalBuf = false;
      } else if (throwLocked(throwFoe(player))) {
        /* hold — foe stun / KD / wakeup invuln; free-frame flush owns the grab */
      } else {
        throwBuf = false;
        slashBuf = false;
        golpeBuf = false;
        boltBuf = false;
        reversalBuf = false;
        startThrow(player);
      }
    }
    if (reversalBuf && openLeft <= 0 && player.guarding && player.stunT <= 0 && !player.falling && !player.boltPhase && player.feintT <= 0) {
      reversalBuf = false;
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      throwBuf = false;
      startReversal(player);
    }
    tickGait(player, dt);
    tickGait(rival, dt);
    keepApart(dt);
    clampFighter(player);
    clampFighter(rival);
    resolveCuts();
    resolveBolt();
    // Lunge plant scrape ↔ knock cull leftover (v359): scrape only if grit survived resolve.
    flushLungePlantScrape(player);
    flushLungePlantScrape(rival);
    syncPlantDust();
    syncDmgNums();
    // Spark origin leftover: keepApart / resolve may nudge destRect after the
    // mid-frame cast sync. Re-seat brasa on final live castPlantXY.
    syncBrasaFx();
  }

  function punchCover() {
    // Draw-only. Camera punch leftover: overscan used to track |ox|,
    // so the yard zoomed as the slam squared out. Hold PUNCH_PX cover
    // while the punch is live. Punch is a slide, not a zoom. Rest ox=0
    // still flush. destRect/AABB planted. Envelope still squares.
    // Camera punch end leftover: leftover PUNCH_PX overscan used to dump
    // the tick shake hit 0, so the yard scaled ~17px while ox was already
    // ~0 — a zoom hop, not a settle. Hold full cover through the live slam
    // (no mid-punch zoom); ease cover out over the last quarter of the
    // slam envelope. Rest still flush.
    // KO land grit (v323): caida bumpShake re-armed cover after kill flash
    // died — yard punched with no white. Keep camera shake + land grit;
    // skip overscan punch once land fired. Early-fall kill cover still arms
    // (koLanded false). destRect/AABB planted.
    // Camera punch end cover settle leftover (v358): last-quarter target still
    // dumped ~8–9px in one frame while ox ~0. Keep k>0.25 full + smoothstep
    // target; rate-limit coverShown toward that target once per update tick.
    if (mode === "title") return 0;
    if (mode === "falling" && koLanded) {
      coverShown = 0;
      return 0;
    }
    if (shake <= 0 || shakeDur <= 0) {
      coverShown = 0;
      return 0;
    }
    const k = Math.min(1, shake / shakeDur);
    // Full cover while the slide still reads. Last quarter eases to flush.
    if (k > 0.25) coverShown = PUNCH_PX;
    if (k > 0.25) return PUNCH_PX;
    const u = k / 0.25;
    const raw = PUNCH_PX * u * u * (3 - 2 * u);
    // Rate-limit toward last-quarter target once per update tick so a one-/two-
    // frame ease zone cannot dump ~8–9px while ox is already ~0.
    // shake→0 still hard-flushes (cover clocks / v211 rest flush).
    if (coverTick !== updateTick) {
      coverTick = updateTick;
      const maxStep = PUNCH_PX * (STEP / (GUARD_RAISE_MS * 0.75));
      if (coverShown > raw) coverShown = Math.max(raw, coverShown - maxStep);
      else coverShown = raw;
    }
    return coverShown;
  }

  function drawYardCrop(img, padX) {
    if (!img || !img.naturalWidth) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const sc = Math.max((W + padX * 2) / iw, H / ih);
    ctx.drawImage(img, (W - iw * sc) / 2, H - ih * sc, iw * sc, ih * sc);
  }

  function drawCourtyard(ox) {
    // Horizontal punch only. Vertical would uncover the bottom-aligned floor
    // (0px under-scan). Rest ox=0 keeps the old flush cover crop.
    // Camera punch leftover: overscan used to track |ox| (ceil(|ox|+0.5)),
    // so the yard zoomed as the slam squared out. Hold PUNCH_PX cover
    // while punchCover is live; ease cover out over the last quarter so
    // rest does not dump yard scale. ox still slides the camera.
    const padX = punchCover();
    // Yard switch pop leftover: Escenarios used to hard-cut ART[yardN] the
    // same tick setYardIndex armed, so the patio popped under the menu —
    // a cut, not a settle. Crossfade prev→next over YARD_SWITCH_MS.
    // Same-yard confirm stays quiet. Boot / rematch stay on the chosen
    // yard (no fade). Punch cover still rides the live crop.
    // destRect/AABB planted. No new combat verb.
    // Yard lazy-load: arm live (+ prev during crossfade) so draw never
    // races an un-sourced sheet after Escenarios / rematch rotate.
    ensureYardIndex(yardIndex);
    if (yardSwitchT > 0 && yardPrevIndex >= 0) ensureYardIndex(yardPrevIndex);
    const k = yardSwitchK();
    if (yardSwitchT > 0 && yardPrevIndex >= 0 && k < 1) {
      const prevKey = YARD_KEYS[yardPrevIndex] || "yard";
      const prevImg = ART[prevKey] || ART.yard;
      const nextKey = YARD_KEYS[yardIndex] || "yard";
      const nextImg = ART[nextKey] || ART.yard;
      drawYardCrop(prevImg, padX);
      if (k > 0 && nextImg && nextImg.naturalWidth) {
        ctx.save();
        ctx.globalAlpha = k;
        drawYardCrop(nextImg, padX);
        ctx.restore();
      }
      return;
    }
    const key = YARD_KEYS[yardIndex] || "yard";
    const img = ART[key] || ART.yard;
    drawYardCrop(img, padX);
  }

  function slashBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
  }

  function walkBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
  }

  function hurtBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
  }

  function windupBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
  }

  function throwKnifeBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
  }

  function blockBitmap(f) {
    const cid = fighterUsesCidArt(f);
    const right = f.facing > 0;
    return !cid ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
  }

  function telegraphing(f) {
    if (!f || !f.telegraph) return false;
    if (f.falling || f.stunT > 0 || f.guarding) return false;
    if (holdingCutBolt(f)) return false;
    if (f.boltPhase === "startup") return true;
    if (f.phase === "startup") return true;
    return false;
  }

  function telegraphFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on startup.
    // Rival slash/golpe/throw/K used to pop idle→windup the same tick
    // startAttack/startThrow/startBolt, so the 180ms read was a sheet cut,
    // not a raise. Fade idle→windup over GUARD_RAISE_MS (same weight as
    // guarda). destRect leftover breath eases with that k so the plant
    // does not hop ~1.6. AABB planted. Cancel/reversal/special-cancel
    // still snap (no leftover telegraph flag).
    // Telegraph walk-in pose leftover: drawKnight rests leftover walk under
    // telePlant when walkFadeHold (A/D mid-stride into Space/L/throw/K; rival
    // same). tickGait keeps that hold through this raise. This fade unchanged.
    // Telegraph recovery walk-in pose leftover: drawKnight also rests leftover walk
    // under telePlant when recoveryWalkOut (A/D / rival closing through recovery into
    // a buffered raise). This fade unchanged.
    // Super spend freeze leftover: leftover idle overlay used to sit
    // through the 60ms freeze (boltT frozen at the first raise tick),
    // so the punch was leftover idle while the cast puff sat on the
    // windup tip. Count freeze as raise time (draw-only). After freeze
    // keep that elapsed raise so leftover idle does not pop back.
    // Empty K still eases leftover idle→windup over GUARD_RAISE_MS.
    // poseBitmap still windup immediately. destRect leftover breath
    // eases with this k. Cast puff still rides castPlantXY. AABB planted.
    // Extra destRect rot stays 0. Pip leftover still holds through freeze.
    if (!telegraphing(f)) return 0;
    let t = f.boltPhase === "startup" ? f.boltT : f.phaseT;
    if (f.boltSuper && f.boltPhase === "startup") {
      t += BOLT_SUPER_STOP - Math.max(0, hitstopLeft);
    }
    if (GUARD_RAISE_MS <= 0) return 1;
    const u = Math.max(0, Math.min(1, t / GUARD_RAISE_MS));
    return u * u * (3 - 2 * u);
  }

  function boltPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once bolt recovery starts.
    // Idle/walk K used to pop windup→idle the tick the dart left
    // the tip. Special-cancel keeps the cut sheet (boltHoldCut).
    // destRect leftover breath used to dump ~1.6 that same tick
    // (telegraphFade died). Ease leftover breath with this k.
    if (!f || holdingCutBolt(f)) return 0;
    if (f.falling || f.stunT > 0 || f.guarding) return 0;
    if (f.boltPhase !== "recovery") return 0;
    const rec = boltRecMs(f);
    if (rec <= 0) return 0;
    const u = Math.max(0, Math.min(1, f.boltT / rec));
    return 1 - u * u * (3 - 2 * u);
  }

  function throwPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still holds windup while planted.
    // Throw recovery used to pop windup→idle the same tick recovery ended
    // (wasThrow skips sheatheT), so leftover grab pose dumped — a snap,
    // not a release. Fade leftover windup→idle over that recovery
    // (draw-only). destRect leftover breath eases. Tech same path.
    // Clash/slash still sheathe from slash. AABB planted.
    if (!f) return 0;
    if (f.falling || f.stunT > 0 || f.guarding) return 0;
    if (f.cut !== "throw") return 0;
    if (f.phase !== "recovery") return 0;
    if (f.boltPhase) return 0;
    const rec = cutRecovery(f);
    if (rec <= 0) return 0;
    const u = Math.max(0, Math.min(1, f.phaseT / rec));
    return 1 - u * u * (3 - 2 * u);
  }

  function feintFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once feintT is set
    // (block once guarding mid-pull).
    // Feint used to pop windup→slash the same tick startFeint armed
    // sheatheT (sheathing() holds the cut), so the pull flashed full
    // extension then sheathed — a cut, not a cancel. Fade leftover
    // windup→idle over FEINT_RECOVERY. destRect leftover breath eases.
    // Clash/tech still sheathe from slash. AABB planted.
    // Feint→guard leftover: leftover windup used to die the tick S hold raised guarda mid-pull
    // (this gated on guarding), so the raise was a
    // sheet cut — windup popped to block. Keep leftover windup through leftover feintT if they raise.
    // poseBitmap still block once guarding. Idle feint still fades windup→idle. Stun still cuts.
    // Feint walk-out pose leftover: drawKnight rests leftover windup on walk when
    // gaitWalkOn (A/D mid-pull; rival same). This fade unchanged.
    // Feint walk-in pose leftover: drawKnight also rests leftover windup on walk when
    // walkFadeHold / recoveryWalkOut (A/D / rival closing through telegraph pull). This fade unchanged.
    if (!f || f.feintT <= 0) return 0;
    if (f.falling || f.stunT > 0) return 0;
    if (f.phase !== "idle") return 0;
    if (f.boltPhase) return 0;
    const rec = FEINT_RECOVERY;
    if (rec <= 0) return 0;
    const u = 1 - Math.max(0, Math.min(1, f.feintT / rec));
    return 1 - u * u * (3 - 2 * u);
  }

  function parryFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once landParry / landHit set stunT
    // (hurt once landThrow set thrownT / hp 0).
    // Perfect-parry used to pop slash/golpe→idle the same tick (sheatheFade dies
    // on stun), so the freeze frame was standing idle while gleam sat on blades —
    // a snap, not a break. Hit interrupt leftover (v336): same hole on the defender
    // when landHit / landBoltHit dumps mid-cut / windup / knife → idle — arm
    // parryFadeT + parryFadeSheet. Throw interrupt leftover (v339): landThrow mid-cut
    // → hurt — same arm; draw rests leftover cut on hurt. Tech / KO interrupt
    // leftover (v340): landThrowTech mid-cut → throw windup (techRec recovery);
    // KO mid-cut keeps the latch through hp<=0 / falling (used to die on crumple).
    // Fade leftover over SHEATHE_MS. Hold through freeze. destRect eases leftover
    // ox/rot (flinch on stun / plant on KD). Tip eases with fade. Chip stun / idle
    // throw / idle tech (no parryFadeT) still 0. AABB planted. No new combat verb.
    if (!f || f.parryFadeT <= 0) return 0;
    // KO interrupt leftover (v340): keep latched fade through hp<=0 / falling.
    // Unlatched crumple still 0 (parryFadeT gate above).
    const techCut = !!(f.techRec && f.cut === "throw" && f.phase === "recovery");
    if (f.phase !== "idle" && !techCut) return 0;
    if (f.boltPhase) return 0;
    if (f.guarding) return 0;
    const rec = SHEATHE_MS;
    if (rec <= 0) return 0;
    const u = 1 - Math.max(0, Math.min(1, f.parryFadeT / rec));
    return 1 - u * u * (3 - 2 * u);
  }

  function sheatheFade(f) {
    // Visual only (drawKnight). poseBitmap still holds the cut while planted
    // (block once guarding mid-sheathe).
    // Walking used to drop the lunge sheet in one tick (sheathing() skips
    // walk); standing sat on full extension then popped idle after the hump.
    // Sheathe→guard leftover: leftover sheathe used to die the tick S raised
    // mid-sheathe (this gated on guarding), so leftover slash popped to block —
    // a snap, not a plant. Keep leftover sheathe through leftover sheatheT if
    // they raise. poseBitmap still block once guarding. Idle sheathe still
    // fades slash→idle. Stun still cuts. Raise still 0ms.
    // Sheathe walk-out pose leftover: drawKnight rests leftover slash on walk when
    // gaitWalkOn (A/D mid-sheathe; rival same). This fade unchanged.
    // Sheathe walk-out recoveryWalkOut pose leftover: drawKnight also rests leftover slash
    // on walk when walkFadeHold / recoveryWalkOut (A/D early-step / rival closing).
    // This fade unchanged.
    if (!f) return 0;
    if (f.falling || f.stunT > 0) return 0;
    if (f.boltPhase) return 0;
    // Golpe is a poke. Holding the tajo lunge sheet for the whole 180ms
    // recovery then sheathing read as a stuck cut. Fade slash→idle over
    // that recovery (draw-only). Clash/tech keep the blade out.
    // Slash used to hold full-extension lunge for the whole 280ms
    // recovery then sheathe on idle — same stuck cut. Fade over that
    // recovery too (draw-only). Clash/tech keep the blade out, then sheathe.
    if (f.phase === "recovery" && (f.cut === "golpe" || f.cut === "slash") && !f.clashRec && !f.techRec) {
      const rec = cutRecovery(f);
      if (rec <= 0) return 0;
      const u = Math.max(0, Math.min(1, f.phaseT / rec));
      const k = 1 - u * u * (3 - 2 * u);
      return k;
    }
    if (f.sheatheT <= 0) return 0;
    if (f.phase !== "idle") return 0;
    // Feint pose leftover: idle sheathe envelope overlays slash. The pull
    // never had a live blade — leftover windup fades instead (feintFade).
    // Clash/tech still sheathe from slash.
    if (f.feintT > 0) return 0;
    // Guard drop leftover: leftover sheathe overlay used to pop slash
    // the same tick S released (sheatheFade gated only on guarding).
    // Leftover block owns the sheet. destRect leftover dip still eases.
    if (guardDropFade(f) > 0) return 0;
    // Reversal plant leftover: leftover sheathe overlay used to pop slash
    // the same tick startReversal armed (sheatheFade gated only on guarding).
    // Leftover block owns the sheet. destRect leftover plant already eases.
    if (reversalPlantFade(f) > 0) return 0;
    // Throw-from-guard plant leftover: leftover sheathe overlay used to pop
    // slash the same tick startThrow armed (sheatheFade gated only on
    // guarding). Leftover block owns the sheet. destRect leftover plant
    // already eases.
    if (throwGuardPlantFade(f) > 0) return 0;
    // Tech-from-guard plant leftover: leftover sheathe overlay used to pop
    // slash the same tick landThrowTech armed (sheatheFade gated only on
    // guarding). Leftover block owns the sheet. destRect leftover plant
    // already eases.
    if (techGuardPlantFade(f) > 0) return 0;
    // Clash leftover pose: leftover sheathe overlay used to pop slash
    // the same tick clash-Space/L/K armed (sheatheFade gated only on
    // guarding). Leftover slash owns the sheet. destRect leftover plant
    // already 0. Special-cancel K still holds the cut.
    if (clashPlantFade(f) > 0) return 0;
    // Connected slash-L leftover sheathe: leftover sheathe overlay used to
    // pop windup the same tick connected cancel armed (sheatheFade died
    // with recovery). Leftover sheathe owns the sheet. destRect leftover
    // plant already 0. Special-cancel K still holds the cut.
    if (linkPlantFade(f) > 0) return 0;
    // Special-cancel K leftover sheathe: leftover sheathe overlay used to
    // pop the full cut the same tick cancelIntoBolt armed (sheatheFade
    // died with boltPhase). Leftover sheathe owns the sheet. destRect leftover
    // plant already 0. Special-cancel K still holds the cut.
    if (holdCutFade(f) > 0) return 0;
    // Idle clash/tech sheathe: same smoothstep as recovery so last frames
    // stay under 0.02 with idle base still owned (draw-only; overlay still
    // skips tiny). Linear T/MS skipped the (0,0.02] window at 60fps.
    const u = 1 - Math.max(0, Math.min(1, f.sheatheT / SHEATHE_MS));
    return 1 - u * u * (3 - 2 * u);
  }

  function guardDropFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once guarding is 0.
    // Guard drop used to pop leftover block→idle the same tick S released
    // (destRect leftover k already eases), so the drop was a sheet cut,
    // not a release. Fade leftover block over leftover guardPoseK.
    // Raise still 0ms (block the same frame). Combat poses still snap
    // leftover k (reversal/slash/stun). Guard break leftover eases
    // leftover k (tickGuardPose no longer zeros on break; this fade
    // no longer gates on guardBreakT). destRect leftover plant already
    // eases. AABB planted.
    // Walk-out guard drop leftover: walking used to zero the fade
    // (gaitWalkOn leftover), so walk-out mid-drop dumped leftover block
    // while destRect leftover k still eased — same hole wakeup walk-out already closed.
    // Keep leftover block through leftover guardPoseK if they step off.
    // Stun still cuts. poseBitmap still idle / walk.
    // Guard drop walk-out pose leftover: drawKnight rests leftover block on walk when
    // gaitWalkOn (A/D mid-drop; rival same). This fade unchanged.
    // Guard drop walk-out recoveryWalkOut pose leftover: drawKnight also rests leftover
    // block on walk when walkFadeHold / recoveryWalkOut (A/D early-step / rival closing).
    // This fade unchanged.
    // Feint from leftover drop: leftover block used to sit on the pull the
    // same tick startFeint armed from leftover-drop slash (this gated only
    // on idle + leftover k), so early S-feint mid-drop painted leftover
    // block over leftover windup — a sheet stack, not a pull. Skip leftover
    // block through leftover feintT; feint owns the windup overlay
    // (feintFade / feint→guard). poseBitmap still idle (block once they raise).
    // destRect leftover k still eases. Walk-out / guard break / S-release
    // drop unchanged.
    if (!f) return 0;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return 0;
    if (f.guarding) return 0;
    if (f.feintT > 0) return 0;
    if (f.phase !== "idle" || f.boltPhase) return 0;
    return guardRaiseK(f);
  }

  function reversalPlanting(f) {
    // Draw-only leftover. Reversal startup from guard.
    if (!f || !f.reversal) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.cut !== "golpe") return false;
    if (f.phase !== "startup") return false;
    if (f.boltPhase) return false;
    return true;
  }

  function reversalPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on reversal.
    // Leftover block used to pop to windup the same tick startReversal
    // armed (tickGuardPose snapped leftover k, telegraph false), so the
    // raise was a sheet cut, not a plant. Fade leftover block→windup
    // over leftover guardPoseK. destRect leftover plant eases with leftover k.
    // poseBitmap still windup immediately (guarding is 0). Raise still 0ms.
    // Stun leftover k eases leftover destRect plant. Slash leftover k eases leftover destRect plant.
    // Telegraph still snaps (no leftover
    // telegraph flag). AABB planted. Extra destRect rot stays 0 (leftover
    // guard rot eases with leftover k; no extra).
    // Reversal plant walk-in pose leftover: drawKnight rests leftover block on
    // walk when walkFadeHold / recoveryWalkOut (A/D / rival closing through
    // reverse). This fade unchanged.
    if (!reversalPlanting(f)) return 0;
    return guardRaiseK(f);
  }

  function throwGuardPlanting(f) {
    // Draw-only leftover. Throw startup from guard (Space+S).
    if (!f) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.cut !== "throw") return false;
    if (f.phase !== "startup") return false;
    if (f.boltPhase) return false;
    if (f.reversal) return false;
    return true;
  }

  function throwGuardPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on throw.
    // Leftover block used to pop to windup the same tick startThrow
    // armed (tickGuardPose snapped leftover k, telegraph false), so
    // Space+S from guarda was a sheet cut, not a plant — reversal
    // already faded leftover block→windup. Fade leftover block→windup
    // over leftover guardPoseK. destRect leftover plant eases with leftover k.
    // poseBitmap still windup immediately (guarding is 0). Throw recovery
    // leftover unchanged (throwPlantFade). Idle/rival telegraph throw still
    // fades idle→windup. Golpe leftover k eases leftover destRect plant. Raise still 0ms.
    // Extra destRect rot stays 0 (leftover guard rot eases with leftover k;
    // no extra). AABB planted. Chip stun / throw KD unchanged. No new combat verb.
    // Throw-from-guard plant walk-in pose leftover: drawKnight rests leftover block on
    // walk when walkFadeHold / recoveryWalkOut (A/D / rival closing through throw).
    // This fade unchanged.
    if (!throwGuardPlanting(f)) return 0;
    return guardRaiseK(f);
  }

  function techGuardPlanting(f) {
    // Draw-only leftover. Throw tech recovery from guard (Space+S tech).
    if (!f) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (!f.techRec) return false;
    if (f.cut !== "throw") return false;
    if (f.phase !== "recovery") return false;
    if (f.boltPhase) return false;
    return (f.guardPoseK || 0) > 0;
  }

  function techGuardPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on tech recovery.
    // Leftover block used to pop to windup the same tick landThrowTech
    // armed (tickGuardPose snapped leftover k, throwPlantFade held windup),
    // so Space+S tech from guarda was a sheet cut — throw-from-guard /
    // reversal already faded leftover block→windup. Fade leftover
    // block→windup over leftover guardPoseK. destRect leftover plant eases
    // with leftover k. poseBitmap still windup immediately (throw recovery).
    // Throw recovery leftover unchanged (throwPlantFade). Idle tech still
    // snaps (no leftover k). Raise still 0ms. Extra destRect rot stays 0
    // (leftover guard rot eases with leftover k; no extra). AABB planted.
    // Chip stun / throw KD unchanged. No new combat verb.
    // Tech-from-guard plant walk-in pose leftover: drawKnight rests leftover block on
    // walk when walkFadeHold / recoveryWalkOut (A/D / rival closing through tech).
    // This fade unchanged.
    if (!techGuardPlanting(f)) return 0;
    return guardRaiseK(f);
  }

  function slashLeftoverPlanting(f) {
    // destRect leftover. Slash startup from leftover drop.
    // leftover destRect plant used to dump the same tick startAttack
    // armed (tickGuardPose snapped leftover k), so leftover guard
    // lean/oy hopped off the windup plant. Ease leftover k like
    // reversal. poseBitmap still windup immediately. leftover block
    // overlay still dies (guardDropFade idle). Telegraph still fades
    // idle→windup. Stun leftover k eases leftover destRect plant. Extra destRect rot
    // stays 0 (leftover guard rot eases with leftover k; no extra).
    if (!f) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.cut !== "slash") return false;
    if (f.phase !== "startup") return false;
    if (f.boltPhase) return false;
    if (f.reversal) return false;
    return true;
  }

  function golpeLeftoverPlanting(f) {
    // destRect leftover. Golpe startup from leftover drop.
    // leftover destRect plant used to dump the same tick startAttack(golpe)
    // armed (startAttack zeroed leftover k, tickGuardPose snapped leftover k),
    // so leftover guard lean/oy hopped off the windup plant — slash already
    // eased leftover k. destRect-only ease (golpeLeftoverPlanting). Ease leftover
    // k like slash leftover. poseBitmap still windup immediately. leftover block
    // overlay still dies (guardDropFade idle). Telegraph still fades idle→windup.
    // Reversal leftover still eases leftover k (reversalPlanting). Stun leftover k
    // eases leftover destRect plant. Extra destRect rot stays 0 (leftover guard
    // rot eases with leftover k; no extra). AABB planted. Raise still 0ms.
    // No new combat verb.
    if (!f) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.cut !== "golpe") return false;
    if (f.phase !== "startup") return false;
    if (f.boltPhase) return false;
    if (f.reversal) return false;
    return true;
  }

  function boltLeftoverPlanting(f) {
    // destRect leftover. Empty-K raise from leftover drop / leftover plant.
    // leftover destRect plant used to dump the same tick startBolt armed
    // (startBolt zeroed leftover k, tickGuardPose snapped leftover k), so
    // leftover guard lean/oy hopped off the windup plant. Ease leftover k
    // like slash leftover. destRect-only ease (boltLeftoverPlanting).
    // poseBitmap still windup immediately. leftover block overlay still dies
    // (guardDropFade idle). Telegraph still fades leftover idle→windup.
    // Super freeze leftover idle overlay unchanged. Special-cancel still snaps leftover k
    // (holdingCutBolt). Clash-K leftover destRect plant already 0. Stun leftover
    // k eases leftover destRect plant. Throw KD
    // leftover destRect plant eases leftover k. Golpe leftover k eases
    // leftover destRect plant. Throw-from-guard plant leftover eases leftover k. Raise still 0ms. Extra
    // destRect rot stays 0 (leftover guard rot eases with leftover k; no
    // extra). AABB planted.
    if (!f) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (holdingCutBolt(f)) return false;
    if (f.clashPlant) return false;
    if (f.boltPhase !== "startup") return false;
    return true;
  }

  function stunLeftoverPlanting(f) {
    // destRect leftover. Chip stun from leftover drop / leftover plant.
    // leftover destRect plant used to dump the same tick landHit set stunT
    // (tickGuardPose snapped leftover k), so leftover guard lean/oy hopped
    // off the stun flinch plant. Ease leftover k like slash leftover.
    // poseBitmap still idle immediately (chip stun is not hurt).
    // Throw KD leftover destRect plant eases leftover k. Raise still 0ms. Extra destRect rot
    // stays 0 (leftover guard rot eases with leftover k; stun rot scales
    // so leftover does not stack extra). AABB planted.
    if (!f) return false;
    if (f.falling || f.hp <= 0) return false;
    if (f.stunT <= 0) return false;
    if (f.thrownT > 0) return false;
    if (f.guarding) return false;
    return (f.guardPoseK || 0) > 0;
  }

  function throwKdLeftoverPlanting(f) {
    // destRect leftover. Throw KD from leftover drop / leftover plant.
    // leftover destRect plant used to dump the same tick landThrow set thrownT
    // (tickGuardPose snapped leftover k, guardRaiseK gated thrownT), so leftover
    // guard lean/oy hopped off the hurt plant. Ease leftover k like stun leftover.
    // poseBitmap still hurt immediately (thrownT). Standing chip stun leftover k
    // still eases leftover destRect plant. Raise still 0ms. Extra destRect rot
    // stays 0 (leftover guard rot eases with leftover k; hurt rot stays 0 so
    // leftover does not stack extra). AABB planted.
    if (!f) return false;
    if (f.falling || f.hp <= 0) return false;
    if (f.thrownT <= 0) return false;
    if (f.guarding) return false;
    return (f.guardPoseK || 0) > 0;
  }

  function clashPlanting(f) {
    // Draw-only leftover. Clash-Space/L cancel from leftover slash recovery.
    // Clash-K leftover slash stuck through the K plant (boltHoldCut).
    if (!f || !f.clashPlant) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.reversal) return false;
    if (f.boltPhase === "startup" && !holdingCutBolt(f)) return true;
    if (f.boltPhase) return false;
    if (f.phase !== "startup") return false;
    if (f.cut !== "slash" && f.cut !== "golpe") return false;
    return true;
  }

  function clashPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on clash-Space/L/K.
    // Leftover slash used to pop to windup the same tick cancelIntoGolpe /
    // cancelIntoSlash armed (telegraph false, sheatheFade skipped clashRec),
    // so the plant was a sheet cut, not a raise. Clash-K leftover slash
    // used to stick through the K plant (boltHoldCut). Fade leftover
    // slash→windup over GUARD_RAISE_MS. poseBitmap still windup immediately.
    // destRect leftover plant already 0 (dedicated slash/windup). AABB
    // planted. Extra destRect rot stays 0. Special-cancel K still holds
    // the cut (boltHoldCut). Connected slash/golpe leftover sheathe eases
    // leftover sheathe overlay (linkPlantFade).
    // Telegraph still snaps. Raise still 0ms. Leftover-k destRect plant
    // from leftover drop unchanged. AABB planted.
    // Clash walk-in walkFadeHold pose leftover: drawKnight also rests leftover cut
    // raise on walk when walkFadeHold / recoveryWalkOut (A/D / rival closing through
    // clash cancel). This fade unchanged.
    // No new combat verb.
    if (!clashPlanting(f)) return 0;
    if (GUARD_RAISE_MS <= 0) return 1;
    const t = f.boltPhase === "startup" ? f.boltT : f.phaseT;
    const u = Math.max(0, Math.min(1, t / GUARD_RAISE_MS));
    return 1 - u * u * (3 - 2 * u);
  }

  function linkPlanting(f) {
    // Draw-only leftover. Connected slash-L / golpe-Space leftover sheathe.
    // Idle sheathe leftover: mashy Space/L/K/throw after clash/tech sheathe.
    if (!f || !f.linkPlant) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.reversal) return false;
    if (f.clashPlant) return false;
    if (f.boltPhase === "startup" && !holdingCutBolt(f)) return true;
    if (f.boltPhase) return false;
    if (f.phase !== "startup") return false;
    if (f.cut !== "slash" && f.cut !== "golpe" && f.cut !== "throw") return false;
    return true;
  }

  function linkPlantFade(f) {
    // Visual only (drawKnight). poseBitmap still windup on connected cancel /
    // idle sheathe raise.
    // Leftover sheathe overlay used to pop to windup the same tick
    // cancelIntoGolpe / cancelIntoSlash armed (telegraph false, sheatheFade
    // died with recovery), so leftover sheathe dumped — a snap, not a raise.
    // Idle sheathe leftover: mashy Space/L/K/throw after clash/tech sheathe
    // used to dump the same tick startAttack / startThrow / startBolt armed
    // (sheatheFade died with phase/boltPhase). Fade leftover sheathe→windup
    // over GUARD_RAISE_MS. poseBitmap still windup immediately. destRect
    // leftover plant already 0 (dedicated slash/windup). AABB planted. Extra
    // destRect rot stays 0. Clash leftover pose unchanged (clashPlantFade).
    // Special-cancel K still holds the cut (boltHoldCut / holdCutFade).
    // Telegraph still snaps when no leftover sheathe. Raise still 0ms.
    // Leftover-k destRect plant from leftover drop unchanged. AABB planted.
    // No new combat verb.
    // Link plant walk-in pose leftover: drawKnight rests leftover walk under
    // linkSheet when walkFadeHold (A/D mid-stride sheathe into Space/L/throw/K;
    // rival same). tickGait keeps that hold through this raise. HoldCut walk-in also rests link raise on walk when recoveryWalkOut
    // (A/D mid-recovery cancel). This fade unchanged.
    if (!linkPlanting(f)) return 0;
    if (GUARD_RAISE_MS <= 0) return 1;
    const t = f.boltPhase === "startup" ? f.boltT : f.phaseT;
    const u = Math.max(0, Math.min(1, t / GUARD_RAISE_MS));
    return 1 - u * u * (3 - 2 * u);
  }

  function holdCutPlanting(f) {
    // Draw-only leftover. Connected special-cancel K leftover sheathe.
    if (!f || !f.holdCutPlant) return false;
    if (!holdingCutBolt(f)) return false;
    if (f.falling || f.stunT > 0 || f.hp <= 0) return false;
    if (f.guarding) return false;
    if (f.clashPlant) return false;
    if (f.boltPhase !== "startup") return false;
    return true;
  }

  function holdCutFade(f) {
    // Visual only (drawKnight). poseBitmap still slash on special-cancel K.
    // Leftover recovery sheathe overlay used to pop to the full cut the
    // same tick cancelIntoBolt armed (sheatheFade died with boltPhase),
    // so leftover sheathe dumped — a snap, not a plant. Fade leftover
    // sheathe→cut over GUARD_RAISE_MS. poseBitmap still slash immediately
    // (boltHoldCut). destRect leftover plant already 0 (holdingCutBolt).
    // AABB planted. Extra destRect rot stays 0. Clash leftover pose
    // unchanged (clashPlantFade). Clash-K leftover pose unchanged.
    // Connected slash-L leftover sheathe unchanged (linkPlantFade).
    // Special-cancel K still holds the cut (boltHoldCut). Telegraph still
    // snaps. Raise still 0ms. Leftover-k destRect plant from leftover
    // drop unchanged. AABB planted.
    // HoldCut walk-in pose leftover: drawKnight rests leftover cut on walk
    // when recoveryWalkOut (A/D mid-recovery into K). This fade unchanged.
    // HoldCut walk-in walkFadeHold: also rests when walkFadeHold (rival closing).
    // This fade unchanged. No new combat verb.
    if (!holdCutPlanting(f)) return 0;
    if (GUARD_RAISE_MS <= 0) return 1;
    const u = Math.max(0, Math.min(1, f.boltT / GUARD_RAISE_MS));
    return 1 - u * u * (3 - 2 * u);
  }

  function crumpleFade(f) {
    // destRect-only. AABB planted. poseBitmap still hurt on hp 0 / falling.
    // KO used to dump destRect oy −10 the same tick beginFall set falling
    // (freeze sat at 0), so the crumple hopped off the stones then settled.
    // Ease leftover plant into the lift over GUARD_RAISE_MS. Chip stun
    // unchanged (not falling). Extra destRect rot stays 0.
    if (!f || !f.falling) return 0;
    if (GUARD_RAISE_MS <= 0) return 1;
    const u = Math.max(0, Math.min(1, f.fallT / GUARD_RAISE_MS));
    return u * u * (3 - 2 * u);
  }

  function hurtFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once thrownT is 0
    // (block once guarding mid-getup; windup immediately on reversal).
    // Hurt pose snap leftover: leftover crumple used to pop hurt→idle when
    // throw-invuln died (wakeupFade dies with THROW_WAKE_INVULN 80), so meaty
    // stun past that window / getup settle was a sheet cut — a snap, not a plant.
    // Same hole parryFade closed for slash→idle on interrupt. Fade leftover hurt→idle over SHEATHE_MS from thrownT clear. Keep through stun / guard /
    // wakeRev like wakeupFade (parryFade cuts on guard; this does not).
    // wakeupFade still owns invuln-window / wakeRevFadeHold. Chip stun (no
    // hurtFadeT) still 0. Tip under hurt did not hop (shared sheet-edge).
    // destRect/AABB planted. Stun frames / damage / THROW_WAKE_INVULN unchanged.
    // No new combat verb.
    if (!f || f.hurtFadeT <= 0) return 0;
    if (f.falling || f.hp <= 0) return 0;
    if (f.thrownT > 0) return 0;
    if (f.boltPhase) return 0;
    // Idle getup / meaty stun / wakeup→guard. Wakeup→reversal uses phase startup
    // with wakeRevFadeHold on wakeupFade; keep hurtFade through that plant too.
    if (f.phase !== "idle" && !(f.wakeRevFadeHold > 0 && reversalPlanting(f))) return 0;
    const rec = SHEATHE_MS;
    if (rec <= 0) return 0;
    const u = 1 - Math.max(0, Math.min(1, f.hurtFadeT / rec));
    return 1 - u * u * (3 - 2 * u);
  }

  function wakeupFade(f) {
    // Visual only (drawKnight). poseBitmap still idle once thrownT is 0
    // (block once guarding mid-getup; windup immediately on reversal).
    // Getup used to pop the 45° crumple to standing the same tick
    // throw-invuln armed, so the 80ms window was invisible.
    // Wakeup→guard leftover: leftover crumple used to die the tick S raised mid-getup
    // (this gated on guarding), so leftover hurt popped to block — a snap, not a plant.
    // Keep leftover crumple through leftover throw-invuln if they raise.
    // Wakeup→reversal leftover: leftover crumple used to die the tick
    // startWakeReversal / startReversal spent throw-invuln (this gated
    // phase + invuln), so leftover hurt popped to windup — a snap, not a plant.
    // Keep leftover crumple through leftover wakeRevFadeHold over GUARD_RAISE_MS
    // if they reverse mid-getup. poseBitmap still windup immediately.
    // Idle getup still fades hurt→idle. Guard reversal plant leftover
    // unchanged (reversalPlantFade). Walk-out / meaty leftover still hold.
    // leftover getup fade no longer dies the tick S raised (same hole
    // leftover getup fade no longer dies the tick a meaty sets stunT).
    // Wakeup walk-out pose leftover: drawKnight rests leftover crumple on walk when
    // gaitWalkOn (A/D mid-getup; rival same). This fade unchanged.
    // Wakeup walk-out recoveryWalkOut pose leftover: drawKnight also rests leftover crumple
    // on walk when walkFadeHold / recoveryWalkOut (A/D early-step / rival closing). This fade unchanged.
    // Wakeup→reversal walk-in pose leftover: drawKnight rests leftover crumple on walk
    // when walkFadeHold / recoveryWalkOut (A/D / rival closing through getup L). This fade unchanged.
    // Wakeup→guard walk-in pose leftover: drawKnight rests leftover crumple on walk
    // when walkFadeHold (A/D / rival closing through getup S). This fade unchanged.
    if (!f || f.falling || f.hp <= 0) {
      if (f) f.wakeRevFadeHold = 0;
      return 0;
    }
    // Wakeup→reversal leftover: ease captured crumple onto windup plant.
    if (f.wakeRevFadeHold > 0 && reversalPlanting(f)) {
      const u = Math.min(1, Math.max(0, f.phaseT / GUARD_RAISE_MS));
      const ease = 1 - u * u * (3 - 2 * u);
      if (ease <= 0.001) {
        f.wakeRevFadeHold = 0;
        return 0;
      }
      return f.wakeRevFadeHold * ease;
    }
    if (f.wakeRevFadeHold > 0) f.wakeRevFadeHold = 0;
    if (f.thrownT > 0) return 0;
    if (f.throwInvulnT <= 0) return 0;
    if (f.phase !== "idle") return 0;
    if (f.boltPhase) return 0;
    // Walk-out on getup used to zero the fade (gaitWalkOn leftover).
    // Leftover crumple eases over the same 80ms if they step off.
    // Meaty leftover: stun used to dump leftover crumple the same tick
    // landHit set stunT, so getup fade died on the meaty (chips did not —
    // they never had leftover invuln). Keep leftover fade through leftover
    // throw-invuln. destRect leftover breath eases with this k (stunT/thrownT
    // used to dump ~1.6 the same tick invuln armed). destRect/AABB planted.
    // poseBitmap still idle (block once they raise; windup on reversal).
    const u = 1 - Math.max(0, Math.min(1, f.throwInvulnT / THROW_WAKE_INVULN));
    return 1 - u * u * (3 - 2 * u);
  }

  function walkFade(f) {
    // Visual only (drawKnight). poseBitmap still hard-cuts at gaitWalkOn.
    // destRect stride already eased; idle↔walk bitmap still popped every
    // plant↔pass (and the back boot skipped the passing sheet entirely),
    // and A/D release snapped leftover passing sheet to idle.
    // Walk→guard leftover: leftover walk used to die the tick S raised
    // (this gated on guarding; tickGait zeroed walkFadeHold), so walk
    // popped to block — a snap, not a plant. Keep leftover walk through
    // leftover walkFadeHold if they raise. poseBitmap still block once
    // guarding. Idle walk settle still fades walk→idle. destRect lean
    // eases with walkSettleK through leftover settle if they raise.
    // Stun still cuts.
    if (!f || f.falling || f.stunT > 0) return 0;
    if (f.phase !== "idle") return 0;
    if (f.boltPhase) return 0;
    if (walking(f)) return walkSheetK(f);
    if (f.walkSettleT > 0 && f.walkFadeHold > 0) {
      return f.walkFadeHold * walkSettleK(f);
    }
    return 0;
  }

  function hurtFlashK(f) {
    // Draw-only. Chip stun keeps the white fade after freeze.
    // KO used to drop it the tick beginFall set falling (hitstop
    // end), so the kill had no fade — chips did. destRect/AABB
    // planted. Winner is not falling and has no stunT.
    // Hit flash vs knock resume leftover: leftover white used to stay at
    // full HIT_FLASH_MS 120 the tick freeze ended and fade linear while
    // punchCover held full through the slam — flash did not die with
    // cover. Hold peak while cover is full; ease out over cover's last
    // quarter (same smoothstep as punchCover). No punch keeps linear
    // hitFlashT fade. destRect/AABB planted.
    if (!f || hitFlashT <= 0) return 0;
    if (f.stunT <= 0 && !f.falling) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return hitFlashT / HIT_FLASH_MS;
  }

  function steelFlashK() {
    // Draw-only. Block steel asterisk used to fade on its own STEEL_FLASH_MS
    // linear clock while punchCover held full through the slam — asterisk
    // died mid-cover. Hold peak while cover is full; ease out over cover's
    // last quarter (same smoothstep as punchCover / hurtFlashK). No punch
    // keeps linear steelFlashT fade. Armed clock holds through live punch
    // and clears when cover dies (update, v332). push/tech/block steelKind
    // unchanged. destRect/AABB planted.
    if (steelFlashT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return steelFlashT / STEEL_FLASH_MS;
  }

  function parryGleamK() {
    // Draw-only. Parry gleam ↔ punchCover (v326): brasa gleam used to fade on
    // its own PARRY_GLEAM_MS linear clock while punchCover held full through
    // the slam — gleam died mid-cover (steel asterisk sibling). Hold peak
    // while cover is full; ease out over cover's last quarter (same
    // smoothstep as punchCover / steelFlashK / hurtFlashK). No punch keeps
    // linear parryGleamT fade. Armed clock holds through live punch and
    // clears when cover dies (update, v332). destRect/AABB planted.
    if (parryGleamT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return parryGleamT / PARRY_GLEAM_MS;
  }

  function clashSparkK() {
    // Draw-only. Clash spark ↔ punchCover (v328): choque spark used to fade on
    // its own CLASH_SPARK_MS linear clock while punchCover held full through
    // the slam — shards died mid-cover (steel asterisk / parry gleam siblings).
    // Hold peak while cover is full; ease out over cover's last quarter (same
    // smoothstep as punchCover / steelFlashK / hurtFlashK / parryGleamK). No
    // punch keeps linear clashSparkT fade. Armed clock holds through live punch
    // and clears when cover dies (update, v332). destRect/AABB planted.
    if (clashSparkT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return clashSparkT / CLASH_SPARK_MS;
  }

  function hitSparkK() {
    // Draw-only. Flesh hit spark ↔ punchCover (v329): clean flesh spark used to
    // fade on its own HIT_SPARK_MS 100 linear clock while punchCover held full
    // through the slam — shards died mid-cover (white still peaked). Hold peak
    // while cover is full; ease out over cover's last quarter (same smoothstep
    // as punchCover / clashSparkK / steelFlashK / hurtFlashK / parryGleamK). No
    // punch keeps linear hitSparkT fade. Armed clock holds through live punch
    // and clears when cover dies (update). destRect/AABB planted.
    if (hitSparkT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return hitSparkT / HIT_SPARK_MS;
  }

  function brasaHitK() {
    // Draw-only. Dart ember ↔ punchCover (v329): brasaFxKind "hit" flesh-related
    // ember used to fade on its own BRASA_HIT_MS linear clock while punchCover
    // held full — ember died mid-cover (flesh spark sibling). Hold peak while
    // cover is full; ease out over cover's last quarter. Other brasa kinds do
    // not use this. No punch keeps linear BRASA_HIT_MS fade. BRASA_HIT_MS 140
    // stays longer than HIT_SPARK_MS 100. destRect/AABB planted.
    if (brasaFxT <= 0 || brasaFxKind !== "hit") return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return brasaFxT / BRASA_HIT_MS;
  }

  function plantDustK(p) {
    // Draw-only. Knock grit / plant dust ↔ punchCover (v330): connect grit used to
    // fade on its own t/life linear clock while punchCover held full through the
    // slam — dust died mid-cover (white still peaked). Punch-marked stamps/specks
    // (spawned while shake armed) Hold peak while cover is full (k>0.25); ease out
    // over cover's last quarter (same smoothstep as punchCover / hitSparkK /
    // clashSparkK / steelFlashK / hurtFlashK / parryGleamK); floor at linear life
    // fade so post-cover does not pop. Walk/idle grit unmarked — stays linear. No
    // punch keeps linear. destRect/AABB planted.
    // Clash/tech/pushblock dust ↔ punchCover (v337): those paths now bumpShake
    // before spawnPlantDust so scrape/shove trails punch-mark too (used to spawn
    // first → unmarked linear mid-cover).
    if (!p) return 0;
    const lin = Math.max(0, 1 - p.t / p.life);
    if (!p.punch) return lin;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      const ease = u * u * (3 - 2 * u);
      return Math.max(lin, ease);
    }
    return lin;
  }

  function dmgNumK(p) {
    // Draw-only. Floating −N ↔ punchCover (v330): dmg nums used to fade on their
    // own DMG_NUM_MS linear clock while punchCover held full through the slam —
    // −N faded mid-cover (white still peaked). Punch-marked nums (spawned while
    // shake armed) Hold peak while cover is full (k>0.25); ease out over cover's
    // last quarter (same smoothstep as punchCover / plantDustK / hitSparkK);
    // floor at linear fade so post-cover does not pop. Rise still ages (alpha
    // only). Chip/clean/throw tints stay distinct. DMG_NUM_MS 600 / DMG_NUM_RISE
    // 50 unchanged. No punch keeps linear. destRect/AABB planted.
    if (!p) return 0;
    const lin = Math.max(0, 1 - Math.min(1, p.t / p.life));
    if (!p.punch) return lin;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      const ease = u * u * (3 - 2 * u);
      return Math.max(lin, ease);
    }
    return lin;
  }

  function hudFlashK(f) {
    // Draw-only. HP drain flash ↔ punchCover (v331): hudFlashT used to fade on
    // its own HUD_FLASH_MS 220 linear clock while punchCover held full through
    // the slam — brasa ghost flash died mid-cover (white still peaked). Already
    // held through freeze; now hold peak while cover is full; ease out over
    // cover's last quarter (same smoothstep as punchCover / meterFlashK /
    // hurtFlashK / dmgNumK). Armed clock holds through live punch and clears
    // when cover dies (tickHudBar). Ghost drain waits on hudFlashT=0. No punch
    // keeps linear. destRect/AABB planted.
    if (!f || f.hudFlashT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return f.hudFlashT / HUD_FLASH_MS;
  }

  function stamFlashK(f) {
    // Draw-only. Stamina chunk spend leftover (v378): mirror hudFlashK so the
    // óxido ghost peaks with punchCover (pushblock / block chip / spent-super
    // plant) and fades linear with no punch. Hold-drain has no flash.
    // destRect/AABB planted.
    if (!f || f.stamFlashT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return f.stamFlashT / HUD_FLASH_MS;
  }

  function comboK(f) {
    // Draw-only. Combo counter ↔ punchCover (v331): comboT used to fade on its
    // own COMBO_SHOW_MS 640 linear clock while punchCover held full through the
    // slam — count died mid-cover (white still peaked). Punch-marked (2+
    // connect) Hold peak while cover is full (k>0.25); ease out over cover's
    // last quarter (same smoothstep as punchCover / dmgNumK / plantDustK /
    // hudFlashK); floor at linear so post-cover does not pop. Rise still ages
    // (alpha only). First connect silent. No punch keeps linear.
    // COMBO_SHOW_MS 640 unchanged. destRect/AABB planted.
    if (!f || f.comboT <= 0) return 0;
    const lin = Math.min(1, f.comboT / COMBO_SHOW_MS);
    if (!f.comboPunch) return lin;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      const ease = u * u * (3 - 2 * u);
      return Math.max(lin, ease);
    }
    return lin;
  }

  function meterFlashK(f) {
    // Draw-only. Full-meter leftover pip used to die the tick
    // startBolt spends the stock (meter=0), so spend freeze had
    // no pip — leftover brasa pip no longer dies the tick. HP ghost
    // already held. Empty K stays 0.
    // Meter fill flash leftover: hard-zero while full used to kill the
    // fill pulse (only spend armed meterFlashT). While full, return the
    // fill envelope so drawLifeBar can pulse the well. Spend flash still
    // meter=0. destRect/AABB planted. HUD bar-drain already holds
    // through freeze.
    // Meter fill ↔ punchCover (v324): fill-to-full pulse used to fade on its
    // own METER_FLASH_MS linear clock while punchCover held full through the
    // slam — pip flash died mid-cover. Hold peak while cover is full; ease
    // out over cover's last quarter (same smoothstep as punchCover /
    // hurtFlashK / steelFlashK). Spend stays linear (own freeze). No punch
    // keeps linear meterFlashT fade. destRect/AABB planted.
    if (!f || f.meterFlashT <= 0) return 0;
    if (f.meterFlashKind === "full" && shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return f.meterFlashT / METER_FLASH_MS;
  }

  function meterGainK(f) {
    // Draw-only. Partial fill pulse envelope (meterGainT). Stock-complete
    // / spend still ride meterFlashK. destRect/AABB planted.
    // Meter fill ↔ punchCover (v324): gain pulse used to fade on its own
    // METER_GAIN_MS linear clock while punchCover held full through the slam
    // — pip glow died mid-cover. Hold peak while cover is full; ease out
    // over cover's last quarter (same smoothstep as punchCover / meterFlashK).
    // No punch keeps linear meterGainT fade. destRect/AABB planted.
    if (!f || f.meterGainT <= 0) return 0;
    if (shake > 0 && shakeDur > 0) {
      const k = Math.min(1, shake / shakeDur);
      if (k > 0.25) return 1;
      const u = k / 0.25;
      return u * u * (3 - 2 * u);
    }
    return f.meterGainT / METER_GAIN_MS;
  }

  function recoveryWalkOut(f) {
    // Draw-only. A/D held through cut/throw/bolt recovery or chip stun so
    // rest can plant walk under the fading / idle sheet. gaitWalkOn is false
    // while phase / bolt / stun locks walking().
    // Rival recovery walk-out pose leftover: leftover slash / windup / knife /
    // stun idle used to rest on idle while rival.closing was already armed
    // (recoveryWalkOut was you-only — rival has no A/D pad), so the fade dumped
    // standing idle then popped walk the tick stun / recovery ended and closing
    // set gait — a hop, not a plant. Same hole recovery walk-out already closed
    // for you A/D. Rest when closing. Idle recovery (closing false) still rests
    // on idle. You A/D path unchanged.
    if (!f || f.falling || f.guarding) return false;
    if (f.kind === "you") return actionHeld("left") || actionHeld("right");
    return !!f.closing;
  }

  function recoveryWalkResting(f) {
    // Draw-only. Recovery walk-out pose leftover seats walk under the live
    // recovery fade / chip stun when A/D is held. Idle recovery still rests
    // on idle. Sheathe walk-out gaitWalkOn path unchanged.
    // Sheathe walk-out recoveryWalkOut also rests via gaitWalkOn||walkFadeHold||recoveryWalkOut.
    if (!recoveryWalkOut(f)) return false;
    if (f.stunT > 0 && f.hp > 0 && f.thrownT <= 0) return true;
    if (f.boltPhase === "recovery") return true;
    if (f.phase === "recovery" && (f.cut === "slash" || f.cut === "golpe" || f.cut === "throw")) return true;
    return false;
  }

  function drawKnight(f) {
    const img = poseBitmap(f);
    if (!ready(img)) return;
    const { dx, dy, dw, dh, rot, pivX, pivY } = destRect(f);
    off.width = Math.max(1, Math.ceil(dw));
    off.height = Math.max(1, Math.ceil(dh));
    octx.clearRect(0, 0, off.width, off.height);
    // Knight sprites: nearest-neighbor. High-quality smoothing + scaled
    // sheets read as soft blur / motion smear on walk.
    octx.imageSmoothingEnabled = false;
    const fade = sheatheFade(f);
    const cut = slashBitmap(f);
    const wf = walkFade(f);
    const walk = walkBitmap(f);
    const idle = f.img;
    // Hurt pose snap leftover: max(wakeupFade, hurtFade) so crumple→idle lasts
    // SHEATHE_MS after thrownT clear (wakeupFade alone died with invuln 80).
    const wake = Math.max(wakeupFade(f), hurtFade(f));
    const hurt = hurtBitmap(f);
    const bf = boltPlantFade(f);
    const wind = windupBitmap(f);
    const knife = throwKnifeBitmap(f);
    // Idle/walk K plant / recovery leftover / bolt telegraph / clash-K / sheathe-K
    // raise into throw_knife. Throw / feint / reversal still use sword windup.
    const boltPlant = ready(knife) ? knife : wind;
    const tf = telegraphFade(f);
    const telePlant = (f.boltPhase === "startup") ? boltPlant : wind;
    // Link plant sword raise leftover: Space/L/throw after sheathe used boltPlant
    // (knife when ready), so leftover sheathe faded into knife then snapped
    // windup — a hop, not a raise. Match telePlant: knife only on bolt startup.
    const linkSheet = (f.boltPhase === "startup") ? boltPlant : wind;
    const ff = feintFade(f);
    const pf = parryFade(f);
    const trf = throwPlantFade(f);
    const gf = guardDropFade(f);
    const rf = reversalPlantFade(f);
    const tgf = throwGuardPlantFade(f);
    const tecf = techGuardPlantFade(f);
    const cf = clashPlantFade(f);
    const lf = linkPlantFade(f);
    const hf = holdCutFade(f);
    const block = blockBitmap(f);
    // Walk→guard leftover: guarding mid-stride keeps leftover walk on the
    // block sheet (poseBitmap already block). Idle walk settle still rests on idle.
    // Live walk: one opaque poseBitmap sheet (gaitWalkOn hard-cut). Mid-stride
    // idle+walk globalAlpha stack left a ghost trail / afterimage every step.
    // Crossfade only on settle release and walk→guard leftover (short).
    const restWalkGuard = wf > 0.02 && f.guarding && ready(walk) && ready(block) && walk !== block;
    const restWalk = wf > 0.02 && !walking(f) && !restWalkGuard && ready(walk) && ready(idle) && walk !== idle;
    // Wakeup→guard leftover: guarding mid-getup keeps leftover crumple on the
    // block sheet (poseBitmap already block). Idle getup still rests on idle.
    // Wakeup→reversal leftover: mid-getup reverse keeps leftover crumple on the
    // windup sheet (poseBitmap already windup). Guard reversal still rests block.
    // Wakeup walk-out pose leftover: leftover crumple used to rest on idle while
    // gaitWalkOn already flipped poseBitmap to walk (A/D mid-getup; rival same),
    // so the getup dumped standing idle then popped the passing sheet when fade
    // dropped under 0.02 — a hop, not a plant. Same hole feint / sheathe walk-out
    // already closed. Rest leftover crumple on the walk sheet when gaitWalkOn.
    // Live walk still one opaque poseBitmap sheet (no idle+walk stack).
    // Wakeup→guard / wakeup→reversal unchanged. destRect breath already 0 through
    // walk-out getup. AABB planted.
    // Wakeup→reversal walk-in pose leftover: leftover walk used to dump the tick
    // startWakeReversal armed from A/D / rival closing mid-getup (restWakeRev rested
    // crumple on windup with no walk base; temporary guarding skipped walkFadeHold arm;
    // reversalPlantFade was 0 so tickGait zeroed hold), so the reverse hopped walk→raise
    // under the fading crumple — a hop, not a plant. Same hole reversal plant walk-in
    // already closed for leftover guardPoseK. Rest leftover crumple raise on walk when
    // walkFadeHold or recoveryWalkOut (skip when restRevWalk owns leftover block plant).
    // Idle getup reverse still rests on windup. Wakeup→guard / wakeup walk-out unchanged.
    // poseBitmap still windup immediately. WakeupFade clock unchanged. AABB planted.
    // Wakeup→guard walk-in pose leftover: leftover walk used to dump the tick S raised
    // mid-getup from A/D / rival closing (restWakeGuard rested crumple on block with no
    // walk base; guarding made recoveryWalkOut false), so the raise hopped walk→block
    // under the fading crumple — a hop, not a plant. Same hole wakeup→reversal walk-in
    // already closed. Rest leftover crumple raise on walk when walkFadeHold. Idle getup
    // guard still rests on block. Wakeup→reversal walk-in / wakeup walk-out / walk→guard
    // unchanged. poseBitmap still block once guarding. WakeupFade clock unchanged.
    // AABB planted.
    const restWakeGuardWalk = wake > 0.02 && f.guarding && f.walkFadeHold > 0.02 && ready(hurt) && ready(walk) && hurt !== walk && walk !== block;
    const restWakeGuard = wake > 0.02 && f.guarding && !restWakeGuardWalk && ready(hurt) && ready(block) && hurt !== block;
    const restWakeRevWalk = wake > 0.02 && !f.guarding && f.reversal && rf <= 0.02 && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(hurt) && ready(walk) && hurt !== walk && walk !== wind;
    const restWakeRev = wake > 0.02 && !f.guarding && f.reversal && !restWakeRevWalk && ready(hurt) && ready(wind) && hurt !== wind;
    // Wakeup walk-out recoveryWalkOut pose leftover: leftover crumple used to rest on idle
    // while recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn
    // false (restWakeWalk only checked gaitWalkOn), so the getup dumped standing idle then
    // popped walk the tick gaitWalkOn flipped / closing set gait — a hop, not a plant. Same
    // hole rival recovery walk-out / feint walk-in already closed for recoveryWalkOut.
    // Rest leftover crumple on walk when gaitWalkOn or walkFadeHold or recoveryWalkOut.
    // Idle getup still rests on idle. Wakeup→guard / wakeup→reversal walk-in unchanged.
    // poseBitmap still idle / walk. WakeupFade clock unchanged. AABB planted.
    const restWakeWalk = wake > 0.02 && !restWakeGuard && !restWakeGuardWalk && !restWakeRev && !restWakeRevWalk && (gaitWalkOn(f) || f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(hurt) && ready(walk) && hurt !== walk;
    const restWake = wake > 0.02 && !restWakeGuard && !restWakeGuardWalk && !restWakeRev && !restWakeRevWalk && !restWakeWalk && ready(hurt) && ready(idle) && idle !== hurt;
    // Recovery walk-out pose leftover: leftover knife used to rest on idle while
    // A/D was held through bolt recovery (gaitWalkOn false — boltPhase locks
    // walking()), so the fade dumped standing idle then popped walk when
    // recovery ended — a hop, not a plant. Rest leftover knife on the walk
    // sheet when A/D is held. Idle bolt recovery still rests on idle.
    // poseBitmap still idle once bolt recovery starts. AABB planted.
    const restBoltWalk = bf > 0.02 && recoveryWalkResting(f) && ready(boltPlant) && ready(walk) && walk !== boltPlant;
    const restBolt = bf > 0.02 && !restBoltWalk && ready(boltPlant) && ready(idle) && idle !== boltPlant;
    // Feint→guard leftover: guarding mid-pull keeps leftover windup on the
    // block sheet (poseBitmap already block). Idle pull still rests on idle.
    // Feint walk-out pose leftover: leftover windup used to rest on idle while
    // gaitWalkOn already flipped poseBitmap to walk (A/D mid-pull; rival same),
    // so the pull dumped standing idle then popped the passing sheet when fade
    // dropped under 0.02 — a hop, not a plant. Rest leftover windup on the walk
    // sheet when gaitWalkOn. Live walk still one opaque poseBitmap sheet (no
    // idle+walk stack). Feint→guard unchanged. destRect breath already
    // Math.max(feintFade, rise). AABB planted.
    // Feint walk-in pose leftover: leftover walk used to dump to idle the tick
    // startFeint armed from telegraph / A/D / rival closing (tickGait zeroed
    // walkFadeHold once telegraphing ended; restFeintWalk only checked gaitWalkOn;
    // startFeint zeroed gait with no walkFadeHold arm), so the pull hopped walk→idle
    // under the fading windup — a hop, not a plant. Same hole telegraph walk-in
    // already closed for telePlant. Rest leftover windup on walk when gaitWalkOn
    // or walkFadeHold or recoveryWalkOut. Idle pull still rests on idle.
    // Feint walk-out / feint→guard unchanged. poseBitmap still idle once feintT
    // is set. FeintFade clock unchanged. AABB planted.
    const restFeintGuard = ff > 0.02 && f.guarding && ready(wind) && ready(block) && wind !== block;
    const restFeintWalk = ff > 0.02 && !restFeintGuard && (gaitWalkOn(f) || f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(wind) && ready(walk) && wind !== walk;
    const restFeint = ff > 0.02 && !restFeintGuard && !restFeintWalk && ready(wind) && ready(idle) && idle !== wind;
    // Parry interrupt leftover (v325): leftover slash used to pop to idle the same tick
    // landParry set stunT (sheatheFade dies on stun). Rest leftover cut on idle while pf live.
    // poseBitmap still idle. Chip stun (pf 0) unchanged. AABB planted.
    // Hit interrupt leftover (v336): defender landHit / landBoltHit reuses pf; latch
    // parryFadeSheet picks slash / windup / knife leftover over idle.
    // Throw interrupt leftover (v339): landThrow mid-cut → hurt; rest leftover cut on
    // hurt while pf live (poseBitmap still hurt on thrownT). Idle throw still snaps.
    // Tech / KO interrupt leftover (v340): landThrowTech mid-cut → throw windup; KO
    // mid-cut → hurt crumple. Rest leftover cut on windup (techRec) or hurt (hp 0 /
    // falling / thrownT). Idle tech still snaps. Tech-from-guard still block plant.
    const parrySheet = f.parryFadeSheet === "windup" ? wind
      : f.parryFadeSheet === "knife" ? (ready(knife) ? knife : wind)
      : cut;
    const parryBase = ((f.thrownT > 0 || f.falling || f.hp <= 0) && ready(hurt)) ? hurt
      : (f.techRec && f.cut === "throw" && ready(wind)) ? wind
      : idle;
    const restParry = pf > 0.02 && !restFeint && !restFeintGuard && !restFeintWalk && ready(parrySheet) && ready(parryBase) && parrySheet !== parryBase;
    // Throw / cut recovery fade leftover: >0.02 used to drop the idle base while
    // poseBitmap still held windup, so the last recovery tick flashed full grab.
    // Keep idle/walk base through any live throwPlantFade. Overlay alpha can be tiny.
    // Recovery walk-out pose leftover: leftover windup used to rest on idle while
    // A/D was held through throw recovery (gaitWalkOn false — phase locks
    // walking()), so the fade dumped standing idle then popped walk when
    // recovery ended — a hop, not a plant. Rest leftover grab on the walk
    // sheet when A/D is held. Idle throw recovery still rests on idle.
    // poseBitmap still windup while planted. AABB planted.
    // Tech interrupt leftover (v340): skip throwPlantFade rest while pf owns the
    // mid-cut → windup overlay (trf would paint full windup over leftover slash).
    const restThrowWalk = trf > 0 && !restParry && ready(wind) && recoveryWalkOut(f) && recoveryWalkResting(f) && ready(walk) && walk !== wind;
    const restThrow = trf > 0 && !restThrowWalk && !restParry && ready(wind) && ready(idle) && idle !== wind;
    // Telegraph walk-in pose leftover: leftover walk used to dump to idle the tick
    // startAttack/startThrow/startBolt armed from mid-stride (tickGait zeroed
    // walkFadeHold; restTele rested on idle), so the raise hopped walk→idle under
    // windup/knife — a hop, not a plant. Same hole walk→guard already closed for
    // block. Rest leftover walk under the telePlant raise when walkFadeHold.
    // Idle telegraph still rests on idle. poseBitmap still windup/knife
    // immediately. Walk→guard leftover unchanged. AABB planted.
    // Telegraph recovery walk-in pose leftover: leftover walk used to dump to idle the
    // tick startAttack/startThrow/startBolt armed from recovery while A/D (or rival
    // closing) was already held — recovery walk-out rested cut on walk through recovery;
    // walkFadeHold stayed 0 (phase lock); restTeleWalk only checked walkFadeHold, so the
    // buffered raise hopped walk→idle under windup/knife — a hop, not a plant. Same hole
    // link plant walk-in already closed for recoveryWalkOut. Rest leftover walk under
    // telePlant when walkFadeHold or recoveryWalkOut. Idle telegraph still rests on idle.
    // Mid-stride walkFadeHold path unchanged. Clash / holdCut / link walk-in unchanged.
    // poseBitmap still windup/knife immediately. AABB planted.
    const restTeleWalk = telegraphing(f) && tf < 0.98 && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(telePlant) && ready(walk) && walk !== telePlant;
    const restTele = telegraphing(f) && tf < 0.98 && !restTeleWalk && ready(telePlant) && ready(idle) && idle !== telePlant;
    // Feint from leftover drop: leftover block fade used to sit on the pull
    // (restGuard drew after restFeint windup). Skip when feint owns windup.
    // Guard drop walk-out pose leftover: leftover block used to rest on idle while
    // gaitWalkOn already flipped poseBitmap to walk (A/D mid-drop; rival same),
    // so the drop dumped standing idle then popped the passing sheet when fade
    // dropped under 0.02 — a hop, not a plant. Same hole feint / sheathe / wakeup
    // walk-out already closed. Rest leftover block on the walk sheet when gaitWalkOn.
    // Idle drop still rests on idle. Live walk still one opaque poseBitmap sheet
    // (no idle+walk stack). Feint-from-drop skip unchanged. destRect raise×rise
    // already ease. AABB planted.
    // Guard drop walk-out recoveryWalkOut pose leftover: leftover block used to rest on idle
    // while recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn
    // false (restGuardWalk only checked gaitWalkOn), so the drop dumped standing idle then
    // popped walk the tick gaitWalkOn flipped / closing set gait — a hop, not a plant. Same
    // hole wakeup walk-out recoveryWalkOut / feint walk-in already closed. Rest leftover
    // block on walk when gaitWalkOn or walkFadeHold or recoveryWalkOut. Idle drop still
    // rests on idle. Mid-stride gaitWalkOn path unchanged. Feint-from-drop skip unchanged.
    // poseBitmap still idle / walk. GuardDropFade clock unchanged. AABB planted.
    const restGuardWalk = gf > 0.02 && !restFeint && !restFeintGuard && !restFeintWalk && (gaitWalkOn(f) || f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(block) && ready(walk) && block !== walk;
    const restGuard = gf > 0.02 && !restFeint && !restFeintGuard && !restFeintWalk && !restGuardWalk && ready(block) && ready(idle) && idle !== block;
    // Reversal plant walk-in pose leftover: leftover walk used to dump the tick
    // startReversal armed from walk→guard / A/D / rival closing (tickGait zeroed
    // walkFadeHold on phase; restRev rested block on windup with no walk base),
    // so the reverse hopped walk→raise under the fading block — a hop, not a plant.
    // Same hole telegraph recovery / clash walk-in already closed. Rest leftover
    // block raise on walk when walkFadeHold or recoveryWalkOut. Idle guard reverse
    // still rests on windup. Walk→guard / clash / holdCut / link / telegraph walk-in
    // unchanged. poseBitmap still windup immediately. ReversalPlantFade clock unchanged.
    // AABB planted.
    const restRevWalk = rf > 0.02 && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(block) && ready(walk) && walk !== block && walk !== wind;
    const restRev = rf > 0.02 && !restRevWalk && ready(block) && ready(wind) && wind !== block;
    // Throw-from-guard plant walk-in pose leftover: leftover walk used to dump the tick
    // startThrow armed from walk→guard / A/D / rival closing (tickGait zeroed walkFadeHold
    // on phase; restThrowGuard rested block on windup with no walk base), so Space+S from
    // guarda hopped walk→raise under the fading block — a hop, not a plant. Same hole
    // reversal plant walk-in already closed. Rest leftover block raise on walk when
    // walkFadeHold or recoveryWalkOut. Idle throw-from-guard still rests on windup.
    // Tech-from-guard plant walk-in: same rest on walk (restTechGuardWalk). Reversal /
    // clash / holdCut / link / telegraph walk-in unchanged. poseBitmap still windup
    // immediately. ThrowGuardPlantFade / TechGuardPlantFade clocks unchanged. AABB planted.
    const restThrowGuardWalk = tgf > 0.02 && !restRev && !restRevWalk && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(block) && ready(walk) && walk !== block && walk !== wind;
    const restThrowGuard = tgf > 0.02 && !restRev && !restRevWalk && !restThrowGuardWalk && ready(block) && ready(wind) && wind !== block;
    const restTechGuardWalk = tecf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(block) && ready(walk) && walk !== block && walk !== wind;
    const restTechGuard = tecf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuardWalk && ready(block) && ready(wind) && wind !== block;
    // Clash walk-in pose leftover: leftover cut used to dump walk the tick clash-Space/L/K
    // armed from recovery while A/D (or rival closing) was already held — recovery walk-out
    // / holdCut / link already rested cut on walk through recovery; clashPlantFade skipped
    // sheathe and rested cut on windup/knife with no walk base, so the cancel dumped walk→raise under the fading slash — a hop, not a plant. Same hole holdCut walk-in
    // already closed for special-cancel K. Rest leftover cut raise on the walk sheet when
    // recoveryWalkOut. Idle clash plant still rests on windup/knife (poseBitmap). HoldCut /
    // link / telegraph mid-stride walkFadeHold unchanged. Telegraph recovery walk-in rests
    // separately (restTeleWalk). poseBitmap still windup/knife immediately.
    // ClashPlantFade clock unchanged. AABB planted.
    // Clash walk-in walkFadeHold pose leftover: cancelInto* cleared closing with no
    // walkFadeHold arm; tickGait zeroed walkFadeHold on phase / boltPhase; restClashWalk
    // only recoveryWalkOut — rival closing hopped walk→raise. Same hole telegraph recovery
    // / link plant already closed. Rest leftover cut raise on walk when walkFadeHold or
    // recoveryWalkOut. Rival closing clears on cancel — arm walkFadeHold so the plant holds.
    // You A/D path unchanged. HoldCut / link / telegraph walk-in unchanged.
    const restClashWalk = cf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(cut) && ready(walk) && cut !== walk && walk !== img;
    const restClash = cf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && !restClashWalk && ready(cut) && ready(boltPlant) && cut !== boltPlant;
    // Link plant sword raise leftover: leftover sheathe→windup used knife
    // (boltPlant), so Space/L/throw after sheathe faded into knife then snapped
    // windup when fade dropped under 0.02 — a hop, not a raise. Rest leftover
    // raise on linkSheet (windup when not bolt; knife on K). Idle/K still knife.
    // Clash leftover / holdCut unchanged. AABB planted.
    // Link plant walk-in pose leftover: leftover walk used to dump to idle the tick
    // startAttack/startThrow/startBolt armed from mid-stride sheathe (tickGait zeroed
    // walkFadeHold; restLink rested on idle; telegraph false on linkPlant), so the
    // raise hopped walk→idle under windup/knife — a hop, not a plant. Same hole
    // telegraph walk-in already closed for telePlant. Rest leftover walk under the
    // linkSheet raise when walkFadeHold. Idle sheathe raise still rests on idle.
    // poseBitmap still windup/knife immediately. Telegraph walk-in / clash / holdCut
    // unchanged. AABB planted.
    // HoldCut walk-in pose leftover: leftover cut used to rest on idle while A/D
    // was held through special-cancel K plant (recovery walk-out already rested
    // cut on walk through recovery; tickGait zeros walkFadeHold on boltPhase),
    // so the plant dumped walk→idle under the cut — a hop, not a plant. Same
    // hole link plant from recovery (restLinkWalk only walkFadeHold). Rest
    // leftover cut / link raise on walk when recoveryWalkOut. Idle plant still rests on idle.
    // Telegraph / link mid-stride walkFadeHold unchanged. Clash walk-in rests separately.
    // poseBitmap still slash / windup. AABB planted.
    // HoldCut walk-in walkFadeHold pose leftover: cancelIntoBolt cleared closing with no
    // walkFadeHold arm on the holdCut branch; tickGait zeroed walkFadeHold on boltPhase;
    // restHoldCutWalk only recoveryWalkOut — rival closing hopped walk→idle. Same hole
    // clash walk-in walkFadeHold already closed. Rest leftover cut raise on walk when
    // walkFadeHold or recoveryWalkOut. Rival closing clears on cancel — arm walkFadeHold
    // so the plant holds. You A/D path unchanged. Clash / link / telegraph walk-in unchanged.
    const restLinkWalk = lf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && !restClash && !restClashWalk && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(linkSheet) && ready(walk) && walk !== linkSheet;
    const restLink = lf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && !restClash && !restClashWalk && !restLinkWalk && ready(linkSheet) && ready(idle) && idle !== linkSheet;
    const restHoldCutWalk = hf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && !restClash && !restClashWalk && !restLink && !restLinkWalk && (f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(cut) && ready(walk) && walk !== cut;
    const restHoldCut = hf > 0.02 && !restRev && !restRevWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restTele && !restClash && !restClashWalk && !restLink && !restLinkWalk && !restHoldCutWalk && ready(cut) && ready(idle) && idle !== cut;
    // Sheathe walk-out pose leftover: leftover slash used to rest on idle while
    // gaitWalkOn already flipped poseBitmap to walk (A/D mid-sheathe; rival same —
    // sheathing() skips walk), so the sheathe dumped standing idle then popped
    // the passing sheet when fade hit 0 — a hop, not a plant. Rest leftover
    // slash on the walk sheet when gaitWalkOn. Idle sheathe still rests on idle.
    // Sheathe→guard unchanged (block once guarding). Live walk still one opaque
    // poseBitmap sheet (no idle+walk stack). Recovery walk-out pose leftover:
    // slash/golpe recovery fade also rests on walk when A/D is held through
    // recovery (gaitWalkOn false while phase locks walking()). Idle recovery
    // still rests on idle. Keep idle/walk base through any live sheatheFade
    // (> 0); tiny slash overlay stays skipped.
    // Sheathe walk-out recoveryWalkOut pose leftover: leftover slash used to rest on idle while
    // recoveryWalkOut (A/D early-step / rival closing) was already armed but gaitWalkOn false
    // (restSheatheWalk only checked gaitWalkOn||recoveryWalkResting — idle sheathe is not
    // recovery), so the sheathe dumped standing idle then popped walk the tick gaitWalkOn
    // flipped / closing set gait — a hop, not a plant. Same hole wakeup walk-out
    // recoveryWalkOut / guard drop walk-out recoveryWalkOut already closed. Rest leftover
    // slash on walk when gaitWalkOn or walkFadeHold or recoveryWalkOut. Idle sheathe still
    // rests on idle. Mid-stride gaitWalkOn path unchanged. Recovery A/D path unchanged
    // (recoveryWalkOut covers it). Sheathe→guard unchanged. poseBitmap still idle / walk.
    // SheatheFade clock unchanged. AABB planted.
    const restSheatheWalk = fade > 0 && !f.guarding && (gaitWalkOn(f) || f.walkFadeHold > 0.02 || recoveryWalkOut(f)) && ready(cut) && ready(walk) && cut !== walk;
    const restSheathe = fade > 0 && !f.guarding && !restSheatheWalk && ready(cut) && ready(idle) && idle !== cut;
    if (restWalk) {
      octx.drawImage(idle, 0, 0, dw, dh);
      octx.globalAlpha = wf;
      octx.drawImage(walk, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    } else if (restWakeGuardWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restWakeRevWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restWakeWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restWake) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restBoltWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restBolt) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restFeintWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restFeint) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restParry) {
      // Throw interrupt leftover (v339): hurt base when thrownT; idle base on stun/parry.
      octx.drawImage(parryBase, 0, 0, dw, dh);
    } else if (restThrowWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restThrow) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restTeleWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restTele) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restGuardWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restGuard) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restRevWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restThrowGuardWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restTechGuardWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restClashWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restLinkWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restLink) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restHoldCutWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restHoldCut) {
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (restSheatheWalk) {
      octx.drawImage(walk, 0, 0, dw, dh);
    } else if (restSheathe) {
      // Sheathe→guard leftover: guarding mid-sheathe keeps leftover slash on
      // the block sheet (poseBitmap already block). Idle sheathe still rests on idle.
      // Sheathe walk-out pose leftover: gaitWalkOn rests on walk (restSheatheWalk).
      // Recovery walk-out pose leftover: A/D mid-recovery rests on walk (restSheatheWalk).
      // Throw / cut recovery fade leftover: >0.02 used to drop this idle base while
      // poseBitmap still held slash, so the last recovery tick flashed full cut.
      // Keep idle base through any live sheatheFade; tiny slash overlay stays skipped.
      octx.drawImage(idle, 0, 0, dw, dh);
    } else if (recoveryWalkOut(f) && recoveryWalkResting(f) && f.stunT > 0 && ready(walk)) {
      // Recovery walk-out pose leftover: chip stun used to keep idle while A/D
      // was held (gaitWalkOn false — stun locks walking()), so stun end popped
      // idle→walk — a hop, not a plant. Rest on walk when A/D is held through
      // chip stun. Rival recovery walk-out: same rest when closing (you-only
      // recoveryWalkOut used to skip rival). Idle stun still rests on idle.
      // poseBitmap still idle.
      octx.drawImage(walk, 0, 0, dw, dh);
    } else {
      octx.drawImage(img, 0, 0, dw, dh);
    }
    if (restWalkGuard && !restWakeGuardWalk) {
      octx.globalAlpha = wf;
      octx.drawImage(walk, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (fade > 0.02 && ready(cut) && !restClash && !restClashWalk && !restLink && !restLinkWalk && !restHoldCut && !restHoldCutWalk && !restThrowGuard && !restThrowGuardWalk && !restTechGuard && !restTechGuardWalk && !restRev && !restRevWalk) {
      octx.globalAlpha = fade;
      octx.drawImage(cut, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restBolt || restBoltWalk) {
      octx.globalAlpha = bf;
      octx.drawImage(boltPlant, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restFeint || restFeintGuard || restFeintWalk) {
      octx.globalAlpha = ff;
      octx.drawImage(wind, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restParry) {
      octx.globalAlpha = pf;
      octx.drawImage(parrySheet, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restThrow || restThrowWalk) {
      octx.globalAlpha = trf;
      octx.drawImage(wind, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restTele || restTeleWalk) {
      octx.globalAlpha = tf;
      octx.drawImage(telePlant, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restWakeGuardWalk) {
      // Wakeup→guard walk-in: base is walk; block raise under leftover crumple.
      octx.drawImage(block, 0, 0, dw, dh);
    }
    if (restWakeRevWalk) {
      // Wakeup→reversal walk-in: base is walk; windup raise under leftover crumple.
      octx.drawImage(wind, 0, 0, dw, dh);
    }
    if (restWake || restWakeGuard || restWakeGuardWalk || restWakeRev || restWakeWalk || restWakeRevWalk) {
      octx.globalAlpha = wake;
      octx.drawImage(hurt, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restGuard || restGuardWalk) {
      octx.globalAlpha = gf;
      octx.drawImage(block, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restRevWalk) {
      // Reversal plant walk-in: base is walk; windup raise under leftover block.
      octx.drawImage(wind, 0, 0, dw, dh);
    }
    if (restRev || restRevWalk) {
      octx.globalAlpha = rf;
      octx.drawImage(block, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restThrowGuardWalk) {
      // Throw-from-guard plant walk-in: base is walk; windup raise under leftover block.
      octx.drawImage(wind, 0, 0, dw, dh);
    }
    if (restThrowGuard || restThrowGuardWalk) {
      octx.globalAlpha = tgf;
      octx.drawImage(block, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restTechGuardWalk) {
      // Tech-from-guard plant walk-in: base is walk; windup raise under leftover block.
      octx.drawImage(wind, 0, 0, dw, dh);
    }
    if (restTechGuard || restTechGuardWalk) {
      octx.globalAlpha = tecf;
      octx.drawImage(block, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restClashWalk) {
      // Clash walk-in: base is walk; ease poseBitmap raise in as leftover cut fades out.
      octx.globalAlpha = 1 - cf;
      octx.drawImage(img, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restClash || restClashWalk) {
      octx.globalAlpha = cf;
      octx.drawImage(cut, 0, 0, dw, dh);
      octx.globalAlpha = 1;
    }
    if (restLink || restLinkWalk) {
      octx.globalAlpha = 1 - lf;
      octx.drawImage(linkSheet, 0, 0, dw, dh);
      octx.globalAlpha = 1;
      const sk = Math.max(0, (f.linkSheathe || 0) * lf);
      if (sk > 0.02 && ready(cut)) {
        octx.globalAlpha = sk;
        octx.drawImage(cut, 0, 0, dw, dh);
        octx.globalAlpha = 1;
      }
    }
    if (restHoldCut || restHoldCutWalk) {
      const sk = 1 - hf * (1 - (f.linkSheathe || 0));
      if (sk > 0.02 && ready(cut)) {
        octx.globalAlpha = sk;
        octx.drawImage(cut, 0, 0, dw, dh);
        octx.globalAlpha = 1;
      }
    }
    const fk = hurtFlashK(f);
    if (fk > 0) {
      octx.globalCompositeOperation = "source-atop";
      octx.fillStyle = "rgba(255, 245, 238, " + (0.72 * fk) + ")";
      octx.fillRect(0, 0, off.width, off.height);
      octx.globalCompositeOperation = "source-over";
    }
    ctx.save();
    const prevSmooth = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;
    ctx.translate(pivX, pivY);
    ctx.rotate(rot);
    // CID/ROAN you-family P2 facing flip leftover (v450): flip about foot.
    if (sheetFlipX(f)) ctx.scale(-1, 1);
    ctx.translate(-pivX, -pivY);
    ctx.drawImage(off, dx, dy, dw, dh);
    ctx.imageSmoothingEnabled = prevSmooth;
    ctx.restore();
  }

  const HUD_BAR_W = 252;
  const HUD_BAR_H = 18;
  const HUD_STAM_H = 7;
  const HUD_METER_W = 48;
  const HUD_METER_H = 5;
  const HUD_Y = 18;
  const HUD_PAD = 22;
  const HUD_FRAME = 3;
  const COL_PIZARRA = "#3a342c";
  const COL_OXIDO = "#8a4a28";
  const COL_BRASA = "#c42818";
  const COL_HUESO = "#cfc3a8";
  const COL_NEGRO = "#0c0a08";

  function tickHudBar(f, dt) {
    // HP drain flash ↔ punchCover (v331): linear hudFlashT used to start
    // draining the tick freeze ended while punchCover still held full, so the
    // brasa ghost flash died on its own clock — not with cover. Hold through
    // the live punch; clear when cover dies (ghost drain waits on T=0).
    // No-punch still linear. Freeze already held the clock.
    if (f.hudFlashT > 0) {
      if (shake > 0 && shakeDur > 0) {
        /* hold through live cover */
      } else if (shakeDur > 0 && f.hudFlashT >= HUD_FLASH_MS - 0.5) {
        // Was held at peak through slam; cover just died — die with it.
        f.hudFlashT = 0;
      } else {
        f.hudFlashT = Math.max(0, f.hudFlashT - dt);
      }
    } else if (f.hudGhost > f.hp) f.hudGhost = Math.max(f.hp, f.hudGhost - 80 * (dt / 1000));
    else f.hudGhost = f.hp;
    // Stamina chunk spend leftover (v378): mirror hudFlash hold-through-punch.
    // Ghost drain waits on stamFlashT=0. Hold-drain never arms the clock.
    if (f.stamFlashT > 0) {
      if (shake > 0 && shakeDur > 0) {
        /* hold through live cover */
      } else if (shakeDur > 0 && f.stamFlashT >= HUD_FLASH_MS - 0.5) {
        f.stamFlashT = 0;
      } else {
        f.stamFlashT = Math.max(0, f.stamFlashT - dt);
      }
    } else if (f.stamGhost > f.stamina) f.stamGhost = Math.max(f.stamina, f.stamGhost - 80 * (dt / 1000));
    else f.stamGhost = f.stamina;
    // Meter fill ↔ punchCover (v324): linear meterFlashT / meterGainT used to
    // start draining the tick freeze ended while punchCover still held full,
    // so the pip flash died on its own clock — not with cover. Hold fill-to-full
    // + gain clocks through the live punch; clear when cover dies (no linear
    // pop after the draw envelope eases out). Spend flash stays linear.
    // No-punch (synthetic gain / menu) still linear. Freeze already held clocks.
    if (f.meterFlashT > 0) {
      if (f.meterFlashKind === "full" && shake > 0 && shakeDur > 0) {
        /* hold through live cover */
      } else if (f.meterFlashKind === "full" && shakeDur > 0 && f.meterFlashT >= METER_FLASH_MS - 0.5) {
        // Was held at peak through slam; cover just died — die with it.
        f.meterFlashT = 0;
        f.meterFlashKind = "";
      } else {
        f.meterFlashT = Math.max(0, f.meterFlashT - dt);
        if (f.meterFlashT <= 0) f.meterFlashKind = "";
      }
    } else f.meterFlashKind = "";
    if (f.meterGainT > 0) {
      if (shake > 0 && shakeDur > 0) {
        /* hold through live cover */
      } else if (shakeDur > 0 && f.meterGainT >= METER_GAIN_MS - 0.5) {
        f.meterGainT = 0;
      } else {
        f.meterGainT = Math.max(0, f.meterGainT - dt);
      }
    }
    // Combo ↔ punchCover (v331): clock still ages (rise); draw envelope via
    // comboK. Clear punch mark when the count dies.
    if (f.comboT > 0) f.comboT = Math.max(0, f.comboT - dt);
    if (f.comboT <= 0) f.comboPunch = false;
  }

  function hudBarX(left) {
    return left ? HUD_PAD : W - HUD_PAD - HUD_BAR_W;
  }

  function fillFrom(left, x, y, w, h, k) {
    const fw = w * Math.max(0, Math.min(1, k));
    if (left) ctx.fillRect(x, y, fw, h);
    else ctx.fillRect(x + w - fw, y, fw, h);
  }

  function drawHudFrame(x, y, w, h) {
    const fr = HUD_FRAME;
    ctx.fillStyle = COL_PIZARRA;
    ctx.fillRect(x - fr, y - fr, w + fr * 2, h + fr * 2);
    ctx.fillStyle = COL_HUESO;
    ctx.globalAlpha = 0.32;
    ctx.fillRect(x - fr, y - fr, w + fr * 2, 1);
    ctx.fillRect(x - fr, y - fr, 1, h + fr * 2);
    ctx.globalAlpha = 1;
    ctx.fillStyle = COL_NEGRO;
    ctx.fillRect(x - fr, y + h + fr - 1, w + fr * 2, 1);
    ctx.fillRect(x + w + fr - 1, y - fr, 1, h + fr * 2);
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = COL_PIZARRA;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(x, y, w, 2);
    ctx.globalAlpha = 1;
  }

  function drawLifeBar(f, left) {
    const x = hudBarX(left);
    const y = HUD_Y;
    const w = HUD_BAR_W;
    const h = HUD_BAR_H;
    const fill = f.hp / MAX_HP;
    const ghost = f.hudGhost / MAX_HP;
    drawHudFrame(x, y, w, h);
    if (ghost > fill) {
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.75;
      fillFrom(left, x, y, w, h, ghost);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = COL_HUESO;
    fillFrom(left, x, y, w, h, fill);
    if (fill > 0) {
      const shine = w * Math.max(0, Math.min(1, fill));
      const hx = left ? x : x + w - shine;
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(hx, y + 1, shine, 2);
      ctx.globalAlpha = 1;
    }
    if (f.hudFlashT > 0 && ghost > fill) {
      // HP drain flash ↔ punchCover (v331): cover envelope via hudFlashK.
      const k = hudFlashK(f);
      const x0 = left ? x + w * fill : x + w - w * ghost;
      const fw = w * (ghost - fill);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.85 * k;
      ctx.fillRect(x0, y, fw, h);
      ctx.globalAlpha = 1;
    }

    const sy = y + h + HUD_FRAME + 4;
    const sh = HUD_STAM_H;
    const stam = f.stamina / STAMINA_MAX;
    const stamGhost = (f.stamGhost || 0) / STAMINA_MAX;
    const floor = STAMINA_START_MIN / STAMINA_MAX;
    drawHudFrame(x, sy, w, sh);
    // Stamina chunk spend leftover (v378): óxido ghost behind live fill (mirror HP).
    if (stamGhost > stam && f.guardBreakT <= 0) {
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.55;
      fillFrom(left, x, sy, w, sh, stamGhost);
      ctx.globalAlpha = 1;
    }
    if (stam > 0 || f.guardBreakT > 0) {
      // Guard-break readability leftover (v364): dead dim used to seat with no
      // birth tick, so shatter vs quiet chip-empty looked the same on the bar.
      // Brief brasa pulse while break is young; then the locked 0.32 dead look.
      const breakBirth = f.guardBreakT > GUARD_BREAK_MS - 90
        ? (f.guardBreakT - (GUARD_BREAK_MS - 90)) / 90
        : 0;
      ctx.fillStyle = f.guardBreakT > 0 ? COL_BRASA : COL_OXIDO;
      if (f.guardBreakT > 0) ctx.globalAlpha = 0.32 + 0.55 * breakBirth;
      else if (stam < floor) ctx.globalAlpha = 0.32;
      const fillStam = f.guardBreakT > 0 ? Math.max(stam, floor * 0.55) : stam;
      if (fillStam > 0) fillFrom(left, x, sy, w, sh, fillStam);
      ctx.globalAlpha = 1;
    }
    if (f.stamFlashT > 0 && stamGhost > stam && f.guardBreakT <= 0) {
      // Stamina chunk spend leftover (v378): brasa bite on the drained chunk.
      const sk = stamFlashK(f);
      const x0 = left ? x + w * stam : x + w - w * stamGhost;
      const fw = w * (stamGhost - stam);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.80 * sk;
      ctx.fillRect(x0, sy, fw, sh);
      ctx.globalAlpha = 1;
    }
    const tx = Math.round(left ? x + w * floor : x + w * (1 - floor));
    ctx.fillStyle = COL_HUESO;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(tx, sy, 1, sh);
    ctx.globalAlpha = 1;

    const mw = HUD_METER_W;
    const mh = HUD_METER_H;
    const my = sy + sh + HUD_FRAME + 4;
    const mx = left ? x : x + w - mw;
    const k = Math.max(0, Math.min(1, (f.meter || 0) / METER_MAX));
    drawHudFrame(mx, my, mw, mh);
    if (k > 0) {
      ctx.fillStyle = k >= 1 ? COL_BRASA : COL_OXIDO;
      fillFrom(left, mx, my, mw, mh, k);
    }
    const mf = meterFlashK(f);
    const mg = meterGainK(f);
    const mKind = f.meterFlashKind || "";
    // Meter / combo feedback: brief fill pulse on gain (scale/glow). Partial
    // stays quiet on meterFlashT; pulse rides meterGainT. Palette
    // pizarra/óxido/brasa/hueso. Does not touch HP/stam geometry.
    // Combo / meter HUD clarity leftover (v362): gain used soft 1px grow + weak
    // brasa over óxido, so +20/+10 fills read as a tint, not a pip tick. Draw-only.
    if (mg > 0 && k > 0) {
      const grow = 1 + Math.round(mg * 2);
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.48 * mg;
      fillFrom(left, mx, my - grow, mw, mh + grow * 2, k);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.68 * mg;
      fillFrom(left, mx, my, mw, mh, k);
      // Óxido lip at the live tip so brasa gain contrasts the charging fill.
      if (k < 1) {
        const lip = Math.max(2, Math.round(3 * mg));
        const tipX = left ? mx + Math.round(mw * k) - lip : mx + mw - Math.round(mw * k);
        ctx.fillStyle = COL_OXIDO;
        ctx.globalAlpha = 0.62 * mg;
        ctx.fillRect(tipX, my, lip, mh);
      }
      ctx.globalAlpha = 1;
    }
    // Meter fill flash leftover: full pip used to pop with no pulse
    // (pk forced to 1 while full; meterFlashK hard-zeroed). Spend still
    // flashes the empty pip. Fill pulses the well over the solid stock.
    const pk = k >= 1 ? 1 : mf;
    if (pk > 0) {
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.95 * pk;
      const pip = 5;
      ctx.fillRect(left ? mx + mw - pip : mx, my, pip, mh);
      ctx.globalAlpha = 1;
    }
    if (k >= 1 && mf > 0) {
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.55 * mf;
      fillFrom(left, mx, my, mw, mh, 1);
      ctx.globalAlpha = 1;
    }
    // Stock-complete sting: distinct full-pip hueso flash over the well.
    // Clarity (v362): soft outer pulse so stock-complete reads vs quiet full idle.
    if (k >= 1 && mf > 0 && mKind === "full") {
      const beat = 0.70 + 0.30 * Math.abs(Math.sin(mf * Math.PI));
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.78 * mf * beat;
      fillFrom(left, mx, my - 1, mw, mh + 2, 1);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.90 * mf * beat;
      const tip = 8;
      ctx.fillRect(left ? mx + mw - tip : mx, my - 1, tip, mh + 2);
      ctx.globalAlpha = 1;
    }
    // Spend bite: shrinking remnant (not tip pop-off) + óxido lip.
    // Clarity (v362): thicker óxido lip + brighter remnant so spend empties readable.
    if (k < 1 && mf > 0 && mKind === "spend") {
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.92 * mf;
      fillFrom(left, mx, my, mw, mh, mf);
      const edge = Math.max(2, Math.round(mw * mf));
      const lip = 4;
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.85 * mf;
      if (left) ctx.fillRect(mx + edge - lip, my, lip, mh);
      else ctx.fillRect(mx + mw - edge, my, lip, mh);
      ctx.globalAlpha = 1;
    }
    // Especial stock ready linger leftover (v392): quiet full after stock-complete
    // flash used to sit solid with no ready breath — especial unread vs charging
    // óxido / vs flash. Soft tip-pip breath while full and flash dead (stock-
    // complete / spend still own mf). Quieter than fill flash so contrast kept.
    if (k >= 1 && mf <= 0) {
      const breath = 0.55 + 0.45 * Math.abs(Math.sin(((modeT + (left ? 0 : 420)) / 980) * Math.PI));
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.18 * breath;
      fillFrom(left, mx, my - 1, mw, mh + 2, 1);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.32 * breath;
      const tip = 6;
      ctx.fillRect(left ? mx + mw - tip : mx, my - 1, tip, mh + 2);
      ctx.globalAlpha = 1;
    }
    // Versus HUD P2 leftover (v432): seat tags when local 2P — CPU bars stay
    // unlabeled. Draw-only. Palette hueso. Does not obscure HP/stam.
    // Second fighter stub / CID unlock leftover (v442): roster nameplates so
    // ELEGIR (ROAN/CID) reads in-match. Versus keeps P1/P2 prefix.
    {
      const entry = rosterEntry(f.fighterId);
      const name = entry ? entry.label : "";
      let lab = name;
      if (matchKind === "versus") lab = (left ? "P1" : "P2") + (name ? " " + name : "");
      if (lab) {
        ctx.save();
        ctx.globalAlpha = 0.70;
        drawPixelText(lab, left ? x : x + w, y - 7, 1, COL_HUESO, left ? "left" : "right");
        ctx.restore();
      }
    }
  }

  function controlsHintLines() {
    // Remap-aware teach lines (BIND_ACTIONS via bindPrimary + codeLabel).
    // Two short pixel rows — no card, no Palatino. Keyboard labels; pad has its own stamps.
    const a = codeLabel(bindPrimary("left"));
    const d = codeLabel(bindPrimary("right"));
    const g = codeLabel(bindPrimary("guard"));
    const s = codeLabel(bindPrimary("slash"));
    const l = codeLabel(bindPrimary("golpe"));
    const k = codeLabel(bindPrimary("dart"));
    // Teach / CONTROLES clarity leftover (v379): PARRY used hard-coded S while
    // AGARRE/REV already followed remapped guard — wrong key after remap.
    return [
      a + "/" + d + " ANDAR  " + g + " GUARDA  " + s + " TAJO  " + l + " GOLPE  " + k + " DARDO",
      g + " AL FILO PARRY>" + s + "/" + l + " RIPOSTE  " + s + "+" + g + " AGARRE  " + g + "+" + l + " REV",
    ];
  }

  function drawControlsHint() {
    if (mode === "title" || mode === "over") return;
    if (hintDone && hintFade <= 0) return;
    const inn = Math.max(0, Math.min(1, hintIn / HINT_IN_MS));
    const out = hintFade > 0 ? hintFade / HINT_FADE_MS : 1;
    const a = 0.68 * inn * out;
    if (a <= 0.01) return;
    const lines = controlsHintLines();
    ctx.save();
    ctx.globalAlpha = a;
    drawPixelText(lines[0], W / 2, H - 52, 2, "#a89b88", "center");
    drawPixelText(lines[1], W / 2, H - 32, 2, "#a89b88", "center");
    ctx.restore();
  }

  function drawRiposteHint() {
    // Riposte window readability leftover (v360): perfect-parry RIPOSTE_WIN used
    // to leave only a tiny floating bang after PARRY_GLEAM died at 80ms, so the
    // leftover ~200ms reward window went unread once tip gleam faded. Draw-only (drawRiposteHint).
    // Soft brasa chest ring + remap teach pulse ride the full 280ms window; bang kept.
    // RIPOSTE_WIN_MS 280 / PARRY_GLEAM_MS 80 / frames locked. No new combat verb.
    // Tasteful floating bang while riposte window is live (pizarra/brasa).
    // Pixel bars — no title-card font (title stays drawPixelText / FONT5).
    if (!player || player.riposteWindowT <= 0 || mode !== "play") return;
    const k = Math.min(1, player.riposteWindowT / RIPOSTE_WIN_MS);
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.38;
    // Two soft beats across the window so the win reads as a clock, not a sticky.
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin((1 - k) * Math.PI * 2));
    ctx.save();
    // Soft expanding brasa gleam-ring around chest — lasts full window (not 80ms tip gleam).
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = (0.16 + 0.32 * k) * pulse;
    ctx.strokeStyle = COL_BRASA;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(cx, cy, 16 + 12 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(cx, cy, 12 + 8 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    // Tiny tip-side mote so ring + bang share the same brasa family as parry gleam.
    ctx.globalAlpha = 0.45 * k * pulse;
    ctx.fillStyle = "#ffb060";
    ctx.fillRect(cx + bb.w * 0.28 * (player.facing || 1) - 2, bb.y + 8, 4, 4);
    ctx.globalCompositeOperation = "source-over";
    const x = cx;
    const y = bb.y - 22 - (1 - k) * 6;
    ctx.globalAlpha = (0.45 + 0.50 * k) * (0.7 + 0.3 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 2, y - 14, 4, 12);
    ctx.fillRect(x - 2, y + 2, 4, 4);
    ctx.globalAlpha = 0.28 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 2, y - 15, 4, 12);
    ctx.fillRect(x - 2, y + 1, 4, 4);
    // Teach cue: remap-aware Space/L under bang while window is live.
    {
      const sLab = codeLabel(bindPrimary("slash"));
      const lLab = codeLabel(bindPrimary("golpe"));
      ctx.globalAlpha = (0.30 + 0.45 * k) * pulse;
      drawPixelText(sLab + "/" + lLab, x, y + 16, 1, COL_HUESO, "center");
    }
    ctx.restore();
  }

  function drawCancelHint() {
    // Hit-confirm / late-recovery cancel teach cue leftover (v381): connected last-100ms
    // cancel doors (tajo→golpe / golpe→tajo / cut→K) and clash late Space/L/K used to open
    // with no draw teach — only RIPOSTE_WIN had a live remap cue (v360), so hit-confirm /
    // late-recovery / clash-cancel windows stayed unread until the sting fired. Draw-only (drawCancelHint).
    // Soft tip-side pulse + remap-aware labels while any cancel window is
    // live; Clash-K listed first so dart priority reads. Riposte hint still owns its window.
    // Whiff silent. SLASH/GOLPE/BOLT_CANCEL_MS 100 / frames locked. No new combat verb.
    // Hit-confirm cancel teach K-first leftover (v385): non-clash teach listed Space/L
    // before K while v383 already yields same-frame Space/L to special-cancel K — teach
    // lied like pre-v382 clash. List K first whenever cut→K is live (hit-confirm + clash);
    // Clash-K listed first kept; Space/L-only doors unchanged. Draw-only.
    // Special-cancel teach K brasa leftover (v387): joined K/Space/L used one hueso
    // label so dart read as a normal cancel. Leading K COL_BRASA; Space/L hueso.
    if (!player || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    // Throw-tech window owns the silhouette while rival grab startup is live.
    if (rival && throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    // REV / pushblock door owns the silhouette while meaty Space/L vs hold-guard (v390/v421).
    if (meatyMeleeAtPlayerGuard() && player.stamina >= PUSHBLOCK_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Wakeup REV window owns the silhouette (same gates as drawWakeReversalHint).
    if (meatyMeleeAtPlayerWake() && player.stamina >= REVERSAL_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Open meaty PARRY door owns the silhouette (same gates as drawParryHint) (v422).
    if (meatyMeleeAtPlayerOpen()
      && player.phase === "idle" && !player.boltPhase
      && player.stamina >= STAMINA_START_MIN
      && player.feintT <= 0
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    const winL = slashToGolpeWindow(player);
    const winS = golpeToSlashWindow(player);
    const winK = cutToBoltWindow(player);
    if (!winL && !winS && !winK) return;
    const left = Math.max(0, cutRecovery(player) - player.phaseT);
    const winMs = player.clashRec
      ? BOLT_CANCEL_MS
      : (player.cut === "golpe" ? GOLPE_CANCEL_MS : SLASH_CANCEL_MS);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across the short 100ms door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const parts = [];
    // Clash-K / hit-confirm K keep priority — teach dart first so the door is not unread as Space/L.
    // Clash-K listed first (v381); hit-confirm special-cancel K listed first too (v385).
    if (winK) parts.push(codeLabel(bindPrimary("dart")));
    if (winS) parts.push(codeLabel(bindPrimary("slash")));
    if (winL) parts.push(codeLabel(bindPrimary("golpe")));
    if (!parts.length) return;
    // Special-cancel teach K brasa leftover (v387): joined K/Space/L used one hueso
    // string so dart read as a normal cancel. Leading K (winK; always first) is
    // COL_BRASA; Space/L + "/" stay COL_HUESO. Layout still centered via pixelTextWidth.
    const label = parts.join("/");
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.22;
    const face = player.facing || 1;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Tip-side mote (not chest bang) — distinct from riposte / parry gleam family size.
    ctx.globalAlpha = (0.18 + 0.34 * k) * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(cx + bb.w * 0.34 * face, cy, 7 + 5 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.22 * k * pulse;
    ctx.strokeStyle = COL_BRASA;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx + bb.w * 0.34 * face, cy, 11 + 6 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    const x = cx;
    const y = bb.y - 18 - (1 - k) * 4;
    // Small chevron (shorter than riposte bang) so cancel ≠ riposte.
    ctx.globalAlpha = (0.40 + 0.45 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 2, y - 8, 4, 7);
    ctx.fillRect(x - 2, y + 2, 4, 3);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 2, y - 9, 4, 7);
    ctx.fillRect(x - 2, y + 1, 4, 3);
    ctx.globalAlpha = (0.32 + 0.48 * k) * pulse;
    let cursor = Math.round(x - pixelTextWidth(label, 1) / 2);
    const ty = y + 14;
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        drawPixelText("/", cursor, ty, 1, COL_HUESO, "left");
        cursor += pixelTextWidth("/", 1);
      }
      // winK pushes dart first (v385) — leading glyph is the special-cancel door.
      const col = (winK && i === 0) ? COL_BRASA : COL_HUESO;
      drawPixelText(parts[i], cursor, ty, 1, col, "left");
      cursor += pixelTextWidth(parts[i], 1);
    }
    ctx.restore();
  }

  function drawComboCount(f) {
    // Combo / meter HUD clarity leftover (v362): 2+ combo count used to sit as a
    // flat hueso glyph at fixed scale 2 with no birth pulse / brasa accent, so
    // mid-exchange connects read as a quiet stamp against the yard — not a
    // readable hit chain. Draw-only (drawComboCount). Birth scale punch (3→2)
    // + soft brasa ghost under live hueso; comboK still owns cover alpha; rise
    // still ages on linear comboT. First connect silent. COMBO_SHOW_MS 640 /
    // punchCover envelopes locked. No new combat verb.
    // Cancel / combo HUD clarity leftover (v384): 2+ combo stamp used to stack on the
    // same chest x as the live cancel teach (~10px) during hit-confirm / clash late
    // doors, so the actionable cancel cue and the combo count muddied each other —
    // riposte already owns cancel (v381), but combo never yielded. Draw-only: while
    // any cancel door is live (and riposte is not owning), skip the player combo
    // stamp; comboT still ages; rival unchanged.
    // Cancel-resolve combo HUD leftover (v386): after taking a cancel door, the 2+
    // combo stamp used to pop back at birth scale over the live link/clash/holdCut
    // plant raise the same tick the cancel teach vanished — v384 yielded only while
    // the window was open. Also yield while linkPlantFade / clashPlantFade /
    // holdCutFade > 0; comboT still ages; rival unchanged.
    // Cancel-resolve combo birth leftover (v388): fade dies over GUARD_RAISE_MS while
    // planting flags stay true through full startup — stamp re-popped birth scale 3
    // over live cancel startup after the plant raise. Also yield while
    // linkPlanting / clashPlanting / holdCutPlanting; fade yield kept.
    // Sparse pixel combo on 2+ connects. Near the attacker, fades fast.
    // Scale 2 — not SF-style huge. Palette hueso over negro outline.
    // Does not sit on HP/stam / teach HUD.
    // Combo ↔ punchCover (v331): cover envelope via comboK (alpha). Rise
    // still ages on linear comboT.
    if (!f || f.comboN < 2 || f.comboT <= 0 || mode !== "play") return;
    // Cancel window + cancel-resolve plant own the silhouette (riposte already owns cancel).
    if (f === player && player.riposteWindowT <= 0) {
      // Throw-tech window owns the silhouette (same gates as drawThrowTechHint).
      if (rival && throwTechWindow(rival) && throwInRange()
        && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
        && !(player.phase === "active" && player.cut !== "throw")) return;
      // REV / pushblock door owns the silhouette (v390/v421).
      if (meatyMeleeAtPlayerGuard() && player.stamina >= PUSHBLOCK_STAM
        && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
      // Wakeup REV window owns the silhouette (same gates as drawWakeReversalHint).
      if (meatyMeleeAtPlayerWake() && player.stamina >= REVERSAL_STAM
        && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
      // Open meaty PARRY door owns the silhouette (same gates as drawParryHint) (v422).
      if (meatyMeleeAtPlayerOpen()
        && player.phase === "idle" && !player.boltPhase
        && player.stamina >= STAMINA_START_MIN
        && player.feintT <= 0
        && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
      // Feint window owns the silhouette (same gates as drawFeintHint).
      if (canFeint(player)) return;
      if (slashToGolpeWindow(player) || golpeToSlashWindow(player) || cutToBoltWindow(player)) return;
      // Plant fades die over GUARD_RAISE_MS; planting flags stay true through full startup.
      if (linkPlantFade(player) > 0 || clashPlantFade(player) > 0 || holdCutFade(player) > 0) return;
      // Cancel-resolve combo birth leftover (v388): also yield through full cancel startup.
      if (linkPlanting(player) || clashPlanting(player) || holdCutPlanting(player)) return;
    }
    const u = Math.min(1, f.comboT / COMBO_SHOW_MS);
    const fade = comboK(f);
    const bb = bodyAABB(f);
    const x = bb.x + bb.w * 0.5;
    const y = bb.y - 28 - (1 - u) * 10;
    // Birth punch: scale 3 while clock is still in the first ~30% from arm
    // (u near 1); rest stays 2 — not SF-huge.
    const birth = Math.max(0, Math.min(1, (u - 0.70) / 0.30));
    const scale = birth > 0.35 ? 3 : 2;
    const pulse = 0.72 + 0.28 * birth;
    ctx.save();
    // Brasa underglow ghost — contrast vs yard / óxido HUD; live glyph stays hueso.
    ctx.globalAlpha = (0.20 + 0.30 * fade) * pulse;
    drawPixelText(String(f.comboN | 0), x, y + 1, scale, COL_BRASA, "center");
    ctx.globalAlpha = (0.55 + 0.40 * fade) * pulse;
    drawPixelText(String(f.comboN | 0), x, y, scale, COL_HUESO, "center");
    ctx.restore();
  }


  function drawThrowTechHint() {
    // Throw-tech window readability leftover (v389): rival throw startup used to open
    // with no draw teach — only RIPOSTE_WIN (v360) and cancel doors (v381) had live
    // remap cues, so the Space+S tech door stayed unread until the sting fired.
    // Draw-only (drawThrowTechHint). Soft defender pulse + remap-aware slash+guard
    // chord while throwTechWindow(rival) && in-range && player can tech. Riposte still
    // owns its window; cancel teach yields to tech. Out-of-range / active-mash / KD
    // silent. THROW_TECH_MS 80 / THROW_STARTUP 80 / THROW_TECH_REC 160 / THROW_RANGE
    // 120 / frames / tipX / plants / pad locked. No new combat verb.
    if (!player || !rival || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (!throwTechWindow(rival)) return;
    if (!throwInRange()) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    if (player.phase === "active" && player.cut !== "throw") return;
    const left = Math.max(0, THROW_STARTUP - rival.phaseT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, THROW_STARTUP)));
    // One soft beat across the short 80ms door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const sLab = codeLabel(bindPrimary("slash"));
    const gLab = codeLabel(bindPrimary("guard"));
    const label = sLab + "+" + gLab;
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.36;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft defender ring — smaller than riposte chest gleam, tech hueso/brasa family.
    ctx.globalAlpha = (0.14 + 0.30 * k) * pulse;
    ctx.strokeStyle = COL_HUESO;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 + 10 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 + 6 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // Clinch "+" (not riposte bang / cancel chevron) so tech ≠ riposte ≠ cancel.
    const x = cx;
    const y = bb.y - 20 - (1 - k) * 4;
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 5, y - 2, 10, 4);
    ctx.fillRect(x - 2, y - 5, 4, 10);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 5, y - 3, 10, 4);
    ctx.fillRect(x - 2, y - 6, 4, 10);
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(label, x, y + 14, 1, COL_HUESO, "center");
    ctx.restore();
  }


  function drawReversalHint() {
    // Reversal window readability leftover (v390): meaty Space/L vs hold-guard used to
    // open with no draw teach — only RIPOSTE_WIN (v360), cancel doors (v381), and
    // throw-tech (v389) had live remap cues, so the guard+golpe REV door stayed unread
    // until the sting fired. Draw-only (drawReversalHint). Soft defender pulse +
    // remap-aware guard+golpe chord while meatyMeleeAtPlayerGuard && stam can pay.
    // Riposte / throw-tech still own; cancel + combo yield. No-meaty / broke / KD
    // silent. REVERSAL_STAM 30 / REVERSAL_INVULN / L frames / tipX / plants / pad /
    // THROW_TECH / RIPOSTE_WIN / AI_CD locked. No new combat verb.
    if (!player || !rival || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    if (!meatyMeleeAtPlayerGuard()) return;
    if (player.stamina < REVERSAL_STAM) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    const winMs = rival.phase === "startup" ? cutStartup(rival) : cutActive(rival);
    const left = Math.max(0, winMs - rival.phaseT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across the meaty door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const gLab = codeLabel(bindPrimary("guard"));
    const lLab = codeLabel(bindPrimary("golpe"));
    const label = gLab + "+" + lLab;
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.36;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft defender ring — óxido family so REV ≠ tech hueso ≠ riposte brasa chest.
    ctx.globalAlpha = (0.14 + 0.30 * k) * pulse;
    ctx.strokeStyle = COL_OXIDO;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 + 10 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 + 6 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // Up-caret (not riposte bang / tech clinch + / cancel chevron) so REV ≠ others.
    const x = cx;
    const y = bb.y - 20 - (1 - k) * 4;
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 1, y - 6, 2, 10);
    ctx.fillRect(x - 4, y - 2, 3, 2);
    ctx.fillRect(x + 1, y - 2, 3, 2);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 1, y - 7, 2, 10);
    ctx.fillRect(x - 4, y - 3, 3, 2);
    ctx.fillRect(x + 1, y - 3, 3, 2);
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(label, x, y + 14, 1, COL_HUESO, "center");
    ctx.restore();
  }

  function drawWakeReversalHint() {
    // Wakeup reversal window readability leftover (v420): meaty Space/L on getup used to
    // open with no draw teach — only hold-guard REV (v390) had a live remap cue, so the
    // tap-golpe wakeRev door stayed unread until the sting fired while AI already meaties
    // into the 80ms invuln (v401). Draw-only (drawWakeReversalHint). Soft rising pulse +
    // remap-aware golpe while meatyMeleeAtPlayerWake && stam can pay. Riposte / throw-tech /
    // hold-guard REV still own; cancel + combo yield. Guarding / no-meaty / broke / KD silent.
    // REVERSAL_STAM 30 / THROW_WAKE_INVULN 80 / L frames / tipX / plants / pad / RIPOSTE_WIN /
    // AI_CD locked. No new combat verb.
    if (!player || !rival || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    if (meatyMeleeAtPlayerGuard() && player.stamina >= REVERSAL_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    if (!meatyMeleeAtPlayerWake()) return;
    if (player.stamina < REVERSAL_STAM) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    const winMs = THROW_WAKE_INVULN;
    const left = Math.max(0, player.throwInvulnT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across the short getup door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const lLab = codeLabel(bindPrimary("golpe"));
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.36;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft rising ring — óxido family so wake REV shares hold-guard REV, ≠ tech/riposte.
    ctx.globalAlpha = (0.14 + 0.30 * k) * pulse;
    ctx.strokeStyle = COL_OXIDO;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 + 10 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 + 6 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // Up-caret (same family as hold-guard REV) — label is L alone (no S chord).
    const x = cx;
    const y = bb.y - 20 - (1 - k) * 4;
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 1, y - 6, 2, 10);
    ctx.fillRect(x - 4, y - 2, 3, 2);
    ctx.fillRect(x + 1, y - 2, 3, 2);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 1, y - 7, 2, 10);
    ctx.fillRect(x - 4, y - 3, 3, 2);
    ctx.fillRect(x + 1, y - 3, 3, 2);
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(lLab, x, y + 14, 1, COL_HUESO, "center");
    ctx.restore();
  }

  function drawFeintHint() {
    // Feint window readability leftover (v394): Space slash startup used to open
    // with no draw teach — only RIPOSTE_WIN (v360), cancel doors (v381), throw-tech
    // (v389), reversal (v390), and especial ready (v392) had live remap cues, so the
    // tap-guarda FINTA door stayed unread until the sheath sting. Draw-only (drawFeintHint).
    // Soft attacker pulse + remap-aware guard glyph while canFeint(player). Riposte /
    // throw-tech / reversal / cancel still own; golpe / active / KD silent.
    // FEINT_RECOVERY 100 / Space startup 180 / tipX / plants / pad / RIPOSTE_WIN /
    // AI_CD locked. No new combat verb.
    if (!player || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (rival && throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    if (meatyMeleeAtPlayerGuard() && player.stamina >= PUSHBLOCK_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Wakeup REV window owns the silhouette (same gates as drawWakeReversalHint).
    if (meatyMeleeAtPlayerWake() && player.stamina >= REVERSAL_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Open meaty PARRY door owns the silhouette (same gates as drawParryHint) (v422).
    if (meatyMeleeAtPlayerOpen()
      && player.phase === "idle" && !player.boltPhase
      && player.stamina >= STAMINA_START_MIN
      && player.feintT <= 0
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    if (slashToGolpeWindow(player) || golpeToSlashWindow(player) || cutToBoltWindow(player)) return;
    if (!canFeint(player)) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    const winMs = STARTUP;
    const left = Math.max(0, winMs - player.phaseT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across Space startup — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const gLab = codeLabel(bindPrimary("guard"));
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.28;
    const face = player.facing || 1;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft tip-side sheath mote — hueso/óxido so FINTA ≠ cancel brasa ≠ tech clinch.
    ctx.globalAlpha = (0.14 + 0.28 * k) * pulse;
    ctx.strokeStyle = COL_OXIDO;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx + bb.w * 0.30 * face, cy, 12 + 8 * (1 - k), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_HUESO;
    ctx.beginPath();
    ctx.arc(cx + bb.w * 0.30 * face, cy, 8 + 5 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    // Down-sheath mark (not riposte bang / tech + / rev up-caret / cancel chevron).
    const x = cx;
    const y = bb.y - 20 - (1 - k) * 4;
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 1, y - 4, 2, 10);
    ctx.fillRect(x - 4, y + 4, 3, 2);
    ctx.fillRect(x + 1, y + 4, 3, 2);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_OXIDO;
    ctx.fillRect(x - 1, y - 5, 2, 10);
    ctx.fillRect(x - 4, y + 3, 3, 2);
    ctx.fillRect(x + 1, y + 3, 3, 2);
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(gLab, x, y + 14, 1, COL_HUESO, "center");
    ctx.restore();
  }



  function drawParryHint() {
    // Parry window readability leftover (v422): meaty Space/L vs open (not hold-guard) used to
    // open with no draw teach — only hold-guard REV (v390) / PB (v421) had live remap cues on
    // meaty, so the rising-S PARRY door (PARRY_WIN 140) stayed unread until the gleam fired
    // (CONTROLES alone listed S al filo). Draw-only (drawParryHint). Soft tip-side filo pulse +
    // remap-aware guard key while meatyMeleeAtPlayerOpen && can raise. Riposte / throw-tech /
    // wake REV still own; hold-guard meaty stays REV/PB. Cancel / feint / especial / combo yield.
    // Guarding / no-meaty / broke / KD / busy silent. PARRY_WIN 140 / PARRY_STAGGER 180 /
    // PARRY_GLEAM 80 / RIPOSTE_WIN 280 / tipX / plants / pad / AI_CD locked. No new combat verb.
    if (!player || !rival || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    // Wakeup REV window owns getup (same gates as drawWakeReversalHint).
    if (meatyMeleeAtPlayerWake() && player.stamina >= REVERSAL_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    if (!meatyMeleeAtPlayerOpen()) return;
    if (player.phase !== "idle" || player.boltPhase) return;
    if (player.stamina < STAMINA_START_MIN) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    if (player.feintT > 0) return;
    const winMs = rival.phase === "startup" ? cutStartup(rival) : cutActive(rival);
    const left = Math.max(0, winMs - rival.phaseT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across the meaty door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const gLab = codeLabel(bindPrimary("guard"));
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    const cy = bb.y + bb.h * 0.28;
    const face = player.facing || 1;
    // Tip-side filo — tip family like parry gleam; ≠ REV chest / PB away / tech +.
    const x = cx + face * (Math.min(36, bb.w * 0.38) + 8);
    const y = cy;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft edge tick (filo) — hueso/brasa gleam family, not óxido REV/PB.
    ctx.globalAlpha = (0.14 + 0.30 * k) * pulse;
    ctx.strokeStyle = COL_HUESO;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - face * 8, y - 7);
    ctx.lineTo(x + face * 6, y);
    ctx.lineTo(x - face * 8, y + 7);
    ctx.stroke();
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(x, y, 8 + 5 * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.strokeStyle = COL_BRASA;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - face * 8, y - 7);
    ctx.lineTo(x + face * 6, y);
    ctx.lineTo(x - face * 8, y + 7);
    ctx.stroke();
    ctx.globalAlpha = 0.26 * k;
    ctx.strokeStyle = COL_HUESO;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x - face * 8, y - 8);
    ctx.lineTo(x + face * 6, y - 1);
    ctx.lineTo(x - face * 8, y + 6);
    ctx.stroke();
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(gLab, x, y + 16, 1, COL_HUESO, "center");
    ctx.restore();
  }

  function drawPushblockHint() {
    // Pushblock window readability leftover (v421): meaty Space/L vs hold-guard used to
    // open with only REV teach (v390) — EMPUJON (guard+away, PUSHBLOCK_STAM 25) stayed unread
    // in-round (CONTROLES alone listed it), so the safer 240px escape on the same meaty door
    // was invisible until the sting. Draw-only (drawPushblockHint). Soft away-side pulse +
    // remap-aware away key while meatyMeleeAtPlayerGuard && stam can pay PB. Riposte /
    // throw-tech still own; hold-guard REV keeps chest (coexist). Cancel / feint / especial /
    // combo yield. No-meaty / broke / KD / already shoving silent. PUSHBLOCK_STAM 25 /
    // PUSHBLOCK_PX 240 / tipX / plants / pad / RIPOSTE_WIN / REVERSAL_STAM / AI_CD locked.
    // No new combat verb.
    if (!player || !rival || mode !== "play") return;
    if (player.riposteWindowT > 0) return;
    if (throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    if (!meatyMeleeAtPlayerGuard()) return;
    if (player.stamina < PUSHBLOCK_STAM) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    if (player.guardBreakT > 0) return;
    if (player.pushT > 0) return;
    const winMs = rival.phase === "startup" ? cutStartup(rival) : cutActive(rival);
    const left = Math.max(0, winMs - rival.phaseT);
    const k = Math.max(0.08, Math.min(1, left / Math.max(1, winMs)));
    // One soft beat across the meaty door — clock, not sticky.
    const pulse = 0.58 + 0.42 * Math.abs(Math.sin((1 - k) * Math.PI));
    const awayAct = player.facing > 0 ? "left" : "right";
    const aLab = codeLabel(bindPrimary(awayAct));
    const away = awayWalkDir(player);
    const bb = bodyAABB(player);
    const cx = bb.x + bb.w * 0.5;
    // Away hip — REV owns chest center (coexist).
    const x = cx + away * (Math.min(36, bb.w * 0.38) + 10);
    const y = bb.y + bb.h * 0.52;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    // Soft away chevron — óxido family so PB ≠ REV up-caret ≠ tech + ≠ riposte bang.
    ctx.globalAlpha = (0.14 + 0.30 * k) * pulse;
    ctx.fillStyle = COL_OXIDO;
    ctx.fillRect(x - away * 1, y - 1, away * 11, 2);
    ctx.fillRect(x + away * 7, y - 4, away * 2, 3);
    ctx.fillRect(x + away * 7, y + 1, away * 2, 3);
    ctx.globalAlpha = 0.10 * k * pulse;
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 5, y - 5, 10, 10);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = (0.42 + 0.48 * k) * (0.72 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - away * 1, y - 1, away * 11, 2);
    ctx.fillRect(x + away * 7, y - 4, away * 2, 3);
    ctx.fillRect(x + away * 7, y + 1, away * 2, 3);
    ctx.globalAlpha = 0.26 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - away * 1, y - 2, away * 11, 2);
    ctx.fillRect(x + away * 7, y - 5, away * 2, 3);
    ctx.fillRect(x + away * 7, y + 0, away * 2, 3);
    ctx.globalAlpha = (0.34 + 0.50 * k) * pulse;
    drawPixelText(aLab, x, y + 14, 1, COL_HUESO, "center");
    ctx.restore();
  }

  function drawEspecialHint() {
    // Especial stock ready linger leftover (v392): full meter after stock-complete
    // flash used to sit as quiet solid brasa with no remap teach — only cancel
    // doors showed K (v381/v387) while the stock was live, so idle full-stock
    // especial stayed unread until the spend sting. Draw-only (drawEspecialHint).
    // Soft remap-aware K by the player meter while meterFull. Riposte / throw-tech
    // / reversal / cancel / feint teach still own. Empty / spend / boltPhase / KD silent.
    // Rival silent (breath only in drawLifeBar). METER_FLASH_MS 220 / fill rules /
    // BOLT frames / tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
    if (!player || mode !== "play") return;
    if (!meterFull(player)) return;
    if (player.riposteWindowT > 0) return;
    if (rival && throwTechWindow(rival) && throwInRange()
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)
      && !(player.phase === "active" && player.cut !== "throw")) return;
    if (meatyMeleeAtPlayerGuard() && player.stamina >= PUSHBLOCK_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Wakeup REV window owns the silhouette (same gates as drawWakeReversalHint).
    if (meatyMeleeAtPlayerWake() && player.stamina >= REVERSAL_STAM
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    // Open meaty PARRY door owns the silhouette (same gates as drawParryHint) (v422).
    if (meatyMeleeAtPlayerOpen()
      && player.phase === "idle" && !player.boltPhase
      && player.stamina >= STAMINA_START_MIN
      && player.feintT <= 0
      && !(player.falling || player.hp <= 0 || player.thrownT > 0 || player.stunT > 0)) return;
    if (canFeint(player)) return;
    if (slashToGolpeWindow(player) || golpeToSlashWindow(player) || cutToBoltWindow(player)) return;
    if (player.boltPhase) return;
    if (player.falling || player.hp <= 0) return;
    if (player.thrownT > 0 || player.stunT > 0) return;
    // Soft clock — slower than cancel/tech doors so ready ≠ actionable window.
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin((modeT / 900) * Math.PI));
    const kLab = codeLabel(bindPrimary("dart"));
    const x = hudBarX(true);
    const y = HUD_Y;
    const w = HUD_BAR_W;
    const h = HUD_BAR_H;
    const sy = y + h + HUD_FRAME + 4;
    const sh = HUD_STAM_H;
    const mw = HUD_METER_W;
    const mh = HUD_METER_H;
    const my = sy + sh + HUD_FRAME + 4;
    const mx = x;
    // Tiny brasa mote at the pip tip so K seats on the stock, not mid-air.
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = (0.16 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(mx + mw - 5, my - 2, 5, mh + 4);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = (0.36 + 0.42 * pulse);
    drawPixelText(kLab, mx + mw + 6, my + mh + 1, 1, COL_BRASA, "left");
    ctx.restore();
  }

  function drawEspecialHintP2() {
    // Versus HUD P2 leftover (v432): especial ready teach (v392) stayed player-only
    // while rival silence was for CPU breath — human P2 full stock unread on the
    // right pip. Draw-only. Soft mote+label with p2BindPrimary dart (v433 remap)
    // while matchKind versus && meterFull(rival). Yields to rival cancel/feint doors.
    // CPU (non-versus) still silent. METER_FLASH_MS / fill rules / BOLT frames /
    // tipX / plants / pad / RIPOSTE_WIN / AI_CD locked. No new combat verb.
    if (matchKind !== "versus" || !rival || mode !== "play") return;
    if (!meterFull(rival)) return;
    if (rival.riposteWindowT > 0) return;
    if (canFeint(rival)) return;
    if (slashToGolpeWindow(rival) || golpeToSlashWindow(rival) || cutToBoltWindow(rival)) return;
    if (rival.boltPhase) return;
    if (rival.falling || rival.hp <= 0) return;
    if (rival.thrownT > 0 || rival.stunT > 0) return;
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin(((modeT + 420) / 900) * Math.PI));
    const kLab = codeLabel(p2BindPrimary("dart"));
    const x = hudBarX(false);
    const y = HUD_Y;
    const w = HUD_BAR_W;
    const h = HUD_BAR_H;
    const sy = y + h + HUD_FRAME + 4;
    const sh = HUD_STAM_H;
    const mw = HUD_METER_W;
    const mh = HUD_METER_H;
    const my = sy + sh + HUD_FRAME + 4;
    const mx = x + w - mw;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = (0.16 + 0.28 * pulse);
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(mx, my - 2, 5, mh + 4);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = (0.36 + 0.42 * pulse);
    drawPixelText(kLab, mx - 6, my + mh + 1, 1, COL_BRASA, "right");
    ctx.restore();
  }

  function drawHud() {
    drawLifeBar(player, true);
    drawLifeBar(rival, false);
    drawComboCount(player);
    drawComboCount(rival);
    drawControlsHint();
    drawRiposteHint();
    drawThrowTechHint();
    drawReversalHint();
    drawPushblockHint();
    drawWakeReversalHint();
    drawParryHint();
    drawCancelHint();
    drawFeintHint();
    drawEspecialHint();
    drawEspecialHintP2();
  }

  function drawBoltBody(hw, hh, ghost) {
    // Draw-only helper. Live dart and trail ghosts share the same body.
    // Super wake stays on the live dart only (not a ghost streak).
    const a = ghost || 1;
    ctx.fillStyle = "#000";
    ctx.globalAlpha = 0.45 * a;
    ctx.beginPath();
    ctx.moveTo(-hw + 2, hh + 2);
    ctx.lineTo(hw + 1, 2);
    ctx.lineTo(-hw + 2, -hh + 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = COL_PIZARRA;
    ctx.globalAlpha = a;
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
    if (bolt.super && !ghost) {
      ctx.fillStyle = COL_BRASA;
      ctx.fillRect(-hw + 2, -hh * 0.42, hw * 1.15, hh * 0.84);
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(-hw + 10, -hh * 0.18, hw * 0.7, hh * 0.36);
      ctx.globalAlpha = 1;
    } else if (bolt.super && ghost) {
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.55 * a;
      ctx.fillRect(-hw + 2, -hh * 0.42, hw * 1.15, hh * 0.84);
      ctx.globalAlpha = a;
    }
    ctx.fillStyle = COL_HUESO;
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.moveTo(hw * 0.22, -hh * 0.32);
    ctx.lineTo(hw, 0);
    ctx.lineTo(hw * 0.22, hh * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
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
    // Draw-only. Special dart trail leftover: K dart used to fly as a single body, so the flight read as a teleport hop across the yard, not a streak. Ghosts along the flight path; live dart still on top. Super wake still attached on the live body. Empty dart still smaller. destRect/AABB planted.
    const step = bolt.super ? 18 : 12;
    for (let g = 3; g >= 1; g--) {
      const fadeG = 0.28 / g;
      if (fadeG < 0.03) continue;
      ctx.save();
      ctx.translate(-g * step, 0);
      const s = 1 - g * 0.08;
      ctx.scale(s, s);
      drawBoltBody(hw, hh, fadeG);
      ctx.restore();
    }
    if (bolt.super) {
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.32;
      ctx.fillRect(-hw - hw * 1.2, -hh * 0.95, hw * 1.15, hh * 1.9);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(-hw - hw * 0.78, -hh * 0.58, hw * 0.88, hh * 1.16);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.62;
      ctx.fillRect(-hw - hw * 0.55, -hh * 0.48, hw * 0.7, hh * 0.96);
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(-hw - hw * 0.38, -hh * 0.22, hw * 0.48, hh * 0.44);
      ctx.globalAlpha = 1;
    }
    drawBoltBody(hw, hh, 0);
    ctx.restore();
  }


  function drawHitFlash() {
    /* Full-canvas white/red dropped. Per-sprite stun tint stays in drawKnight. */
  }

  function spawnSteelFlash(x, y, atk, def, tipRide, kind) {
    steelX = x;
    steelY = y;
    steelAtkYou = !atk || atk === player;
    steelHomeYou = !def || def === player;
    const a = hitWoundAnchor(def || player);
    steelWoundDX = x - a.x;
    steelWoundDY = y - a.y;
    steelFlashT = STEEL_FLASH_MS;
    // Guard-break steel sync leftover: tip-planted hold-drain / pushblock
    // steel rides wound only (no blade∩body re-center). Cut-block false.
    steelTipRide = !!tipRide;
    // Pushblock: óxido. Throw-tech: hueso/brasa. Guard-break: brasa shatter.
    // Normal block stays silver.
    steelKind = kind === "push" ? "push" : (kind === "tech" ? "tech" : (kind === "break" ? "break" : "block"));
  }

  function syncSteelFlash() {
    if (steelFlashT <= 0) return;
    const atk = steelAtkYou ? player : rival;
    const def = steelHomeYou ? player : rival;
    // Guard-break steel sync leftover: tip plant used to hop onto blade∩body
    // mid the same tick draw ran (~37px rival). Ride woundDX/DY only.
    // Cut-block still overlap-syncs below. destRect/AABB planted.
    if (steelTipRide) {
      const a = hitWoundAnchor(def);
      steelX = a.x + steelWoundDX;
      steelY = a.y + steelWoundDY;
      return;
    }
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
    clashY = bladeTipY(home) + clashTipDY;
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
    // Clash spark ↔ punchCover (v328): cover envelope via clashSparkK.
    const k = clashSparkK();
    const grow = 1 - k;
    ctx.save();
    ctx.translate(clashX, clashY);
    ctx.globalCompositeOperation = "lighter";
    // Core: hueso flash + soft pizarra ring so clash punches through block silver.
    ctx.globalAlpha = 0.55 * k;
    ctx.fillStyle = COL_PIZARRA;
    ctx.beginPath();
    ctx.arc(0, 0, 6 + 16 * grow, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.78 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.beginPath();
    ctx.arc(0, 0, 3 + 11 * grow, 0, Math.PI * 2);
    ctx.fill();
    for (const sh of clashShards) {
      const inner = sh.len * (0.12 + 0.2 * grow);
      const outer = sh.len * (0.55 + 1.12 * grow);
      const c = Math.cos(sh.ang);
      const sn = Math.sin(sh.ang);
      const col = sh.brasa ? COL_BRASA : (sh.oxido ? COL_OXIDO : COL_HUESO);
      ctx.globalAlpha = (sh.brasa || sh.oxido ? 0.92 : 1) * k;
      ctx.strokeStyle = col;
      ctx.lineWidth = sh.brasa ? 2.8 : (sh.oxido ? 2.2 : 1.8);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c * inner, sn * inner);
      ctx.lineTo(c * outer, sn * outer);
      ctx.stroke();
      if (sh.brasa || sh.oxido) {
        ctx.globalAlpha = 0.88 * k;
        ctx.fillStyle = sh.brasa ? COL_OXIDO : COL_PIZARRA;
        ctx.beginPath();
        ctx.arc(c * outer, sn * outer, sh.brasa ? 2.4 : 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawHitSpark() {
    if (hitSparkT <= 0) return;
    syncHitSpark();
    // Flesh hit spark ↔ punchCover (v329): cover envelope via hitSparkK.
    const k = hitSparkK();
    const grow = 1 - k;
    // Dust / hit spark polish (v316): squared fade + short grow so post-freeze
    // knock does not smear a soft bloom. Palette brasa/hueso; no muddy wash.
    const fade = k * k;
    ctx.save();
    ctx.translate(hitSparkX, hitSparkY);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.72 * fade;
    ctx.fillStyle = COL_HUESO;
    ctx.beginPath();
    ctx.arc(0, 0, 2.2 + 5 * grow, 0, Math.PI * 2);
    ctx.fill();
    for (const sh of hitShards) {
      const inner = sh.len * (0.10 + 0.12 * grow);
      const outer = sh.len * (0.55 + 0.75 * grow);
      const c = Math.cos(sh.ang);
      const sn = Math.sin(sh.ang);
      ctx.globalAlpha = (sh.brasa ? 0.95 : 1) * fade;
      ctx.strokeStyle = sh.brasa ? COL_BRASA : COL_HUESO;
      ctx.lineWidth = sh.brasa ? 2.0 : 1.35;
      ctx.lineCap = "butt";
      ctx.beginPath();
      ctx.moveTo(c * inner, sn * inner);
      ctx.lineTo(c * outer, sn * outer);
      ctx.stroke();
      if (sh.brasa) {
        ctx.globalAlpha = 0.85 * fade;
        ctx.fillStyle = COL_HUESO;
        ctx.fillRect(c * outer - 1, sn * outer - 1, 2, 2);
      }
    }
    ctx.restore();
  }

  function syncBrasaFx() {
    if (brasaFxT <= 0) return;
    const home = brasaHomeYou ? player : rival;
    if (brasaFxKind === "cast") {
      // Spark origin leftover: ride live castPlantXY (slash→windup ease).
      // Ignore baked wound so clash-K / idle-sheathe track the eased plant.
      const p = castPlantXY(home);
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaX = p.x;
      brasaY = p.y;
      return;
    }
    if (brasaFxKind === "feint") {
      // Tip sheath fleck: ride live bladeTip under feintFade (wound 0).
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      brasaX = bladeTipX(home);
      brasaY = bladeTipY(home);
      return;
    }
    if (brasaFxKind === "reversal") {
      // Invuln chest mote: ride live hitWoundAnchor (wound 0) so flash sits on the fighter.
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      return;
    }
    if (brasaFxKind === "riposte") {
      // Reward commit fleck: ride live hitWoundAnchor (wound 0).
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      return;
    }
    if (brasaFxKind === "wakeup") {
      // Soft getup hueso wash: ride live hitWoundAnchor (wound 0).
      brasaWoundDX = 0;
      brasaWoundDY = 0;
      const a = hitWoundAnchor(home);
      brasaX = a.x;
      brasaY = a.y;
      return;
    }
    if (brasaFxKind === "clash") {
      const hb = bladeBox(home);
      brasaX = bladeTipX(home) + brasaWoundDX;
      brasaY = bladeTipY(home) + brasaWoundDY;
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
    const life = brasaFxKind === "block" ? STEEL_FLASH_MS : (brasaFxKind === "clash" ? CLASH_SPARK_MS : (brasaFxKind === "cast" ? BOLT_CAST_FX_MS : (brasaFxKind === "grab" ? GRAB_FX_MS : (brasaFxKind === "feint" ? FEINT_FX_MS : (brasaFxKind === "reversal" ? REVERSAL_FX_MS : (brasaFxKind === "riposte" ? RIPOSTE_FX_MS : (brasaFxKind === "wakeup" ? WAKE_FX_MS : BRASA_HIT_MS)))))));
    // Flesh dart ember ↔ punchCover (v329): cover envelope via brasaHitK for hit.
    const k = brasaFxKind === "hit" ? brasaHitK() : (brasaFxT / life);
    const grow = 1 - k;
    ctx.save();
    ctx.translate(brasaX, brasaY);
    ctx.scale(brasaFxScale || 1, brasaFxScale || 1);
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
    } else if (brasaFxKind === "grab") {
      // Discreet clinch puff: soft pizarra ring, brasa core, hueso fleck — under dart hit size.
      ctx.globalAlpha = 0.32 * k;
      ctx.fillStyle = COL_PIZARRA;
      ctx.beginPath();
      ctx.arc(0, 0, 5 + 9 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.68 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(0, 0, 3 + 5 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.50 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(brasaDir * 1.5, -1, 1.2 + 1.6 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.28 + 0.7 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.78 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d - 2 * grow, sh.r * (0.8 + 0.35 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "feint") {
      // Discreet tip sheath fleck: tiny hueso mote + soft pizarra — not hit bloom / parry gleam.
      // Slight down drift reads as tip dip without touching destRect plant / tipX.
      ctx.globalAlpha = 0.26 * k;
      ctx.fillStyle = COL_PIZARRA;
      ctx.beginPath();
      ctx.arc(0, 1.5 * grow, 2.0 + 3.2 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.58 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(brasaDir * 0.6, 2.2 * grow, 1.3 + 1.6 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.22 + 0.5 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.70 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d + 1.8 * grow, sh.r * (0.75 + 0.3 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "reversal") {
      // Discreet invuln flash mote on chest: hueso/brasa/pizarra — not parry gleam ring, not hit bloom.
      ctx.globalAlpha = 0.28 * k;
      ctx.fillStyle = COL_PIZARRA;
      ctx.beginPath();
      ctx.arc(0, 0, 3.2 + 4.5 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.55 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(0, -0.5, 1.6 + 2.2 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.42 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(brasaDir * 0.8, -1, 1.1 + 1.4 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.24 + 0.55 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.72 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d - 1.2 * grow, sh.r * (0.78 + 0.32 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "riposte") {
      // Reward commit fleck: brasa-forward chest mote — not reversal invuln, not parry gleam, not window bang.
      ctx.globalAlpha = 0.30 * k;
      ctx.fillStyle = COL_PIZARRA;
      ctx.beginPath();
      ctx.arc(0, 0, 3.4 + 4.8 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.62 * k;
      ctx.fillStyle = COL_BRASA;
      ctx.beginPath();
      ctx.arc(0, -0.4, 1.8 + 2.4 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.48 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(brasaDir * 0.9, -1.1, 1.15 + 1.5 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.26 + 0.58 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.76 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d - 1.3 * grow, sh.r * (0.8 + 0.34 * k), 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (brasaFxKind === "wakeup") {
      // Soft hueso wash on getup: muted chest mote — not reversal fleck, not parry gleam.
      ctx.globalAlpha = 0.20 * k;
      ctx.fillStyle = COL_PIZARRA;
      ctx.beginPath();
      ctx.arc(0, 0, 2.6 + 3.6 * grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.46 * k;
      ctx.fillStyle = COL_HUESO;
      ctx.beginPath();
      ctx.arc(0, -0.3, 1.35 + 1.8 * grow, 0, Math.PI * 2);
      ctx.fill();
      for (const sh of brasaBits) {
        const d = sh.len * (0.20 + 0.48 * grow);
        const c = Math.cos(sh.ang);
        const sn = Math.sin(sh.ang);
        ctx.globalAlpha = 0.62 * k;
        ctx.fillStyle = brasaTone(sh.tone);
        ctx.beginPath();
        ctx.arc(c * d, sn * d - 0.8 * grow, sh.r * (0.72 + 0.28 * k), 0, Math.PI * 2);
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
    syncPlantDust();
    ctx.save();
    for (const p of plantDust) {
      // Knock grit ↔ punchCover (v330): cover envelope via plantDustK.
      const k = plantDustK(p);
      if (p.speck) {
        ctx.globalAlpha = 0.5 * k * p.power;
        // Pushblock / clash shove trail: óxido grit. Walk/block stay pizarra-dark.
        ctx.fillStyle = p.shove ? COL_OXIDO : "#3a2e22";
        const rad = 1.7 + 1.3 * k;
        const rw = rad * (p.shove ? 1.35 : 1);
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, rw, rad * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.globalAlpha = 0.3 * k * Math.min(1.2, p.power);
        ctx.fillStyle = p.shove ? COL_PIZARRA : "#1a1410";
        const w = (16 + 20 * (1 - k)) * p.power;
        const h = (4.5 + 2 * k) * Math.min(p.shove ? 1.25 : 1, p.power);
        const sdir = p.shoveDir || (p.shove ? -p.facing : 0);
        const ox = p.shove ? sdir * (12 + 16 * (1 - k)) : 0;
        ctx.beginPath();
        ctx.ellipse(p.x + ox, p.y, w, h, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function spawnParryGleam(x, y, def) {
    // Distinct brasa gleam on guard tip/steel — not gray block asterisk, not riposte "!".
    parryGleamX = x;
    parryGleamY = y;
    parryGleamHomeYou = !def || def === player;
    parryGleamT = PARRY_GLEAM_MS;
  }

  function syncParryGleam() {
    if (parryGleamT <= 0) return;
    const home = parryGleamHomeYou ? player : rival;
    // Ride raised guard tip while live so the gleam sits on steel, not chest.
    if (home && home.guarding) {
      const pt = guardSteelPoint(home);
      parryGleamX = pt.x;
      parryGleamY = pt.y;
    }
  }

  function drawSteelFlash() {
    if (steelFlashT <= 0) return;
    syncSteelFlash();
    // Steel flash ↔ punchCover (v323): cover envelope via steelFlashK.
    const k = steelFlashK();
    if (k <= 0) return;
    const push = steelKind === "push";
    const tech = steelKind === "tech";
    const brk = steelKind === "break";
    ctx.save();
    ctx.translate(steelX, steelY);
    ctx.globalAlpha = 0.35 + 0.65 * k;
    // Pushblock: óxido spokes + hueso core. Throw-tech: hueso spokes + brasa core.
    // Guard-break: brasa spokes + pizarra ring (shatter vs silver chip block).
    // Normal block keeps silver asterisk.
    ctx.strokeStyle = push ? COL_OXIDO : (tech ? COL_HUESO : (brk ? COL_BRASA : "#e8e2d2"));
    ctx.fillStyle = push ? "rgba(207, 195, 168, 0.78)" : (tech ? "rgba(196, 40, 24, 0.72)" : (brk ? "rgba(196, 40, 24, 0.78)" : "rgba(210, 205, 190, 0.7)"));
    ctx.lineWidth = push || tech || brk ? 2.6 : 2;
    const arm = push || tech || brk ? 22 : 18;
    const tall = push || tech || brk ? 17 : 14;
    const diag = push || tech || brk ? 14 : 12;
    ctx.beginPath();
    ctx.moveTo(-arm * k, 0);
    ctx.lineTo(arm * k, 0);
    ctx.moveTo(0, -tall * k);
    ctx.lineTo(0, tall * k);
    ctx.moveTo(-diag * k, -diag * 0.85 * k);
    ctx.lineTo(diag * k, diag * 0.85 * k);
    ctx.stroke();
    if (push) {
      ctx.globalAlpha = 0.55 * k;
      ctx.strokeStyle = COL_BRASA;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-arm * 0.55 * k, 0);
      ctx.lineTo(arm * 0.55 * k, 0);
      ctx.stroke();
    } else if (tech) {
      // Soft pizarra ring so tech punches through block silver without matching push óxido.
      ctx.globalAlpha = 0.42 * k;
      ctx.strokeStyle = COL_PIZARRA;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, 8 + 6 * (1 - k), 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.60 * k;
      ctx.strokeStyle = COL_BRASA;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -tall * 0.6 * k);
      ctx.lineTo(0, tall * 0.6 * k);
      ctx.stroke();
    } else if (brk) {
      // Shatter ring + cross so break punches through silver chip without matching push óxido.
      ctx.globalAlpha = 0.48 * k;
      ctx.strokeStyle = COL_PIZARRA;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, 9 + 7 * (1 - k), 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.70 * k;
      ctx.strokeStyle = COL_HUESO;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-arm * 0.5 * k, -tall * 0.5 * k);
      ctx.lineTo(arm * 0.5 * k, tall * 0.5 * k);
      ctx.moveTo(-arm * 0.5 * k, tall * 0.5 * k);
      ctx.lineTo(arm * 0.5 * k, -tall * 0.5 * k);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.35 + 0.65 * k;
    ctx.beginPath();
    ctx.arc(0, 0, ((push || tech || brk) ? 6 : 5) + ((push || tech || brk) ? 10 : 8) * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParryGleam() {
    // Brief brasa flash on guard tip — distinct from steel asterisk + riposte bang.
    if (parryGleamT <= 0) return;
    syncParryGleam();
    // Parry gleam ↔ punchCover (v326): cover envelope via parryGleamK.
    const k = parryGleamK();
    if (k <= 0) return;
    const grow = 1 - k;
    ctx.save();
    ctx.translate(parryGleamX, parryGleamY);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.55 * k;
    ctx.fillStyle = COL_BRASA;
    ctx.beginPath();
    ctx.arc(0, 0, 3 + 10 * grow, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.85 * k;
    ctx.strokeStyle = "#ffb060";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(-10 * k, 0);
    ctx.lineTo(10 * k, 0);
    ctx.moveTo(0, -10 * k);
    ctx.lineTo(0, 10 * k);
    ctx.stroke();
    ctx.globalAlpha = 0.5 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.beginPath();
    ctx.arc(0, 0, 2 + 4 * grow, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const FONT5 = {
    " ": [0,0,0,0,0,0,0],
    A: [14,17,17,31,17,17,17],
    B: [30,17,17,30,17,17,30],
    C: [14,17,16,16,16,17,14],
    D: [30,17,17,17,17,17,30],
    E: [31,16,16,30,16,16,31],
    F: [31,16,16,30,16,16,16],
    G: [14,17,16,23,17,17,14],
    H: [17,17,17,31,17,17,17],
    I: [14,4,4,4,4,4,14],
    J: [7,2,2,2,2,18,12],
    K: [17,18,20,24,20,18,17],
    L: [16,16,16,16,16,16,31],
    M: [17,27,21,21,17,17,17],
    N: [17,25,21,19,17,17,17],
    O: [14,17,17,17,17,17,14],
    P: [30,17,17,30,16,16,16],
    Q: [14,17,17,17,21,18,13],
    R: [30,17,17,30,20,18,17],
    S: [15,16,16,14,1,1,30],
    T: [31,4,4,4,4,4,4],
    U: [17,17,17,17,17,17,14],
    V: [17,17,17,17,17,10,4],
    W: [17,17,17,21,21,21,10],
    X: [17,17,10,4,10,17,17],
    Y: [17,17,10,4,4,4,4],
    Z: [31,1,2,4,8,16,31],
    "0": [14,17,19,21,25,17,14],
    "1": [4,12,4,4,4,4,14],
    "2": [14,17,1,6,8,16,31],
    "3": [14,17,1,6,1,17,14],
    "4": [2,6,10,18,31,2,2],
    "5": [31,16,30,1,1,17,14],
    "6": [14,16,16,30,17,17,14],
    "7": [31,1,2,4,8,8,8],
    "8": [14,17,17,14,17,17,14],
    "9": [14,17,17,15,1,1,14],
    "/": [1,1,2,4,8,16,16],
    "(": [2,4,8,8,8,4,2],
    ")": [8,4,2,2,2,4,8],
    "-": [0,0,0,31,0,0,0],
    "−": [0,0,0,31,0,0,0],
    "+": [0,4,4,31,4,4,0],
    ".": [0,0,0,0,0,0,4],
    ":": [0,4,0,0,0,4,0],
    ">": [0,8,4,2,4,8,0],
    "[": [14,8,8,8,8,8,14],
    "]": [14,2,2,2,2,2,14],
    "#": [10,31,10,31,10,31,10],
    "Í": [4,14,4,4,4,4,14],
    "É": [4,31,16,30,16,16,31],
    "Á": [4,14,17,31,17,17,17],
    "Ó": [4,14,17,17,17,17,14],
    "Ú": [4,17,17,17,17,17,14],
    "Ñ": [14,0,17,25,21,19,17]
  };

  function glyphOf(ch) {
    if (FONT5[ch]) return FONT5[ch];
    const u = ch.toUpperCase();
    if (FONT5[u]) return FONT5[u];
    return FONT5[" "];
  }

  function pixelTextWidth(text, scale) {
    const n = text.length;
    if (n <= 0) return 0;
    return n * 6 * scale - scale;
  }

  function drawPixelText(text, x, y, scale, color, align) {
    const gw = 5, gh = 7, gap = 1;
    const w = pixelTextWidth(text, scale);
    let sx0 = Math.round(x);
    if (align === "center") sx0 = Math.round(x - w / 2);
    else if (align === "right") sx0 = Math.round(x - w);
    const sy = Math.round(y - (gh * scale) / 2);
    const prev = ctx.imageSmoothingEnabled;
    ctx.imageSmoothingEnabled = false;
    for (let pass = 0; pass < 2; pass++) {
      ctx.fillStyle = pass === 0 ? COL_NEGRO : color;
      const ox = pass === 0 ? Math.max(1, scale) : 0;
      const oy = pass === 0 ? Math.max(1, scale) : 0;
      let sx = sx0;
      for (let i = 0; i < text.length; i++) {
        const bitsRow = glyphOf(text[i]);
        for (let row = 0; row < gh; row++) {
          const bits = bitsRow[row] || 0;
          for (let col = 0; col < gw; col++) {
            if (bits & (1 << (gw - 1 - col))) {
              ctx.fillRect(sx + col * scale + ox, sy + row * scale + oy, scale, scale);
            }
          }
        }
        sx += (gw + gap) * scale;
      }
    }
    ctx.imageSmoothingEnabled = prev;
    return { x: sx0, y: sy, w: w, h: gh * scale };
  }

  function pushMenuHit(id, box) {
    if (!box) return;
    menuHits.push({ id: id, x: box.x - 18, y: box.y - 12, w: box.w + 36, h: box.h + 24 });
  }

  function canvasToGame(e) {
    const r = canvas && canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : null;
    if (!r || !r.width || !r.height) return { x: W / 2, y: H / 2 };
    return {
      x: (e.clientX - r.left) * (W / r.width),
      y: (e.clientY - r.top) * (H / r.height),
    };
  }

  function hitMenu(x, y) {
    for (let i = 0; i < menuHits.length; i++) {
      const h = menuHits[i];
      if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return h.id;
    }
    return null;
  }

  const ROOT_ITEMS = ["jugar", "controles", "opciones", "escenarios", "versus", "online"];
  const ROOT_LOCKED = { versus: !VERSUS_2P_READY, online: !ONLINE_2P_READY };
  const STAGE_ITEMS = ["yard", "yard2", "yard3", "yard4", "yard5", "volver"];
  const STAGE_LABELS = {
    yard: "PATIO · SOL",
    yard2: "PATIO 2 · SOMBRA",
    yard3: "PUENTE · OCASO",
    yard4: "ARMERÍA · BRASA",
    yard5: "MURALLA · LUNA",
    volver: "VOLVER",
  };
  const OPT_ITEMS = ["remap_kb", "remap_pad", "remap_p2", "reset", "vol_music", "vol_sfx", "volver"];
  const REMAP_ACTIONS = ["left", "right", "guard", "slash", "golpe", "dart"];
  const REMAP_LABELS = {
    left: "IZQUIERDA",
    right: "DERECHA",
    guard: "GUARDA",
    slash: "TAJO",
    golpe: "GOLPE",
    dart: "DARDO",
  };

  function goTitleFromPlay() {
    mode = "title";
    modeT = 800;
    syncMusic(true);
    titlePage = "root";
    titleSel = 0;
    remapCapture = null;
    requestStart = false;
    requestRestart = false;
    attackEdge = false;
    golpeEdge = false;
    boltEdge = false;
    throwEdge = false;
    reversalEdge = false;
    feintEdge = false;
    keys.clear();
  }

  function handleTitleBack() {
    remapCapture = null;
    if (titlePage === "root") return;
    if (titlePage === "controls") { titlePage = "root"; titleSel = 1; return; }
    if (titlePage === "escenarios") { titlePage = "root"; titleSel = 3; return; }
    if (titlePage === "options") { titlePage = "root"; titleSel = 2; return; }
    // Roster select path leftover (v440): Esc/VOLVER returns to the root row
    // that entered (JUGAR / VERSUS / ONLINE).
    if (titlePage === "roster") {
      titlePage = "root";
      titleSel = pendingMatchKind === "versus" ? 4 : (pendingMatchKind === "online" ? 5 : 0);
      return;
    }
    if (titlePage === "remap_kb" || titlePage === "remap_pad" || titlePage === "remap_kb_p2") {
      const wasPad = titlePage === "remap_pad";
      const wasP2 = titlePage === "remap_kb_p2";
      titlePage = "options";
      titleSel = wasP2 ? 2 : (wasPad ? 1 : 0);
      return;
    }
  }

  function rootCount() { return ROOT_ITEMS.length; }
  function optionsCount() { return OPT_ITEMS.length; }
  function remapCount() { return REMAP_ACTIONS.length + 1; }

  function confirmTitle() {
    playSfx(SFX.uiMenu, { volume: 0.55 });
    // Roster select path leftover (v440): ready id starts pendingMatchKind;
    // !ready PRÓXIMAMENTE no-op; VOLVER backs to the entering root row.
    if (titlePage === "roster") {
      if (titleSel >= ROSTER.length) {
        titlePage = "root";
        titleSel = pendingMatchKind === "versus" ? 4 : (pendingMatchKind === "online" ? 5 : 0);
        return;
      }
      const e = ROSTER[titleSel];
      if (!e || !e.ready) return;
      if (!setP1FighterId(e.id)) return;
      // Roster P2 mirror leftover (v444): v442/v443 always seated DEFAULT_P2 (cid)
      // even when P1 picked cid — both seats same art family. Soft: seat the other
      // ready roster id (P1 cid → roan; P1 roan → cid / DEFAULT_P2). Later P2 pick
      // page still deferred. Face crops / sheets / frames locked.
      const other = ROSTER.find(r => r.ready && r.id !== e.id);
      setP2FighterId(other ? other.id : DEFAULT_P2_FIGHTER_ID);
      matchKind = pendingMatchKind === "versus" || pendingMatchKind === "online" ? pendingMatchKind : "cpu";
      // Title update clears requestStart while titlePage !== root — seat
      // root so the existing JUGAR drain starts the duel.
      titlePage = "root";
      titleSel = 0;
      requestStart = true;
      return;
    }
    if (titlePage === "controls") {
      titlePage = "root";
      titleSel = 1;
      return;
    }
    if (titlePage === "escenarios") {
      const id = STAGE_ITEMS[titleSel] || "volver";
      if (id === "volver") { titlePage = "root"; titleSel = 3; return; }
      const ix = STAGE_ITEMS.indexOf(id);
      if (ix >= 0 && id !== "volver") setYardIndex(ix);
      return;
    }
    if (titlePage === "options") {
      const id = OPT_ITEMS[titleSel] || "volver";
      if (id === "volver") { titlePage = "root"; titleSel = 2; return; }
      if (id === "remap_kb") { titlePage = "remap_kb"; titleSel = 0; remapCapture = null; return; }
      if (id === "remap_pad") {
        let gp = null;
        try {
          const pads = navigator.getGamepads ? navigator.getGamepads() : null;
          if (pads) for (let i = 0; i < pads.length; i++) if (pads[i]) { gp = pads[i]; break; }
        } catch (err) {}
        if (!gp) {
          padMsg = "SIN MANDO";
          padMsgT = 900;
          return;
        }
        titlePage = "remap_pad";
        titleSel = 0;
        remapCapture = null;
        return;
      }
      if (id === "remap_p2") { titlePage = "remap_kb_p2"; titleSel = 0; remapCapture = null; return; }
      if (id === "reset") {
        resetBindsDefaults();
        padMsg = "DEFAULTS";
        padMsgT = 700;
        return;
      }
      return;
    }
    if (titlePage === "remap_kb") {
      if (titleSel >= REMAP_ACTIONS.length) { titlePage = "options"; titleSel = 0; remapCapture = null; return; }
      remapCapture = { kind: "kb", action: REMAP_ACTIONS[titleSel] };
      return;
    }
    if (titlePage === "remap_pad") {
      if (titleSel >= REMAP_ACTIONS.length) { titlePage = "options"; titleSel = 1; remapCapture = null; return; }
      remapCapture = { kind: "pad", action: REMAP_ACTIONS[titleSel] };
      pollPadCapture();
      return;
    }
    if (titlePage === "remap_kb_p2") {
      if (titleSel >= REMAP_ACTIONS.length) { titlePage = "options"; titleSel = 2; remapCapture = null; return; }
      remapCapture = { kind: "kb_p2", action: REMAP_ACTIONS[titleSel] };
      return;
    }
    if (titlePage === "root") {
      // Roster select path leftover (v440): beginMatchFromTitle routes into
      // roster when ROSTER_SELECT_READY; else direct start (seat still locked).
      if (titleSel === 0) { beginMatchFromTitle("cpu"); return; }
      if (titleSel === 1) { titlePage = "controls"; titleSel = 0; return; }
      if (titleSel === 2) { titlePage = "options"; titleSel = 0; return; }
      if (titleSel === 3) { titlePage = "escenarios"; titleSel = yardIndex; return; }
      // Online / versus 2P scaffolding leftover (v427): locked VERSUS is a
      // no-op (PRÓXIMAMENTE). When VERSUS_2P_READY, arm matchKind and start.
      if (titleSel === 4) {
        if (!VERSUS_2P_READY) return;
        beginMatchFromTitle("versus");
        return;
      }
      // Online stub leftover (v434): locked ONLINE is a no-op (PRÓXIMAMENTE).
      // When ONLINE_2P_READY, arm matchKind online and start (net path later).
      if (titleSel === 5) {
        if (!ONLINE_2P_READY) return;
        beginMatchFromTitle("online");
        return;
      }
      return;
    }
  }

  function nudgeVolume(which, dir) {
    if (which === "music") {
      volMusic = Math.max(0, Math.min(100, volMusic + dir * 5));
      persistVol();
    } else {
      volSfx = Math.max(0, Math.min(100, volSfx + dir * 5));
      persistVol();
    }
    playSfx(SFX.uiMenu, { volume: 0.42 });
  }

  function handleTitleKey(c) {
    if (remapCapture && (remapCapture.kind === "kb" || remapCapture.kind === "kb_p2")) {
      if (c === "Enter" || c === "Escape") remapCapture = null;
      return;
    }
    if (titlePage === "controls") {
      if (c === "Enter" || c === "Space") confirmTitle();
      return;
    }
    if (titlePage === "escenarios") {
      const n = STAGE_ITEMS.length;
      if (c === "ArrowUp" || c === "KeyW") titleSel = (titleSel + n - 1) % n;
      else if (c === "ArrowDown" || c === "KeyS") titleSel = (titleSel + 1) % n;
      else if (c === "Enter" || c === "Space") confirmTitle();
      return;
    }
    // Roster select path leftover (v440): same caret wrap as escenarios.
    if (titlePage === "roster") {
      const n = rosterCount();
      if (c === "ArrowUp" || c === "KeyW") titleSel = (titleSel + n - 1) % n;
      else if (c === "ArrowDown" || c === "KeyS") titleSel = (titleSel + 1) % n;
      else if (c === "Enter" || c === "Space") confirmTitle();
      return;
    }
    if (titlePage === "options") {
      const n = optionsCount();
      if (c === "ArrowUp" || c === "KeyW") titleSel = (titleSel + n - 1) % n;
      else if (c === "ArrowDown" || c === "KeyS") titleSel = (titleSel + 1) % n;
      else if (c === "ArrowLeft") {
        const id = OPT_ITEMS[titleSel];
        if (id === "vol_music") nudgeVolume("music", -1);
        else if (id === "vol_sfx") nudgeVolume("sfx", -1);
      } else if (c === "ArrowRight") {
        const id = OPT_ITEMS[titleSel];
        if (id === "vol_music") nudgeVolume("music", 1);
        else if (id === "vol_sfx") nudgeVolume("sfx", 1);
      } else if (c === "Enter" || c === "Space") confirmTitle();
      return;
    }
    if (titlePage === "remap_kb" || titlePage === "remap_pad" || titlePage === "remap_kb_p2") {
      const n = remapCount();
      if (c === "ArrowUp" || c === "KeyW") titleSel = (titleSel + n - 1) % n;
      else if (c === "ArrowDown" || c === "KeyS") titleSel = (titleSel + 1) % n;
      else if (c === "Enter" || c === "Space") confirmTitle();
      return;
    }
    // root
    const n = rootCount();
    if (c === "ArrowUp" || c === "KeyW") titleSel = (titleSel + n - 1) % n;
    else if (c === "ArrowDown" || c === "KeyS") titleSel = (titleSel + 1) % n;
    else if (c === "Enter" || c === "Space") confirmTitle();
  }

  function titlePointer(e) {
    const p = canvasToGame(e);
    const id = hitMenu(p.x, p.y);
    if (!id) return;
    if (id === "jugar") { titleSel = 0; confirmTitle(); }
    else if (id === "controles") { titleSel = 1; confirmTitle(); }
    else if (id === "opciones") { titleSel = 2; confirmTitle(); }
    else if (id === "escenarios") { titleSel = 3; confirmTitle(); }
    else if (id === "versus") { titleSel = 4; confirmTitle(); }
    else if (id === "online") { titleSel = 5; confirmTitle(); }
    else if (STAGE_ITEMS.indexOf(id) >= 0) { titleSel = STAGE_ITEMS.indexOf(id); confirmTitle(); }
    // Roster select path leftover (v440): click a ready row / VOLVER.
    else if (rosterEntry(id)) {
      for (let i = 0; i < ROSTER.length; i++) if (ROSTER[i].id === id) { titleSel = i; break; }
      confirmTitle();
    }
    else if (id === "volver") confirmTitle();
    else if (id === "remap_kb") { titleSel = 0; confirmTitle(); }
    else if (id === "remap_pad") { titleSel = 1; confirmTitle(); }
    else if (id === "remap_p2") { titleSel = 2; confirmTitle(); }
    else if (id === "reset") { titleSel = 3; confirmTitle(); }
    else if (id.indexOf("vol_music") === 0) {
      titleSel = 4;
      if (id === "vol_music_less") nudgeVolume("music", -1);
      else if (id === "vol_music_more") nudgeVolume("music", 1);
    } else if (id.indexOf("vol_sfx") === 0) {
      titleSel = 5;
      if (id === "vol_sfx_less") nudgeVolume("sfx", -1);
      else if (id === "vol_sfx_more") nudgeVolume("sfx", 1);
    } else if (id.indexOf("remap_") === 0) {
      const act = id.slice(6);
      const ix = REMAP_ACTIONS.indexOf(act);
      if (ix >= 0) { titleSel = ix; confirmTitle(); }
    }
  }

  function pollPadCapture() {
    if (!remapCapture || remapCapture.kind !== "pad") return;
    let gp = null;
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : null;
      if (pads) for (let i = 0; i < pads.length; i++) if (pads[i]) { gp = pads[i]; break; }
    } catch (err) {}
    if (!gp) {
      padMsg = "SIN MANDO";
      padMsgT = 900;
      remapCapture = null;
      return;
    }
    // Face / shoulder buttons first; axes for left/right.
    if (gp.buttons) {
      for (let i = 0; i < gp.buttons.length; i++) {
        const b = gp.buttons[i];
        const pressed = b && (b.pressed || b.value > 0.5);
        if (pressed) {
          setPadBind(remapCapture.action, "btn-" + i);
          remapCapture = null;
          return;
        }
      }
    }
    if (gp.axes && gp.axes.length) {
      const ax = gp.axes[0] || 0;
      if (ax <= -0.55) { setPadBind(remapCapture.action, "axis-0-"); remapCapture = null; return; }
      if (ax >= 0.55) { setPadBind(remapCapture.action, "axis-0+"); remapCapture = null; return; }
    }
  }

  function volBar(v) {
    const n = Math.round(v / 10);
    let sbar = "";
    for (let i = 0; i < 10; i++) sbar += i < n ? "#" : ".";
    return sbar;
  }

  function liveBindLine(action, label) {
    const codes = binds[action] || [];
    const shown = codes.map(codeLabel).join("+");
    return codeLabel(codes[0] || "?") + (codes.length > 1 ? "+" + codes.slice(1).map(codeLabel).join("+") : "") + "  " + label;
  }

  function stickApply(nx) {
    let dir = 0;
    if (nx <= -STICK_DEAD) dir = -1;
    else if (nx >= STICK_DEAD) dir = 1;
    if (dir === -1) {
      if (!stickHeldA) { stickHeldA = true; feedKey("KeyA", true); }
      if (stickHeldD) { stickHeldD = false; feedKey("KeyD", false); }
    } else if (dir === 1) {
      if (!stickHeldD) { stickHeldD = true; feedKey("KeyD", true); }
      if (stickHeldA) { stickHeldA = false; feedKey("KeyA", false); }
    } else {
      if (stickHeldA) { stickHeldA = false; feedKey("KeyA", false); }
      if (stickHeldD) { stickHeldD = false; feedKey("KeyD", false); }
    }
  }

  function stickSetKnob(dx, dy) {
    stickKnobDx = dx;
    stickKnobDy = dy;
    const knob = document.getElementById("stick-knob");
    if (knob && knob.style) knob.style.transform = "translate(" + dx + "px," + dy + "px)";
  }

  function clearStickEaseHeld() {
    // Stick .held chrome linger leftover (v356): drop held when ease ends.
    if (stickEaseEl && stickEaseEl.classList) stickEaseEl.classList.remove("held");
    stickEaseEl = null;
  }

  function tickStickKnobEase(dt) {
    // Stick/pad release linger leftover: ease knob → center (visual only).
    if (stickKnobEaseT <= 0) return;
    if (stickPtr != null) {
      // Re-grab owns .held; abandon ease clock without dumping chrome here.
      stickKnobEaseT = 0;
      stickEaseEl = null;
      return;
    }
    stickKnobEaseT = Math.max(0, stickKnobEaseT - dt);
    const dur = WALK_SETTLE_MS > 0 ? WALK_SETTLE_MS : 1;
    const u = 1 - (stickKnobEaseT / dur);
    const s = u * u * (3 - 2 * u);
    stickSetKnob(stickKnobFromDx * (1 - s), stickKnobFromDy * (1 - s));
    if (stickKnobEaseT <= 0) {
      stickSetKnob(0, 0);
      clearStickEaseHeld();
    }
  }

  function stickPointerDown(e, el) {
    unlockSfx();
    revealPad();
    // Cancel in-flight knob ease — re-grab mid-ease takes over (no snap fight).
    stickKnobEaseT = 0;
    // Stick .held chrome linger leftover (v356): re-grab clears ease-el; same
    // stick keeps .held, a different el would drop the old chrome.
    if (stickEaseEl && stickEaseEl !== el && stickEaseEl.classList) {
      stickEaseEl.classList.remove("held");
    }
    stickEaseEl = null;
    stickPtr = e.pointerId;
    stickEl = el;
    if (el && el.classList) el.classList.add("held");
    try { el.setPointerCapture(e.pointerId); } catch (err) {}
    stickPointerMove(e);
  }

  function stickPointerMove(e) {
    if (stickPtr == null || e.pointerId !== stickPtr) return;
    const el = stickEl;
    if (!el || typeof el.getBoundingClientRect !== "function") return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const maxR = Math.min(r.width, r.height) * 0.5 * 0.72;
    let dx = e.clientX - cx;
    let dy = e.clientY - cy;
    const len = Math.hypot(dx, dy) || 1;
    if (len > maxR) { dx = dx / len * maxR; dy = dy / len * maxR; }
    stickKnobEaseT = 0;
    stickSetKnob(dx, dy);
    stickApply(maxR > 0 ? dx / maxR : 0);
  }

  function stickRelease(pointerId) {
    if (stickPtr == null) return;
    if (pointerId != null && pointerId !== stickPtr) return;
    stickPtr = null;
    const el = stickEl;
    stickEl = null;
    // Stick/pad release linger leftover: ease knob home over WALK_SETTLE_MS.
    // Walk keys still clear immediately via stickApply(0) — do not linger A/D.
    // Stick .held chrome linger leftover (v356): keep .held while knob eases;
    // dump immediately only when already centered (no ease).
    if (Math.abs(stickKnobDx) > 0.01 || Math.abs(stickKnobDy) > 0.01) {
      stickKnobFromDx = stickKnobDx;
      stickKnobFromDy = stickKnobDy;
      stickKnobEaseT = WALK_SETTLE_MS;
      stickEaseEl = el;
      if (el && el.classList) el.classList.add("held");
    } else {
      stickKnobEaseT = 0;
      stickSetKnob(0, 0);
      if (el && el.classList) el.classList.remove("held");
      stickEaseEl = null;
    }
    stickApply(0);
  }

  function drawTitleCard() {
    menuHits = [];
    if (titlePage === "remap_pad" && remapCapture && remapCapture.kind === "pad") pollPadCapture();
    const fade = Math.max(0, Math.min(1, (modeT - 160) / 280));
    // Roster select path leftover (v440): ROSTER rows + VOLVER. !ready grey
    // PRÓXIMAMENTE (mirror ONLINE). Chosen ready marks *. No new root row.
    // Roster select unlock leftover (v441): faces + pending match-kind chip.
    // Second fighter stub / CID unlock leftover (v442): CID ready (no suffix).
    // Roster face crop polish leftover (v443): e.face head boxes.
    if (titlePage === "roster") {
      drawPixelText("ELEGIR", W / 2, H * 0.14, 5, COL_HUESO, "center");
      const kindChip = pendingMatchKind === "versus" ? "VERSUS"
        : (pendingMatchKind === "online" ? "ONLINE" : "VS CPU");
      drawPixelText(kindChip, W / 2, H * 0.20, 2, COL_BRASA, "center");
      const y0 = H * 0.28;
      const faceSz = 52;
      for (let i = 0; i < ROSTER.length; i++) {
        const e = ROSTER[i];
        const on = titleSel === i;
        const locked = !e.ready;
        let col = on ? COL_BRASA : COL_HUESO;
        if (locked) col = on ? "#6a5e52" : "#5a5046";
        const mark = (!locked && e.id === p1FighterId) ? " *" : "";
        // CID/ROAN move kit leftover (v445): kit tag so CORTO/LARGO reads on ELEGIR.
        const kitTag = (!locked && e.kit) ? ("  " + e.kit) : "";
        const suffix = locked ? "  PRÓXIMAMENTE" : kitTag;
        const rowY = y0 + i * 64;
        // Roster face crop polish leftover (v443): per-row head box (not 2%/28% stub).
        const img = e.id === "cid" ? ART.rival : ART.you;
        const fx = W / 2 - 150;
        if (img && img.complete && img.naturalWidth > 0) {
          const fr = e.face || null;
          let sx, sy, sw, sh;
          if (fr && fr.sw > 0 && fr.sh > 0) {
            sx = Math.max(0, fr.sx | 0);
            sy = Math.max(0, fr.sy | 0);
            sw = Math.min(fr.sw | 0, img.naturalWidth - sx);
            sh = Math.min(fr.sh | 0, img.naturalHeight - sy);
          } else {
            sw = img.naturalWidth * 0.28;
            sh = img.naturalHeight * 0.28;
            sx = (img.naturalWidth - sw) * 0.42;
            sy = img.naturalHeight * 0.02;
          }
          ctx.save();
          ctx.globalAlpha = fade * (locked ? 0.35 : (on ? 1 : 0.82));
          ctx.fillStyle = locked ? "#2a2420" : "#1a1612";
          ctx.fillRect(fx - 2, rowY - faceSz / 2 - 2, faceSz + 4, faceSz + 4);
          if (on && !locked) {
            ctx.strokeStyle = COL_BRASA;
            ctx.lineWidth = 2;
            ctx.strokeRect(fx - 2, rowY - faceSz / 2 - 2, faceSz + 4, faceSz + 4);
          }
          ctx.drawImage(img, sx, sy, sw, sh, fx, rowY - faceSz / 2, faceSz, faceSz);
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = fade * 0.5;
          ctx.fillStyle = locked ? "#3a322c" : "#2a2420";
          ctx.fillRect(fx, rowY - faceSz / 2, faceSz, faceSz);
          ctx.restore();
        }
        const box = drawPixelText((on ? "> " : "  ") + e.label + mark + suffix, W / 2 + 20, rowY, 3, col, "center");
        pushMenuHit(e.id, { x: fx - 4, y: rowY - faceSz / 2 - 4, w: 320, h: faceSz + 8 });
      }
      const onBack = titleSel === ROSTER.length;
      const vol = drawPixelText((onBack ? "> " : "  ") + "VOLVER", W / 2, y0 + ROSTER.length * 64 + 12, 3, onBack ? COL_BRASA : COL_HUESO, "center");
      pushMenuHit("volver", vol);
      return;
    }
    if (titlePage === "escenarios") {
      drawPixelText("ESCENARIOS", W / 2, H * 0.16, 5, COL_HUESO, "center");
      const y0 = H * 0.30;
      for (let i = 0; i < STAGE_ITEMS.length; i++) {
        const id = STAGE_ITEMS[i];
        const on = titleSel === i;
        const chosen = id !== "volver" && i === yardIndex;
        const col = on ? COL_BRASA : COL_HUESO;
        const mark = chosen ? " *" : "";
        const box = drawPixelText((on ? "> " : "  ") + STAGE_LABELS[id] + mark, W / 2, y0 + i * 34, 3, col, "center");
        pushMenuHit(id, box);
      }
      return;
    }
    if (titlePage === "controls") {
      // Teach full verb set: core + chords (feint/agarre/rev/pushblock/riposte).
      // Remap-aware via bindPrimary + codeLabel. Tight 22px rows so VOLVER fits 16:9.
      drawPixelText("CONTROLES", W / 2, H * 0.10, 5, COL_HUESO, "center");
      const a = codeLabel(bindPrimary("left"));
      const d = codeLabel(bindPrimary("right"));
      const g = codeLabel(bindPrimary("guard"));
      const s = codeLabel(bindPrimary("slash"));
      const l = codeLabel(bindPrimary("golpe"));
      const k = codeLabel(bindPrimary("dart"));
      // Versus local 2P playable unlock leftover (v430): CONTROLES listed P1
      // only while VERSUS was locked — P2 binds unread. Soft: compact P2 block
      // (still step 22 / VOLVER at 0.88).
      const p2a = codeLabel(p2BindPrimary("left"));
      const p2d = codeLabel(p2BindPrimary("right"));
      const p2g = codeLabel(p2BindPrimary("guard"));
      const p2s = codeLabel(p2BindPrimary("slash"));
      const p2l = codeLabel(p2BindPrimary("golpe"));
      const p2k = codeLabel(p2BindPrimary("dart"));
      const lines = [
        a + " / " + d + "  CAMINAR",
        g + "  GUARDA",
        s + "  TAJO",
        l + "  GOLPE",
        k + "  DARDO",
        g + " EN STARTUP TAJO  FEINT",
        s + "+" + g + " CERCA  AGARRE",
        g + "+" + l + "  REVERSAL",
        // Teach / CONTROLES clarity leftover (v379): AWAY was EN; pad line
        // omitted AGARRE/REV. ATRAS + spelled pad chords.
        g + " + ATRAS  EMPUJON",
        g + " AL FILO PARRY>" + s + "/" + l + "  RIPOSTE",
        "PAD  GUARDA+TAJO AGARRE  GUARDA+GOLPE REV",
        "P2 " + p2a + "/" + p2d + " " + p2g + " " + p2s + "/" + p2l + "/" + p2k + " " + p2g + "+" + p2s + "/" + p2l,
      ];
      const y0 = H * 0.20;
      const step = 22;
      for (let i = 0; i < lines.length; i++) {
        drawPixelText(lines[i], W / 2, y0 + i * step, 2, "#a89b88", "center");
      }
      const vol = drawPixelText((titleSel === 0 ? "> " : "  ") + "VOLVER", W / 2, H * 0.88, 3, COL_BRASA, "center");
      pushMenuHit("volver", vol);
      return;
    }
    if (titlePage === "options") {
      drawPixelText("OPCIONES", W / 2, H * 0.18, 5, COL_HUESO, "center");
      const rows = [
        { id: "remap_kb", label: "REMAP TECLADO" },
        { id: "remap_pad", label: "REMAP PAD" },
        { id: "remap_p2", label: "REMAP P2" },
        { id: "reset", label: "RESTABLECER" },
        { id: "vol_music", label: "MÚSICA  " + volBar(volMusic) + "  " + volMusic },
        { id: "vol_sfx", label: "SFX     " + volBar(volSfx) + "  " + volSfx },
        { id: "volver", label: "VOLVER" },
      ];
      const y0 = H * 0.34;
      for (let i = 0; i < rows.length; i++) {
        const on = titleSel === i;
        const col = on ? COL_BRASA : COL_HUESO;
        const box = drawPixelText((on ? "> " : "  ") + rows[i].label, W / 2, y0 + i * 36, 3, col, "center");
        pushMenuHit(rows[i].id, box);
        if (rows[i].id === "vol_music" || rows[i].id === "vol_sfx") {
          pushMenuHit(rows[i].id + "_less", { x: box.x - 40, y: box.y, w: 36, h: box.h });
          pushMenuHit(rows[i].id + "_more", { x: box.x + box.w + 4, y: box.y, w: 36, h: box.h });
        }
      }
      if (padMsgT > 0 && padMsg) {
        drawPixelText(padMsg, W / 2, H * 0.90, 2, COL_BRASA, "center");
      }
      return;
    }
    if (titlePage === "remap_kb" || titlePage === "remap_pad" || titlePage === "remap_kb_p2") {
      const pad = titlePage === "remap_pad";
      const p2 = titlePage === "remap_kb_p2";
      drawPixelText(pad ? "REMAP PAD" : (p2 ? "REMAP P2" : "REMAP TECLADO"), W / 2, H * 0.16, 4, COL_HUESO, "center");
      const y0 = H * 0.30;
      for (let i = 0; i < REMAP_ACTIONS.length; i++) {
        const act = REMAP_ACTIONS[i];
        const on = titleSel === i;
        const capKind = pad ? "pad" : (p2 ? "kb_p2" : "kb");
        const capturing = remapCapture && remapCapture.action === act && remapCapture.kind === capKind;
        const code = pad ? (padBinds[act] && padBinds[act][0]) : (p2 ? p2BindPrimary(act) : bindPrimary(act));
        const shown = capturing ? "..." : (pad ? String(code || "?").toUpperCase() : codeLabel(code));
        const line = REMAP_LABELS[act] + "  [ " + shown + " ]";
        const col = on ? COL_BRASA : COL_HUESO;
        const box = drawPixelText((on ? "> " : "  ") + line, W / 2, y0 + i * 34, 2, col, "center");
        pushMenuHit("remap_" + act, box);
      }
      const onBack = titleSel === REMAP_ACTIONS.length;
      const vol = drawPixelText((onBack ? "> " : "  ") + "VOLVER", W / 2, y0 + REMAP_ACTIONS.length * 34 + 16, 3, onBack ? COL_BRASA : COL_HUESO, "center");
      pushMenuHit("volver", vol);
      if (remapCapture) {
        drawPixelText(pad ? "PULSA UN BOTON" : "PULSA UNA TECLA", W / 2, H * 0.88, 2, COL_BRASA, "center");
        drawPixelText("(ESC CANCELA)", W / 2, H * 0.92, 2, "#a89b88", "center");
      }
      if (padMsgT > 0 && padMsg) drawPixelText(padMsg, W / 2, H * 0.96, 2, COL_BRASA, "center");
      return;
    }
    // root
    drawPixelText("VÍSPERA", W / 2, H * 0.26, 8, COL_HUESO, "center");
    if (fade <= 0) return;
    ctx.save();
    ctx.globalAlpha = 0.92 * fade;
    const labels = [
      { id: "jugar", text: "JUGAR", locked: false },
      { id: "controles", text: "CONTROLES", locked: false },
      { id: "opciones", text: "OPCIONES", locked: false },
      { id: "escenarios", text: "ESCENARIOS", locked: false },
      // Versus local 2P playable unlock leftover (v430): VERSUS unlocked.
      { id: "versus", text: "VERSUS", locked: !VERSUS_2P_READY },
      // Online stub leftover (v434): ONLINE locked (PRÓXIMAMENTE) until net path.
      { id: "online", text: "ONLINE", locked: !ONLINE_2P_READY },
    ];
    const y0 = H * 0.46;
    for (let i = 0; i < labels.length; i++) {
      const on = titleSel === i;
      let col = on ? COL_BRASA : COL_HUESO;
      if (labels[i].locked) col = on ? "#6a5e52" : "#5a5046";
      const suffix = labels[i].locked ? "  PRÓXIMAMENTE" : "";
      const box = drawPixelText((on ? "> " : "  ") + labels[i].text + suffix, W / 2, y0 + i * 34, 3, col, "center");
      pushMenuHit(labels[i].id, box);
    }
    ctx.restore();
  }

  function drawOverPrompt() {
    if (mode !== "over") return;
    const fade = Math.max(0, Math.min(1, modeT / 400));
    if (fade <= 0) return;
    ctx.save();
    ctx.globalAlpha = 0.92 * fade;
    drawPixelText("> REVANCHA / R", W / 2, H - 42, 3, COL_BRASA, "center");
    // Sparse rotating verb tip (parry / dardo / golpe). Draw-only; no new verbs.
    const tip = overTips()[overTipI % overTips().length];
    ctx.globalAlpha = 0.62 * fade;
    drawPixelText(tip, W / 2, H - 22, 2, "#a89b88", "center");
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
      drawParryGleam();
      drawClashSpark();
      drawHitSpark();
      drawBrasaFx();
      drawDmgNums();
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
