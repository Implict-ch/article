export type TargetUniversityRegion = {
  id: string;
  name: string;
  count: string;
  schools: readonly string[];
};

/** 来源：第一章投递须知配套工具「目标院校清单」 */
export const TARGET_UNIVERSITY_REGIONS: readonly TargetUniversityRegion[] = [
  {
    id: "shandong-jiangsu",
    name: "山东江苏",
    count: "6所+5",
    schools: [
      "南京大学",
      "河海大学",
      "东南大学",
      "江南大学",
      "南京邮电大学",
      "中国矿业大学",
      "南京航空航天大学",
      "南京信息工程大学",
      "南京理工大学",
      "中国石油大学（华东）",
      "山东大学",
    ],
  },
  {
    id: "jingjin-northeast",
    name: "京津东北",
    count: "16所+13",
    schools: [
      "清华大学",
      "中国石油大学（北京）",
      "北京大学",
      "中央财经大学",
      "中国人民大学",
      "对外经济贸易大学",
      "南开大学",
      "北京工业大学",
      "天津大学",
      "北京化工大学",
      "北京航空航天大学",
      "中国矿业大学（北京）",
      "北京理工大学",
      "中国地质大学（北京）",
      "北京邮电大学",
      "大连海事大学",
      "哈尔滨工业大学",
      "北京外国语大学",
      "吉林大学",
      "北京第二外国语大学",
      "大连理工大学",
      "东北财经大学",
      "东北大学",
      "中国科学院大学",
      "哈尔滨工程大学",
    ],
  },
  {
    id: "gba",
    name: "粤港澳",
    count: "8所+1",
    schools: [
      "香港中文大学",
      "澳门大学",
      "香港科技大学",
      "香港大学",
      "中山大学",
      "华南理工大学",
      "南方科技大学",
      "暨南大学",
      "深圳大学",
    ],
  },
  {
    id: "chengyu",
    name: "成渝",
    count: "5所",
    schools: [
      "电子科技大学",
      "西南交通大学",
      "重庆邮电大学",
      "重庆大学",
      "四川大学",
    ],
  },
  {
    id: "shanghai-hefei",
    name: "上海合肥",
    count: "8所+2",
    schools: [
      "复旦大学",
      "上海财经大学",
      "上海交通大学",
      "上海外国语大学",
      "同济大学",
      "华东师范大学",
      "上海大学",
      "东华大学",
      "华东理工大学",
      "中国科学技术大学",
    ],
  },
  {
    id: "xian",
    name: "西安",
    count: "3所+3",
    schools: [
      "西安交通大学",
      "西安外国语大学",
      "兰州大学",
      "西北大学",
      "西北工业大学",
      "西安邮电大学",
      "西安电子科技大学",
      "长安大学",
    ],
  },
  {
    id: "wuhan-changsha",
    name: "武汉长沙",
    count: "5所+1",
    schools: [
      "华中科技大学",
      "武汉理工大学",
      "湖南大学",
      "中南大学",
      "武汉大学",
      "国防科技大学",
    ],
  },
  {
    id: "hangzhou-xiamen",
    name: "杭州厦门",
    count: "3所+1",
    schools: ["浙江大学", "福州大学", "厦门大学", "杭州电子科技大学"],
  },
] as const;

const byId = Object.fromEntries(
  TARGET_UNIVERSITY_REGIONS.map((r) => [r.id, r]),
) as Record<string, TargetUniversityRegion>;

/** 一页 1～2 张地区卡片 */
export const PAGES: readonly {
  id: string;
  regionIds: readonly string[];
}[] = [
  { id: "jingjin", regionIds: ["jingjin-northeast", "hangzhou-xiamen"] },
  { id: "east-south", regionIds: ["shandong-jiangsu", "gba"] },
  { id: "east-west", regionIds: ["shanghai-hefei", "xian"] },
  { id: "central-west", regionIds: ["wuhan-changsha", "chengyu"] },
] as const;

export function regionsForPage(pageIndex: number): TargetUniversityRegion[] {
  const page = PAGES[pageIndex];
  if (!page) return [];
  return page.regionIds.map((id) => byId[id]!);
}
