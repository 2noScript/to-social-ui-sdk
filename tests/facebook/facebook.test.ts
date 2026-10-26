import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderComment } from "../../src/index";
import type { UnifiedContent, UnifiedComment } from "../../src/types";

const OUT_DIR = path.resolve("./output/facebook");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("📘 Facebook UI Templates", () => {
  const sampleFbPost: UnifiedContent = {
    id: "101584930129",
    platform: "FACEBOOK",
    type: "POST",
    webUrl: "https://www.facebook.com/NASA/posts/101584930129",
    title: "Europa Clipper Mission Update",
    description: "After traveling millions of miles, NASA's Europa Clipper has successfully entered deep space on its voyage to investigate whether Jupiter's icy moon could harbor conditions suitable for life. 🚀🌌",
    author: {
      id: "NASA",
      name: "NASA - National Aeronautics and Space Administration",
      isVerified: true,
      avatarUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=150",
    },
    stats: {
      likes: 42100,
      comments: 3820,
      shares: 12400,
      reactions: { like: 35000, love: 7100 },
    },
    media: {
      coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    },
    publishedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  };

  test("renders Facebook Post Card (Light Theme) and saves to output/facebook", async () => {
    const res = await renderPost(sampleFbPost, { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "fb_post_light.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Facebook Post Card (Dark Theme) and saves to output/facebook", async () => {
    const res = await renderPost(sampleFbPost, { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "fb_post_dark.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Facebook Comment Bubble and saves to output/facebook", async () => {
    const sampleComment: UnifiedComment = {
      id: "fb_c1",
      contentId: "101584930129",
      text: "Incredible engineering achievement! Cannot wait for the first subsurface radar readings of Europa's ocean! 🛰️",
      author: {
        id: "astronomer_dan",
        name: "Dr. Daniel Astro",
        isVerified: true,
      },
      likes: 842,
      timestamp: Date.now() - 25 * 60 * 1000,
    };

    const res = await renderComment(sampleComment, "FACEBOOK", { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "fb_comment.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
