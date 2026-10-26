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

  // 1. Generate SVG via Satori with emoji support
  const satoriOptions: any = {
    width,
    fonts: fonts as any,
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        try {
          const hex = Array.from(segment)
            .map((c) => c.codePointAt(0)!.toString(16))
            .filter((c) => c !== "fe0f")
            .join("-");
          const res = await fetch(`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${hex}.svg`);
          if (res.ok) {
            const svgText = await res.text();
            return `data:image/svg+xml;base64,${Buffer.from(svgText).toString("base64")}`;
          }
        } catch {
          // Gracefully continue if network error
        }
      }
      return undefined;
    },
  };
  if (height) {
    satoriOptions.height = height;
  }

  const svg = await satori(element as any, satoriOptions);

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
