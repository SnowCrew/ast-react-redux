import { cleanup, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { legacy_createStore as createStore } from "redux";
import reducer from "../../../redux/reducers/reducer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CartPage from "../CartPage.component";

const renderWithRedux = (
  component: ReactElement,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: MemoryRouter,
    }),
  };
};

describe("CartPage render without errors", () => {
  it("CartPage rendering", () => {
    expect(renderWithRedux(<CartPage />)).toMatchSnapshot();
  });
});
