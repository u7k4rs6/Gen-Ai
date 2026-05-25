import { Mentor } from "@/lib/mentors";
import Avatar from "./Avatar";

interface Interaction {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  interaction: Interaction;
  mentor: Mentor;
}

function renderMd(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(p))     return <em key={i} style={{ color: "var(--text)" }}>{p.slice(1, -1)}</em>;
    return <span key={i}>{p}</span>;
  });
}

export default function MessageEntry({ interaction, mentor }: Props) {
  const isUser = interaction.role === "user";

  if (isUser) {
    return (
      <div className="msg-enter flex justify-end mb-5">
        <div
          className="max-w-[78%] rounded-2xl rounded-br-md px-4 py-3 text-[14.5px] leading-relaxed font-medium"
          style={{ background: "#fff", color: "#0a0a0b" }}
        >
          {interaction.content}
        </div>
      </div>
    );
  }

  return (
    <div className="msg-enter flex items-start gap-3 mb-6">
      <Avatar mentor={mentor} size={32} />
      <div className="flex-1 min-w-0 max-w-[82%]">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[12.5px] font-medium" style={{ color: mentor.accent }}>{mentor.first}</span>
          <span className="mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-faint)" }}>
            {mentor.role.split(" · ")[0]}
          </span>
        </div>
        <div className="bubble text-[14.5px] leading-[1.65] whitespace-pre-wrap" style={{ color: "var(--text)" }}>
          {interaction.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ marginTop: i ? "0.85em" : 0 }}>{renderMd(para)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
