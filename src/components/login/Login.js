import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import {useState} from 'react';
import AxisArcade from "../../img/Axis-Arcade-Title.png"

import "./Login.css";




const Login = ({setAuth}) => {

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 

    const handleUsernameChange = (event) =>{
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    };

    

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            localStorage.clear();
            setAuth(false)
            const response = await api.post(`/api/v1/auth/signin`, {username:username, password:password}); 
            if(response.status==200){
                 
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                setAuth(true)
                navigate("/home")
            }
        } catch (error) {
            setMessage("Username or Password is incorrect");
        }

        setUsername(''); 
        setPassword('');
    };

    
    return (
        <div className='login-entry'>
            <img className="axis-arcade"src={AxisArcade}></img>
            
            <form onSubmit={handleLogin} className='login-form'>
                
                <div className='label'>
                    <label htmlFor="username" >Username:</label>
                </div>
                
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className='username-input'
                    required
                />
                <div className='label'>
                    <label htmlFor="password" >Password:</label>
                </div>
                
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className='password-input'
                    required
                />
                <p>{message}</p>
                <button type="login" className='login-button'>Log in</button>
                <div className="login-links">
                    <a href="/forgot-password">Forgot Password</a>
                    
                    <a href="/signup">Sign Up</a>
                </div>
            </form>


            
        </div>
    )
    
}
export default Login;