# altnode.AudioNode

## Installation

```
npm install -s altnode.audio-node
```

## API
### AudioNode
- `constructor(audioContext: AudioContext)`

#### Instance attributes
- `context: AudioContext`

#### Instance methods
_These methods should be overriden by a sub class._

- `connect(...args): void`
- `disconnect(...args): void`
- `dispose(): void`
  - disconnect and dispose all of the internal nodes
- `__connectFrom(source: global.AudioNode, output = 0, input = 0): void`
  - called when connecting from WebAudioAPI's AudioNode

## Example

```js
import AudioNode from "altnode.audio-node";

export default class FeedbackDelay extends AudioNode {
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
}
```

```js
import FeedbackDelay from "./FeedbackDelay";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let delay = new FeedbackDelay(audioContext);

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
