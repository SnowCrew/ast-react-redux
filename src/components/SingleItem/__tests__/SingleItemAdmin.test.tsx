import { cleanup, render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { legacy_createStore as createStore } from "redux";
import reducer, { IProduct } from "../../../redux/reducers/reducer";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import SingleItemComponent from "../SingleItem.component";
import SingleItemAdmin from "../SingleItemAdmin.component";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

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

describe("SingleItemAdmin testing", () => {
  it("SingleItemAdmin should render single item with admin auth", () => {
    expect(
      renderWithRedux(<SingleItemComponent />, {
        initialState: {
          products: [randomProducts1, randomProducts2],
          loading: false,
          error: false,
          itemsInCart: [],
          total: 0,
          totalQuantity: 0,
          auth: true,
          admin: true,
        },
      })
    ).toMatchSnapshot();
    expect(screen.getByText("Редактировать")).toBeInTheDocument();
    expect(screen.getByText("Добавить в корзину")).toBeInTheDocument();
  });
  it("SingleItemAdmin should handle edit mode", () => {
    renderWithRedux(<SingleItemComponent />, {
      initialState: {
        products: [randomProducts1, randomProducts2],
        loading: false,
        error: false,
        itemsInCart: [],
        total: 0,
        totalQuantity: 0,
        auth: true,
        admin: true,
      },
    });
    userEvent.click(screen.getByText("Редактировать"));

    expect(screen.getByText("Отменить")).toBeInTheDocument();
    expect(screen.getByText("Сохранить")).toBeInTheDocument();
  });
});
