import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  menuRequested,
  menuLoaded,
  menuError,
  onAddToCart,
} from "../../redux/actions/actions";
import WithAstService from "../../hoc/with-ast-service.hoc";
import "./Shop.styles.css";
import { IProduct, IStore } from "../../redux/reducers/reducer";
import AstService from "../../services/ast-shop-service";
import ShopContent from "./ShopContent.component";

type ShopPropsFromRedux = ConnectedProps<typeof connector>;

export interface ShopProps extends ShopPropsFromRedux {
  product?: IProduct;
  AstService: AstService;
}

const Shop = (props: ShopProps) => {
  const { menuLoaded, menuError, AstService, menuRequested } = props;

  useEffect(() => {
    menuRequested();

    AstService.getAllProducts()
      .then((res) => menuLoaded(res))
      .catch(() => menuError());
  }, [AstService, menuError, menuLoaded, menuRequested]);

  return (
    <>
      <ShopContent {...props} />
    </>
  );
};

const mapStateToProps = (state: IStore) => {
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default WithAstService()(connector(Shop));
