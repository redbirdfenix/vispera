# Combate tip — Víspera v589 (PRIMARY locked)

VERIFIED (Read/rg, game.js untouched):
1) advanceAttack recovery-end @9275–9284: `aiSawBlock` clear is gated `if (f.cut === "slash" || f.cut === "golpe")` then `f.aiSawBlock = false` (~9283). Throw-cut recovery does **not** clear.
2) Same recovery-end then `const wasThrow = f.cut === "throw"` (~9288) and only later `f.cut = "slash"` (~9305) — cut stays `"throw"` through the clear seat, so the slash|golpe gate skips.
3) landThrowTech both-seats dump @12715–12758: beside v588 `f.pbBreakPending = false` (~12733) clears riposte/reversal/pending, sets `f.cut = "throw"` + `f.phase = "recovery"` + `techRec` — **no** `aiSawBlock` clear.
4) landThrow @12604–12680: atk → throw recovery (`atk.cut = "throw"` ~12620); clears `def.pbBreakPending` (v555) but **no** `atk.aiSawBlock = false` (unlike landHit ~12545).
5) Arm: landBlock @13108 `atk.aiSawBlock = true` (v544). Survives into idle after tech/throw recovery when clear seat was slash|golpe-only. Flesh still clears on landHit; cancelIntoBolt clears on spend (v550); bolt recovery-end belts (v550). Empty-K watch is not the hole.

Path: landBlock arms latch on atk (slash|golpe recovery) → landThrowTech rewrites both seats to throw recovery without dumping `aiSawBlock` → advanceAttack throw recovery-end skips ~9283 gate → idle inherits post-block latch (empty especial / melee-refuse / CutBolt gates stick after clean tech). Mirror class of v588 pbBreakPending tech-interrupt leftover.

---

HOLE: Post-block `aiSawBlock` latch survives landThrowTech / throw-cut recovery into idle — advanceAttack only clears on slash|golpe (~9283).

FILE: /workspace/estudio/vispera/game.js — advanceAttack recovery-end (~9279–9283); landThrowTech both-seats dump (~12715–12733, beside v588 pbBreakPending); landThrow atk throw recovery (~12617–12620); landBlock arm (~13108).

WHY: v544 arms `atk.aiSawBlock` on landBlock and clears it on slash|golpe recovery-end (and flesh / cancelIntoBolt / bolt-rec belts). landThrowTech (v481 dump + v588 pending clear) already mirrors riposte/reversal/pbBreakPending but still leaves `aiSawBlock` while forcing `cut="throw"` recovery on both seats — so the ~9283 gate never runs. Idle keeps the post-block latch after a clean tech (and any throw-cut recovery that carried the flag). Not empty-K / AI_CD / speculative yield — clear-on-resolve seat missing beside v588.

SOFT FIX:
- Primary (clear seat): in landThrowTech both-seats loop next to v588 `f.pbBreakPending = false;`, add `f.aiSawBlock = false;` — clear only; tech already resolved the exchange. P1+P2 shared.
- Belt (if needed): landThrow `atk.aiSawBlock = false;` mirror landHit ~12545 (atk throw recovery keeps cut==="throw" through ~9283).
- Optional belt: advanceAttack recovery-end also clear when `f.cut === "throw"` (or ungated clear before cut rewrite) so throw recovery-end cannot carry the latch if interrupt seat was missed.
- Soft only. No AI_CD / empty-K / cancel yield / speculative watch retune. No new combat verb.

LOCKS UNTOUCHED: v552–v588 (incl. v544 aiSawBlock arm + slash|golpe clear, v545/v549 post-block melee refuse, v550 cancelIntoBolt/bolt-rec clear, v553–v555 pbBreakPending, v588 landThrowTech pending clear); tipX/Space/L; AI_CD 0.99; ONLINE false; PUSHBLOCK_*; BOLT_STAM; throwBuf v409; no constant retune. Soft only.

TIP_VER: post-v588 (throw-cut / landThrowTech aiSawBlock belt-clear — post-block latch cannot survive tech/throw recovery into idle)
