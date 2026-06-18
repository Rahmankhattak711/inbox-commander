import { openrouter } from "@/lib/openrouter";

interface CalendarAction {
  action: "create_calendar_event";
  title: string;
  startDateTime: string;
  endDateTime: string;
}

interface EmailAction {
  action: "create_email";
  to: string;
  subject: string;
  body: string;
}

interface ChatAction {
  action: "chat_reply";
  message: string;
}

type AssistantAction = CalendarAction | EmailAction | ChatAction;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json([{
        action: "chat_reply",
        message: "Invalid request: message is required."
      }]);
    }

    const now = new Date();
    const currentDateTimeStr = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const completion = await openrouter.chat.completions.create({
      model: "x-ai/grok-4.3",
      messages: [
        {
          role: "system",
          content: `You are a precise productivity assistant that can perform MULTIPLE actions in one response.

Current Date and Time: ${currentDateTimeStr}

CRITICAL RULES — NEVER VIOLATE:
- You MUST respond with ONLY a valid JSON array [] — no explanations, no markdown, no extra text.
- Always return an array, even if there's only one action.
- If the user asks for multiple things, return ALL of them in the array.
- Detect and execute every action mentioned.

AVAILABLE ACTIONS:
1. Calendar Event:
   {"action": "create_calendar_event", "title": string, "startDateTime": "YYYY-MM-DDTHH:mm:ss", "endDateTime": "YYYY-MM-DDTHH:mm:ss"}

2. Email:
   {"action": "create_email", "to": string, "subject": string, "body": string}

3. Simple reply:
   {"action": "chat_reply", "message": string}

INSTRUCTIONS:
- Default meeting duration: 60 minutes.
- When user says "book a meeting" + "send email", you MUST output BOTH actions.
- Be specific and professional in titles, subjects, and email bodies.
- Use reasonable defaults if details are missing.
- Always output valid JSON array.`.trim(),
        },
        { role: "user", content: message },
      ],
      temperature: 0.1,
      max_tokens: 1500,
    });

    let raw = (completion.choices[0]?.message?.content || "").trim();

     raw = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

     const jsonStart = raw.indexOf("[");
    const jsonEnd = raw.lastIndexOf("]") + 1;

    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      raw = raw.substring(jsonStart, jsonEnd);
    }

    let parsed: AssistantAction[];

    try {
      const data = JSON.parse(raw);
      parsed = Array.isArray(data) ? data : [data];
    } catch (e) {
      console.error("JSON Parse Error. Raw:", raw);
      parsed = [{
        action: "chat_reply",
        message: "Sorry, I couldn't understand your request. Please try again."
      }];
    }

     parsed = parsed.filter((action: any) =>
      action &&
      typeof action === "object" &&
      ["create_calendar_event", "create_email", "chat_reply"].includes(action.action)
    );

    if (parsed.length === 0) {
      parsed = [{
        action: "chat_reply",
        message: "No valid actions could be extracted."
      }];
    }

    return Response.json(parsed);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json([{
      action: "chat_reply",
      message: "An internal error occurred. Please try again."
    }]);
  }
}
