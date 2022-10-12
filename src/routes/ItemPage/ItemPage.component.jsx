import { connect } from "react-redux";
import {
  menuLoaded,
  menuRequested,
  menuError,
  onAddToCart,
} from "../../redux/actions/actions";
import { Link, useParams } from "react-router-dom";
import "./ItemPage.styles.css";
import { useEffect } from "react";
import WithAstService from "../../hoc/with-ast-service.hoc";
import Loading from "../../components/Loading/Loading.component";

const ItemPage = (props) => {
  const paramId = useParams().id;

  const {
    menuLoaded,
    menuError,
    AstService,
    menuRequested,
    products,
    loading,
  } = props;

  useEffect(() => {
    if (products.length === null) {
      menuRequested();

      AstService.getAllProducts()
        .then((res) => props.menuLoaded(res))
        .catch((err) => menuError());
    }
  }, [
    AstService,
    menuError,
    menuLoaded,
    menuRequested,
    products.length,
    props,
  ]);

  const Spinner = loading ? (
    <div className="item_page">
      <Loading />
    </div>
  ) : null;
  const item = props.products.find((el) => +el.id === +paramId);
  const { title, image, category, price, id } = item;

  return (
    <>
      {Spinner}
      <div className="item_page">
        <div className="menu__item item_block">
          <div className="menu__title">{title}</div>
          <img className="menu__img1" src={image} alt={title}></img>
          <div className="menu__category">
            Category: <span>{category}</span>
          </div>
          <div className="menu__price">
            Price: <span>{price}$</span>
          </div>
          <button onClick={() => onAddToCart(id)} className="menu__btn">
            Add to cart
          </button>
          <Link to={`/`}>
            <button className="menu__btn">Back</button>
          </Link>
          <span className={`menu__category_Img ${category}`}></span>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = {
  menuLoaded,
  menuError,
  menuRequested,
  onAddToCart,
};

export default WithAstService()(
  connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
