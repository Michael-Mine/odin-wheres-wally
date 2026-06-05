import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Characters from "./Characters";

describe("Characters component", () => {
  it("renders image and names underneath", () => {
    render(<Characters />);
    const { container } = render(<Characters />);

    expect(container).toMatchSnapshot();
  });
});
