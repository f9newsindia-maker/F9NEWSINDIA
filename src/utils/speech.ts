/**
 * Web Speech API text-to-speech helper for Hindi news reading
 */
export class HindiSpeechReader {
  private static instance: HindiSpeechReader;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private listeners: Set<(speaking: boolean) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static getInstance(): HindiSpeechReader {
    if (!HindiSpeechReader.instance) {
      HindiSpeechReader.instance = new HindiSpeechReader();
    }
    return HindiSpeechReader.instance;
  }

  public subscribe(listener: (speaking: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeakingState = speaking;
    this.listeners.forEach((fn) => fn(speaking));
  }

  public speak(text: string, title?: string) {
    if (!this.synth) return;

    this.stop();

    const fullText = title ? `F9 न्यूज़ इंडिया। ${title}। ${text}` : text;
    const utterance = new SpeechSynthesisUtterance(fullText);

    // Prefer Hindi voice if available
    const voices = this.synth.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95; // Clear news anchor speed
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.notify(false);
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.notify(false);
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify(true);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechReader = HindiSpeechReader.getInstance();
