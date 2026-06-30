import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TimerCount from "./TimerCount";

describe("Timer Count component", () => {
  it("renders heading", () => {
    render(<TimerCount />);

    const heading = screen.getByRole("heading", { name: "0 seconds" });

    expect(heading).toBeInTheDocument();
  });
});
