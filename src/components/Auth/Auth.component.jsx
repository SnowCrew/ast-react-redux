import "./Auth.styles.css";
import { Link } from "react-router-dom";
import WithAstService from "../../hoc/with-ast-service.hoc";
import { connect } from "react-redux";
import { useState } from "react";
import ModalAuth from "../ModalAuth/ModalAuth.component";
import { useRef } from "react";
import {
  getAuth,
  exitAuth,
  getAuthRequest,
  getAuthReject,
  getAuthAdmin,
} from "../../redux/actions/actions";
import Loading from "../Loading/Loading.component";

const adminAccount = { email: "admin", password: "admin" };

const Auth = ({
  auth,
  AstService,
  total,
  CartIcon,
  getAuth,
  exitAuth,
  loading,
  getAuthAdmin,
}) => {
  const [activeModalAuth, setActiveModalAuth] = useState(false);
  const loginRef = useRef();
  const passRef = useRef();

  const handleGetAuth = async () => {
    getAuthRequest();

    //admin
    if (
      adminAccount.email === loginRef.current.value &&
      adminAccount.password === passRef.current.value
    ) {
      getAuthAdmin();
      return;
    }

    //users
    const users = await AstService.getAllUsers();
    const auth = users.some((item) => {
      if (
        item.email === loginRef.current.value &&
        item.password === passRef.current.value
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (auth) {
      getAuth();
    } else {
      getAuthReject();
      alert("Введены неверные данные");
    }
  };

  const handleExitAuth = () => {
    exitAuth();
  };

  const handleEnterAsUser = () => {
    loginRef.current.value = "kate@gmail.com";
    passRef.current.value = "kfejk@*_";
  };

  const handleEnterAsAdmin = () => {
    loginRef.current.value = "admin";
    passRef.current.value = "admin";
  };

  const content = !auth ? (
    <>
      <span
        className="enter-exit-span"
        onClick={() => setActiveModalAuth(true)}
      >
        Вход
      </span>
      <ModalAuth active={activeModalAuth} setActive={setActiveModalAuth}>
        {!loading ? (
          <div className="auth-modal-block">
            <h2 className="auth-title">Авторизация</h2>
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              placeholder="Enter email"
              type={"email"}
              ref={loginRef}
            />
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              placeholder="Enter password"
              type={"text"}
              ref={passRef}
            />
            <button className="auth-btn" onClick={handleGetAuth}>
              Войти
            </button>
            <button className="auth-btn" onClick={handleEnterAsUser}>
              {" "}
              Заполнить поля коррект. данными юзера
            </button>
            <button className="auth-btn" onClick={handleEnterAsAdmin}>
              Заполнить поля данными админа
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </ModalAuth>
    </>
  ) : (
    <>
      <Link className="nav-link" to="cart">
        <img className="nav-cart" src={CartIcon} alt="cart"></img>
        Total: {total} $
      </Link>
      <span className="enter-exit-span" onClick={handleExitAuth}>
        Выход
      </span>
    </>
  );

  return <div className="auth-block">{content}</div>;
};

const mapStateToProps = ({ total, auth, loading, admin }) => {
  return {
    total,
    auth,
    loading,
    admin,
  };
};
const mapDispatchToProps = {
  getAuthRequest,
  getAuth,
  getAuthReject,
  exitAuth,
  getAuthAdmin,
};

export default WithAstService()(
  connect(mapStateToProps, mapDispatchToProps)(Auth)
);
