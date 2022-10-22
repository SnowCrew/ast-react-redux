import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ModalAuth from "../ModalAuth.component";
import "@testing-library/jest-dom/extend-expect";

describe("ModalAuth testing", () => {
  const Children = () => {
    const [active, setActive] = React.useState(false);

    return (
      <ModalAuth active={active} setActive={setActive}>
        <div>
          <button onClick={() => setActive(true)}>setActive</button>
          {active ? <div>I am active</div> : <div>I am not active</div>}
        </div>
      </ModalAuth>
    );
  };
  it("ModalAuth render", () => {
    expect(render(<Children />)).toMatchSnapshot();
    expect(screen.getByText("I am not active")).toBeInTheDocument();
  });
  it("ModalAuth handle to be active(appear) and dissapear", () => {
    render(<Children />);
    userEvent.click(screen.getByText("setActive"));
    expect(screen.getByText("I am active")).toBeInTheDocument();
    expect(screen.queryByText("I am not active")).not.toBeInTheDocument();
  });
});
