import "./Navigation.styles.css";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "./shopping-cart-solid.svg";
import AuthComponent from "../../components/Auth/Auth.component";

const Navigation = () => {
  return (
    <>
      <div className="header">
        <div className="navigation">
          <Link className="nav-link" to="/">
            Главная
          </Link>
          <Link className="nav-link" to="/about">
            О магазине
          </Link>
        </div>
        <AuthComponent CartIcon={CartIcon} />
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
