import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  menuRequested,
  menuLoaded,
  menuError,
  onAddToCart,
} from "../../redux/actions/actions";
import WithAstService from "../../hoc/with-ast-service.hoc";
import ProductItem from "../productItem/ProductItem.component";
import "./Shop.styles.css";
import Loading from "../Loading/Loading.component";
import { IProduct, IStore } from '../../redux/reducers/reducer';
import AstService from '../../services/ast-shop-service';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux{
  product?:IProduct
  AstService:AstService
}

const Shop = (props:Props) => {
  const {
    menuLoaded,
    menuError,
    AstService,
    menuRequested,
    products,
    loading,
    onAddToCart,
  } = props;

  const spinner = loading ? <Loading /> : null;
  const content = !loading ? (
    <ul className="menu__list">
      {products.map((item) => {
        return (
          <ProductItem key={item.id} product={item} onAddToCart={onAddToCart} />
        );
      })}
    </ul>
  ) : null;

  useEffect(() => {
    menuRequested();

    AstService.getAllProducts()
      .then((res) => menuLoaded(res))
      .catch(() => menuError());
  }, [AstService, menuError, menuLoaded, menuRequested]);

  return (
    <>
      {spinner}
      {content}
    </>
  );
};

const mapStateToProps = (state:IStore) => {
  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    itemsInCart: state.itemsInCart,
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
  connector(Shop)
);
