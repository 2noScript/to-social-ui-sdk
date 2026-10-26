import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { TikTokHeartIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface TikTokCommentRowProps {
  comment: UnifiedComment;
  options?: RenderOptions;
}

export async function createTikTokCommentRowNode(props: TikTokCommentRowProps) {
  const { comment, options = {} } = props;
  const isDark = options.theme !== "light"; // TikTok comments are typically dark mode

  const bg = isDark ? "#121212" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#161823";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "rgba(22,24,35,0.5)";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(comment.author?.avatarUrl, () => createPlaceholderAvatar(comment.author?.name || comment.author?.uniqueId, 72, "#FE2C55"))
    : (comment.author?.avatarUrl || createPlaceholderAvatar(comment.author?.name || comment.author?.uniqueId, 72, "#FE2C55"));

  const authorName = comment.author?.name || comment.author?.uniqueId || "tiktok_user";
  const timeStr = formatSocialTime(comment.publishedAt, comment.timestamp);
  const likesCount = comment.likes || 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: bg,
        borderRadius: 16,
        padding: "16px 20px",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", maxWidth: "86%" }}>
        {/* Avatar */}
        <img
          src={avatarUri}
          width={40}
          height={40}
          style={{
            borderRadius: 20,
            objectFit: "cover",
            marginRight: 12,
            flexShrink: 0,
          }}
        />

        {/* Text Area */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: textSecondary, marginRight: 4 }}>
              {authorName}
            </span>
            {comment.author?.isVerified && <VerifiedBadge size={13} color="#20D5EC" />}
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary, wordBreak: "break-word" }}>
            {comment.text}
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: textSecondary, marginTop: 6 }}>
            <span style={{ marginRight: 16 }}>{timeStr}</span>
            <span style={{ fontWeight: 600 }}>Reply</span>
          </div>
        </div>
      </div>

      {/* Right Heart Icon + Likes */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: 12,
          flexShrink: 0,
          paddingTop: 4,
        }}
      >
        <TikTokHeartIcon size={20} fill={likesCount > 0 ? "#FE2C55" : (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)")} />
        {likesCount > 0 && (
          <span style={{ fontSize: 11, fontWeight: 600, color: textSecondary, marginTop: 3 }}>
            {formatSocialCount(likesCount)}
          </span>
        )}
      </div>
    </div>
  );
}
