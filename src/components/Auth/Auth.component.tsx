import "./Auth.styles.css";
import { Link } from "react-router-dom";
import WithAstService from "../../hoc/with-ast-service.hoc";
import { connect, ConnectedProps } from "react-redux";
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
import { IStore } from '../../redux/reducers/reducer';
import AstService from '../../services/ast-shop-service';

interface ILogAndPass {
  email: string,
  password: string
}

type PropsFromRedux = ConnectedProps<typeof connector>;


interface Props extends PropsFromRedux{
  AstService:AstService,
  CartIcon: string
}

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
  totalQuantity,
}:Props) => {
  const [activeModalAuth, setActiveModalAuth] = useState(false);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const handleGetAuth = async () => {
    getAuthRequest();

    //admin
    if (
      adminAccount.email === loginRef.current?.value &&
      adminAccount.password === passRef.current?.value
    ) {
      getAuthAdmin();
      return;
    }

    //users
    const users = await AstService.getAllUsers();
    const auth:boolean = users.some((item:ILogAndPass) => {
      if (
        item.email === loginRef.current?.value &&
        item.password === passRef.current?.value
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
    loginRef.current!.value = "kate@gmail.com";
    passRef.current!.value = "kfejk@*_";
  };

  const handleEnterAsAdmin = () => {
    loginRef.current!.value = "admin";
    passRef.current!.value = "admin";
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
        {totalQuantity === 0 ? (
          "Ваша корзина пуста"
        ) : (
          <span>
            В корзине {totalQuantity}шт товаров на сумму {total}$
          </span>
        )}
      </Link>
      <span className="enter-exit-span" onClick={handleExitAuth}>
        Выход
      </span>
    </>
  );

  return <div className="auth-block">{content}</div>;
};


const mapStateToProps = ({ total, auth, loading, admin, totalQuantity }:IStore) => {
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

const connector = connect(mapStateToProps,mapDispatchToProps)


export default WithAstService()(
  connector(Auth)
);
