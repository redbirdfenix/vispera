# Víspera — SFX pack (drop-in)

Real recorded / CC0 one-shots where available; a few **studio original synth** leftovers where packs had nothing suitable (KO fall, brasa/ember). No voice.

**Ingeniería monta; Audio no cablea `game.js`.**

## Format

- WAV, PCM 16-bit (`pcm_s16le`), **44100 Hz**, **mono**
- Peak ≈ −2 dBFS (gentle loudnorm / volume)
- Short edge fades (~5–20 ms) on cut Still North takes

## Files

| File | Role / trigger | Source author | Page URL | License |
|---|---|---|---|---|
| `sfx_whoosh_tajo.wav` | Tajo **startup** — air of the cut (~frame 0) | Still North Media (Ben Jaszczak & Brian Nelson) — *Sabre Swing* take | https://opengameart.org/content/medieval-sound-effects-weapon-textures | CC0 1.0 |
| `sfx_riposte.wav` | **Riposte** window/spend — snappy steel whoosh (faster than tajo) | Still North Media — *Katana Swing* cut + light clash tip | https://opengameart.org/content/medieval-sound-effects-weapon-textures · impacts pack | CC0 1.0 |
| `sfx_impacto_carne.wav` | **Hit connect** on body (pip / KO) — organic chop, not steel | Kenney (Kenney Vleugels) — `chop.ogg` from RPG set | https://opengameart.org/content/50-rpg-sound-effects | CC0 1.0 |
| `sfx_bloqueo_acero.wav` | Steel **block / parry** (tajo-vs-guarda) | Still North Media — *Sabre Norse Sword Blade on Blade* short take | https://opengameart.org/content/medieval-sound-effects-weapon-impacts | CC0 1.0 |
| `sfx_choque_clash.wav` | **Simultaneous** two-blade clash (heavier; distinct from bloqueo) | Still North Media — *Axe Sabre Blade on Blade* take | https://opengameart.org/content/medieval-sound-effects-weapon-impacts | CC0 1.0 |
| `sfx_ko_caida.wav` | **Knockdown** — armored body onto stone courtyard | **Studio original synth** (legacy) — no suitable body-fall in CC0 packs | — | Studio original |
| `sfx_cuchillo_lanzamiento.wav` | Knife / dagger **throw** (swing + short whoosh, layered) | Still North *Dagger Swing* + Vehicle / Jan Schupke *tube-plastic-whoosh-01* | https://opengameart.org/content/medieval-sound-effects-weapon-textures · https://opengameart.org/content/fantasy-sound-effects-tinysized-sfx | CC0 1.0 |
| `sfx_ui_menu.wav` | Clean UI **click / select** | Kenney — `click1.wav` UI set | https://opengameart.org/content/51-ui-sound-effects-buttons-switches-and-clicks | CC0 1.0 |
| `sfx_brasa_cast.wav` | **K plant** — ember puff on startup | **Studio original synth** (legacy) | — | Studio original |
| `sfx_brasa_impacto.wav` | **K connect hit** — ember dart into flesh | **Studio original synth** (legacy) | — | Studio original |
| `sfx_brasa_bloqueo.wav` | **K connect block** — dart dies on guard | **Studio original synth** (legacy) | — | Studio original |
| `sfx_brasa_choque.wav` | **K clash** — dart crushed on live blade | **Studio original synth** (legacy) | — | Studio original |

## Durations (approx.)

| File | Duration |
|---|---|
| `sfx_whoosh_tajo.wav` | 400 ms |
| `sfx_riposte.wav` | **Riposte** window/spend — snappy steel whoosh (faster than tajo) | Still North Media — *Katana Swing* cut + light clash tip | https://opengameart.org/content/medieval-sound-effects-weapon-textures · impacts pack | CC0 1.0 |
| `sfx_impacto_carne.wav` | 240 ms |
| `sfx_bloqueo_acero.wav` | 350 ms |
| `sfx_choque_clash.wav` | 400 ms |
| `sfx_ko_caida.wav` | 640 ms |
| `sfx_cuchillo_lanzamiento.wav` | 350 ms |
| `sfx_ui_menu.wav` | 94 ms |
| `sfx_brasa_cast.wav` | 165 ms |
| `sfx_brasa_impacto.wav` | 162 ms |
| `sfx_brasa_bloqueo.wav` | 176 ms |
| `sfx_brasa_choque.wav` | 198 ms |

## Legacy backup

Synthetic originals live in `_legacy_synth/` (including `_render.py`). Do not delete until Ingeniería confirms the new drop-ins.

Also downloaded but **not** used as finals (kept in `_dl/` for later variants): StarNinjas sword/clash packs (CC0).

## Drop-in paths

```
/workspace/estudio/vispera/sfx/sfx_whoosh_tajo.wav
/workspace/estudio/vispera/sfx/sfx_riposte.wav
/workspace/estudio/vispera/sfx/sfx_impacto_carne.wav
/workspace/estudio/vispera/sfx/sfx_bloqueo_acero.wav
/workspace/estudio/vispera/sfx/sfx_choque_clash.wav
/workspace/estudio/vispera/sfx/sfx_ko_caida.wav
/workspace/estudio/vispera/sfx/sfx_cuchillo_lanzamiento.wav
/workspace/estudio/vispera/sfx/sfx_ui_menu.wav
/workspace/estudio/vispera/sfx/sfx_brasa_cast.wav
/workspace/estudio/vispera/sfx/sfx_brasa_impacto.wav
/workspace/estudio/vispera/sfx/sfx_brasa_bloqueo.wav
/workspace/estudio/vispera/sfx/sfx_brasa_choque.wav
```
