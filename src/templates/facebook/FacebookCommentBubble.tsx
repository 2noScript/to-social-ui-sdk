import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { PinIcon, VerifiedBadge, renderReactionIcon, FbLikeIcon, FbLoveIcon } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface FacebookCommentBubbleProps {
  comment: UnifiedComment;
  options?: RenderOptions;
}

export async function createFacebookCommentBubbleNode(props: FacebookCommentBubbleProps) {
  const { comment, options = {} } = props;
  const isDark = options.theme === "dark";

  // Authentic Facebook Color Tokens
  const bg = isDark ? "#242526" : "#ffffff";
  const bubbleBg = isDark ? "#3A3B3C" : "#F0F2F5";
  const badgeBg = isDark ? "#242526" : "#ffffff";
  const textPrimary = isDark ? "#E4E6EB" : "#050505";
  const textSecondary = isDark ? "#B0B3B8" : "#65676B";
  const authorBadgeBg = isDark ? "#4B4C4F" : "#E4E6EB";
  const linkHover = isDark ? "#4599FF" : "#1877F2";
  const replyLine = isDark ? "#3E4042" : "#CED0D4";

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
        borderRadius: 10,
        border: isDark ? "1px solid #3E4042" : "1px solid #CED0D4",
        boxShadow: isDark ? "0 1px 2px rgba(0,0,0,0.25)" : "0 1px 2px rgba(0,0,0,0.1)",
        padding: "14px 16px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Pinned by Author tag */}
      {comment.isPinned && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 600,
            color: textSecondary,
            marginBottom: 6,
            marginLeft: 44,
          }}
        >
          <PinIcon size={12} color={textSecondary} />
          <span style={{ marginLeft: 6 }}>Pinned by author</span>
        </div>
      )}

      {/* Main Comment Row */}
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        {/* Author Avatar: 36px circle */}
        <img
          src={avatarUri}
          width={36}
          height={36}
          style={{
            borderRadius: 18,
            objectFit: "cover",
            marginRight: 8,
            flexShrink: 0,
          }}
        />

        {/* Bubble & Metadata */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "90%", alignItems: "flex-start" }}>
          {/* Bubble Box: Authentic 18px border-radius, #F0F2F5 or #3A3B3C */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: bubbleBg,
              borderRadius: 18,
              padding: "8px 12px 9px 12px",
              position: "relative",
              alignSelf: "flex-start",
            }}
          >
            {/* Author Name + Badges */}
            <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2308" }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: textPrimary, marginRight: 4 }}>
                {authorName}
              </span>
              {comment.author?.isVerified && <VerifiedBadge size={13} />}
              {comment.author?.isAuthor && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: authorBadgeBg,
                    color: textPrimary,
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  Author
                </span>
              )}
            </div>

            {/* Comment Text: 15px, 1.3333 line-height */}
            <div
              style={{
                fontSize: 15,
                lineHeight: "20px",
                color: textPrimary,
                marginTop: 3,
                wordBreak: "break-word",
              }}
            >
              {comment.text}
            </div>

            {/* Floating Reaction Badge (Exact Facebook style: 3D reaction icon + count) */}
            {(likesCount > 0 || comment.reactionType) && (
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  right: 4,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: badgeBg,
                  padding: "1px 5px 1px 2px",
                  borderRadius: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.22)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", borderRadius: 8, border: `1.5px solid ${badgeBg}`, zIndex: 2 }}>
                    {renderReactionIcon(comment.reactionType || "like", 16)}
                  </div>
                  {comment.reactions?.love ? (
                    <div style={{ display: "flex", marginLeft: -4, borderRadius: 8, border: `1.5px solid ${badgeBg}`, zIndex: 1 }}>
                      <FbLoveIcon size={16} />
                    </div>
                  ) : null}
                </div>
                <span style={{ fontSize: 11, fontWeight: 400, color: textSecondary, marginLeft: 3 }}>
                  {formatSocialCount(likesCount > 0 ? likesCount : 1)}
                </span>
              </div>
            )}
          </div>

          {/* Action Row below bubble: Like • Reply • Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              color: textSecondary,
              marginTop: 4,
              marginLeft: 12,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: comment.reactionType === "love" ? "#FA3E3E" : (comment.reactionType ? "#1877F2" : textSecondary),
              }}
            >
              Like
            </span>
            <span style={{ fontWeight: 700, marginLeft: 12, color: textSecondary }}>
              Reply
            </span>
            <span style={{ fontWeight: 400, marginLeft: 12, color: textSecondary }}>
              {timeStr}
            </span>

            {/* Creator Heart / Liked by Author */}
            {comment.isAuthorLiked && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <span style={{ color: "#FA3E3E", marginRight: 3, fontSize: 11 }}>❤️</span>
                <span style={{ fontSize: 11, color: textSecondary, fontWeight: 500 }}>Liked by author</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 44,
            marginTop: 8,
            paddingLeft: 12,
            borderLeft: `2px solid ${replyLine}`,
          }}
        >
          {comment.replies.map((reply, i) => (
            <div key={reply.id || i} style={{ display: "flex", alignItems: "flex-start", marginTop: 8 }}>
              <img
                src={createPlaceholderAvatar(reply.author?.name, 48, "#1877F2")}
                width={28}
                height={28}
                style={{ borderRadius: 14, marginRight: 8, flexShrink: 0 }}
              />
              <div style={{ display: "flex", flexDirection: "column", maxWidth: "88%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: bubbleBg,
                    borderRadius: 16,
                    padding: "6px 10px 7px 10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2" }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: textPrimary, marginRight: 4 }}>
                      {reply.author?.name || "Replier"}
                    </span>
                    {reply.author?.isVerified && <VerifiedBadge size={12} />}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: "18px", color: textPrimary, marginTop: 2 }}>
                    {reply.text}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 11,
                    color: textSecondary,
                    marginTop: 3,
                    marginLeft: 10,
                  }}
                >
                  <span style={{ fontWeight: 700 }}>Like</span>
                  <span style={{ fontWeight: 700, marginLeft: 10 }}>Reply</span>
                  <span style={{ marginLeft: 10 }}>{formatSocialTime(reply.publishedAt, reply.timestamp)}</span>
                  {reply.likes && reply.likes > 0 ? (
                    <span style={{ marginLeft: 8, color: "#1877F2", fontWeight: 600 }}>
                      👍 {formatSocialCount(reply.likes)}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
