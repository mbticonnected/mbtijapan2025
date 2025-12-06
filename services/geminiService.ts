import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FortuneResult, MbtiType } from "../types";

// Schema definition remains the same
const fortuneSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    fortuneLevel: {
      type: Type.STRING,
      description: "The level of luck (e.g., 大吉, 吉, 中吉, 小吉, 末吉, 凶).",
    },
    poem: {
      type: Type.STRING,
      description: "A traditional style 4-line poem (mystical and poetic) related to the question.",
    },
    poemExplanation: {
      type: Type.STRING,
      description: "A brief explanation of what the poem means metaphorically.",
    },
    generalAdvice: {
      type: Type.STRING,
      description: "General interpretation of the fortune specifically tailored to the user's MBTI cognitive functions.",
    },
    categories: {
      type: Type.OBJECT,
      properties: {
        love: { type: Type.STRING, description: "Advice regarding love/relationships based on MBTI." },
        career: { type: Type.STRING, description: "Advice regarding career/work based on MBTI." },
        family: { type: Type.STRING, description: "Advice regarding family dynamics based on MBTI." },
        health: { type: Type.STRING, description: "Advice regarding physical and mental health based on MBTI." },
      },
      required: ["love", "career", "family", "health"],
    },
    luckyItem: {
      type: Type.STRING,
      description: "A lucky item or color or direction suitable for this MBTI type today.",
    },
  },
  required: ["fortuneLevel", "poem", "poemExplanation", "generalAdvice", "categories", "luckyItem"],
};

export const fetchFortune = async (
  mbti: MbtiType,
  question: string
): Promise<FortuneResult> => {
  // Use process.env.API_KEY directly as per guidelines
  const apiKey = process.env.API_KEY;
  
  // Debug log (masked)
  console.log(`[Debug] API Key Status: ${apiKey ? "Present (Length: " + apiKey.length + ")" : "Missing"}`);
  
  if (!apiKey || apiKey.length === 0) {
    console.error("API Key is empty. Check env settings.");
    throw new Error("系統連線設定有誤 (API Key Missing)。請確認 Vercel 環境變數已設定並重新部署。");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-2.5-flash as requested by guidelines
  const model = "gemini-2.5-flash";

  const prompt = `
    You are the wise Guardian Spirit of the MBTI Shrine. 
    A pilgrim with the personality type **${mbti}** has come to you with a question: "${question}".

    Perform the Omikuji ritual:
    1. Draw a fortune stick (fortuneLevel) ranging from Great Blessing (大吉) to Curse (凶). Be honest but constructive.
    2. Compose a mystical, traditional-style poem (poem) reflecting their situation.
    3. Provide a 'poemExplanation'.
    4. Provide 'generalAdvice' that deeply analyzes their specific MBTI cognitive functions (Ni, Ne, Si, Se, Ti, Te, Fi, Fe) in relation to the fortune. 
       For example, if they are INTJ, speak to their strategic planning or tendency to overthink. If ESFP, speak to their sensory experiences or impulsivity.
    5. Provide specific advice for Love, Career, Family, and Health, also tailored to their MBTI type.
    6. Suggest a 'luckyItem'.

    Response language: Traditional Chinese (繁體中文).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: fortuneSchema,
        temperature: 0.8,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as FortuneResult;
    } else {
      throw new Error("No text returned from spirit.");
    }
  } catch (error) {
    console.error("Shrine communication error:", error);
    throw error;
  }
};