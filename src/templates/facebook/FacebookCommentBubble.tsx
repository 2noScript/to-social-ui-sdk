import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { PinIcon, VerifiedBadge, renderReactionIcon } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface FacebookCommentBubbleProps {
  comment: UnifiedComment;
  options?: RenderOptions;
}

export async function createFacebookCommentBubbleNode(props: FacebookCommentBubbleProps) {
  const { comment, options = {} } = props;
  const isDark = options.theme === "dark";

  const bg = isDark ? "#242526" : "#ffffff";
  const bubbleBg = isDark ? "#3A3B3C" : "#F0F2F5";
  const textPrimary = isDark ? "#E4E6EB" : "#050505";
  const textSecondary = isDark ? "#B0B3B8" : "#65676B";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(comment.author?.avatarUrl, () => createPlaceholderAvatar(comment.author?.name, 72, "#1877F2"))
    : (comment.author?.avatarUrl || createPlaceholderAvatar(comment.author?.name, 72, "#1877F2"));

  const authorName = comment.author?.name || "Facebook User";
  const timeStr = formatSocialTime(comment.publishedAt, comment.timestamp);
  const likesCount = comment.likes || 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 16,
        padding: 16,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Pinned Header if present */}
      {comment.isPinned && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: textSecondary,
            marginBottom: 6,
            marginLeft: 48,
          }}
        >
          <PinIcon size={13} color={textSecondary} />
          <span style={{ marginLeft: 6 }}>Pinned by author</span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        {/* Avatar */}
        <img
          src={avatarUri}
          width={38}
          height={38}
          style={{
            borderRadius: 19,
            objectFit: "cover",
            marginRight: 10,
            flexShrink: 0,
          }}
        />

        {/* Comment Bubble & Metadata */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "88%" }}>
          {/* Bubble */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: bubbleBg,
              borderRadius: 18,
              padding: "10px 14px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginRight: 4 }}>
                {authorName}
              </span>
              {comment.author?.isVerified && <VerifiedBadge size={14} />}
              {comment.author?.isAuthor && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    backgroundColor: "#1877F2",
                    color: "#ffffff",
                    padding: "1px 6px",
                    borderRadius: 8,
                  }}
                >
                  Author
                </span>
              )}
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary, wordBreak: "break-word" }}>
              {comment.text}
            </div>

            {/* Floating Reaction Badge on bottom-right of bubble */}
            {(likesCount > 0 || comment.reactionType) && (
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: 8,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: isDark ? "#242526" : "#ffffff",
                  padding: "2px 6px",
                  borderRadius: 12,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  border: isDark ? "1px solid #3A3B3C" : "1px solid #E4E6EB",
                }}
              >
                {renderReactionIcon(comment.reactionType || "like", 14)}
                <span style={{ fontSize: 11, fontWeight: 700, color: textSecondary, marginLeft: 4 }}>
                  {formatSocialCount(likesCount > 0 ? likesCount : 1)}
                </span>
              </div>
            )}
          </div>

          {/* Timestamp and action buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              color: textSecondary,
              marginTop: 6,
              marginLeft: 10,
            }}
          >
            <span style={{ fontWeight: 600, marginRight: 14, color: comment.reactionType === "love" ? "#FA3E3E" : (comment.reactionType ? "#1877F2" : textSecondary) }}>
              Like
            </span>
            <span style={{ fontWeight: 600, marginRight: 14 }}>Reply</span>
            <span>{timeStr}</span>

            {comment.isAuthorLiked && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                  backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                  padding: "2px 6px",
                  borderRadius: 8,
                }}
              >
                <span style={{ color: "#FA3E3E", marginRight: 4, fontSize: 11 }}>❤️</span>
                <span style={{ fontSize: 11, color: textSecondary }}>Liked by creator</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render 1-2 nested replies if available */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 46, marginTop: 12 }}>
          {comment.replies.slice(0, 2).map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", marginTop: 8 }}>
              <img
                src={createPlaceholderAvatar(r.author?.name, 56, "#42b72a")}
                width={28}
                height={28}
                style={{ borderRadius: 14, marginRight: 8 }}
              />
              <div style={{ display: "flex", flexDirection: "column", maxWidth: "85%" }}>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: bubbleBg, borderRadius: 16, padding: "6px 12px" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: textPrimary }}>{r.author?.name || "Replier"}</span>
                  <span style={{ fontSize: 13, color: textPrimary }}>{r.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
