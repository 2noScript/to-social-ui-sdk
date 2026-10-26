import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import {
  MusicNoteIcon,
  TikTokBookmarkIcon,
  TikTokCommentIcon,
  TikTokHeartIcon,
  TikTokPlusIcon,
  TikTokShareIcon,
  VerifiedBadge,
} from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface TikTokVideoCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createTikTokVideoCardNode(props: TikTokVideoCardProps) {
  const { content, options = {} } = props;

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name || content.author?.uniqueId, 80, "#FE2C55"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name || content.author?.uniqueId, 80, "#FE2C55"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 854))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 854));

  const authorHandle = content.author?.uniqueId ? `@${content.author.uniqueId}` : `@${content.author?.name || "tiktok_creator"}`;
  const authorName = content.author?.name || content.author?.uniqueId || "Creator";
  const caption = content.description || content.title || "";
  const musicTitle = content.media?.audio?.title ? `${content.media.audio.title} - ${content.media.audio.author || authorName}` : `original sound - ${authorName}`;

  const likesCount = content.stats?.likes || 0;
  const commentsCount = content.stats?.comments || 0;
  const bookmarksCount = content.stats?.bookmarks || 0;
  const sharesCount = content.stats?.shares || 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 480,
        height: 854,
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "'TikTok Sans', 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
      }}
    >
      {/* 1. Full-bleed Video Cover / Background (Exact 9:16 ratio) */}
      <img
        src={coverUri}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 854,
          objectFit: "cover",
          filter: "brightness(0.94)",
        }}
      />

      {/* Top subtle vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          display: "flex",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Bottom dark gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 380,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
        }}
      />

      {/* 2. Top Header: Authentic Following | For You Tabs + Search */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 10,
        }}
      >
        {/* LIVE button badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: 4,
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.9)",
            letterSpacing: 0.5,
          }}
        >
          LIVE
        </div>

        {/* Center Tabs: Following | For You */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginRight: 18 }}>
            Following
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#ffffff" }}>
              For You
            </span>
            <div style={{ width: 28, height: 2, backgroundColor: "#ffffff", borderRadius: 1, marginTop: 4 }} />
          </div>
        </div>

        {/* Search icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2}>
            <circle cx="11" cy="11" r="7" />
            <line x1="16" y1="16" x2="21" y2="21" />
          </svg>
        </div>
      </div>

      {/* 3. Right-side Action Column (Authentic TikTok TUX Capsule Buttons + SVG Icons) */}
      <div
        style={{
          position: "absolute",
          right: 12,
          bottom: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Author Avatar with Red Plus Follow Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18, position: "relative" }}>
          <img
            src={avatarUri}
            width={48}
            height={48}
            style={{
              borderRadius: 24,
              border: "1.5px solid #ffffff",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -9,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#FE2C55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(254, 44, 85, 0.4)",
            }}
          >
            <TikTokPlusIcon size={12} fill="#ffffff" />
          </div>
        </div>

        {/* Heart / Like Action */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokHeartIcon size={26} fill="#FE2C55" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(likesCount)}
          </span>
        </div>

        {/* Comments Action */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokCommentIcon size={24} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(commentsCount)}
          </span>
        </div>

        {/* Bookmarks / Favorites Action */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokBookmarkIcon size={24} fill="#FACE15" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(bookmarksCount)}
          </span>
        </div>

        {/* Share Action */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokShareIcon size={24} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(sharesCount)}
          </span>
        </div>

        {/* Rotating Vinyl Record with Avatar Artwork */}
        <div
          style={{
            position: "relative",
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: "#161616",
            border: "5px solid #282828",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          }}
        >
          <img
            src={avatarUri}
            width={24}
            height={24}
            style={{ borderRadius: 12, objectFit: "cover" }}
          />
          {/* Center spindle hole */}
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#161616",
              border: "1px solid #444444",
            }}
          />
        </div>
      </div>

      {/* 4. Bottom-Left Information Overlay (Handle, Description, Music tag) */}
      <div
        style={{
          position: "absolute",
          left: 16,
          bottom: 22,
          right: 80,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Username + Verified Badge */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#ffffff", marginRight: 6, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {authorHandle}
          </span>
          {content.author?.isVerified && <VerifiedBadge size={14} color="#20D5EC" />}
        </div>

        {/* Caption & Hashtags */}
        <div
          style={{
            fontSize: 14,
            lineHeight: "20px",
            color: "#ffffff",
            marginBottom: 10,
            wordBreak: "break-word",
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {caption}
        </div>

        {/* Music Sound Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 13,
            color: "#ffffff",
            textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          <MusicNoteIcon size={14} fill="#ffffff" />
          <span style={{ marginLeft: 6, fontWeight: 500 }}>
            {musicTitle}
          </span>
        </div>
      </div>

      {/* 5. Authentic Bottom Video Scrubber Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "45%",
            height: 3,
            backgroundColor: "#ffffff",
          }}
        />
      </div>
    </div>
  );
}

