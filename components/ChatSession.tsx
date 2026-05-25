"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MentorId, mentors, mentorList } from "@/lib/mentors";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import MessageEntry from "./MessageEntry";
import StatusIndicator from "./StatusIndicator";
import Composer from "./Composer";
import Avatar from "./Avatar";

interface Interaction {
  role: "user" | "assistant";
  content: string;
}

type Conversations = Record<MentorId, Interaction[]>;

export default function ChatSession() {
  const [activeId, setActiveId] = useState<MentorId>("anshuman");
  const [convos, setConvos] = useState<Conversations>({ anshuman: [], abhimanyu: [], kshitij: [] });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mentor = mentors[activeId];
  const messages = convos[activeId];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeId]);

  // Tab cycles through mentors
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && !e.shiftKey && (document.activeElement as HTMLElement)?.tagName !== "TEXTAREA") {
        e.preventDefault();
        const i = mentorList.findIndex(m => m.id === activeId);
        setActiveId(mentorList[(i + 1) % mentorList.length].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  const sendMessage = useCallback(async (content: string) => {
    const text = content.trim();
    if (!text || isLoading) return;
    setError(null);

    const userMessage: Interaction = { role: "user", content: text };
    const updatedMessages = [...convos[activeId], userMessage];

    setConvos(c => ({ ...c, [activeId]: updatedMessages }));
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, mentorId: activeId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setConvos(c => ({
        ...c,
        [activeId]: [...updatedMessages, { role: "assistant", content: data.message }],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setConvos(c => ({ ...c, [activeId]: convos[activeId] }));
    } finally {
      setIsLoading(false);
    }
  }, [activeId, convos, isLoading]);

  const handleMentorChange = (id: MentorId) => {
    setActiveId(id);
    setError(null);
  };

  const newChat = () => {
    setConvos(c => ({ ...c, [activeId]: [] }));
    setInput("");
    setError(null);
  };

  // Build recent chats from non-empty conversations
  const recentChats = mentorList
    .filter(m => convos[m.id].length > 0)
    .map(m => ({
      mentorId: m.id,
      preview: convos[m.id][0].content.slice(0, 48) + (convos[m.id][0].content.length > 48 ? "…" : ""),
    }));

  return (
    <div className="h-screen w-full flex" data-accent={activeId}>
      <Sidebar
        activeId={activeId}
        onSelect={handleMentorChange}
        onNewChat={newChat}
        recentChats={recentChats}
      />

      <main className="flex-1 h-full relative flex flex-col overflow-hidden">
        <div className="ambient" />
        <div className="absolute inset-0 grid-bg opacity-[0.6] pointer-events-none" />

        {/* Topbar */}
        <div className="relative z-10 px-8 pt-5 pb-3 flex items-center border-b" style={{ borderColor: "rgba(31,31,36,0.6)" }}>
          <div className="flex items-center gap-3">
            <Avatar mentor={mentor} size={28} />
            <div className="leading-tight">
              <div className="text-[13px] font-medium" style={{ color: "var(--text)" }}>{mentor.name}</div>
              <div className="mono text-[10.5px] flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: mentor.accent, boxShadow: `0 0 8px ${mentor.accent}` }} />
                online · {mentor.title}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll area */}
        <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <Welcome mentor={mentor} onPick={sendMessage} />
          ) : (
            <div className="max-w-[760px] mx-auto px-8 pt-8 pb-6">
              {/* Conversation header */}
              <div className="flex items-center gap-3 pb-6 mb-2 border-b" style={{ borderColor: "rgba(31,31,36,0.6)" }}>
                <Avatar mentor={mentor} size={40} active />
                <div>
                  <div className="serif text-[22px] leading-none text-white">{mentor.name}</div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] mt-1" style={{ color: "var(--text-faint)" }}>{mentor.role}</div>
                </div>
              </div>

              {messages.map((msg, i) => (
                <MessageEntry key={i} interaction={msg} mentor={mentor} />
              ))}

              {isLoading && <StatusIndicator mentor={mentor} />}

              {error && (
                <div className="flex justify-center mb-6">
                  <div className="text-[12px] px-4 py-2 rounded-full border" style={{ color: "#f87171", background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.15)" }}>
                    {error}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="relative">
          <div className="absolute inset-x-0 -top-10 h-10 pointer-events-none z-10" style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
          <Composer mentor={mentor} value={input} setValue={setInput} onSend={() => sendMessage(input)} busy={isLoading} />
        </div>
      </main>
    </div>
  );
}
