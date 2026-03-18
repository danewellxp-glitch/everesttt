import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[#111318] border border-[#1C2028] rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
