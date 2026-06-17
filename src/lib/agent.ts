import { OpenAIAgentsProvider } from "@corsair-dev/mcp";
import { Agent, tool } from "@openai/agents";
import { corsair } from "../../corsair";

let agent: Agent | null = null;

export async function getAgent() {
  if (agent) return agent;

  const provider = new OpenAIAgentsProvider();

  const tools = await provider.build({
    corsair : corsair,
    tool,
  });

  agent = new Agent({
    name: "gmail-calendar-agent",
    model: "gpt-4.1",
    instructions: `
      You have access to Corsair tools.

      For Gmail and Google Calendar:
      - First call list_operations
      - Then call get_schema
      - Then execute with run_script

      Always use IDs returned by Corsair.
    `,
    tools,
  });

  return agent;
}
