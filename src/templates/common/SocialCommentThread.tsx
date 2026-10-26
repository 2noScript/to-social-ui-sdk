import React from "react";
import type { UnifiedComment, RenderCommentThreadOptions, Platform } from "../../types";
import { createFacebookCommentThreadNode } from "../facebook/FacebookCommentThread";
import { createTikTokCommentThreadNode } from "../tiktok/TikTokCommentThread";

export interface SocialCommentThreadProps {
  comments: UnifiedComment[];
  platform?: Platform;
  options?: RenderCommentThreadOptions;
}

/**
 * Universal dispatcher: Delegates to platform-specific comment thread templates
 * (e.g. FacebookCommentThread, TikTokCommentThread, etc.)
 */
export async function createSocialCommentThreadNode(props: SocialCommentThreadProps) {
  const { comments, platform = "FACEBOOK", options = {} } = props;
  const plat = (platform || "FACEBOOK").toUpperCase();

  if (plat === "TIKTOK" || plat === "DOUYIN") {
    return await createTikTokCommentThreadNode({ comments, options });
  }

  // Default to Facebook's dedicated tree template
  return await createFacebookCommentThreadNode({ comments, options });
}
