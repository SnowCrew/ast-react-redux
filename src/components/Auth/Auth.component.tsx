import "./Auth.styles.css";
import WithAstService from "../../hoc/with-ast-service.hoc";
import { connect, ConnectedProps } from "react-redux";
import {
  getAuth,
  exitAuth,
  getAuthRequest,
  getAuthReject,
  getAuthAdmin,
} from "../../redux/actions/actions";
import { IStore } from "../../redux/reducers/reducer";
import AstService from "../../services/ast-shop-service";
import AuthContent from "./AuthContent.component";

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface Props extends PropsFromRedux {
  AstService: AstService;
  CartIcon: string;
}

const Auth = (props: Props) => {
  return <AuthContent {...props} />;
};

const mapStateToProps = ({
  total,
  auth,
  loading,
  admin,
  totalQuantity,
}: IStore) => {
  return {
    total,
    auth,
    loading,
    admin,
    totalQuantity,
  };
};
const mapDispatchToProps = {
  getAuthRequest,
  getAuth,
  getAuthReject,
  exitAuth,
  getAuthAdmin,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default WithAstService()(connector(Auth));
