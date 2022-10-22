import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "../../../redux/reducers/reducer";
import CartTableComponent from "../CartTable.component";

const renderWithRedux = (
  component: ReactElement,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("CartTable component", () => {
  afterEach(cleanup);
  describe("Render CartTable with initial state", () => {
    afterEach(cleanup);

    it("Render CartTable with initial state", () => {
      expect(renderWithRedux(<CartTableComponent />)).toMatchSnapshot();
      renderWithRedux(<CartTableComponent />);
      expect(screen.getAllByText("Ваша корзина пуста!")[0].textContent).toBe(
        "Ваша корзина пуста!"
      );
    });
  });
  describe("Testing CartTable with items in Cart", () => {
    afterEach(cleanup);
    it("Render CartTable with items", () => {
      expect(
        renderWithRedux(<CartTableComponent />, {
          initialState: {
            products: [],
            loading: false,
            error: false,
            itemsInCart: [
              {
                id: 1,
                title: "string",
                price: 2,
                category: "string",
                description: "string",
                image: "string",
                counterIdentical: 1,
              },
              {
                id: 2,
                title: "string2",
                price: 1,
                category: "string2",
                description: "string2",
                image: "string2",
                counterIdentical: 2,
              },
            ],
            total: 3,
            totalQuantity: 3,
            auth: false,
            admin: false,
          },
        })
      ).toMatchSnapshot();
    });

    it("CartTable handlers testing", () => {
      renderWithRedux(<CartTableComponent />, {
        initialState: {
          products: [],
          loading: false,
          error: false,
          itemsInCart: [
            {
              id: 1,
              title: "string",
              price: 2,
              category: "string",
              description: "string",
              image: "string",
              counterIdentical: 1,
            },
            {
              id: 2,
              title: "string2",
              price: 1,
              category: "string2",
              description: "string2",
              image: "string2",
              counterIdentical: 2,
            },
          ],
          total: 3,
          totalQuantity: 3,
          auth: false,
          admin: false,
        },
      });

      //add item №1 quantity +
      userEvent.click(screen.getAllByText("+")[0]);
      expect(screen.getAllByTestId("item-counter-count")[0].textContent).toBe(
        "2"
      );
      userEvent.click(screen.getAllByText("+")[1]);
      expect(screen.getAllByTestId("item-counter-count")[1].textContent).toBe(
        "3"
      );

      //decrease item quantity -
      userEvent.click(screen.getAllByTestId("decrease_button")[0]);
      userEvent.click(screen.getAllByTestId("decrease_button")[0]);
      expect(screen.getAllByTestId("item-counter-count").length).toBe(1);

      //delete item from Cart
      userEvent.click(screen.getAllByTestId("remove_button")[0]);
      expect(screen.getByText("Ваша корзина пуста!").textContent).toBe(
        "Ваша корзина пуста!"
      );
    });

    it("CartTable clear cart handler test", () => {
      renderWithRedux(<CartTableComponent />, {
        initialState: {
          products: [],
          loading: false,
          error: false,
          itemsInCart: [
            {
              id: 1,
              title: "string",
              price: 2,
              category: "string",
              description: "string",
              image: "string",
              counterIdentical: 1,
            },
            {
              id: 2,
              title: "string2",
              price: 1,
              category: "string2",
              description: "string2",
              image: "string2",
              counterIdentical: 2,
            },
          ],
          total: 3,
          totalQuantity: 3,
          auth: false,
          admin: false,
        },
      });
      //Clear Cart
      userEvent.click(screen.getAllByTestId("clear_cart_button")[0]);
      expect(screen.getByText("Ваша корзина пуста!").textContent).toBe(
        "Ваша корзина пуста!"
      );
    });
  });
});
