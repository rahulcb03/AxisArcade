
import React, { useEffect, useState } from 'react';
import './Modal.css'; 
import api from '../../../api/axiosConfig';
import Friends from './Friends';
import FriendRequests from './FriendRequests';
import { Form } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  
    const [modalState, setModalState] = useState(0);
    const [friendRequest, setFriendRequet] = useState('');

    const onFriendRequestUsernameChange = (event) =>{
        setFriendRequet(event.target.value)
    }

    const sendFreindRequest = async (event) =>{
        event.preventDefault(); 

        try{

            const response =  await api.post(`api/v1/friend-request/${friendRequest}`)
            if(response.status == 200){
                console.log("sent")
            }
            
        

        }catch(e){

        }

        setFriendRequet("");
    }
  

    if (!isOpen) return null;


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>X</button>
                <button className= "button" onClick={()=>setModalState(0)}>Friends</button>
                <button className= "button" onClick={()=>setModalState(1)}>Friend Requests</button>
                {modalState===0  && <Friends></Friends>}
                {modalState===1  && <FriendRequests></FriendRequests>}

                <form onSubmit={sendFreindRequest}>
                    <input
                        type='text'
                        placeholder='username'
                        value={friendRequest}
                        onChange={onFriendRequestUsernameChange}

                    />

                    <button type="submit" className='send-Request-button'>Send Friend Request</button>
                    
                </form>
                
            </div>
        </div>
    );
};

export default Modal;
