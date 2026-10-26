import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderComment } from "../../src/index";
import type { UnifiedContent, UnifiedComment } from "../../src/types";

const OUT_DIR = path.resolve("./output/tiktok");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("🎵 TikTok UI Templates", () => {
  const sampleTikTokPost: UnifiedContent = {
    id: "7689468618823847189",
    platform: "TIKTOK",
    type: "VIDEO",
    webUrl: "https://www.tiktok.com/@gordonramsayofficial/video/7689468618823847189",
    description: "The secret to the ultimate scrambled eggs! No salt until the end! 🍳🔥 #cooking #chef #ramsay #foodtok",
    author: {
      id: "gordonramsay",
      uniqueId: "gordonramsayofficial",
      name: "Gordon Ramsay",
      isVerified: true,
    },
    stats: {
      likes: 1250000,
      comments: 18400,
      bookmarks: 94300,
      shares: 32100,
    },
    media: {
      audio: {
        title: "Cooking Beat Vol. 1",
        author: "Gordon Ramsay Audio",
      },
      coverUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
    },
    publishedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
  };

  test("renders TikTok Video Card and saves to output/tiktok", async () => {
    const res = await renderPost(sampleTikTokPost);
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);
    expect(res.height).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "tiktok_video_card.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders TikTok Comment Row and saves to output/tiktok", async () => {
    const sampleComment: UnifiedComment = {
      id: "tt_c1",
      contentId: "7689468618823847189",
      text: "Tried this recipe this morning and it literally changed my life! So fluffy!! 👏",
      author: {
        id: "foodie_sarah",
        name: "Sarah Baker",
        uniqueId: "sarah_bakes",
      },
      likes: 12400,
      timestamp: Date.now() - 4 * 3600 * 1000,
    };

    const res = await renderComment(sampleComment, "TIKTOK", { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "tiktok_comment.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
