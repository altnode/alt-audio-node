import assert from "power-assert";
import index from "../src";
import AltAudioNode from "../src/AltAudioNode";

describe("index", () => {
  it("exports", () => {
    assert(index === AltAudioNode);
  });
});
