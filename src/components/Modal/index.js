import React from 'react';
import './index.css';

export const Modal = ({ children, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-cross" onClick={onClose}></div>
                {children}
            </div>
        </div>
    );
};
