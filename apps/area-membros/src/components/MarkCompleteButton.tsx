"use client";

import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
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
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 disabled:opacity-60 ${
        completed
          ? "bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30"
          : "bg-everest-red hover:bg-everest-red-dark text-white"
      }`}
    >
      {completed ? (
        <CheckCircle size={16} />
      ) : (
        <Circle size={16} />
      )}
      {loading ? "..." : completed ? "Concluída" : "Marcar como concluída"}
    </button>
  );
}
