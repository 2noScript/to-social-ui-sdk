import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { TwitterXLogo, TwitterReplyIcon, TwitterRepostIcon, TwitterLikeIcon, TwitterViewIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface TwitterTweetCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createTwitterTweetCardNode(props: TwitterTweetCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme !== "light"; // Twitter default is dark

  const bg = isDark ? "#000000" : "#ffffff";
  const textPrimary = isDark ? "#e7e9ea" : "#0f1419";
  const textSecondary = isDark ? "#71767b" : "#536471";
  const border = isDark ? "#2f3336" : "#eff3f4";
  const linkColor = "#1d9bf0";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, linkColor))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, linkColor));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 500, 280))
    : (coverUrl ? coverUrl : undefined);

  const authorName = content.author?.name || "Twitter User";
  const authorHandle = content.author?.uniqueId ? `@${content.author.uniqueId}` : `@${authorName.toLowerCase().replace(/\s+/g, "")}`;
  const textBody = content.description || content.title || "";
  const timeStr = formatSocialTime(content.publishedAt, content.timestamp);

  const repliesCount = content.stats?.comments || 0;
  const repostsCount = content.stats?.shares || content.stats?.reposts || 0;
  const likesCount = content.stats?.likes || 0;
  const viewsCount = content.stats?.views || 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 560,
        backgroundColor: bg,
        color: textPrimary,
        borderRadius: 20,
        padding: 20,
        border: `1px solid ${border}`,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Avatar + Name + Handle + X Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={avatarUri}
            width={44}
            height={44}
            style={{ borderRadius: 22, objectFit: "cover", marginRight: 12 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: textPrimary, marginRight: 4 }}>
                {authorName}
              </span>
              {content.author?.isVerified && <VerifiedBadge size={16} color={linkColor} />}
            </div>
            <span style={{ fontSize: 14, color: textSecondary }}>
              {authorHandle}
            </span>
          </div>
        </div>

        {/* X Logo */}
        <TwitterXLogo size={20} color={textPrimary} />
      </div>

      {/* 2. Tweet Text */}
      {textBody ? (
        <div
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            color: textPrimary,
            marginBottom: coverUri ? 12 : 16,
          }}
        >
          {textBody}
        </div>
      ) : null}

      {/* 3. Media Preview (if available) */}
      {coverUri ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 280,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 14,
            border: `1px solid ${border}`,
          }}
        >
          <img
            src={coverUri}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : null}

      {/* 4. Timestamp & Meta line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 13,
          color: textSecondary,
          paddingBottom: 12,
          borderBottom: `1px solid ${border}`,
          marginBottom: 12,
        }}
      >
        <span>{timeStr}</span>
        <span style={{ margin: "0 6px" }}>•</span>
        <span style={{ color: textPrimary, fontWeight: 700 }}>Twitter for Web</span>
      </div>

      {/* 5. Metrics Action Bar (Reply, Repost, Like, Views) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: textSecondary,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {/* Reply */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterReplyIcon size={16} color={textSecondary} />
          </div>
          <span>{formatSocialCount(repliesCount)}</span>
        </div>

        {/* Repost */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterRepostIcon size={16} color={textSecondary} />
          </div>
          <span>{formatSocialCount(repostsCount)}</span>
        </div>

        {/* Like */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterLikeIcon size={16} color={textSecondary} />
          </div>
          <span>{formatSocialCount(likesCount)}</span>
        </div>

        {/* Views */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterViewIcon size={16} color={textSecondary} />
          </div>
          <span>{formatSocialCount(viewsCount > 0 ? viewsCount : 12400)}</span>
        </div>
      </div>
    </div>
  );
}
