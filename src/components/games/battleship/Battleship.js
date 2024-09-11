import { useContext, useEffect, useState } from "react";
import BattleshipSetup from "./BattleshipSetup";
import { useNavigate, useParams } from "react-router-dom";
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import { UserContext } from "../../../userDetails/UserDetailsProvider";
import TargetBoard from "./TargetBoard";
import OceanBoard from "./OceanBoard";
import Modal from "../../home/modal/Modal";


const Battleship=()=>{
    const { gameId } = useParams(); 

    const [setup, setSetup] = useState(true)
    const [gameState, setGameState] = useState("firing")
    const [message, setMessage] = useState("Drag the ships to setup board")
    const [targetBoard, setTargetBoard] = useState(
        Array.from({ length: 10 }, () => Array(10).fill(null))
    );
    const [oceanBoard, setOceanBoard] = useState(
        Array.from({ length: 10 }, () => Array(10).fill(null))
    )
    const [ready, val, send] = useContext(WebSocketContext)
    const [username, userId] = useContext(UserContext)
    

    useEffect(()=>{
        if(!val)
            {return }
        const message = JSON.parse(val);
        const type = message.type

        if(type==="readyToFire"){
            setSetup(false)
            setGameState(message.status === "fire" ? "firing" : "wait")
            setMessage(message.status === "fire" ? "Selecting a firing location": "Waiting For Opponent")
        }

        if(type === "hit" || type === "miss" || type === "sink"){
            setTargetBoard(message.targetBoard)
            setGameState("waiting")
            setMessage(type ==="hit" ? "You have hit your oppoenents ship at {FIX}" : 
                type ==="miss" ? "You missed":
                type ==="sink" ? "You sunk one of your oppoents shipes" : "ERROR")
        }

        if(type.startsWith("opponent")){
            setOceanBoard(message.oceanBoard)
            setGameState("firing")
            const arr = type.split(" ")
            setMessage(arr[1] === "hit" ? "Opponent has hit your ship" : 
            arr[1] ==="miss" ? "Opponent has missed" :
            arr[1] ==="sink" ? "Opponent has sunk your ship":"ERROR" )

            //ADD MESSAGE
        }
        if(type === "invalid"){
            setMessage(message.message)
        }

        if(type === "game over"){
            setGameState("game over")
            setMessage(message.message)
        }

        if(type === "wait"){
            setSetup(false)
            setOceanBoard(message.oceanBoard)
            setGameState("waiting")
            setMessage("Waiting for oppoent to complete setup")
            console.log(message)
            
        }

        
    }, [val])


    return(
        <div>
            {setup && <BattleshipSetup></BattleshipSetup>}
            {!setup && 
            
            <div>
                <div>BATTLESHIP</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TargetBoard targetBoard={targetBoard} firing={gameState === "firing"}/>
                    <OceanBoard oceanBoard={oceanBoard}/>
                    
                </div>

                {message}
                
            </div>
   
            }
           <Modal isOpen={gameState==="game over"} onClose={()=>navigate("/home")}>
                <p>{message}</p>
            </Modal>

        </div>
    )

}

export default Battleship;