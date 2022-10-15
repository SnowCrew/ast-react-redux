import "./CartTable.styles.css";
import { connect, ConnectedProps } from "react-redux";
import {
  deleteFromCart,
  onAddToCart,
  clearCart,
} from "../../redux/actions/actions";
import { IStore } from '../../redux/reducers/reducer';

type PropsFromRedux = ConnectedProps<typeof connector>;


const CartTable = ({
  itemsInCart,
  deleteFromCart,
  onAddToCart,
  clearCart,
  total,
  }:PropsFromRedux) => {

  const handleClearCart = () => {
    clearCart();
  };

  if (itemsInCart.length === 0) {
    return <div className="cart__title">Ваша корзина пуста!</div>;
  } else {
    return (
      <div className="cart">
        <div className="cart__title">Ваш заказ:</div>
        <div className="cart__list">
          {itemsInCart.map((item) => {
            const { title, price, id, counterIdentical } = item;
            const handleAddCounter = () => {
              onAddToCart(item.id);
            };
            const handleRemoveCounter = () => {
              if (counterIdentical === 1) {
                deleteFromCart(item.id);
                return;
              }
              onAddToCart(item.id, -1);
            };

            return (
              <div key={id} className="cart__item">
                <div>{id}</div>
                <div className="cart__item-title">{title}</div>
                <div className="cart__item-price">{price}$</div>
                <div className="cart__item-counter">
                  <button
                    className="cart__item-counter-btn"
                    onClick={handleAddCounter}
                  >
                    +
                  </button>
                  <div className="cart__item-counter-count">
                    {counterIdentical}
                  </div>
                  <button
                    className="cart__item-counter-btn minus"
                    onClick={handleRemoveCounter}
                  >
                    -
                  </button>
                </div>
                <div className="cart__item-price">
                  Total: {(counterIdentical * price).toFixed(2)}$
                </div>
                <div onClick={() => deleteFromCart(id)} className="cart__close">
                  &times;
                </div>
              </div>
            );
          })}
          <div className="cart-total-money">Сумма за все товары : {total}$</div>
          <button className="cart__btn" disabled>
            Оплатить
          </button>
          <button onClick={handleClearCart}>Очистить корзину</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ itemsInCart, total }:IStore) => {
  return {
    itemsInCart,
    total,
  };
};

const mapDispatchToProps = {
  deleteFromCart,
  onAddToCart,
  clearCart,
};

const connector = connect(mapStateToProps,mapDispatchToProps)


export default connector(CartTable);
