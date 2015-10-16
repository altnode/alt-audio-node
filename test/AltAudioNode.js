import assert from "power-assert";
import AltAudioNode from "../src/AltAudioNode";

describe("AltAudioNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext)", () => {
    it("works", () => {
      let node = new AltAudioNode(audioContext);

      assert(node instanceof AltAudioNode);
      assert(node instanceof global.AudioNode);
    });
  });
  describe("#context: AudioContext", () => {
    it("works", () => {
      let node = new AltAudioNode(audioContext);

      assert(node.context === audioContext);
    });
  });
  describe("#connect(): void", () => {
    it("works", () => {
      let node = new AltAudioNode(audioContext);

      assert(typeof node.connect === "function");
    });
  });
  describe("#disconnect(): void", () => {
    it("works", () => {
      let node = new AltAudioNode(audioContext);

      assert(typeof node.disconnect === "function");
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let node = new AltAudioNode(audioContext);

      assert(typeof node.dispose === "function");
    });
  });
});
