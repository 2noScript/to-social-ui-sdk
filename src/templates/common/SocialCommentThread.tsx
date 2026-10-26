import React from "react";
import type { UnifiedComment, RenderCommentThreadOptions, Platform } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { PinIcon, VerifiedBadge, renderReactionIcon } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface SocialCommentThreadProps {
  comments: UnifiedComment[];
  platform?: Platform;
  options?: RenderCommentThreadOptions;
}

export async function createSocialCommentThreadNode(props: SocialCommentThreadProps) {
  const { comments, platform = "FACEBOOK", options = {} } = props;
  const isDark = options.theme !== "light";

  const bg = isDark ? "#18191a" : "#ffffff";
  const cardBg = isDark ? "#242526" : "#f0f2f5";
  const textPrimary = isDark ? "#e4e6eb" : "#050505";
  const textSecondary = isDark ? "#b0b3b8" : "#65676b";
  const divider = isDark ? "#393a3b" : "#e4e6eb";
  const replyLine = isDark ? "#3a3b3c" : "#ced0d4";

  // Pre-resolve avatars
  const avatarMap = new Map<string, string>();
  if (options.prefetchImages !== false) {
    for (const c of comments) {
      if (c.author?.avatarUrl) {
        const uri = await resolveImageAsDataUri(c.author.avatarUrl, () =>
          createPlaceholderAvatar(c.author?.name || "User", 64, "#1877F2")
        );
        avatarMap.set(c.id, uri);
      }
      if (Array.isArray(c.replies)) {
        for (const r of c.replies) {
          if (r.author?.avatarUrl) {
            const uri = await resolveImageAsDataUri(r.author.avatarUrl, () =>
              createPlaceholderAvatar(r.author?.name || "User", 64, "#1877F2")
            );
            avatarMap.set(r.id, uri);
          }
        }
      }
    }
  }

  const title = options.title || "Comments";
  const totalCount = options.totalCount || comments.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 20,
        padding: 24,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        width: 600,
        boxSizing: "border-box",
      }}
    >
      {/* Thread Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 16,
          borderBottom: `1px solid ${divider}`,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: textPrimary }}>
            {title}
          </span>
          <span
            style={{
              marginLeft: 8,
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: cardBg,
              color: textSecondary,
              padding: "2px 8px",
              borderRadius: 12,
            }}
          >
            {formatSocialCount(totalCount)}
          </span>
        </div>
        <span style={{ fontSize: 13, color: textSecondary, fontWeight: 500 }}>
          Top Comments
        </span>
      </div>

      {/* Comment List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {comments.map((comment, index) => {
          const avatar =
            avatarMap.get(comment.id) ||
            comment.author?.avatarUrl ||
            createPlaceholderAvatar(comment.author?.name || "User", 64, "#1877F2");

          const isLast = index === comments.length - 1;
          const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0;

          return (
            <div
              key={comment.id || index}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: isLast ? 0 : 20,
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
                    marginBottom: 6,
                    marginLeft: 46,
                  }}
                >
                  <PinIcon size={13} color={textSecondary} />
                  <span style={{ marginLeft: 6 }}>Pinned by author</span>
                </div>
              )}

              {/* Main Comment Node */}
              <div style={{ display: "flex", position: "relative" }}>
                {/* Avatar */}
                <img
                  src={avatar}
                  width={38}
                  height={38}
                  style={{
                    borderRadius: 19,
                    objectFit: "cover",
                    marginRight: 12,
                    flexShrink: 0,
                  }}
                />

                {/* Comment Body */}
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: cardBg,
                      borderRadius: 16,
                      padding: "10px 14px",
                      position: "relative",
                    }}
                  >
                    {/* Author line */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginRight: 6 }}>
                        {comment.author?.name || comment.author?.uniqueId || "User"}
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

                    {/* Text */}
                    <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary }}>
                      {comment.text}
                    </div>

                    {/* Floating Reaction Pill */}
                    {(comment.likes && comment.likes > 0) || comment.reactionType ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: -10,
                          right: 12,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: bg,
                          border: `1px solid ${divider}`,
                          borderRadius: 12,
                          padding: "2px 6px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        <div style={{ display: "flex", marginRight: 4 }}>
                          {renderReactionIcon(comment.reactionType || "like", 14)}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: textSecondary }}>
                          {formatSocialCount(comment.likes || 1)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Actions & Time line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 12,
                      color: textSecondary,
                      fontWeight: 600,
                      marginTop: 4,
                      marginLeft: 8,
                    }}
                  >
                    <span>{formatSocialTime(comment.publishedAt, comment.timestamp)}</span>
                    <span style={{ margin: "0 8px" }}>•</span>
                    <span style={{ color: textSecondary }}>Like</span>
                    <span style={{ margin: "0 8px" }}>•</span>
                    <span style={{ color: textSecondary }}>Reply</span>

                    {comment.isAuthorLiked && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: 12,
                          backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                          padding: "2px 6px",
                          borderRadius: 10,
                        }}
                      >
                        <span style={{ color: "#FA3E3E", marginRight: 4, fontSize: 11 }}>❤️</span>
                        <span style={{ fontSize: 11, color: textSecondary }}>Liked by creator</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Nested Replies (Tree Indentation with connecting line) */}
              {hasReplies && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 19,
                    paddingLeft: 22,
                    borderLeft: `2px solid ${replyLine}`,
                    marginTop: 10,
                  }}
                >
                  {comment.replies!.map((reply, rIdx) => {
                    const rAvatar =
                      avatarMap.get(reply.id) ||
                      reply.author?.avatarUrl ||
                      createPlaceholderAvatar(reply.author?.name || "User", 48, "#1877F2");

                    return (
                      <div
                        key={reply.id || rIdx}
                        style={{
                          display: "flex",
                          position: "relative",
                          marginTop: 10,
                        }}
                      >
                        {/* Avatar */}
                        <img
                          src={rAvatar}
                          width={30}
                          height={30}
                          style={{
                            borderRadius: 15,
                            objectFit: "cover",
                            marginRight: 10,
                            flexShrink: 0,
                          }}
                        />

                        {/* Reply bubble */}
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: cardBg,
                              borderRadius: 14,
                              padding: "8px 12px",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                              <span style={{ fontWeight: 700, fontSize: 13, color: textPrimary, marginRight: 4 }}>
                                {reply.author?.name || "User"}
                              </span>
                              {reply.author?.isVerified && <VerifiedBadge size={12} />}
                              {reply.author?.isAuthor && (
                                <span
                                  style={{
                                    marginLeft: 4,
                                    fontSize: 9,
                                    fontWeight: 700,
                                    backgroundColor: "#1877F2",
                                    color: "#ffffff",
                                    padding: "1px 5px",
                                    borderRadius: 6,
                                  }}
                                >
                                  Author
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 13, lineHeight: 1.4, color: textPrimary }}>
                              {reply.text}
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: 11,
                              color: textSecondary,
                              fontWeight: 600,
                              marginTop: 3,
                              marginLeft: 6,
                            }}
                          >
                            <span>{formatSocialTime(reply.publishedAt, reply.timestamp)}</span>
                            <span style={{ margin: "0 6px" }}>•</span>
                            <span>Like</span>
                            {reply.likes && reply.likes > 0 ? (
                              <span style={{ marginLeft: 6, color: "#1877F2" }}>
                                👍 {formatSocialCount(reply.likes)}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
