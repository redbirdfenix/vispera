#!/usr/bin/env python3
"""
Víspera — procedural SFX pack.
Original synthesis only. WAV PCM 16-bit 44.1 kHz mono.
"""
from __future__ import annotations

import os
import wave

import numpy as np

SR = 44100
OUT_DIR = os.path.dirname(os.path.abspath(__file__))
RNG = np.random.default_rng(vispera_seed := 0x56495350)  # 'VISP'


# ---------------------------------------------------------------------------
# primitives
# ---------------------------------------------------------------------------

def t_axis(n: int) -> np.ndarray:
    return np.arange(n, dtype=np.float64) / SR


def n_samples(ms: float) -> int:
    return int(round(ms * 0.001 * SR))


def white(n: int) -> np.ndarray:
    return RNG.uniform(-1.0, 1.0, n)


def pink(n: int) -> np.ndarray:
    """Paul Kellet refined pink-noise approximation."""
    w = white(n)
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
    out = np.empty(n, dtype=np.float64)
    for i, x in enumerate(w):
        b0 = 0.99886 * b0 + x * 0.0555179
        b1 = 0.99332 * b1 + x * 0.0750759
        b2 = 0.96900 * b2 + x * 0.1538520
        b3 = 0.86650 * b3 + x * 0.3104856
        b4 = 0.55000 * b4 + x * 0.5329522
        b5 = -0.7616 * b5 - x * 0.0168980
        out[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + x * 0.5362
        b6 = x * 0.115926
    out /= np.max(np.abs(out)) + 1e-12
    return out


def brown(n: int) -> np.ndarray:
    w = white(n)
    y = np.zeros(n, dtype=np.float64)
    acc = 0.0
    for i, x in enumerate(w):
        acc = 0.996 * acc + 0.04 * x
        y[i] = acc
    y -= np.mean(y)
    y /= np.max(np.abs(y)) + 1e-12
    return y


class Biquad:
    """Direct-form I RBJ biquad, sample-accurate coefficient morph."""

    __slots__ = ("b0", "b1", "b2", "a1", "a2", "x1", "x2", "y1", "y2")

    def __init__(self) -> None:
        self.b0 = 1.0
        self.b1 = 0.0
        self.b2 = 0.0
        self.a1 = 0.0
        self.a2 = 0.0
        self.x1 = self.x2 = 0.0
        self.y1 = self.y2 = 0.0

    def _set(self, b0, b1, b2, a0, a1, a2) -> None:
        inv = 1.0 / a0
        self.b0 = b0 * inv
        self.b1 = b1 * inv
        self.b2 = b2 * inv
        self.a1 = a1 * inv
        self.a2 = a2 * inv

    def bandpass(self, freq: float, q: float) -> None:
        w0 = 2.0 * np.pi * freq / SR
        alpha = np.sin(w0) / (2.0 * q)
        cosw = np.cos(w0)
        self._set(alpha, 0.0, -alpha, 1.0 + alpha, -2.0 * cosw, 1.0 - alpha)

    def lowpass(self, freq: float, q: float) -> None:
        w0 = 2.0 * np.pi * freq / SR
        alpha = np.sin(w0) / (2.0 * q)
        cosw = np.cos(w0)
        b1 = 1.0 - cosw
        b0 = b1 * 0.5
        self._set(b0, b1, b0, 1.0 + alpha, -2.0 * cosw, 1.0 - alpha)

    def highpass(self, freq: float, q: float) -> None:
        w0 = 2.0 * np.pi * freq / SR
        alpha = np.sin(w0) / (2.0 * q)
        cosw = np.cos(w0)
        b1 = -(1.0 + cosw)
        b0 = (1.0 + cosw) * 0.5
        self._set(b0, b1, b0, 1.0 + alpha, -2.0 * cosw, 1.0 - alpha)

    def peak_eq(self, freq: float, q: float, gain_db: float) -> None:
        A = 10 ** (gain_db / 40.0)
        w0 = 2.0 * np.pi * freq / SR
        alpha = np.sin(w0) / (2.0 * q)
        cosw = np.cos(w0)
        self._set(
            1 + alpha * A,
            -2 * cosw,
            1 - alpha * A,
            1 + alpha / A,
            -2 * cosw,
            1 - alpha / A,
        )

    def process(self, x: np.ndarray) -> np.ndarray:
        y = np.empty_like(x)
        b0, b1, b2, a1, a2 = self.b0, self.b1, self.b2, self.a1, self.a2
        x1, x2, y1, y2 = self.x1, self.x2, self.y1, self.y2
        for i, xv in enumerate(x):
            yn = b0 * xv + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
            x2, x1 = x1, xv
            y2, y1 = y1, yn
            y[i] = yn
        self.x1, self.x2, self.y1, self.y2 = x1, x2, y1, y2
        return y

    def process_sweep_bp(
        self, x: np.ndarray, f0: float, f1: float, q: float, exp_sweep: bool = True
    ) -> np.ndarray:
        n = len(x)
        if exp_sweep:
            freqs = f0 * (f1 / f0) ** (np.arange(n) / max(n - 1, 1))
        else:
            freqs = np.linspace(f0, f1, n)
        y = np.empty_like(x)
        x1 = x2 = y1 = y2 = 0.0
        for i, xv in enumerate(x):
            freq = float(freqs[i])
            w0 = 2.0 * np.pi * freq / SR
            alpha = np.sin(w0) / (2.0 * q)
            cosw = np.cos(w0)
            a0 = 1.0 + alpha
            b0 = alpha / a0
            b1 = 0.0
            b2 = -alpha / a0
            a1 = (-2.0 * cosw) / a0
            a2 = (1.0 - alpha) / a0
            yn = b0 * xv + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
            x2, x1 = x1, xv
            y2, y1 = y1, yn
            y[i] = yn
        return y


def apply_filter(x: np.ndarray, kind: str, freq: float, q: float = 0.707) -> np.ndarray:
    f = Biquad()
    if kind == "lp":
        f.lowpass(freq, q)
    elif kind == "hp":
        f.highpass(freq, q)
    elif kind == "bp":
        f.bandpass(freq, q)
    else:
        raise ValueError(kind)
    return f.process(x)


def env_exp(n: int, attack_ms: float, decay_ms: float, hold_ms: float = 0.0) -> np.ndarray:
    a = n_samples(attack_ms)
    h = n_samples(hold_ms)
    d = n_samples(decay_ms)
    e = np.zeros(n, dtype=np.float64)
    a = min(a, n)
    if a > 0:
        e[:a] = np.linspace(0.0, 1.0, a)
    start_h = a
    end_h = min(a + h, n)
    e[start_h:end_h] = 1.0
    start_d = end_h
    if start_d < n:
        # remaining samples get exponential decay
        rem = n - start_d
        tau = max(d, 1) / 5.5  # ~ -48 dB over decay_ms
        tt = np.arange(rem, dtype=np.float64)
        e[start_d:] = np.exp(-tt / tau)
    return e


def env_peak_late(n: int, peak_at: float = 0.82) -> np.ndarray:
    """Whoosh envelope: slow swell, peak late, short tail."""
    t = np.linspace(0.0, 1.0, n)
    rise = np.clip(t / peak_at, 0.0, 1.0)
    # ease-in cubic then a bit of punch
    rise = rise ** 1.15
    fall = np.clip((1.0 - t) / (1.0 - peak_at), 0.0, 1.0)
    fall = fall ** 1.25
    e = np.where(t <= peak_at, rise, fall)
    # slight extra weight in the last third
    weight = 0.75 + 0.35 * (1.0 / (1.0 + np.exp(-12.0 * (t - 0.62))))
    return e * weight


def lin_fade(n: int, in_ms: float, out_ms: float) -> np.ndarray:
    e = np.ones(n, dtype=np.float64)
    fi = n_samples(in_ms)
    fo = n_samples(out_ms)
    fi = max(1, min(fi, n // 4))
    fo = max(1, min(fo, n // 4))
    e[:fi] *= np.linspace(0.0, 1.0, fi)
    e[-fo:] *= np.linspace(1.0, 0.0, fo)
    return e


def damped_sine(
    n: int,
    freq: float,
    decay_ms: float,
    phase: float = 0.0,
    freq_end: float | None = None,
) -> np.ndarray:
    t = t_axis(n)
    if freq_end is None:
        ph = 2.0 * np.pi * freq * t + phase
    else:
        # linear pitch sweep via phase integral
        f = np.linspace(freq, freq_end, n)
        ph = 2.0 * np.pi * np.cumsum(f) / SR + phase
    tau = (decay_ms * 0.001) / 4.5
    return np.sin(ph) * np.exp(-t / tau)


def modal_steel(
    n: int,
    freqs: list[float],
    decays_ms: list[float],
    amps: list[float],
    attack_noise: np.ndarray | None = None,
) -> np.ndarray:
    y = np.zeros(n, dtype=np.float64)
    for f, d, a in zip(freqs, decays_ms, amps):
        phase = float(RNG.uniform(0, 2 * np.pi))
        # slight inharmonic drift, not a clean bell
        drift = f * float(RNG.uniform(-0.004, 0.004))
        y += a * damped_sine(n, f + drift, d, phase=phase)
    if attack_noise is not None:
        y += attack_noise
    return y


def saturate(x: np.ndarray, drive: float = 1.4) -> np.ndarray:
    return np.tanh(x * drive) / np.tanh(drive)


def peak_norm(x: np.ndarray, target: float = 1.0) -> np.ndarray:
    p = float(np.max(np.abs(x)))
    if p < 1e-12:
        return x
    return x * (target / p)


def mix(*layers: tuple[np.ndarray, float]) -> np.ndarray:
    n = max(len(s) for s, _ in layers)
    y = np.zeros(n, dtype=np.float64)
    for s, g in layers:
        y[: len(s)] += s * g
    return y


def place(dest: np.ndarray, src: np.ndarray, at_ms: float) -> None:
    i = n_samples(at_ms)
    j = min(len(dest), i + len(src))
    dest[i:j] += src[: j - i]


# ---------------------------------------------------------------------------
# sounds
# ---------------------------------------------------------------------------

def sfx_whoosh_tajo() -> np.ndarray:
    """Heavy blade cutting air. Peak late so it can lead into impact."""
    dur_ms = 340.0
    n = n_samples(dur_ms)
    noise = 0.55 * white(n) + 0.45 * pink(n)

    # main air-cut: band-pass centre drops ~2.0 kHz → ~240 Hz
    bp = Biquad()
    cut = bp.process_sweep_bp(noise, 2050.0, 240.0, q=2.6, exp_sweep=True)

    # darker companion band, lower and wider
    bp2 = Biquad()
    body = bp2.process_sweep_bp(noise * 0.8 + brown(n) * 0.4, 820.0, 160.0, q=1.2)

    # a hint of tonal weight (not a cartoon swish sine)
    t = t_axis(n)
    f_tonal = 420.0 * (95.0 / 420.0) ** (t / t[-1])
    tonal = np.sin(2.0 * np.pi * np.cumsum(f_tonal) / SR)
    tonal *= env_peak_late(n, 0.84) * 0.22
    tonal = apply_filter(tonal, "lp", 900.0, 0.8)

    e = env_peak_late(n, peak_at=0.82)
    y = peak_norm(cut) * 1.00 * e + peak_norm(body) * 0.40 * e + peak_norm(tonal) * 0.18
    # very short grit near the peak (edge of the blade)
    grit_n = n_samples(28)
    grit = apply_filter(white(grit_n), "bp", 2400.0, 1.8) * env_exp(grit_n, 4, 22)
    place(y, peak_norm(grit) * 0.16, 340 * 0.78)

    y = apply_filter(y, "hp", 70.0, 0.7)
    y = apply_filter(y, "lp", 6200.0, 0.7)
    y *= lin_fade(n, 5.0, 7.0)
    return y


def sfx_impacto_carne() -> np.ndarray:
    """Clean sword-in-flesh: low thud + short wet mid. Not splatter, not a gun."""
    dur_ms = 155.0
    n = n_samples(dur_ms)

    # mass: 88 → 58 Hz sine, fast decay
    thud = damped_sine(n, 88.0, 95.0, freq_end=56.0)
    # second partial, inharmonic-ish body
    thud2 = damped_sine(n, 118.0, 70.0, freq_end=78.0)
    # sub weight, very short
    sub = damped_sine(n, 62.0, 110.0, freq_end=48.0)

    # attack click (blade meeting resistance) — mid, not a snare
    click_n = n_samples(14)
    click = apply_filter(white(click_n), "bp", 1650.0, 1.4) * env_exp(click_n, 0.6, 11)

    # wet mid transient: brief, 350–900 Hz, dies in ~40 ms
    wet_n = n_samples(48)
    wet_src = 0.6 * white(wet_n) + 0.4 * pink(wet_n)
    wet = apply_filter(wet_src, "bp", 680.0, 1.0)
    wet = apply_filter(wet, "lp", 2200.0, 0.8)
    wet *= env_exp(wet_n, 1.5, 38)
    # a little AM squelch, not gore
    am = 0.7 + 0.3 * np.sin(2 * np.pi * 42.0 * t_axis(wet_n))
    wet *= am

    # low noise burst for flesh mass
    meat_n = n_samples(70)
    meat = apply_filter(brown(meat_n), "lp", 280.0, 0.8) * env_exp(meat_n, 2, 55)

    y = np.zeros(n, dtype=np.float64)
    y += peak_norm(thud, 1.00) * 0.70
    y += peak_norm(thud2, 1.00) * 0.32
    y += peak_norm(sub, 1.00) * 0.45
    place(y, peak_norm(meat, 1.00) * 0.55, 0.0)
    place(y, peak_norm(click, 1.00) * 0.55, 0.6)
    place(y, peak_norm(wet, 1.00) * 0.70, 1.8)

    y = saturate(y, 1.20)
    y = apply_filter(y, "hp", 38.0, 0.7)
    y = apply_filter(y, "lp", 5000.0, 0.7)
    y *= lin_fade(n, 2.5, 8.0)
    return y


def sfx_bloqueo_acero() -> np.ndarray:
    """Parry: bright ping + short inharmonic ring + duller guard body. Not a bell."""
    dur_ms = 190.0
    n = n_samples(dur_ms)

    # steel modes — inharmonic, clustered 800–2400 as requested
    freqs = [812.0, 1047.0, 1293.0, 1588.0, 1874.0, 2216.0, 2630.0]
    decays = [95.0, 110.0, 80.0, 70.0, 55.0, 42.0, 28.0]
    amps = [0.55, 0.70, 0.45, 0.38, 0.32, 0.22, 0.12]
    ping = modal_steel(n, freqs, decays, amps)

    # attack: short metallic noise through a resonant band
    att_n = n_samples(18)
    att = apply_filter(white(att_n), "bp", 1950.0, 3.2) * env_exp(att_n, 0.4, 14)
    att2 = apply_filter(white(att_n), "hp", 3200.0, 0.7) * env_exp(att_n, 0.3, 10)

    # duller body of the guard / forte of the blade
    body = damped_sine(n, 196.0, 85.0, freq_end=150.0)
    body += 0.45 * damped_sine(n, 312.0, 55.0)
    body_n = apply_filter(brown(n), "lp", 400.0, 0.8) * env_exp(n, 1.5, 70)

    y = peak_norm(ping, 1.00) * 0.80 + peak_norm(body, 1.00) * 0.38 + peak_norm(body_n, 1.00) * 0.22
    place(y, peak_norm(att, 1.00) * 0.70, 0.0)
    place(y, peak_norm(att2, 1.00) * 0.40, 0.4)

    # kill the long bell-like tail — Dark Souls parry is short
    tail = np.exp(-t_axis(n) / 0.075)
    y *= 0.35 + 0.65 * tail

    y = apply_filter(y, "hp", 90.0, 0.7)
    y = apply_filter(y, "lp", 9000.0, 0.7)
    y *= lin_fade(n, 2.0, 8.0)
    return y


def sfx_choque_clash() -> np.ndarray:
    """Two blades bind. Heavier/dirtier than the parry. Two offset hits + sparks."""
    dur_ms = 245.0
    n = n_samples(dur_ms)

    def one_hit(offset_ratio: float, brighter: bool) -> np.ndarray:
        hit = np.zeros(n, dtype=np.float64)
        if brighter:
            freqs = [740.0, 991.0, 1277.0, 1610.0, 1988.0, 2440.0, 3100.0]
            decays = [70.0, 85.0, 60.0, 48.0, 36.0, 28.0, 18.0]
            amps = [0.50, 0.58, 0.40, 0.34, 0.26, 0.18, 0.10]
            spark_f = 4200.0
        else:
            freqs = [610.0, 843.0, 1120.0, 1455.0, 1790.0, 2140.0, 2680.0]
            decays = [90.0, 100.0, 72.0, 55.0, 40.0, 30.0, 20.0]
            amps = [0.62, 0.52, 0.38, 0.28, 0.20, 0.14, 0.08]
            spark_f = 3100.0
        modes = modal_steel(n, freqs, decays, amps)
        att_n = n_samples(16)
        att = apply_filter(white(att_n), "bp", spark_f, 2.4) * env_exp(att_n, 0.4, 12)
        sparks_n = n_samples(22)
        sparks = apply_filter(white(sparks_n), "hp", 5000.0, 0.6) * env_exp(sparks_n, 0.3, 16)
        place(hit, modes, 0)
        place(hit, att * 0.7, 0)
        place(hit, sparks * 0.35, 1.2)
        return hit

    hit_a = one_hit(0.0, brighter=False)
    hit_b = one_hit(0.0, brighter=True)

    y = np.zeros(n, dtype=np.float64)
    place(y, hit_a * 0.95, 0.0)
    place(y, hit_b * 0.80, 32.0)  # second blade, ~32 ms later

    # low bind / forte collision
    body = damped_sine(n, 78.0, 140.0, freq_end=52.0)
    body += 0.5 * damped_sine(n, 145.0, 90.0, freq_end=100.0)
    grit = apply_filter(pink(n), "lp", 500.0, 0.8) * env_exp(n, 3, 120)
    y += body * 0.48 + grit * 0.32

    # extra sparkle cluster in the middle of the bind
    sp_n = n_samples(40)
    sp = apply_filter(white(sp_n), "bp", 5600.0, 1.6) * env_exp(sp_n, 1, 28)
    place(y, sp * 0.16, 38.0)

    y = saturate(y, 1.35)
    y = apply_filter(y, "hp", 55.0, 0.7)
    y = apply_filter(y, "lp", 10000.0, 0.7)
    y *= lin_fade(n, 2.5, 8.0)
    return y


def sfx_ko_caida() -> np.ndarray:
    """Armored body onto a stone courtyard. No voice. Faint blade clatter at the end."""
    dur_ms = 640.0
    n = n_samples(dur_ms)
    y = np.zeros(n, dtype=np.float64)

    # 1) stone + mass impact
    impact_n = n_samples(220)
    mass = damped_sine(impact_n, 68.0, 180.0, freq_end=42.0)
    mass += 0.55 * damped_sine(impact_n, 96.0, 130.0, freq_end=62.0)
    mass += 0.28 * damped_sine(impact_n, 148.0, 80.0)
    stone = apply_filter(pink(impact_n), "bp", 420.0, 0.9) * env_exp(impact_n, 2, 90)
    crack_n = n_samples(24)
    crack = apply_filter(white(crack_n), "bp", 2100.0, 1.3) * env_exp(crack_n, 0.5, 18)
    place(y, mass * 1.05 + stone * 0.55, 0.0)
    place(y, crack * 0.28, 3.0)

    # 2) armor / mail rattle — irregular, not a shaker loop
    for k, at in enumerate((28.0, 52.0, 86.0, 124.0, 175.0, 230.0, 290.0)):
        rn = n_samples(float(RNG.uniform(18, 40)))
        f0 = float(RNG.uniform(900, 2400))
        piece = apply_filter(white(rn), "bp", f0, float(RNG.uniform(2.0, 5.0)))
        piece *= env_exp(rn, 0.8, float(RNG.uniform(14, 32)))
        gain = 0.22 * (0.82 ** k)
        place(y, piece * gain, at)
        # tiny iron ping mixed in
        ping_n = n_samples(70)
        pf = float(RNG.uniform(1100, 1900))
        ping = damped_sine(ping_n, pf, float(RNG.uniform(35, 60)))
        place(y, ping * gain * 0.35, at + 2.0)

    # cloth / leather rustle under the mail
    cloth_n = n_samples(280)
    cloth = apply_filter(pink(cloth_n), "bp", 380.0, 0.8) * env_exp(cloth_n, 8, 200)
    # irregular amplitude so it isn't a pad
    jitter = 0.6 + 0.4 * np.abs(apply_filter(white(cloth_n), "lp", 18.0, 0.7))
    jitter /= np.max(jitter) + 1e-12
    place(y, cloth * jitter * 0.22, 18.0)

    # secondary body settle (shoulder / hip)
    settle = damped_sine(n_samples(180), 54.0, 160.0, freq_end=38.0)
    settle += 0.3 * apply_filter(brown(n_samples(180)), "lp", 180.0, 0.8) * env_exp(
        n_samples(180), 4, 140
    )
    place(y, settle * 0.38, 70.0)

    # 3) faint blade clatter at the end — sword leaving the hand onto stone
    clatter_at = 430.0
    blade1 = modal_steel(
        n_samples(180),
        [920.0, 1280.0, 1710.0, 2140.0],
        [70.0, 55.0, 40.0, 28.0],
        [0.45, 0.32, 0.22, 0.12],
    )
    blade1 *= env_exp(n_samples(180), 1, 90)
    place(y, blade1 * 0.28, clatter_at)
    # bounce
    blade2 = modal_steel(
        n_samples(120),
        [1010.0, 1420.0, 1880.0],
        [45.0, 32.0, 22.0],
        [0.28, 0.18, 0.10],
    )
    place(y, blade2 * 0.16, clatter_at + 95.0)
    # stone kiss under the blade
    kiss_n = n_samples(30)
    kiss = apply_filter(white(kiss_n), "bp", 1800.0, 1.5) * env_exp(kiss_n, 0.5, 22)
    place(y, kiss * 0.12, clatter_at + 2.0)

    y = saturate(y, 1.25)
    y = apply_filter(y, "hp", 35.0, 0.7)
    y = apply_filter(y, "lp", 8500.0, 0.7)
    y *= lin_fade(n, 3.0, 8.0)
    return y



def sfx_brasa_cast() -> np.ndarray:
    """Short ember plant — coal puff, not steel. K startup (you + rival)."""
    dur_ms = 165.0
    n = n_samples(dur_ms)

    # warm mass: 96 → 58 Hz, dies fast
    glow = damped_sine(n, 96.0, 95.0, freq_end=58.0)
    glow += 0.42 * damped_sine(n, 142.0, 70.0, freq_end=88.0)

    # breath of coals: brown/pink through a low band
    puff_src = 0.62 * brown(n) + 0.38 * pink(n)
    puff = apply_filter(puff_src, "bp", 280.0, 0.85)
    puff = apply_filter(puff, "lp", 900.0, 0.7)
    puff *= env_exp(n, 4, 110)

    # dry crackle — grit, not a metallic ping
    crack_n = n_samples(38)
    crack = apply_filter(white(crack_n), "bp", 1450.0, 1.1) * env_exp(crack_n, 1.2, 28)
    pop_n = n_samples(18)
    pop = apply_filter(white(pop_n), "bp", 980.0, 1.4) * env_exp(pop_n, 0.6, 14)

    # faint air around the plant (no blade sweep)
    hiss_n = n_samples(70)
    hiss = apply_filter(pink(hiss_n), "bp", 720.0, 0.9) * env_exp(hiss_n, 3, 48)

    y = np.zeros(n, dtype=np.float64)
    y += peak_norm(glow, 1.00) * 0.62
    y += peak_norm(puff, 1.00) * 0.70
    place(y, peak_norm(crack, 1.00) * 0.28, 8.0)
    place(y, peak_norm(pop, 1.00) * 0.18, 22.0)
    place(y, peak_norm(hiss, 1.00) * 0.22, 4.0)

    y = saturate(y, 1.15)
    y = apply_filter(y, "hp", 48.0, 0.7)
    y = apply_filter(y, "lp", 4200.0, 0.7)
    y *= lin_fade(n, 4.0, 7.0)
    return y


def sfx_brasa_impacto() -> np.ndarray:
    """Ember dart into flesh — heat + wet thud. Not steel, not the tajo impacto."""
    dur_ms = 162.0
    n = n_samples(dur_ms)

    # warmer mass than the sword thud (ember, not blade)
    glow = damped_sine(n, 74.0, 105.0, freq_end=46.0)
    glow += 0.48 * damped_sine(n, 108.0, 78.0, freq_end=68.0)
    glow += 0.22 * damped_sine(n, 156.0, 50.0, freq_end=110.0)

    meat_n = n_samples(78)
    meat = apply_filter(brown(meat_n), "lp", 300.0, 0.8) * env_exp(meat_n, 2, 58)

    # wet mid + heat sizzle (flesh, not a ping)
    wet_n = n_samples(52)
    wet_src = 0.55 * white(wet_n) + 0.45 * pink(wet_n)
    wet = apply_filter(wet_src, "bp", 640.0, 0.95)
    wet = apply_filter(wet, "lp", 1900.0, 0.8)
    wet *= env_exp(wet_n, 1.4, 40)
    am = 0.72 + 0.28 * np.sin(2 * np.pi * 36.0 * t_axis(wet_n))
    wet *= am

    sizzle_n = n_samples(70)
    sizzle = apply_filter(pink(sizzle_n), "bp", 1180.0, 0.9) * env_exp(sizzle_n, 3, 48)

    crack_n = n_samples(24)
    crack = apply_filter(white(crack_n), "bp", 1320.0, 1.05) * env_exp(crack_n, 0.8, 18)
    pop_n = n_samples(16)
    pop = apply_filter(white(pop_n), "bp", 880.0, 1.3) * env_exp(pop_n, 0.5, 12)

    y = np.zeros(n, dtype=np.float64)
    y += peak_norm(glow, 1.00) * 0.72
    place(y, peak_norm(meat, 1.00) * 0.58, 0.0)
    place(y, peak_norm(wet, 1.00) * 0.66, 2.0)
    place(y, peak_norm(sizzle, 1.00) * 0.30, 4.0)
    place(y, peak_norm(crack, 1.00) * 0.22, 6.0)
    place(y, peak_norm(pop, 1.00) * 0.16, 18.0)

    y = saturate(y, 1.18)
    y = apply_filter(y, "hp", 40.0, 0.7)
    y = apply_filter(y, "lp", 3800.0, 0.7)
    y *= lin_fade(n, 3.0, 7.0)
    return y


def sfx_brasa_bloqueo() -> np.ndarray:
    """Ember dart dies on a raised guard — steam + dull thunk. No steel ring."""
    dur_ms = 176.0
    n = n_samples(dur_ms)

    thunk = damped_sine(n, 162.0, 90.0, freq_end=112.0)
    thunk += 0.40 * damped_sine(n, 238.0, 60.0, freq_end=170.0)
    body = apply_filter(brown(n), "lp", 360.0, 0.8) * env_exp(n, 2, 75)

    steam_n = n_samples(110)
    steam = apply_filter(0.55 * pink(steam_n) + 0.45 * brown(steam_n), "bp", 820.0, 0.85)
    steam = apply_filter(steam, "lp", 2400.0, 0.7)
    steam *= env_exp(steam_n, 4, 88)

    grit_n = n_samples(36)
    grit = apply_filter(white(grit_n), "bp", 1240.0, 1.0) * env_exp(grit_n, 1.0, 26)
    scatter_n = n_samples(22)
    scatter = apply_filter(white(scatter_n), "bp", 980.0, 1.15) * env_exp(scatter_n, 0.6, 16)
    hiss_n = n_samples(80)
    hiss = apply_filter(pink(hiss_n), "bp", 640.0, 0.9) * env_exp(hiss_n, 3, 55)

    y = np.zeros(n, dtype=np.float64)
    y += peak_norm(thunk, 1.00) * 0.58
    y += peak_norm(body, 1.00) * 0.36
    place(y, peak_norm(steam, 1.00) * 0.62, 2.0)
    place(y, peak_norm(hiss, 1.00) * 0.28, 3.0)
    place(y, peak_norm(grit, 1.00) * 0.24, 7.0)
    place(y, peak_norm(scatter, 1.00) * 0.16, 24.0)

    y = saturate(y, 1.12)
    y = apply_filter(y, "hp", 46.0, 0.7)
    y = apply_filter(y, "lp", 3200.0, 0.7)
    y *= lin_fade(n, 3.5, 7.0)
    return y


def sfx_brasa_choque() -> np.ndarray:
    """Dart crushed on a live blade — snuff / heat collapse. Not a two-sword bind."""
    dur_ms = 198.0
    n = n_samples(dur_ms)

    # mass collapse: pitch drops, coal going out
    snuff = damped_sine(n, 128.0, 120.0, freq_end=42.0)
    snuff += 0.38 * damped_sine(n, 188.0, 70.0, freq_end=78.0)
    snuff += 0.20 * damped_sine(n, 86.0, 140.0, freq_end=38.0)

    burst_n = n_samples(28)
    burst = apply_filter(white(burst_n), "bp", 1100.0, 1.05) * env_exp(burst_n, 0.7, 20)

    grit = apply_filter(0.6 * pink(n) + 0.4 * brown(n), "bp", 420.0, 0.8)
    grit = apply_filter(grit, "lp", 1400.0, 0.7)
    grit *= env_exp(n, 3, 130)

    hiss_n = n_samples(90)
    hiss = apply_filter(pink(hiss_n), "bp", 760.0, 0.85) * env_exp(hiss_n, 3, 62)

    y = np.zeros(n, dtype=np.float64)
    y += peak_norm(snuff, 1.00) * 0.70
    y += peak_norm(grit, 1.00) * 0.42
    place(y, peak_norm(burst, 1.00) * 0.32, 1.0)
    place(y, peak_norm(hiss, 1.00) * 0.28, 4.0)

    # ember scatter as it dies — grit pops, not modal pings
    for at, f0 in ((8.0, 1280.0), (22.0, 940.0), (40.0, 1540.0), (62.0, 780.0)):
        pn = n_samples(18)
        pop = apply_filter(white(pn), "bp", f0, 1.1) * env_exp(pn, 0.5, 13)
        place(y, peak_norm(pop, 1.00) * 0.14, at)

    y = saturate(y, 1.16)
    y = apply_filter(y, "hp", 42.0, 0.7)
    y = apply_filter(y, "lp", 3400.0, 0.7)
    y *= lin_fade(n, 3.0, 8.0)
    return y


# ---------------------------------------------------------------------------
# bounce / write
# ---------------------------------------------------------------------------

TARGET_DBFS = -2.0  # inside -1..-3


def finalize(x: np.ndarray) -> np.ndarray:
    x = np.asarray(x, dtype=np.float64)
    # 1-pole DC blocker ~25 Hz
    r = 1.0 - (2.0 * np.pi * 25.0 / SR)
    y = np.empty_like(x)
    x1 = y1 = 0.0
    for i, xv in enumerate(x):
        yn = xv - x1 + r * y1
        x1, y1 = xv, yn
        y[i] = yn
    x = y
    # hard edges to true digital silence (2–8 ms)
    fi = n_samples(4.0)
    fo = n_samples(7.0)
    x[:fi] *= np.linspace(0.0, 1.0, fi)
    x[-fo:] *= np.linspace(1.0, 0.0, fo)
    x = x - np.mean(x)
    x[0] = 0.0
    x[-1] = 0.0
    peak = float(np.max(np.abs(x)))
    if peak < 1e-9:
        raise RuntimeError("render is silent")
    target = 10.0 ** (TARGET_DBFS / 20.0)
    x = x * (target / peak)
    x[0] = 0.0
    x[-1] = 0.0
    x = np.clip(x, -0.98, 0.98)
    return x


def write_wav(path: str, x: np.ndarray) -> None:
    x = finalize(x)
    pcm = np.round(x * 32767.0).astype(np.int16)
    pcm[0] = 0
    pcm[-1] = 0
    # if rounding pushed a sample to ±32767, back off
    peak = int(np.max(np.abs(pcm)))
    if peak >= 32767:
        pcm = (pcm.astype(np.int32) * 32000 // peak).astype(np.int16)
        pcm[0] = 0
        pcm[-1] = 0
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def peak_dbfs(path: str) -> float:
    with wave.open(path, "r") as w:
        raw = w.readframes(w.getnframes())
        pcm = np.frombuffer(raw, dtype=np.int16).astype(np.float64)
    p = np.max(np.abs(pcm))
    if p <= 0:
        return -120.0
    return 20.0 * np.log10(p / 32767.0)


def duration_ms(path: str) -> float:
    with wave.open(path, "r") as w:
        return 1000.0 * w.getnframes() / w.getframerate()


def main() -> None:
    jobs = [
        ("sfx_whoosh_tajo.wav", sfx_whoosh_tajo, (280, 380)),
        ("sfx_impacto_carne.wav", sfx_impacto_carne, (120, 180)),
        ("sfx_bloqueo_acero.wav", sfx_bloqueo_acero, (150, 220)),
        ("sfx_choque_clash.wav", sfx_choque_clash, (180, 280)),
        ("sfx_ko_caida.wav", sfx_ko_caida, (500, 750)),
        ("sfx_brasa_cast.wav", sfx_brasa_cast, (140, 190)),
        ("sfx_brasa_impacto.wav", sfx_brasa_impacto, (140, 185)),
        ("sfx_brasa_bloqueo.wav", sfx_brasa_bloqueo, (155, 200)),
        ("sfx_brasa_choque.wav", sfx_brasa_choque, (170, 230)),
    ]
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, fn, (lo, hi) in jobs:
        path = os.path.join(OUT_DIR, name)
        audio = fn()
        write_wav(path, audio)
        dur = duration_ms(path)
        pk = peak_dbfs(path)
        print(f"{name:28s}  {dur:7.1f} ms  peak {pk:6.2f} dBFS")
        if dur < 50:
            raise RuntimeError(f"{name} too short ({dur:.1f} ms)")
        if not (lo - 8 <= dur <= hi + 8):
            raise RuntimeError(f"{name} duration {dur:.1f} outside {lo}-{hi} ms")
        if pk > -0.5:
            raise RuntimeError(f"{name} too hot ({pk:.2f} dBFS)")
        if pk < -6.0:
            raise RuntimeError(f"{name} too quiet ({pk:.2f} dBFS)")


if __name__ == "__main__":
    main()
