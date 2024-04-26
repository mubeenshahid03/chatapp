const express = require('express')
const mongoose=require("mongoose")
const app = express()
const port = 7000
const authRouter=require("./routes/auth")
// const messageRouter = require('./routes/messages');
// const conversationRouter = require('./routes/conversations');
var cors = require("cors");
app.use(cors());
app.use(express.json());
const Message = require("./model/Message")
const Conversation = require('./model/Conversation');
const connectToMongoose=require("./DB/db")
const User = require('./model/User')
const io=require('socket.io')(8080,
{
  cors:{
    origin:"http://localhost:3000"
  }
}
)
// middleware

// const fetchuser=require("./Middleware/fetchuser")
connectToMongoose()

let users=[]
// WebSocket.io
io.on('connection', (socket) => {
   console.log(`user connected with id ${socket.id}`);

  socket.on('addUser', (userId) => {
    let userExist = users.find(user => user.userId === userId);
    if (!userExist) {
      let user = {
        userId: userId,
        socketId: socket.id
      }
      users.push(user);
      io.emit('getUsers', users);
    }
  });

  socket.on('sendMessage',async({senderId,receiverId,message,conversationId})=>{
    console.log(users)
    console.log(senderId,receiverId,conversationId,message)  
    let receiver =users.find(user=> user.userId===receiverId)
    console.log("receiver",receiver)  
    let sender=await User.findOne({_id:senderId})
    if(receiver&&sender){
        io.to(receiver.socketId).emit('getMessage',{
          conversationId,
          message,
          senderId
        }
      );
      io.to(socket.id).emit('getMessage', {
        conversationId,
        message,
        senderId
      });
      }
  })

  

  // socket.on('sendMessage', ({ senderId, receiverId, conversationId, message }) => {
  //   console.log('Message received:', senderId, receiverId, conversationId, message);
  //   // Add logic to handle the message (e.g., save it to the database, broadcast it to other clients)
  // });
  
  

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
});





app.use('/api/users', authRouter);
// app.use('/api/conversations', conversationRouter);
// app.use('/api/messages', messageRouter);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// routes for messaging
app.get('/getUserMessages/:id',async(request,response)=>{
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



app.post('/addmessage', async(request,response)=>{
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

// routes for conversation

app.get('/getUserConversation/:id', async (request, response) => {
  const userId = request.params.id;
  if (!userId) {
    return response.status(401).json({ "message": "userId not entered in params" });
  }

  try {
    const conversations = await Conversation.find({
      $or: [
        { personA: userId },
        { personB: userId }
      ]
    }).populate('personA personB');
    
    if (!conversations) {
      return response.status(404).json({ error: "No conversations found" });
    }

    response.send({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    response.status(500).json({ error: "Could not fetch conversations" });
  }
});



app.post('/addconversation', async(request, response) => {

  // Create a new conversation
    const {senderId,receiverId}=request.body
    if(!senderId||!receiverId){
        return response.status(401).json({message:"senderId and receiverId missing"})
    }
    const existedConv = await Conversation.findOne({
      $and: [
        {
          $or: [
            { personA: senderId },
            { personB: senderId }
          ]
        },
        {
          $or: [
            { personA: receiverId },
            { personB: receiverId }
          ]
        }
      ]
    });
    if(existedConv){
     return response.status(400).json({error:"conversation already existed"})
    }
    const conv=new Conversation({personA:senderId,personB:receiverId})
const savedConv= await conv.save()
    if(!savedConv){
        response.status(400).json({error:"conversation not added"})
    }
    response.send({message:"converstaion saved successfully!",savedConv})
});

// get all users except the user that loginned

app.get("/getUsers/:id",async(request,response)=>{
const userId=request.params.id
if(!userId){
  return response.status(401).json({error:"user id not given in params"})
}
const users=await User.find({_id:{$ne:userId}})
if(!users){
  return response.status(401).json({error:"users not found"})
}
response.send(users)

})


