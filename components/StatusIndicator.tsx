import { Mentor } from "@/lib/mentors";
import Avatar from "./Avatar";

interface Props {
  mentor: Mentor;
}

export default function StatusIndicator({ mentor }: Props) {
  return (
    <div className="msg-enter flex items-start gap-3 mb-6">
      <Avatar mentor={mentor} size={32} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[12.5px] font-medium" style={{ color: mentor.accent }}>{mentor.first}</span>
          <span className="mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-faint)" }}>thinking…</span>
        </div>
        <div className="flex items-center gap-1.5 h-6">
          <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent, animationDelay: "0ms" }} />
          <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent, animationDelay: "150ms" }} />
          <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent, animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
