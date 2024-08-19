import React, {  useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import AxisArcade from "../../img/Axis-Arcade-Title.png"

const SignUp =()=>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate(); 

    const validatePassword  = ()=>{
        const hasNumber = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const isLongEnough = password.length >= 8;
        return hasNumber && hasUpperCase && isLongEnough;
    };

    const handleSignUp = async(event) =>{
        event.preventDefault();

        if(!validatePassword()){
            setMsg("Password must be 8 characters long, contain a number, and contain an uppercase letter ")
            return;
        }

        if(email.indexOf('@')<0){
            setMsg("Enter valid email")
            return;
        }
        if(password !== verifyPassword || verifyEmail !== email){
            setMsg("content does not match")
            return;
        }
        try{
            localStorage.clear()
            const obj ={
                username: username,
                password: password, 
                email: email
            }
            console.log(obj)
            const response = await api.post("/api/v1/auth/signup", obj)

            if(response.status == 200){
                navigate("/login");
            }
        }catch(e){
            setMsg("username or email is in use")
        }



    }

    return (
        <div className='login-entry'>
        <img className="axis-arcade"src={AxisArcade}></img>
        <form onSubmit={handleSignUp} className='login-form'>
            <div className="label">
                <label htmlFor="username">Username:</label>
            </div>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => {setUsername(event.target.value)}}
                placeholder="Username"
                className='username-input'
                required
            />
            <div className="label">
                <label htmlFor="password">Password:</label>
            </div>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
                placeholder="Password"
                className='password-input'
                required
            />
             <div className="label">
                <label htmlFor="verify-password">Verify Password:</label>
            </div>
            <input
                id="verify-password"
                type="password"
                value={verifyPassword}
                onChange={(event) => {setVerifyPassword(event.target.value)}}
                placeholder="Verify Password"
                className='password-input'
                required
            />

            <div className="label">
                <label htmlFor="email">Email:</label>
            </div>
            <input
                id="email"
                type="text"
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
                placeholder="Email"
                className='username-input'
                required
            />

            <div className="label">
                <label htmlFor="verify-email">Verify Email:</label>
            </div>  
            <input
                id="verify-email"
                type="text"
                value={verifyEmail}
                onChange={(event) => {setVerifyEmail(event.target.value)}}
                placeholder="Verify Email"
                className='username-input'
                required
            />      
            <p>{msg}</p>
            <button type="submit" className='login-button'>Sign Up</button>
            
        </form>


        
    </div>
    )
}

export default SignUp; 