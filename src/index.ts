import type {
  UnifiedContent,
  UnifiedComment,
  UnifiedAuthor,
  Platform,
  RenderOptions,
  RenderCommentThreadOptions,
  RenderResult,
} from "./types";
import { renderElementToImage } from "./engine/renderer";
import { createFacebookPostCardNode } from "./templates/facebook/FacebookPostCard";
import { createFacebookReelCardNode } from "./templates/facebook/FacebookReelCard";
import { createFacebookCommentBubbleNode } from "./templates/facebook/FacebookCommentBubble";
import { createTikTokVideoCardNode } from "./templates/tiktok/TikTokVideoCard";
import { createTikTokCommentRowNode } from "./templates/tiktok/TikTokCommentRow";
import { createYouTubeVideoCardNode } from "./templates/youtube/YouTubeVideoCard";
import { createYouTubeShortsCardNode } from "./templates/youtube/YouTubeShortsCard";
import { createYouTubeCommentThreadNode } from "./templates/youtube/YouTubeCommentThread";
import { createInstagramPostCardNode } from "./templates/instagram/InstagramPostCard";
import { createTwitterTweetCardNode } from "./templates/twitter/TwitterTweetCard";
import { createBilibiliVideoCardNode } from "./templates/bilibili/BilibiliVideoCard";
import { createSocialProfileCardNode } from "./templates/profile/SocialProfileCard";
import { createSocialCommentThreadNode } from "./templates/common/SocialCommentThread";

/**
 * Renders any UnifiedContent into a platform-styled UI image (PNG/Buffer/SVG).
 * Automatically chooses the best template based on platform & content type, or explicit options.template.
 */
export async function renderPost(
  content: UnifiedContent,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const platform = (content.platform || "FACEBOOK").toUpperCase();
  const template = options.template;

  let element: any;
  let defaultWidth = 600;

  // 1. Explicit Reel / Shorts Template
  if (platform === "YOUTUBE" && (template === "shorts" || template === "reel")) {
    element = await createYouTubeShortsCardNode({ content, options });
    defaultWidth = 480;
  } else if (template === "reel" || template === "shorts") {
    if (platform === "FACEBOOK") {
      element = await createFacebookReelCardNode({ content, options });
    } else {
      element = await createTikTokVideoCardNode({ content, options });
    }
    defaultWidth = 480;
  }
  // 2. Platform Dispatch
  else {
    switch (platform) {
      case "TIKTOK":
      case "DOUYIN":
        element = await createTikTokVideoCardNode({ content, options });
        defaultWidth = 480;
        break;
      case "YOUTUBE":
        element = await createYouTubeVideoCardNode({ content, options });
        defaultWidth = 600;
        break;
      case "INSTAGRAM":
      case "THREADS":
        element = await createInstagramPostCardNode({ content, options });
        defaultWidth = 540;
        break;
      case "TWITTER":
        element = await createTwitterTweetCardNode({ content, options });
        defaultWidth = 560;
        break;
      case "BILIBILI":
        element = await createBilibiliVideoCardNode({ content, options });
        defaultWidth = 560;
        break;
      case "FACEBOOK":
      default:
        element = await createFacebookPostCardNode({ content, options });
        defaultWidth = 600;
        break;
    }
  }

  return await renderElementToImage(element, {
    width: options.width || defaultWidth,
    ...options,
  });
}

/**
 * Specialized helper: Renders a 16:9 Landscape Video Card (YouTube, Bilibili, Facebook Video).
 */
export async function renderVideo(
  content: UnifiedContent,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const platform = (content.platform || "YOUTUBE").toUpperCase();
  let element: any;

  if (platform === "BILIBILI") {
    element = await createBilibiliVideoCardNode({ content, options });
  } else {
    element = await createYouTubeVideoCardNode({ content, options });
  }

  return await renderElementToImage(element, {
    width: options.width || 600,
    ...options,
  });
}

/**
 * Specialized helper: Renders a 9:16 Vertical Video / Reel Card (TikTok, Douyin, Facebook Reels, Instagram Reels).
 */
export async function renderReel(
  content: UnifiedContent,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const platform = (content.platform || "TIKTOK").toUpperCase();
  let element: any;

  if (platform === "FACEBOOK") {
    element = await createFacebookReelCardNode({ content, options });
  } else {
    element = await createTikTokVideoCardNode({ content, options });
  }

  return await renderElementToImage(element, {
    width: options.width || 480,
    ...options,
  });
}

/**
 * Specialized helper: Renders a 9:16 YouTube Shorts Card.
 */
export async function renderShorts(
  content: UnifiedContent,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const element = await createYouTubeShortsCardNode({ content, options });
  return await renderElementToImage(element, {
    width: options.width || 480,
    ...options,
  });
}

/**
 * Renders a single UnifiedComment into a platform-styled comment UI bubble/row.
 */
export async function renderComment(
  comment: UnifiedComment,
  platform: Platform | string = "FACEBOOK",
  options: RenderOptions = {}
): Promise<RenderResult> {
  const plat = (platform || "FACEBOOK").toUpperCase();

  let element: any;
  let defaultWidth = 550;

  switch (plat) {
    case "TIKTOK":
    case "DOUYIN":
      element = await createTikTokCommentRowNode({ comment, options });
      defaultWidth = 500;
      break;
    case "YOUTUBE":
      element = await createYouTubeCommentThreadNode({ comment, options });
      defaultWidth = 550;
      break;
    case "FACEBOOK":
    default:
      element = await createFacebookCommentBubbleNode({ comment, options });
      defaultWidth = 520;
      break;
  }

  return await renderElementToImage(element, {
    width: options.width || defaultWidth,
    ...options,
  });
}

/**
 * Renders a full multi-comment thread / tree view with pinned comments, author tags, and reaction pills.
 */
export async function renderCommentThread(
  comments: UnifiedComment[] | UnifiedComment,
  platform: Platform | string = "FACEBOOK",
  options: RenderCommentThreadOptions = {}
): Promise<RenderResult> {
  const commentList = Array.isArray(comments) ? comments : [comments];
  const element = await createSocialCommentThreadNode({
    comments: commentList,
    platform: (platform || "FACEBOOK") as Platform,
    options,
  });

  return await renderElementToImage(element, {
    width: options.width || 600,
    ...options,
  });
}

/**
 * Renders any UnifiedAuthor into a Social Profile Card UI image.
 */
export async function renderProfile(
  author: UnifiedAuthor,
  platform: Platform | string = "FACEBOOK",
  options: RenderOptions = {}
): Promise<RenderResult> {
  const element = await createSocialProfileCardNode({ author, platform, options });
  return await renderElementToImage(element, {
    width: options.width || 560,
    ...options,
  });
}

/**
 * Fluent Class Interface for Social UI Generation
 */
export class SocialUI {
  public static async post(content: UnifiedContent, options?: RenderOptions): Promise<RenderResult> {
    return await renderPost(content, options);
  }

  public static async video(content: UnifiedContent, options?: RenderOptions): Promise<RenderResult> {
    return await renderVideo(content, options);
  }

  public static async reel(content: UnifiedContent, options?: RenderOptions): Promise<RenderResult> {
    return await renderReel(content, options);
  }

  public static async shorts(content: UnifiedContent, options?: RenderOptions): Promise<RenderResult> {
    return await renderShorts(content, options);
  }

  public static async comment(comment: UnifiedComment, platform?: Platform | string, options?: RenderOptions): Promise<RenderResult> {
    return await renderComment(comment, platform, options);
  }

  public static async thread(comments: UnifiedComment[] | UnifiedComment, platform?: Platform | string, options?: RenderCommentThreadOptions): Promise<RenderResult> {
    return await renderCommentThread(comments, platform, options);
  }

  public static async profile(author: UnifiedAuthor, platform?: Platform | string, options?: RenderOptions): Promise<RenderResult> {
    return await renderProfile(author, platform, options);
  }
}

export * from "./types";
export * from "./engine/renderer";
export * from "./engine/fonts";
export * from "./utils/format";
export * from "./utils/image";
export * from "./utils/icons";
