import * as fs from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const subsetFont = require("/home/omid.mousavimehr@part.local/.cache/pnpm/dlx/3da11603486842a5734e1f0af0d0356a/mvn5usjq-9ee2/node_modules/subset-font");

async function main() {
  console.log("=== Subsetting Variable Fonts with Axis Restriction ===");

  const charSet = new Set<string>();

  // Read all text from src/content/en.ts
  for (const c of fs.readFileSync("src/content/en.ts", "utf8")) {
    if (c >= " " && c <= "~") charSet.add(c);
  }
  // Add common symbols and ASCII used in UI
  for (const c of "·—–‘’“”«»…•⌘●+-/():,.!@#$%^&*[]{}<>|? ") charSet.add(c);

  const latinChars = Array.from(charSet).join("");

  // Subset Geist: retain weights 400-800 used across headings, telemetry, and body
  const geistInput = fs.readFileSync("src/fonts/Geist-Variable.woff2");
  const geistSubset = await subsetFont(geistInput, latinChars, {
    targetFormat: "woff2",
    noHinting: true,
    variationAxes: { wght: { min: 400, max: 800 } },
  });
  fs.writeFileSync("public/fonts/Geist-Variable.woff2", geistSubset);
  console.log(`Geist: ${geistInput.length} bytes -> ${geistSubset.length} bytes (${Math.round((1 - geistSubset.length / geistInput.length) * 100)}% reduction)`);

  // Persian text for Vazirmatn from src/content/fa.ts
  const persianText = " «·»،؛؟آأئابتثجحخدذرزسشصضطظعغفقلمنهوًپچژکگی۰۱۲۳۴۵۶۷۸۹‌–—…";

  // Subset Vazirmatn: retain weights 400-700 used in RTL body, headings, and badges
  const vazirInput = fs.readFileSync("src/fonts/Vazirmatn-Variable.woff2");
  const vazirSubset = await subsetFont(vazirInput, persianText, {
    targetFormat: "woff2",
    noHinting: true,
    variationAxes: { wght: { min: 400, max: 700 } },
  });
  fs.writeFileSync("public/fonts/Vazirmatn-Variable.woff2", vazirSubset);
  console.log(`Vazirmatn: ${vazirInput.length} bytes -> ${vazirSubset.length} bytes (${Math.round((1 - vazirSubset.length / vazirInput.length) * 100)}% reduction)`);
}

main().catch((err) => {
  console.error("Font optimization failed:", err);
  process.exit(1);
});
