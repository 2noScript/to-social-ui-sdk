import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";
import { renderPost, renderComment, renderCommentThread } from "../../src/index";
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
      avatarUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150",
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

  test("renders TikTok Comment Row with Creator Liked Badge and saves to output/tiktok", async () => {
    const sampleComment: UnifiedComment = {
      id: "tt_c1",
      contentId: "7689468618823847189",
      text: "Tried this recipe this morning and it literally changed my life! So fluffy!! 👏",
      author: {
        id: "foodie_sarah",
        name: "Sarah Baker",
        uniqueId: "sarah_bakes",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      },
      isPinned: true,
      isAuthorLiked: true,
      likes: 12400,
      timestamp: Date.now() - 4 * 3600 * 1000,
      replies: [
        {
          id: "tt_r1",
          contentId: "7689468618823847189",
          text: "Well done! Keep cooking 🔥",
          author: {
            id: "gordonramsay",
            name: "Gordon Ramsay",
            isAuthor: true,
          },
          likes: 5400,
          timestamp: Date.now() - 2 * 3600 * 1000,
        },
      ],
    };

    const res = await renderComment(sampleComment, "TIKTOK", { theme: "dark" });
    expect(res.png).toBeDefined();
    expect(res.png.length).toBeGreaterThan(1000);

    const outPath = path.join(OUT_DIR, "tiktok_comment.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders TikTok Comment Thread Drawer and saves to output/tiktok", async () => {
    const threadComments: UnifiedComment[] = [
      {
        id: "tt_c1",
        contentId: "7689468618823847189",
        text: "Tried this recipe this morning and it literally changed my life! So fluffy!! 👏",
        author: {
          id: "foodie_sarah",
          name: "Sarah Baker",
          uniqueId: "sarah_bakes",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        },
        isAuthorLiked: true,
        likes: 12400,
        timestamp: Date.now() - 4 * 3600 * 1000,
        replies: [
          {
            id: "tt_r1",
            contentId: "7689468618823847189",
            text: "Well done! Keep cooking 🔥",
            author: { id: "gordonramsay", name: "Gordon Ramsay", isAuthor: true },
            likes: 5400,
            timestamp: Date.now() - 2 * 3600 * 1000,
          },
        ],
      },
      {
        id: "tt_c2",
        contentId: "7689468618823847189",
        text: "The trick with cold butter cubes at the start makes all the difference! 🧈",
        author: {
          id: "chef_mark",
          name: "Mark Culinary",
          uniqueId: "mark_eats",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
        likes: 3120,
        reactionType: "love",
        timestamp: Date.now() - 6 * 3600 * 1000,
      },
    ];

    const res = await renderCommentThread(threadComments, "TIKTOK", {
      totalCount: 18400,
      theme: "dark",
    });
    expect(res.png).toBeDefined();
    const outPath = path.join(OUT_DIR, "tiktok_comment_thread.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});

