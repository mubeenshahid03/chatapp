import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import chatContext from '../context/chatContext'

function Signup() {
  const context=useContext(chatContext)
  const{user,setuser,setisSpin}=context
  const navigate=useNavigate()
const [formData, setformData] = useState({
  firstname:'',
  email:'',
  password:''
})

const handleChange=(e)=>{
const{name,value}=e.target
setformData((prevData)=>({
  ...prevData,
  [name]:value,
}))

}


  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(formData)
    const {firstname,email,password}=formData
    try {
      const response = await fetch(
       "http://localhost:7000/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "auth-token":localStorage.getItem("token")
          },
          body:JSON.stringify({firstname,email,password})
        }
      );
      const json = await response.json();
      console.log(json.newUser)
      if(json.token && json.newUser ){
      localStorage.setItem("jwtoken",json.token)
      localStorage.setItem("user", JSON.stringify(json.newUser));
      navigate('/')
  
      }
      else{
        alert("try again with correct credentials")
      }
    } catch (error) {
      console.log("error in frontend api request to add user" + error);
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
    <h1 className='text-center text-[25px] font-bold'>Signup</h1>
    <p className='text-center text-[15px] font-md '>Signup now to get started</p>

    <form  action='submit' onSubmit={handleSubmit}>
                
                    <div class="form-item w-full  md:p-2">
                        <label for="firstname" class="block text-sm   text-gray-800 pt-3 pb-1 md:text-[13px]">Name</label>
                        <input autoComplete='off' id="firstname" onChange={handleChange} value={formData.firstname} name='firstname' required='true' type="text" class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />
                    </div>
                    <div class="form-item w-full  md:p-2">
                        <label for="email" class="block text-sm  text-gray-800 pt-3 pb-1 md:text-[13px]">Email</label>
                        <input autoComplete='off' id="email" onChange={handleChange} value={formData.email} type="email"name='email' required='true' class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />
                    </div>
                    <div class="form-item w-full  md:p-2">
                        <label for="password" class="block text-sm  text-gray-800 pt-3 pb-1 md:text-[13px]">Password</label>
                        <input autoComplete='off' id="password" onChange={handleChange} value={formData.password} type="password" name='password' required='true' class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]" />
                    </div>
                    
                <div class="w-full mt-4 md:p-2">
                    <button type="submit" class="w-full h-10 bg-[#6366f1] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1]">Let's talk</button>
                </div >
                <p class="text-[6b7280] text-sm mt-4 md:mx-2 md:text-[13px]">Already have account? <a href="/signin" class="font-semibold  text-[#6366f1]">Login</a></p>
            </form>
    </div>
    </div>
    </>
  )
}

export default Signup