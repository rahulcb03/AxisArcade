import React, { useState, useEffect } from "react"
import api from "../../../api/axiosConfig"

const FriendRequests = ()=>{

    const [friendRequests, setFriendRequets] = useState([])

    useEffect(()=>{
        const getFriends = async () =>{
            try {

                const response = await api.get("/api/v1/friend-request");
                
                if(response.status === 200){
                    setFriendRequets(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    },[])

    const acceptFriendRequest = async(friendRequest)=>{
        try {
            console.log(friendRequest)
            const response = await api.post(`/api/v1/friend-request/${friendRequest.id}/accept`);
            
            if(response.status === 200){
                console.log("accepted")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div className="friends-list">
            {friendRequests && friendRequests.map((friend, index) => (
                <div key={index} className="friend-box">
                    {friend.username}
                    <button className="accept-friend-request-button" onClick={()=>acceptFriendRequest(friend)}>accept</button>
                </div>
                
            ))}
        </div>
    
    )
}

export default FriendRequests