"use client";

import { Mentor, mentorList, MentorId } from "@/lib/mentors";

interface Props {
  active: MentorId;
  onChange: (id: MentorId) => void;
}

export default function MentorSelector({ active, onChange }: Props) {
  return (
    <div className="flex flex-row gap-3 p-1.5 bg-gray-200/50 rounded-2xl w-full">
      {mentorList.map((mentor: Mentor) => (
        <button
          key={mentor.id}
          onClick={() => onChange(mentor.id)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-[14px] text-xs font-black transition-all flex-1 justify-center relative overflow-hidden group
            ${
              active === mentor.id
                ? `bg-white ${mentor.color} shadow-sm ring-1 ring-black/5`
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-300/50"
            }`}
        >
          <span
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-colors
              ${active === mentor.id ? mentor.bgColor : "bg-gray-300/50 text-gray-500"}`}
          >
            {mentor.avatar}
          </span>
          <span className="uppercase tracking-widest truncate">
            {mentor.name.split(" ")[0]}
          </span>
          {active === mentor.id && (
            <div className={`absolute bottom-0 left-0 h-0.5 w-full ${mentor.color.replace('text-', 'bg-')}`} />
          )}
        </button>
      ))}
    </div>
  );
}
