export type ExemptionCategory = {
  id: string;
  title: string;
  items: readonly string[];
  /** 论文卡等特殊展示 */
  kind?: "contest" | "paper";
  hint?: string;
};

/** 来源：第一章第一节课 · 免试条件竞赛列表 */
export const EXEMPTION_CATEGORIES: readonly ExemptionCategory[] = [
  {
    id: "01",
    title: "软件算法",
    items: [
      "ICPC 国际程序设计竞赛",
      "华为软件挑战赛",
      "华为嵌入式软件大赛",
      "等",
    ],
  },
  {
    id: "02",
    title: "信息数理化",
    items: [
      "IOI 国际奥赛",
      "IMO 国际奥赛",
      "IPhO 国际奥赛",
      "IChO 国际奥赛",
      "全球总决赛参赛选手",
      "国家决赛参赛选手",
    ],
  },
  {
    id: "03",
    title: "数学",
    items: [
      "IMC 国际大学生数学竞赛",
      "全美数模 MCM",
      "全美数模 ICM",
      "全国数学建模竞赛",
      "研究生数学建模竞赛",
    ],
  },
  {
    id: "04",
    title: "网络安全",
    items: ["CTF 夺旗赛"],
  },
  {
    id: "05",
    title: "人工智能",
    items: ["RoboCup 机器人世界杯", "研究生 AI 创新大赛"],
  },
  {
    id: "06",
    title: "超算计算",
    items: [
      "ASC 国际超算竞赛 冠亚季军队伍",
      "SC 国际超算竞赛 冠亚季军队伍",
      "ISC 国际超算竞赛 冠亚季军队伍",
    ],
  },
  {
    id: "07",
    title: "会议论文/期刊论文",
    kind: "paper",
    items: [],
    hint: "通常需要 A会/A刊",
  },
] as const;

const byId = Object.fromEntries(
  EXEMPTION_CATEGORIES.map((c) => [c.id, c]),
) as Record<string, ExemptionCategory>;

/** 一页 1～2 张卡片 */
export const PAGES: readonly {
  id: string;
  categoryIds: readonly string[];
}[] = [
  { id: "algo-olympiad", categoryIds: ["01", "02"] },
  { id: "math-security", categoryIds: ["03", "04"] },
  { id: "ai-hpc", categoryIds: ["05", "06"] },
  { id: "paper", categoryIds: ["07"] },
] as const;

export function categoriesForPage(pageIndex: number): ExemptionCategory[] {
  const page = PAGES[pageIndex];
  if (!page) return [];
  return page.categoryIds.map((id) => byId[id]!);
}
