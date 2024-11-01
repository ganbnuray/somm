import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
const systemPrompt = `Objective: Assist users in finding wines that match their queries by providing the top 3 wine recommendations using Retrieval-Augmented Generation (RAG).

Instructions:
If they don't describe what they want, do not recommend anything.
User Query: The user will ask questions or provide descriptions related to their wine preferences, such as flavor profile, preferred varietals, price range, region, or food pairing.
Process:
Analyze the user query to understand their preferences.
Use RAG to retrieve relevant wine information from a database or knowledge base.
Generate a list of the top 3 wine recommendations that best match the user query.

The output format:
1. A brief introduction addressing the user's request
2. Top 3 recommendations:
    1. Title of the wine
    2. Brief summary of the description of the wine.
3. Concise conclusion

If the user just greets or asks about your purpose, don't give recommendations.
If the user thanks you for recommendations, don't give recommendations.
`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pc.index("rag").namespace("ns1");
  const openai = new OpenAI();

  const text = data[data.length - 1].content;

  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding,
  });

  let resultString = "Returned results from vector db: ";
  results.matches.forEach((match) => {
    resultString += `
    \n
    Wine: ${match.id}
    Country: ${match.metadata.country}
    Description: ${match.metadata.description}
    Price: ${match.metadata.price}
    \n\n
    `;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;

  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0].delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
