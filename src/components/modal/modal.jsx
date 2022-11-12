import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForModal from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { MODAL_ROOT } from '../../utils/constants';

const Modal = (props) => {
  useEffect(() => {
    const pressEsc = (event) => {
      event.key === 'Escape' && props.closeModal();
    };
    document.addEventListener('keydown', pressEsc);
    return () => {
      document.removeEventListener('keydown', pressEsc);
    };
  }, [props.closeModal]);

  return ReactDOM.createPortal(
    <ModalOverlay
      isActive={props.isActive}
      onClick={props.closeModal}
      closeModal={props.closeModal}
    >
      <div className={stylesForModal.modalContainer}>
        {props.title && (
          <h3 className={`text_type_main-large ${stylesForModal.modalHeader}`}>
            {props.title}
          </h3>
        )}
        <div className={stylesForModal.modalClose} onClick={props.closeModal}>
          <CloseIcon className type="primary" />
        </div>
        <div className={stylesForModal.modalWrapper}>{props.children}</div>
      </div>
    </ModalOverlay>,
    MODAL_ROOT
  );
};

Modal.defaultProps = {
  title: '',
};

// Modal.propTypes = {};

export default Modal;