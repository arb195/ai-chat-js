import { ChatOpenAI } from "@langchain/openai";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { Document } from "@langchain/core/documents";

// Import environment variables
import dotenv from "dotenv";
dotenv.config();

export async function sendToOpenAi(userInput, chatHistory) {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  // Create prompt
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question in persian language from the following context: 
  {context}
  Question: {input}
  chat_history:{chatHistory}
  `
  );

  // Create Chain
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  // Manually create documents
  const documentA = new Document({
    pageContent: "قیمت میگلرد 12 ذوب آهن 20000 تومان است",
  });

  // Invoke Chain
  const response = await chain.invoke({
    input: userInput,
    context: [documentA],
    chatHistory: chatHistory,
  });

  return response;
}
