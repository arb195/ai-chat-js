import fs from "fs";

function writeInFile(fileLocation, content, chatId) {
  const finalcontent = {
    id: String(chatId),
    title: Array.isArray(content) ? content[0].send : content.send,
    chat: content,
  };
  const JSONContent = JSON.stringify(finalcontent, null, 2);
  fs.writeFile(fileLocation, JSONContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("JSON file has been saved.");
    }
  });
}

export function saveChat(chat, userId, chatId) {
  if (userId == undefined || chatId == undefined) {
    return "userId or chatId is undefined ";
  }

  const path = `./allChats/user-${userId}`;
  let fileLocation = `${path}/chat-${chatId}.json`;

  if (fs.existsSync(path)) {
    if (!fs.existsSync(fileLocation)) {
      const fileList = fs.readdirSync(path);
      if (Array.isArray(fileList)) {
        fs.open(
          `${path}/chat-${fileList.length + 1}.json`,
          "w",
          function (err, file) {
            if (err) throw err;
            fileLocation = `${path}/chat-${fileList.length + 1}.json`;

            const content = fs.readFileSync(fileLocation).toString();
            var JSONContent = content ? JSON.parse(content) : false;

            if (Array.isArray(JSONContent)) {
              JSONContent.push(chat);
            } else {
              JSONContent = JSONContent ? [JSONContent, chat] : [chat];
            }

            writeInFile(fileLocation, JSONContent, fileList.length + 1);
          }
        );
      }
    } else {
      const content = fs.readFileSync(fileLocation).toString();
      var JSONContent = JSON.parse(content).chat;

      if (Array.isArray(JSONContent)) {
        JSONContent.push(chat);
      } else {
        JSONContent = JSONContent ? [JSONContent, chat] : [chat];
      }
      writeInFile(fileLocation, JSONContent, chatId);
    }
  } else {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    writeInFile(`${path}/chat-1.json`, chat, 1);
  }
}

export function deleteChat(userId, chatId) {
  if (fs.existsSync(`./allChats/user-${userId}/chat-${chatId}.json`)) {
    if (!fs.existsSync(`./allChats/user-${userId}/trash`)) {
      fs.mkdirSync(`./allChats/user-${userId}/trash`, { recursive: true });
    }

    fs.rename(
      `./allChats/user-${userId}/chat-${chatId}.json`,
      `./allChats/user-${userId}/trash/chat-${chatId}.json`,
      (err) => {
        if (err) throw err;
        console.log("delete complete!");
      }
    );
  }
}

export function getChat(userId, chatId) {
  const path = `./allChats/user-${userId}`;
  let fileLocation = `${path}/chat-${chatId}.json`;

  if (!chatId || !fs.existsSync(fileLocation)) {
    return [];
  }
  const content = fs.readFileSync(fileLocation).toString();

  return content;
}

export function getAllChats(userId) {
  const path = `./allChats/user-${userId}`;

  let data = [];
  try {
    const files = fs.readdirSync(path);
    files.forEach(function (file) {
      data.push(JSON.parse(fs.readFileSync(path + "/" + file).toString()));
    });
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }

  return data;
}
