import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function testModel(modelName) {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: "hi"
    });
    console.log(`Success ${modelName}:`, response.text.substring(0, 20));
  } catch(e) {
    console.error(`Error ${modelName}:`, e.message);
  }
}
await testModel("gemini-2.0-flash");
await testModel("gemini-1.5-flash");
await testModel("gemini-3.6-flash");
