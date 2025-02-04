import { act, renderHook } from "@testing-library/react";
import useWindowDimensions from "../useWindowDimensions";

describe("useWindowDimensions", () => {
  const originalWindow = { ...window };

  beforeEach(() => {
    global.window.innerWidth = 1024;
    global.window.innerHeight = 768;
  });

  afterEach(() => {
    global.window = { ...originalWindow };
  });

  it("should return initial window dimensions", () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current).toEqual({
      width: 1024,
      height: 768,
    });
  });

  it("should update dimensions when window resizes", () => {
    const { result } = renderHook(() => useWindowDimensions());

    act(() => {
      global.window.innerWidth = 1280;
      global.window.innerHeight = 900;
      global.window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({
      width: 1280,
      height: 900,
    });
  });
});
