const fs = require("fs");
const path = require("path");

const globalModules = path.join(
  process.env.APPDATA || process.env.HOME || "",
  "npm",
  "node_modules"
);
if (!module.paths.includes(globalModules)) {
  module.paths.unshift(globalModules);
}

const { chromium } = require("playwright");

const baseDir = __dirname;
const outDir = path.join(baseDir, "截图");
const baseUrl = process.env.PPT_URL || "http://localhost:5182/";
const pageCount = 5;
const itemSize = 29;

const PAGE_NAMES = [
  "00-封面",
  "01-软件算法-信息数理化",
  "02-数学-网络安全",
  "03-人工智能-超算计算",
  "04-会议论文-期刊论文",
];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1700 },
    deviceScaleFactor: 1,
  });

  await context.addInitScript(
    ({ size }) => {
      localStorage.setItem("xhs-exemption-item-size", String(size));
      localStorage.setItem("xhs-exemption-34-v2", "0");
    },
    { size: itemSize }
  );

  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForSelector(".stage-frame");
  await page.waitForTimeout(800);

  await page.addStyleTag({
    content: `
      .stage-fitter {
        width: 1080px !important;
        height: 1440px !important;
      }
      .stage-frame {
        transform: none !important;
        width: 1080px !important;
        height: 1440px !important;
      }
      /* 导出时隐藏编辑用 UI，避免叠进 3:4 画幅 */
      .settings-panel,
      .page-dots {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .scene,
      .ex34-cover,
      .ex34-page,
      .ex34-card,
      .ex34-cover__mag,
      .ex34-cover__hero,
      .ex34-cover__foot {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
  await page.waitForTimeout(300);

  await page.evaluate((size) => {
    const frame = document.querySelector(".stage-frame");
    if (frame) frame.style.setProperty("--ex34-item-size", `${size}px`);
  }, itemSize);

  // 圆点已隐藏，用键盘翻页；先回到封面
  await page.keyboard.press("Home");
  await page.waitForTimeout(400);

  for (let i = 0; i < pageCount; i++) {
    if (i > 0) {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(500);
    }

    await page.evaluate((size) => {
      const frame = document.querySelector(".stage-frame");
      if (frame) frame.style.setProperty("--ex34-item-size", `${size}px`);
    }, itemSize);
    await page.waitForTimeout(200);

    const name = PAGE_NAMES[i] || `page-${String(i + 1).padStart(2, "0")}`;
    const png = `${name}.png`;
    const cover = page.locator(".stage-frame");
    const box = await cover.boundingBox();
    await cover.screenshot({ path: path.join(outDir, png), type: "png" });
    console.log(
      "saved",
      png,
      box ? `${Math.round(box.width)}x${Math.round(box.height)}` : ""
    );
  }

  await browser.close();
  console.log("done ->", outDir);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
