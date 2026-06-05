import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RemainingCharactersBoxItem from "./RemainingCharactersBoxItem";

describe("Testing RemainingCharactersBoxItem", () => {
  const characterMock = "Wally";

  it("renders button with character name", () => {
    render(<RemainingCharactersBoxItem character={characterMock} />);

    const button = screen.getByRole("button", { name: "Wally" });

    expect(button).toBeInTheDocument();
  });

  it("should call the handleClickRemove function when clicked", async () => {
    const handleCharacterSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <RemainingCharactersBoxItem
        character={characterMock}
        handleCharacterSelect={handleCharacterSelect}
      />,
    );

    const button = screen.getByRole("button", { name: "Wally" });

    await user.click(button);

    expect(handleCharacterSelect).toHaveBeenCalled();
  });
});
