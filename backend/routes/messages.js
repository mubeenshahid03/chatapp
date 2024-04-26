const express=require("express")
const Message = require("../model/Message")
const router =express.Router()

router.get('/getUserMessages/:id',async(request,response)=>{
    const convId=request.params.id
    if(!convId){
        return response.status(401).json({error:"id not received"})
    }
    const messages= await Message.find({conversationId:convId})
    if(!messages){
        return response.status(501).json({error:"message could not extracteed from messages table"})
    }
    response.send({messages})
})



router.post('/addmessage', async(request,response)=>{
    const{conversationId,message,senderId}=request.body
    if(!conversationId||!message||!senderId){
        return response.status(401).json({error:"complete data not received"})
    }
    
    const savedMessage=await Message.create({conversationId,message,senderId,date: new Date(Date.now())})
    if(!savedMessage){
        response.status(501).json({"error":"message not saved"})
    }
    response.send(savedMessage)
})

module.exports=router