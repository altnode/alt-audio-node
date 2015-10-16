import assert from "power-assert";
import AudioNode from "../src/AudioNode";

describe("AudioNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext)", () => {
    it("works", () => {
      let node = new AudioNode(audioContext);

      assert(node instanceof AudioNode);
    });
  });
  describe("#context: AudioContext", () => {
    it("works", () => {
      let node = new AudioNode(audioContext);

      assert(node.context === audioContext);
    });
  });
  describe("#connect(): void", () => {
    it("works", () => {
      let node = new AudioNode(audioContext);

      assert(typeof node.connect === "function");
    });
  });
  describe("#disconnect(): void", () => {
    it("works", () => {
      let node = new AudioNode(audioContext);

      assert(typeof node.disconnect === "function");
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let node = new AudioNode(audioContext);

      assert(typeof node.dispose === "function");
    });
  });
});
