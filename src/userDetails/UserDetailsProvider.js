import React, { createContext, useEffect, useState} from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null, null);

export const UserProvider = ({ isAuth, children}) =>{
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    const navigate = useNavigate(); 

    useEffect(()=>{
        if(!(localStorage.getItem("token")||isAuth)){
            return 
        }

        const fetchUserDetails = async()=>{
            try {
                

                const response = await api.get("api/v1/user")

                if(response.status === 200){
                    setUsername(response.data.username)
                    setUserId(response.data.userId)
                }
            } catch (error) {
                navigate("/login")
            }
        }

        fetchUserDetails()


    },[isAuth])


    return(
        <UserContext.Provider value={[username, userId]}>
            {children}
        </UserContext.Provider>
    )
}

