import { IProduct } from '../reducers/reducer';

export interface IAction {
  type:string,
  payload?: IProduct[]|[number, number]|number
}

const menuLoaded = (newMenu:IProduct[]):IAction => {
  return {
    type: "MENU_LOADED",
    payload: newMenu
  }
};

const menuRequested = () => {
  return {
    type: "MENU_REQUESTED",
  }
};

const menuError = () => {
  return {
    type: "MENU_ERROR",
  }
};

const onAddToCart = (id:number, quantity:number = 1) => {
  return {
    type: "ITEM_ADD_TO_CART",
    payload: [id, quantity]
  };
};

const deleteFromCart = (id:number) => {
  return {
    type: "ITEM_REMOVE_FROM_CART",
    payload: id
  };
};

const clearCart = () => {
  return {
    type: "CLEAR_CART"
  }
}

const completeOrder = () => {
  return {
    type: "ORDER_COMPLETED",
  }
};

const getAuthRequest = () => {
  return {
    type: "GET_AUTH_REQUEST"
  }
}

const getAuth = () => {
  return {
    type: "GET_AUTH"
  }
}

const getAuthAdmin = () => {
  return {
    type: "GET_ADMIN_AUTH"
  }
}

const getAuthReject = () => {
  return {
    type: "GET_AUTH_REJECT"
  }
}

const exitAuth = () => {
  return {
    type: "EXIT_AUTH"
  }
}

export {
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
  clearCart
};