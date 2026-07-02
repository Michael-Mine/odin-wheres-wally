import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Leaderboard from "./Leaderboard";
import useScores from "../hooks/useScores";

vi.mock("../hooks/useScores");

describe("Leaderboard page", () => {
  it("renders loading header", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [],
      scoreError: false,
      scoreLoading: true,
    });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", { name: "Checking Scores" });

    expect(heading).toBeInTheDocument();
  });

  it("renders error header", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [],
      scoreError: true,
      scoreLoading: false,
    });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", {
      name: "Error Checking Scores",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders header, ranks, names & scores", () => {
    vi.mocked(useScores).mockReturnValue({
      scores: [
        {
          id: 3,
          username: "3",
          time: 30,
        },
        {
          id: 5,
          username: "5",
          time: 50,
        },
        {
          id: 6,
          username: "6",
          time: 60,
        },
      ],
      scoreError: false,
      scoreLoading: false,
    });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading", {
      name: "Leaderboard",
    });

    expect(heading).toBeInTheDocument();
    expect(screen.getAllByRole("cell")).toHaveLength(9);
  });
});
