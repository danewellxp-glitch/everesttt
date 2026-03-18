interface LessonPlayerProps {
  videoUrl?: string | null;
}

export function LessonPlayer({ videoUrl }: LessonPlayerProps) {
  if (videoUrl) {
    return (
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
      >
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
      className="relative w-full rounded-xl flex items-center justify-center"
      style={{
        paddingBottom: "56.25%",
        background: "linear-gradient(135deg, #111318 0%, #1C2028 100%)",
        border: "1px solid #1C2028",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="text-5xl">⛰</span>
        <p className="text-everest-stone font-semibold">Aula em breve</p>
        <p className="text-everest-stone text-sm opacity-60">
          O vídeo desta aula será disponibilizado em breve
        </p>
      </div>
    </div>
  );
}
