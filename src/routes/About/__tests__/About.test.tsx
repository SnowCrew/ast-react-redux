import { render } from "@testing-library/react";
import About from "../About.component";

describe("About render without errors", () => {
  it("About rendering", () => {
    expect(render(<About />)).toMatchSnapshot();
  });
});
