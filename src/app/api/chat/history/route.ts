import { requireSession } from "@/app/api/utils";
import { DEFAULT_CHAT_MODEL, isChatModel } from "@/lib/chat-models";
import { prisma } from "@/lib/prisma";

const MAX_HISTORY_ITEMS = 50;
const MAX_MESSAGES_PER_CONVERSATION = 100;

function getConversationMessages(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(-MAX_MESSAGES_PER_CONVERSATION);
}

function parseMessages(value: string) {
  try {
    return getConversationMessages(JSON.parse(value));
  } catch {
    return [];
  }
}

function serializeConversation(conversation: {
  id: string;
  title: string;
  model: string;
  messages: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: conversation.id,
    title: conversation.title,
    model: isChatModel(conversation.model)
      ? conversation.model
      : DEFAULT_CHAT_MODEL,
    messages: parseMessages(conversation.messages),
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
  };
}

export async function GET() {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const conversations = await prisma.chatConversation.findMany({
      where: { userId: auth.userId },
      orderBy: { updatedAt: "desc" },
      take: MAX_HISTORY_ITEMS,
    });

    return Response.json(conversations.map(serializeConversation));
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return Response.json(
      { error: "Failed to load chat history." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const body = await req.json();
    const id =
      typeof body?.id === "string" && body.id ? body.id : crypto.randomUUID();
    const title =
      typeof body?.title === "string" && body.title.trim()
        ? body.title.trim().slice(0, 120)
        : "New conversation";
    const model = isChatModel(body?.model) ? body.model : DEFAULT_CHAT_MODEL;
    const messages = getConversationMessages(body?.messages);
    const serializedMessages = JSON.stringify(messages);
    const existing = await prisma.chatConversation.findFirst({
      where: { id, userId: auth.userId },
    });

    const conversation = existing
      ? await prisma.chatConversation.update({
          where: { id: existing.id },
          data: { title, model, messages: serializedMessages },
        })
      : await prisma.chatConversation.create({
          data: {
            id,
            userId: auth.userId,
            title,
            model,
            messages: serializedMessages,
          },
        });

    return Response.json(serializeConversation(conversation));
  } catch (error) {
    console.error("Failed to save chat history:", error);
    return Response.json(
      { error: "Failed to save chat history." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return Response.json(
      { error: "Conversation id is required." },
      { status: 400 },
    );
  }

  try {
    await prisma.chatConversation.deleteMany({
      where: { id, userId: auth.userId },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete chat history:", error);
    return Response.json(
      { error: "Failed to delete chat history." },
      { status: 500 },
    );
  }
}
