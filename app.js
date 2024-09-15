import { sendToOpenAi } from "./src/sendChatWithChain.js";
import { getChat, saveChat } from "./src/fileHandller.js";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>I think you are lost!</h1>");
});

app.get("/question", async (req, res) => {
  const params = req.query;

  const responseAi = await sendToOpenAi(
    params.ques,
    getChat(params.userId, params.chatId)
  );

  const chatObj = {
    send: params.ques,
    response: responseAi,
  };
  saveChat(chatObj, params.userId, params.chatId);

  res.send(responseAi);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const sendChat = "میلگرد چیست؟";

// const res = await sendToOpenAi(sendChat, getChat(2, 1));

// const chatObj = {
//   send: sendChat,
//   response: res,
// };
// saveChat(chatObj, 2, 2);
// console.log("====================================");
// console.log(res);
