import "./CartTable.styles.css";
import { connect } from "react-redux";
import { deleteFromCart } from "../../redux/actions/actions";

const CartTable = ({ itemsInCart, deleteFromCart, completeOrder }) => {
  if (itemsInCart.length === 0) {
    return <div className="cart__title">Ваша корзина пуста!</div>;
  } else {
    return (
      <>
        <div className="cart__title">Ваш заказ:</div>
        <div className="cart__list">
          {itemsInCart.map((item) => {
            const { title, price, image, id, counterIdentical } = item;

            return (
              <div key={id} className="cart__item">
                <img src={image} className="cart__item-img" alt={title}></img>
                <div className="cart__item-title">{title}</div>
                <div className="cart__item-counter">
                  Количество: {counterIdentical}
                </div>
                <div className="cart__item-price">
                  Total: {counterIdentical * price}$
                </div>
                <div onClick={() => deleteFromCart(id)} className="cart__close">
                  &times;
                </div>
              </div>
            );
          })}
          <button variant="secondary" className="cart__btn" disabled>
            Оплатить
          </button>
        </div>
      </>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
