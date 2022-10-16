import { IAction } from '../actions/actions';


const initialState:IStore = {
  products: [],
  loading: true,
  error: false,
  itemsInCart: [],
  total: 0,
  totalQuantity: 0,
  auth: false,
  admin: false
};

export interface IProduct {
  id: number,
  title:string,
  price:number,
  category:string,
  description:string,
  image:string
}

export interface IProductInCart extends IProduct {
counterIdentical:number,
}

export interface IStore {
  products: IProduct[],
  loading: boolean,
  error: boolean,
  itemsInCart: IProductInCart[],
  total: number,
  totalQuantity: number,
  auth: boolean,
  admin: boolean
};

const reducer = (state:IStore = initialState, action:IAction):IStore => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        products: action.payload as IProduct[],
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
      const [id, quantity] = action.payload as [number, number];
      const itemInd = state.itemsInCart?.findIndex(item => item.id === id);

      if (itemInd >= 0 ) {
        const elemInState = state.itemsInCart?.find(item => item.id === id);
        const newElem = {
          ...elemInState,
          counterIdentical: (Number(elemInState?.counterIdentical) + Number(quantity)),
        }
        return {
          ...state,
          itemsInCart: [
            ...state.itemsInCart!.slice(0, itemInd),
            newElem,
            ...state.itemsInCart!.slice(itemInd! + 1)
          ] as IProductInCart[],
          total: Number((Number(state.total) + (Number(newElem.price) * Number(quantity))).toFixed(2)),
          totalQuantity: Number(state.totalQuantity) + Number(quantity)
        }
      }

      const item = state.products.find(item => item.id === id);
      const newItem:IProductInCart = {
        title: item!.title,
        price: item!.price,
        image: item!.image,
        id: item!.id,
        category:item!.category,
        description: item!.description,
        counterIdentical: Number(quantity)
      }
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart,
          newItem
        ],
        total: Number(((state.total) + (Number(newItem.price) * Number(quantity))).toFixed(2)),
        totalQuantity: Number(state.totalQuantity) + Number(quantity)
      };

    case "ITEM_REMOVE_FROM_CART":
      const idx = action.payload as number;

      const itemIndex = state.itemsInCart.findIndex(item => item.id === idx);
      const itemDel = state.itemsInCart.find(item => item.id === idx);
      if(itemIndex === -1){
        return state;
      }
      return {
        ...state,
        itemsInCart: [
          ...state.itemsInCart.slice(0, itemIndex),
          ...state.itemsInCart.slice(itemIndex + 1)
        ],
        total: Number((state.total - (itemDel!.price * itemDel!.counterIdentical)).toFixed(2)),
        totalQuantity: Number(state.totalQuantity) - itemDel!.counterIdentical
      };

    case "CLEAR_CART":
      return {
        ...state,
        itemsInCart: [],
        total: 0,
        totalQuantity: 0
      }

    case "GET_AUTH_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "GET_AUTH":
      return {
        ...state,
        auth: true,
        loading: false
      };

    case "GET_ADMIN_AUTH":
      return {
        ...state,
        auth: true,
        loading: false,
        admin: true
      };

    case "GET_AUTH_REJECT":
      return {
        ...state,
        loading: false
      };

    case "EXIT_AUTH":
      return {
        ...state,
        auth: false,
        admin: false
      };

    default:
      return state;
  };
};

export default reducer;