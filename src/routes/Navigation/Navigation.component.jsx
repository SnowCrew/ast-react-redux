import "./Navigation.styles.css";
import { Link, Outlet } from "react-router-dom";
import CartIcon from "./shopping-cart-solid.svg";
import { connect } from "react-redux";

const Navigation = ({ total }) => {
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
        <Link className="nav-link" to="cart">
          <img className="nav-cart" src={CartIcon} alt="cart"></img>
          Total: {total} $
        </Link>
      </div>
      <Outlet />
    </>
  );
};

const mapStateToProps = ({ total }) => {
  return {
    total,
  };
};

export default connect(mapStateToProps)(Navigation);
