// Tiny synthesized ska riddim (Web Audio, no samples): offbeat skank chords,
// walking bass, kick/snare/hat. Created lazily on first user click.

const BPM = 152;
const EIGHTH = 60 / BPM / 2;
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

// C – Am – F – G, one bar each; bass walks root/3rd/5th/6th
const BARS = [
  { chord: [60, 64, 67], bass: [36, 40, 43, 45] },
  { chord: [57, 60, 64], bass: [33, 36, 40, 42] },
  { chord: [53, 57, 60], bass: [29, 33, 36, 38] },
  { chord: [55, 59, 62], bass: [31, 35, 38, 40] },
];

export function createRiddim() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.0001;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp).connect(ctx.destination);

  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const env = (g, t, peak, decay) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  };

  const skank = (notes, t) => {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 2400;
    const g = ctx.createGain();
    env(g, t, 0.16, 0.11);
    f.connect(g).connect(master);
    notes.forEach((n) => {
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = midi(n);
      o.connect(f);
      o.start(t);
      o.stop(t + 0.14);
    });
  };

  const bass = (n, t) => {
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = midi(n);
    const g = ctx.createGain();
    env(g, t, 0.55, EIGHTH * 1.8);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + EIGHTH * 2);
  };

  const kick = (t) => {
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    const g = ctx.createGain();
    env(g, t, 0.8, 0.22);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.25);
  };

  const noise = (t, freq, peak, decay) => {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = freq;
    const g = ctx.createGain();
    env(g, t, peak, decay);
    s.connect(f).connect(g).connect(master);
    s.start(t);
    s.stop(t + decay + 0.02);
  };

  let step = 0;
  let nextTime = 0;
  let timer = null;

  const schedule = () => {
    while (nextTime < ctx.currentTime + 0.12) {
      const bar = BARS[Math.floor(step / 8) % BARS.length];
      const e = step % 8;
      if (e % 2 === 1) skank(bar.chord, nextTime);
      else bass(bar.bass[e / 2], nextTime);
      if (e === 0 || e === 4) kick(nextTime);
      if (e === 2 || e === 6) noise(nextTime, 1800, 0.35, 0.13);
      noise(nextTime, 7000, e % 2 ? 0.09 : 0.05, 0.04);
      nextTime += EIGHTH;
      step++;
    }
  };

  return {
    async start() {
      await ctx.resume();
      step = 0;
      nextTime = ctx.currentTime + 0.05;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.15);
      schedule();
      timer = setInterval(schedule, 30);
    },
    stop() {
      master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
      clearInterval(timer);
      timer = null;
    },
    close() {
      clearInterval(timer);
      ctx.close();
    },
  };
}

// Shared player so the hero record and the terminal control the same riddim
let player = null;
let playing = false;
const subs = new Set();
const emit = () => subs.forEach((fn) => fn(playing));

export const riddim = {
  isPlaying: () => playing,
  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  },
  async play() {
    if (!player) player = createRiddim();
    if (!player || playing) return;
    await player.start();
    playing = true;
    emit();
  },
  stop() {
    if (!player || !playing) return;
    player.stop();
    playing = false;
    emit();
  },
  toggle() {
    return playing ? riddim.stop() : riddim.play();
  },
};

// One-shot sci-fi sound effects (only ever triggered by a user action)
let sfxCtx = null;
export function sfx(kind) {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  if (!sfxCtx) sfxCtx = new Ctx();
  const ctx = sfxCtx;
  ctx.resume();
  const t = ctx.currentTime;
  const g = ctx.createGain();
  g.connect(ctx.destination);
  const o = ctx.createOscillator();
  o.connect(g);
  if (kind === 'alert') {
    o.type = 'sawtooth';
    g.gain.setValueAtTime(0.0001, t);
    for (let i = 0; i < 3; i++) {
      o.frequency.setValueAtTime(420, t + i * 0.7);
      o.frequency.linearRampToValueAtTime(780, t + i * 0.7 + 0.35);
      o.frequency.linearRampToValueAtTime(420, t + i * 0.7 + 0.7);
    }
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.05);
    g.gain.setValueAtTime(0.07, t + 1.95);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);
    o.start(t);
    o.stop(t + 2.15);
  } else if (kind === 'beam') {
    o.type = 'sine';
    o.frequency.setValueAtTime(600, t);
    o.frequency.exponentialRampToValueAtTime(2400, t + 1.6);
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = 28;
    lg.gain.value = 120;
    lfo.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    lfo.start(t);
    lfo.stop(t + 1.8);
    o.start(t);
    o.stop(t + 1.8);
  } else {
    // 'warp' and generic blip
    const long = kind === 'warp';
    o.type = long ? 'sawtooth' : 'square';
    o.frequency.setValueAtTime(long ? 60 : 880, t);
    o.frequency.exponentialRampToValueAtTime(long ? 900 : 1320, t + (long ? 1.4 : 0.06));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(long ? 0.05 : 0.03, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (long ? 1.6 : 0.09));
    o.start(t);
    o.stop(t + (long ? 1.65 : 0.1));
  }
}
