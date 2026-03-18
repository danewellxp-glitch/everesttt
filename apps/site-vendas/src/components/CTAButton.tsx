"use client"

interface CTAButtonProps {
  text: string
  className?: string
  size?: "default" | "large"
}

export function CTAButton({ text, className = "", size = "default" }: CTAButtonProps) {
  const checkoutUrl = process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL || "#"

  const sizeClasses = {
    default: "px-8 py-4 text-base",
    large:   "px-10 py-5 text-lg",
  }

  return (
    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-extrabold text-white rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-lg ${sizeClasses[size]} ${className}`}
      style={{
        background:  "linear-gradient(135deg, #F92726 0%, #A61919 100%)",
        boxShadow:   "0 8px 24px rgba(249,39,38,0.35)",
        letterSpacing: "0.01em",
      }}
    >
      {text}
    </a>
  )
}
