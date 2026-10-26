import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { FbLikeIcon, FbLoveIcon, VerifiedBadge } from "../../utils/icons";
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
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary, wordBreak: "break-word" }}>
              {comment.text}
            </div>

            {/* Floating Like Badge on bottom-right of bubble */}
            {likesCount > 0 && (
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
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                <FbLikeIcon size={14} />
                <span style={{ fontSize: 11, fontWeight: 600, color: textSecondary, marginLeft: 3 }}>
                  {formatSocialCount(likesCount)}
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
            <span style={{ fontWeight: 600, marginRight: 14 }}>Like</span>
            <span style={{ fontWeight: 600, marginRight: 14 }}>Reply</span>
            <span>{timeStr}</span>
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
