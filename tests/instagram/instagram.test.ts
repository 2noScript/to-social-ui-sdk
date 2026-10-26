import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderReel } from "../../src/index";
import type { UnifiedContent } from "../../src/types";

const OUT_DIR = path.resolve("./output/instagram");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("📸 Instagram UI Templates", () => {
  const sampleIgPost: UnifiedContent = {
    id: "31415926535",
    platform: "INSTAGRAM",
    type: "POST",
    webUrl: "https://www.instagram.com/p/31415926535/",
    title: "Golden Hour in Tokyo",
    description: "Lost in Shibuya crossing as the golden hour turns into neon night. Tokyo, you always have my heart. ✨🗼 #tokyo #japan #goldenhour #travelphotography",
    author: {
      id: "traveler_ken",
      uniqueId: "ken.visuals",
      name: "Ken Visuals",
      isVerified: true,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    stats: {
      likes: 84300,
      comments: 1240,
    },
    media: {
      coverUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600",
    },
    publishedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  };

  test("renders Instagram Feed Post Card (Dark Theme) and saves to output/instagram", async () => {
    const res = await renderPost(sampleIgPost, { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "instagram_post_dark.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Instagram Feed Post Card (Light Theme) and saves to output/instagram", async () => {
    const res = await renderPost(sampleIgPost, { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "instagram_post_light.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
