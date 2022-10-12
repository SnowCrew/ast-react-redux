

const initialState = {
  products: [],
  loading: true,
  error: false,
  itemsInCart: [],
  total: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: false
      };
    case 'MENU_REQUESTED':
      return {
        ...state,
        products: state.products,
        loading: true,
        error: false
      };
    case 'MENU_ERROR':
      return {
        ...state,
        products: state.products,
        loading: true,
        error: true
      };
    case "ITEM_ADD_TO_CART":
      const id = action.payload;

      const itemInd = state.itemsInCart.findIndex(item => item.id === id);

      if (itemInd >= 0) {
        const elemInState = state.itemsInCart.find(item => item.id === id);
        const newElem = {
          ...elemInState,
          counterIdentical: ++elemInState.counterIdentical
        }
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart.slice(0, itemInd),
            newElem,
            ...state.itemsInCart.slice(itemInd + 1)
          ],
          total: (Number(state.total) + Number(newElem.price)).toFixed(2)
        }
      }

      const item = state.products.find(item => item.id === id);
      const newItem = {
        title: item.title,
        price: item.price,
        image: item.image,
        id: item.id,
        counterIdentical: 1,
      }
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart,
          newItem
        ],
        total: (Number(state.total) + Number(newItem.price)).toFixed(2)
      };

    case "ITEM_REMOVE_FROM_CART":
      const idx = action.payload;
      const itemIndex = state.itemsInCart.findIndex(item => item.id === idx);
      const itemDel = state.itemsInCart.find(item => item.id === idx);
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.slice(0, itemIndex),
          ...state.itemsInCart.slice(itemIndex + 1)
        ],
        total: state.total - (itemDel.price * itemDel.counterIdentical)
      };

    default:
      return state;
  }
}

export default reducer;