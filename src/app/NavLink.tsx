"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavLink({ href, label }: { href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "0.75rem 1.5rem",
        paddingLeft: isHovered ? "2rem" : "1.5rem",
        color: "white",
        textDecoration: "none",
        fontSize: "0.95rem",
        fontWeight: "500",
        transition: "all 0.2s",
        background: isHovered ? "rgba(255,255,255,0.15)" : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </Link>
  );
}
