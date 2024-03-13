import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import SideBar from "./components/SideBar"
import LogIn from './components/login';
import Home from './components/home';
import OnlineShop from './components/onlineShop';
import Stores from './components/offlineShop';
import Refurbished from './components/refurbished';
import SignIn from './components/sighin';
import Profile from './components/profile';

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <Router>
    
       <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
       <Routes>
         <Route path="/*" element={<Home sidebarToggle={sidebarToggle} />}/>
         <Route path="/online" element={<OnlineShop sidebarToggle={sidebarToggle}/>}/>
         <Route path="/stores" element={<Stores sidebarToggle={sidebarToggle}/>}/>
         <Route path="/refurbished" element={<Refurbished sidebarToggle={sidebarToggle}/>}/>
         <Route path="/signin" element={<SignIn/>}/>
         <Route path="/login" element={<LogIn/>}/>
         <Route path="/profile" element={<Profile showProfile={true}/>}/>
       </Routes>
     
    </Router>
  )
}

export default App
