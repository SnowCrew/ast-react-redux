import { connect, ConnectedProps } from "react-redux";
import {
  menuLoaded,
  menuRequested,
  menuError,
  onAddToCart,
} from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import "./SingleItem.styles.css";
import { useEffect, useRef } from "react";
import WithAstService from "../../hoc/with-ast-service.hoc";
import Loading from "../../components/Loading/Loading.component";
import SingleItemAdmin from "./SingleItemAdmin.component";
import { IProduct, IStore } from '../../redux/reducers/reducer';
import AstService from '../../services/ast-shop-service';

export type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux{
    AstService:AstService
}

const SingleItem = (props:Props) => {
  const quantityInputRef = useRef<HTMLInputElement>(null);
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

  const item  = products.find((el) => +el.id === Number(paramId));
  const { title, image, category, price, id, description } = item as IProduct;

  const content = loading ? (
    <div className="item_page">
      <Loading />
    </div>
  ) : admin ? (
    <SingleItemAdmin
      item={item as IProduct}
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
                onClick={() => onAddToCart(id, Number(quantityInputRef.current?.value))}
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

const mapStateToProps = (state:IStore) => {
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

const connector = connect(mapStateToProps, mapDispatchToProps)

export default WithAstService()(
  connector(SingleItem)
);
