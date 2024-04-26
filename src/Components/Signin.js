import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import chatContext from '../context/chatContext';
import {io} from "socket.io-client"

function Signin() {
  
    
const context=useContext(chatContext)
const{user,setuser,setisSpin,socket,setSocket}=context
useEffect(() => {
    
  setSocket(io('http://localhost:8080'))
  
  }, [])
  const navigate=useNavigate()
const [formData, setformData] = useState({
  email:"",
  password:""
})

const  handleChange=(e)=>{
  const {name,value}=e.target;
  setformData((prevData)=>({
      ...prevData,
      [name]:value,
  }))

}

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(formData)
    
    const {email,password}=formData
    try {
    
      const response = await fetch(
       "http://localhost:7000/api/users/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
          },
          body:JSON.stringify({email,password})
        }
      );
      const json = await response.json();
      console.log("ok")
      
      console.log(json.registeredUser)
      if(json.token && json.registeredUser && socket ){
      localStorage.setItem("jwtoken",json.token)
      localStorage.setItem("user", JSON.stringify(json.registeredUser));
      
      navigate('/')
      }
      else{
        return alert("please login with correct credentials")
      }
    } catch (error) {
      console.log("error in frontend api request to login user" + error);
    }
  }
  const handleAuth =()=>{
    const authenticatedUser=localStorage.getItem("jwtoken")
    if(authenticatedUser){
     return navigate('/')
    }
  }
  useEffect(() => {
  // handleAuth()
  }, [])
  
  
  
    return (
    <>

    <div className='bg-blue-300   w-full h-screen absolute'>
    <div className='relative w-[90%] h-auto bg-white m-auto mt-10 md:w-[80%] lg:w-[50%] xl:w-[35%] py-[20px] px-[10px]  md:py-[40px] md:px=[20px] shadow-lg' >
    <h1 className='text-center text-[25px] font-bold'>Signin</h1>
    <p className='text-center text-[15px] font-md '>Signin now to get started</p>

    <form  action='submit' onSubmit={handleSubmit}>
                
                
                    <div class="form-item w-full  md:p-2">
                        <label for="email" class="block text-sm  text-gray-800 pt-3 pb-1 md:text-[13px]">Email</label>
                        <input id="email" autoComplete='off'  type="email"name='email' value={formData.email} onChange={handleChange} required='true' class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />
                    </div>
                    <div class="form-item w-full  md:p-2">
                        <label for="password" class="block text-sm  text-gray-800 pt-3 pb-1 md:text-[13px]">Password</label>
                        <input id="password"  type="password" name='password' value={formData.password} onChange={handleChange} required='true' class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />
                    </div>
                    
                <div class="w-full mt-4 md:p-2">
                    <button type="submit" class="w-full h-10 bg-[#6366f1] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]">Let's talk</button>
                </div >
                <p class="text-[6b7280] text-sm mt-4 md:mx-2 md:text-[13px]">Don't have account? <a href="/signup" class="font-semibold  text-[#6366f1]">signup</a></p>
            </form>
    </div>
    </div>
    </>
  )
}

export default Signin