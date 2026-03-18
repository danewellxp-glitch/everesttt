export type CampLevel =
  | "base-camp"
  | "camp-1"
  | "camp-2"
  | "camp-3"
  | "camp-4"
  | "cume"

export type CampConfig = {
  label:      string
  emoji:      string
  minLessons: number
  color:      string
}

export const CAMP_CONFIG: Record<CampLevel, CampConfig> = {
  "base-camp": { label: "Base Camp", emoji: "🏕", minLessons: 0,  color: "#8B949E" },
  "camp-1":    { label: "Camp 1",    emoji: "🧠", minLessons: 5,  color: "#1F6FEB" },
  "camp-2":    { label: "Camp 2",    emoji: "🔁", minLessons: 10, color: "#F78166" },
  "camp-3":    { label: "Camp 3",    emoji: "⚙️", minLessons: 15, color: "#E3B341" },
  "camp-4":    { label: "Camp 4",    emoji: "🚀", minLessons: 20, color: "#8B5CF6" },
  "cume":      { label: "Cume",      emoji: "🏔", minLessons: 25, color: "#E3B341" },
}

export function getCampFromProgress(completedLessons: number): CampLevel {
  if (completedLessons >= 25) return "cume"
  if (completedLessons >= 20) return "camp-4"
  if (completedLessons >= 15) return "camp-3"
  if (completedLessons >= 10) return "camp-2"
  if (completedLessons >= 5)  return "camp-1"
  return "base-camp"
}

export type PlanType = "monthly" | "annual"

export type PurchaseStatus = "approved" | "refunded" | "cancelled"

export interface UserPublic {
  id:    string
  name:  string | null
  email: string
}
