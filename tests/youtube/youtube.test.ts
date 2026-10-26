import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderComment } from "../../src/index";
import type { UnifiedContent, UnifiedComment } from "../../src/types";

const OUT_DIR = path.resolve("./output/youtube");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("▶️ YouTube UI Templates", () => {
  const sampleYtVideo: UnifiedContent = {
    id: "dQw4w9WgXcQ",
    platform: "YOUTUBE",
    type: "VIDEO",
    webUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Building an Autonomous Coding Agent from Scratch in TypeScript",
    author: {
      id: "tech_lead",
      name: "Fireship Code",
      isVerified: true,
    },
    stats: {
      views: 384000,
      likes: 29500,
      comments: 1420,
    },
    media: {
      video: {
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        durationSec: 754, // 12:34
      },
      coverUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600",
    },
    publishedAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
  };

  test("renders YouTube Video Card and saves to output/youtube", async () => {
    const res = await renderPost(sampleYtVideo, { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "youtube_video_card.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders YouTube Comment Thread and saves to output/youtube", async () => {
    const sampleComment: UnifiedComment = {
      id: "yt_c1",
      contentId: "dQw4w9WgXcQ",
      text: "This explanation of Satori and vector rendering is by far the cleanest one on YouTube. Subscribed!",
      author: {
        id: "dev_junior",
        name: "Alex Dev",
        isVerified: false,
      },
      likes: 312,
      timestamp: Date.now() - 12 * 3600 * 1000,
    };

    const res = await renderComment(sampleComment, "YOUTUBE", { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "youtube_comment.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
