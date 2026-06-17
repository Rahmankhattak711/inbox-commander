import {
  getSentEmails,
  sendDirectEmail,
} from "@/services/gmail-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SENT_EMAILS_QUERY_KEY = ["gmail-sent"] as const;

export function useGmailDraft() {
  const queryClient = useQueryClient();

  const sentQuery = useQuery({
    queryKey: SENT_EMAILS_QUERY_KEY,
    queryFn: getSentEmails,
  });

  const sendDirectMutation = useMutation({
    mutationFn: sendDirectEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SENT_EMAILS_QUERY_KEY });
    },
  });

  return {
    emails: sentQuery.data?.emails ?? [],
    isFetching: sentQuery.isLoading,
    fetchError: sentQuery.error,
    refetchEmails: sentQuery.refetch,

    sendDirect: sendDirectMutation.mutate,
    isSendingDirect: sendDirectMutation.isPending,
    sendDirectError: sendDirectMutation.error,
  };
}
