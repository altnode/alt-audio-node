import "./customize-audio-node-prototype";
import { CONTEXT } from "./symbols";

export default class AltAudioNode {
  constructor(audioContext) {
    this[CONTEXT] = audioContext;
  }

  get context() {
    return this[CONTEXT];
  }

  connect() {}
  disconnect() {}
  dispose() {}

  // __connectFrom() {}
  // __disconnectFrom() {}
}
