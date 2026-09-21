# Víspera — menu-spec

PC 16:9. Pixel text (mismo estilo que JUGAR / CONTROLES). Flujo mínimo. Ingeniería implementa; Arte no redibuja.

Hoy: título con **JUGAR** / **CONTROLES** (lista fija). Se amplía a menú serio con remap y opciones. **No** se añaden 6 botones nuevos de combate: solo se remapean los verbos que ya existen.

## Acciones remapeables (cerradas)

| Acción | Default teclado | Default pad (si cabe) | Nota |
|---|---|---|---|
| Izquierda | A | Stick/D-pad izq | Andar |
| Derecha | D | Stick/D-pad der | Andar |
| Guarda | S (hold) | LB / L1 (hold) | Mantener |
| Tajo | Espacio (J = alias fijo opcional) | A / Cross | Edge |
| Golpe | L | X / Square | Edge |
| Dardo | K | Y / Triangle | Director dijo “cuchillo”; en juego es **DARDO**. Misma acción. |

Chords (Space+S throw, L+S reversal, etc.) se resuelven por **acción**, no por tecla cruda: si remapeas Tajo a F, F+Guarda sigue siendo throw. No se inventan botones nuevos.

**Fuera del remap:** R (revancha), flechas/W-S/Enter (navegación de menú), Esc (atrás). No se tocan.

## Flujo de pantallas

```
TÍTULO (root)
 ├─ JUGAR ──────────────► play (resetRound)
 ├─ CONTROLES ──────────► página lectura (bindings actuales)
 ├─ OPCIONES ───────────► submenú
 │    ├─ Remap teclado
 │    ├─ Remap pad (si Gamepad API)
 │    ├─ Restablecer defaults
 │    ├─ Volumen música   (stub 0–100; Audio cuando llegue)
 │    ├─ Volumen SFX      (stub 0–100; Audio cuando llegue)
 │    └─ Volver
 └─ ESCENARIOS ─────────► bloqueado hasta que Arte entregue
                           (visible, gris, caret no confirma;
                            o “PRÓXIMAMENTE”)
```

Esc / click VOLVER = atrás un nivel. En root, Esc no cierra el juego.

## Wireframes (1280×720, texto pixel centrado)

### 1. Título — root

```
                    VÍSPERA


                 > JUGAR
                   CONTROLES
                   OPCIONES
                   ESCENARIOS      ← gris / “PRÓXIMAMENTE”
```

Caret `>` + color brasa en selección; resto hueso. Click/tap en hitbox. W/S o ↑↓ mueven; Enter/Espacio confirman.

### 2. Controles (lectura)

```
                    VÍSPERA

              A / D        CAMINAR
              S            GUARDA
              ESPACIO      TAJO
              L            GOLPE
              K            DARDO
              PALANCA / BOTONES

                 > VOLVER
```

Muestra **bindings vivos** (tras remap), no defaults hardcodeados. Una sola opción: VOLVER.

### 3. Opciones

```
                    OPCIONES

                 > REMAP TECLADO
                   REMAP PAD
                   RESTABLECER
                   MÚSICA    ████████░░  80
                   SFX       ██████░░░░  60
                   VOLVER
```

Remap pad: si no hay gamepad conectado, la fila se ve pero al confirmar: `SIN MANDO` un beat y se queda. No rompe.

Volumen: ←→ o click en barra. Persistir. Hasta que Audio cablee, mueven número y callan (stub OK).

### 4. Remap teclado (y espejo pad)

```
                 REMAP TECLADO

              IZQUIERDA    [ A ]
              DERECHA      [ D ]
            > GUARDA       [ S ]
              TAJO         [ ESPACIO ]
              GOLPE        [ L ]
              DARDO        [ K ]

                 VOLVER
```

Al confirmar una fila → modo captura:

```
              GUARDA       [ … ]
         PULSA UNA TECLA   (ESC cancela)
```

Reglas:
1. Captura la siguiente `keydown` (ignora modificadores solos: Shift/Ctrl/Alt/Meta).
2. Si la tecla ya está en otra acción → **swap** automático (no “tecla ocupada” con diálogo).
3. Si es tecla reservada (Esc, R, flechas de menú) → rechazo silencioso, sigue esperando.
4. Enter en captura no asigna Enter al combate; cancela captura.
5. Persistencia: `localStorage` clave `vispera.binds.v1` (teclado) / `vispera.pad.v1` (pad).
6. Restablecer = defaults de la tabla + wipe storage.

Pad: misma UI, `PULSA UN BOTÓN`. Stick ejes = izquierda/derecha (no botones cara). Si el usuario remapea un face button a andar, OK.

### 5. Escenarios (bloqueado)

```
                   ESCENARIOS

              PATIO        ← único, ya jugable vía JUGAR
              · · ·        ← slots vacíos / “—”

            (Arte no ha entregado más)
                 > VOLVER
```

Hasta entrega de Arte: **no se entra** desde root (fila gris). Cuando Arte entregue: desbloquear y listar; JUGAR sigue = patio default.

### 6. Pausa (mínimo, opcional v1)

Esc **en play** → vuelve a TÍTULO (sin confirm). No hay menú de pausa con resume en v1. Revancha sigue Espacio/R en KO.

## Persistencia y boot

1. Al cargar: leer binds; si corruptos → defaults.
2. Input runtime: capa `action → codes[]`. Teclado y pad alimentan las mismas acciones.
3. Alias J (tajo) en default: si el usuario remapea Tajo, J deja de ser alias salvo que lo asignen.
4. Touch pad on-screen: **no** se remapea en v1 (zonas fijas tajo/golpe/guarda/dardo). Solo teclado + gamepad.

## Recortes (siguen)

- No 6º botón de combate nuevo.
- No pantalla de créditos / ajuste de resolución / idioma.
- No perfiles de mando por marca.
- No tutorial de texto.
- No escenarios inventados antes de Arte.

## Hecho (Ingeniería)

1. Root con 4 filas; Escenarios gris.
2. Controles lee binds vivos.
3. Remap teclado con captura + swap + localStorage.
4. Remap pad si `navigator.getGamepads` (graceful sin mando).
5. Restablecer + dos volúmenes stub.
6. Chords siguen funcionando tras remap.
7. Gauntlet: defaults intactos; un test de “remap Tajo→KeyF dispara slash”.

Si el remap rompe un chord o el menú come inputs de play, paramos y arreglamos antes de Escenarios.
