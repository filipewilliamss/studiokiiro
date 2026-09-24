// Sistema de Síntese de Áudio Analógico Tátil (Web Audio API pura)
// Zero latência, sem arquivos externos pesados, volume refinado e respeito à preferência do usuário.

let audioCtx: AudioContext | null = null;
// Som começa desligado. O visitante escolhe quando quer ouvir a camada sonora.
let isMuted = true;

// Inicializa ou retoma o AudioContext de forma segura após o primeiro gesto do usuário
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Carrega preferência do localStorage
if (typeof window !== 'undefined') {
  const storedMute = localStorage.getItem('kiiro_sound_muted');
  if (storedMute !== null) isMuted = storedMute === 'true';
}

export const isSoundMuted = () => isMuted;

export const toggleSound = (): boolean => {
  isMuted = !isMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('kiiro_sound_muted', String(isMuted));
    window.dispatchEvent(new CustomEvent('kiiro-sound-toggle', { detail: { isMuted } }));
  }
  if (!isMuted) {
    // Toca um feedback discreto ao desmutar
    playPillHover(2);
  }
  return isMuted;
};

/**
 * 1. Estalo Mecânico Analógico (Relé Industrial / Chave de Força)
 * Usado no Master Power Switch do rodapé e switches principais.
 */
export const playSwitchClick = (isOn = true) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Estalo mecânico inicial (transiente rápido)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(isOn ? 180 : 120, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.05);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);

  // Micro-clique de alta frequência (contato metálico)
  const bufferSize = ctx.sampleRate * 0.02; // 20ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 2400;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.12, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now);
};

/**
 * 2. Som Harmônico Etéreo das Pílulas do Hero (DKTON style)
 * Escala harmônica sutil afinada em 5 notas elegantes (F# menor / Kiiro harmonic).
 */
const HARMONIC_NOTES = [293.66, 369.99, 440.00, 554.37, 659.25, 739.99, 880.00];

export const playPillHover = (index: number) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const freq = HARMONIC_NOTES[index % HARMONIC_NOTES.length];
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  // Envelope suave com release aveludado
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
};

/**
 * 3. Virada de Página / Folhear de Livro Editorial (Zainab style)
 * Ruído de papel encorpado de revista de luxo.
 */
export const playPageFlip = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.14;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    const decay = Math.sin((i / bufferSize) * Math.PI);
    data[i] = (Math.random() * 2 - 1) * decay * 0.3;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.linearRampToValueAtTime(800, now + duration);
  filter.Q.value = 1.2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(now);
};
