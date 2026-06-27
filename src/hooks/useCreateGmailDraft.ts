import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GmailFolderId } from "@/lib/gmail-folders";

export const SENT_EMAILS_QUERY_KEY = ["gmail-sent"] as const;
export const DRAFTS_QUERY_KEY = ["gmail-drafts"] as const;
export const TRASH_QUERY_KEY = ["gmail-trash"] as const;
export const PURCHASES_QUERY_KEY = ["gmail-purchases"] as const;
export const gmailFolderQueryKey = (folder: GmailFolderId) =>
  ["gmail-folder", folder] as const;

export async function getSentEmails() {
  const response = await fetch("/api/gmail", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch sent emails");
  }
  return result;
}

export async function sendDirectEmail({
  raw,
  threadId,
}: {
  raw: string;
  threadId?: string;
}) {
  const response = await fetch("/api/gmail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ raw, threadId }),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to send email");
  }
  return result;
}

export async function getDrafts() {
  const response = await fetch("/api/gmail/drafts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch drafts");
  }
  return result;
}

export async function createGmailDraft({
  raw,
  threadId,
}: {
  raw: string;
  threadId?: string;
}) {
  const response = await fetch("/api/gmail/drafts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ raw, threadId }),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to create draft");
  }
  return result;
}

export async function sendGmailDraft({ draftId }: { draftId: string }) {
  const response = await fetch("/api/gmail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ draftId }),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to send draft");
  }
  return result;
}

export async function deleteGmailDraft({ draftId }: { draftId: string }) {
  const response = await fetch(`/api/gmail/drafts?id=${draftId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to delete draft");
  }
  return result;
}

export async function deleteGmailEmail({ emailId }: { emailId: string }) {
  const response = await fetch(`/api/gmail?id=${emailId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to delete email");
  }
  return result;
}

export async function getTrashEmails() {
  const response = await fetch("/api/gmail/trash", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch trash");
  }
  return result;
}

export async function restoreGmailEmail({ emailId }: { emailId: string }) {
  const response = await fetch("/api/gmail/trash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: emailId }),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to restore email");
  }
  return result;
}

export async function permanentlyDeleteGmailEmail({
  emailId,
}: {
  emailId: string;
}) {
  const response = await fetch(`/api/gmail/trash?id=${emailId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to permanently delete email");
  }
  return result;
}

export async function getGmailFolderEmails(folder: GmailFolderId) {
  const response = await fetch(`/api/gmail/folder?folder=${folder}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || `Failed to fetch ${folder} emails`);
  }
  return result;
}

export async function getGmailPurchases() {
  const response = await fetch("/api/gmail/purchases", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch purchases");
  }
  return result;
}

export function useGmailSent() {
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

export function useGmailDrafts() {
  const queryClient = useQueryClient();

  const draftsQuery = useQuery({
    queryKey: DRAFTS_QUERY_KEY,
    queryFn: getDrafts,
  });

  const createDraftMutation = useMutation({
    mutationFn: createGmailDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFTS_QUERY_KEY });
    },
  });

  return {
    drafts: draftsQuery.data?.drafts ?? [],
    isFetching: draftsQuery.isLoading,
    fetchError: draftsQuery.error,
    refetchDrafts: draftsQuery.refetch,

    createDraft: createDraftMutation.mutate,
    isCreatingDraft: createDraftMutation.isPending,
    createDraftError: createDraftMutation.error,
  };
}

export function useSendGmailDraft() {
  const queryClient = useQueryClient();

  const sendDraftMutation = useMutation({
    mutationFn: sendGmailDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SENT_EMAILS_QUERY_KEY });
    },
  });

  return {
    sendDraft: sendDraftMutation.mutate,
    isSending: sendDraftMutation.isPending,
    sendError: sendDraftMutation.error,
  };
}

export function useDeleteGmailDraft() {
  const queryClient = useQueryClient();

  const deleteDraftMutation = useMutation({
    mutationFn: deleteGmailDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRAFTS_QUERY_KEY });
    },
  });

  return {
    deleteDraft: deleteDraftMutation.mutate,
    isDeleting: deleteDraftMutation.isPending,
    deleteError: deleteDraftMutation.error,
  };
}

export function useDeleteGmailEmail() {
  const queryClient = useQueryClient();

  const deleteEmailMutation = useMutation({
    mutationFn: deleteGmailEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SENT_EMAILS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TRASH_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["gmail-folder"] });
    },
  });

  return {
    deleteEmail: deleteEmailMutation.mutate,
    isDeleting: deleteEmailMutation.isPending,
    deleteError: deleteEmailMutation.error,
  };
}

export function useGmailTrash() {
  const trashQuery = useQuery({
    queryKey: TRASH_QUERY_KEY,
    queryFn: getTrashEmails,
  });

  return {
    emails: trashQuery.data?.emails ?? [],
    isFetching: trashQuery.isLoading,
    fetchError: trashQuery.error,
    refetchTrash: trashQuery.refetch,
  };
}

export function useGmailFolder(folder: GmailFolderId) {
  const folderQuery = useQuery({
    queryKey: gmailFolderQueryKey(folder),
    queryFn: () => getGmailFolderEmails(folder),
  });

  return {
    emails: folderQuery.data?.emails ?? [],
    isFetching: folderQuery.isLoading,
    fetchError: folderQuery.error,
    refetch: folderQuery.refetch,
  };
}

export function useGmailPurchases() {
  const purchasesQuery = useQuery({
    queryKey: PURCHASES_QUERY_KEY,
    queryFn: getGmailPurchases,
  });

  return {
    emails: purchasesQuery.data?.emails ?? [],
    analytics: purchasesQuery.data?.analytics,
    isFetching: purchasesQuery.isLoading,
    fetchError: purchasesQuery.error,
    refetchPurchases: purchasesQuery.refetch,
  };
}

export function useRestoreGmailEmail() {
  const queryClient = useQueryClient();

  const restoreMutation = useMutation({
    mutationFn: restoreGmailEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRASH_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SENT_EMAILS_QUERY_KEY });
    },
  });

  return {
    restoreEmail: restoreMutation.mutate,
    isRestoring: restoreMutation.isPending,
    restoreError: restoreMutation.error,
  };
}

export function usePermanentlyDeleteGmailEmail() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: permanentlyDeleteGmailEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRASH_QUERY_KEY });
    },
  });

  return {
    permanentlyDelete: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}

export const useGmailDraft = useGmailSent;
