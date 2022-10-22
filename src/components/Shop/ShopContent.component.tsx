import { IProduct } from "../../redux/reducers/reducer";
import Loading from "../Loading/Loading.component";
import ProductItemComponent from "../productItem/ProductItem.component";

interface Props {
  products: IProduct[];
  loading: boolean;
}

const ShopContent = (props: Props) => {
  const { products, loading } = props;

  const spinner = loading ? <Loading /> : null;
  const content = !loading ? (
    <ul className="menu__list">
      {products.map((item) => {
        return <ProductItemComponent key={item.id} product={item} />;
      })}
    </ul>
  ) : null;
  return (
    <>
      {spinner}
      {content}
    </>
  );
};

export default ShopContent;
