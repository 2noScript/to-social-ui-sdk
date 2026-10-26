# 🎨 to-social-ui-sdk

> **High-Performance Social UI Image Generator for Node.js & Bun.**  
> Effortlessly transforms normalized social data DTOs (`UnifiedContent`, `UnifiedComment`, `UnifiedAuthor`) from `unofficial-social-sdk` into pixel-perfect, 2x Retina social media UI preview cards (PNG / JPEG / SVG / Buffer) powered by **Satori + Resvg** (Rust-backed vector renderer).

---

## ⚡ Highlights

- 🚀 **Blazing Fast & Ultra-Lightweight**: In-memory rendering takes only **15ms - 30ms** per image. No heavy Chromium, Puppeteer, or Playwright browsers (~150MB - 300MB) required.
- 💻 **100% Node.js & Bun Compatible**: Runs seamlessly on Node.js (v18+, v22+), Bun runtime, Docker, Linux, macOS, and serverless environments.
- 🎯 **Seamless DTO Integration**: Directly accepts `UnifiedContent`, `UnifiedComment`, and `UnifiedAuthor` from `unofficial-social-sdk` without any mapping or manual conversion.
- 📱 **Multi-Platform UI Templates**:
  - **Facebook**: News Feed Post Card (Reactions pill, like/love badge, share stats) and Comment Bubble.
  - **TikTok & Douyin**: Mobile Full-Screen Video Card (action sidebar: likes, comments, bookmarks, music disc) and Comment Row.
  - **YouTube**: 16:9 Video Card with time duration badges, channel avatar, verified checkmarks, and Comment Thread.
  - **Bilibili**: Video Card with views (播放), bullet comments (弹幕), and UP Creator level badges.
  - **Universal Profile Card**: Creator profile card with cover banner, bio, followers, following, and total likes counter grid.
- 🌓 **Native Dark & Light Mode**: Clean modern design system with rounded corners, subtle shadows, and crisp 2x Retina resolution (`scale: 2`).
- 🛡️ **Auto-Prefetching & Fallbacks**: Automatically fetches remote avatars and media covers into Base64 DataURIs, with instant SVG placeholder fallbacks if URLs expire or block hotlinking.

---

## 📦 Installation

```bash
# Using Bun
bun add to-social-ui-sdk

# Using npm
npm install to-social-ui-sdk

# Using pnpm
pnpm add to-social-ui-sdk

# Using yarn
yarn add to-social-ui-sdk
```

---

## 🚀 Quick Start

### 1. Render Post / Video Card (Facebook, TikTok, YouTube, Bilibili)

```typescript
import { renderPost } from "to-social-ui-sdk";
import type { UnifiedContent } from "to-social-ui-sdk";

// Direct payload from unofficial-social-sdk: await provider.getContent(...)
const post: UnifiedContent = {
  id: "101584930129",
  platform: "FACEBOOK",
  type: "POST",
  webUrl: "https://www.facebook.com/NASA/posts/101584930129",
  title: "Europa Clipper Mission Update",
  description: "NASA's Europa Clipper has successfully entered deep space on its voyage to investigate whether Jupiter's icy moon could harbor conditions suitable for life. 🚀🌌",
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

// Render Facebook Post UI Card
const result = await renderPost(post, {
  theme: "dark", // "dark" | "light" | "auto"
  scale: 2,      // 2x Retina scale (default)
});

// Save directly to disk
await result.saveToFile("./output/facebook/fb_post_dark.png");

// Or get binary Buffer (for Express, Fastify, Telegram Bot, Discord Webhook)
const buffer = result.asBuffer();
console.log(`Rendered PNG size: ${buffer.length} bytes, ${result.width}x${result.height}`);
```

---

### 2. Render Comment (Bubble / Row / Thread)

```typescript
import { renderComment } from "to-social-ui-sdk";
import type { UnifiedComment } from "to-social-ui-sdk";

const comment: UnifiedComment = {
  id: "tt_c1",
  contentId: "7689468618823847189",
  text: "Tried this recipe this morning and it literally changed my life! So fluffy!! 👏",
  author: {
    id: "foodie_sarah",
    name: "Sarah Baker",
    uniqueId: "sarah_bakes",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  },
  likes: 12400,
  timestamp: Date.now() - 4 * 3600 * 1000,
};

// Render TikTok Comment Row (Dark Mode)
const result = await renderComment(comment, "TIKTOK", { theme: "dark" });
await result.saveToFile("./output/tiktok/tiktok_comment.png");
```

---

### 3. Render Creator Profile Card

```typescript
import { renderProfile } from "to-social-ui-sdk";
import type { UnifiedAuthor } from "to-social-ui-sdk";

const author: UnifiedAuthor = {
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

// Render Social Profile Card
const result = await renderProfile(author, "TIKTOK", { theme: "dark" });
await result.saveToFile("./output/profile/profile_card_dark.png");
```

---

## 🛠️ Configuration Options (`RenderOptions`)

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `"dark" \| "light" \| "auto"` | `"auto"` | Color theme scheme (dark or light). |
| `scale` | `number` | `2` | Resolution scale multiplier (2x recommended for crisp Retina rendering). |
| `width` | `number` | Component-specific | Canvas width in pixels (e.g., 600 for Facebook, 480 for TikTok). |
| `prefetchImages` | `boolean` | `true` | Automatically pre-fetches avatars/covers to Base64 to prevent network or hotlinking issues. |
| `watermark` | `string` | `undefined` | Optional footer watermark or branding attribution label. |

---

## 📤 Result Output Methods (`RenderResult`)

Every render function returns a `RenderResult` object providing convenient output formats:

```typescript
const result = await renderPost(post);

result.png;                 // Uint8Array of the PNG binary
result.width;               // Final pixel width
result.height;              // Final pixel height
result.asBuffer();          // Buffer (Node.js Buffer instance)
result.asDataUrl();         // string: "data:image/png;base64,..."
result.asSvg();             // string: Raw SVG markup generated by Satori
await result.saveToFile(p); // Saves directly to the specified file path
```

---

## 🧪 Tests & Output Directory Structure

The test suite and rendered outputs are categorized by platform:

```
to-social-ui-sdk/
├── tests/
│   ├── facebook/     # tests/facebook/facebook.test.ts
│   ├── tiktok/       # tests/tiktok/tiktok.test.ts
│   ├── youtube/      # tests/youtube/youtube.test.ts
│   ├── bilibili/     # tests/bilibili/bilibili.test.ts
│   └── profile/      # tests/profile/profile.test.ts
└── output/
    ├── facebook/     # fb_post_light.png, fb_post_dark.png, fb_comment.png
    ├── tiktok/       # tiktok_video_card.png, tiktok_comment.png
    ├── youtube/      # youtube_video_card.png, youtube_comment.png
    ├── bilibili/     # bilibili_video_card.png
    └── profile/      # profile_card_dark.png, profile_card_light.png
```

### Test Commands:

```bash
# Run all platform test suites and export all images
bun test

# Run individual platform test suites
bun run test:facebook   # Render Facebook images -> output/facebook/
bun run test:tiktok     # Render TikTok images   -> output/tiktok/
bun run test:youtube    # Render YouTube images  -> output/youtube/
bun run test:bilibili   # Render Bilibili images -> output/bilibili/
bun run test:profile    # Render Profile images  -> output/profile/
```

---

## 📄 License

MIT
