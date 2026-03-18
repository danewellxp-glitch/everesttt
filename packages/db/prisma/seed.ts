import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const modules = [
  {
    title: "Base Camp",
    slug: "base-camp",
    description:
      "Nenhuma grande ascensão começa sem uma base sólida. Aqui você constrói a fundação: sono, energia e saúde como pilares de tudo.",
    emoji: "🏕",
    campLabel: "BASE CAMP",
    order: 1,
    lessons: [
      {
        title: "Por que o sono é o hábito número 1",
        slug: "sono-habito-numero-1",
        order: 1,
      },
      {
        title: "Como otimizar sua energia ao longo do dia",
        slug: "otimizar-energia",
        order: 2,
      },
      {
        title: "A ciência do exercício físico e hábitos",
        slug: "ciencia-exercicio",
        order: 3,
      },
      {
        title: "Saúde mental como base da produtividade",
        slug: "saude-mental-base",
        order: 4,
      },
      {
        title: "Entendendo seu ritmo biológico",
        slug: "ritmo-biologico",
        order: 5,
      },
    ],
  },
  {
    title: "Camp 1 — Clareza Mental",
    slug: "camp-1-clareza-mental",
    description:
      "Quem controla a própria mente controla a própria vida. Aprenda a focar, eliminar distrações e organizar o caos mental.",
    emoji: "🧠",
    campLabel: "CAMP 1",
    order: 2,
    lessons: [
      {
        title: "Como funciona o controle da atenção",
        slug: "controle-da-atencao",
        order: 1,
      },
      {
        title: "Técnicas de redução de distrações",
        slug: "reducao-de-distracoes",
        order: 2,
      },
      {
        title: "Organização mental e clareza de prioridades",
        slug: "organizacao-mental",
        order: 3,
      },
      {
        title: "Dopamina: o combustível dos hábitos",
        slug: "dopamina-combustivel",
        order: 4,
      },
      {
        title: "Construindo um sistema de foco diário",
        slug: "sistema-foco-diario",
        order: 5,
      },
    ],
  },
  {
    title: "Camp 2 — Reprogramação de Hábitos",
    slug: "camp-2-reprogramacao",
    description:
      "A trivialidade da excelência. Quebre os padrões sabotadores e construa novos comportamentos que funcionam de verdade.",
    emoji: "🔁",
    campLabel: "CAMP 2",
    order: 3,
    lessons: [
      {
        title: "Como identificar padrões sabotadores",
        slug: "padroes-sabotadores",
        order: 1,
      },
      {
        title: "Motivação vs Disciplina: a verdade",
        slug: "motivacao-vs-disciplina",
        order: 2,
      },
      {
        title: "Arquitetura comportamental na prática",
        slug: "arquitetura-comportamental",
        order: 3,
      },
      {
        title: "O loop do hábito e como quebrá-lo",
        slug: "loop-do-habito",
        order: 4,
      },
      {
        title: "Reprogramando crenças limitantes",
        slug: "reprogramando-crencas",
        order: 5,
      },
    ],
  },
  {
    title: "Camp 3 — Constância",
    slug: "camp-3-constancia",
    description:
      "O topo pertence a quem continua subindo. Aqui você constrói a rotina inteligente que sustenta resultados no longo prazo.",
    emoji: "⚙️",
    campLabel: "CAMP 3",
    order: 4,
    lessons: [
      {
        title: "Construindo uma rotina inteligente",
        slug: "rotina-inteligente",
        order: 1,
      },
      {
        title: "Produtividade sem esgotamento",
        slug: "produtividade-sem-esgotamento",
        order: 2,
      },
      {
        title: "Gestão de energia (não de tempo)",
        slug: "gestao-de-energia",
        order: 3,
      },
      {
        title: "A arte da persistência estratégica",
        slug: "persistencia-estrategica",
        order: 4,
      },
      {
        title: "Como manter hábitos nos dias difíceis",
        slug: "habitos-dias-dificeis",
        order: 5,
      },
    ],
  },
  {
    title: "Camp 4 — Expansão",
    slug: "camp-4-expansao",
    description:
      "Quem aprende mais rápido sobe mais alto. Acelere sua curva de aprendizado e desenvolva uma mentalidade de crescimento real.",
    emoji: "🚀",
    campLabel: "CAMP 4",
    order: 5,
    lessons: [
      {
        title: "Técnicas de estudo eficiente",
        slug: "estudo-eficiente",
        order: 1,
      },
      {
        title: "Aprendizado acelerado na prática",
        slug: "aprendizado-acelerado",
        order: 2,
      },
      {
        title: "Desenvolvimento pessoal com intenção",
        slug: "desenvolvimento-pessoal",
        order: 3,
      },
      {
        title: "Mentalidade de crescimento (Growth Mindset)",
        slug: "growth-mindset",
        order: 4,
      },
      {
        title: "Construindo uma biblioteca mental",
        slug: "biblioteca-mental",
        order: 5,
      },
    ],
  },
  {
    title: "Cume — Autodomínio",
    slug: "cume-autodominio",
    description:
      "O verdadeiro topo é o domínio de si mesmo. Autoconhecimento profundo, liderança pessoal e direção de vida.",
    emoji: "🏔",
    campLabel: "CUME",
    order: 6,
    lessons: [
      {
        title: "O caminho do autoconhecimento profundo",
        slug: "autoconhecimento-profundo",
        order: 1,
      },
      {
        title: "Liderança pessoal: lidere a si mesmo primeiro",
        slug: "lideranca-pessoal",
        order: 2,
      },
      {
        title: "Encontrando sua direção de vida",
        slug: "direcao-de-vida",
        order: 3,
      },
      {
        title: "Alta performance mental sustentável",
        slug: "alta-performance-mental",
        order: 4,
      },
      {
        title: "Sua escalada não termina aqui",
        slug: "escalada-continua",
        order: 5,
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const moduleData of modules) {
    const { lessons, ...moduleFields } = moduleData;

    const module = await prisma.module.upsert({
      where: { slug: moduleFields.slug },
      update: { ...moduleFields, isPublished: true },
      create: { ...moduleFields, isPublished: true },
    });

    for (const lessonData of lessons) {
      await prisma.lesson.upsert({
        where: { slug: lessonData.slug },
        update: { ...lessonData, moduleId: module.id, isPublished: true },
        create: { ...lessonData, moduleId: module.id, isPublished: true },
      });
    }

    console.log(`✅ Module "${module.title}" seeded`);
  }

  console.log("🏔 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
