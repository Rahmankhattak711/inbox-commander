"use client";
import { Sparkles, Calendar, Inbox, Send, FileText, Command } from "lucide-react";

export default function HeroMockup() {
  return (
    <div className="relative max-w-6xl mx-auto mt-20 w-full animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      {/* Decorative Outer Glow */}
      <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-30 pointer-events-none" style={{ background: "var(--lime-dim)" }} />

      {/* Main Mockup Container */}
      <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-surface)] flex flex-col h-[500px] md:h-[600px] ring-1 ring-[var(--border-muted)]">

        {/* Fake Browser Top Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-muted)] bg-[var(--bg-base)]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="mx-auto px-6 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-muted)] text-[10px] text-[var(--text-secondary)] flex items-center justify-center min-w-[200px]">
            app.inboxcommander.ai/dashboard
          </div>
        </div>

        {/* App Layout */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <div className="hidden md:flex flex-col w-72 border-r border-[var(--border-muted)] bg-[var(--bg-surface)] p-2">
            <div className="flex items-center gap-3 mb-10 px-2 pt-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--lime)] text-[var(--bg-base)] flex items-center justify-center shadow-[0_0_15px_var(--lime-glow)]">
                <Command className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold uppercase tracking-widest text-sm text-[var(--text-primary)]">
                Inbox Commander
              </span>
            </div>

            <nav className="space-y-1 flex-1">
              <p className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-muted)] text-[var(--text-primary)] transition-colors">
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4 text-[var(--lime)]" />
                  <span className="text-sm font-medium">Inbox</span>
                </div>
                <span className="text-[10px] bg-[var(--lime)]/10 text-[var(--lime)] border border-[var(--lime)]/20 px-1.5 py-0.5 rounded">4</span>
              </p>
              <p className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Send className="w-4 h-4" />
                  <span className="text-sm font-medium">Sent</span>
                </div>
              </p>
              <p className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Drafts</span>
                </div>
                <span className="text-[10px] bg-[var(--border-muted)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded">2</span>
              </p>
              <p className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Calendar</span>
                </div>
              </p>
            </nav>

            <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-[var(--lime)]/20 bg-[var(--lime-glow)] text-[var(--lime)] hover:bg-[var(--lime)]/15 transition-all mt-auto group">
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Assistant</span>
            </button>
          </div>

          {/* Inbox List */}
          <div className="hidden sm:flex flex-col w-80 border-r border-[var(--border-muted)] bg-[var(--bg-base)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-muted)]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--text-secondary)]">Inbox</span>
              <span className="text-[10px] bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-muted)] w-5 h-5 flex items-center justify-center rounded-full">4</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {[
                { name: "Sarah Chen", initial: "SC", subject: "Q3 investor update deck", active: false, unread: true },
                { name: "Marcus Reed", initial: "MR", subject: "Re: Partnership proposal", active: true, unread: true },
                { name: "Alex Kim", initial: "AK", subject: "Quick sync tomorrow?", active: false, unread: false },
                { name: "Design Team", initial: "DT", subject: "Figma comments on v3", active: false, unread: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 border-b border-[var(--border-muted)] cursor-pointer transition-colors ${item.active ? 'bg-[var(--bg-card)] relative' : 'hover:bg-[var(--bg-surface)]/50'}`}
                >
                  {item.active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--lime)]" />}
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-muted)] flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)] shrink-0">
                    {item.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm truncate ${item.active || item.unread ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}>{item.name}</span>
                      {item.unread && <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] shrink-0 shadow-[0_0_8px_var(--lime)]" />}
                    </div>
                    <span className="text-xs text-left text-[var(--text-secondary)]/80 truncate block">{item.subject}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email View */}
          <div className="flex-1 flex flex-col text-left bg-[var(--bg-surface)] relative">
            {/* Email Header */}
            <div className="p-6 md:p-8 border-b border-[var(--border-muted)] bg-[var(--bg-card)]/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)] shrink-0">
                  MR
                </div>
                <div>
                  <div className="text-[var(--text-primary)] font-medium text-sm">Marcus Reed</div>
                  <div className="text-xs text-[var(--text-secondary)]">marcus@partner.io · 10:42 AM</div>
                </div>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2">Re: Partnership proposal</h1>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-6 text-xs md:p-8 overflow-y-auto pb-28">
              <div className="prose prose-invert prose-sm max-w-none text-[var(--text-primary)]/80 space-y-4">
                <p>Hey there,</p>
                <p>Thanks for sending over the revised partnership proposal. I've had a chance to review it with the team and we're really excited about the potential here.</p>
                <p>The updated timeline makes a lot more sense given our upcoming product launch. I just have two minor questions regarding the API rate limits outlined in section 3.</p>
                <p>Could we jump on a quick 15-minute call tomorrow to iron out these final details?</p>
                <p>Best,<br /><span className="text-[var(--text-secondary)]">Marcus</span></p>
              </div>
            </div>

            {/* AI Draft Input */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--lime-dim)] to-[var(--lime)] opacity-15 rounded-xl blur transition group-hover:opacity-30" />
                <div className="relative flex items-center gap-3 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl">
                  <Sparkles className="w-5 h-5 text-[var(--lime)] animate-pulse" />
                  <input
                    type="text"
                    placeholder="Draft a reply saying yes to the call, suggest 2pm or 3pm EST..."
                    className="bg-transparent border-none outline-none flex-1 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    disabled
                  />
                  <div className="px-2 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-muted)] text-[10px] text-[var(--text-secondary)] flex items-center gap-1">
                    <Command className="w-3 h-3" />
                    Enter
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
