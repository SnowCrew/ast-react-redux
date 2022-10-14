import "./CartTable.styles.css";
import { connect } from "react-redux";
import {
  deleteFromCart,
  onAddToCart,
  clearCart,
} from "../../redux/actions/actions";

const CartTable = ({ itemsInCart, deleteFromCart, onAddToCart, clearCart }) => {
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
          <button className="cart__btn" disabled>
            Оплатить
          </button>
          <button onClick={handleClearCart}>Очистить корзину</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ itemsInCart }) => {
  return {
    itemsInCart,
  };
};

const mapDispatchToProps = {
  deleteFromCart,
  onAddToCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
