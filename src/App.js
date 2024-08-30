
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/login/Login';
import Home from './components/home/Home';
import GameStart from './components/games/GameStart';
import ConnectFour from './components/games/connectFour/ConnectFour';
import ConnectFourTitle from './img/connect-four-title.png';
import BattleshipTitle from './img/battleship-title.png';
import { WebSocketContext, WebSocketProvider } from './webSocket/WebSocketProvider';
import { UserContext, UserProvider } from './userDetails/UserDetailsProvider';
import { useContext, useState } from 'react';
import SignUp from './components/signup/SignUp';
import ForgotPassword from './components/resetPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import Modal from './components/home/modal/Modal';
import InviteNotification from "./components/inviteNotification/InviteNotification"
import Battleship from './components/games/battleship/Battleship';

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

              <Route path='/game/connect-four' element={<GameStart img={ConnectFourTitle} gameName={"Connect Four"} urlNav={"/game/connect-four/"}/>}></Route>
              <Route path='/game/connect-four/:gameId' element={<ConnectFour/>}></Route>

              <Route path='/game/battleship' element={<GameStart img={BattleshipTitle} gameName={"Battleship"} urlNav={"/game/battleship/"}/>}></Route>
              <Route path='/game/battleship/:gameId' element={<Battleship/>}></Route>

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
