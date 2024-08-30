
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Modal from '../components/home/modal/Modal';
import { useNavigate } from 'react-router-dom';

export const WebSocketContext = createContext(false, null, () => {})
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumer.
export const WebSocketProvider = ({  setInvite, isAuth, children }) => {
  const [isReady, setIsReady] = useState(false)
  const [val, setVal] = useState(null)

  const ws = useRef(null)
  const naviagte = useNavigate(); 
  
  

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!isAuth)
    {
        return; 
    }
    const socket = new WebSocket(`ws://54.92.130.37:8080/myHandler?token=${token}`)

    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if(message.type === "invited"){
        setInvite(message)
      }
      if(message.type === "started"){
        switch (message.game){
          case "Connect Four":
            naviagte(`/game/connect-four/${message.gameId}`)
            break;
        }
        
      }
      setVal(event.data)
    }

    ws.current = socket

    return () => {
        if (socket.readyState === 1) { 
            socket.close();
        }
    }
  }, [isAuth])

  const ret = [isReady, val, ws.current?.send.bind(ws.current)]

  
  
  return (
    <WebSocketContext.Provider value={ret}>
  
      {children}
    </WebSocketContext.Provider>
  )
}