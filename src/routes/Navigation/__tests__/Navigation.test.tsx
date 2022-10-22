import { cleanup, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { legacy_createStore as createStore } from "redux";
import reducer, { IProduct } from "../../../redux/reducers/reducer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Navigation from "../Navigation.component";

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

describe("Navigation render without errors", () => {
  it("Navigation rendering", () => {
    expect(renderWithRedux(<Navigation />)).toMatchSnapshot();
  });
});
