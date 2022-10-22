import { cleanup, render, screen } from "@testing-library/react";
import AuthComponent from "../Auth.component";
import { ReactElement } from "react";
import reducer from "../../../redux/reducers/reducer";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

const renderWithRedux = (
  component: ReactElement,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: MemoryRouter,
    }),
  };
};

describe("Auth testing", () => {
  describe("Render Auth with initial state", () => {
    it("Render Auth with initial state", () => {
      expect(
        renderWithRedux(<AuthComponent CartIcon={""} />)
      ).toMatchSnapshot();
      expect(screen.getByText("Вход").textContent).toBe("Вход");
    });

    it("Auth modal window trigger", () => {
      renderWithRedux(<AuthComponent CartIcon={""} />);

      userEvent.click(screen.getByTestId("set_modal_active_button"));

      expect(screen.getAllByText("Авторизация")[0].textContent).toBe(
        "Авторизация"
      );
      expect(screen.getAllByText("Email")[0].textContent).toBe("Email");
      expect(screen.getAllByText("Password")[0].textContent).toBe("Password");

      expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();

      expect(screen.getByText("Войти")).toBeInTheDocument();
    });
  });
  describe("Auth authentication testing", () => {
    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
    });
    it("Enter as admin", async () => {
      renderWithRedux(<AuthComponent CartIcon={""} />);
      //modal
      userEvent.click(screen.getByTestId("set_modal_active_button"));
      //fill inputs admin
      userEvent.click(screen.getByText("Заполнить поля данными админа"));

      expect(screen.getByPlaceholderText("Enter email")).toHaveValue("admin");
      expect(screen.getByPlaceholderText("Enter password")).toHaveValue(
        "admin"
      );

      //trigger auth as admin
      userEvent.click(screen.getByText("Войти"));

      expect(screen.getByText("Выход")).toBeInTheDocument();

      //trigger exit auth
      userEvent.click(screen.getByText("Выход"));

      expect(screen.getByText("Войти")).toBeInTheDocument();
    });
  });
});
