import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RemainingCharactersBox from "../components/RemainingCharactersBox";

describe("Testing RemainingCharactersBox", () => {
  const remainingCharactersMock = ["Wally", "Woof", "Wendy"];

  it("renders RemainingCharactersBox array", () => {
    render(
      <RemainingCharactersBox remainingCharacters={remainingCharactersMock} />,
    );

    const listitem = screen.getAllByRole("listitem");

    expect(listitem).toHaveLength(3);
  });
});
