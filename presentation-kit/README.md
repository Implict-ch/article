# presentation-kit

华为校招课程 **web-video-presentation** 的共享样式库。从 `引言/presentation` 与 `第一章-投递须知/presentation` 各章 CSS 中抽取、重命名为与业务无关的 `pres-*` class，供**新章节**复用。

## 约定

| 项 | 说明 |
|---|---|
| 前缀 | `pres-`（presentation shared），BEM：`pres-transition__title` |
| 依赖 | 各 `*/presentation/src` 内的 `tokens.css`、`base.css`（`.card` 等）；kit **不**单独打包 |
| 已有章节 | **禁止**改现有 TSX/CSS 中的 class 名（`hk-` `pp-` `cc-` `cv-` `tu-` `ch-` 等） |
| 新章节 | 先在本目录按场景选 class；章节 CSS 只写**坐标、文案变体、独有动效** |
| 扩展 | 无合适抽象时，在 `presentation-kit/` 新建模块并在 `index.css` 增加 `@import` |

## 新章开发：如何找 CSS

1. 打开本 README 的 **[组件索引](#组件索引)**，按画面类型（过渡页 / 双卡 / 流程线 / …）定位模块文件。
2. 在 TSX 使用对应 `pres-*` class；需要 `.card` 时继续用 presentation 全局 `base.css`。
3. 仅当布局坐标、特殊动画、本页独有结构无法在 kit 表达时，在 `chapters/xx-foo/Foo.css` 追加**章节前缀**样式（如 `.ld-wall .pres-block__title` 的定位）。
4. 若某模式会在 ≥2 章复现，把样式**上浮**到 `presentation-kit/` 并更新本 README，勿复制粘贴整段章节 CSS。

## 组件索引

| 画面类型 | 文件 | 主要 class |
|---|---|---|
| 关键帧 | `motion.css` | `pres-kf-*`（由其它模块 animation 引用） |
| 场景根 / 布局 | `scene.css` | `pres-scene`, `pres-accent`, `pres-layout--*`, `pres-animate--*` |
| 概念过渡页 | `transition.css` | `pres-transition`, `pres-transition__inner/icon/title/line` |
| 页眉标题 | `section-head.css` | `pres-head`, `pres-kicker`, `pres-title--lg/md/sm`, `pres-subtitle` |
| 片头大标题 | `cover-hero.css` | `pres-cover-hero`, `pres-cover-hero--tall` |
| 纵向目录时间轴 | `index-rail.css` | `pres-index`, `pres-index__row/num/label/hint` |
| 横向流程 SVG | `pipeline.css` | `pres-pipeline`, `pres-pipeline__draw/stop/node-*` |
| 卡片栅格 | `card-grid.css` | `pres-grid--2/3`, `pres-card--entry/pillar/stat` |
| 左右双卡对照 | `panel-duo.css` | `pres-duo`, `pres-duo__card/head/foot/outcome` |
| 居中焦点（URL 等） | `portal-focus.css` | `pres-focus`, `pres-focus__primary/secondary` |
| 标签 / 芯片 | `tag-chip.css` | `pres-chips`, `pres-chip`, `pres-chip--theme/info` |
| 同页逐步揭示 | `reveal.css` | `pres-reveal--*`, `pres-slot--*` |
| 底部说明卡 | `footnote.css` | `pres-callout`, `pres-callout__title/body` |
| 截图 / 工具步 | `media-frame.css` | `pres-media`, `pres-tool-step`, `pres-impact` |
| SVG 描边图标 | `icon-draw.css` | `pres-icon-stroke`, `pres-icon-stroke--draw` |
| 墙式多块排版 | `wall-block.css` | `pres-wall`, `pres-block__*`, `pres-flow-chain`, `pres-placeholder-*` |
| 纵向条目列表 | `list-stack.css` | `pres-list-stack`, `pres-list-stack__item/num/title/hint` + `pres-slot--*` 揭示 |
| 双列关键词对照 | `compare-pair.css` | `pres-compare`, `pres-compare--3`（三列）, `pres-compare__card/title/key/foot` |

## 与已有章节 class 对照（只读参考，勿批量替换）

| 抽象 (pres-*) | 引言 | 第一章 |
|---|---|---|
| `pres-scene` | `hk-scene` `pp-scene` `cc-scene` | `cv-scene` `tu-scene` `ch-scene` |
| `pres-accent` | `hk-accent` `cc-accent` | `cv-accent` `tu-accent` `ch-accent` |
| `pres-cover-hero` | `hk-hero-block` | `cv-hero-block` |
| `pres-title--lg` | `hk-hero-title` | `cv-hero-title` |
| `pres-index__*` | — | `cv-index-*` |
| `pres-pipeline__*` | `hk-route` `hk-path-*` `hk-stop` | `cc-route` `cc-path-*` |
| `pres-transition__*` | `pp-transition*` `cc-transition*` | `tu-transition*` `ch-transition*` |
| `pres-wall` + `pres-reveal--*` | `pp-wall` `pp-block--*` | — |
| `pres-card--pillar` | `cc-pillar*` | — |
| `pres-grid--2` + entry | — | `tu-sources` `tu-source` |
| `pres-card--stat` | — | `tu-tier*` |
| `pres-duo__*` | — | `tu-duo-*` |
| `pres-focus` + chips + callout | — | `ch-portal` `ch-tag` `ch-hr-card` |

## 在新 presentation 中引用（可选）

开发新章时可将 kit 作为**查阅手册**复制 class 名到 TSX；若希望全局生效，在 presentation 入口样式增加（路径按实际工程调整）：

```css
@import "../../../presentation-kit/index.css";
```

已有 `引言`、`第一章-投递须知` 工程**未**自动 import，避免与章节内重复定义冲突。
