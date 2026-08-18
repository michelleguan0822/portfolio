export class AudioEngine {
  private ctx: AudioContext | null = null
  private gainNode: GainNode | null = null

  // C Major Pentatonic Scale frequencies (starting from C3)
  private pentatonicScale = [
    130.81, 146.83, 164.81, 196.00, 220.00,
    261.63, 293.66, 329.63, 392.00, 440.00, 
    523.25, 587.33, 659.25, 783.99, 880.00,
    1046.50, 1174.66, 1318.51, 1567.98, 1760.00,
    2093.00, 2349.32, 2637.02, 3135.96, 3520.00
  ]

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContext) {
        this.ctx = new AudioContext()
        this.gainNode = this.ctx.createGain()
        this.gainNode.connect(this.ctx.destination)
        
        // Master volume
        this.gainNode.gain.value = 0.2
      }
    }
    
    // Resume context if suspended (browser autoplay policies)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playNote(index: number, velocity: number = 1.0) {
    if (!this.ctx || !this.gainNode) return

    // Pick a frequency from the pentatonic scale, looping if index exceeds length
    const freq = this.pentatonicScale[Math.abs(index) % this.pentatonicScale.length]

    const osc = this.ctx.createOscillator()
    const env = this.ctx.createGain()

    // Smooth, warm sound
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

    // ADSR Envelope
    const attack = 0.02
    const decay = 0.1
    const sustain = 0.2
    const release = 0.4
    
    env.gain.setValueAtTime(0, this.ctx.currentTime)
    env.gain.linearRampToValueAtTime(0.5 * velocity, this.ctx.currentTime + attack)
    env.gain.linearRampToValueAtTime(sustain * velocity, this.ctx.currentTime + attack + decay)
    env.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + attack + decay + release)

    osc.connect(env)
    env.connect(this.gainNode)

    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + attack + decay + release)
  }
}

export const audioEngine = new AudioEngine()
