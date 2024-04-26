const express = require('express');
const Conversation = require('../model/Conversation');
const router = express.Router();

router.get('/getUserConversation/:id', async (request, response) => {
  const userId = request.params.id;
  if (!userId) {
    return response.status(401).json({ "message": "userId not entered in params" });
  }

  try {
    const conversations = await Conversation.find({
      members: {
        $elemMatch: {
          $or: [
            { personA: userId },
            { personB: userId }
          ]
        }
      }
    }).populate({
      path: 'members',
      populate: {
        path: 'personA personB'
      }
    });

    if (!conversations) {
      return response.status(404).json({ error: "No conversations found" });
    }

    response.send({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    response.status(500).json({ error: "Could not fetch conversations" });
  }
});



router.post('/addconversation', async(request, response) => {

  // Create a new conversation
    const {senderId,receiverId}=request.body
    if(!senderId||!receiverId){
        return response.status(401).json({message:"senderId and receiverId missing"})
    }
    const conv=new Conversation({members:[{personA:senderId,personB:receiverId}]})
const savedConv= await conv.save()
    if(!savedConv){
        response.status(400).json({error:"conversation not added"})
    }
    response.send({message:"converstaion saved successfully!",savedConv})
});

module.exports = router;
