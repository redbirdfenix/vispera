# Víspera — SFX pack (drop-in)

Original synthesis. No music. No voice. Do **not** mount these from `game.js` — Ingeniería owns wiring. Paths below are drop-in.

**Format:** WAV, PCM 16-bit (`pcm_s16le`), 44100 Hz, mono. Peak ≈ −2 dBFS. 4–7 ms fade to digital zero at both edges.

## Files

| File | Duration | Trigger |
|---|---|---|
| `sfx_whoosh_tajo.wav` | 340 ms | Tajo **startup**, ~frame 0 of the swing (air of the cut). Peak is late so it can lead into the hit. |
| `sfx_impacto_carne.wav` | 155 ms | **Hit connect** — clean tajo that lands on the body (pip / KO). Not for guarda, not for choque. |
| `sfx_bloqueo_acero.wav` | 190 ms | Steel block / parry **if/when it exists**. The one-pager originally cut block; Director still asked for the file. Live one-pager now has **Guarda (S)** — fire this on tajo-vs-guarda if Combate wires a steel stop. |
| `sfx_choque_clash.wav` | 245 ms | **Simultaneous active frames** (both tajos). Bind/clash: nobody falls. Do not use the KO or the flesh hit. |
| `sfx_ko_caida.wav` | 640 ms | **Knockdown** — armored body onto the stone courtyard after the last pip. No scream. |
| `sfx_brasa_cast.wav` | 165 ms | **K plant** (you + rival) — ember puff on the 200ms startup. Not steel, not the tajo whoosh. |
| `sfx_brasa_impacto.wav` | 162 ms | **K connect hit** — ember dart into flesh (you + rival). Not the tajo impacto. |
| `sfx_brasa_bloqueo.wav` | 176 ms | **K connect block** — dart dies on a raised guard. Steam + thunk, no steel ring. |
| `sfx_brasa_choque.wav` | 198 ms | **K clash** — dart crushed on a live blade. Snuff, not a two-sword bind. |

## Drop-in paths

```
/workspace/estudio/vispera/sfx/sfx_whoosh_tajo.wav
/workspace/estudio/vispera/sfx/sfx_impacto_carne.wav
/workspace/estudio/vispera/sfx/sfx_bloqueo_acero.wav
/workspace/estudio/vispera/sfx/sfx_choque_clash.wav
/workspace/estudio/vispera/sfx/sfx_ko_caida.wav
/workspace/estudio/vispera/sfx/sfx_brasa_cast.wav
/workspace/estudio/vispera/sfx/sfx_brasa_impacto.wav
/workspace/estudio/vispera/sfx/sfx_brasa_bloqueo.wav
/workspace/estudio/vispera/sfx/sfx_brasa_choque.wav
```

`_render.py` is the procedural bounce (numpy). Ingeniería does not need it to ship.
