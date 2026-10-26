import React from "react";
import type { UnifiedComment, RenderCommentThreadOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { TikTokHeartIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface TikTokCommentThreadProps {
  comments: UnifiedComment[];
  options?: RenderCommentThreadOptions;
}

export async function createTikTokCommentThreadNode(props: TikTokCommentThreadProps) {
  const { comments, options = {} } = props;
  const isDark = options.theme !== "light";

  // Official TikTok Color Tokens
  const bg = isDark ? "#121212" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#161823";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "rgba(22,24,35,0.5)";
  const divider = isDark ? "rgba(255,255,255,0.12)" : "rgba(22,24,35,0.12)";

  // Pre-resolve avatars
  const avatarMap = new Map<string, string>();
  if (options.prefetchImages !== false) {
    for (const c of comments) {
      if (c.author?.avatarUrl) {
        const uri = await resolveImageAsDataUri(c.author.avatarUrl, () =>
          createPlaceholderAvatar(c.author?.name || "User", 64, "#FE2C55")
        );
        avatarMap.set(c.id, uri);
      }
    }
  }

  const totalCount = options.totalCount || comments.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 16,
        padding: "16px 20px 24px 20px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        width: 520,
        boxSizing: "border-box",
      }}
    >
      {/* TikTok Comments Header: "[Count] comments" in center + "✕" on right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 14,
          borderBottom: `1px solid ${divider}`,
          marginBottom: 16,
          position: "relative",
        }}
      >
        <div style={{ width: 24 }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>
          {formatSocialCount(totalCount)} comments
        </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth={2.5}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>

      {/* Comment List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {comments.map((comment, index) => {
          const avatar =
            avatarMap.get(comment.id) ||
            comment.author?.avatarUrl ||
            createPlaceholderAvatar(comment.author?.name || "User", 64, "#FE2C55");

          const isLast = index === comments.length - 1;

          return (
            <div
              key={comment.id || index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: isLast ? 0 : 18,
              }}
            >
              {/* Left: Avatar + Content */}
              <div style={{ display: "flex", alignItems: "flex-start", flex: 1, marginRight: 16 }}>
                <img
                  src={avatar}
                  width={34}
                  height={34}
                  style={{ borderRadius: 17, objectFit: "cover", marginRight: 12, flexShrink: 0 }}
                />

                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Username */}
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: textSecondary, marginRight: 4 }}>
                      {comment.author?.uniqueId || comment.author?.name || "tiktok_user"}
                    </span>
                    {comment.author?.isVerified && <VerifiedBadge size={12} />}
                    {comment.author?.isAuthor && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 10,
                          fontWeight: 700,
                          backgroundColor: "#FE2C55",
                          color: "#ffffff",
                          padding: "1px 5px",
                          borderRadius: 3,
                        }}
                      >
                        Creator
                      </span>
                    )}
                  </div>

                  {/* Comment Text */}
                  <div style={{ fontSize: 14, lineHeight: "19px", color: textPrimary, marginBottom: 4 }}>
                    {comment.text}
                  </div>

                  {/* Subline: Time · Reply · Creator liked */}
                  <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: textSecondary }}>
                    <span>{formatSocialTime(comment.publishedAt, comment.timestamp)}</span>
                    <span style={{ margin: "0 6px" }}>•</span>
                    <span style={{ fontWeight: 600 }}>Reply</span>

                    {comment.isAuthorLiked && (
                      <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
                        <span style={{ color: "#FE2C55", marginRight: 3, fontSize: 11 }}>❤️</span>
                        <span style={{ fontSize: 11, color: "#FE2C55", fontWeight: 600 }}>Creator liked</span>
                      </div>
                    )}
                  </div>

                  {/* Replies prompt if any */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: textSecondary, marginTop: 6 }}>
                      <span>View {comment.replies.length} replies</span>
                      <svg width={12} height={12} viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: 3 }}>
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Vertical Heart + Count */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                <TikTokHeartIcon size={18} fill={comment.reactionType === "love" ? "#FE2C55" : textSecondary} />
                <span style={{ fontSize: 11, fontWeight: 500, color: textSecondary, marginTop: 2 }}>
                  {formatSocialCount(comment.likes || 0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
