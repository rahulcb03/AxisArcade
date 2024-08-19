import React, { useContext, useEffect, useState } from "react";
import Title from "../../img/connect-four-title.png"
import Modal from "../home/modal/Modal";
import Friends from "../home/Friends";
import { WebSocketContext } from "../../webSocket/WebSocketProvider";
import { useNavigate } from "react-router-dom";
import "./ConnectFourStart.css";
import { UserContext } from "../../userDetails/UserDetailsProvider";



const ConnectFourStart = () =>{
    const [isModalActive, setIsModalActive] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(null)
    const [gameState, setGameState] = useState("")
    const [invlMessage, setInvlMessage] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)

    const [ready, val, send] = useContext(WebSocketContext)
    const [username, userId] = useContext(UserContext)

    const navigate = useNavigate(); 

    const openModal = () => { setIsModalActive(true)}
    const closeModal = () => { setIsModalActive(false); setSelectedFriend(null)}

    useEffect(()=>{

        if(!val){
            return
        }
        const message = JSON.parse(val);
        
        const type = message.type
        
        if(type==="started"){
            setGameState("starting")
            navigate(`/game/connect-four/${message.gameId}`)
        }

        if(type==="wait"){
            setGameState("waiting")
            setIsWaiting(true)
        }

        if(type==="invalid"){
            setGameState("invalid")
            setInvlMessage(message.message)
        }

        if(type==="game over"){
            setGameState("declined")
            setIsWaiting(false)

        }

        if(type==="canceled"){
            setIsWaiting(false)
            setGameState("")
        }

    }, [val])

    const sendGameInvite =()=>{
        if(ready){
            const obj = {
                "type": "invite",
                "payload": {
                    "recipUsername": selectedFriend.username,
                    "userId": userId
                }
            }

            send(JSON.stringify(obj))
        }
        closeModal()
    }

    const sendStartGame = () =>{
        if(ready){
            const obj = {
                "type": "start",
                "payload": {
                    "userId": userId
                }
            }

            send(JSON.stringify(obj))
        }
        
    }

    const sendCancel = ()=>{

        if(ready){
            const obj = {
                "type": "cancel",
                "payload": {
                    "userId": userId
                }
            }

            send(JSON.stringify(obj))
            
        }
    }
    
    
    return (
        <div className="game-start-div">
            <img src={Title}></img>

            <div className="start-buttons-div">
                <button onClick={sendStartGame}>Join Open Queue</button>
                <button onClick={openModal}>Invite Friend</button>
            </div>

            <div className="message-div">
                {gameState === "starting" && 
                    <div>
                        <p>Starting Match Now</p>
                    </div>
                }
                {gameState === "waiting" && 
                    <div>
                        <p> Waiting for Player</p>
                    </div>
                }
                {gameState === "invalid" && 
                    <div>
                        <p>{invlMessage}</p>
                    </div>
                }
                {gameState === "declined" && 
                    <div>
                        <p>Your Invite was Declined</p>
                    </div>
                }
                {isWaiting && 
                    <button onClick={sendCancel}>Cancel</button>

                }
            </div>

            <Modal isOpen={isModalActive} onClose={closeModal}>
                <Friends onSelect={setSelectedFriend}></Friends>

                {selectedFriend && 
                
                <div className = "modal-startGame-content">
                    <p>Send Invite to: {selectedFriend.username}</p>
                    <button onClick={sendGameInvite}>Send</button>
                </div>
                
                }

            </Modal>
        </div>
    )
}

export default ConnectFourStart;