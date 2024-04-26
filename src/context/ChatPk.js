// ChatPk.js
import { useEffect, useState } from "react";
import chatContext from "./chatContext";
import {io} from "socket.io-client"

const ChatState = (props) => {



  const [spin, setSpin] = useState(false);
  const [messages, setmessages] = useState([])
  const [socket, setSocket] = useState()
  const [activeUsers, setactiveUsers] = useState([])
  const [message, setmessage] = useState()
  const [selectedConv, setselectedConv] = useState(
    {
  }
  )
  const [registeredUsers, setregisteredUsers] = useState([])
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [conversations, setconversations] = useState([]);
  const [convPpl, setconvPpl] = useState([]);
// here confi of socket.io
// useEffect(() => {
//   setSocket(io('http://localhost:8080'))
  
//   }, [])
useEffect(() => {
  const newSocket = io('http://localhost:8080');
  setSocket(newSocket);

  // Wait for the socket to connect before emitting 'addUser'
  newSocket.on('connect', () => {
    newSocket.emit('addUser', user?._id);
  });

  return () => {
    newSocket.disconnect();
  };
}, []);




  useEffect(() => {
  //  console.log("pk",user._id)
  socket?.on('getUsers',(users)=>{
    console.log("users is",users)
    setactiveUsers(users)

  })

  // for getting message
  socket?.on("getMessage",({conversationId,message,senderId})=>{
    console.log("message received",conversationId,message,senderId)
    if(conversationId && message && senderId){
      let obj={
        conversationId:conversationId,
        message:message,
        senderId:senderId
      }
      setmessages(prevMessages => [...prevMessages,obj]);

    }
  })
  }, [socket])
  

  // Or use a conditional statement to handle the case when user is null
  if (user) {
    console.log("empty",user)
  }


  const handleconv = (conversations) => {
    const result = [];
    conversations.map((conversation)=>{ 
      const person = conversation.personA._id !== user._id ? conversation.personA : conversation.personB;
      if (person._id !== user._id) {
        result.push({
          conversationId: conversation._id,
          person: person
        });
      }
    })
    setconvPpl(result)

    // filter function store objs in another array when its return boolean true
    //let nums=number.filter((num)=>    return num.a====num.b)
    //if num.a and num.b are equalls than its save num obj in nums
  };

  const getUserConversation = async () => {
    setSpin(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user._id;
    if(userid){
    try {
      const response = await fetch(
        `http://localhost:7000/getUserConversation/${userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      // console.log(json);
      setconversations(json.conversations);
      handleconv(json.conversations);
     
      setSpin(false);
    } catch (error) {
      console.log("error in frontend getconversations" + error);
    }
  }
  else{
    console.log("user id not found for accessing user conversations")
  }
  };

  //for adding conversations
  const addConversation = async () => {
   let receiver= JSON.parse(localStorage.getItem("convUser"))
if(user&&receiver){
    try {
      setSpin(true)
      const response = await fetch(
        "http://localhost:7000/addconversation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderId: user._id,receiverId:receiver._id }),
        }
      );
      let json = await response.json();
      // console.log("from frontend ok ok o k");
       console.log("imp",response);
       if(response.status===400){
        alert("This conversation already existed")
       }
      getUserConversation()
setSpin(false)
      
    } catch (error) {
      console.log("error in frontend add conversation" + error);
    }
  }
  else{
    console.log("user id and receiver id not found in adding conversation")
  }

  };


  const getAllUsers = async () => {
    setSpin(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user._id;
    try {
      const response = await fetch(
        `http://localhost:7000/getUsers/${userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      // console.log(json);
      setregisteredUsers(json)
      setSpin(false);
    } catch (error) {
      console.log("error in frontend get all users" + error);
    }
  };

  // request to fetch all messages of particular conversation

  const getAllMessages = async () => {
    setSpin(true);
    const convId = localStorage.getItem("selectedConvId");
    if(convId){
     
    console.log("here",convId)
    
    try {
      const response = await fetch(
        `http://localhost:7000/getUserMessages/${convId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let json = await response.json();
      console.log("yyyy",json.messages);
    setmessages(json.messages)
      setSpin(false);
    } catch (error) {
      console.log("error in frontend get all users messages" + error);
    }
    
  }
  
  };

  const addMessage = async (e) => {
    e.preventDefault();
    const conversationId = localStorage.getItem("selectedConvId");
    const senderId=user._id
    //for socket 
    const receiverId=localStorage.getItem("selectedConvUserId")

    
    
    if(conversationId && senderId && message){

      console.log("obj",conversationId,senderId,message,receiverId)
      if(conversationId && senderId && message && receiverId){
     socket?.emit('sendMessage',{senderId,receiverId,message,conversationId})
      
      }
      else{
        console.log("error in add message socketio context api")
      }
     try {
       
       const response = await fetch(
         "http://localhost:7000/addmessage",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ senderId:senderId,conversationId:conversationId,message:message }),
         }
       );
       let json = await response.json();
       console.log("from frontend ok ok o k");
       console.log(json);
       setmessage("")

       
     } catch (error) {
       console.log("error in frontend add message" + error);
     }
     
    }
    else{
      return alert ("pleaase enter complete data before addding message")
    }
   };

  return (
    <chatContext.Provider
      value={{
        spin,
        setSpin,
        user,
        setuser,
        getUserConversation,
        conversations,
        setconversations,
        convPpl,
        getAllUsers,
        registeredUsers,
        addConversation,
        selectedConv,
        setselectedConv,
        getAllMessages,
        addMessage,
        message,
        setmessage,
        messages,
        socket,
        setSocket,
        activeUsers,
        setactiveUsers
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
};

export default ChatState;
