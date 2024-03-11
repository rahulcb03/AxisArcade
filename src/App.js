
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/home' element={<Home/>}></Route>

          </Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
    
      
    </div>
  );
}

export default App;
