# altnode.AltAudioNode
[![Build Status](http://img.shields.io/travis/altnode/alt-audio-node.svg?style=flat-square)](https://travis-ci.org/altnode/alt-audio-node)
[![NPM Version](http://img.shields.io/npm/v/altnode.alt-audio-node.svg?style=flat-square)](https://www.npmjs.org/package/altnode.alt-audio-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> Base class for customized AudioNode

## Installation

```
npm install -S altnode.alt-audio-node
```

## API
### AltAudioNode
- `constructor(audioContext: AudioContext)`

#### Instance attributes
- `context: AudioContext`

#### Instance methods
_These methods are noop that should be overridden by a subclass._

- `connect(...args): void`
- `disconnect(...args): void`
- `dispose(): void`
  - disconnect and dispose all of the internal nodes

_These methods are optional for customized AudioNode._

- `__connectFrom(source: global.AudioNode, output = 0, input = 0): void`
- `__disconnectFrom(source: global.AudioNode, output = 0): void`
  - called when connecting/disconnecting from WebAudioAPI's AudioNode

## Example

```js
import AltAudioNode from "altnode.alt-audio-node";

export default class FeedbackDelayNode extends AltAudioNode {
  constructor(audioContext, maxDelayTime = 1) {
    super(audioContext);

    this._delay = audioContext.createDelay(maxDelayTime);
    this._feedback = audioContext.createGain();

    this._delay.connect(this._feedback);
    this._feedback.connect(this._delay);
  }

  get delayTime() {
    return this._delay.delayTime;
  }

  get feedback() {
    return this._feedback.gain;
  }

  connect(...args) {
    this._delay.connect(...args);
  }

  disconnect(...args) {
    this._delay.disconnect(...args);
  }

  dispose() {
    this._delay.disconnect();
    this._feedback.disconnect();
    this._delay = null;
    this._feedback = null;
  }

  __connectFrom(source, ...args) {
    source.connect(this._delay, ...args);
  }

  __disconnectFrom(source, ...args) {
    source.disconnect(this._delay, ...args);
  }
}
```

```js
import FeedbackDelayNode from "./FeedbackDelayNode";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let delay = new FeedbackDelayNode(audioContext);

bufSrc.buffer = RhythmLoop;
bufSrc.loop = true;
bufSrc.start();
bufSrc.connect(delay); // call delay.__connectFrom with [ bufSrc ]

delay.delayTime.value = 0.75;
delay.feedback.value = 0.9;
delay.connect(audioContext.destination);
```

## LICENSE
MIT
