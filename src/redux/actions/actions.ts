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

const menuRequested = ():IAction => {
  return {
    type: "MENU_REQUESTED",
  }
};

const menuError = ():IAction => {
  return {
    type: "MENU_ERROR",
  }
};

const onAddToCart = (id:number, quantity:number = 1):IAction => {
  return {
    type: "ITEM_ADD_TO_CART",
    payload: [id, quantity]
  };
};

const deleteFromCart = (id:number):IAction => {
  return {
    type: "ITEM_REMOVE_FROM_CART",
    payload: id
  };
};

const clearCart = ():IAction => {
  return {
    type: "CLEAR_CART"
  }
}

const completeOrder = ():IAction => {
  return {
    type: "ORDER_COMPLETED",
  }
};

const getAuthRequest = ():IAction => {
  return {
    type: "GET_AUTH_REQUEST"
  }
}

const getAuth = ():IAction => {
  return {
    type: "GET_AUTH"
  }
}

const getAuthAdmin = ():IAction => {
  return {
    type: "GET_ADMIN_AUTH"
  }
}

const getAuthReject = ():IAction => {
  return {
    type: "GET_AUTH_REJECT"
  }
}

const exitAuth = ():IAction => {
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