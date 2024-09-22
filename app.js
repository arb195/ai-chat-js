import { sendToOpenAi } from "./src/sendChatWithChain.js";
import { getChat, saveChat, getAllChats } from "./src/fileHandller.js";
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
  const { params } = req.body;

  const responseAi = await sendToOpenAi(
    params.question,
    getChat(params.userId, params.chatId)
  );

  const chatObj = {
    send: params.question,
    response: responseAi,
  };

  saveChat(chatObj, params.userId, params.chatId);

  res.send(responseAi);
});

app.post("/alluserChat", (req, res) => {
  const allChats = getAllChats(req.body.userId);

  res.send(allChats);
});

// listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
