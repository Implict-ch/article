#!/bin/bash
# 用本机 Chrome 截图，不依赖 Playwright 浏览器下载
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
HTML="$DIR/小红书-封面-免机考政策讲解.html"
OUT="$DIR/小红书-封面-免机考政策讲解.png"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [[ ! -x "$CHROME" ]]; then
  echo "未找到 Google Chrome: $CHROME" >&2
  exit 1
fi

FILE_URL="file://${HTML}?shot=1"
# Chrome headless 对 file URL 带 query 有时挑剔，改用临时副本
TMP_HTML="$DIR/.shot-tmp.html"
sed 's/<body>/<body class="shot">/' "$HTML" > "$TMP_HTML"
FILE_URL="file://${TMP_HTML}"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1080,1440 \
  --screenshot="$OUT" \
  "$FILE_URL"

rm -f "$TMP_HTML"
ls -la "$OUT"
echo "done -> $OUT"
