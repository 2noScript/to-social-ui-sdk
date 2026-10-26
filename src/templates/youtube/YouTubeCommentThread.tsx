import React from "react";
import type { UnifiedComment, RenderOptions } from "../../types";
import { formatSocialCount, formatYouTubeTime } from "../../utils/format";
import {
  YouTubePinIcon,
  YouTubeLikeIcon,
  YouTubeDislikeIcon,
  YouTubeChevronDownIcon,
  CreatorHeartBadge,
} from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface YouTubeCommentThreadProps {
  comment: UnifiedComment;
  options?: RenderOptions;
}

export async function createYouTubeCommentThreadNode(props: YouTubeCommentThreadProps) {
  const { comment, options = {} } = props;
  const isDark = options.theme !== "light";

  // Official YouTube Color Tokens (verified from real YouTube web production)
  const bg = isDark ? "#0f0f0f" : "#ffffff";
  const textPrimary = isDark ? "#f1f1f1" : "#0f0f0f";
  const textSecondary = isDark ? "#aaaaaa" : "#606060";
  const authorBadgeBg = isDark ? "#272727" : "#888888";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(comment.author?.avatarUrl, () => createPlaceholderAvatar(comment.author?.name, 80, "#FF0000"))
    : (comment.author?.avatarUrl || createPlaceholderAvatar(comment.author?.name, 80, "#FF0000"));

  const authorHandle = comment.author?.uniqueId ? `@${comment.author.uniqueId}` : `@${comment.author?.name || "youtube_user"}`;
  const timeStr = formatYouTubeTime(comment.publishedAt, comment.timestamp);
  const likesCount = comment.likes || 0;

  const creatorReply = comment.replies?.find(r => r.author?.isAuthor);
  const rawCreatorAvatar = creatorReply?.author?.avatarUrl || (comment.author?.isAuthor ? comment.author?.avatarUrl : undefined);
  const creatorAvatarUri = rawCreatorAvatar && options.prefetchImages !== false
    ? await resolveImageAsDataUri(rawCreatorAvatar, () => createPlaceholderAvatar("Creator", 48, "#FF0000"))
    : (rawCreatorAvatar || createPlaceholderAvatar("Creator", 48, "#FF0000"));

  const creatorName = creatorReply?.author?.name ? `@${creatorReply.author.name}` : undefined;
  const pinnedByText = comment.pinnedBy ? `Pinned by ${comment.pinnedBy}` : (creatorName ? `Pinned by ${creatorName}` : "Pinned by creator");

  const repliesWithAvatars = await Promise.all(
    (comment.replies || []).map(async (r) => {
      const uri = r.author?.avatarUrl && options.prefetchImages !== false
        ? await resolveImageAsDataUri(r.author.avatarUrl, () => createPlaceholderAvatar(r.author?.name, 48, "#FF0000"))
        : (r.author?.avatarUrl || createPlaceholderAvatar(r.author?.name, 48, "#FF0000"));
      return { ...r, resolvedAvatar: uri };
    })
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 12,
        padding: "16px 20px",
        fontFamily: "Roboto, 'YouTube Noto', system-ui, -apple-system, sans-serif",
        width: 600,
        boxSizing: "border-box",
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* 1. Official YouTube Pinned Comment Header */}
      {comment.isPinned && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            fontWeight: 400,
            color: textSecondary,
            marginBottom: 6,
            marginLeft: 56, // 40px avatar + 16px gap
          }}
        >
          <YouTubePinIcon size={14} fill={textSecondary} />
          <span style={{ marginLeft: 8 }}>{pinnedByText}</span>
        </div>
      )}

      {/* 2. Comment Row (Avatar 40px + Content) */}
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        {/* Channel Avatar: 40px circle, 16px right margin */}
        <img
          src={avatarUri}
          width={40}
          height={40}
          style={{
            borderRadius: 20,
            objectFit: "cover",
            marginRight: 16,
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Author Name + Badge + Timestamp */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: comment.author?.isAuthor ? "#ffffff" : textPrimary,
                backgroundColor: comment.author?.isAuthor ? authorBadgeBg : "transparent",
                padding: comment.author?.isAuthor ? "1px 8px" : "0",
                borderRadius: comment.author?.isAuthor ? 10 : 0,
                marginRight: 6,
              }}
            >
              {authorHandle}
            </span>
            {comment.author?.isVerified && (
              <svg width={12} height={12} viewBox="0 0 24 24" fill={textSecondary} style={{ marginRight: 6 }}>
                <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm5.707 7.293a1 1 0 010 1.414L10 17.414l-3.707-3.707a1 1 0 111.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0Z" />
              </svg>
            )}
            <span style={{ fontSize: 12, fontWeight: 400, color: textSecondary }}>{timeStr}</span>
          </div>

          {/* Comment text */}
          <div
            style={{
              fontSize: 14,
              lineHeight: "20px",
              color: textPrimary,
              marginTop: 2,
              marginBottom: 6,
              wordBreak: "break-word",
            }}
          >
            {comment.text}
          </div>

          {/* Action Row: Thumbs Up • Count • Thumbs Down • Creator Heart • Reply */}
          <div style={{ display: "flex", alignItems: "center", height: 32, fontSize: 12, color: textSecondary }}>
            {/* Thumbs up */}
            <div style={{ display: "flex", alignItems: "center", marginRight: 12 }}>
              <YouTubeLikeIcon size={16} fill={textSecondary} />
              {likesCount > 0 && (
                <span style={{ fontSize: 12, color: textSecondary, fontWeight: 400, marginLeft: 6 }}>
                  {formatSocialCount(likesCount)}
                </span>
              )}
            </div>

            {/* Thumbs down */}
            <div style={{ display: "flex", alignItems: "center", marginRight: 14 }}>
              <YouTubeDislikeIcon size={16} fill={textSecondary} />
            </div>

            {/* Creator Heart */}
            {comment.isAuthorLiked && (
              <div style={{ display: "flex", alignItems: "center", marginRight: 16 }}>
                <CreatorHeartBadge size={22} avatarUrl={creatorAvatarUri} borderColor={bg} />
              </div>
            )}

            {/* Reply Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                fontSize: 12,
                color: textPrimary,
                padding: "0 12px",
                height: 32,
                borderRadius: 16,
                cursor: "pointer",
              }}
            >
              Reply
            </div>
          </div>
        </div>
      </div>

      {/* 3. Replies Dropdown and Threads */}
      {repliesWithAvatars.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 56, marginTop: 4 }}>
          {/* Authentic YouTube Replies Pill Button with right chevron */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#3ea6ff",
              borderRadius: 18,
              padding: "0 12px",
              height: 32,
              width: "fit-content",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              marginBottom: 4,
            }}
          >
            <span style={{ marginRight: 6 }}>
              {repliesWithAvatars.length} {repliesWithAvatars.length === 1 ? "reply" : "replies"}
            </span>
            <YouTubeChevronDownIcon size={18} fill="#3ea6ff" />
          </div>

          {repliesWithAvatars.map((r, i) => (
            <div key={r.id || i} style={{ display: "flex", alignItems: "flex-start", marginTop: 8 }}>
              <img
                src={r.resolvedAvatar}
                width={24}
                height={24}
                style={{ borderRadius: 12, marginRight: 12, flexShrink: 0, objectFit: "cover" }}
              />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: r.author?.isAuthor ? "#ffffff" : textPrimary,
                      marginRight: 6,
                      backgroundColor: r.author?.isAuthor ? authorBadgeBg : "transparent",
                      padding: r.author?.isAuthor ? "1px 8px" : "0",
                      borderRadius: r.author?.isAuthor ? 10 : 0,
                    }}
                  >
                    {r.author?.name ? `@${r.author.name}` : (r.author?.uniqueId ? `@${r.author.uniqueId}` : "User")}
                  </span>
                  {r.author?.isAuthor && (
                    <svg width={12} height={12} viewBox="0 0 24 24" fill={textSecondary} style={{ marginRight: 6 }}>
                      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm5.707 7.293a1 1 0 010 1.414L10 17.414l-3.707-3.707a1 1 0 111.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0Z" />
                    </svg>
                  )}
                  <span style={{ fontSize: 12, color: textSecondary }}>
                    {formatYouTubeTime(r.publishedAt, r.timestamp)}
                  </span>
                </div>
                <span style={{ fontSize: 14, color: textPrimary, lineHeight: "20px", wordBreak: "break-word" }}>
                  {r.text}
                </span>

                {/* Reply item actions */}
                <div style={{ display: "flex", alignItems: "center", height: 28, fontSize: 12, color: textSecondary, marginTop: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", marginRight: 12 }}>
                    <YouTubeLikeIcon size={14} fill={textSecondary} />
                    {(r.likes || 0) > 0 && (
                      <span style={{ fontSize: 11, color: textSecondary, marginLeft: 4 }}>
                        {formatSocialCount(r.likes)}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", marginRight: 12 }}>
                    <YouTubeDislikeIcon size={14} fill={textSecondary} />
                  </div>
                  <span style={{ fontWeight: 500, fontSize: 12, color: textPrimary, cursor: "pointer" }}>Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

