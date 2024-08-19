
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/login/Login';
import Home from './components/home/Home';
import ConnectFourStart from './components/connectFour/ConnectFourStart';
import ConnectFour from './components/connectFour/ConnectFour';
import { WebSocketContext, WebSocketProvider } from './webSocket/WebSocketProvider';
import { UserContext, UserProvider } from './userDetails/UserDetailsProvider';
import { useContext, useState } from 'react';
import SignUp from './components/signup/SignUp';
import ForgotPassword from './components/resetPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import Modal from './components/home/modal/Modal';
import InviteNotification from "./components/inviteNotification/InviteNotification"

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("token")? true : false)
  const [invite, setInvite] = useState(null)



  return (
    <UserProvider isAuth={isAuth}>
    <WebSocketProvider setInvite={setInvite}isAuth={isAuth}>
      <div className="App">
          <InviteNotification invite={invite} setInvite={setInvite}></InviteNotification>
          <Routes>
            <Route element={<ProtectedRoutes/>}>
              
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/game/connect-four' element={<ConnectFourStart/>}></Route>
              <Route path='/game/connect-four/:gameId' element={<ConnectFour/>}></Route>

            </Route>
            <Route path='/login' element={<Login setAuth={setIsAuth}/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/reset-password" element={<ResetPassword />} />

          </Routes>
      
        
      </div>
    </WebSocketProvider>
    </UserProvider>
  );
}

export default App;
