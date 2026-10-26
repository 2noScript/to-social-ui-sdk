# to-social-ui-sdk

Fast, lightweight social media UI image generator for **Node.js** and **Bun**.  
Renders normalized DTOs (`UnifiedContent`, `UnifiedComment`, `UnifiedAuthor`) from `unofficial-social-sdk` into pixel-perfect preview images (PNG, SVG, Buffer) via **Satori + Resvg**.

## Features

- **Blazing Fast**: In-memory rendering in ~20ms (no Puppeteer or Chromium needed).
- **Multi-Platform**: Facebook, TikTok, Douyin, YouTube, Instagram, X (Twitter), and Bilibili.
- **Full Formats**: Feed Posts, 16:9 Landscape Videos, 9:16 Reels/Shorts, Single Comments, Multi-Comment Threads (reactions, pins, replies), and Profile cards.
- **Retina Ready**: Crisp 2x scaling with Dark & Light theme support.
- **Node.js & Bun**: Pure ESM, compatible with Node 18+ and Bun.

## Installation

```bash
bun add to-social-ui-sdk
# or
npm install to-social-ui-sdk
```

## Quick Start

```typescript
import {
  renderPost,
  renderVideo,
  renderReel,
  renderShorts,
  renderComment,
  renderCommentThread,
  renderProfile,
} from "to-social-ui-sdk";

// 1. Render Feed Post (Facebook, Instagram, X/Twitter)
const postImg = await renderPost(postDto, { theme: "dark" });
await postImg.saveToFile("./output/post.png");

// 2. Render 16:9 Landscape Video (YouTube, Bilibili)
const videoImg = await renderVideo(videoDto, { theme: "dark" });

// 3. Render 9:16 Vertical Reel / Shorts (TikTok, FB Reels, YouTube Shorts)
const reelImg = await renderReel(reelDto);
const shortsImg = await renderShorts(shortsDto);

// 4. Render Single Comment with Reaction Badges
const commentImg = await renderComment(commentDto, "FACEBOOK", { theme: "light" });

// 5. Render Multi-Comment Tree Thread (with Pinned badge, nested replies, reaction pills)
const threadImg = await renderCommentThread(commentsArray, "FACEBOOK", {
  title: "Comments",
  theme: "dark",
});

// 6. Render Creator Profile Card
const profileImg = await renderProfile(authorDto, "TIKTOK", { theme: "dark" });

// Export formats
const buffer = postImg.asBuffer();
const dataUrl = postImg.asDataUrl();
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `"dark" \| "light" \| "auto"` | `"auto"` | Color scheme |
| `template` | `"post" \| "video" \| "reel" \| "shorts"` | Auto-detected | Force specific UI layout |
| `scale` | `number` | `2` | Resolution scale (2x for Retina) |
| `width` | `number` | Component default | Render width in px |
| `prefetchImages` | `boolean` | `true` | Fetch remote images to Base64 data URIs |
| `watermark` | `string` | `undefined` | Optional footer watermark |

## Testing

```bash
bun test               # Run all tests & generate sample images
bun run test:facebook  # Facebook Post, Reel, Comment & Thread
bun run test:tiktok    # TikTok Video & Comment
bun run test:youtube   # YouTube 16:9 Video, 9:16 Shorts & Comment
bun run test:instagram # Instagram Feed Post
bun run test:twitter   # X (Twitter) Tweet Card
bun run test:bilibili  # Bilibili Video Card
bun run test:profile   # Social Profile Card
```

Rendered images are saved to `output/<platform>/`.

## License

MIT
