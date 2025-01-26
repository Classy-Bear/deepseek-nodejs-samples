import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const apiKey = fs.readFileSync(process.env.API_KEY_FILE, 'utf8').trim();
if (!apiKey) {
    throw new Error("API key is not defined. Please check your environment variables or Docker secrets configuration.");
}
const baseURL = 'https://api.deepseek.com';
const openai = new OpenAI({ apiKey, baseURL });
const explainBibleVerse = (bibleVerse) => openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
        { role: "system", content: "You are a bible study expert. When you are given a bible verse, you will provide a summary of the verse that is easy to understand." },
        {
            role: "user",
            content: `Explain the meaning of the bible verse: ${bibleVerse}`,
        },
    ],
});
const main = async () => {
    const textOutput = await explainBibleVerse("Proverbs 17:3");
    console.log(textOutput.choices[0].message);
}
main();
