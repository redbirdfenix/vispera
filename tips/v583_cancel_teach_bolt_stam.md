# Combate tip — Víspera v583 (PRIMARY locked)

VERIFIED (Read, game.js untouched):
1) drawCancelHint P1 winK push @16643: `if (winK) parts.push(codeLabel(bindPrimary("dart")));` — no explicit `stamina >= BOLT_STAM` (unlike v578 For).
2) drawCancelHintFor P2 @16517–16519: v578 already `if (winK && f.stamina >= BOLT_STAM) parts.push(dartLab);`
3) brasa paint @16560 (For) and @16690 (P1): both `const col = (winK && i === 0) ? COL_BRASA : COL_HUESO;` — raw winK, not listed glyph.
Note: `cutToBoltWindow` @9035–9038 already rejects `f.stamina < BOLT_STAM`, so unpaid K is not advertised via winK today; hole is teach-line asymmetry + brasa not keyed to actually-listed K (brittle if push/gate diverge). Skip alt wake Space/K hold (v582 unpaid wake-L).

---

HOLE: Cancel-teach P1 BOLT_STAM gate missing vs v578 drawCancelHintFor; both seats paint leading cancel glyph COL_BRASA on raw winK&&i===0, not when K is actually listed.

FILE: /workspace/estudio/vispera/game.js — drawCancelHint (~16643 push; ~16690 brasa); drawCancelHintFor (~16519 push locked v578; ~16560 brasa).

WHY: v578 gated P2 teach push to the live cancel’s BOLT_STAM 30 payment so K is not advertised unpaid; P1 push still reads `if (winK)` only. Leading brasa (v387) is meant for the special-cancel door glyph — `winK && i===0` lies if K was not pushed (Space/L would inherit brasa). Belt both seats to `parts[0]===dartLab` so brasa tracks the listed dart label, not the raw window flag.

SOFT FIX:
- P1 drawCancelHint: bind `const dartLab = codeLabel(bindPrimary("dart"));` then `if (winK && player.stamina >= BOLT_STAM) parts.push(dartLab);` (parity with v578 For).
- Both seats paint: `const col = (parts[0] === dartLab) ? COL_BRASA : COL_HUESO;` at For ~16560 and P1 ~16690 (For already has dartLab param).
- Draw-only. No combat math / buffer / wake hold / constant retune.

LOCKS UNTOUCHED: v552–v582; BOLT_STAM 30; no constant retune; tipX / Space / L; AI_CD 0.99; ONLINE false (ONLINE_2P_READY); cutToBoltWindow / cutToBoltWindowOpen / cancel yield-flush v578; unpaid wake-L hold v582; K-first v385; Clash-K priority; pad / frames / plants.

TIP_VER: post-v582 (cancel-teach P1 BOLT_STAM parity + listed-K brasa both seats)
