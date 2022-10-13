import { connect } from "react-redux";
import {
  menuLoaded,
  menuRequested,
  menuError,
  onAddToCart,
} from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import "./ItemPage.styles.css";
import { useEffect, useRef } from "react";
import WithAstService from "../../hoc/with-ast-service.hoc";
import Loading from "../../components/Loading/Loading.component";
import ItemPageAdmin from "./ItemPageAdmin.component";

const ItemPage = (props) => {
  const quantityInputRef = useRef();
  const paramId = useParams().id;

  const {
    menuLoaded,
    menuError,
    AstService,
    menuRequested,
    products,
    loading,
    onAddToCart,
    auth,
    admin,
  } = props;

  useEffect(() => {
    if (products.length === null) {
      menuRequested();

      AstService.getAllProducts()
        .then((res) => menuLoaded(res))
        .catch((err) => menuError());
    }
  }, [AstService, menuError, menuLoaded, menuRequested, products.length]);

  const item = products.find((el) => +el.id === +paramId);
  const { title, image, category, price, id, description } = item;

  const content = loading ? (
    <div className="item_page">
      <Loading />
    </div>
  ) : admin ? (
    <ItemPageAdmin
      item={item}
      onAddToCart={onAddToCart}
      quantityInputRef={quantityInputRef}
    />
  ) : (
    <div className="item_page">
      <div className="item-block">
        <div className="item-page-title">{title}</div>
        <img className="item-page-img" src={image} alt={title}></img>
        <div> {description}</div>
        <div className="menu__category">
          Category: <span>{category}</span>
        </div>
        <div className="menu__price">
          Price: <span>{price}$</span>
        </div>

        {auth ? (
          <>
            <div className="item-page-quantitiy-container">
              <div>
                <label className="quantity-label">Количество:</label>
                <input
                  type={"number"}
                  ref={quantityInputRef}
                  placeholder={"Количество товаров"}
                />
              </div>
              <button
                onClick={() => onAddToCart(id, quantityInputRef.current.value)}
                className="item-page-btn"
              >
                Добавить в корзину
              </button>
            </div>
          </>
        ) : (
          "Чтобы добавить товар в корзину залогинтесь"
        )}
      </div>
    </div>
  );

  return <>{content}</>;
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    auth: state.auth,
    admin: state.admin,
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
