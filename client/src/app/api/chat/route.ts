// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful assistant. Answer the users questions concisely and clearly. Keep responses relevant to the users current query.',
    };
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg: { text: string; isUser: boolean }) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      })),
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages,
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
