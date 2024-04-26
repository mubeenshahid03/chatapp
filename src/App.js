
import './App.css';

import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './Components/Home';
import React, { useEffect, useState } from 'react';
import ChatState from "./context/ChatPk"
import Spinner from './Components/Spinner';
import { useContext } from 'react';
import chatContext from './context/chatContext';
import {io} from "socket.io-client"

function App() {
  const context=useContext(chatContext)
  
  const [tests, settests] = useState([])
  const{user,socket,
    setSocket,setmessages}=context
  const navigate=useNavigate()

useEffect(() => {
 // handleAuth()
}, [])

  const handleAuth =()=>{
    const authenticatedUser=localStorage.getItem("jwtoken")
    if(!authenticatedUser){
     return navigate('/signin')
    }
  }
  



  return (
    <>

  
<ChatState>
<Routes>
  <Route exact path="/signin" element={<Signin />}  />
  <Route exact path="/signup" element={<Signup />}  />
  {localStorage.getItem("jwtoken")? 
  (<Route exact path="/" element={<Home />}  />):
  (<React.Fragment>Please login again</React.Fragment>)
}
</Routes>
</ChatState>
  
    </>
  );
}

export default App;
