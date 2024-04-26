import React, { useContext, useEffect } from "react";
import Profilecard from "./Profilecard";
import Users from "./Users";
import Messages from "./Messages";
import Spinner from "./Spinner";
import chatContext from "../context/chatContext";

function Home() {
  const context = useContext(chatContext);
  const { getAllUsers, registeredUsers, spin,addConversation ,getAllMessages,setuser,user} = context;

  useEffect(() => {
   setuser( JSON.parse(localStorage.getItem("user"))  )
    getAllUsers();
    getAllMessages();
  }, []);

  return (
    <>
    
      <div className="w-full h-screen fixed  flex">
        <div className="w-[25%] bg-[#f5f5f5] ">
          <Users />
        </div>

        {/* messages section */}

        <div className="w-[50%]">
          <Messages />
        </div>

        {/* for all registered users */}
        <div className="w-[25%] h-full   overflow-scroll px-[20px] py-4  bg-[#f5f5f5] ">
          <p class="text-[14px] font-[600] text-[#6366f0] my-3">Users</p>

          {spin ? (
            <Spinner />
          ) : registeredUsers.length === 0 ? (
            <div>There is no user</div>
          ) : (
             registeredUsers.map((user) => (
              <div  onClick={() => {
              localStorage.setItem("convUser", JSON.stringify(user));
              addConversation()
              }}>
              <Profilecard
                key={user._id}
                name={user.name}
                email={user.email}
                
              />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
