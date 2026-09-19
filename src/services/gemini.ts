import { GoogleGenAI } from '@google/genai';

export interface SongRecommendation {
  title: string;
  artist: string;
  album: string;
  year: string;
  reason: string;
}

export const getRecommendations = async (mood: string): Promise<SongRecommendation[]> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in your .env file");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
You are a master DJ and music curator. Based on the following user mood, recommend 5 songs. 
Mix it up with a good balance of modern hits, hidden gems, and classic tracks that perfectly capture the vibe.

User Mood: "${mood}"

Respond with ONLY a valid JSON array of objects, with no markdown formatting or backticks. Each object must have these exact keys:
"title" (string), "artist" (string), "album" (string), "year" (string), "reason" (short sentence on why it fits the mood).
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    
    // Clean up potential markdown formatting from the response
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText) as SongRecommendation[];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
