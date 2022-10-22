import { IProduct } from "../../reducers/reducer";
import {
  menuLoaded,
  menuRequested,
  menuError,
  onAddToCart,
  deleteFromCart,
  completeOrder,
  getAuthRequest,
  getAuth,
  getAuthReject,
  exitAuth,
  getAuthAdmin,
  clearCart,
  IAction,
} from "../actions";

describe("Actions testing", () => {
  const randomProduct: IProduct = {
    id: 1,
    title: "abc",
    price: 2,
    category: "string",
    description: "string",
    image: "string",
  };

  it("should create an action 'menuLoaded' with empty payload", () => {
    expect(menuLoaded([])).toEqual({ payload: [], type: "MENU_LOADED" });
  });

  it("should create an action 'menuLoaded' with payload", () => {
    expect(menuLoaded([randomProduct])).toEqual({
      payload: [randomProduct],
      type: "MENU_LOADED",
    });
  });

  it("should create an action 'menuRequested'", () => {
    expect(menuRequested()).toEqual({
      type: "MENU_REQUESTED",
    });
  });

  it("should create an action 'menuError'", () => {
    expect(menuError()).toEqual({
      type: "MENU_ERROR",
    });
  });

  it("should create an action 'onAddToCart' with default quantitiy(1 item)", () => {
    expect(onAddToCart(1)).toEqual({
      type: "ITEM_ADD_TO_CART",
      payload: [1, 1],
    } as IAction);
  });

  it("should create an action 'onAddToCart' with quantity passed", () => {
    expect(onAddToCart(1, 16)).toEqual({
      type: "ITEM_ADD_TO_CART",
      payload: [1, 16],
    } as IAction);
  });

  it("should create an action 'deleteFromCart'", () => {
    expect(deleteFromCart(156)).toEqual({
      type: "ITEM_REMOVE_FROM_CART",
      payload: 156,
    } as IAction);
  });

  it("should create an action 'clearCart'", () => {
    expect(clearCart()).toEqual({
      type: "CLEAR_CART",
    } as IAction);
  });

  it("should create an action 'completeOrder'", () => {
    expect(completeOrder()).toEqual({
      type: "ORDER_COMPLETED",
    } as IAction);
  });

  it("should create an action 'getAuthRequest'", () => {
    expect(getAuthRequest()).toEqual({
      type: "GET_AUTH_REQUEST",
    } as IAction);
  });

  it("should create an action 'getAuth'", () => {
    expect(getAuth()).toEqual({
      type: "GET_AUTH",
    } as IAction);
  });

  it("should create an action 'getAuthAdmin'", () => {
    expect(getAuthAdmin()).toEqual({
      type: "GET_ADMIN_AUTH",
    } as IAction);
  });

  it("should create an action 'getAuthReject'", () => {
    expect(getAuthReject()).toEqual({
      type: "GET_AUTH_REJECT",
    } as IAction);
  });

  it("should create an action 'exitAuth'", () => {
    expect(exitAuth()).toEqual({
      type: "EXIT_AUTH",
    } as IAction);
  });
});
