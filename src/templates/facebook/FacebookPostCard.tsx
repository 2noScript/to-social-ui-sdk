import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import {
  FbLikeIcon,
  FbLoveIcon,
  FbCareIcon,
  FbHahaIcon,
  FbFeedLikeIcon,
  FbFeedCommentIcon,
  FbFeedShareIcon,
  FbMoreDotsIcon,
  VerifiedBadge,
} from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface FacebookPostCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createFacebookPostCardNode(props: FacebookPostCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme === "dark";

  // Official Facebook Desktop / Mobile Web Color Tokens
  const bg = isDark ? "#242526" : "#ffffff";
  const textPrimary = isDark ? "#E4E6EB" : "#050505";
  const textSecondary = isDark ? "#B0B3B8" : "#65676B";
  const divider = isDark ? "#393A3B" : "#CED0D4";
  const cardBorder = isDark ? "1px solid #3E4042" : "1px solid #CED0D4";

  // Pre-resolve images to data URIs
  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#1877F2"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#1877F2"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 600, 338))
    : (coverUrl ? coverUrl : undefined);

  const authorName = content.author?.name || "Facebook User";
  const timeStr = formatSocialTime(content.publishedAt, content.timestamp);
  const textBody = content.description || content.title || "";

  const totalLikes = content.stats?.likes || content.stats?.reactions?.like || 0;
  const commentsCount = content.stats?.comments || 0;
  const sharesCount = content.stats?.shares || 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 8,
        border: cardBorder,
        overflow: "hidden",
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
        boxShadow: isDark ? "0 1px 2px rgba(0, 0, 0, 0.25)" : "0 1px 2px rgba(0, 0, 0, 0.1)",
        width: 600,
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Avatar + Name + Time + 3 Dots (Padding 12px 16px 0 16px) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "12px 16px 0 16px",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={avatarUri}
            width={40}
            height={40}
            style={{
              borderRadius: 20,
              objectFit: "cover",
              marginRight: 10,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2" }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: textPrimary, marginRight: 4 }}>
                {authorName}
              </span>
              {content.author?.isVerified && <VerifiedBadge size={14} />}
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary, marginTop: 3 }}>
              <span>{timeStr}</span>
              <span style={{ margin: "0 4px" }}>•</span>
              {/* Globe icon */}
              <svg width={13} height={13} viewBox="0 0 16 16" fill={textSecondary}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.07 8c0-.3.03-.59.08-.88l3.18 1.91a1.5 1.5 0 0 0 1.25.18l1.4-.47a.5.5 0 0 0 .34-.47V7a1 1 0 0 1 1-1h.5a.5.5 0 0 0 .5-.5V4.7a.5.5 0 0 0-.28-.45L7.26 3.12A6.97 6.97 0 0 1 8 1c3.87 0 7 3.13 7 7 0 .8-.14 1.57-.4 2.29l-1.89-1.26a.5.5 0 0 0-.55 0l-.82.55a.5.5 0 0 0-.22.42v1.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 .5.5v.71A6.98 6.98 0 0 1 8 15a6.97 6.97 0 0 1-6.93-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Top-Right 3 Dots Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 18,
            color: textSecondary,
          }}
        >
          <FbMoreDotsIcon size={20} fill={textSecondary} />
        </div>
      </div>

      {/* 2. Text Content (Padding 0 16px 12px 16px) */}
      {textBody ? (
        <div
          style={{
            fontSize: 15,
            lineHeight: "22px",
            padding: "0 16px 12px 16px",
            color: textPrimary,
            wordBreak: "break-word",
          }}
        >
          {textBody}
        </div>
      ) : null}

      {/* 3. Media Preview (FULL BLEED Edge-to-Edge: 600px width, 0 border radius) */}
      {coverUri ? (
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 600,
            height: 338,
            overflow: "hidden",
            backgroundColor: "#000000",
            borderTop: `1px solid ${divider}`,
            borderBottom: `1px solid ${divider}`,
          }}
        >
          <img
            src={coverUri}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {content.type === "VIDEO" && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "rgba(0,0,0,0.65)",
                }}
              >
                <svg width={26} height={26} viewBox="0 0 24 24" fill="#ffffff">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* 4. Stats Row (Reactions pill with overlapping borders, padding 10px 16px 10px 16px) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 14,
          color: textSecondary,
          padding: "10px 16px 10px 16px",
          borderBottom: `1px solid ${divider}`,
        }}
      >
        {/* Left: Reaction Stack & Count */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
            <div style={{ display: "flex", borderRadius: 10, border: `2px solid ${bg}`, zIndex: 3 }}>
              <FbLikeIcon size={18} />
            </div>
            <div style={{ display: "flex", marginLeft: -5, borderRadius: 10, border: `2px solid ${bg}`, zIndex: 2 }}>
              <FbLoveIcon size={18} />
            </div>
            {content.stats?.reactions?.care ? (
              <div style={{ display: "flex", marginLeft: -5, borderRadius: 10, border: `2px solid ${bg}`, zIndex: 1 }}>
                <FbCareIcon size={18} />
              </div>
            ) : content.stats?.reactions?.haha ? (
              <div style={{ display: "flex", marginLeft: -5, borderRadius: 10, border: `2px solid ${bg}`, zIndex: 1 }}>
                <FbHahaIcon size={18} />
              </div>
            ) : null}
          </div>
          <span style={{ fontWeight: 400, fontSize: 14 }}>{formatSocialCount(totalLikes)}</span>
        </div>

        {/* Right: Comments and Shares */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 14 }}>
          {commentsCount > 0 && <span style={{ marginRight: 12 }}>{formatSocialCount(commentsCount)} comments</span>}
          {sharesCount > 0 && <span>{formatSocialCount(sharesCount)} shares</span>}
        </div>
      </div>

      {/* 5. Action Buttons (Like, Comment, Share) - Padding 4px 12px 4px 12px */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 12px",
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
        }}
      >
        {/* Like */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            height: 36,
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", marginRight: 8 }}>
            <FbFeedLikeIcon size={20} color={textSecondary} />
          </div>
          <span>Like</span>
        </div>

        {/* Comment */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            height: 36,
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", marginRight: 8 }}>
            <FbFeedCommentIcon size={20} color={textSecondary} />
          </div>
          <span>Comment</span>
        </div>

        {/* Share */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            height: 36,
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", marginRight: 8 }}>
            <FbFeedShareIcon size={20} color={textSecondary} />
          </div>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}

