import { useContext, useEffect, useState } from "react";
import BattleshipSetup from "./BattleshipSetup";
import { useNavigate, useParams } from "react-router-dom";
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import { UserContext } from "../../../userDetails/UserDetailsProvider";
import TargetBoard from "./TargetBoard";
import OceanBoard from "./OceanBoard";


const Battleship=()=>{
    const { gameId } = useParams(); 

    const [setup, setSetup] = useState(true)
    const [firing, setFiring] = useState(false)
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
            setFiring(message.status === "fire")
            setMessage(message.status === "fire" ? "Selecting a firing location": "Waiting For Opponent")
        }

        if(type === "hit" || type === "miss" || type === "sink"){
            setTargetBoard(message.targetBoard)
            setFiring(false)
            setMessage(type ==="hit" ? "You have hit your oppoenents ship at {FIX}" : 
                type ==="miss" ? "You missed":
                type ==="sink" ? "You sunk one of your oppoents shipes" : "ERROR")
        }

        if(type.startsWith("opponent")){
            setOceanBoard(message.oceanBoard)
            setFiring(true)
            const arr = type.split(" ")
            setMessage(arr[1] === "hit" ? "Opponent has hit your ship" : 
            arr[1] ==="miss" ? "Opponent has missed" :
            arr[1] ==="sink" ? "Opponent has sunk your ship":"ERROR" )

            //ADD MESSAGE
        }
        if(type === "invalid"){
            setMessage(message.message)
        }
        
    }, [val])


    return(
        <div>
            {setup && <BattleshipSetup></BattleshipSetup>}
            {!setup && 
            
            <div>
                <div>BATTLESHIP</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TargetBoard targetBoard={targetBoard} firing={firing}/>
                    <OceanBoard oceanBoard={oceanBoard}/>
                    
                </div>

                {message}
                
            </div>
   
            }

        </div>
    )

}

export default Battleship;