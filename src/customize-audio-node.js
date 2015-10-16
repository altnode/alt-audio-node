let AudioNode = global.AudioNode;
let AudioNode_connect;

function connect(...args) {
  if (args[0] && typeof args[0].__connectFrom === "function") {
    args[0].__connectFrom(this, ...args.slice(1));
  } else {
    AudioNode_connect.apply(this, args);
  }
}

if (AudioNode && !global.__altnode$customizeAudioNode) {
  global.__altnode$customizeAudioNode = true;

  AudioNode_connect = AudioNode.prototype.connect;

  AudioNode.prototype.connect = connect;
}
