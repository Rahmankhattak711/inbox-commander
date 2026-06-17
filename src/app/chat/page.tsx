"use client";

import { useState, useRef, useEffect } from "react";
import { useGmailDraft } from "@/hooks/useCreateGmailDraft";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

type MessageAction =
  | { type: "create_email"; data: { to: string; subject: string; body: string } }
  | { type: "create_calendar_event"; data: { title: string; startDateTime: string; endDateTime: string } }
  | { type: "chat_reply"; data: { message: string } };

type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  action?: MessageAction;
  status?: "pending" | "success" | "error";
  statusMessage?: string;
};

function encodeEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
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

// Sub-component for Email Composer Card
function EmailComposerCard({
  to: initialTo,
  subject: initialSubject,
  body: initialBody,
  status,
  statusMessage,
  onSend,
}: {
  to: string;
  subject: string;
  body: string;
  status?: "pending" | "success" | "error";
  statusMessage?: string;
  onSend: (to: string, subject: string, body: string) => void;
}) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [isEditing, setIsEditing] = useState(status !== "success");

  useEffect(() => {
    if (status === "success") {
      setIsEditing(false);
    }
  }, [status]);

  return (
    <div
      className="p-5 rounded-xl border mt-3 space-y-4 max-w-lg shadow-lg transition duration-200 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor: status === "success" ? "rgba(200, 241, 53, 0.4)" : "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--lime)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
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
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">To</label>
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
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Subject</label>
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
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Body</label>
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
          style={{
            color: status === "error" ? "#f87171" : "var(--lime)",
          }}
        >
          {statusMessage}
        </p>
      )}

      {status !== "success" && (
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => onSend(to, subject, body)}
              disabled={status === "pending" || !to || !subject || !body}
              className="flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{
                background: "var(--lime)",
                color: "var(--bg-base)",
              }}
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

// Sub-component for Calendar Event Composer Card
function CalendarComposerCard({
  title: initialTitle,
  startDateTime: initialStart,
  endDateTime: initialEnd,
  status,
  statusMessage,
  onSave,
}: {
  title: string;
  startDateTime: string;
  endDateTime: string;
  status?: "pending" | "success" | "error";
  statusMessage?: string;
  onSave: (title: string, startDateTime: string, endDateTime: string) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  const [isEditing, setIsEditing] = useState(status !== "success");

  useEffect(() => {
    if (status === "success") {
      setIsEditing(false);
    }
  }, [status]);

  const formatInputDateTime = (isoStr: string) => {
    if (!isoStr) return "";
    return isoStr.substring(0, 16);
  };

  return (
    <div
      className="p-5 rounded-xl border mt-3 space-y-4 max-w-lg shadow-lg transition duration-200 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: "var(--bg-card)",
        borderColor: status === "success" ? "rgba(200, 241, 53, 0.4)" : "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--lime)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Event Title</label>
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
            <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Start Time</label>
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
            <label className="block text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] mb-1">End Time</label>
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
          style={{
            color: status === "error" ? "#f87171" : "var(--lime)",
          }}
        >
          {statusMessage}
        </p>
      )}

      {status !== "success" && (
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => onSave(title, start, end)}
              disabled={status === "pending" || !title || !start || !end}
              className="flex-1 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              style={{
                background: "var(--lime)",
                color: "var(--bg-base)",
              }}
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
    "Draft an email to John about Q3 plan",
    "Schedule a sync with Sarah tomorrow at 11 AM",
    "Casual chat: What commands do you support?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function sendMessage(textToSend?: string) {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    if (!textToSend) {
      setInput("");
    }

    const userMessageId = Date.now().toString() + "-user";
    const assistantMessageId = Date.now().toString() + "-assistant";

    setMessages((prev) => [
      ...prev,
      { id: userMessageId, role: "user", content: text },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const parsed = await response.json();

      let parsedAction: MessageAction = { type: "chat_reply", data: { message: "Failed to resolve action." } };

      if (parsed && parsed.action) {
        if (parsed.action === "create_email") {
          parsedAction = {
            type: "create_email",
            data: {
              to: parsed.to || "",
              subject: parsed.subject || "",
              body: parsed.body || "",
            },
          };
        } else if (parsed.action === "create_calendar_event") {
          parsedAction = {
            type: "create_calendar_event",
            data: {
              title: parsed.title || "",
              startDateTime: parsed.startDateTime || "",
              endDateTime: parsed.endDateTime || "",
            },
          };
        } else {
          parsedAction = {
            type: "chat_reply",
            data: {
              message: parsed.message || "Command processed.",
            },
          };
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          action: parsedAction,
        },
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          action: {
            type: "chat_reply",
            data: { message: error?.message || "Something went wrong (API error)." },
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleSendEmail = (messageId: string, to: string, subject: string, body: string) => {
    // Set message to pending status
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, status: "pending", statusMessage: "Sending email..." }
          : msg
      )
    );

    sendDirect(
      { raw: encodeEmail({ to, subject, body }) },
      {
        onSuccess: () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "success",
                    statusMessage: "Email sent successfully!",
                    action: {
                      type: "create_email",
                      data: { to, subject, body },
                    },
                  }
                : msg
            )
          );
        },
        onError: (error: any) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "error",
                    statusMessage: error?.message || "Failed to send email.",
                  }
                : msg
            )
          );
        },
      }
    );
  };

  const handleScheduleEvent = (messageId: string, title: string, startDateTime: string, endDateTime: string) => {
    // Set message to pending status
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, status: "pending", statusMessage: "Scheduling event in Google Calendar..." }
          : msg
      )
    );

    // Standardize datetime formatting
    const formattedStart = new Date(startDateTime).toISOString();
    const formattedEnd = new Date(endDateTime).toISOString();

    createEvent(
      { summary: title, startDateTime: formattedStart, endDateTime: formattedEnd },
      {
        onSuccess: () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "success",
                    statusMessage: "Event scheduled in Google Calendar successfully!",
                    action: {
                      type: "create_calendar_event",
                      data: { title, startDateTime, endDateTime },
                    },
                  }
                : msg
            )
          );
        },
        onError: (error: any) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    status: "error",
                    statusMessage: error?.message || "Failed to schedule event.",
                  }
                : msg
            )
          );
        },
      }
    );
  };

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden antialiased"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* Top Header */}
      <header className="px-8 py-6 flex justify-between items-center shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
            Commander Agent
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1" style={{ color: "var(--text-primary)" }}>
            AI Assistant Chat
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            Draft emails, schedule calendar events, and orchestrate actions in real-time.
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto py-16 flex flex-col items-center justify-center text-center space-y-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{ background: "var(--lime-glow)", borderColor: "rgba(200,241,53,0.2)" }}
            >
              <svg className="w-6 h-6" style={{ color: "var(--lime)" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                Start Orchestrating Actions
              </h2>
              <p className="text-xs max-w-sm" style={{ color: "var(--text-secondary)" }}>
                Ask me to write emails, draft syncs, plan your schedule, or simply chat to coordinate tasks.
              </p>
            </div>

            <div className="w-full max-w-md pt-4 space-y-2">
              <p className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[var(--text-muted)] text-left px-1">
                Try Suggestions
              </p>
              <div className="flex flex-col gap-2">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sug)}
                    className="w-full text-left p-3 rounded-xl border text-xs font-semibold hover:border-[var(--lime)]/30 hover:bg-[var(--lime-glow)] transition duration-200 cursor-pointer"
                    style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}
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
                {msg.role === "assistant" && (
                  <span className="text-[9px] font-mono tracking-widest uppercase ml-1" style={{ color: "var(--text-muted)" }}>
                    AI Commander
                  </span>
                )}
                {msg.role === "user" && (
                  <span className="text-[9px] font-mono tracking-widest uppercase mr-1 block text-right" style={{ color: "var(--text-muted)" }}>
                    You
                  </span>
                )}

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
                  <div>
                    {msg.action?.type === "chat_reply" && (
                      <div
                        className="px-5 py-3 rounded-2xl text-xs leading-relaxed shadow-sm border"
                        style={{
                          background: "var(--bg-surface)",
                          borderColor: "var(--border)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {msg.action.data.message}
                      </div>
                    )}

                    {msg.action?.type === "create_email" && (
                      <EmailComposerCard
                        to={msg.action.data.to}
                        subject={msg.action.data.subject}
                        body={msg.action.data.body}
                        status={msg.status}
                        statusMessage={msg.statusMessage}
                        onSend={(to, subject, body) => handleSendEmail(msg.id, to, subject, body)}
                      />
                    )}

                    {msg.action?.type === "create_calendar_event" && (
                      <CalendarComposerCard
                        title={msg.action.data.title}
                        startDateTime={msg.action.data.startDateTime}
                        endDateTime={msg.action.data.endDateTime}
                        status={msg.status}
                        statusMessage={msg.statusMessage}
                        onSave={(title, start, end) => handleScheduleEvent(msg.id, title, start, end)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start items-center gap-2 animate-pulse">
              <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
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
      <div className="p-6 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            className="flex-1 px-5 py-3.5 rounded-xl text-xs outline-none transition"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder='e.g., "Schedule Q3 planning tomorrow at 3 PM" or "Create a draft email to Alice"'
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200, 241, 53, 0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            style={{
              background: "var(--lime)",
              color: "var(--bg-base)",
              boxShadow: "0 0 16px rgba(200,241,53,0.15)",
            }}
          >
            <span>Send</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

