import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import AstServiceContext from "./context/ast-service-context";
import { BrowserRouter } from "react-router-dom";
import AstService from "./services/ast-shop-service";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const astService = new AstService();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AstServiceContext.Provider value={astService}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AstServiceContext.Provider>
    </Provider>
  </React.StrictMode>
);
