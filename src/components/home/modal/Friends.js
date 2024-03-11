import React, { useEffect, useState } from "react"
import api from "../../../api/axiosConfig"
import "./Friends.css"

const Friends = () =>{
    const[friends, setFriends] = useState([])

    useEffect(()=>{
        const getFriends = async () =>{
            try {

                const response = await api.get("/api/v1/friend");
                
                if(response.status === 200){
                    setFriends(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    },[])

    return (
        <div>
            <div className="friends-list">
                {friends && friends.map((friend, index) => (
                    <div key={index} className="friend-box">
                        {friend.username}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Friends; 