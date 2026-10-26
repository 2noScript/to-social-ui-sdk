import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost } from "../../src/index";
import type { UnifiedContent } from "../../src/types";

const OUT_DIR = path.resolve("./output/bilibili");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("📺 Bilibili UI Templates", () => {
  const sampleBiliVideo: UnifiedContent = {
    id: "BV1xx411c7mD",
    platform: "BILIBILI",
    type: "VIDEO",
    webUrl: "https://www.bilibili.com/video/BV1xx411c7mD",
    title: "【4K60帧】全网最强逆向工程解析！从Smali到Native Hook全流程实战",
    author: {
      id: "8920192",
      name: "硬核极客小张",
      isVerified: true,
    },
    stats: {
      views: 182000,
      comments: 4890,
      likes: 21300,
    },
    media: {
      coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    },
    publishedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
  };

  test("renders Bilibili Video Card and saves to output/bilibili", async () => {
    const res = await renderPost(sampleBiliVideo, { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "bilibili_video_card.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
