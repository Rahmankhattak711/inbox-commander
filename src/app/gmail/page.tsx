"use client";

import { useMemo, useState } from "react";
import { useGmailDraft } from "@/hooks/useCreateGmailDraft";

function encodeEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const msg = [`To: ${to}`, `Subject: ${subject}`, "Content-Type: text/html; charset=utf-8", "", body.replace(/\n/g, "<br />")].join("\r\n");
  const bytes = new TextEncoder().encode(msg);
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeHtml(str: string) {
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

const inputClass = "w-full px-4 py-3 rounded-xl text-xs outline-none transition";
const inputStyle = { background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" };
const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)");
const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "var(--border)");

export default function GmailPage() {
  const { drafts, isFetching, fetchError, createDraft, isCreating, createError, deleteDraft, deleteError, refetchDrafts } = useGmailDraft();

  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [composeSuccess, setComposeSuccess] = useState(false);

  const parsedDrafts = useMemo(() =>
    drafts.map((draft: any) => {
      const headers = draft.message?.payload?.headers || [];
      const h = (name: string) => (headers.find((x: any) => x.name.toLowerCase() === name.toLowerCase())?.value ?? "");
      return {
        id: draft.id,
        subject: h("subject") || "(No Subject)",
        to: h("to") || "(No Recipient)",
        from: h("from") || "(No Sender)",
        date: h("date") || (draft.message?.internalDate ? new Date(Number(draft.message.internalDate)).toLocaleDateString() : ""),
        snippet: draft.message?.snippet ? decodeHtml(draft.message.snippet) : "No preview available",
      };
    }),
    [drafts]
  );

  const selectedDraft = useMemo(
    () => parsedDrafts.find((d: any) => d.id === selectedDraftId) || parsedDrafts[0] || null,
    [parsedDrafts, selectedDraftId]
  );

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !body) return;
    createDraft(
      { raw: encodeEmail({ to, subject, body }) },
      {
        onSuccess: () => {
          setComposeSuccess(true);
          setTo(""); setSubject(""); setBody("");
          setTimeout(() => { setComposeSuccess(false); setShowCompose(false); }, 1600);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteDraft({ id }, {
      onSuccess: () => { if (selectedDraftId === id) setSelectedDraftId(null); },
      onSettled: () => setDeletingId(null),
    });
  };

  return (
    <div className="flex-1 antialiased flex flex-col h-full animate-in fade-in duration-300" style={{ color: "var(--text-primary)", background: "var(--bg-base)" }}>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(8,13,5,0.85)" }} onClick={() => setShowCompose(false)} />
          <div
            className="relative w-full max-w-lg rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "0 0 60px rgba(200,241,53,0.04)" }}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <div>
                <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>New Draft</span>
                <h3 className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>Compose Email</h3>
              </div>
              <button onClick={() => setShowCompose(false)} style={{ color: "var(--text-secondary)" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {composeSuccess ? (
              <div className="px-6 py-14 flex flex-col items-center text-center gap-3 animate-in fade-in duration-300">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(200,241,53,0.1)", border: "1px solid rgba(200,241,53,0.3)" }}
                >
                  <svg className="w-7 h-7" style={{ color: "var(--lime)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Draft Saved!</p>
                <p className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>Your draft was saved to Gmail successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleCompose} className="p-6 space-y-4">
                {[
                  { label: "To", type: "email", val: to, set: setTo, placeholder: "recipient@example.com" },
                  { label: "Subject", type: "text", val: subject, set: setSubject, placeholder: "e.g. Project Update Q2" },
                ].map(({ label, type, val, set, placeholder }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input
                      type={type} required value={val} onChange={(e) => set(e.target.value)}
                      placeholder={placeholder} onFocus={inputFocus} onBlur={inputBlur}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>Body</label>
                  <textarea
                    required rows={6} value={body} onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl text-xs outline-none transition resize-none"
                    style={inputStyle}
                    onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>
                {createError && (
                  <div className="text-xs p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                    {createError instanceof Error ? createError.message : "Failed to save draft."}
                  </div>
                )}
                <div className="flex gap-3 pt-1">
                  <button
                    type="button" onClick={() => setShowCompose(false)}
                    className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  >Discard</button>
                  <button
                    type="submit" disabled={isCreating}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98] disabled:opacity-50"
                    style={{ background: "var(--lime)", color: "var(--bg-base)" }}
                  >
                    {isCreating ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </>
                    ) : "Save Draft"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="px-8 py-6 flex justify-between items-center shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>Gmail Module</span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1" style={{ color: "var(--text-primary)" }}>Gmail Drafts</h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Compose, view, and manage your email drafts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98]"
            style={{ background: "var(--lime)", color: "var(--bg-base)", boxShadow: "0 0 16px rgba(200,241,53,0.15)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Compose
          </button>
          <button
            onClick={() => refetchDrafts()} disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            <svg className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ color: isFetching ? "var(--lime)" : undefined }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            {isFetching ? "Syncing..." : "Refresh"}
          </button>
        </div>
      </header>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Draft List */}
        <div className="w-1/2 flex flex-col h-full overflow-y-auto" style={{ borderRight: "1px solid var(--border)" }}>
          {isFetching && parsedDrafts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5" style={{ color: "var(--text-secondary)" }} viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : parsedDrafts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <svg className="w-9 h-9 mb-3" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>No Drafts Found</p>
              <button onClick={() => setShowCompose(true)} className="mt-3 text-[10px] font-extrabold uppercase tracking-widest transition" style={{ color: "var(--lime)" }}>
                + Compose Draft
              </button>
            </div>
          ) : (
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              {parsedDrafts.map((draft: any) => {
                const isSelected = selectedDraft?.id === draft.id;
                return (
                  <button
                    key={draft.id}
                    onClick={() => setSelectedDraftId(draft.id)}
                    className="w-full text-left p-5 flex flex-col gap-2 transition-all duration-150"
                    style={{
                      borderBottom: "1px solid var(--border-muted)",
                      borderLeft: `2px solid ${isSelected ? "var(--lime)" : "transparent"}`,
                      background: isSelected ? "rgba(200,241,53,0.04)" : "transparent",
                    }}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[9px] font-bold tracking-widest uppercase font-mono truncate max-w-[70%]" style={{ color: "var(--text-secondary)" }}>
                        {draft.to}
                      </span>
                      <span className="text-[9px] font-mono shrink-0" style={{ color: "var(--text-muted)" }}>{draft.date}</span>
                    </div>
                    <h3 className="text-xs font-bold truncate" style={{ color: isSelected ? "var(--lime)" : "var(--text-primary)" }}>{draft.subject}</h3>
                    <p className="text-[11px] line-clamp-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{draft.snippet}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Draft Preview */}
        <div className="w-1/2 p-8 overflow-y-auto flex flex-col h-full" style={{ background: "var(--bg-surface)" }}>
          {selectedDraft ? (
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div className="space-y-3 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-sm font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{selectedDraft.subject}</h2>
                    <span className="text-[9px] font-mono shrink-0" style={{ color: "var(--text-secondary)" }}>{selectedDraft.date}</span>
                  </div>
                  <div className="space-y-1">
                    {[{ label: "From", val: selectedDraft.from }, { label: "To", val: selectedDraft.to }].map(({ label, val }) => (
                      <p key={label} className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                        <span className="font-extrabold uppercase tracking-widest mr-2" style={{ color: "var(--text-muted)", fontSize: "9px" }}>{label}</span>
                        {val}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className="min-h-[160px] p-5 rounded-xl text-xs leading-relaxed whitespace-pre-line"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  {selectedDraft.snippet}
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>ID: {selectedDraft.id}</span>
                <button
                  onClick={() => handleDelete(selectedDraft.id)}
                  disabled={deletingId === selectedDraft.id}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-40"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {deletingId === selectedDraft.id ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Draft
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <svg className="w-9 h-9 mb-3" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Select a draft to preview details.</p>
            </div>
          )}
          {(fetchError || deleteError) && (
            <div className="text-xs p-3.5 rounded-xl mt-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
              {fetchError instanceof Error ? fetchError.message : deleteError instanceof Error ? deleteError.message : "Something went wrong."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
