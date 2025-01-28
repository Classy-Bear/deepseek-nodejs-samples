import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const apiKey = fs.readFileSync(process.env.API_KEY_FILE, 'utf8').trim();
if (!apiKey) {
    throw new Error("API key is not defined. Please check your environment variables or Docker secrets configuration.");
}
const baseURL = 'https://api.deepseek.com';
const baseURLBeta = 'https://api.deepseek.com/beta';
const deepseek = new OpenAI({ apiKey, baseURL });
const deepseekBeta = new OpenAI({ apiKey, baseURL: baseURLBeta });

const explainBibleVerse = (bibleVerse) => deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages: [
        { role: "system", content: "You are a bible study expert. When you are given a bible verse, you will provide a summary of the verse that is easy to understand." },
        {
            role: "user",
            content: `Explain the meaning of the bible verse: ${bibleVerse}`,
        },
    ],
});

/**
 * Generates a Fibonacci sequence implementation using DeepSeek's Fill-In-the-Middle (FIM) API
 * This function uses the beta version of DeepSeek's API to complete a Python Fibonacci function
 * where the middle part of the implementation is generated by the AI.
 * 
 * @async
 * @function fibonacciFMI
 * @returns {Promise<Object>} The API response containing the completed Fibonacci implementation
 * @example
 * const response = await fibonacciFMI();
 * console.log(response.choices[0].text);
 * // Expected output might be something like:
 * //    if a <= 1:
 * //        return a
 * 
 * @throws {Error} If the API request fails
 * @note Requires beta API endpoint (https://api.deepseek.com/beta)
 */
const fibonacciFMI = () => deepseekBeta.completions.create({
    model: "deepseek-chat",
    prompt: "def fib(a):",
    suffix: "    return fib(a-1) + fib(a-2)",
    max_tokens: 128
});

/**
 * Lists all available models from the DeepSeek API
 * This function retrieves and displays information about each model accessible through the API.
 * 
 * @async
 * @function listModels
 * @returns {Promise<void>} Does not return a value, prints models to console
 * @example
 * await listModels();
 * // Expected output:
 * // { id: 'deepseek-chat', ... }
 * // { id: 'deepseek-coder', ... }
 * 
 * @throws {Error} If the API request fails
 */
const listModels = async () => {
    const models = await deepseek.models.list()
    for await (const model of models) {
        console.log(model);
    }
}

/**
 * Performs multi-round reasoning using DeepSeek's Reasoner model.
 * 
 * This function sends an initial question to the DeepSeek Reasoner model,
 * retrieves the response, and then uses that response to ask a follow-up question.
 * 
 * @async
 * @function performReasoningRounds
 * @returns {Promise<Object>} An object containing response1, response2, and reasoningContent
 * @example
 * const { response1, response2, reasoningContent } = await performReasoningRounds();
 * console.log(reasoningContent);
 * console.log(response1.choices[0].message.content);
 * console.log(response2.choices[0].message.content);
 * 
 * @throws {Error} If any of the API requests fail
 */
const performReasoningRounds = async () => {
    try {
        // Round 1
        let messages = [{ role: "user", content: "9.11 and 9.8, which is greater?" }];
        const response1 = await deepseek.chat.completions.create({
            model: "deepseek-reasoner",
            messages: messages
        });
        
        const reasoningContent = response1.choices[0].message.reasoning_content;
        const content = response1.choices[0].message.content;

        // Round 2
        messages.push({ role: "assistant", content: content });
        messages.push({ role: "user", content: "How many Rs are there in the word 'strawberry'?" });
        const response2 = await deepseek.chat.completions.create({
            model: "deepseek-reasoner",
            messages: messages
        });

        return { response1, response2, reasoningContent };
    } catch (error) {
        throw new Error(`Failed to perform reasoning rounds: ${error.message}`);
    }
};

/**
 * Performs a multi-round conversation about mountains using DeepSeek's chat model.
 * This function demonstrates how to maintain conversation context across multiple rounds.
 * 
 * @async
 * @function performMultiRoundConversation
 * @returns {Promise<Object>} An object containing both rounds of responses
 * @example
 * const { response1, response2 } = await performMountainConversation();
 * console.log(response1.choices[0].message.content);
 * console.log(response2.choices[0].message.content);
 * 
 * @throws {Error} If any of the API requests fail
 */
const performMultiRoundConversation = async () => {
    try {
        // Round 1
        let messages = [{ role: "user", content: "What's the highest mountain in the world?" }];
        const response1 = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: messages
        });
        
        // Add assistant's response to messages for context
        messages.push(response1.choices[0].message);
        console.log("Messages Round 1:", messages);

        // Round 2
        messages.push({ role: "user", content: "What is the second?" });
        const response2 = await deepseek.chat.completions.create({
            model: "deepseek-chat",
            messages: messages
        });

        messages.push(response2.choices[0].message);
        console.log("Messages Round 2:", messages);

        return { response1, response2 };
    } catch (error) {
        throw new Error(`Failed to perform mountain conversation: ${error.message}`);
    }
};

const main = async () => {
    // Uncomment to explain a Bible verse
    // const textOutput = await explainBibleVerse("Proverbs 17:3");
    // console.log(textOutput.choices[0].message);

    // Uncomment to generate Fibonacci sequence
    // const textOutput = await fibonacciFMI();
    // console.log(textOutput);

    // Uncomment to list models
    // await listModels();

    // Uncomment to perform reasoning rounds
    // try {
    //     const { response1, response2, reasoningContent } = await performReasoningRounds();
    //     console.log("Reasoning Content:", reasoningContent);
    //     console.log("Response 1 Content:", response1.choices[0].message.content);
    //     console.log("Response 2 Content:", response2.choices[0].message.content);
    // } catch (error) {
    //     console.error(error);
    // }

    // Uncomment to perform mountain conversation
    try {
        const { response1, response2 } = await performMultiRoundConversation();
        console.log("First Response:", response1.choices[0].message.content);
        console.log("Second Response:", response2.choices[0].message.content);
    } catch (error) {
        console.error(error);
    }
}
main();
