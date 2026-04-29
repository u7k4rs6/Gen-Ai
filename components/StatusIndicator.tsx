export default function StatusIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-sm font-black text-gray-400 flex-shrink-0 animate-pulse border border-gray-200/50">
        ...
      </div>
      <div className="bg-white border border-gray-100 rounded-3xl rounded-tl-none px-6 py-4 shadow-md shadow-gray-200/10">
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{name}</p>
          <span className="h-1 w-1 rounded-full bg-gray-200" />
          <p className="text-[10px] font-bold text-gray-300 uppercase italic">Thinking</p>
        </div>
        <div className="flex gap-1.5 items-center h-4">
          <span className="w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 bg-blue-500/60 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 bg-blue-500/80 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
