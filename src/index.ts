import type { UnifiedContent, UnifiedComment, UnifiedAuthor, Platform, RenderOptions, RenderResult } from "./types";
import { renderElementToImage } from "./engine/renderer";
import { createFacebookPostCardNode } from "./templates/facebook/FacebookPostCard";
import { createFacebookCommentBubbleNode } from "./templates/facebook/FacebookCommentBubble";
import { createTikTokVideoCardNode } from "./templates/tiktok/TikTokVideoCard";
import { createTikTokCommentRowNode } from "./templates/tiktok/TikTokCommentRow";
import { createYouTubeVideoCardNode } from "./templates/youtube/YouTubeVideoCard";
import { createYouTubeCommentThreadNode } from "./templates/youtube/YouTubeCommentThread";
import { createBilibiliVideoCardNode } from "./templates/bilibili/BilibiliVideoCard";
import { createSocialProfileCardNode } from "./templates/profile/SocialProfileCard";

/**
 * Renders any UnifiedContent into a platform-styled UI image (PNG/Buffer/SVG).
 */
export async function renderPost(
  content: UnifiedContent,
  options: RenderOptions = {}
): Promise<RenderResult> {
  const platform = (content.platform || "FACEBOOK").toUpperCase();

  let element: any;
  let defaultWidth = 600;

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

  return await renderElementToImage(element, {
    width: options.width || defaultWidth,
    ...options,
  });
}

/**
 * Renders any UnifiedComment into a platform-styled comment UI image.
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

  public static async comment(comment: UnifiedComment, platform?: Platform | string, options?: RenderOptions): Promise<RenderResult> {
    return await renderComment(comment, platform, options);
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
