import { google as GenAi } from "@ai-sdk/google";
import { generateText, embed, streamText } from "ai";

const chatModel = GenAi("gemini-2.0-flash-001");

export async function askAI(tasks:string[],content:string){
    const instructions=`
    ${
        tasks.map((task,index)=>
            `- ${index+1}. ${task}`
        ).join("\n")
    }
    `
    const response =await generateText({
        model: chatModel,
        prompt:`
        You are a strict executor of sequential text tasks. Follow these instructions exactly and without deviation:

        - Perform the tasks listed below in the exact order they are given.
        - Use the result of each task as the input to the next.
        - If any task is a translation ('translate-to-<lang>') and the language is unknown or invalid, immediately return '404' and ignore all remaining tasks.
        - Return **only** the final result of the last completed task.
        - Do **not** return intermediate outputs, explanations, or formatting.
        - add a new line between each task output.
        - execute each task in the order they are given in a pipeline. take the previous task output as the input for the next task. and return the final output only.

        ---Tasks---
        ${instructions}

        ---Context---
        ${content}
        `
    })
    return response.text;
}