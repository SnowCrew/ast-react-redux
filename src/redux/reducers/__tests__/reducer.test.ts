import { IAction } from "../../actions/actions";
import reducer, { IProduct, IProductInCart, IStore } from "../reducer";

describe("Reducer testing", () => {
  const initialState: IStore = {
    products: [],
    loading: false,
    error: false,
    itemsInCart: [],
    total: 0,
    totalQuantity: 0,
    auth: false,
    admin: false,
  };

  const randomProduct: IProduct = {
    id: 1,
    title: "abc",
    price: 2,
    category: "string",
    description: "string",
    image: "string",
  };

  const randomProductInCart: IProductInCart = {
    id: 1,
    title: "abc",
    price: 2,
    category: "string",
    description: "string",
    image: "string",
    counterIdentical: 1,
  };

  it("should return initial state/default case", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle action 'MENU_LOADED' without data", () => {
    expect(reducer(initialState, { type: "MENU_LOADED", payload: [] })).toEqual(
      initialState
    );
  });

  it("should handle action 'MENU_LOADED' with data", () => {
    expect(
      reducer(initialState, { type: "MENU_LOADED", payload: [randomProduct] })
    ).toEqual({ ...initialState, products: [randomProduct] });

    expect(
      reducer(initialState, {
        type: "MENU_LOADED",
        payload: [randomProduct, randomProduct],
      })
    ).toEqual({ ...initialState, products: [randomProduct, randomProduct] });
  });

  it("should handle action 'MENU_REQUESTED'", () => {
    expect(
      reducer(initialState, {
        type: "MENU_REQUESTED",
      })
    ).toEqual({ ...initialState, loading: true, error: false });
  });

  it("should handle action 'MENU_ERROR'", () => {
    expect(
      reducer(initialState, {
        type: "MENU_ERROR",
      })
    ).toEqual({ ...initialState, loading: true, error: true });
  });

  it("should handle action 'ITEM_ADD_TO_CART' and add one item", () => {
    expect(
      reducer({ ...initialState, products: [randomProduct] }, {
        type: "ITEM_ADD_TO_CART",
        payload: [1, 1],
      } as IAction)
    ).toEqual({
      ...initialState,
      itemsInCart: [randomProductInCart],
      products: [randomProduct],
      total: 2,
      totalQuantity: 1,
    });
  });

  it("should handle action 'ITEM_ADD_TO_CART' and add four items", () => {
    expect(
      reducer({ ...initialState, products: [randomProduct] }, {
        type: "ITEM_ADD_TO_CART",
        payload: [1, 4],
      } as IAction)
    ).toEqual({
      ...initialState,
      itemsInCart: [{ ...randomProductInCart, counterIdentical: 4 }],
      products: [randomProduct],
      total: 8,
      totalQuantity: 4,
    });
  });

  it("should handle action 'ITEM_ADD_TO_CART' and remove 1 item(and cart still have this item)", () => {
    expect(
      reducer(
        {
          ...initialState,
          products: [randomProduct],
          itemsInCart: [{ ...randomProductInCart, counterIdentical: 2 }],
          total: 4,
          totalQuantity: 2,
        },
        {
          type: "ITEM_ADD_TO_CART",
          payload: [1, -1],
        } as IAction
      )
    ).toEqual({
      ...initialState,
      products: [randomProduct],
      itemsInCart: [randomProductInCart],
      total: 2,
      totalQuantity: 1,
    });
  });

  it("should handle action 'ITEM_REMOVE_FROM_CART'", () => {
    expect(
      reducer(
        {
          ...initialState,
          products: [randomProduct],
          itemsInCart: [{ ...randomProductInCart, counterIdentical: 2 }],
          total: 4,
          totalQuantity: 2,
        },
        {
          type: "ITEM_REMOVE_FROM_CART",
          payload: 1,
        } as IAction
      )
    ).toEqual({
      ...initialState,
      products: [randomProduct],
    });
  });

  it("should handle action 'ITEM_REMOVE_FROM_CART' if can't find the item with id(return state)", () => {
    expect(
      reducer(
        {
          ...initialState,
          products: [randomProduct],
          itemsInCart: [{ ...randomProductInCart, counterIdentical: 2 }],
          total: 4,
          totalQuantity: 2,
        },
        {
          type: "ITEM_REMOVE_FROM_CART",
          payload: 2,
        } as IAction
      )
    ).toEqual({
      ...initialState,
      products: [randomProduct],
      itemsInCart: [{ ...randomProductInCart, counterIdentical: 2 }],
      total: 4,
      totalQuantity: 2,
    });
  });

  it("should handle action 'CLEAR_CART'", () => {
    expect(
      reducer(
        {
          ...initialState,
          products: [randomProduct],
          itemsInCart: [{ ...randomProductInCart, counterIdentical: 2 }],
          total: 4,
          totalQuantity: 2,
        },
        {
          type: "CLEAR_CART",
        } as IAction
      )
    ).toEqual({
      ...initialState,
      products: [randomProduct],
    });
  });

  it("should handle action 'GET_AUTH_REQUEST'", () => {
    expect(
      reducer(
        {
          ...initialState,
        },
        {
          type: "GET_AUTH_REQUEST",
        } as IAction
      )
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("should handle action 'GET_AUTH'", () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
        },
        {
          type: "GET_AUTH",
        } as IAction
      )
    ).toEqual({
      ...initialState,
      auth: true,
    });
  });

  it("should handle action 'GET_ADMIN_AUTH'", () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
        },
        {
          type: "GET_ADMIN_AUTH",
        } as IAction
      )
    ).toEqual({
      ...initialState,
      auth: true,
      admin: true,
    });
  });

  it("should handle action 'GET_AUTH_REJECT'", () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
        },
        {
          type: "GET_AUTH_REJECT",
        } as IAction
      )
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle action 'EXIT_AUTH'", () => {
    expect(
      reducer(
        {
          ...initialState,
          admin: true,
          auth: true,
        },
        {
          type: "EXIT_AUTH",
        } as IAction
      )
    ).toEqual({
      ...initialState,
    });
  });
});
