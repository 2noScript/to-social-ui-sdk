import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatDuration, formatSocialCount, formatYouTubeTime } from "../../utils/format";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";
import { YouTubeVerifiedBadge, YouTubeThreeDotsIcon } from "../../utils/icons";

export interface YouTubeVideoCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createYouTubeVideoCardNode(props: YouTubeVideoCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme !== "light"; // YouTube modern default is dark

  const bg = isDark ? "#0f0f0f" : "#ffffff";
  const textPrimary = isDark ? "#f1f1f1" : "#0f0f0f";
  const textSecondary = isDark ? "#aaaaaa" : "#606060";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#FF0000"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#FF0000"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 560, 315))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 560, 315));

  const authorName = content.author?.name || "YouTube Creator";
  const viewsStr = `${formatSocialCount(content.stats?.views || content.stats?.likes || 0)} views`;
  const timeStr = formatYouTubeTime(content.publishedAt, content.timestamp);
  const durationStr = content.media?.video?.durationSec ? formatDuration(content.media.video.durationSec) : "12:34";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 16,
        padding: "16px",
        fontFamily: "Roboto, 'YouTube Noto', system-ui, -apple-system, sans-serif",
        width: 592,
        boxSizing: "border-box",
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      {/* 1. Thumbnail Container (16:9, exact YouTube 12px border-radius) */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 560,
          height: 315,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#000000",
          marginBottom: 12,
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

        {/* Real YouTube duration badge: bottom-right, black with 0.8 opacity, 4px border-radius */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.5,
            padding: "3px 5px",
            borderRadius: 4,
          }}
        >
          {durationStr}
        </div>
      </div>

      {/* 2. Channel Avatar + Title + Metadata */}
      <div style={{ display: "flex", alignItems: "flex-start", width: 560 }}>
        {/* Channel Avatar: 36px circle */}
        <img
          src={avatarUri}
          width={36}
          height={36}
          style={{
            borderRadius: 18,
            objectFit: "cover",
            marginRight: 12,
            marginTop: 2,
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Title: 16px, 500 weight, 22px line-height */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              lineHeight: "22px",
              color: textPrimary,
              marginBottom: 4,
              wordBreak: "break-word",
            }}
          >
            {content.title || content.description}
          </div>

          {/* Channel Name with Authentic YouTube Verified Checkmark */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary, marginBottom: 2 }}>
            <span style={{ marginRight: 5 }}>{authorName}</span>
            {content.author?.isVerified && <YouTubeVerifiedBadge size={14} color="#AAAAAA" />}
          </div>

          {/* Views & Date */}
          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary }}>
            <span>{viewsStr}</span>
            <span style={{ margin: "0 4px" }}>•</span>
            <span>{timeStr}</span>
          </div>
        </div>

        {/* 3 Dots Menu Button with official YouTube SVG */}
        <div style={{ display: "flex", paddingLeft: 8, marginTop: 2, cursor: "pointer" }}>
          <YouTubeThreeDotsIcon size={20} fill={textSecondary} />
        </div>
      </div>
    </div>
  );
}

