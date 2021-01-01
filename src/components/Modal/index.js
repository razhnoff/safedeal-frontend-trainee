import React from 'react';
import './index.css';

export const Modal = ({ children }) => {
    return (
        <div className="modal">
            <div className="modal-content">{children}</div>
        </div>
    );
};
