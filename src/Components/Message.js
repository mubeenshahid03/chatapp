import React from 'react'

function Message(props) {
  return (
    <>
    
    <div className={` h-auto max-w-[60%] my-4 ${props.bg} text-${props.text}  rounded-lg text-sm p-4  ${props.position}   `}>
       {props.content}
     </div> 

    
    </>
  )
}

export default Message
