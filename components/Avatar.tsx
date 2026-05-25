"use client";

import { Mentor } from "@/lib/mentors";
import Image from "next/image";

interface Props {
  mentor: Mentor;
  size?: number;
  active?: boolean;
}

export default function Avatar({ mentor, size = 36, active = false }: Props) {
  const accent2 = mentor.accent2;

  if (mentor.photo) {
    return (
      <div
        className={"orb " + (active ? "orb-active" : "")}
        style={{ width: size, height: size, "--accent": mentor.accent, "--accent-2": accent2 } as React.CSSProperties}
      >
        <Image
          src={mentor.photo}
          alt={mentor.name}
          width={size}
          height={size}
          className="w-full h-full object-cover rounded-full relative z-10"
        />
      </div>
    );
  }

  return (
    <div
      className={"orb " + (active ? "orb-active" : "")}
      style={{ width: size, height: size, "--accent": mentor.accent, "--accent-2": accent2 } as React.CSSProperties}
      aria-hidden="true"
    >
      <span style={{ fontSize: size * 0.42 }}>{mentor.initials}</span>
    </div>
  );
}
