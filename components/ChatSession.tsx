"use client";

import { useState, useRef, useEffect } from "react";
import { MentorId, mentors } from "@/lib/mentors";
import MentorSelector from "./MentorSelector";
import MessageEntry from "./MessageEntry";
import StatusIndicator from "./StatusIndicator";

interface Interaction {
  role: "user" | "assistant";
  content: string;
}

export default function ChatSession() {
  const [currentMentor, setCurrentMentor] = useState<MentorId>("anshuman");
  const [messages, setMessages] = useState<Interaction[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const mentor = mentors[currentMentor];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleMentorChange = (id: MentorId) => {
    if (id === currentMentor) return;
    setCurrentMentor(id);
    setMessages([]);
    setError(null);
    setInput("");
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    setError(null);

    const userMessage: Interaction = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          mentorId: currentMentor,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Request failed");

      const assistantMessage: Interaction = {
        role: "assistant",
        content: data.message,
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setMessages(messages);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 selection:bg-blue-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase">Scaler Mentors</h1>
            <p className="text-xs font-medium text-gray-400">Guiding your tech journey</p>
          </div>
          <div
            className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm ${mentor.bgColor} ${mentor.color} border border-current/10`}
          >
            Active: {mentor.name}
          </div>
        </div>
      </header>

      <div className="max-w-4xl w-full mx-auto px-4 py-2">
        <MentorSelector active={currentMentor} onChange={handleMentorChange} />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div
                className={`w-20 h-20 rounded-2xl rotate-3 shadow-xl ${mentor.bgColor} flex items-center justify-center text-3xl font-bold ${mentor.color} mb-6 transform hover:rotate-0 transition-transform duration-300`}
              >
                {mentor.avatar}
              </div>
              <h2 className={`text-2xl font-black mb-2 ${mentor.color}`}>
                {mentor.name}
              </h2>
              <p className="text-sm text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">{mentor.title}</p>
              
              <div className="w-full max-w-xl">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="h-px w-8 bg-gray-200" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select a topic to start</span>
                  <div className="h-px w-8 bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mentor.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="text-left text-sm bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-gray-700 font-medium group"
                    >
                      <span className="group-hover:text-blue-600 transition-colors">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageEntry key={i} interaction={msg} mentor={mentor} />
          ))}

          {isLoading && <StatusIndicator name={mentor.name} />}

          {error && (
            <div className="flex justify-center mb-6">
              <div className="bg-red-50/50 backdrop-blur-sm border border-red-100 text-red-600 text-xs px-5 py-2.5 rounded-full font-medium">
                {error}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-5">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${mentor.name.split(" ")[0]}...`}
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all max-h-40 overflow-y-auto font-medium"
            style={{ minHeight: "56px" }}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] font-bold text-gray-300 text-center mt-3 uppercase tracking-widest">
          Enter to send · Shift+Enter for newline
        </p>
      </footer>
    </div>
  );
}
