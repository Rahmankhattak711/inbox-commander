import {
  createGmailDraft,
  deleteGmailDraft,
  getGmailDrafts,
} from "@/services/gmail-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const DRAFTS_QUERY_KEY = ["gmail-drafts"] as const;

export function useGmailDraft() {
  const queryClient = useQueryClient();

  const draftsQuery = useQuery({
    queryKey: DRAFTS_QUERY_KEY,
    queryFn: getGmailDrafts,
  });

  const createMutation = useMutation({
    mutationFn: createGmailDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFTS_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGmailDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFTS_QUERY_KEY });
    },
  });

  return {
    drafts: draftsQuery.data?.drafts ?? [],
    isFetching: draftsQuery.isLoading,
    fetchError: draftsQuery.error,
    refetchDrafts: draftsQuery.refetch,

    createDraft: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    deleteDraft: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}
