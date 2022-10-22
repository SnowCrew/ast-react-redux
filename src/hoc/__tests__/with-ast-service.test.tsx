import { render, screen, within } from "@testing-library/react";
import AstService from "../../services/ast-shop-service";
import WithAstService from "../with-ast-service.hoc";

describe("HOC WithAstService testing", () => {
  const MockWithAstServiceComponent = WithAstService()(() => (
    <div>Test AstService</div>
  ));

  it("renders snapshot", () => {
    const { container } = render(<MockWithAstServiceComponent />);

    expect(container).toMatchSnapshot();
  });

  // it("component have HOC", async () => {
  //   const MockComponent = jest.fn(() => null);
  //   const ComponentWithHoc = WithAstService()(MockComponent);

  //   render(<ComponentWithHoc />);

  //   expect(MockComponent).toBeCalled();
  //   expect(MockComponent).toBeCalledWith(
  //     expect.objectContaining({ AstService: {AstService} }),
  //     expect.anything()
  //   );
  // });
});
