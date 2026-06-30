import { describe, it, expect } from "vitest";
import formatTime from "./formatTime";

describe("formatTime util", () => {
  it("returns correct time format", () => {
    expect(formatTime(10)).toBe("00:00.01");
    expect(formatTime(202)).toBe("00:00.20");
    expect(formatTime(3030)).toBe("00:03.03");
    expect(formatTime(40404)).toBe("00:40.40");
    expect(formatTime(505050)).toBe("08:25.05");
    expect(formatTime(6060606)).toBe("101:00.60");
  });
});
