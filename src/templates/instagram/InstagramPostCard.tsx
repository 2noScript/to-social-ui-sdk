import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { InstagramHeartIcon, InstagramCommentIcon, InstagramShareIcon, InstagramBookmarkIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface InstagramPostCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createInstagramPostCardNode(props: InstagramPostCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme === "dark";

  const bg = isDark ? "#000000" : "#ffffff";
  const textPrimary = isDark ? "#F5F5F5" : "#262626";
  const textSecondary = isDark ? "#A8A8A8" : "#8E8E8E";
  const border = isDark ? "#262626" : "#DBDBDB";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#E1306C"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#E1306C"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 540, 540))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 540, 540));

  const authorHandle = content.author?.uniqueId || content.author?.name?.toLowerCase().replace(/\s+/g, "_") || "instagram_user";
  const authorName = content.author?.name || authorHandle;
  const caption = content.description || content.title || "";
  const likesCount = content.stats?.likes || 0;
  const commentsCount = content.stats?.comments || 0;
  const timeStr = formatSocialTime(content.publishedAt, content.timestamp);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 540,
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${border}`,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Avatar + Username + More dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Story Gradient Ring */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundImage: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              marginRight: 10,
              padding: 2,
            }}
          >
            <img
              src={avatarUri}
              width={38}
              height={38}
              style={{
                borderRadius: 19,
                objectFit: "cover",
                border: `2px solid ${bg}`,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginRight: 4 }}>
                {authorHandle}
              </span>
              {content.author?.isVerified && <VerifiedBadge size={13} color="#0095F6" />}
            </div>
            <span style={{ fontSize: 11, color: textSecondary }}>Original audio</span>
          </div>
        </div>

        {/* 3 dots */}
        <div style={{ display: "flex", color: textPrimary, fontSize: 18, fontWeight: 700 }}>
          •••
        </div>
      </div>

      {/* 2. Post Media (Square 1:1 or 4:5 image) */}
      <div
        style={{
          display: "flex",
          width: 540,
          height: 460,
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <img
          src={coverUri}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 3. Action Bar: Heart, Comment, Share ... Bookmark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px 8px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 16 }}>
            <InstagramHeartIcon size={24} color={textPrimary} />
          </div>
          <div style={{ marginRight: 16 }}>
            <InstagramCommentIcon size={24} color={textPrimary} />
          </div>
          <div>
            <InstagramShareIcon size={24} color={textPrimary} />
          </div>
        </div>

        <div>
          <InstagramBookmarkIcon size={24} color={textPrimary} />
        </div>
      </div>

      {/* 4. Likes & Caption */}
      <div style={{ display: "flex", flexDirection: "column", padding: "0 16px 16px 16px" }}>
        {/* Likes Count */}
        <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary, marginBottom: 6 }}>
          {formatSocialCount(likesCount)} likes
        </div>

        {/* Caption */}
        {caption ? (
          <div style={{ fontSize: 14, lineHeight: 1.45, color: textPrimary, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, marginRight: 6 }}>{authorHandle}</span>
            <span>{caption}</span>
          </div>
        ) : null}

        {/* View all comments */}
        {commentsCount > 0 ? (
          <div style={{ fontSize: 13, color: textSecondary, marginBottom: 4 }}>
            View all {formatSocialCount(commentsCount)} comments
          </div>
        ) : null}

        {/* Time */}
        <div style={{ fontSize: 11, color: textSecondary, textTransform: "uppercase" }}>
          {timeStr}
        </div>
      </div>
    </div>
  );
}
