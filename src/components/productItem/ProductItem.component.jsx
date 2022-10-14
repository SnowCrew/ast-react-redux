import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ProductItem.styles.css";

const ProductItem = ({ product, onAddToCart, auth }) => {
  const { id, image, title, category, price } = product;
  return (
    <li className="menu__item">
      <Link className="link" to={`${id}`}>
        <p className="menu__title"> {title} </p>
      </Link>

      <img className="menu__img" src={image} alt={title}></img>
      <div className="menu__category">
        Category: <span>{category}</span>
      </div>
      <div className="menu__price">
        Price: <span>{price}$</span>
      </div>
      {auth ? (
        <button onClick={() => onAddToCart(id)} className="menu__btn">
          Add to cart
        </button>
      ) : (
        "Чтобы добавить товар в корзину залогинтесь"
      )}
    </li>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, null)(ProductItem);
