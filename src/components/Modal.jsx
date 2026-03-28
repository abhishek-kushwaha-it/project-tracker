import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children, buttonCaption, onConfirm }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className="modal">
      <div className="modal-inner">
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
