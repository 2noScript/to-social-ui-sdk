import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatDuration, formatSocialCount, formatSocialTime } from "../../utils/format";
import { YouTubePlayIcon } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

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
  const timeStr = formatSocialTime(content.publishedAt, content.timestamp);
  const durationStr = content.media?.video?.durationSec ? formatDuration(content.media.video.durationSec) : "HD";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 20,
        padding: 18,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Thumbnail Container (16:9) */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: 315,
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: "#000",
          marginBottom: 14,
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

        {/* Duration badge bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 700,
            padding: "3px 6px",
            borderRadius: 4,
          }}
        >
          {durationStr}
        </div>

        {/* Small YouTube Play watermark top-left */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "4px 8px",
            borderRadius: 6,
          }}
        >
          <YouTubePlayIcon size={18} fill="#FF0000" />
        </div>
      </div>

      {/* 2. Channel Avatar + Title + Metadata */}
      <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <img
          src={avatarUri}
          width={40}
          height={40}
          style={{
            borderRadius: 20,
            objectFit: "cover",
            marginRight: 12,
            marginTop: 2,
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.35,
              color: textPrimary,
              marginBottom: 4,
            }}
          >
            {content.title || content.description || "YouTube Video"}
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary, marginBottom: 2 }}>
            <span style={{ marginRight: 4 }}>{authorName}</span>
            {content.author?.isVerified && (
              <svg width={14} height={14} viewBox="0 0 24 24" fill={textSecondary} style={{ marginRight: 4 }}>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.8 14.5l-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4-8.2 8.2z" />
              </svg>
            )}
          </div>

          <div style={{ fontSize: 13, color: textSecondary }}>
            <span>{viewsStr}</span>
            <span style={{ margin: "0 4px" }}>•</span>
            <span>{timeStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
