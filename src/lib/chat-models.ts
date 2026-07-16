export const CHAT_MODELS = [
  {
    id: "openai/gpt-oss-120b",
    label: "GPT OSS 120B",
  },
  {
    id: "deepseek/deepseek-v4-flash",
    label: "DeepSeek V4 Flash",
  },
  {
    id: "google/gemma-3-27b-it",
    label: "Gemma 3 27B IT Free",
  },
  {
    id: "openrouter/free",
    label: "Openrouter",
  },
] as const;

export type ChatModel = (typeof CHAT_MODELS)[number]["id"];

export const DEFAULT_CHAT_MODEL: ChatModel = CHAT_MODELS[0].id;

export function isChatModel(value: unknown): value is ChatModel {
  return (
    typeof value === "string" &&
    CHAT_MODELS.some((chatModel) => chatModel.id === value)
  );
}
