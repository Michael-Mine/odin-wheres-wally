import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("Game page", () => {
  it("renders heading & image", () => {
    render(<Game />);

    const heading = screen.getByRole("heading", { name: "Space Station" });
    const image = screen.getByRole("img", { name: "space station" });

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("popovers not visible before image click", async () => {
    // const user = userEvent.setup();
    render(<Game />);

    const targetingBox = screen.getByTestId("targeting-box");
    const selectionBox = screen.getByTestId("selection-box");

    expect(targetingBox).not.toBeVisible();
    expect(selectionBox).not.toBeVisible();

    // After click, Vitest can't process togglePopover() - not a function
    // const image = screen.getByRole("img", { name: "space station" });
    // await user.click(image);

    // expect(targetingBox).toBeVisible();
  });
});
