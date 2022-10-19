import { ReactNode } from 'react';
import "./ModalAuth.styles.css";

interface IModalProps {
  active:boolean,
  setActive: (active: boolean) => void,
  children: ReactNode|ReactNode[]
}

const ModalAuth = ({ active, setActive, children }:IModalProps) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalAuth;
