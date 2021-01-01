import React from 'react';
import { MODE } from './../../constants';
import './index.css';

export const Card = ({ mode, id = '', url = '', onClick, className, ...rest }) => {
    return (
        <img
            className={`Card-image ${className}`}
            data-id={id}
            src={url}
            {...(mode === MODE.EDIT ? (onClick = { onClick }) : '')}
            {...rest}
        />
    );
};
