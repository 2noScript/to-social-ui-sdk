import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FontOption } from "../types";

let cachedFonts: FontOption[] | null = null;

function resolveFontPath(filename: string): string {
  // 1. Try relative to current module directory
  try {
    const currentFile = fileURLToPath(import.meta.url);
    const candidate = path.resolve(path.dirname(currentFile), "../../assets/fonts", filename);
    if (fs.existsSync(candidate)) return candidate;
  } catch {}

  // 2. Try process.cwd()
  const cwdCandidate = path.resolve(process.cwd(), "assets/fonts", filename);
  if (fs.existsSync(cwdCandidate)) return cwdCandidate;

  // 3. Fallback to to-social-ui-sdk relative path
  const fallback = path.resolve(__dirname, "../../assets/fonts", filename);
  return fallback;
}

export function getDefaultFonts(): FontOption[] {
  if (cachedFonts) return cachedFonts;

  const regularPath = resolveFontPath("Inter-Regular.ttf");
  const boldPath = resolveFontPath("Inter-Bold.ttf");

  const fonts: FontOption[] = [];

  if (fs.existsSync(regularPath)) {
    const data = fs.readFileSync(regularPath);
    fonts.push({
      name: "Inter",
      data,
      weight: 400,
      style: "normal",
    });
  }

  if (fs.existsSync(boldPath)) {
    const data = fs.readFileSync(boldPath);
    fonts.push({
      name: "Inter",
      data,
      weight: 700,
      style: "normal",
    });
  }

  if (fonts.length === 0) {
    throw new Error(
      `[to-social-ui-sdk] Font files not found. Expected Inter-Regular.ttf at: ${regularPath}`
    );
  }

  cachedFonts = fonts;
  return fonts;
}
