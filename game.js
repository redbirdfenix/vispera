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
 * K bolt: 200 startup / 280 recovery, -30 stam, one live dart (shared).
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
 * Throw will not grab knockdown or stun (stunT / thrownT). Short throw-invuln on wakeup so the first grounded frame is not a free re-grab. Not a wakeup super. Rival still gated by THROW_AI_CD 1800.
 * Reversal from guard: hold S, tap L (not Space — Space+S is throw). Same L golpe frames/art (120/80/180). Short startup invuln so it beats a meaty Space slash. Costs REVERSAL_STAM 30 (a real chunk, not free). Loses to throw. On wakeup, L+S spends throw-invuln the same way (not a wakeup super). Far / out of throw range: L-from-guard still reverses, does not throw. Close: Space+S stays throw, L+S stays reversal. Chords do not collide. Pad: hold-guarda + tap-golpe, no 6th face button. Rival reversals that same L-from-guard: only while actually guarding AND a meaty Space slash or L golpe is coming (inThreat / incoming Space or L), REVERSAL_AI_CD 1800 + 40% once-per-swing so they are not a reversal robot. Not every block, not every L, not vs dart, not vs throw (throw still beats a bad reversal). Same 30 stam, same 120ms invuln, same L frames.
 * Wakeup reversal: after knockdown (thrownT/stunT expiry / throwInvuln window), tap L without holding S. Same 30 stam, same 120ms strike-invuln, same L frames (startReversal path). Still loses to throw — spends the throw-invuln so it is not a wakeup super. Hold-S tap-L on getup is that same spend (startReversal), not a second invuln. Too early (still down / thrownT) does nothing. Too late (window gone) is a normal L. One wakeup attempt per getup (wakeRev) so leftover throw-invuln cannot loop a free reversal. Pad: tap golpe on getup, no 6th button. Rival wakeup-reversals that same startReversal path: only on getup vs a meaty Space or L in pocket (incoming Space/L startup/active), REVERSAL_AI_CD 1800 + 40% once-per-getup so they are not a reversal robot. Not every wakeup, not every L, not vs dart, not vs throw (throw still beats a bad reversal). Same 30 stam, same 120ms invuln, same L frames.
 * Super meter: one stock. Connecting hits fill that fighter (slash/golpe/dart/throw) +20. Blocked specials fill a little (+10). Five connects fill one stock; two no longer dump a dart. Full bar: next K spends it for a heavier dart (−28, not a 100-to-0). Empty K is the normal −10 dart. Same 200 plant / −30 stam; super recovery 380 so it is a read. Empty chip stays −2; spent super blocked chips −6 (not −28). Pad still K, no 6th button. HUD: small brasa pip under stam fills while charging (pizarra/óxido/brasa/hueso), no new art.
 * Rival fills and spends the same stock. Range super only after a connect and inside SUPER_RANGE, never every full bar from fullscreen. Special-cancel K may spend (close, can hit). Still respects BOLT_AI_CD. Not a super robot.
 * Super spend sting: full-meter K (you + rival) layers pitched brasa/cast, not tajo whoosh. Empty K keeps the plant cast.
 * Super connect sting: spent dart (you + rival) pitches/layers brasa impacto on hit (including vs Space/L steel), brasa bloqueo on block. Empty dart vs steel still choque. Empty dart keeps the current impacto / bloqueo / choque.
 * Spent super dart vs Space/L steel is not a 0 clash (you + rival). It beats the slash: defender eats −28, slash loses. Empty dart vs steel still clashes 0. Guard still chips −6. One live dart, so two spent supers cannot meet.
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
 * riposte. Guard-zone brasa flash + floating "!" while window live. No 6th button.
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
  const METER_MAX = 100;
  const METER_HIT = 20;
  const METER_BLOCK_SPECIAL = 10;
  const METER_FLASH_MS = 220;
  const METER_GAIN_MS = 180;
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
  const FEINT_AI_CD = 1800;
  const FEINT_AI_CHANCE = 0.4;
  // Rival AI variety weights (readable personality, not noise).
  const AI_LINK_CHANCE = 0.4;
  const AI_LINK_RANGE_CHANCE = 0.55;
  const AI_CLOSE_GOLPE = 0.32;
  const AI_CLOSE_SLASH = 0.28;
  const AI_CLOSE_BAIT = 0.18;
  const AI_CLOSE_RESET = 0.14;
  const AI_POST_RESET = 0.55;
  const AI_BAIT_MS_MIN = 380;
  const AI_BAIT_MS_MAX = 720;
  const AI_RESET_MS = 900;
  const AI_RETREAT_MS_MIN = 220;
  const AI_RETREAT_MS_MAX = 480;
  const AI_MID_DART = 0.72;
  const AI_MID_WALK_PAUSE = 0.22;

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
  let lastParrySfx = "";
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

  const ART = {
    yard: loadImg("art/courtyard.png"),
    yard2: loadImg("art/courtyard2.png"),
    yard3: loadImg("art/courtyard3.png"),
    yard4: loadImg("art/courtyard4.png"),
    yard5: loadImg("art/courtyard5.png"),
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
    if (code.indexOf("Key") === 0 && code.length === 4) return code.slice(3);
    if (code.indexOf("Digit") === 0) return code.slice(5);
    if (code.indexOf("Arrow") === 0) return code.slice(5).toUpperCase();
    return code.toUpperCase();
  }
  function setBindCode(action, code) {
    if (!BIND_ACTIONS.includes(action)) return false;
    if (!code || RESERVED_CODES.has(code)) return false;
    if (code === "ShiftLeft" || code === "ShiftRight") return false;
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
    try { localStorage.removeItem(LS_BINDS); } catch (err) {}
    try { localStorage.removeItem(LS_PAD); } catch (err) {}
  }
  let remapCapture = null; // { kind:"kb"|"pad", action }
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

  function firstGamepad() {
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : null;
      if (!pads) return null;
      for (let i = 0; i < pads.length; i++) if (pads[i]) return pads[i];
    } catch (err) {}
    return null;
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
    if (c === "Space" || c === "KeyA" || c === "KeyD" || c === "KeyJ" || c === "KeyR" || c === "KeyS" || c === "KeyK" || c === "KeyL" || c === "ArrowUp" || c === "ArrowDown" || c === "ArrowLeft" || c === "ArrowRight" || c === "Enter" || c === "KeyW" || c === "Escape") {
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
    if (mode === "play" && c === "Escape") {
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
     thumb can leave the thin letterbox strip. Capture loss does not dump A/D. */
  let padShown = false;
  const padHoldN = Object.create(null);
  const padByPtr = new Map();
  const STICK_DEAD = 0.28;
  let stickPtr = null;
  let stickEl = null;
  let stickHeldA = false;
  let stickHeldD = false;
  let titlePage = "root";
  let titleSel = 0;
  let menuHits = [];

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

  function padDown(code, pointerId, el) {
    if (padByPtr.has(pointerId)) return;
    padByPtr.set(pointerId, { code: code, el: el });
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
    if (h.el && h.el.classList && !still) h.el.classList.remove("held");
    padHoldN[h.code] = Math.max(0, (padHoldN[h.code] || 0) - 1);
    if (padHoldN[h.code] === 0) feedKey(h.code, false);
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
      // releases. Zones still padUp (stick has no padByPtr row).
      if (stickPtr != null && e.pointerId === stickPtr) return;
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

  function sheetOf(f) {
    if (f.kind === "you") return DESIGN.you;
    return f.facing > 0 ? DESIGN.rivalFlip : DESIGN.rival;
  }

  function dressRival(f) {
    f.facing = -1;
    f.img = ART.rival;
  }

  function holdingCutBolt(f) {
    return !!(f && f.boltHoldCut && f.boltPhase);
  }

  function poseBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    const wind = you ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
    const slash = you ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
    const block = you ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
    const hurt = you ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
    if ((f.falling || f.hp <= 0) && ready(hurt)) return hurt;
    if (f.thrownT > 0 && ready(hurt)) return hurt;
    if (f.guarding && ready(block)) return block;
    if (f.cut === "throw" && (f.phase === "startup" || f.phase === "active" || f.phase === "recovery") && ready(wind)) return wind;
    // Special-cancel K: keep the cut sheet through the 200ms plant and K recovery.
    // Generic bolt startup used to swap slash→windup (idle plant) in one tick;
    // dart birth used to drop boltHoldCut and seat idle breath ~1.5px.
    const throwK = you ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
    if (holdingCutBolt(f) && ready(slash)) return slash;
    // Idle/walk K plant: throw_knife sheet (not sword windup). Special-cancel keeps cut.
    if (f.boltPhase === "startup" && ready(throwK)) return throwK;
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
    if (f.thrownT > 0 && ready(hurt)) return fam.hurt;
    if (f.guarding && ready(block)) return fam.block;
    if (f.cut === "throw" && (f.phase === "startup" || f.phase === "active" || f.phase === "recovery")) return fam.windup;
    const throwK = you ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
    if (holdingCutBolt(f) && ready(slash)) return fam.slash;
    if (f.boltPhase === "startup" && ready(throwK)) return fam.throwKnife;
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
      meterFlashT: 0,
      meterGainT: 0,
      meterFlashKind: "",
      comboN: 0,
      comboT: 0,
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
      throwTechArmed: 0,
      reversal: false,
      revCd: 0,
      revArmed: 0,
      wakeRevArmed: 0,
      pbCd: 0,
      pbArmed: 0,
      feintT: 0,
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
      aiSawBlock: false,
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
  let yardIndex = (() => {
    const raw = loadJson(LS_YARD, null);
    const n = (raw && typeof raw.index === "number") ? (raw.index | 0) : 0;
    return Math.max(0, Math.min(YARD_KEYS.length - 1, n));
  })();
  function persistYard() { saveJson(LS_YARD, { index: yardIndex }); }
  let yardPrevIndex = -1;
  let yardSwitchT = 0;
  function setYardIndex(i) {
    // Yard switch pop leftover: hard-cut used to pop the courtyard under
    // Escenarios the same tick index flipped. Arm crossfade; same yard quiet.
    const next = Math.max(0, Math.min(YARD_KEYS.length - 1, i | 0));
    if (next === yardIndex) return;
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
  const OVER_TIPS = [
    "TIP: S AL FILO → PARRY",
    "TIP: K DARDO",
    "TIP: L GOLPE",
  ];
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
    if (!atk || !def) return;
    const chain = atk.comboN > 0 && (def.stunT > 0 || def.falling || (def.thrownT || 0) > 0);
    atk.comboN = chain ? atk.comboN + 1 : 1;
    atk.comboT = atk.comboN >= 2 ? COMBO_SHOW_MS : 0;
    def.comboN = 0;
    def.comboT = 0;
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
    if (mode === "over") rotateYardForContrast();
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
        f.walkPlanted = true;
      }
      f.walkFadeHold = walkSheetK(f);
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
      if (reversalPlantFade(f) <= 0.02 && wakeupFade(f) <= 0.02) f.walkFadeHold = 0;
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
    if (wakeupFade(f) > 0) {
      if (walking(f) || recoveryWalkOut(f) || f.walkFadeHold > 0.02) return 0;
      if (f.guarding || f.guardPoseK > 0) return 0;
      return amp * (1 - wakeupFade(f));
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
    if (win.phase !== "idle") advanceAttack(win, dt);
    tickSheathe(win, dt);
    tickCutRecBreath(win, dt);
  }

  function slashPose(f) {
    if (f.falling) {
      const t = Math.min(1, f.fallT / FALL_MS);
      const lift = (1 - t) * (1 - t);
      // destRect-only. AABB planted. Freeze sat at oy 0; −10 used
      // to dump the same tick beginFall set falling. Ease leftover
      // plant into the lift. Extra rot stays 0.
      return { rot: 0, ox: 0, oy: -10 * lift * crumpleFade(f) };
    }
    // Throw knockdown reuses hurt/KO art. destRect planted; no extra rot.
    // Throw KD leftover destRect plant: leftover k still drives destRect
    // via guardPlant. Hurt rot stays 0 so leftover guard rot does not
    // stack extra. Extra destRect rot stays 0.
    if (f.thrownT > 0 && f.hp > 0) {
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
    const pose = (walking(f) || (f.stunT > 0 && f.hp > 0) || f.falling) ? { rot: 0, ox: 0, oy: 0 } : slashPose(f);
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
    // TipX under plant fades leftover: connected slash-L / clash-Space/L used to
    // dump tip onto windup the same tick poseBitmap flipped while leftover slash
    // still owned the sheet (linkPlantFade / clashPlantFade), so tip juice hopped
    // ~240px off the visible blade — a hop, not a plant. Same hole spark origin
    // leftover already closed for clash-K / idle-sheathe-K castPlantXY. Ease
    // slash→pose tip with that leftover fade. HoldCut still slash tip. Telegraph /
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
    let tip = d.tipX != null ? r.dx + d.tipX * s : (f.facing > 0 ? r.dx + r.dw - 8 : r.dx + 8);
    const k = Math.max(clashPlantFade(f), linkPlantFade(f));
    if (k > 0.02) {
      const sl = poseFamily(f).slash;
      if (sl && sl.tipX != null) {
        const sx = r.dx + sl.tipX * s;
        tip = sx + (tip - sx) * (1 - k);
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
          ? r.dx + bl.tipX * s
          : (f.facing > 0 ? r.dx + r.dw - 8 : r.dx + 8);
        tip = bx + (tip - bx) * (1 - tipPlantK);
      }
    }
    // Tip under telegraphFade leftover: tip used to hop idle/walk→windup
    // (throwKnife on K) the same tick poseBitmap flipped while leftover idle
    // still owned the sheet (telegraphFade) — a hop, not a plant. Mirror tipX
    // under plant fades. Ease idle-edge→pose tip with telegraphFade (tf rises
    // 0→1). Idle/walk have no tipX; sheet-edge matches pre-tele tip. Rival same.
    // TipX under plant fades / reversal tip unchanged. castPlantXY K path
    // unchanged. tip markers / steelX / bladeBox / active hitbox unchanged.
    // AABB planted.
    if (telegraphing(f)) {
      const tf = telegraphFade(f);
      if (tf < 0.98) {
        const ex = f.facing > 0 ? r.dx + r.dw - 8 : r.dx + 8;
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
    const fk = feintFade(f);
    if (fk > 0.02) {
      const wu = poseFamily(f).windup;
      if (wu && wu.tipX != null) {
        const wx = r.dx + wu.tipX * s;
        tip = wx + (tip - wx) * (1 - fk);
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
        tip = sy + (tip - sy) * (1 - k);
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
    // Tip under telegraphFade leftover: ease idle-edge→pose tipY with
    // telegraphFade (mirror bladeTipX). Idle/walk have no tipY; bodyAABB
    // chest mid matches pre-tele tipY fallback without bladeBox (tipX-live).
    // tip markers / steelX / bladeBox unchanged. AABB planted.
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
        tip = ey + (tip - ey) * tf;
      }
    }
    // Tip under feintFade leftover: ease windup→pose tipY with feintFade
    // (fk dies 1→0; mirror bladeTipX). tip markers / steelX / bladeBox
    // unchanged. AABB planted.
    const fk = feintFade(f);
    if (fk > 0.02) {
      const wu = poseFamily(f).windup;
      if (wu && wu.tipY != null) {
        const wy = r.dy + wu.tipY * s;
        tip = wy + (tip - wy) * (1 - fk);
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
    return f.cut === "golpe" ? GOLPE_LUNGE_PX : LUNGE_PX;
  }

  function startAttack(f, kind) {
    if (f.falling || f.guarding || f.stunT > 0) return;
    if (f.boltPhase) return;
    if (f.feintT > 0) return;
    if (f.phase !== "idle") return;
    if (openLeft > 0) return;
    if (f.kind === "rival") {
      if (player.stunT > 0 || player.falling) return;
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
    f.leftoverPlantTip = (f.guardPoseK || 0) > 0;
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
    f.gait = 0;
    f.cutRecBreathT = 0;
    f.feintT = FEINT_RECOVERY;
    f.sheatheT = SHEATHE_MS;
    f.telegraph = false;
    if (feintRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
    playSfx(SFX.whoosh, { rate: 1.28, volume: 0.48 });
    spawnPlantDust(f, 0.9);
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
    if (!f || f.stunT <= 0) return;
    const prevStun = f.stunT;
    f.stunT = Math.max(0, f.stunT - dt);
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
      }
    }
  }

  function startThrow(f) {
    // Close throw. Same verb on you and the rival. Not a cancel door.
    if (!f) return false;
    if (f.falling || f.stunT > 0) return false;
    if (f.feintT > 0) return false;
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
    f.clashRec = false;
    f.techRec = false;
    f.techGuardTip = false;
    f.leftoverPlantTip = false;
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
    if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
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
    if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
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
    if (bolt) return false;
    if (player.boltPhase === "startup" || rival.boltPhase === "startup") return false;
    if (f.clashRec) {
      return (cutRecovery(f) - f.phaseT) <= BOLT_CANCEL_MS;
    }
    if (!f.cutHit) return false;
    return (cutRecovery(f) - f.phaseT) <= BOLT_CANCEL_MS;
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
    } else {
      f.holdCutPlant = true;
      f.linkSheathe = leftoverSheathe;
      if (clashRecWalk && f.walkFadeHold < 0.02) f.walkFadeHold = 1;
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
    const gReach = bladeReach(rival) + GOLPE_LUNGE_PX;
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
    const gReach = bladeReach(rival) + GOLPE_LUNGE_PX;
    atk.linkGolpe = rivalLinkRoll(absGap() <= gReach);
  }

  function rivalTrySlashGolpe() {
    // Same last-100ms door as the player. Chance was armed on connect.
    // Clash late recovery uses that same L door (40% once-per-clash).
    // Clash-K keeps priority so the 40% dart door is not stolen.
    if (!rival.linkGolpe) return false;
    if (rival.clashRec && rival.linkBolt) return false;
    if (!slashToGolpeWindow(rival)) return false;
    return cancelIntoGolpe(rival);
  }

  function armRivalGolpeLink(atk) {
    // One roll per connected golpe. Not every L, not from idle, not on whiff.
    if (!atk || atk.kind !== "rival" || atk.cut !== "golpe") return;
    const sReach = bladeReach(rival) + LUNGE_PX;
    atk.linkSlash = rivalLinkRoll(absGap() <= sReach);
  }

  function rivalTryGolpeSlash() {
    // Same last-100ms reverse door as the player. Chance was armed on connect.
    // Clash late recovery uses that same Space door (40% once-per-clash).
    // Clash-K keeps priority so the 40% dart door is not stolen.
    if (!rival.linkSlash) return false;
    if (rival.clashRec && rival.linkBolt) return false;
    if (!golpeToSlashWindow(rival)) return false;
    return cancelIntoSlash(rival);
  }

  function armRivalBoltLink(atk) {
    // One roll per connected tajo or golpe. Not every hit, not from idle, not on whiff.
    // Dart always "reaches" — bump when still mid/close so the door fires more in pocket.
    if (!atk || atk.kind !== "rival") return;
    if (atk.cut !== "slash" && atk.cut !== "golpe") return;
    const HOLD = bladeReach(rival) + LUNGE_PX;
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
    // Combo doors fire first so the 40% tajo↔golpe once-per-connect is unchanged.
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
    const HOLD = bladeReach(rival) + LUNGE_PX;
    if (dist > HOLD + LUNGE_PX) return false;
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
    const HOLD = bladeReach(rival) + LUNGE_PX;
    if (dist > HOLD + LUNGE_PX) return false;
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

  function rollStandoff() {
    return STANDOFF_MIN + Math.random() * (STANDOFF_MAX - STANDOFF_MIN);
  }

  function rivalClearCommit() {
    rival.standWait = 0;
    rival.standGoal = 0;
    rival.closing = false;
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
    if (rivalTryDartNow()) return true;
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

    const gReach = bladeReach(rival) + GOLPE_LUNGE_PX;
    const shove = startupShovePx(rival, GOLPE_STARTUP);
    const golpeOk = dist + shove <= gReach;
    const r = Math.random();
    const tGolpe = AI_CLOSE_GOLPE;
    const tSlash = tGolpe + AI_CLOSE_SLASH;
    const tBait = tSlash + AI_CLOSE_BAIT;
    const tReset = tBait + AI_CLOSE_RESET;

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

  function tickAI(dt) {
    rival.gait = 0;
    rival.wantBlock = false;
    if (openLeft > 0) return;
    if (rival.throwCd > 0) rival.throwCd = Math.max(0, rival.throwCd - dt);
    if (rival.revCd > 0) rival.revCd = Math.max(0, rival.revCd - dt);
    if (rival.pbCd > 0) rival.pbCd = Math.max(0, rival.pbCd - dt);
    if (rival.feintCd > 0) rival.feintCd = Math.max(0, rival.feintCd - dt);
    if (rival.aiResetT > 0) rival.aiResetT = Math.max(0, rival.aiResetT - dt);
    if (rivalTryThrowTech()) return;
    if (rivalTryFeint()) return;
    if (!rivalCanAct()) return;
    if (player.stunT > 0 || player.falling) return;
    if (rivalTryWakeReversal()) return;

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

    // Occasional hold-guard bait (no perfect-parry AI). Keep raise while baiting
    // even if the player is idle; drop when timer ends, then resume mix.
    if (rival.aiBaitT > 0 && !playerSwinging) {
      rival.aiBaitT = Math.max(0, rival.aiBaitT - dt);
      if (canStartGuard || rival.guarding) {
        rival.wantBlock = true;
        rival.guardChoice = 1;
        rival.phase = "idle";
        rival.phaseT = 0;
        rivalClearCommit();
        if (rival.aiBaitT <= 0) {
          rival.guardChoice = 0;
          rival.wantBlock = false;
          if (dist <= myReach) rival.aiResetT = Math.max(rival.aiResetT, 200);
        }
        return;
      }
      rival.aiBaitT = 0;
      rival.guardChoice = 0;
    }

    // Soft retreat after reset / bait — walk out, then prefer dart if ready.
    if (rival.aiRetreatT > 0 && !playerSwinging) {
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
    if (broken) {
      rival.closing = false;
      rival.standWait = 0;
      rival.standGoal = 0;
      const shove = startupShovePx(rival);
      if (player.phase === "recovery" && dist + shove <= myReach) {
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
      return;
    }

    if (player.phase === "recovery") {
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
      if (rival.boltArmed && rival.boltCd <= 0 && dist > HOLD + 16 && canStartBolt(rival)) {
        const rMid = Math.random();
        if (rMid >= 1 - AI_MID_DART) {
          startBolt(rival, rivalShouldSuper());
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
    f.stamina -= PUSHBLOCK_STAM;
    f.stamRegenT = STAMINA_REGEN_DELAY;
    f.pushT = GUARD_PUSH_MS;
    f.pushVel = (PUSHBLOCK_PX * away) / GUARD_PUSH_MS;
    spawnPlantDust(f, PUSHBLOCK_FX, away);
    // Player pushblock dust leftover: landBlock's 1.0 plant used to ride under
    // the boot after hitstop while PUSHBLOCK_FX scrape also spawned (shove arms
    // from the buffer after connect). Draw-only. Drop leftover block plant stamps
    // when shove owns the scrape. Rival landBlock already skips the small plant.
    // Specks still fly. Normal block still plants 1.0.
    dropBlockPlantUnderShove(f);
    playPushblockSting();
    // Distinct connect juice vs normal block: stronger camera punch + óxido steel.
    // Hitstop ms / shove px / stam cost unchanged. Draw-only flash + shake mag.
    bumpShake(PUSHBLOCK_SHAKE, away, HITSTOP_BLOCK);
    {
      const foe = f === player ? rival : player;
      const pt = guardSteelPoint(f);
      spawnSteelFlash(pt.x, pt.y, foe, f, true, "push");
    }
    if (f.stamina <= 0) tripGuardBreak(f);
    return true;
  }

  function dropBlockPlantUnderShove(f) {
    // Draw-only. Cull leftover landBlock plant stamps (power 1.0, unshifted)
    // for this fighter so shove scrape alone rides the boot. Specks keep flying.
    if (!f) return;
    const homeYou = f.kind === "you";
    for (let i = plantDust.length - 1; i >= 0; i--) {
      const p = plantDust[i];
      if (p.speck || p.shove) continue;
      if (p.homeYou !== homeYou) continue;
      if (Math.abs((p.power || 0) - 1) > 0.001) continue;
      if (p.plantDX) continue;
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
      const fade = 1 - u;
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
    if (holdingCutBolt(f)) return fallback;
    if (f.boltPhase !== "startup" && boltPlantFade(f) <= 0) return fallback;
    // Idle/walk K cast/puff rides the raised knife tip (throwKnife), not sword windup.
    const d = poseFamily(f).throwKnife || poseFamily(f).windup;
    if (d.tipX == null) return fallback;
    const r = destRect(f);
    const sc = poseScale(f);
    let x = r.dx + d.tipX * sc;
    let y = d.tipY != null ? r.dy + d.tipY * sc : fallback.y;
    const cf = clashPlantFade(f);
    const lf = linkPlantFade(f);
    const k = Math.max(cf, lf);
    if (k > 0.02) {
      const sl = poseFamily(f).slash;
      if (sl.tipX != null) {
        const sx = r.dx + sl.tipX * sc;
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
    spawnPlantDust(player, 1.2);
    spawnPlantDust(rival, 1.2);
    // Clearer clash grit: outward shove trails on top of locked 1.2 scrape.
    // Draw-only (CLASH_FX). Specks still fly. 1.2 stamps stay for bar lock.
    spawnPlantDust(player, CLASH_FX, -1);
    spawnPlantDust(rival, CLASH_FX, 1);
    bumpShake(CLASH_SHAKE, 1, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    playSfx(SFX.choque);
    playClashSting();
  }

  function pulseBar(f, before) {
    f.hudGhost = Math.max(f.hudGhost, before);
    f.hudFlashT = 220;
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
    def.techRec = false;
    def.techGuardTip = false;
    def.leftoverPlantTip = false;
    // Grab-connect juice: GRAB_SHAKE + pitched impacto sting + brief brasa/hueso puff.
    // Hitstop / THROW_DMG / KD / frames unchanged. Distinct from tech steel + normal hit spark.
    bumpShake(GRAB_SHAKE, atk.facing, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playSfx(SFX.impacto);
    playGrabConnectSting();
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
    spawnPlantDust(atk, 1.1);
    spawnPlantDust(def, 1.1);
    // Clearer tech-clash grit: outward shove trails on top of locked 1.1 scrape.
    // Draw-only (TECH_FX). Specks still fly. 1.1 stamps stay for bar lock.
    spawnPlantDust(atk, TECH_FX, -dir);
    spawnPlantDust(def, TECH_FX, dir);
    bumpShake(TECH_SHAKE, dir, HITSTOP_BLOCK);
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
    if (d && d.steelX != null) x = r.dx + d.steelX * sc;
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
    // Guard-break steel sync leftover: tip plant (!atk) must ride wound — sync
    // blade∩body mid used to hop the asterisk off the opaque tip.
    spawnSteelFlash(pt.x, pt.y, other, f, !atk);
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
    playRiposteSpendSting();
    slashBuf = true;
    golpeBuf = false;
    boltBuf = false;
    throwBuf = false;
    openBuf = false;
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
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    // Reward path: arm existing riposte window (same RIPOSTE_WIN 280).
    if (def.stamina > 0) {
      def.riposteWindowT = RIPOSTE_WIN_MS;
      def.riposteArmed = false;
    }
    spawnParryGleam(pt.x, pt.y, def);
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    spawnPlantDust(def, 1.05);
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
    applyPush(def, atk);
    bumpShake(4, dir, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    lastPushblockSfx = "block";
    playSfx(SFX.bloqueo);
    const pt = cutPoint(atk, def);
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    // Hold-block does NOT arm RIPOSTE_WIN (Combate v308 — riposte from parry only).
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else spawnSteelFlash(pt.x, pt.y, atk, def);
    // After the block sting so a successful rival shove keeps lastPushblockSfx.
    // tryPushblock overwrites the small block vel with the 240px shove.
    // Pushblock dust leftover: landBlock's 1.0 plant used to stack under the
    // live PUSHBLOCK_FX scrape, so leftover block grit rode the 240px trail.
    // Draw-only. Skip the small plant when shove owns the scrape.
    let shoved = false;
    if (def === rival) shoved = rivalPushblockOnBlock();
    if (!shoved) spawnPlantDust(def, 1.0);
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
    f.meterGainT = METER_GAIN_MS;
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
    if (bolt) return false;
    if (player.boltPhase === "startup" || rival.boltPhase === "startup") return false;
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
    // Tip under bolt leftover short raise leftover: latch tip raise when
    // leftover k planted so tipPlantK boltT ease holds after gpk dies
    // (boltLeftoverPlanting stays true whole startup; idle K still snaps
    // with no latch; special-cancel still snaps). Draw-only.
    u.leftoverPlantTip = (u.guardPoseK || 0) > 0;
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
      playSfx(SFX.cast);
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
      f.clashPlant = false;
      f.linkPlant = false;
      f.holdCutPlant = false;
      f.linkSheathe = 0;
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
    const dmg = (bolt && bolt.super) ? BOLT_SUPER_DMG : SLASH_DMG;
    def.hp = Math.max(0, def.hp - dmg);
    pulseBar(def, before);
    spawnDmgNum(pt.x, pt.y, before - def.hp, false, def);
    gainMeter(atk, METER_HIT);
    if (atk.kind === "rival") atk.superArmed = true;
    bumpShake(10, dir, HITSTOP_HIT);
    hitstopLeft = HITSTOP_HIT;
    playBoltHitSting(!!(bolt && bolt.super));
    def.stunT = HITSTUN;
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
    spawnPlantDust(def, 1.15);
    if (def.hp <= 0) koTarget = def;
  }

  function landBoltBlock(def, atk, dir, pt) {
    noteConnect();
    applyPush(def, atk);
    bumpShake(4, dir, HITSTOP_BLOCK);
    hitstopLeft = HITSTOP_BLOCK;
    playBoltBlockSting(!!(bolt && bolt.super));
    spawnPlantDust(def, 1.0);
    const before = def.hp;
    const chip = (bolt && bolt.super) ? BOLT_SUPER_CHIP : BOLT_CHIP;
    def.hp = Math.max(0, def.hp - chip);
    pulseBar(def, before);
    spawnDmgNum(pt.x, pt.y, before - def.hp, true, def);
    gainMeter(atk, METER_BLOCK_SPECIAL);
    if (def.hp <= 0) koTarget = def;
    def.stamina = Math.max(0, def.stamina - STAMINA_BLOCK);
    def.stamRegenT = STAMINA_REGEN_DELAY;
    if (def.stamina <= 0) tripGuardBreak(def, atk);
    else spawnBrasaFx("block", pt.x, pt.y, atk.facing, def, boltLandFxScale());
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
      if (rival.guarding && facingAttacker(rival, player)) landBlock(player, rival, 1);
      else landHit(player, rival, 1);
      return;
    }
    if (bHits && !aInv && !spentSuperBeatsCut(rival)) {
      if (player.guarding && facingAttacker(player, rival)) landBlock(rival, player, -1);
      else landHit(rival, player, -1);
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
    const threat = absGap() <= bladeReach(f) + LUNGE_PX + LUNGE_PX;
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
    // Hold juice clocks through freeze. hitFlashT (120) used to die
    // inside HITSTOP_HIT (140); steel asterisk (60) died with HITSTOP_BLOCK.
    // Sparks already held. Grit specks + HUD bar-drain used to keep
    // flying while bodies were frozen. Camera punch used to share the
    // hitstop clock and fade to 0 before knock; settle dip same.
    // Fade after time resumes.
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
      if (steelFlashT > 0) steelFlashT = Math.max(0, steelFlashT - dt);
      if (parryGleamT > 0) parryGleamT = Math.max(0, parryGleamT - dt);
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
        bumpShake(5, koTarget.kind === "you" ? -1 : 1, 140);
      }
      if (koTarget.fallT >= FALL_MS) {
        mode = "over";
        modeT = 0;
        overTipI = (overTipI + 1) % OVER_TIPS.length;
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
    if (player.falling || player.guarding) { slashBuf = false; golpeBuf = false; boltBuf = false; openBuf = false; }
    if (player.thrownT > 0) { golpeBuf = false; reversalBuf = false; }
    if (feintEdge || (throwEdge && canFeint(player))) {
      // Slash startup: S is feint, not throw. Idle Space+S still throws.
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      openBuf = false;
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
      attackEdge = false;
      golpeEdge = false;
      reversalBuf = false;
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
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
      attackEdge = false;
      golpeEdge = false;
      const locked =
        player.stunT > 0 ||
        !!player.boltPhase ||
        player.feintT > 0 ||
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
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      golpeBuf = false;
      boltBuf = false;
      if (openLeft > 0) openBuf = true;
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
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      slashBuf = false;
      openBuf = false;
      boltBuf = false;
      if (openLeft > 0) golpeBuf = true;
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
        player.phase === "startup" ||
        player.phase === "active" ||
        player.phase === "recovery";
      if (openLeft > 0) { /* opening K is still refused, not buffered */ }
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
    syncPlantDust();
    syncClashSpark();
    syncHitSpark();
    syncDmgNums();
    syncSteelFlash();

    player.facing = 1;
    rival.facing = -1;
    dressRival(rival);
    tickAI(dt);
    updateGuard(rival, dt, !!rival.wantBlock);
    tickCutRecBreath(rival, dt);
    advanceAttack(player, dt);
    advanceAttack(rival, dt);
    rivalTrySlashGolpe();
    rivalTryGolpeSlash();
    rivalTryCutBolt();
    advanceBolt(dt);
    tickBolt(dt);
    // Spark origin leftover: castPlantXY blend follows boltT / clashPlant /
    // linkPlant. Mid-frame cancel + bolt advance used to leave brasaX on the
    // spawn tip until draw. Ride live origin after bolt clocks move.
    syncBrasaFx();
    syncRipostePad();
    if (openBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0) {
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
    if (slashBuf && openLeft <= 0 && golpeToSlashWindow(player) && !player.guarding && player.stunT <= 0 && !player.falling) {
      slashBuf = false;
      golpeBuf = false;
      cancelIntoSlash(player);
    }
    // Riposte armed from window press — fire as faster slash when idle/unguarded.
    tryFireRiposte();
    if (slashBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0) {
      // Same hold gate as openBuf. Immediate fire after a landed cut sat
      // ~10px short (knock 80 − lunge 36) — whoosh + slash in empty air.
      const ph = player.phase;
      player.phase = "active";
      const hold = bladeReach(player) + LUNGE_PX;
      player.phase = ph;
      if (bodyGap() <= hold + 2) {
        slashBuf = false;
        golpeBuf = false;
        startAttack(player);
      }
    }
    if (golpeBuf && openLeft <= 0 && slashToGolpeWindow(player) && !player.guarding && player.stunT <= 0 && !player.falling) {
      golpeBuf = false;
      slashBuf = false;
      cancelIntoGolpe(player);
    }
    if (golpeBuf && openLeft <= 0 && player.phase === "idle" && !player.guarding && player.stunT <= 0 && !player.falling && player.feintT <= 0) {
      if (player.thrownT > 0) {
        golpeBuf = false;
      } else if (wakeupWindow(player) && startWakeReversal(player)) {
        golpeBuf = false;
        slashBuf = false;
      } else {
        const ph = player.phase;
        player.phase = "active";
        const hold = bladeReach(player) + GOLPE_LUNGE_PX;
        player.phase = ph;
        if (bodyGap() <= hold + 2) {
          golpeBuf = false;
          slashBuf = false;
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
    if (boltBuf && player.phase === "idle" && player.feintT <= 0) boltBuf = false;
    if (throwBuf && openLeft <= 0 && (player.phase === "idle" || player.guarding) && player.stunT <= 0 && !player.falling && !player.boltPhase && player.feintT <= 0) {
      throwBuf = false;
      slashBuf = false;
      golpeBuf = false;
      boltBuf = false;
      reversalBuf = false;
      if (!tryThrowTech(player)) startThrow(player);
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
    if (mode === "title") return 0;
    if (shake <= 0 || shakeDur <= 0) return 0;
    const k = Math.min(1, shake / shakeDur);
    // Full cover while the slide still reads. Last quarter eases to flush.
    if (k > 0.25) return PUNCH_PX;
    const u = k / 0.25;
    return PUNCH_PX * u * u * (3 - 2 * u);
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
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youSlash : right ? ART.rivalFlipSlash : ART.rivalSlash;
  }

  function walkBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youWalk : right ? ART.rivalFlipWalk : ART.rivalWalk;
  }

  function hurtBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youHurt : right ? ART.rivalFlipHurt : ART.rivalHurt;
  }

  function windupBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youWindup : right ? ART.rivalFlipWindup : ART.rivalWindup;
  }

  function throwKnifeBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youThrowKnife : right ? ART.rivalFlipThrowKnife : ART.rivalThrowKnife;
  }

  function blockBitmap(f) {
    const you = f.kind === "you";
    const right = f.facing > 0;
    return you ? ART.youBlock : right ? ART.rivalFlipBlock : ART.rivalBlock;
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
    if (!f || f.meterFlashT <= 0) return 0;
    return f.meterFlashT / METER_FLASH_MS;
  }

  function meterGainK(f) {
    // Draw-only. Partial fill pulse envelope (meterGainT). Stock-complete
    // / spend still ride meterFlashK. destRect/AABB planted.
    if (!f || f.meterGainT <= 0) return 0;
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
    const wake = wakeupFade(f);
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
    // Throw / cut recovery fade leftover: >0.02 used to drop the idle base while
    // poseBitmap still held windup, so the last recovery tick flashed full grab.
    // Keep idle/walk base through any live throwPlantFade. Overlay alpha can be tiny.
    // Recovery walk-out pose leftover: leftover windup used to rest on idle while
    // A/D was held through throw recovery (gaitWalkOn false — phase locks
    // walking()), so the fade dumped standing idle then popped walk when
    // recovery ended — a hop, not a plant. Rest leftover grab on the walk
    // sheet when A/D is held. Idle throw recovery still rests on idle.
    // poseBitmap still windup while planted. AABB planted.
    const restThrowWalk = trf > 0 && ready(wind) && recoveryWalkOut(f) && recoveryWalkResting(f) && ready(walk) && walk !== wind;
    const restThrow = trf > 0 && !restThrowWalk && ready(wind) && ready(idle) && idle !== wind;
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
    if (f.hudFlashT > 0) f.hudFlashT = Math.max(0, f.hudFlashT - dt);
    else if (f.hudGhost > f.hp) f.hudGhost = Math.max(f.hp, f.hudGhost - 80 * (dt / 1000));
    else f.hudGhost = f.hp;
    if (f.meterFlashT > 0) f.meterFlashT = Math.max(0, f.meterFlashT - dt);
    else f.meterFlashKind = "";
    if (f.meterGainT > 0) f.meterGainT = Math.max(0, f.meterGainT - dt);
    if (f.comboT > 0) f.comboT = Math.max(0, f.comboT - dt);
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
      const k = f.hudFlashT / 220;
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
    const floor = STAMINA_START_MIN / STAMINA_MAX;
    drawHudFrame(x, sy, w, sh);
    if (stam > 0) {
      ctx.fillStyle = f.guardBreakT > 0 ? COL_BRASA : COL_OXIDO;
      if (stam < floor || f.guardBreakT > 0) ctx.globalAlpha = 0.32;
      fillFrom(left, x, sy, w, sh, stam);
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
    if (mg > 0 && k > 0) {
      const grow = 1 + Math.round(mg);
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.40 * mg;
      fillFrom(left, mx, my - grow, mw, mh + grow * 2, k);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.50 * mg;
      fillFrom(left, mx, my, mw, mh, k);
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
    if (k >= 1 && mf > 0 && mKind === "full") {
      ctx.fillStyle = COL_HUESO;
      ctx.globalAlpha = 0.72 * mf;
      fillFrom(left, mx, my - 1, mw, mh + 2, 1);
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.85 * mf;
      const tip = 7;
      ctx.fillRect(left ? mx + mw - tip : mx, my - 1, tip, mh + 2);
      ctx.globalAlpha = 1;
    }
    // Spend bite: shrinking remnant (not tip pop-off) + óxido lip.
    if (k < 1 && mf > 0 && mKind === "spend") {
      ctx.fillStyle = COL_BRASA;
      ctx.globalAlpha = 0.88 * mf;
      fillFrom(left, mx, my, mw, mh, mf);
      const edge = Math.max(2, Math.round(mw * mf));
      const lip = 3;
      ctx.fillStyle = COL_OXIDO;
      ctx.globalAlpha = 0.75 * mf;
      if (left) ctx.fillRect(mx + edge - lip, my, lip, mh);
      else ctx.fillRect(mx + mw - edge, my, lip, mh);
      ctx.globalAlpha = 1;
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
    return [
      a + "/" + d + " ANDAR  " + g + " GUARDA  " + s + " TAJO  " + l + " GOLPE  " + k + " DARDO",
      "S AL FILO PARRY>" + s + "/" + l + " RIPOSTE  " + s + "+" + g + " AGARRE  " + g + "+" + l + " REV",
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
    // Tasteful floating bang while riposte window is live (pizarra/brasa).
    // Pixel bars — no title-card font (title stays drawPixelText / FONT5).
    if (!player || player.riposteWindowT <= 0 || mode !== "play") return;
    const k = Math.min(1, player.riposteWindowT / RIPOSTE_WIN_MS);
    const bb = bodyAABB(player);
    const x = bb.x + bb.w * 0.5;
    const y = bb.y - 22 - (1 - k) * 6;
    ctx.save();
    ctx.globalAlpha = 0.4 + 0.5 * k;
    ctx.fillStyle = COL_BRASA;
    ctx.fillRect(x - 2, y - 14, 4, 12);
    ctx.fillRect(x - 2, y + 2, 4, 4);
    ctx.globalAlpha = 0.22 * k;
    ctx.fillStyle = COL_HUESO;
    ctx.fillRect(x - 2, y - 15, 4, 12);
    ctx.fillRect(x - 2, y + 1, 4, 4);
    ctx.restore();
  }

  function drawComboCount(f) {
    // Sparse pixel combo on 2+ connects. Near the attacker, fades fast.
    // Scale 2 — not SF-style huge. Palette hueso over negro outline.
    // Does not sit on HP/stam / teach HUD.
    if (!f || f.comboN < 2 || f.comboT <= 0 || mode !== "play") return;
    const u = Math.min(1, f.comboT / COMBO_SHOW_MS);
    const bb = bodyAABB(f);
    const x = bb.x + bb.w * 0.5;
    const y = bb.y - 28 - (1 - u) * 10;
    ctx.save();
    ctx.globalAlpha = 0.45 + 0.40 * u;
    drawPixelText(String(f.comboN | 0), x, y, 2, COL_HUESO, "center");
    ctx.restore();
  }

  function drawHud() {
    drawLifeBar(player, true);
    drawLifeBar(rival, false);
    drawComboCount(player);
    drawComboCount(rival);
    drawControlsHint();
    drawRiposteHint();
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
    // Pushblock connect: óxido asterisk. Throw-tech: hueso/brasa. Normal block / guard-break stay silver.
    steelKind = kind === "push" ? "push" : (kind === "tech" ? "tech" : "block");
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
    const k = clashSparkT / CLASH_SPARK_MS;
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
    const k = hitSparkT / HIT_SPARK_MS;
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
    const life = brasaFxKind === "block" ? STEEL_FLASH_MS : (brasaFxKind === "clash" ? CLASH_SPARK_MS : (brasaFxKind === "cast" ? BOLT_CAST_FX_MS : (brasaFxKind === "grab" ? GRAB_FX_MS : BRASA_HIT_MS)));
    const k = brasaFxT / life;
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
      const k = Math.max(0, 1 - p.t / p.life);
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
    const k = steelFlashT / STEEL_FLASH_MS;
    const push = steelKind === "push";
    const tech = steelKind === "tech";
    ctx.save();
    ctx.translate(steelX, steelY);
    ctx.globalAlpha = 0.35 + 0.65 * k;
    // Pushblock: óxido spokes + hueso core. Throw-tech: hueso spokes + brasa core.
    // Normal block keeps silver asterisk.
    ctx.strokeStyle = push ? COL_OXIDO : (tech ? COL_HUESO : "#e8e2d2");
    ctx.fillStyle = push ? "rgba(207, 195, 168, 0.78)" : (tech ? "rgba(196, 40, 24, 0.72)" : "rgba(210, 205, 190, 0.7)");
    ctx.lineWidth = push || tech ? 2.6 : 2;
    const arm = push || tech ? 22 : 18;
    const tall = push || tech ? 17 : 14;
    const diag = push || tech ? 14 : 12;
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
    }
    ctx.globalAlpha = 0.35 + 0.65 * k;
    ctx.beginPath();
    ctx.arc(0, 0, ((push || tech) ? 6 : 5) + ((push || tech) ? 10 : 8) * (1 - k), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParryGleam() {
    // Brief brasa flash on guard tip — distinct from steel asterisk + riposte bang.
    if (parryGleamT <= 0) return;
    syncParryGleam();
    const k = parryGleamT / PARRY_GLEAM_MS;
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

  const ROOT_ITEMS = ["jugar", "controles", "opciones", "escenarios"];
  const STAGE_ITEMS = ["yard", "yard2", "yard3", "yard4", "yard5", "volver"];
  const STAGE_LABELS = {
    yard: "PATIO · SOL",
    yard2: "PATIO 2 · SOMBRA",
    yard3: "PUENTE · OCASO",
    yard4: "ARMERÍA · BRASA",
    yard5: "MURALLA · LUNA",
    volver: "VOLVER",
  };
  const OPT_ITEMS = ["remap_kb", "remap_pad", "reset", "vol_music", "vol_sfx", "volver"];
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
    if (titlePage === "remap_kb" || titlePage === "remap_pad") {
      const wasPad = titlePage === "remap_pad";
      titlePage = "options";
      titleSel = wasPad ? 1 : 0;
      return;
    }
  }

  function rootCount() { return ROOT_ITEMS.length; }
  function optionsCount() { return OPT_ITEMS.length; }
  function remapCount() { return REMAP_ACTIONS.length + 1; }

  function confirmTitle() {
    playSfx(SFX.uiMenu, { volume: 0.55 });
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
    if (titlePage === "root") {
      if (titleSel === 0) { requestStart = true; return; }
      if (titleSel === 1) { titlePage = "controls"; titleSel = 0; return; }
      if (titleSel === 2) { titlePage = "options"; titleSel = 0; return; }
      if (titleSel === 3) { titlePage = "escenarios"; titleSel = yardIndex; return; }
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
    if (remapCapture && remapCapture.kind === "kb") {
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
    if (titlePage === "remap_kb" || titlePage === "remap_pad") {
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
    else if (STAGE_ITEMS.indexOf(id) >= 0) { titleSel = STAGE_ITEMS.indexOf(id); confirmTitle(); }
    else if (id === "volver") confirmTitle();
    else if (id === "remap_kb") { titleSel = 0; confirmTitle(); }
    else if (id === "remap_pad") { titleSel = 1; confirmTitle(); }
    else if (id === "reset") { titleSel = 2; confirmTitle(); }
    else if (id.indexOf("vol_music") === 0) {
      titleSel = 3;
      if (id === "vol_music_less") nudgeVolume("music", -1);
      else if (id === "vol_music_more") nudgeVolume("music", 1);
    } else if (id.indexOf("vol_sfx") === 0) {
      titleSel = 4;
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
    const knob = document.getElementById("stick-knob");
    if (knob && knob.style) knob.style.transform = "translate(" + dx + "px," + dy + "px)";
  }

  function stickPointerDown(e, el) {
    unlockSfx();
    revealPad();
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
    stickSetKnob(dx, dy);
    stickApply(maxR > 0 ? dx / maxR : 0);
  }

  function stickRelease(pointerId) {
    if (stickPtr == null) return;
    if (pointerId != null && pointerId !== stickPtr) return;
    stickPtr = null;
    if (stickEl && stickEl.classList) stickEl.classList.remove("held");
    stickEl = null;
    stickSetKnob(0, 0);
    stickApply(0);
  }

  function drawTitleCard() {
    menuHits = [];
    if (titlePage === "remap_pad" && remapCapture && remapCapture.kind === "pad") pollPadCapture();
    const fade = Math.max(0, Math.min(1, (modeT - 160) / 280));
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
      const lines = [
        a + " / " + d + "  CAMINAR",
        g + "  GUARDA",
        s + "  TAJO",
        l + "  GOLPE",
        k + "  DARDO",
        g + " EN STARTUP TAJO  FEINT",
        s + "+" + g + " CERCA  AGARRE",
        g + "+" + l + "  REVERSAL",
        g + " + AWAY  EMPUJON",
        "S AL FILO PARRY>" + s + "/" + l + "  RIPOSTE",
        "PAD  GUARDA+TAJO / GOLPE",
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
    if (titlePage === "remap_kb" || titlePage === "remap_pad") {
      const pad = titlePage === "remap_pad";
      drawPixelText(pad ? "REMAP PAD" : "REMAP TECLADO", W / 2, H * 0.16, 4, COL_HUESO, "center");
      const y0 = H * 0.30;
      for (let i = 0; i < REMAP_ACTIONS.length; i++) {
        const act = REMAP_ACTIONS[i];
        const on = titleSel === i;
        const capturing = remapCapture && remapCapture.action === act && remapCapture.kind === (pad ? "pad" : "kb");
        const code = pad ? (padBinds[act] && padBinds[act][0]) : bindPrimary(act);
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
    const tip = OVER_TIPS[overTipI % OVER_TIPS.length];
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
