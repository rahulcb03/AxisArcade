import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from "@fortawesome/free-solid-svg-icons"; 
import api from "../../api/axiosConfig";
import Modal from "./modal/Modal";
import AppDisplay from "../../img/app-display.png"
import Friends from './Friends';
import FriendRequests from './FriendRequests';
import AxisArcade from "../../img/Axis-Arcade-Title.png"

import "./Home.css"
import { useNavigate } from "react-router-dom";


const Home = () =>{

    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
    const [modalState, setModalState] = useState(0);
    const [friendRequest, setFriendRequet] = useState('');
    const [msg, setMsg] = useState('Enter username to send friend request')

    

    const navigate = useNavigate(); 

    
    const onFriendRequestUsernameChange = (event) =>{
        setFriendRequet(event.target.value)
    }

    const sendFreindRequest = async (event) =>{
        event.preventDefault(); 

        try{

            const response =  await api.post(`api/v1/friend-request/${friendRequest}`)
            if(response.status == 200){
                console.log(response)
                setMsg(response.data)
            }
            
        

        }catch(error){
            if(error.response){
                setMsg("Error sending request, try again later")
            }else{
              setMsg(error.response.data)  
            }
            
        }

        setFriendRequet("");
    }

    

    const openModal = () => { setIsFriendModalOpen(true)}
    const closeModal = () => { setIsFriendModalOpen(false)}

    return(
        <div className="home">
            <div className="header">
                <FontAwesomeIcon icon={faGamepad} size="2x"/>
                
                <button onClick={openModal}>Friends</button>
                
                <button onClick={()=>{localStorage.clear(); navigate('/login')}}>Sign Out</button>
            </div>

            <img className="axis-arcade" src={AxisArcade}></img>

            <Modal isOpen={isFriendModalOpen} onClose={closeModal}>

            
                <button className= "button" onClick={()=>setModalState(0)}>Friends</button>
                <button className= "button" onClick={()=>setModalState(1)}>Friend Requests</button>
                {modalState===0  && <Friends onSelect={()=>{}}></Friends>}
                {modalState===1  && <FriendRequests></FriendRequests>}

                {msg}

                <form onSubmit={sendFreindRequest}>
                    <input
                        type='text'
                        placeholder='username'
                        value={friendRequest}
                        onChange={onFriendRequestUsernameChange}
                        className="friendRequest-input"

                    />

                    <button type="submit" className='send-Request-button'>Send Friend Request</button>
                    
                </form>
            </Modal>

            <div className="description-div">
                <p className="description">View Our Available Games Below</p>

                <p className="description">Play online with friends or join the open queue</p>
            </div>
           
            <div className="game-collection">
                
                
                <button className="game" onClick={()=> navigate('/game/connect-four')}>
                    <img src={AppDisplay} alt="Description of the image"/>
                </button>
            </div>
            
            
        </div>
    )
}

export default Home;