import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../userDetails/UserDetailsProvider";
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import targetImage from '../../../img/target.png';


const TargetBoard = ({targetBoard, firing}) =>{

    const { gameId } = useParams(); 

    const [selectedCell, setSelectedCell] = useState(``)
    const [username, userId] = useContext(UserContext)
    const [ready, val, send] = useContext(WebSocketContext)

    const boardSize = 10; 

    const handleCellClick = (row, col) => {
        setSelectedCell(`${row},${col}`);
    };

    const renderSquare = (col, row) => {
        let color = "blue"

        if(targetBoard[row][col]==="H"){
            color = "red"
        }
        else if(targetBoard[row][col]==="M"){
            color="white"
        }
        return (
            <button 
                key={`${row},${col}`}
                
                style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid black',
                    position: 'relative',
                    backgroundColor: color,
                    backgroundImage: selectedCell === `${row},${col}` ? `url(${targetImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                onClick={()=>{handleCellClick(row,col)}}
            />
        );
    };

    const renderRow = (y) => {
        const squares = [];
        for (let x = 0; x < boardSize; x++) {
            squares.push(renderSquare(x, y));
        }
        return (
            <div key={y} style={{ display: 'flex' }}>
                {squares}
            </div>
        );
    };

    const renderBoard = () => {
        const rows = [];
        for (let y = 0; y < boardSize; y++) {
            rows.push(renderRow(y));
        }
        return <div>{rows}</div>;
    };

    const sendFire = ()=>{
        if(ready){
            const obj = {
                "type": "game",
                "payload": {
                    "game" : "Battleship",
                    "gameId" : gameId,
                    "command" : "fire",
                    "userId": userId,
                    "cord": selectedCell
                }
            }
            send(JSON.stringify(obj))
            setSelectedCell('')
                
        }
    }

    return (
        <div>
            {renderBoard()}
            {firing && <button onClick={()=>sendFire()}>Fire</button>}

        </div>
    )


}

export default TargetBoard; 