import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount, formatSocialTime } from "../../utils/format";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface BilibiliVideoCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createBilibiliVideoCardNode(props: BilibiliVideoCardProps) {
  const { content, options = {} } = props;
  const isDark = options.theme === "dark";

  const bg = isDark ? "#18191C" : "#ffffff";
  const textPrimary = isDark ? "#F1F2F3" : "#18191C";
  const textSecondary = isDark ? "#9499A0" : "#9499A0";
  const biliBlue = "#00AEEC";
  const biliPink = "#FB7299";

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, biliBlue))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, biliBlue));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 560, 315))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 560, 315));

  const authorName = content.author?.name || "Bilibili Uploader";
  const viewsStr = formatSocialCount(content.stats?.views || content.stats?.likes || 0);
  const commentsStr = formatSocialCount(content.stats?.comments || 0);
  const timeStr = formatSocialTime(content.publishedAt, content.timestamp);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: bg,
        borderRadius: 16,
        padding: 16,
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Cover with Danmaku & Play overlay */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: 315,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#000",
          marginBottom: 12,
        }}
      >
        <img
          src={coverUri}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Top-left BV id badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {content.id || "BILIBILI"}
        </div>

        {/* Bottom stats overlay bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12 }}>▶ {viewsStr}</span>
            <span>💬 {commentsStr}</span>
          </div>
          <div>{timeStr}</div>
        </div>
      </div>

      {/* 2. Title & Author Info */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img
          src={avatarUri}
          width={36}
          height={36}
          style={{ borderRadius: 18, objectFit: "cover", marginRight: 10, marginTop: 2 }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary, lineHeight: 1.4, marginBottom: 4 }}>
            {content.title || content.description || "Bilibili Video"}
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 13, color: textSecondary }}>
            <span style={{ marginRight: 6 }}>{authorName}</span>
            <div
              style={{
                backgroundColor: biliPink,
                color: "#ffffff",
                fontSize: 10,
                fontWeight: 800,
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              UP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
