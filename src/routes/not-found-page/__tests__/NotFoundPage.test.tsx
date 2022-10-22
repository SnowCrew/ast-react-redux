import { render } from "@testing-library/react";
import NotFoundPage from "../NotFoundPage.component";

describe("NotFoundPage handle to render", () => {
  it("NotFoundPage rendering", () => {
    expect(render(<NotFoundPage />)).toMatchSnapshot();
  });
});
