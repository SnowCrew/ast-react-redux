import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { IProduct, IStore } from '../../redux/reducers/reducer';
import "./ProductItem.styles.css";

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux{
  product:IProduct
  onAddToCart:(props:number) => void;
}

const ProductItem = ({ product, onAddToCart, auth }:Props) => {
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
const mapStateToProps = ({ auth }:IStore) => {
  return {
    auth,
  };
};

const connector = connect(mapStateToProps)


export default connector(ProductItem);
