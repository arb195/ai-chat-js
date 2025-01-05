import { sendToOpenAi } from "./src/sendChatWithChain.js";
import {
  getChat,
  saveChat,
  getAllChats,
  deleteChat,
} from "./src/fileHandller.js";
import express from "express";
import cors from "cors";

const app = express();
const port = 3003;
app.use(cors());
app.use(express.json());
// Routes
app.get("/", (req, res) => {
  res.send("<h1>I think you are lost!</h1>");
});

app.post("/question", async (req, res) => {
  let params = req.body;
    if(!params || params == undefined || Object.keys(params).length == 0){
        params = req.query
    }
    
    params = params.params
    
  const responseAi = await sendToOpenAi(
    params.question,
    getChat(params.userId, params.chatId)
  );

  const chatObj = {
    send: params.question,
    response: responseAi,
  };

  await saveChat(chatObj, params.userId, params.chatId);

  const allChats = getAllChats(params.userId);
  res.send(allChats);
});

app.post("/alluserChat", (req, res) => {
    let userId = req.body.userId;
    if(!userId || userId == undefined){
        userId = req.query.userId
    }
  const allChats = getAllChats(userId);

  res.send(allChats);
});

app.post("/deleteChat", (req, res) => {
  let params = req.body;
    if(!params || params == undefined || Object.keys(params).length == 0){
        params = req.query
    }
    
    params = params.params

  const result = deleteChat(params.userId, params.chatId);

  const allChats = getAllChats(params.userId);
  if (allChats) {
    res.send(allChats);
  }
});

// listener
app.listen(port, () => {
  console.log(`Ai app listening on port ${port}`);
});
