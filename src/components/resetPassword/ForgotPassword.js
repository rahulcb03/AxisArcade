import React, { useState } from "react";
import api from "../../api/axiosConfig";
import AxisArcade from "../../img/Axis-Arcade-Title.png"

const ForgotPassword = () =>{

    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")

    const handleResetPassword = async (event) =>{
        event.preventDefault()

        try{
            localStorage.clear()
            const response = await api.post("/api/v1/auth/request-password-reset", {email:email})

            if(response.status = 200){
                setMsg(`Please use the link sent to ${email} to reset your password`)
            }
        }catch(e){
            setMsg("email not found")
        }

        setEmail("")
    }

    return (
    <div className='login-entry'>
        
        <img className="axis-arcade"src={AxisArcade}></img>
        <form onSubmit={handleResetPassword} className='login-form'>
        <p> Enter your email in the below text box and a link will be sent where you can reset your password</p>
                <input
                    type="text"
                    value={email}
                    onChange={(event)=>{setEmail(event.target.value)}}
                    placeholder="Email"
                    className='username-input'
                    required
                />
                <p>{msg}</p>
                <button type="submit" className='login-button'>Send</button>
               
            </form>
    </div>
    
    )
}

export default ForgotPassword