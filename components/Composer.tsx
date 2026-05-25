"use client";

import { useEffect, useRef } from "react";
import { Mentor } from "@/lib/mentors";
import Icon from "./Icon";

interface Props {
  mentor: Mentor;
  value: string;
  setValue: (v: string) => void;
  onSend: () => void;
  busy: boolean;
}

export default function Composer({ mentor, value, setValue, onSend, busy }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [value]);

  return (
    <div className="px-8 pb-7 pt-2 relative z-10">
      <div className="max-w-[760px] mx-auto">
        <div
          className="composer rounded-2xl border transition-shadow"
          style={{
            borderColor: "var(--line-2)",
            background: "var(--panel-2)",
            boxShadow: "0 20px 50px -30px rgba(0,0,0,0.8)",
          }}
        >
          <div className="flex items-end gap-2 p-2.5">
            <textarea
              ref={taRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder={`Ask ${mentor.first} anything…`}
              rows={1}
              disabled={busy}
              className="flex-1 resize-none bg-transparent outline-none text-[14.5px] leading-relaxed pt-2 pb-1.5 px-1 max-h-[200px]"
              style={{ color: "var(--text)" }}
            />
            <button
              onClick={onSend}
              disabled={!value.trim() || busy}
              className="send-btn w-10 h-10 rounded-xl text-black flex items-center justify-center transition-all"
              aria-label="Send"
            >
              <Icon name="send" className="w-4 h-4" />
            </button>
          </div>

          {/* Meta row */}
          <div
            className="flex items-center justify-between px-4 pb-2.5 pt-0.5 border-t mt-0.5"
            style={{ borderColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-faint)" }}>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent }} />
                <span className="mono">{mentor.first.toLowerCase()}.v1</span>
              </span>
              <span>·</span>
              <span>Replies may be wrong — verify independently.</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] mono" style={{ color: "var(--text-faint)" }}>
              <span className="kbd">↵</span>
              <span>send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
