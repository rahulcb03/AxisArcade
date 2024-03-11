import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from "@fortawesome/free-solid-svg-icons"; 
import api from "../../api/axiosConfig";
import Modal from "./modal/Modal";
import AppDisplay from "../../img/app-display.png"

import "./Home.css"
import { useNavigate } from "react-router-dom";

const Home = () =>{

    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);

    const navigate = useNavigate(); 

    const openModal = () => { setIsFriendModalOpen(true)}
    const closeModal = () => { setIsFriendModalOpen(false)}

    return(
        <div className="home">
            <div className="header">
                <FontAwesomeIcon icon={faGamepad} size="2x"/>
                <button onClick={openModal}>Friends</button>
            </div>

            <Modal isOpen={isFriendModalOpen} onClose={closeModal}/>

           
            <div className="game-collection">
                

                <button className="game" onClick={()=> navigate('/game/connect-four')}>
                    <img src={AppDisplay} alt="Description of the image"/>
                </button>
            </div>
            
            
        </div>
    )
}

export default Home;