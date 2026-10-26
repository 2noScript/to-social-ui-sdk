import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { PinIcon, YouTubeLikeIcon, YouTubeDislikeIcon, CreatorHeartBadge } from "../../utils/icons";
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
  const badgeBg = isDark ? "#272727" : "#f2f2f2";

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
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 16,
        padding: "16px 20px",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Pinned Tag */}
      {comment.isPinned && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: textSecondary,
            marginBottom: 8,
            marginLeft: 54,
          }}
        >
          <PinIcon size={13} color={textSecondary} />
          <span style={{ marginLeft: 6 }}>Pinned by creator</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
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
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: comment.author?.isAuthor ? "#ffffff" : textPrimary,
                backgroundColor: comment.author?.isAuthor ? "#888888" : "transparent",
                padding: comment.author?.isAuthor ? "1px 6px" : "0",
                borderRadius: comment.author?.isAuthor ? 10 : 0,
                marginRight: 6,
              }}
            >
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
              <div style={{ marginRight: 5 }}>
                <YouTubeLikeIcon size={14} fill={textSecondary} />
              </div>
              <span>{formatSocialCount(likesCount)}</span>
            </div>

            {/* Thumbs down */}
            <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
              <YouTubeDislikeIcon size={14} fill={textSecondary} />
            </div>

            {/* Creator Heart */}
            {comment.isAuthorLiked && (
              <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
                <CreatorHeartBadge size={18} />
              </div>
            )}

            {/* Reply */}
            <span style={{ fontWeight: 600 }}>Reply</span>
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 54, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", color: "#3EA6FF", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            ▼ {comment.replies.length} replies
          </div>
          {comment.replies.slice(0, 2).map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", marginTop: 6 }}>
              <img
                src={createPlaceholderAvatar(r.author?.name, 48, "#FF0000")}
                width={26}
                height={26}
                style={{ borderRadius: 13, marginRight: 10 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: textPrimary, marginRight: 6 }}>
                    {r.author?.name || r.author?.uniqueId || "User"}
                  </span>
                  <span style={{ fontSize: 11, color: textSecondary }}>
                    {formatSocialTime(r.publishedAt, r.timestamp)}
                  </span>
                </div>
                <span style={{ fontSize: 13, color: textPrimary, marginTop: 2 }}>{r.text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
