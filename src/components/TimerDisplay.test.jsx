import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

describe("Time Display component", () => {
  it("renders loading header", () => {
    render(<TimerDisplay sessionIdLoading={true} />);

    const heading = screen.getByRole("heading", { name: "Loading Timer" });

    expect(heading).toBeInTheDocument();
  });

  it("renders error header", () => {
    render(<TimerDisplay sessionIdError={true} />);

    const heading = screen.getByRole("heading", {
      name: "Session Start Failed - Time will not be recorded",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders TimeCount child component", () => {
    render(<TimerDisplay sessionId={"abc"} />);

    const heading = screen.getByRole("heading", {
      name: "0 seconds",
    });

    expect(heading).toBeInTheDocument();
  });

  it("does not render if finish time", () => {
    render(<TimerDisplay finishTime={123} />);

    const heading = screen.queryByRole("heading", {
      name: "0 seconds",
    });

    expect(heading).not.toBeInTheDocument();
  });
});
