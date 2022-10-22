import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { legacy_createStore as createStore } from "redux";
import reducer, { IProduct } from "../../../redux/reducers/reducer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ShopContent from "../ShopContent.component";

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
  id: 2,
  title: "title2",
  price: 25,
  category: "category2",
  description: "description12",
  image: "image2",
};

describe("ShopContent testing", () => {
  it("Shop should render with initial state", () => {
    expect(
      renderWithRedux(<ShopContent products={[]} loading={false} />, {
        initialState: {
          products: [],
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
    expect(
      screen.queryByText("Чтобы добавить товар в корзину залогинтесь")
    ).not.toBeInTheDocument();
  });

  it("Shop should render with items", () => {
    renderWithRedux(
      <ShopContent
        products={[randomProducts1, randomProducts2]}
        loading={false}
      />,
      {
        initialState: {
          products: [],
          loading: false,
          error: false,
          itemsInCart: [],
          total: 0,
          totalQuantity: 0,
          auth: false,
          admin: false,
        },
      }
    );
    expect(
      screen.getAllByText("Чтобы добавить товар в корзину залогинтесь").length
    ).toBe(2);
  });
  it("Shop should render Loading while loading", () => {
    renderWithRedux(
      <ShopContent
        products={[randomProducts1, randomProducts2]}
        loading={true}
      />,
      {
        initialState: {
          products: [],
          loading: true,
          error: false,
          itemsInCart: [],
          total: 0,
          totalQuantity: 0,
          auth: false,
          admin: false,
        },
      }
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(
      screen.queryByText("Чтобы добавить товар в корзину залогинтесь")
    ).not.toBeInTheDocument();
  });
});
