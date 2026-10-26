import React from "react";
import type { UnifiedAuthor, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import { VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar } from "../../utils/image";

export interface SocialProfileCardProps {
  author: UnifiedAuthor;
  platform?: string;
  options?: RenderOptions;
}

const PLATFORM_COLORS: Record<string, { bg: string; accent: string }> = {
  FACEBOOK: { bg: "#1877F2", accent: "#E7F3FF" },
  TIKTOK: { bg: "#FE2C55", accent: "#25F4EE" },
  DOUYIN: { bg: "#161823", accent: "#FE2C55" },
  YOUTUBE: { bg: "#FF0000", accent: "#FFFFFF" },
  BILIBILI: { bg: "#00AEEC", accent: "#FB7299" },
};

export async function createSocialProfileCardNode(props: SocialProfileCardProps) {
  const { author, platform = "FACEBOOK", options = {} } = props;
  const isDark = options.theme === "dark";

  const cardBg = isDark ? "#1E1E2E" : "#FFFFFF";
  const textPrimary = isDark ? "#CDD6F4" : "#1E1E2E";
  const textSecondary = isDark ? "#A6ADC8" : "#6C7086";
  const statBoxBg = isDark ? "#313244" : "#F5F5F7";

  const brand = PLATFORM_COLORS[platform.toUpperCase()] || { bg: "#3B82F6", accent: "#FFFFFF" };

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(author.avatarUrl, () => createPlaceholderAvatar(author.name || author.uniqueId, 100, brand.bg))
    : (author.avatarUrl || createPlaceholderAvatar(author.name || author.uniqueId, 100, brand.bg));

  const authorName = author.name || author.uniqueId || "Social Creator";
  const handle = author.uniqueId ? `@${author.uniqueId}` : "";
  const followers = author.stats?.followers;
  const following = author.stats?.following;
  const totalLikes = author.stats?.totalLikes;
  const postCount = author.stats?.postCount;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: cardBg,
        borderRadius: 24,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header Banner */}
      <div
        style={{
          display: "flex",
          position: "relative",
          height: 140,
          backgroundImage: `linear-gradient(135deg, ${brand.bg} 0%, #11111B 100%)`,
          padding: 16,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        {/* Platform Pill */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: 16,
            letterSpacing: 0.5,
          }}
        >
          {platform.toUpperCase()}
        </div>
      </div>

      {/* 2. Avatar (Overlapping banner) + Name & Bio */}
      <div style={{ display: "flex", flexDirection: "column", padding: "0 24px 24px 24px", position: "relative" }}>
        {/* Avatar */}
        <div style={{ display: "flex", marginTop: -48, marginBottom: 12 }}>
          <img
            src={avatarUri}
            width={88}
            height={88}
            style={{
              borderRadius: 44,
              border: `4px solid ${cardBg}`,
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Name + Verified */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: textPrimary, marginRight: 8 }}>
            {authorName}
          </span>
          {author.isVerified && <VerifiedBadge size={18} />}
        </div>

        {/* Handle */}
        {handle && (
          <div style={{ fontSize: 14, color: textSecondary, fontWeight: 500, marginBottom: 12 }}>
            {handle}
          </div>
        )}

        {/* Bio */}
        {author.bio && (
          <div style={{ fontSize: 14, lineHeight: 1.5, color: textPrimary, marginBottom: 18, wordBreak: "break-word" }}>
            {author.bio}
          </div>
        )}

        {/* 3. Stats Grid */}
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          {followers !== undefined && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: statBoxBg, padding: "10px 8px", borderRadius: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>{formatSocialCount(followers)}</span>
              <span style={{ fontSize: 11, color: textSecondary, marginTop: 2, fontWeight: 600 }}>Followers</span>
            </div>
          )}

          {following !== undefined && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: statBoxBg, padding: "10px 8px", borderRadius: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>{formatSocialCount(following)}</span>
              <span style={{ fontSize: 11, color: textSecondary, marginTop: 2, fontWeight: 600 }}>Following</span>
            </div>
          )}

          {totalLikes !== undefined && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: statBoxBg, padding: "10px 8px", borderRadius: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>{formatSocialCount(totalLikes)}</span>
              <span style={{ fontSize: 11, color: textSecondary, marginTop: 2, fontWeight: 600 }}>Likes</span>
            </div>
          )}

          {postCount !== undefined && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: statBoxBg, padding: "10px 8px", borderRadius: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>{formatSocialCount(postCount)}</span>
              <span style={{ fontSize: 11, color: textSecondary, marginTop: 2, fontWeight: 600 }}>Posts</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
