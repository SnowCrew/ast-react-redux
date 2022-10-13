const menuLoaded = (newMenu) => {
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

const onAddToCart = (id, quantity = 1) => {
  return {
    type: "ITEM_ADD_TO_CART",
    payload: [id, quantity]
  };
};

const deleteFromCart = (id) => {
  return {
    type: "ITEM_REMOVE_FROM_CART",
    payload: id
  };
};

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
  getAuthAdmin
};