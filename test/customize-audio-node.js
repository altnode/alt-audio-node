import assert from "power-assert";
import sinon from "sinon";
import "../src/customize-audio-node";

describe("AudioNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("#connect(...args): void", () => {
    it("works with customNode", () => {
      let gain = audioContext.createGain();
      let customNode = { __connectFrom: sinon.spy() };

      gain.connect(customNode, 0, 1);

      assert(customNode.__connectFrom.callCount === 1);
      assert.deepEqual(customNode.__connectFrom.args[0], [ gain, 0, 1 ]);
    });
    it("works with original AudioNode", () => {
      let gain = audioContext.createGain();

      gain.connect(audioContext.destination, 0, 0);

      assert(audioContext.destination.$isConnectedFrom(gain, 0, 0));
    });
  });
});
