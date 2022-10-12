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

const onAddToCart = (id) => {
  return {
    type: "ITEM_ADD_TO_CART",
    payload: id
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

export {
  menuLoaded,
  menuRequested,
  menuError,
  onAddToCart,
  deleteFromCart,
  completeOrder
};