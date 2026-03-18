export function validateHotmartToken(token: string): boolean {
  const expectedToken = process.env.HOTMART_WEBHOOK_TOKEN;
  if (!expectedToken) return false;
  return token === expectedToken;
}

export function generateTempPassword(length = 12): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function getPlanFromOffer(offerId: string): "monthly" | "annual" {
  const annualKeywords = ["anual", "annual", "yearly", "year"];
  const lowerOfferId = offerId.toLowerCase();
  return annualKeywords.some((k) => lowerOfferId.includes(k))
    ? "annual"
    : "monthly";
}

export function calculateExpiresAt(plan: "monthly" | "annual"): Date {
  const now = new Date();
  if (plan === "annual") {
    now.setFullYear(now.getFullYear() + 1);
  } else {
    now.setDate(now.getDate() + 30);
  }
  return now;
}
