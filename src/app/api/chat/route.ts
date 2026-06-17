import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  const { message } = await req.json();

  const now = new Date();
  const currentDateTimeStr = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  const completion = await openrouter.chat.completions.create({
    model: "x-ai/grok-4.3",
    messages: [
      {
        role: "system",
        content: `You are an AI productivity assistant like Superhuman.
You understand user intent and classify actions.

Supported actions:
1. create_email
2. create_calendar_event
3. chat_reply

Current Date and Time reference: ${currentDateTimeStr} (Use this exact reference when interpreting relative time expressions such as "tomorrow", "next Monday at 3 PM", "next week", etc.).

RULES:
- If user wants to send, draft, write, or compose an email → respond ONLY in JSON:
  {
    "action": "create_email",
    "to": "recipient email if mentioned (otherwise empty string)",
    "subject": "appropriate subject line",
    "body": "professional, full email body text"
  }

- If user wants to schedule, book, create a meeting, or set a calendar event → respond ONLY in JSON. Generate startDateTime and endDateTime in standard ISO 8601 format (YYYY-MM-DDTHH:mm:ss). If no duration is specified, assume the event lasts for exactly 1 hour:
  {
    "action": "create_calendar_event",
    "title": "meeting or event title",
    "startDateTime": "calculated start ISO datetime (YYYY-MM-DDTHH:mm:ss)",
    "endDateTime": "calculated end ISO datetime (YYYY-MM-DDTHH:mm:ss)"
  }

- If the user is chatting, asking questions, or making casual conversation → respond ONLY in JSON:
  {
    "action": "chat_reply",
    "message": "your helpful response message"
  }

NEVER return normal text.
ONLY return valid JSON. No Markdown formatting around the JSON object. Just return raw JSON.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.2,
    max_tokens: 1000,
  });

  let raw = completion.choices[0].message.content || "";

  raw = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(raw || "{}");
  } catch {
    parsed = {
      action: "chat_reply",
      message: raw,
    };
  }

  return Response.json(parsed);
}
