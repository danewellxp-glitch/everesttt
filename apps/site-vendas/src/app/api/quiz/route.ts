import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const QuizSchema = z.object({
  answers: z.array(z.number().min(1).max(4)).length(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = QuizSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }

  const total = parsed.data.answers.reduce((sum, val) => sum + val, 0);

  let level: string;
  let emoji: string;
  let description: string;

  if (total <= 9) {
    level = "BASE CAMP";
    emoji = "🔴";
    description =
      "Você ainda está construindo sua base. Foco: sono, energia, organização.";
  } else if (total <= 14) {
    level = "CAMP 1";
    emoji = "🟠";
    description =
      "Você começou a subir, mas ainda luta com foco, distrações e procrastinação.";
  } else if (total <= 17) {
    level = "CAMP 2";
    emoji = "🟡";
    description = "Você já entende hábitos, mas precisa consolidar disciplina.";
  } else if (total <= 19) {
    level = "CAMP 3";
    emoji = "🔵";
    description =
      "Você já tem consistência. Agora precisa acelerar o crescimento.";
  } else {
    level = "CUME";
    emoji = "🟣";
    description =
      "Você está entre as pessoas mais disciplinadas. O desafio agora é expansão.";
  }

  return NextResponse.json({ total, level, emoji, description });
}
