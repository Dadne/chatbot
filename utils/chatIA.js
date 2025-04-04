const { GoogleGenerativeAI } = require("@google/generative-ai");

const TOKEN_IA = process.env.TOKEN_IA;
const MODEL_IA = process.env.MODEL_IA;

const genAI = new GoogleGenerativeAI(TOKEN_IA);

async function chatIA(msg, historyMessage) {
  const model = genAI.getGenerativeModel({ model: MODEL_IA });

  const history = historyMessage 
    ? transformMessages(historyMessage) 
    : [{
        role: "user",
        parts: [{ 
          text: process.env.PROMT_IA
        }],
      }];

  const chat = model.startChat({ history });

  const result = await chat.sendMessage(msg);
  return result?.response?.text();
}


function transformMessages(messages) {
  return messages.map(({ role, message }) => ({
    role: role === "bot" ? "model" : role,
    parts: [{ text: message }],
  }));
}

module.exports = { chatIA };
