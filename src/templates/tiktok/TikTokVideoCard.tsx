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
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 720))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 720));

  const authorHandle = content.author?.uniqueId ? `@${content.author.uniqueId}` : `@${content.author?.name || "tiktok_creator"}`;
  const authorName = content.author?.name || content.author?.uniqueId || "Creator";
  const caption = content.description || content.title || "";
  const musicTitle = content.media?.audio?.title ? `${content.media.audio.title} - ${content.media.audio.author || authorName}` : "original sound";

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
        height: 720,
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 12px 36px rgba(0,0,0,0.45)",
      }}
    >
      {/* 1. Full-screen Video Cover / Background */}
      <img
        src={coverUri}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 720,
          objectFit: "cover",
          filter: "brightness(0.9)",
        }}
      />

      {/* Dark gradient overlay for bottom text contrast */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 340,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Top Header: Platform Logo / Badge */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.45)",
          padding: "6px 14px",
          borderRadius: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.5 }}>
          <span style={{ color: "#25F4EE" }}>Tik</span>
          <span style={{ color: "#FE2C55" }}>Tok</span>
        </div>
      </div>

      {/* 2. Right-side Action Column (Avatar, Likes, Comments, Bookmarks, Share) */}
      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Author Avatar with Plus Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18, position: "relative" }}>
          <img
            src={avatarUri}
            width={48}
            height={48}
            style={{
              borderRadius: 24,
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokHeartIcon size={24} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{formatSocialCount(likesCount)}</span>
        </div>

        {/* Comment */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokCommentIcon size={22} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{formatSocialCount(commentsCount)}</span>
        </div>

        {/* Bookmark */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokBookmarkIcon size={22} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{formatSocialCount(bookmarksCount)}</span>
        </div>

        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TikTokShareIcon size={22} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{formatSocialCount(sharesCount)}</span>
        </div>
      </div>

      {/* 3. Bottom Content Info (Author, Caption, Sound) */}
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 90,
          bottom: 28,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#ffffff", marginRight: 6 }}>{authorHandle}</span>
          {content.author?.isVerified && <VerifiedBadge size={16} color="#20D5EC" />}
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.4, color: "#F1F1F2", marginBottom: 10, wordBreak: "break-word" }}>
          {caption}
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#E1E2E4" }}>
          <MusicNoteIcon size={14} fill="#ffffff" />
          <span style={{ marginLeft: 6, whiteSpace: "nowrap", overflow: "hidden" }}>{musicTitle}</span>
        </div>
      </div>
    </div>
  );
}
