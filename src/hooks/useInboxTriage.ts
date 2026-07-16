import { useQuery } from "@tanstack/react-query";
import type {
  InboxTriageInput,
  InboxTriageResponse,
} from "@/types/inbox-triage";

async function getInboxTriage(messages: InboxTriageInput[]) {
  const response = await fetch("/api/gmail/triage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ messages }),
  });
  const result = (await response.json()) as InboxTriageResponse & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(result.error || "Failed to prioritize your inbox.");
  }

  return result;
}

export function useInboxTriage(messages: InboxTriageInput[], enabled: boolean) {
  const messageFingerprint = messages
    .map(({ id, subject, snippet }) => `${id}:${subject}:${snippet}`)
    .join("|");

  const triageQuery = useQuery({
    queryKey: ["gmail-inbox-triage", messageFingerprint],
    queryFn: () => getInboxTriage(messages),
    enabled: enabled && messages.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    triage: triageQuery.data?.triage ?? [],
    source: triageQuery.data?.source,
    isTriageLoading: triageQuery.isLoading,
    triageError: triageQuery.error,
    refetchTriage: triageQuery.refetch,
  };
}
