import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ScoreCheck from "./ScoreCheck";
import useScores from "../hooks/useScores";

vi.mock("../hooks/useScores");

describe("Score Check component", () => {
  it("renders loading header", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [],
      scoreError: false,
      scoreLoading: true,
    });

    render(<ScoreCheck />);

    const heading = screen.getByRole("heading", { name: "Checking Scores" });

    expect(heading).toBeInTheDocument();
  });

  it("renders error header", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [],
      scoreError: true,
      scoreLoading: false,
    });

    render(<ScoreCheck />);

    const heading = screen.getByRole("heading", {
      name: "Error Checking Scores",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders header if not top score", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [1, 2, 3, 4, 5],
      scoreError: false,
      scoreLoading: false,
    });

    render(<ScoreCheck finishTime={6} />);

    const heading = screen.getByRole("heading", {
      name: "Score did not make leaderboard",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders ScoreSubmit if top score", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [1, 2, 3, 4, 5],
      scoreError: false,
      scoreLoading: false,
    });

    render(<ScoreCheck finishTime={4} />);

    const heading = screen.getByRole("heading", {
      name: "Add name to submit high score!",
    });

    expect(heading).toBeInTheDocument();
  });
});
