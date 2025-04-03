const { chatIA } = require("../utils/chatIA");
const Conversation = require("../model/conversation.js");

const generateConversation = async (request, response) => {
  try {
    const { conversation_id, message } = request?.body;
    const messages = [{ role: "user", message }];

    let conversation 
    if (!conversation_id) {
      const reponseMenssage = await chatIA(message);

      messages.push({ role: "bot", message: reponseMenssage });

      const newConversation = new Conversation({
        message: messages,
      });

       conversation = await Conversation.insertOne(newConversation);
       conversation = conversation.toJSON();

    } else {
      conversation = await Conversation.findOne({ conversation_id });
      
      if (!conversation) throw new Error("conversation not found");
      
      const reponseMenssage = await chatIA(message, conversation?.message);
     
      messages.push({ role: "bot", message: reponseMenssage });
      
      await Conversation.updateOne(
        { conversation_id },  
        { $push: { message: messages } }
      )

      conversation = await Conversation.findOne({ conversation_id }, { messages: { $slice: -5 } });
      
    }

    response.send(conversation);

  } catch (error) {
    response.status(403);
    response.send({ error: error.message });
  }
};

module.exports = {
  generateConversation,
};
