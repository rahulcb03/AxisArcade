import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import AxisArcade from "../../img/Axis-Arcade-Title.png"

const ResetPassword = ()=>{
    const location = useLocation();
    const navigate = useNavigate(); 

    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")
    const [msg, setMsg] = useState("")
    // Function to parse query parameters
    function useQuery() {
      return new URLSearchParams(location.search);
    }
  
    const query = useQuery();
    const token = query.get('token'); // Get the token value from the URL

    const validatePassword  = ()=>{
        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const isLongEnough = password.length >= 8;
        return hasNumber && hasUpperCase && isLongEnough;
    };

    const handleResetPassword = async (event)=>{
        event.preventDefault()

        if(!validatePassword()){
            setMsg("Password must be 8 characters long, contain a number, and contain an uppercase letter ")
            return;
        }
        if(password!==verifyPassword){   
            setMsg("Passwords do not match")
            return
        }

        try {
            localStorage.clear()
            const response = await api.post("api/v1/auth/reset-password", {token:token, newPassword:password})

            if(response.status === 200){
                navigate("/login")
            }
        } catch (error) {
            setMsg("Error setting new password")
        }
           
    }

    return(
        <div className='login-entry'>
            
            <img className="axis-arcade"src={AxisArcade}></img>
            <form onSubmit={handleResetPassword} className='login-form'>
                <p> Enter your new password</p>
                <input
                    type="password"
                    value={password}
                    onChange={(event)=>{setPassword(event.target.value)}}
                    placeholder="Password"
                    className='username-input'
                    required
                />
                <input
                    type="password"
                    value={verifyPassword}
                    onChange={(event)=>{setVerifyPassword(event.target.value)}}
                    placeholder="Verify Password"
                    className='username-input'
                    required
                />
                <p>{msg}</p>
                <button type="submit" className='login-button'>Submit</button>
               
            </form>
        </div>
    )
}

export default ResetPassword