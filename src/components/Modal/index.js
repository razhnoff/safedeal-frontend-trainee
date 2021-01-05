import React, { forwardRef } from 'react';
import './index.css';

const ModalWindow = ({ children, onClose, forwardRef }) => {
    return (
        <>
            <div className="modal-background" onClick={onClose}></div>
            <div ref={forwardRef} className="modal">
                <div className="modal-content">
                    <div className="modal-cross" onClick={onClose}></div>
                    {children}
                </div>
            </div>
        </>
    );
};

export const Modal = forwardRef(({ children, ...rest }, ref) => {
    return (
        <ModalWindow forwardRef={ref} {...rest}>
            {children}
        </ModalWindow>
    );
});
