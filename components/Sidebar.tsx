"use client";

import { MentorId, mentorList, Mentor } from "@/lib/mentors";
import Avatar from "./Avatar";
import Icon from "./Icon";

interface RecentChat {
  mentorId: MentorId;
  preview: string;
}

interface Props {
  activeId: MentorId;
  onSelect: (id: MentorId) => void;
  onNewChat: () => void;
  recentChats: RecentChat[];
}

export default function Sidebar({ activeId, onSelect, onNewChat, recentChats }: Props) {
  return (
    <aside className="w-[272px] shrink-0 h-full border-r flex flex-col" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-white text-black flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M5 6h14M5 12h14M5 18h9"/>
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tight" style={{ color: "var(--text)" }}>Mentor Chat</div>
          <div className="mono text-[10.5px]" style={{ color: "var(--text-faint)" }}>Scaler Academy · beta</div>
        </div>
      </div>

      {/* New chat */}
      <div className="px-3 mb-1">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border transition-colors group"
          style={{ background: "var(--panel-2)", borderColor: "var(--line)" }}
        >
          <span className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text)" }}>
            <Icon name="plus" className="w-3.5 h-3.5" style={{ color: "var(--text-dim)" }} />
            New conversation
          </span>
          <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>⌘N</span>
        </button>
      </div>

      {/* Mentor label */}
      <div className="px-5 pt-5 pb-2 flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-faint)" }}>Mentors</span>
        <span className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>3</span>
      </div>

      {/* Mentor cards */}
      <div className="px-2.5 flex flex-col gap-1">
        {mentorList.map((m: Mentor) => (
          <button
            key={m.id}
            data-accent={m.id}
            onClick={() => onSelect(m.id)}
            className={"mentor-card text-left rounded-xl p-2.5 pr-3 flex items-center gap-3 border border-transparent transition-colors hover:bg-white/[0.025] " + (activeId === m.id ? "active" : "")}
          >
            <Avatar mentor={m} size={36} active={activeId === m.id} />
            <div className="flex-1 min-w-0">
              <div className="mname text-[13px] font-medium truncate flex items-center gap-1.5" style={{ color: "var(--text-dim)" }}>
                {m.first}
                {activeId === m.id && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: m.accent, boxShadow: `0 0 8px ${m.accent}` }} />
                )}
              </div>
              <div className="mono text-[11px] truncate" style={{ color: "var(--text-faint)" }}>{m.role}</div>
            </div>
            {activeId === m.id && (
              <Icon name="chevron" className="w-3 h-3" style={{ color: "var(--text-faint)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Recent chats */}
      {recentChats.length > 0 && (
        <>
          <div className="px-5 pt-6 pb-2 flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-faint)" }}>Recent</span>
          </div>
          <div className="px-2.5 flex flex-col gap-0.5 overflow-y-auto">
            {recentChats.map((h, i) => {
              const m = mentorList.find(x => x.id === h.mentorId)!;
              return (
                <button
                  key={i}
                  onClick={() => onSelect(h.mentorId)}
                  className="text-left px-3 py-2 rounded-lg flex items-center gap-2.5 group transition-colors hover:bg-white/[0.025]"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.accent, opacity: 0.7 }} />
                  <span className="text-[12.5px] truncate flex-1 group-hover:text-white transition-colors" style={{ color: "var(--text-dim)" }}>{h.preview}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-auto p-3 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="px-2.5 py-2 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ background: "linear-gradient(135deg, #3f3f46, #18181b)", color: "var(--text)" }}>
            UB
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] truncate" style={{ color: "var(--text)" }}>Utkarsh</div>
            <div className="mono text-[10px]" style={{ color: "var(--text-faint)" }}>github.com/u7k4rs6</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
