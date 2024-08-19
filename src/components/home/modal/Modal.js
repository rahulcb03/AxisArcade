
import React, { useEffect, useState } from 'react';
import './Modal.css'; 
import api from '../../../api/axiosConfig';
import Friends from '../Friends';
import FriendRequests from '../FriendRequests';
import { Form } from 'react-router-dom';

const Modal = ({ isOpen, onClose , children}) => {
  

    if (!isOpen) return null;


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>X</button>
                {children}
                
            </div>
        </div>
    );
};

export default Modal;
