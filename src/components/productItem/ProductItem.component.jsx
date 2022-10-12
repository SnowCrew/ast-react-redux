import { Link } from "react-router-dom";
import "./ProductItem.styles.css";

const ProductItem = ({ product, onAddToCart }) => {
  const { id, image, title, category, price } = product;
  return (
    <li className="menu__item">
      <Link to={`${id}`}>
        <p className="menu__title"> {title} </p>
      </Link>

      <img className="menu__img" src={image} alt={title}></img>
      <div className="menu__category">
        Category: <span>{category}</span>
      </div>
      <div className="menu__price">
        Price: <span>{price}$</span>
      </div>
      <button onClick={() => onAddToCart(id)} className="menu__btn">
        Add to cart
      </button>
    </li>
  );
};

export default ProductItem;
