"use client";

import { useGmailDraft } from "@/hooks/useCreateGmailDraft";
import { useState } from "react";

interface PopupProps {
  onClose: () => void;
  setShowCreate: (show: boolean) => void;
  showCreate: boolean;
}

export default function Popup({ onClose, setShowCreate }: PopupProps) {
  const { sendDirect, isSendingDirect, sendDirectError } = useGmailDraft();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition";

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  const handleSendEmail = async () => {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      message,
    ].join("\n");

    const raw = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    sendDirect(
      { raw },
      {
        onSuccess: () => {
          setShowCreate(false);
          onClose();
          setTo("");
          setSubject("");
          setMessage("");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center px-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(8,13,5,0.8)" }}
        onClick={() => {
          setShowCreate(false);
          onClose();
        }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 0 40px rgba(200,241,53,0.04)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
              style={{ color: "var(--lime)" }}
            >
              New Email
            </span>

            <h2
              className="text-sm font-bold mt-0.5"
              style={{ color: "var(--text-primary)" }}
            >
              Send Direct Email
            </h2>

            <p
              className="text-[10px] font-mono mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Compose and send an email instantly
            </p>
          </div>

          <button
            onClick={() => {
              setShowCreate(false);
              onClose();
            }}
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendEmail();
          }}
          className="space-y-4"
        >
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Recipient
            </label>

            <input
              type="email"
              required
              autoFocus
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="john@example.com"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Subject
            </label>

            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Update"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Message
            </label>

            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your email..."
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>

          {sendDirectError && (
            <div
              className="text-xs p-3 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              {sendDirectError instanceof Error
                ? sendDirectError.message
                : "Failed to send email."}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setShowCreate(false);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSendingDirect}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98] disabled:opacity-50"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              {isSendingDirect ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Email"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
