const mongoose =require("mongoose")
const conversationSchema = new mongoose.Schema({    
    personA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Conversation= mongoose.model('Conversation',conversationSchema,'conversations')
module.exports=Conversation