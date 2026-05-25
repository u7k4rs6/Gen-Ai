"use client";

export type IconName =
  | "compass" | "rocket" | "switch" | "metric"
  | "code" | "layers" | "clean" | "target"
  | "tree" | "graph" | "bug" | "puzzle"
  | "send" | "plus" | "sparkle" | "chevron"
  | "settings" | "history";

interface Props {
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
}

export default function Icon({ name, className = "w-4 h-4", style }: Props) {
  const base = {
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
    style,
  };
  switch (name) {
    case "compass":  return <svg {...base}><circle cx="12" cy="12" r="9"/><polygon points="15 9 11 13 9 15 13 11"/></svg>;
    case "rocket":   return <svg {...base}><path d="M5 15c0-5 4-10 9-10 0 5-4 10-9 10z"/><path d="M9 15s-2 2-2 4 4-2 4-2"/><circle cx="12" cy="9" r="1.2"/></svg>;
    case "switch":   return <svg {...base}><path d="M4 7h12l-3-3"/><path d="M20 17H8l3 3"/></svg>;
    case "metric":   return <svg {...base}><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19H2"/></svg>;
    case "code":     return <svg {...base}><polyline points="8 8 4 12 8 16"/><polyline points="16 8 20 12 16 16"/><line x1="14" y1="6" x2="10" y2="18"/></svg>;
    case "layers":   return <svg {...base}><polygon points="12 3 22 9 12 15 2 9 12 3"/><polyline points="2 15 12 21 22 15"/></svg>;
    case "clean":    return <svg {...base}><path d="M5 12l4 4L19 6"/></svg>;
    case "target":   return <svg {...base}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>;
    case "tree":     return <svg {...base}><circle cx="12" cy="5" r="2"/><circle cx="6" cy="13" r="2"/><circle cx="18" cy="13" r="2"/><circle cx="6" cy="20" r="1.5"/><circle cx="12" cy="20" r="1.5"/><path d="M12 7v0M12 7l-6 4M12 7l6 4M6 15v3M18 15v0M6 18l6 2M18 15l-6 5"/></svg>;
    case "graph":    return <svg {...base}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M8 6h8M6 8v8M18 8v8M8 7l3 3M16 7l-3 3M8 17l3-3M16 17l-3-3"/></svg>;
    case "bug":      return <svg {...base}><rect x="8" y="8" width="8" height="12" rx="4"/><path d="M3 13h5M16 13h5M5 7l3 2M19 7l-3 2M5 19l3-2M19 19l-3-2"/></svg>;
    case "puzzle":   return <svg {...base}><path d="M10 4h4v3a2 2 0 1 0 4 0v3h-4a2 2 0 1 1 0 4h4v3h-4a2 2 0 1 0-4 0H6v-4a2 2 0 1 1 0-4H6V7h4a2 2 0 1 0 0-3z"/></svg>;
    case "send":     return <svg {...base} strokeWidth={1.8}><path d="M5 12l14-7-4 14-3-6-7-1z"/></svg>;
    case "plus":     return <svg {...base}><path d="M12 5v14M5 12h14"/></svg>;
    case "sparkle":  return <svg {...base}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z"/><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8L16.5 18.5l1.8-.7L19 16z"/></svg>;
    case "chevron":  return <svg {...base}><polyline points="9 6 15 12 9 18"/></svg>;
    case "settings": return <svg {...base}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.26 7.13l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.18.43.6 1 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/></svg>;
    case "history":  return <svg {...base}><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/><polyline points="12 7 12 12 16 14"/></svg>;
    default: return null;
  }
}
