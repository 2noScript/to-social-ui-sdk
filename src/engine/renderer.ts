import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs/promises";
import type { ReactNode } from "react";
import type { RenderOptions, RenderResult } from "../types";
import { getDefaultFonts } from "./fonts";

export async function renderElementToImage(
  element: ReactNode,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const width = options.width || 600;
  const height = options.height;
  const scale = options.scale || 2; // Default 2x retina sharpness

  const fonts = options.customFonts && options.customFonts.length > 0
    ? options.customFonts
    : getDefaultFonts();

  // 1. Generate SVG via Satori
  const svg = await satori(element as any, {
    width,
    height,
    fonts: fonts as any,
  });

  // 2. Render SVG to high-res PNG via Rust-backed Resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "zoom",
      value: scale,
    },
    background: undefined, // Transparent unless styled in component
  });

  const pngData = resvg.render();
  const png = Buffer.from(pngData.asPng());
  const finalWidth = pngData.width;
  const finalHeight = pngData.height;

  return {
    png,
    svg,
    width: finalWidth,
    height: finalHeight,
    asBuffer(): Buffer {
      return png;
    },
    asSvg(): string {
      return svg;
    },
    asDataUrl(): string {
      return `data:image/png;base64,${png.toString("base64")}`;
    },
    async saveToFile(filePath: string): Promise<string> {
      await fs.writeFile(filePath, png);
      return filePath;
    },
  };
}
