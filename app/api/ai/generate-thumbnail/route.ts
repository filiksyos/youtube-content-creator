import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic, style, emotion, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "YouTube Content Creator",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "system",
            content: "You are an expert YouTube thumbnail designer. Create compelling thumbnail concepts that maximize click-through rates."
          },
          {
            role: "user",
            content: `Create a YouTube thumbnail concept for:\n\nTopic: ${topic}\nStyle: ${style}\nEmotion: ${emotion}\n\nProvide:\n1. Main visual elements\n2. Text overlay (keep it short and punchy)\n3. Color scheme\n4. Facial expression/emotion (if person is included)\n5. Overall composition tips\n\nMake it click-worthy and attention-grabbing!`
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to generate thumbnail concept" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const concept = data.choices[0]?.message?.content || "";

    return NextResponse.json({ concept });
  } catch (error) {
    console.error("Thumbnail generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
