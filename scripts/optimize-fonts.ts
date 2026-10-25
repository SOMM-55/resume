import * as fs from "node:fs";
import * as path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const subsetFont = require("/home/omid.mousavimehr@part.local/.cache/pnpm/dlx/3da11603486842a5734e1f0af0d0356a/mvn5usjq-9ee2/node_modules/subset-font");

async function main() {
  console.log("=== Subsetting Variable Fonts ===");

  const charSet = new Set<string>();

  // Printable ASCII
  for (let c = 32; c <= 126; c++) {
    charSet.add(String.fromCharCode(c));
  }

  // Common typography & symbols
  const extraSymbols = "—–‘’“”«»‹›…•·†‡°±×÷≠≤≥≈∞µπ∑√∫~`!@#$%^&*()_+-=[]{}|;':\",./<>?€$£¥₹₽₩¢©®™¶§";
  for (const ch of extraSymbols) charSet.add(ch);

  // Persian & Arabic characters
  const persianLetters = "آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئءأإؤۀةكيكىي‌‍،؛؟٪۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩";
  for (const ch of persianLetters) charSet.add(ch);

  // Read all text from src
  function scanDir(dir: string) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (!["node_modules", ".next", ".git"].includes(f)) scanDir(full);
      } else if (/\.(tsx?|json|css|md)$/.test(f)) {
        const text = fs.readFileSync(full, "utf-8");
        for (const ch of text) charSet.add(ch);
      }
    }
  }
  scanDir("src");

  // Latin characters set for Geist
  const latinChars = Array.from(charSet)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code < 0x0600 || code > 0x06ff;
    })
    .join("");

  // Full character set for Vazirmatn
  const fullChars = Array.from(charSet).join("");

  // Subset Geist
  const geistInput = fs.readFileSync("public/fonts/Geist-Variable.woff2.bak");
  const geistSubset = await subsetFont(geistInput, latinChars, { targetFormat: "woff2" });
  fs.writeFileSync("public/fonts/Geist-Variable.woff2", geistSubset);
  console.log(`Geist: ${geistInput.length} bytes -> ${geistSubset.length} bytes (${Math.round((1 - geistSubset.length / geistInput.length) * 100)}% reduction)`);

  // Subset Vazirmatn
  const vazirInput = fs.readFileSync("public/fonts/Vazirmatn-Variable.woff2.bak");
  const vazirSubset = await subsetFont(vazirInput, fullChars, { targetFormat: "woff2" });
  fs.writeFileSync("public/fonts/Vazirmatn-Variable.woff2", vazirSubset);
  console.log(`Vazirmatn: ${vazirInput.length} bytes -> ${vazirSubset.length} bytes (${Math.round((1 - vazirSubset.length / vazirInput.length) * 100)}% reduction)`);
}

main().catch((err) => {
  console.error("Font optimization failed:", err);
  process.exit(1);
});
