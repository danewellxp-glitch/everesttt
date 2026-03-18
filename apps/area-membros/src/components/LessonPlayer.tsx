"use client";

interface LessonPlayerProps {
  videoUrl?: string | null;
}

export function LessonPlayer({ videoUrl }: LessonPlayerProps) {
  if (videoUrl) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{
          paddingBottom: "56.25%",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
        <iframe
          src={videoUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen"
          style={{ border: "none" }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-2xl flex items-center justify-center"
      style={{
        paddingBottom: "56.25%",
        background: "linear-gradient(135deg, #0E1117 0%, #131823 50%, #0E1117 100%)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        {/* Glow ring */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.2)",
              boxShadow: "0 0 40px rgba(59,130,246,0.1)",
            }}>
            ⛰
          </div>
        </div>
        <div className="text-center">
          <p className="text-everest-snow font-heading font-semibold text-lg mb-1">Aula em breve</p>
          <p className="text-everest-stone text-sm">
            O vídeo desta aula será disponibilizado em breve
          </p>
        </div>
      </div>
    </div>
  );
}
