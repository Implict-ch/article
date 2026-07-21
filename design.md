# 引言视频 · 设计规范（design.md）

> 基于 `引言/presentation` 华为校招求职公开课网页演示的实战沉淀。  
> 技术栈：Vite + React + TS，`paper-warm-gray` 主题，web-video-presentation 工作流。  
> 下次做同类 PPT / 录屏页时，优先遵守本文；实现细节另见 skill 内 `CHAPTER-CRAFT.md`。

---

## 1. 设计气质（一句话）

**纸白暖灰 · 产品文档感**：暖纸底、石灰色正文、单一琥珀强调；像 Notion / 飞书，不是发布会霓虹风。动效干净、偏「演示产品」节奏，不抢口播。

| 维度 | 本项目选择 |
|------|------------|
| 主题 | `paper-warm-gray`（纸白暖灰） |
| 舞台 | 固定 1920×1080，16:9，无响应式 |
| 推进 | 全局 step，点击 / 方向键；口播 = `narrations.ts` |
| 信息分工 | **口播讲全** · **画面只挂重点**（见 §6） |

---

## 2. 色彩与字体（必须用 token）

颜色、字体**禁止硬编码 hex / 字体名**，走 `presentation/src/styles/tokens.css`。

| Token | 用途 |
|-------|------|
| `--shell` / `--surface` / `--surface-2` | 舞台底、卡片底 |
| `--text` / `--text-2` / `--text-mute` / `--text-faint` | 正文层级 |
| `--accent` / `--accent-soft` | 强调、浅底标签 |
| `--rule` | 分割线、虚线底轨 |
| `--font-display-cn` / `--font-display-en` | 大标题中英混排 |
| `--font-body` | 正文、节点小字 |
| `--font-mono` | kicker、label-mono、角标 |

**强调色习惯**：一句标题里最多 1 处 `accent`（如「华为校招」琥珀 + 「求职公开课」黑）。

---

## 3. 排版层级（屏幕上写什么）

### 3.1 字号参考（本章实测）

| 层级 | 约字号 | 用法 |
|------|--------|------|
| 片头 / 过渡主标题 | `clamp(72px ~ 108px)` | 整屏一句 |
| 章节内容标题 | `clamp(56px ~ 80px)` | 如「这门课包含哪些部分？」 |
| 区块主文案 | 28–36px | 痛点墙单块标题 |
| 冲击句 | `clamp(48px ~ 72px)` | 如「才发现：没准备好」 |
| kicker / label-mono | 12–14px，大写感字距 | 章节归属、平台名 |
| 节点小字（SVG） | 14–15px | 路线节点名 |

### 3.2 留白

- 舞台安全区：`--stage-pad-x` 96px、`--stage-pad-y` 80px（`scene-pad`）
- 组件之间用 `--space-3` ~ `--space-7`，**宁可空也不要塞满**

---

## 4. 章节节奏模型（本片的结构）

```
片头封面（hook，1 step）
  → 章过渡 + 内容（pain-point：过渡 1 + 同页 5 拍）
  → 章过渡 + 内容 + 子概念过渡 + 内容（course-content）
```

| 章 | id | 步数 | 结构 |
|----|-----|------|------|
| 1 开场 | `hook` | 1 | **片头封面**（路线动画 + 三标签），无单独过渡页 |
| 2 为什么 | `pain-point` | 6 | **过渡** → 痛点墙同页 5 拍 |
| 3 内容与工具 | `course-content` | 3 | 课程路线单页 → **过渡「配套工具」** → 真截图 |

**全片约 13 step**，口播总长 ~1.5 分钟量级。

---

## 5. 过渡页规范（强制 · 每章/每概念）

> **原则**：每一个大章、每一个独立概念块，都应先有过渡页，再进内容页。  
> 片头第一章可用「封面」代替过渡；其余章、章内子概念（如「配套工具」）必须有过渡。

### 5.1 布局（自上而下 · 居中）

```
        [ SVG 图标 96×96 ]
        [ 可选 kicker · label-mono ]
        [ 大标题 1~2 行 · MaskReveal ]
        [ 琥珀横线 120px · scaleX 展开 ]
```

### 5.2 动效顺序（与本项目一致）

1. **图标**：整体 `scale(0→1)` 弹出（`ease-overshoot`，~0.55s）
2. **图标描边**：`pathLength=1` + `stroke-dashoffset` 描边（多 path 错峰）
3. **标题**：`MaskReveal` 逐段 wipe（延迟 ~350ms 起）
4. **横线**：`scaleX(0→1)`，`~0.65s`，`ease-expo`，延迟在标题之后

### 5.3 文案

- 主标题：**短问句或短名词**（≤10 字为佳），如「为什么做这个课？」「配套工具」
- kicker：可选一行，品牌 / 归属（塔子哥 · 华为校招求职公开课）
- **过渡页不写长段落**；解释留给下一页 + 口播

### 5.4 图标来源

- 使用 **Lucide**（ISC）标准 SVG，勿手画问号/竖线
- 本章已用：
  - `circle-question-mark` — 第二章过渡
  - `map` — 第三章「配套工具」过渡
- 新章按语义选 icon（路线、工具、列表等），风格统一：`stroke-width: 2`，`round` cap

### 5.5 代码锚点（复制结构）

- 第二章：[`02-pain-point/PainPoint.tsx`](presentation/src/chapters/02-pain-point/PainPoint.tsx) `step === 0` + [`PainPoint.css`](presentation/src/chapters/02-pain-point/PainPoint.css) `.pp-transition*`
- 第三章：[`03-course-content/CourseContent.tsx`](presentation/src/chapters/03-course-content/CourseContent.tsx) `step === 1` + `.cc-transition*`

横线样式统一：

```css
/* 宽 120px，高 4px，background: var(--accent)，scaleX 动画 */
```

---

## 6. 文字密度原则（重要 · 用户补充）

> **画面不是口播稿字幕。** 口播可以密，屏幕必须稀。

### 6.1 双源分工

| 来源 | 负责 |
|------|------|
| `script.md` | 节拍顺序、口播全文 |
| `article.md` | **画面可挂的细节池**（数字、案例、标签）— 择优上屏，不是全搬 |

### 6.2 每屏最多挂什么

- **1 个 hero**：一句标语 / 一个问题 / 一个冲击结论
- **+ 0~2 个支撑**：标签组、一条路线、一张截图
- **+ 可选 1 行 kicker**：mono 小字

### 6.3 反面清单（本项目曾犯、需避免）

| 避免 | 改为 |
|------|------|
| 痛点墙 5 块同时堆满副标题、辅助句 | 同页分 5 **拍** 逐块亮；每块 1 主句 + 最多 1 行辅助 |
| 路线节点下再叠长说明 | 节点上**仅阶段名**；维度用下方双卡概括 |
| 把 article 每句都做成 bullet | 只保留**口播不会念但观众需要看见**的信息 |
| 16:9 框硬塞竖图 | 按素材真实比例（如路线图 **2597×1701 ≈ 3:2**） |

### 6.4 自检一句

> 关掉声音看这一屏，能在 3 秒内抓住**一个重点**吗？不能 → 删字或拆拍。

---

## 7. 内容页视觉语汇（本片已验证）

### 7.1 六步路线（hook / course-content）

- 底轨：**全程虚线**（`stroke-dasharray: 10 8`）
- 实线：**琥珀色从左描到右**（`stroke-dashoffset` 动画）
- 节点：圆环 + 实心点；**文字与节点同 SVG 坐标**（`textAnchor="middle"`），避免 HTML grid 对不齐
- 节点到达时：字 + 圆 **同步弹出**（`--stop-delay` 按路径比例）

阶段命名注意：片头用「机考」，第三章口播用「笔试」— 跟 script 一致，跨章不强行统一。

### 7.2 痛点墙（第二章）

- **布局固定**的双列网格 + 底栏冲击句
- **同一 step 布局不变**；用 `visibility: hidden` 占位，多 step 逐块 `pp-block--visible`
- 冲击结论单独加大字号 + `accent`（「才发现：没准备好」）
- 平台区：placeholder 卡片，**不造假 logo**

### 7.3 截图 / 真素材

- 放 `presentation/public/`，`<img object-fit: contain>`
- `aspect-ratio` 用原图像素比，不用默认 16:9
- 截图页：标题略缩小，把空间让给图；CTA 一行即可

### 7.4 标签与卡片

- 主题承诺：白底描边 chip（经验分享 / 少踩坑 / …）
- 重要 / 不重要：双列 card，`accent-soft` vs 虚线灰底
- 踩坑区：浅琥珀底块，不另加彩色左边框（反 AI 味）

---

## 8. 动效节奏

| 类型 | 时长 / 曲线 | 场景 |
|------|-------------|------|
| 路线描边 | 2–2.4s `linear` | 六节点流水线 |
| 节点弹出 | ~0.45–0.5s `ease-overshoot` | 到点即亮 |
| 同页分拍间隔 | ~380ms 级 | 痛点墙（多 step） |
| 过渡 icon | pop 0.55s + 描边 0.7s | 章/概念过渡 |
| 标题 wipe | `MaskReveal` 0.8–0.9s | 大标题 |
| 横线展开 | 0.65s `ease-expo` | 过渡页底部 |

**禁止**：`setTimeout` 驱动步骤；整页无意义 fade 循环；紫粉渐变、emoji 图标、假数据。

---

## 9. 工程约定（换项目也适用）

```
引言/
├── article.md          # 画面细节源（不删）
├── script.md           # 口播节拍源
├── outline.md          # 章/step 计划 + 信息池
├── design.md           # 本文
└── presentation/
    └── src/chapters/<NN>-<id>/
        ├── <Chapter>.tsx
        ├── <Chapter>.css    # 类前缀 .hk- .pp- .cc-
        └── narrations.ts    # 长度 = step 数
```

- 改 step 数 → bump `useStepper.ts` 的 `STORAGE_KEY`
- 章间样式：颜色走 token；每章独立 CSS 前缀
- 参考 skill：`web-video-presentation` + `CHAPTER-CRAFT.md`

---

## 10. 本片章节 → 下个项目对照表

| 若你做… | 建议结构 |
|---------|----------|
| 新课程片头 | 1 页封面（大标题 + 核心图），可不算过渡 |
| 新章「问题 / 背景」 | **过渡页** + 内容（可同页多拍） |
| 新章「方法 / 清单」 | **过渡页** + 单页图或路线 |
| 新章「工具 / 演示」 | **过渡页** + 截图页（原图比例）+ 口播引导录屏 |
| 概念特别多 | 每概念 **1 过渡 + 1 内容**，不要一大页塞完全部 bullet |

---

## 11. 待改进（相对理想规范）

| 项 | 现状 | 建议下次 |
|----|------|----------|
| 第一章过渡 | 无独立过渡，直接封面 | 若严格「章章有过渡」，可加 0.5s「开始」过渡或把封面当过渡 |
| 第二章 kicker | 过渡页保留了 kicker | 可与第三章对齐：过渡页仅 icon + 标题 + 横线 |
| 文字量 | 痛点墙曾偏多 | 按 §6 做稿时先列「屏上最多 3 条」 |

---

## 12. 素材清单速查

| 素材 | 状态 | 路径 |
|------|------|------|
| 路线图截图 | ✅ | `引言/配套工具.png` → `public/roadmap-tool.png` |
| 塔子哥头像 | ⚠️ placeholder | |
| 平台 logo 碎片 | ⚠️ placeholder 文字 | |

---

*文档版本：与 `outline.md` 13 step 结构同步。修改章结构时请同步更新本文 §4、§11。*
