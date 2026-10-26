import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface YouTubeCommentThreadProps {
  comment: UnifiedComment;
  options?: RenderOptions;
}

export async function createYouTubeCommentThreadNode(props: YouTubeCommentThreadProps) {
  const { comment, options = {} } = props;
  const isDark = options.theme !== "light";

  const bg = isDark ? "#0f0f0f" : "#ffffff";
  const textPrimary = isDark ? "#f1f1f1" : "#0f0f0f";
  const textSecondary = isDark ? "#aaaaaa" : "#606060";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(comment.author?.avatarUrl, () => createPlaceholderAvatar(comment.author?.name, 72, "#FF0000"))
    : (comment.author?.avatarUrl || createPlaceholderAvatar(comment.author?.name, 72, "#FF0000"));

  const authorHandle = comment.author?.uniqueId ? `@${comment.author.uniqueId}` : `@${comment.author?.name || "youtube_user"}`;
  const timeStr = formatSocialTime(comment.publishedAt, comment.timestamp);
  const likesCount = comment.likes || 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        backgroundColor: bg,
        borderRadius: 16,
        padding: "16px 20px",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <img
        src={avatarUri}
        width={40}
        height={40}
        style={{
          borderRadius: 20,
          objectFit: "cover",
          marginRight: 14,
          flexShrink: 0,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginRight: 6 }}>
            {authorHandle}
          </span>
          <span style={{ fontSize: 12, color: textSecondary }}>{timeStr}</span>
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary, marginBottom: 8, wordBreak: "break-word" }}>
          {comment.text}
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: textSecondary }}>
          {/* Thumbs up */}
          <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill={textSecondary} style={{ marginRight: 5 }}>
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
            </svg>
            <span>{formatSocialCount(likesCount)}</span>
          </div>

          {/* Thumbs down */}
          <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill={textSecondary}>
              <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.37-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
            </svg>
          </div>

          {/* Reply */}
          <span style={{ fontWeight: 600 }}>Reply</span>
        </div>
      </div>
    </div>
  );
}
