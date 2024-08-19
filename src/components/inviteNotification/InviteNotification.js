import React, { useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '../../webSocket/WebSocketProvider';
import Modal from '../home/modal/Modal';
import { UserContext } from '../../userDetails/UserDetailsProvider';


const InviteNotification = ({invite, setInvite}) => {
  const [ready,val,send] = useContext(WebSocketContext);
  const [username, userId] = useContext(UserContext)
  

  const handleClose = ()=>{
    if(ready){
        const obj= {
            "type" : "decline",
            "payload":{
                "gameId":`${invite.gameId}`
            }
        }

        send(JSON.stringify(obj))
        setInvite(null)
    }
  }

  const handleAccept = ()=>{
    if(ready){
        const obj= {
            "type" : "accept",
            "payload":{
                "gameId":`${invite.gameId}`,
                "userId":  `${userId}`
            }
        }

        send(JSON.stringify(obj))
        setInvite(null)
    }
  }


  return (
    <Modal isOpen={invite} onClose={handleClose}>
        {invite && <p>You have an invite from {invite.senderUsername} to play Connect Four</p>}
        <button onClick={handleAccept}>Accept</button>
    </Modal>
  );
};

export default InviteNotification