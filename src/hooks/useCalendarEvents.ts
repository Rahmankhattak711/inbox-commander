import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  fetchCalendarEvents,
} from "../services/calander-api";

export const EVENT_QUERY_KEY = ["events"] as const;

export function useCalendarEvents() {
  const queryClient = useQueryClient();

  const eventsQuery = useQuery({
    queryKey: EVENT_QUERY_KEY,
    queryFn: fetchCalendarEvents,
  });

  const createMutation = useMutation({
    mutationFn: createCalendarEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCalendarEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
    },
  });

  return {
    events: eventsQuery.data ?? [],
    isFetching: eventsQuery.isLoading,
    fetchError: eventsQuery.error,
    refetchEvents: eventsQuery.refetch,

    createEvent: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    deleteEvent: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}
