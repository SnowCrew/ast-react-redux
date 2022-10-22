import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.component";
import ModalAuth from "../ModalAuth/ModalAuth.component";
import { Props } from "./Auth.component";

const adminAccount = { email: "admin", password: "admin" };

const AuthContent = ({
  auth,
  AstService,
  total,
  CartIcon,
  getAuth,
  exitAuth,
  loading,
  getAuthAdmin,
  getAuthRequest,
  totalQuantity,
  getAuthReject,
}: Props) => {
  const [activeModalAuth, setActiveModalAuth] = useState(false);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const handleGetAuth = async () => {
    const enteredLogin = loginRef.current?.value;
    const enteredPass = passRef.current?.value;
    getAuthRequest();
    //admin
    if (
      adminAccount.email === enteredLogin &&
      adminAccount.password === enteredPass
    ) {
      getAuthAdmin();
      return;
    }

    //users
    const users = await AstService.getAllUsers();
    const auth = users.some((item) => {
      if (item.email === enteredLogin && item.password === enteredPass) {
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
        data-testid={"set_modal_active_button"}
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

export default AuthContent;
