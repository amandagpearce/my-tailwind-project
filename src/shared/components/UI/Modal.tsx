import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

interface ModalProps {
  show: boolean;
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  contentClass?: string;
  footerClass?: string;
  footer?: React.ReactNode;
  onCancel: () => void;
  children: ReactNode;
}

const ModalOverlay: React.FC<ModalProps> = (props) => {
  const content = (
    <div
      className={`
        modal
        ${props.className}
        top-1/4 left-1/10 w-3/6
        z-50
        fixed
        bg-white
        rounded-md
        shadow-2xl
        left-0
        right-0
        mx-auto
    `}
      style={props.style}
    >
      <header
        className={`
        modal__header
        w-full
        p-4
        bg-purple
        text-white
        rounded-t-md
        ${props.headerClass}
        `}
      >
        <h2 className="m-1">{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass} p-6`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass} p-6`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-portal')!
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter: 'modal-enter',
          enterActive: 'modal-enter-active',
          exit: 'modal-exit',
          exitActive: 'modal-exit-active',
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
