"use client";

import { useState, useRef, useEffect } from "react";
import { useGmailDraft } from "@/hooks/useCreateGmailDraft";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

type MessageAction =
  | {
      type: "create_email";
      data: { to: string; subject: string; body: string };
    }
  | {
      type: "create_calendar_event";
      data: { title: string; startDateTime: string; endDateTime: string };
    }
  | { type: "chat_reply"; data: { message: string } };

type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  actions?: MessageAction[];
  actionStatuses?: Record<
    number,
    {
      status?: "pending" | "success" | "error";
      statusMessage?: string;
    }
  >;
};

function encodeEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const msg = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    body.replace(/\n/g, "<br />"),
  ].join("\r\n");
  const bytes = new TextEncoder().encode(msg);
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Email Composer Card
function EmailComposerCard({
  actionIndex,
  messageId,
  to: initialTo,
  subject: initialSubject,
  body: initialBody,
  status,
  statusMessage,
  onSend,
}: {
  actionIndex: number;
  messageId: string;
  to: string;
  subject: string;
  body: string;
  status?: "pending" | "success" | "error";
  statusMessage?: string;
  onSend: (
    messageId: string,
    actionIndex: number,
    to: string,
    subject: string,
    body: string,
  ) => void;
}) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [isEditing, setIsEditing] = useState(status !== "success");

  useEffect(() => {
    if (status === "success") setIsEditing(false);
  }, [status]);

  return (
    <div
      className="p-5 rounded-xl border mt-3 space-y-4 max-w-lg shadow-lg transition duration-200 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor:
          status === "success" ? "rgba(200, 241, 53, 0.4)" : "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[var(--lime)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4"
            />
          </svg>
          <span className="text-[10px] font-extrabold uppercase tracking-wider font-mono text-[var(--lime)]">
            Email Action Proposed
          </span>
        </div>
        {status === "success" && (
          <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-lime-950/20 text-[var(--lime)] font-mono border border-[var(--lime)]/20 animate-pulse">
            SENT
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            To
          </label>
          <input
            type="email"
            value={to}
            disabled={!isEditing || status === "pending"}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg outline-none transition"
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <div>
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            disabled={!isEditing || status === "pending"}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg outline-none transition"
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <div>
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            Body
          </label>
          <textarea
            rows={4}
            value={body}
            disabled={!isEditing || status === "pending"}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg outline-none transition resize-none"
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      {statusMessage && (
        <p
          className="text-[10px] font-mono"
          style={{ color: status === "error" ? "#f87171" : "var(--lime)" }}
        >
          {statusMessage}
        </p>
      )}

      {status !== "success" && (
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => onSend(messageId, actionIndex, to, subject, body)}
              disabled={status === "pending" || !to || !subject || !body}
              className="flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              {status === "pending" ? "Sending..." : "Send Email"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition active:scale-[0.98] border cursor-pointer"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              Edit Details
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Calendar Composer Card
function CalendarComposerCard({
  actionIndex,
  messageId,
  title: initialTitle,
  startDateTime: initialStart,
  endDateTime: initialEnd,
  status,
  statusMessage,
  onSave,
}: {
  actionIndex: number;
  messageId: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  status?: "pending" | "success" | "error";
  statusMessage?: string;
  onSave: (
    messageId: string,
    actionIndex: number,
    title: string,
    start: string,
    end: string,
  ) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [isEditing, setIsEditing] = useState(status !== "success");

  useEffect(() => {
    if (status === "success") setIsEditing(false);
  }, [status]);

  const formatInputDateTime = (isoStr: string) =>
    !isoStr ? "" : isoStr.substring(0, 16);

  return (
    <div
      className="p-5 rounded-xl border mt-3 space-y-4 max-w-lg shadow-lg transition duration-200 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor:
          status === "success" ? "rgba(200, 241, 53, 0.4)" : "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[var(--lime)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] font-extrabold uppercase tracking-wider font-mono text-[var(--lime)]">
            Calendar Action Proposed
          </span>
        </div>
        {status === "success" && (
          <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-lime-950/20 text-[var(--lime)] font-mono border border-[var(--lime)]/20 animate-pulse">
            EVENT SCHEDULED
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            disabled={!isEditing || status === "pending"}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg outline-none transition"
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={formatInputDateTime(start)}
              disabled={!isEditing || status === "pending"}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg outline-none transition"
              style={{
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <div>
            <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={formatInputDateTime(end)}
              disabled={!isEditing || status === "pending"}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg outline-none transition"
              style={{
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>
      </div>

      {statusMessage && (
        <p
          className="text-[10px] font-mono"
          style={{ color: status === "error" ? "#f87171" : "var(--lime)" }}
        >
          {statusMessage}
        </p>
      )}

      {status !== "success" && (
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => onSave(messageId, actionIndex, title, start, end)}
              disabled={status === "pending" || !title || !start || !end}
              className="flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              {status === "pending" ? "Scheduling..." : "Schedule Event"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition active:scale-[0.98] border cursor-pointer"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              Edit Details
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const { sendDirect } = useGmailDraft();
  const { createEvent } = useCalendarEvents();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Book a meeting with John next Monday at 10 AM and also send the email to example@gmail.com",
    "Send a project update to the engineering team",
    "Schedule a 30-minute sync with John tomorrow at 11 AM",
    "Review my inbox and prepare my schedule for today",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(textToSend?: string) {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    if (!textToSend) setInput("");

    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, role: "user", content: text },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error("Failed to connect to AI");

      const parsed = await response.json();

      let actions: MessageAction[] = [];

      if (Array.isArray(parsed)) {
        actions = parsed.map((item: any) => convertToMessageAction(item));
      } else if (parsed) {
        actions = [convertToMessageAction(parsed)];
      }

      if (actions.length === 0) {
        actions = [
          {
            type: "chat_reply",
            data: { message: "No actions could be extracted." },
          },
        ];
      }

      const assistantMessageId = `assistant-${Date.now()}`;

      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", actions },
      ]);
    } catch (error: any) {
      const assistantMessageId = `assistant-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          actions: [
            {
              type: "chat_reply",
              data: { message: error?.message || "Something went wrong." },
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function convertToMessageAction(parsed: any): MessageAction {
    if (parsed.action === "create_email" || parsed.type === "create_email") {
      return {
        type: "create_email",
        data: {
          to: parsed.to || parsed.data?.to || "",
          subject: parsed.subject || parsed.data?.subject || "",
          body: parsed.body || parsed.data?.body || "",
        },
      };
    }
    if (
      parsed.action === "create_calendar_event" ||
      parsed.type === "create_calendar_event"
    ) {
      return {
        type: "create_calendar_event",
        data: {
          title: parsed.title || parsed.data?.title || "",
          startDateTime:
            parsed.startDateTime || parsed.data?.startDateTime || "",
          endDateTime: parsed.endDateTime || parsed.data?.endDateTime || "",
        },
      };
    }
    return {
      type: "chat_reply",
      data: { message: parsed.message || "Command processed." },
    };
  }

  const updateActionStatus = (
    messageId: string,
    actionIndex: number,
    status: "pending" | "success" | "error",
    statusMessage?: string,
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              actionStatuses: {
                ...(msg.actionStatuses || {}),
                [actionIndex]: { status, statusMessage },
              },
            }
          : msg,
      ),
    );
  };

  const handleSendEmail = (
    messageId: string,
    actionIndex: number,
    to: string,
    subject: string,
    body: string,
  ) => {
    updateActionStatus(messageId, actionIndex, "pending", "Sending email...");
    sendDirect(
      { raw: encodeEmail({ to, subject, body }) },
      {
        onSuccess: () =>
          updateActionStatus(
            messageId,
            actionIndex,
            "success",
            "Email sent successfully!",
          ),
        onError: (error: any) =>
          updateActionStatus(
            messageId,
            actionIndex,
            "error",
            error?.message || "Failed to send email.",
          ),
      },
    );
  };

  const handleScheduleEvent = (
    messageId: string,
    actionIndex: number,
    title: string,
    startDateTime: string,
    endDateTime: string,
  ) => {
    updateActionStatus(
      messageId,
      actionIndex,
      "pending",
      "Scheduling event...",
    );
    const formattedStart = new Date(startDateTime).toISOString();
    const formattedEnd = new Date(endDateTime).toISOString();

    createEvent(
      {
        summary: title,
        startDateTime: formattedStart,
        endDateTime: formattedEnd,
      },
      {
        onSuccess: () =>
          updateActionStatus(
            messageId,
            actionIndex,
            "success",
            "Event scheduled successfully!",
          ),
        onError: (error: any) =>
          updateActionStatus(
            messageId,
            actionIndex,
            "error",
            error?.message || "Failed to schedule event.",
          ),
      },
    );
  };

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden antialiased"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header
        className="px-8 py-6 flex justify-between items-center shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <span
            className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
            style={{ color: "var(--lime)" }}
          >
            COMMANDER AGENT
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">
            AI Assistant Chat
          </h1>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Multiple actions supported • Independent status
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center space-y-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border"
              style={{
                background: "var(--lime-glow)",
                borderColor: "rgba(200,241,53,0.3)",
              }}
            >
              <span className="text-4xl">🤖</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Ready to take action?
              </h2>
              <p
                className="text-sm max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                I can handle multiple tasks at once (meetings + emails)
              </p>
            </div>

            <div className="w-full max-w-lg">
              <p className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[var(--text-muted)] mb-3 text-left">
                Try these:
              </p>
              <div className="grid gap-3">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sug)}
                    className="w-full text-left p-4 rounded-2xl border text-sm hover:border-[var(--lime)]/50 hover:bg-[var(--lime-glow)]/10 transition-all"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}
            >
              <div className="max-w-2xl space-y-1">
                <span
                  className={`text-[9px] font-mono tracking-widest uppercase ${msg.role === "user" ? "text-right block mr-1" : "ml-1"}`}
                  style={{ color: "var(--text-muted)" }}
                >
                  {msg.role === "user" ? "You" : "AI Commander"}
                </span>

                {msg.role === "user" ? (
                  <div
                    className="px-5 py-3 rounded-2xl text-xs font-semibold shadow-sm leading-relaxed border"
                    style={{
                      background: "var(--lime-glow)",
                      borderColor: "rgba(200, 241, 53, 0.2)",
                      color: "var(--lime)",
                    }}
                  >
                    {msg.content}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {msg.actions?.map((action, index) => {
                      const actionStatus = msg.actionStatuses?.[index];
                      return (
                        <div key={index}>
                          {action.type === "chat_reply" && (
                            <div
                              className="px-5 py-3 rounded-2xl text-xs leading-relaxed shadow-sm border"
                              style={{
                                background: "var(--bg-surface)",
                                borderColor: "var(--border)",
                                color: "var(--text-primary)",
                              }}
                            >
                              {action.data.message}
                            </div>
                          )}

                          {action.type === "create_email" && (
                            <EmailComposerCard
                              actionIndex={index}
                              messageId={msg.id}
                              to={action.data.to}
                              subject={action.data.subject}
                              body={action.data.body}
                              status={actionStatus?.status}
                              statusMessage={actionStatus?.statusMessage}
                              onSend={handleSendEmail}
                            />
                          )}

                          {action.type === "create_calendar_event" && (
                            <CalendarComposerCard
                              actionIndex={index}
                              messageId={msg.id}
                              title={action.data.title}
                              startDateTime={action.data.startDateTime}
                              endDateTime={action.data.endDateTime}
                              status={actionStatus?.status}
                              statusMessage={actionStatus?.statusMessage}
                              onSave={handleScheduleEvent}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start items-center gap-2 animate-pulse">
              <span
                className="text-[9px] font-mono tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Thinking...
              </span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div
        className="p-6 shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            className="flex-1 px-5 py-3.5 rounded-xl text-xs outline-none transition"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder='e.g., "Book a meeting with ghoufran next Monday at 10 AM and also send the email to ghoufran111@gmail.com"'
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), sendMessage())
            }
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            style={{ background: "var(--lime)", color: "var(--bg-base)" }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
