import assert from "power-assert";
import index from "../src";
import AudioNode from "../src/AudioNode";

describe("index", () => {
  it("exports", () => {
    assert(index === AudioNode);
  });
});
