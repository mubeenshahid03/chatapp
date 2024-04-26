const mongoose=require("mongoose")
const messageSchema= new mongoose.Schema({

conversationId:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
},
message:{
    type:String,
    required:true,
},
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
},
date:{
type:Date,
}
})

const Message= mongoose.model('Message',messageSchema,'messages')
module.exports=Message