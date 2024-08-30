import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../userDetails/UserDetailsProvider";
import GameBoard from "./GameBoard";
import RedPice from "../../../img/red-piece.png"
import YellowPice from "../../../img/yellow-piece.png"
import "./ConnectFour.css"
import Modal from "../../home/modal/Modal";
import DropSound from "../../../sound/dropSound.mp3"
import ClickSound from "../../../sound/click.mp3"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRectangleXmark } from "@fortawesome/free-regular-svg-icons"; 


const ConnectFour = ()=>{
   
    const { gameId } = useParams(); 
    const [ready, val, send] = useContext(WebSocketContext)
    const [username, userId] = useContext(UserContext)

    const [column, setColumn] = useState(-1)
    const [movingState, setMovingState] = useState("moving")
    const [board, setBoard] = useState([])
    const [invlMessage, setInvlMessage] = useState("")
    const [gameOverMessage, setGameOverMessage] = useState("")
    const [startMessage, setStartMessage] = useState()

    const navigate = useNavigate(); 

    const playDropSound = () => {
        const sound = new Audio(DropSound);
        sound.play().catch(error => console.error("Error playing sound:", error));
    }

    const playClickSound = ()=>{
        const sound = new Audio(ClickSound)
        sound.play().catch(error => console.error("Error playing sound:", error));
    }

    const sendMove = ()=>{
        if(ready){
            const obj = {
                "type":"game",
                "payload":{
                    "command":"move",
                    "game":"Connect Four",
                    "gameId": gameId,
                    "column": column,
                    "userId" : userId
                }
                
            }
            send(JSON.stringify(obj))
        }
    }

    const sendQuit = ()=>{
        if(ready){
            const obj = {
                "type":"game",
                "payload":{
                    "command":"quit",
                    "game":"Connect Four",
                    "gameId": gameId,
                }
            }
            send(JSON.stringify(obj))
        }
        
    }

    useEffect(()=>{
        if(!val)
            {return }
        const message = JSON.parse(val);
        const type = message.type

        if(type==="moved"){
            setBoard(message.board)
            playDropSound()
            if(message.playerName === username){
                setMovingState("waiting")
            }
            else{
                setMovingState("moving")
            }
        }

        if(type==="invalid")
        {   
            setInvlMessage(message.message)
        }

        if(type==="game over"){
            setGameOverMessage(message.message)
            setMovingState("over")
        }

        if(type==="started"){
            setStartMessage(message)
            setMovingState(message.color==="red" ? "moving" : "waiting")
        }

        
    }, [val])

    const handleColumnSelect=(num)=>{
        playClickSound();
        setColumn(num)
        

    }

    return (
        <div className="connectFour-div">

            <div className="quit-btn">
                <FontAwesomeIcon icon={faRectangleXmark}className="quit"onClick={sendQuit} size="4x" color="blue"/>
            </div>
            
            <div className="game-container">
                <div className="gameBoard-component">
                    <GameBoard board={board} onColumnClick={handleColumnSelect} column={column}></GameBoard>
                </div>
                

                <div className="gameInfo">
                    {startMessage && <div>
                        <div className="piece-display-div">
                        <p>You: </p>
                        <img className="piece-display"
                            style={{
                                background: `${startMessage.color}`,
                            }}

                            src={startMessage.color==="red"?RedPice:YellowPice}
                        />
                    </div>
                    
                    <p className="opponent-display">Opponent: {startMessage.opponentName}</p>
                    
                    </div>}
                    

                    {movingState==="moving" && <button className="action-btn" onClick={sendMove}>Send</button>}
                    {movingState==="waiting" && <p>Waiting for Opponent</p>}
                </div>
                
                

                
            </div>
            

            
             
            <Modal isOpen={movingState==="over"} onClose={()=>navigate("/home")}>
                <p>{gameOverMessage}</p>
            </Modal>


            


        </div>
    )
}

export default ConnectFour; 