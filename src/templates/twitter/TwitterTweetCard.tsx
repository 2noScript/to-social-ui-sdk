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

  // Official X / Twitter Color Tokens
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
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 526, 290))
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
        borderRadius: 16,
        padding: "16px 18px",
        border: `1px solid ${border}`,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Avatar + Name + Handle + X Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Avatar: 40px circle */}
          <img
            src={avatarUri}
            width={40}
            height={40}
            style={{ borderRadius: 20, objectFit: "cover", marginRight: 10 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", lineHeight: "1.2" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: textPrimary, marginRight: 4 }}>
                {authorName}
              </span>
              {content.author?.isVerified && <VerifiedBadge size={15} color={linkColor} />}
            </div>
            <span style={{ fontSize: 14, color: textSecondary, marginTop: 1 }}>
              {authorHandle}
            </span>
          </div>
        </div>

        {/* X Logo */}
        <TwitterXLogo size={18} color={textPrimary} />
      </div>

      {/* 2. Tweet Text (15px, 20px line-height) */}
      {textBody ? (
        <div
          style={{
            fontSize: 15,
            lineHeight: "20px",
            color: textPrimary,
            marginBottom: coverUri ? 12 : 14,
            wordBreak: "break-word",
          }}
        >
          {textBody}
        </div>
      ) : null}

      {/* 3. Media Preview (if available) - 16px border-radius */}
      {coverUri ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 290,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 12,
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
          fontSize: 14,
          color: textSecondary,
          paddingBottom: 12,
          borderBottom: `1px solid ${border}`,
          marginBottom: 12,
        }}
      >
        <span>{timeStr}</span>
        <span style={{ margin: "0 6px" }}>·</span>
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
          fontWeight: 400,
          padding: "0 6px",
        }}
      >
        {/* Reply */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterReplyIcon size={18} color={textSecondary} />
          </div>
          <span>{formatSocialCount(repliesCount)}</span>
        </div>

        {/* Repost */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterRepostIcon size={18} color={textSecondary} />
          </div>
          <span>{formatSocialCount(repostsCount)}</span>
        </div>

        {/* Like */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterLikeIcon size={18} color={textSecondary} />
          </div>
          <span>{formatSocialCount(likesCount)}</span>
        </div>

        {/* Views */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 6 }}>
            <TwitterViewIcon size={18} color={textSecondary} />
          </div>
          <span>{formatSocialCount(viewsCount > 0 ? viewsCount : 12400)}</span>
        </div>
      </div>
    </div>
  );
}
