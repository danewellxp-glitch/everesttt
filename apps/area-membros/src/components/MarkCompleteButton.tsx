"use client";

import { useState } from "react";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface MarkCompleteButtonProps {
  lessonId: string;
  isCompleted: boolean;
}

export function MarkCompleteButton({
  lessonId,
  isCompleted: initialCompleted,
}: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: !completed }),
      });
      setCompleted(!completed);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-60 active:scale-[0.97]"
      style={completed ? {
        background: "rgba(20,184,166,0.12)",
        border: "1px solid rgba(20,184,166,0.3)",
        color: "#5EEAD4",
      } : {
        background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
        border: "1px solid rgba(59,130,246,0.3)",
        color: "white",
        boxShadow: "0 0 16px rgba(59,130,246,0.25)",
      }}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" />
      ) : completed ? (
        <CheckCircle size={15} />
      ) : (
        <Circle size={15} />
      )}
      {loading ? "Salvando..." : completed ? "Concluída ✓" : "Marcar como concluída"}
    </button>
  );
}
