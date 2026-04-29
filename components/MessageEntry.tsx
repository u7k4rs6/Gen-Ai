import { Mentor } from "@/lib/mentors";

interface Interaction {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  interaction: Interaction;
  mentor: Mentor;
}

export default function MessageEntry({ interaction, mentor }: Props) {
  const isUser = interaction.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[85%] bg-blue-600 text-white rounded-3xl rounded-br-none px-6 py-4 shadow-lg shadow-blue-600/10">
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{interaction.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 mb-6 group">
      <div
        className={`w-10 h-10 rounded-2xl ${mentor.bgColor} flex items-center justify-center text-sm font-black ${mentor.color} flex-shrink-0 shadow-sm border border-current/5`}
      >
        {mentor.avatar}
      </div>
      <div className="max-w-[85%] bg-white border border-gray-100 rounded-3xl rounded-bl-none px-6 py-4 shadow-md shadow-gray-200/20 group-hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-2 mb-1.5">
          <p className={`text-[10px] font-black uppercase tracking-widest ${mentor.color}`}>{mentor.name}</p>
          <span className="h-1 w-1 rounded-full bg-gray-200" />
          <p className="text-[10px] font-bold text-gray-300 uppercase">Mentor</p>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">{interaction.content}</p>
      </div>
    </div>
  );
}
