import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WebSocketContext } from "../../../webSocket/WebSocketProvider";
import { UserContext } from '../../../userDetails/UserDetailsProvider';
import Board from './Board';
import Ship from './Ship';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';


const BattleshipSetup = () =>{
    const { gameId } = useParams(); 
    const [username, userId] = useContext(UserContext)

    const [ships, setShips] = useState([]);

    const [ready, val, send] = useContext(WebSocketContext)

    const sendSetup=()=>{

        const finalShips = []
        ships.forEach((ship)=>{
            const obj = {
                "ship":ship.length+ship.id[0],
                "orientation":ship.orientation,
                "startPosition": `${ship.y},${ship.x}`
            }
            finalShips.push(obj)
        })
        if(ready){
            const obj = {
                "type":"game",
                "payload":{
                    "command":"setup",
                    "game":"Battleship",
                    "gameId": gameId,
                    "ships": finalShips,
                    "userId" : userId
                }
                
            }
            send(JSON.stringify(obj))
        }
    }


    return (
        <DndProvider backend={HTML5Backend}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <h3>Ships</h3>
              <Ship id="Carrier" name="Carrier" length={5} />
              <Ship id="Battleship" name="Battleship" length={4} />
              <Ship id="Cruiser" name="Cruiser" length={3} />
              <Ship id="Submarine" name="Submarine" length={3} />
              <Ship id="Destroyer" name="Destroyer" length={2} />
            </div>
            <div>
              <h3>Board</h3>
              <Board ships={ships} setShips={setShips}/>
              <button onClick={sendSetup}>Submit Setup</button>
            </div>
          </div>
        </DndProvider>
      );
}

export default BattleshipSetup;