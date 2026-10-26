import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import {
  MusicNoteIcon,
  TikTokBookmarkIcon,
  TikTokCommentIcon,
  TikTokHeartIcon,
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
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 800))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 800));

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
        height: 800,
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxShadow: "0 12px 36px rgba(0,0,0,0.45)",
      }}
    >
      {/* 1. Full-bleed Video Cover / Background */}
      <img
        src={coverUri}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 800,
          objectFit: "cover",
          filter: "brightness(0.92)",
        }}
      />

      {/* Dark gradient overlay for bottom text contrast */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 360,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Top Header: Authentic Following | For You Tabs + Search */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          zIndex: 10,
        }}
      >
        {/* LIVE button */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
          LIVE
        </div>

        {/* Center Tabs: Following | For You */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginRight: 16 }}>
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
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.2}>
          <circle cx="11" cy="11" r="7" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      </div>

      {/* 2. Right-side Action Column (Authentic TikTok direct overlay without gray circles) */}
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Author Avatar with Plus Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, position: "relative" }}>
          <img
            src={avatarUri}
            width={46}
            height={46}
            style={{
              borderRadius: 23,
              border: "2px solid #ffffff",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -6,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#FE2C55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            +
          </div>
        </div>

        {/* Heart / Like */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <TikTokHeartIcon size={32} fill="#FE2C55" />
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(likesCount)}
          </span>
        </div>

        {/* Comments */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <TikTokCommentIcon size={30} fill="#ffffff" />
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(commentsCount)}
          </span>
        </div>

        {/* Bookmarks */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <TikTokBookmarkIcon size={30} fill="#FACD3D" />
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(bookmarksCount)}
          </span>
        </div>

        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <TikTokShareIcon size={30} fill="#ffffff" />
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(sharesCount)}
          </span>
        </div>

        {/* Rotating Vinyl Record */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: "#252525",
            border: "6px solid #0f0f0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          <img
            src={avatarUri}
            width={24}
            height={24}
            style={{ borderRadius: 12, objectFit: "cover" }}
          />
        </div>
      </div>

      {/* 3. Bottom-Left Information Overlay (Handle, Description, Music tag) */}
      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 24,
          right: 90,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Username + Verified Badge */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#ffffff", marginRight: 6 }}>
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
            marginBottom: 12,
            wordBreak: "break-word",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
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
            opacity: 0.95,
          }}
        >
          <MusicNoteIcon size={14} fill="#ffffff" />
          <span style={{ marginLeft: 6, fontWeight: 500 }}>
            {musicTitle}
          </span>
        </div>
      </div>
    </div>
  );
}
