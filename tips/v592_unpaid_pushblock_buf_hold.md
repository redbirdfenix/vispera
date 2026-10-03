# Combate tip — Víspera v592 (PRIMARY candidate)

VERIFIED (Read/rg, game.js untouched):
1) tryPushblock @11791–11814: unpaid `f.stamina < PUSHBLOCK_STAM` → return false (~11804); shoveOwns refuse (~11814) separate. Teach drawPushblockHintFor already mutes unpaid + pushT>0 (~17752 / stam gate ~16950).
2) P1 flush @14516–14521: `tryPushblock(...); pushblockBuf = 0;` ALWAYS — unpaid away-tap / freeze-armed flush clear-then-fail with no keep.
3) P2 tickVersusP2 @10782–10791: edge away try then `p2PushblockBuf = 0`; buf flush same always-clear.
4) flushVersusP2CombatBufs @10374–10376: rising-guard PB flush always `p2PushblockBuf = 0` after try.
5) Freeze-arm v575 @14238 / @14184 already requires `stamina >= PUSHBLOCK_STAM` (no unpaid freeze arm). Mid-combat / post-freeze flush seats still eat unpaid taps. v591 unpaid hold-S REV keep does NOT cover EMPUJON. Rejected idle unpaid boltBuf-keep is multi-cause canStartBolt — not this single-cause PUSHBLOCK_STAM refuse.

Path: hold-S, away-tap while stam < 25 → tryPushblock false → buf hard-cleared → stam regen while still guarding needs re-tap (teach already silent unpaid). Mirror class of v582 wake unpaid L / v591 hold-S unpaid REV for the third stam-cost defensive verb.

---

HOLE: Unpaid EMPUJON still eats the away-tap/buf on guard flush seats — tryPushblock returns false unpaid, but P1/P2 edge+flush seats always `pushblockBuf/p2PushblockBuf = 0` after try (clear-then-fail).

FILE: /workspace/estudio/vispera/game.js — tryPushblock unpaid refuse (~11804); P1 tapWalk/pushblockBuf flush (~14516–14521); P2 edge/buf flush (~10782–10791); flushVersusP2CombatBufs (~10374–10376). Teach mute already live (drawPushblockHintFor); v575 freeze-arm stam gate locked.

WHY: v591 keeps unpaid hold-S REV buf; v582 keeps unpaid wake L; teach already mutes unpaid PB. EMPUJON flush seats still clear-then-fail on `stamina < PUSHBLOCK_STAM` so a payable away-tap after regen while still guarding is gone. Not idle unpaid boltBuf-keep (multi-cause canStartBolt — Director rejected SILENT). Not bare pushT>0 / shoveOwns retune (v587 locked). Soft unpaid-stam buffer-hold class for EMPUJON.

SOFT FIX:
- On the five P1+P2 guarding edge/flush seats: only clear pushblockBuf/p2PushblockBuf when tryPushblock succeeds.
- If refuse && guarding && dir === awayWalkDir(f) && stamina < PUSHBLOCK_STAM: keep/arm the away buf (do not clear).
- Other refuses (toward, throw-incoming, GB, stun, falling, openLeft, shoveOwns): still clear.
- Soft only. No PUSHBLOCK_STAM/PX / GUARD_PUSH_MS / shoveOwns expression / freeze-arm v575 retune. No new combat verb.

LOCKS UNTOUCHED: v552–v591 (incl. v575 freeze-arm PB stam+GB, v587 shoveOwns refuse, v591 unpaid REV keep, v582 wake unpaid L); tipX/Space/L; hitstop 140/60; hitstun 350; buffer 80; MAX_HP 100; SLASH_DMG −10; parry/riposte; AI_CD 0.99; ONLINE false; PUSHBLOCK_STAM 25 / PX 240; BOLT_STAM 30; REVERSAL_STAM 30; throwBuf v409; no constant retune. Soft only.

TIP_VER: post-v591 (unpaid EMPUJON pushblockBuf keep — guard-seat sibling of v591 REV unpaid; not idle boltBuf-keep / shoveOwns / freeze-arm twin)
