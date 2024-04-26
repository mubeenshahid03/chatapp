import React, { useContext, useEffect, useRef, useState } from "react";
import Profilecard from "./Profilecard";
import Message from "./Message";
import Spinner from "./Spinner"
import chatContext from "../context/chatContext";
function Messages() {
  const context=useContext(chatContext)
  const {selectedConv,spin,getAllMessages,message,setmessage,addMessage,messages,user}=context
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    
    <div className="h-full w-full ">
     {spin? <Spinner /> : (   
      <>
      {!localStorage.getItem("selectedConvId")?  (<div>No message to show</div> ): (
  
  <div className="h-screen  w-full">
    {/* header */}
    <div className="h-[10%] w-full bg-[#f5f5f5] rounded-md p-4 box-border flex items-center justify-between">
      <Profilecard name={selectedConv.name? selectedConv.name : localStorage.getItem("selectedConvName") } email={selectedConv.email? selectedConv.email :localStorage.getItem("selectedConvEmail")}  />
      
      
    </div>
    {/* main */}
    <div className="h-[80%] w-full overflow-y-scroll">
      {!messages? (<div>no message</div>) :(
      <div className="px-10 py-14">
        {console.log("state array",messages)}
        {messages.map((msg,key)=>{

       return  <Message
       bg={msg.senderId === user._id ? "bg-[#6366f0]" : "bg-[#f5f5f5]"}
       text={msg.senderId === user._id ? "white" : "black"}
       position={msg.senderId === user._id ? "ml-auto" : "mr-auto"}
       key={key}
       content={msg.message}
     />
      })}
      <div ref={messagesEndRef}></div>
        {/* <Message bg="bg-[#f5f5f5]" text="black" position="mr-auto" /> */}
        {/* Add more Message components here */}
      </div>
      )}
    </div>
    {/* footer */}
    <hr />
    <div className="h-[10%] w-full flex items-center justify-center ">
      <div className="h-[25px] w-[70%] flex items-center justify-between">
        <div className="w-[90%] h-10">
          <input
            placeholder="Message"
            id="email"
            type="email"
            name="email"
            required="true"
            value={message}
            autoComplete="off"
            onChange={(e)=>{setmessage(e.target.value)}}
            className="w-full h-full px-3 py-2 bg-[#f5f5f5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
          />
        </div>
        <button className="rounded-full shadow-lg bg-[#f5f5f5] p-2"onClick={addMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>

    </div>
    )}
    </>
    )}
  


    </div>
  );
}

export default Messages;
