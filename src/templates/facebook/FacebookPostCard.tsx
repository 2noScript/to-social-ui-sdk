import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { FbLikeIcon, FbLoveIcon, FbCareIcon, FbHahaIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface FacebookPostCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createFacebookPostCardNode(props: FacebookPostCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme === "dark";

  const bg = isDark ? "#242526" : "#ffffff";
  const textPrimary = isDark ? "#E4E6EB" : "#050505";
  const textSecondary = isDark ? "#B0B3B8" : "#65676B";
  const divider = isDark ? "#3E4042" : "#CED0D4";
  const bubbleBg = isDark ? "#3A3B3C" : "#F0F2F5";

  // Pre-resolve images to data URIs
  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#1877F2"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#1877F2"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 560, 315))
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
        borderRadius: 16,
        padding: 20,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Avatar + Name + Time */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
        <img
          src={avatarUri}
          width={48}
          height={48}
          style={{
            borderRadius: 24,
            objectFit: "cover",
            marginRight: 12,
            border: `1px solid ${divider}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginRight: 6 }}>
              {authorName}
            </span>
            {content.author?.isVerified && <VerifiedBadge size={16} />}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary, marginTop: 2 }}>
            <span>{timeStr}</span>
            <span style={{ margin: "0 4px" }}>•</span>
            {/* Globe icon */}
            <svg width={12} height={12} viewBox="0 0 16 16" fill={textSecondary}>
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.07 8c0-.3.03-.59.08-.88l3.18 1.91a1.5 1.5 0 0 0 1.25.18l1.4-.47a.5.5 0 0 0 .34-.47V7a1 1 0 0 1 1-1h.5a.5.5 0 0 0 .5-.5V4.7a.5.5 0 0 0-.28-.45L7.26 3.12A6.97 6.97 0 0 1 8 1c3.87 0 7 3.13 7 7 0 .8-.14 1.57-.4 2.29l-1.89-1.26a.5.5 0 0 0-.55 0l-.82.55a.5.5 0 0 0-.22.42v1.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 .5.5v.71A6.98 6.98 0 0 1 8 15a6.97 6.97 0 0 1-6.93-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Text Content */}
      {textBody ? (
        <div style={{ fontSize: 15, lineHeight: 1.5, marginBottom: 14, color: textPrimary }}>
          {textBody}
        </div>
      ) : null}

      {/* 3. Media Preview (Cover / Image) */}
      {coverUri ? (
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 14,
            backgroundColor: "#000",
          }}
        >
          <img
            src={coverUri}
            style={{
              width: "100%",
              height: 315,
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
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "rgba(0,0,0,0.65)",
                }}
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="#ffffff">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* 4. Stats Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 13,
          color: textSecondary,
          paddingBottom: 10,
          borderBottom: `1px solid ${divider}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", marginRight: 6 }}>
            <FbLikeIcon size={18} />
            <div style={{ marginLeft: -4 }}>
              <FbLoveIcon size={18} />
            </div>
            {content.stats?.reactions?.care ? (
              <div style={{ marginLeft: -4 }}>
                <FbCareIcon size={18} />
              </div>
            ) : content.stats?.reactions?.haha ? (
              <div style={{ marginLeft: -4 }}>
                <FbHahaIcon size={18} />
              </div>
            ) : null}
          </div>
          <span>{formatSocialCount(totalLikes)}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {commentsCount > 0 && <span style={{ marginRight: 12 }}>{formatSocialCount(commentsCount)} comments</span>}
          {sharesCount > 0 && <span>{formatSocialCount(sharesCount)} shares</span>}
        </div>
      </div>

      {/* 5. Action Buttons (Like, Comment, Share) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 8,
          fontSize: 14,
          fontWeight: 600,
          color: textSecondary,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth={2} style={{ marginRight: 6 }}>
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          Like
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth={2} style={{ marginRight: 6 }}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Comment
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={textSecondary} strokeWidth={2} style={{ marginRight: 6 }}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </div>
      </div>
    </div>
  );
}
