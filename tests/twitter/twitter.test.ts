import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost } from "../../src/index";
import type { UnifiedContent } from "../../src/types";

const OUT_DIR = path.resolve("./output/twitter");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("🐦 X (Twitter) UI Templates", () => {
  const sampleTweet: UnifiedContent = {
    id: "1789456123456789",
    platform: "TWITTER",
    type: "POST",
    webUrl: "https://x.com/karpathy/status/1789456123456789",
    title: "AI Agent Reasoning",
    description: "The hottest new programming language is English. Autonomy in software engineering isn't just about code generation, it's about tool orchestration, self-healing loops, and rigorous verification.",
    author: {
      id: "karpathy",
      uniqueId: "karpathy",
      name: "Andrej Karpathy",
      isVerified: true,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    },
    stats: {
      likes: 48900,
      comments: 3240,
      shares: 11200,
      reposts: 11200,
      views: 2400000,
    },
    media: {
      coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
    },
    publishedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
  };

  test("renders X/Twitter Tweet Card (Dark Theme) and saves to output/twitter", async () => {
    const res = await renderPost(sampleTweet, { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "twitter_tweet_dark.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders X/Twitter Tweet Card (Light Theme) and saves to output/twitter", async () => {
    const res = await renderPost(sampleTweet, { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "twitter_tweet_light.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
