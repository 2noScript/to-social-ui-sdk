import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderProfile } from "../../src/index";
import type { UnifiedAuthor } from "../../src/types";

const OUT_DIR = path.resolve("./output/profile");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("👤 Social Profile UI Templates", () => {
  const sampleAuthor: UnifiedAuthor = {
    id: "openai",
    uniqueId: "openai",
    name: "OpenAI Research",
    bio: "Creating safe artificial general intelligence (AGI) that benefits all of humanity. Building GPT, DALL·E, and Sora.",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    isVerified: true,
    stats: {
      followers: 3200000,
      following: 120,
      totalLikes: 89000000,
      postCount: 1420,
    },
  };

  test("renders Social Profile Card (Dark Theme) and saves to output/profile", async () => {
    const res = await renderProfile(sampleAuthor, "TIKTOK", { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);
    expect(res.width).toBeGreaterThan(0);

    const outPath = path.join(OUT_DIR, "profile_card_dark.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Social Profile Card (Light Theme) and saves to output/profile", async () => {
    const res = await renderProfile(sampleAuthor, "YOUTUBE", { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "profile_card_light.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
