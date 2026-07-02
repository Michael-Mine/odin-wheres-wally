import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";

describe("Home page", () => {
  it("renders heading, text instructions & links", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
