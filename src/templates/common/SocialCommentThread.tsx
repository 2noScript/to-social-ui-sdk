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

  const bg = isDark ? "#242526" : "#ffffff";
  const bubbleBg = isDark ? "#3A3B3C" : "#F0F2F5";
  const badgeBg = isDark ? "#242526" : "#ffffff";
  const textPrimary = isDark ? "#E4E6EB" : "#050505";
  const textSecondary = isDark ? "#B0B3B8" : "#65676B";
  const divider = isDark ? "#3E4042" : "#CED0D4";
  const replyLine = isDark ? "#3E4042" : "#CED0D4";

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

  const cardBorder = isDark ? "1px solid #3E4042" : "1px solid #CED0D4";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 10,
        border: cardBorder,
        padding: "16px 16px 20px 16px",
        fontFamily: "Inter, sans-serif",
        boxShadow: isDark ? "0 1px 2px rgba(0,0,0,0.25)" : "0 1px 2px rgba(0,0,0,0.1)",
        width: 600,
        boxSizing: "border-box",
      }}
    >
      {/* Thread Header: Authentic Facebook Comments Header with Sorting Dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          borderBottom: `1px solid ${divider}`,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: textPrimary }}>
            {title}
          </span>
          <span style={{ margin: "0 6px", color: textSecondary, fontWeight: 700 }}>•</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: textSecondary,
            }}
          >
            {formatSocialCount(totalCount)}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", color: textSecondary, fontSize: 13, fontWeight: 600 }}>
          <span>Most relevant</span>
          <svg width={14} height={14} viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: 4 }}>
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
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
                  width={36}
                  height={36}
                  style={{
                    borderRadius: 18,
                    objectFit: "cover",
                    marginRight: 8,
                    flexShrink: 0,
                  }}
                />

                {/* Comment Body */}
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: bubbleBg,
                      borderRadius: 18,
                      padding: "8px 12px 9px 12px",
                      position: "relative",
                      alignSelf: "flex-start",
                      maxWidth: "92%",
                    }}
                  >
                    {/* Author line */}
                    <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2308" }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: textPrimary, marginRight: 4 }}>
                        {comment.author?.name || comment.author?.uniqueId || "User"}
                      </span>
                      {comment.author?.isVerified && <VerifiedBadge size={13} />}
                      {comment.author?.isAuthor && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            backgroundColor: isDark ? "#4B4C4F" : "#E4E6EB",
                            color: textPrimary,
                            padding: "1px 6px",
                            borderRadius: 4,
                          }}
                        >
                          Author
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ fontSize: 15, lineHeight: "20px", color: textPrimary, marginTop: 3 }}>
                      {comment.text}
                    </div>

                    {/* Floating Reaction Pill */}
                    {(comment.likes && comment.likes > 0) || comment.reactionType ? (
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
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 400, color: textSecondary, marginLeft: 3 }}>
                          {formatSocialCount(comment.likes || 1)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Actions & Time line: Like • Reply • Time • Liked by author */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 12,
                      color: textSecondary,
                      fontWeight: 700,
                      marginTop: 4,
                      marginLeft: 12,
                    }}
                  >
                    <span style={{ color: comment.reactionType === "love" ? "#FA3E3E" : (comment.reactionType ? "#1877F2" : textSecondary) }}>
                      Like
                    </span>
                    <span style={{ margin: "0 6px", fontWeight: 400 }}>•</span>
                    <span style={{ color: textSecondary }}>Reply</span>
                    <span style={{ margin: "0 6px", fontWeight: 400 }}>•</span>
                    <span style={{ fontWeight: 400 }}>{formatSocialTime(comment.publishedAt, comment.timestamp)}</span>

                    {comment.isAuthorLiked && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: 10,
                          backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                          padding: "2px 6px",
                          borderRadius: 10,
                        }}
                      >
                        <span style={{ color: "#FA3E3E", marginRight: 4, fontSize: 11 }}>❤️</span>
                        <span style={{ fontSize: 11, color: textSecondary, fontWeight: 500 }}>Liked by author</span>
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
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "flex-start" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              backgroundColor: bubbleBg,
                              borderRadius: 16,
                              padding: "6px 10px 7px 10px",
                              position: "relative",
                              alignSelf: "flex-start",
                              maxWidth: "92%",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2" }}>
                              <span style={{ fontWeight: 600, fontSize: 12, color: textPrimary, marginRight: 4 }}>
                                {reply.author?.name || "User"}
                              </span>
                              {reply.author?.isVerified && <VerifiedBadge size={12} />}
                              {reply.author?.isAuthor && (
                                <span
                                  style={{
                                    marginLeft: 4,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    backgroundColor: isDark ? "#4B4C4F" : "#E4E6EB",
                                    color: textPrimary,
                                    padding: "1px 5px",
                                    borderRadius: 4,
                                  }}
                                >
                                  Author
                                </span>
                              )}
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
                              fontWeight: 700,
                              marginTop: 3,
                              marginLeft: 8,
                            }}
                          >
                            <span>Like</span>
                            <span style={{ margin: "0 6px", fontWeight: 400 }}>•</span>
                            <span style={{ color: textSecondary }}>Reply</span>
                            <span style={{ margin: "0 6px", fontWeight: 400 }}>•</span>
                            <span style={{ fontWeight: 400 }}>{formatSocialTime(reply.publishedAt, reply.timestamp)}</span>
                            {reply.likes && reply.likes > 0 ? (
                              <span style={{ marginLeft: 6, color: "#1877F2", fontWeight: 600 }}>
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
