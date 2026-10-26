import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderReel, renderComment, renderCommentThread } from "../../src/index";
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
      reactions: { like: 32000, love: 8900, care: 1200 },
    },
    media: {
      coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    },
    publishedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  };

  test("renders Facebook Post Card (Light Theme with reactions) and saves to output/facebook", async () => {
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

  test("renders Facebook Reel 9:16 Vertical Card and saves to output/facebook", async () => {
    const reelContent: UnifiedContent = {
      ...sampleFbPost,
      description: "Spectacular deployment of Europa Clipper solar arrays in orbit! 🛰️✨",
    };
    const res = await renderReel(reelContent);
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "fb_reel_vertical.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Facebook Comment Bubble with Love reaction and saves to output/facebook", async () => {
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
      reactionType: "love",
      isAuthorLiked: true,
      timestamp: Date.now() - 25 * 60 * 1000,
    };

    const res = await renderComment(sampleComment, "FACEBOOK", { theme: "light" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "fb_comment.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders Facebook Multi-Comment Thread with Pinned badge & nested replies", async () => {
    const threadComments: UnifiedComment[] = [
      {
        id: "c_root_1",
        contentId: "101584930129",
        text: "Official telemetry confirms all systems nominal. Next milestone: Mars gravity assist in 2025!",
        author: {
          id: "NASA",
          name: "NASA",
          isVerified: true,
          isAuthor: true,
        },
        isPinned: true,
        likes: 3420,
        reactionType: "love",
        timestamp: Date.now() - 2 * 3600 * 1000,
        replies: [
          {
            id: "c_rep_1",
            contentId: "101584930129",
            text: "Godspeed Europa Clipper! Such a proud moment for science! 🇺🇸🎉",
            author: { id: "sarah_k", name: "Sarah Jenkins" },
            likes: 154,
            timestamp: Date.now() - 90 * 60 * 1000,
          },
          {
            id: "c_rep_2",
            contentId: "101584930129",
            text: "Will the radar be able to penetrate 20km of ice crust?",
            author: { id: "tech_curious", name: "Alex Chen" },
            likes: 42,
            timestamp: Date.now() - 45 * 60 * 1000,
          },
        ],
      },
      {
        id: "c_root_2",
        contentId: "101584930129",
        text: "The engineering behind those 30-meter solar arrays in the radiation environment of Jupiter is mind-blowing.",
        author: {
          id: "engineer_bob",
          name: "Robert Downey",
        },
        likes: 620,
        reactionType: "like",
        isAuthorLiked: true,
        timestamp: Date.now() - 60 * 60 * 1000,
      },
    ];

    const res = await renderCommentThread(threadComments, "FACEBOOK", {
      title: "Comments",
      totalCount: 3820,
      theme: "dark",
    });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "fb_comment_thread_tree.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
