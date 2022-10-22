import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { legacy_createStore as createStore } from "redux";
import ProductItemComponent from "../ProductItem.component";
import reducer, { IProduct } from "../../../redux/reducers/reducer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

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
const randomProducts1: IProduct = {
  id: 1,
  title: "title1",
  price: 25,
  category: "category1",
  description: "description1",
  image: "image1",
};
const randomProducts2: IProduct = {
  id: 1,
  title: "title2",
  price: 25,
  category: "category2",
  description: "description12",
  image: "image2",
};

describe("ProductItem testing", () => {
  it("ProductItem with auth", () => {
    expect(
      renderWithRedux(<ProductItemComponent product={randomProducts1} />, {
        initialState: {
          products: [randomProducts1, randomProducts2],
          loading: false,
          error: false,
          itemsInCart: [],
          total: 0,
          totalQuantity: 0,
          auth: true,
          admin: false,
        },
      })
    ).toMatchSnapshot();
    expect(screen.getByText("title1")).toBeInTheDocument();
    expect(screen.getByText("Add to cart")).toBeInTheDocument();
    expect(
      screen.queryByText("Чтобы добавить товар в корзину залогинтесь")
    ).not.toBeInTheDocument();
  });

  it("ProductItem without auth", () => {
    renderWithRedux(<ProductItemComponent product={randomProducts1} />, {
      initialState: {
        products: [randomProducts1, randomProducts2],
        loading: false,
        error: false,
        itemsInCart: [],
        total: 0,
        totalQuantity: 0,
        auth: false,
        admin: false,
      },
    });
    expect(
      screen.getByText("Чтобы добавить товар в корзину залогинтесь")
    ).toBeInTheDocument();
    expect(screen.queryByText("Add to cart")).not.toBeInTheDocument();
  });
});
