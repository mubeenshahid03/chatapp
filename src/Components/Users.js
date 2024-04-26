import React, { useContext } from 'react'
import Profilecard from './Profilecard'
import chatContext from '../context/chatContext'
import { useEffect } from 'react'
import Spinner from './Spinner'
import { LogoutOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom'
function Users() {
  const navigate=useNavigate()
    const context=useContext(chatContext)
    const{getUserConversation,setselectedConv,spin,convPpl,user,setSpin,getAllMessages,activeUsers}=context
    
useEffect(() => {
    getUserConversation()
}, [])

const handleMessage=(msgreceiver)=>{
  setSpin(true)
  localStorage.setItem("selectedConvUserId",msgreceiver.person._id)
  localStorage.setItem("selectedConvName",msgreceiver.person.name)
  localStorage.setItem("selectedConvEmail",msgreceiver.person.email)
  localStorage.setItem("selectedConvId",msgreceiver.conversationId)
  let obj={
    _id:msgreceiver.person._id,
    name:msgreceiver.person.name,
    email:msgreceiver.person.email,
    convId:msgreceiver.conversationId

  }
  setselectedConv(obj)
  getAllMessages()
  setSpin(false)
}

const  handleLogout=()=>{
  localStorage.clear()
  navigate('/signin')
}


return (
    <>
      {spin ? <Spinner /> : (
        <>
          {/* own user section */}
          <div className='w-full h-auto px-[20px] flex box-border '>
            <Profilecard name={user.name} email={user.email}  />
         <LogoutOutlined style={{fontSize:"22px"}} onClick={handleLogout}/>

          </div>
          <hr className='mt-4' />
          {/* contacts lists */}
          <div className='h-full w-full  overflow-scroll px-[20px] py-4 '>
            <p class="text-[14px] font-[600] text-[#6366f0] my-3">
              Messages
            </p>
            {convPpl.length === 0 ? (
  <div>no conversations</div>
) : (
  convPpl.map((user) => (
    <div onClick={()=>handleMessage(user)}>
    <React.Fragment key={user.person.conversationId}>
      {console.log("consppl",convPpl)}
      <Profilecard name={user.person.name} email={user.person.email} />
      {console.log("activeusers",activeUsers)}
      {console.log("convppl",convPpl)}
      {activeUsers.map((activeUser) => (
    activeUser.userId === user.person._id && (
      <div key={activeUser.userId} style={{ color: 'green' }}>Online</div>
    )
  ))}
      <hr className='mt-[10px]' />
    </React.Fragment>
    </div>
  ))
)}
          </div>
        </>
      )}
    </>
  );
  
}

export default Users
