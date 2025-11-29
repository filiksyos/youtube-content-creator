import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { topic, style, duration, apiKey } = await request.json();

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
            content: "You are an expert YouTube script writer. Create engaging, well-structured scripts that hook viewers and keep them watching."
          },
          {
            role: "user",
            content: `Create a YouTube video script on the topic: "${topic}"\n\nStyle: ${style}\nDuration: ${duration} minutes\n\nInclude:\n- Hook (first 10 seconds)\n- Introduction\n- Main content with 3-5 key points\n- Call to action\n- Outro\n\nFormat it clearly with timestamps.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: "Failed to generate script" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const script = data.choices[0]?.message?.content || "";

    return NextResponse.json({ script });
  } catch (error) {
    console.error("Script generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
