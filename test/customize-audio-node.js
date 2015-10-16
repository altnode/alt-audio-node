import assert from "power-assert";
import sinon from "sinon";
import "../src/customize-audio-node";

global.WebAudioTestAPI.setState({ "AudioNode#disconnect": "selective" });

describe("customize WebAudioAPI's AudioNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("#connect(...args): void", () => {
    it("works with AltAudioNode", () => {
      let gain = audioContext.createGain();
      let out1 = { __connectFrom: sinon.spy() };
      let out2 = { __connectFrom: sinon.spy() };

      gain.connect(out1, 0, 0);
      gain.connect(out2, 0, 1);

      assert(out1.__connectFrom.callCount === 1);
      assert.deepEqual(out1.__connectFrom.args[0], [ gain, 0, 0 ]);
      assert(out2.__connectFrom.callCount === 1);
      assert.deepEqual(out2.__connectFrom.args[0], [ gain, 0, 1 ]);
    });
    it("works with WebAudioAPI's AudioNode", () => {
      let gain = audioContext.createGain();
      let out1 = audioContext.createChannelMerger(2);
      let out2 = audioContext.createChannelMerger(2);

      gain.connect(out1, 0, 0);
      gain.connect(out2, 0, 1);

      assert(out1.$isConnectedFrom(gain, 0, 0));
      assert(out2.$isConnectedFrom(gain, 0, 1));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works with AltAudioNode", () => {
      let gain = audioContext.createGain();
      let out1 = { __connectFrom: sinon.spy(), __disconnectFrom: sinon.spy() };
      let out2 = { __connectFrom: sinon.spy(), __disconnectFrom: sinon.spy() };

      gain.connect(out1, 0, 0);
      gain.connect(out2, 0, 1);

      gain.disconnect(out2, 0, 1);

      assert(out1.__disconnectFrom.callCount === 0);
      assert(out2.__disconnectFrom.callCount === 1);
      assert.deepEqual(out2.__disconnectFrom.args[0], [ gain, 0, 1 ]);
    });
    it("works with WebAudioAPI's AudioNode", () => {
      let gain = audioContext.createGain();
      let out1 = audioContext.createChannelMerger(2);
      let out2 = audioContext.createChannelMerger(2);

      gain.connect(out1, 0, 0);
      gain.connect(out2, 0, 1);

      gain.disconnect(out2, 0, 1);

      assert(out1.$isConnectedFrom(gain, 0, 0));
      assert(!out2.$isConnectedFrom(gain, 0, 1));
    });
  });
});
