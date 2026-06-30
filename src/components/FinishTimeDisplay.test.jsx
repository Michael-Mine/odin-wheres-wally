import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FinishTimeDisplay from "./FinishTimeDisplay";

describe("Finish Time Display component", () => {
  it("renders loading header", () => {
    render(<FinishTimeDisplay finishLoading={true} />);

    const heading = screen.getByRole("heading", { name: "No Finish Time Yet" });

    expect(heading).toBeInTheDocument();
  });

  it("renders error header", () => {
    render(<FinishTimeDisplay finishError={true} />);

    const heading = screen.getByRole("heading", {
      name: "Session Finish Request Failed - Time was not recorded",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders correct time under 60 sec", () => {
    render(<FinishTimeDisplay finishTime={1234} />);

    const heading = screen.getByRole("heading", {
      name: "Finish Time was 1.234 seconds",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders correct time over 60 sec", () => {
    render(<FinishTimeDisplay finishTime={123456} />);

    const heading = screen.getByRole("heading", {
      name: "Finish Time was 2 min 3.456 seconds",
    });

    expect(heading).toBeInTheDocument();
  });
});
