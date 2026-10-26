# to-social-ui-sdk

Fast, lightweight social media UI image generator for **Node.js** and **Bun**.  
Renders normalized DTOs (`UnifiedContent`, `UnifiedComment`, `UnifiedAuthor`) from `unofficial-social-sdk` into pixel-perfect preview images (PNG, SVG, Buffer) via **Satori + Resvg**.

## Features

- **Blazing Fast**: In-memory rendering in ~20ms (no Puppeteer or Chromium needed).
- **Multi-Platform**: Facebook, TikTok, Douyin, YouTube, Bilibili, and Universal Profile cards.
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
import { renderPost, renderComment, renderProfile } from "to-social-ui-sdk";

// 1. Render a Post / Video Card (Facebook, TikTok, YouTube, Bilibili)
const postImg = await renderPost(postDto, { theme: "dark" });
await postImg.saveToFile("./output/post.png");

// 2. Render a Comment (Bubble or Row)
const commentImg = await renderComment(commentDto, "TIKTOK", { theme: "dark" });
await commentImg.saveToFile("./output/comment.png");

// 3. Render a Creator Profile Card
const profileImg = await renderProfile(authorDto, "TIKTOK", { theme: "dark" });
await profileImg.saveToFile("./output/profile.png");

// Access raw Buffer or Data URI
const buffer = postImg.asBuffer();
const dataUrl = postImg.asDataUrl();
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `"dark" \| "light" \| "auto"` | `"auto"` | Color scheme |
| `scale` | `number` | `2` | Resolution scale (2x for Retina) |
| `width` | `number` | Component default | Render width in px |
| `prefetchImages` | `boolean` | `true` | Fetch remote images to Base64 data URIs |
| `watermark` | `string` | `undefined` | Optional footer watermark |

## Testing

```bash
bun test              # Run all tests & generate sample images
bun run test:facebook # Facebook only
bun run test:tiktok   # TikTok only
bun run test:youtube  # YouTube only
bun run test:bilibili # Bilibili only
bun run test:profile  # Profile only
```

Rendered images are saved to `output/<platform>/`.

## License

MIT
