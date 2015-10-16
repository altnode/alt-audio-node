let AudioNode = global.AudioNode;
let AudioNode_connect;
let AudioNode_disconnect;

function connect(...args) {
  if (args[0] && typeof args[0].__connectFrom === "function") {
    args[0].__connectFrom(this, ...args.slice(1));
  } else {
    AudioNode_connect.apply(this, args);
  }
}

function disconnect(...args) {
  if (args[0] && typeof args[0].__disconnectFrom === "function") {
    args[0].__disconnectFrom(this, ...args.slice(1));
  } else {
    AudioNode_disconnect.apply(this, args);
  }
}

if (AudioNode && !global.__altnode$customizeAudioNode) {
  global.__altnode$customizeAudioNode = true;

  AudioNode_connect = AudioNode.prototype.connect;
  AudioNode_disconnect = AudioNode.prototype.disconnect;

  AudioNode.prototype.connect = connect;
  AudioNode.prototype.disconnect = disconnect;
}
