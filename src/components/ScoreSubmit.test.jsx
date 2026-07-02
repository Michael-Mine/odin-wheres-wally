import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import ScoreSubmit from "./ScoreSubmit";

describe("Score Submit component", () => {
  it("renders heading", () => {
    render(<ScoreSubmit />);

    const heading = screen.getByRole("heading", {
      name: "Add name to submit high score!",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders heading, label, input & button", () => {
    const { container } = render(<ScoreSubmit />);

    expect(container).toMatchSnapshot();
  });

  it("input value is updated correctly", async () => {
    const user = userEvent.setup();
    render(<ScoreSubmit />);

    const input = screen.getByTestId("title-input");

    await user.type(input, "Mr Mine");

    expect(input.value).toBe("Mr Mine");
  });

  it("sending text is shown while API request is in progress", async () => {
    const user = userEvent.setup();
    render(<ScoreSubmit />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", { name: "Sending..." });

    expect(heading).toBeInTheDocument();
  });

  it("renders score saved if in response message", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Score saved!" };

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ScoreSubmit />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", { name: "Score saved!" });

    expect(heading).toBeInTheDocument();
  });

  it("renders network error text if response catches error", async () => {
    window.fetch = vi.fn(() => {
      const response = { message: "Score saved!" };

      return Promise.reject({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<ScoreSubmit />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", {
      name: "A network error was encountered",
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders response message if not score saved", async () => {
    window.fetch = vi.fn(() => {
      const response = [{ msg: "Invalid input" }];

      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const user = userEvent.setup();
    render(<ScoreSubmit />);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    const heading = screen.getByRole("heading", { name: "Invalid input" });

    expect(heading).toBeInTheDocument();
  });
});
