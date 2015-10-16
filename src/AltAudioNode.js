import "./customize-audio-node-prototype";
import { CONTEXT } from "./symbols";

function AudioNode() {}

if (global.AudioNode) {
  AudioNode.prototype = Object.create(global.AudioNode.prototype, {
    constructor: { value: AudioNode, enumerable: false, writable: true, configurable: true }
  });
}

export default class AltAudioNode extends AudioNode {
  constructor(audioContext) {
    super();

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
