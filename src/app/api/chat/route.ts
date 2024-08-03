// import { data } from "@/data/data";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Instance of OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

// NOTE: runtime has to be edge
export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Extract prompt
        const { prompt } = body;

        // Handle error if prompt is present and not empty
        if (prompt && prompt.trim() !== "") {
            const chatResponse = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: prompt
                    }
                ]
            });

            // Extract the content from the response
            const content = chatResponse.choices[0].message.content;

            return NextResponse.json({ message: content }, { status: 200 });
        } 
        // Handle error if prompt is present but empty
        else {
            return NextResponse.json({ error: "Invalid prompt" }, { status: 422 });
        }
    } 
    // Handle error if prompt is not present on request body
    catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}