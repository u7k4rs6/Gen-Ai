"use client";

import { Mentor } from "@/lib/mentors";
import Avatar from "./Avatar";
import Icon, { IconName } from "./Icon";

interface Props {
  mentor: Mentor;
  onPick: (text: string) => void;
}

export default function Welcome({ mentor, onPick }: Props) {
  return (
    <div key={mentor.id} className="max-w-[760px] mx-auto px-8 pt-16 pb-10 fade-in">
      <div className="flex flex-col items-start gap-6">
        {/* Mentor identity */}
        <div className="flex items-center gap-5">
          <Avatar mentor={mentor} size={72} active />
          <div>
            <div className="mono text-[10.5px] uppercase tracking-[0.16em] mb-1.5 flex items-center gap-2" style={{ color: "var(--text-faint)" }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent, boxShadow: `0 0 10px ${mentor.accent}` }} />
              Mentor · online
            </div>
            <h1 className="serif text-[44px] leading-[1] tracking-tight text-white">
              {mentor.name}
            </h1>
            <div className="mt-1.5 text-[13.5px]" style={{ color: "var(--text-dim)" }}>
              <span style={{ color: "var(--text)" }}>{mentor.title}</span>
              <span className="mx-2" style={{ color: "var(--text-faint)" }}>·</span>
              <span>{mentor.role}</span>
            </div>
          </div>
        </div>

        <p className="text-[15.5px] leading-relaxed max-w-[58ch]" style={{ color: "var(--text-dim)" }}>
          {mentor.bio}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full pt-2">
          <div className="h-px flex-1" style={{ background: "var(--line)" }} />
          <span className="mono text-[10px] uppercase tracking-[0.16em] flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
            <Icon name="sparkle" className="w-3 h-3" style={{ color: mentor.accent }} />
            Suggested starters
          </span>
          <div className="h-px flex-1" style={{ background: "var(--line)" }} />
        </div>

        {/* Suggestion chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
          {mentor.suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onPick(s.text)}
              className="chip group text-left rounded-xl pl-4 pr-3 py-3.5 flex items-start gap-3"
            >
              <span
                className="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors group-hover:text-[var(--accent)]"
                style={{ background: "rgba(255,255,255,0.025)", color: "var(--text-dim)" }}
              >
                <Icon name={s.icon as IconName} className="w-3.5 h-3.5" />
              </span>
              <span className="text-[13.5px] leading-snug flex-1 pr-1" style={{ color: "var(--text)" }}>{s.text}</span>
              <Icon
                name="chevron"
                className="w-3 h-3 mt-1 transition-colors group-hover:text-[var(--accent)]"
                style={{ color: "var(--text-faint)" }}
              />
            </button>
          ))}
        </div>

        {/* Keyboard hints */}
        <div className="flex items-center gap-2 text-[11.5px] mono" style={{ color: "var(--text-faint)" }}>
          <span className="kbd">↹</span>
          <span>cycle mentors</span>
          <span className="mx-1.5">·</span>
          <span className="kbd">↵</span>
          <span>send</span>
          <span className="mx-1.5">·</span>
          <span className="kbd">⇧</span><span className="kbd">↵</span>
          <span>newline</span>
        </div>
      </div>
    </div>
  );
}
