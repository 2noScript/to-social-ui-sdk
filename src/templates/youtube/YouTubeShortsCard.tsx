import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import {
  YouTubeShortsIcon,
  YouTubeLikeIcon,
  YouTubeDislikeIcon,
  YouTubeCommentIcon,
  YouTubeShareIcon,
  YouTubeVerifiedBadge,
  MusicNoteIcon,
} from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface YouTubeShortsCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createYouTubeShortsCardNode(props: YouTubeShortsCardProps) {
  const { content, options = {} } = props;

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#FF0000"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#FF0000"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 854))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 854));

  const authorName = content.author?.name || "YouTube Creator";
  const authorHandle = content.author?.uniqueId ? `@${content.author.uniqueId}` : `@${authorName.toLowerCase().replace(/\s+/g, "")}`;
  const title = content.title || content.description || "";
  const likesCount = content.stats?.likes || 0;
  const commentsCount = content.stats?.comments || 0;
  const audioTitle = content.media?.audio?.title || `Original audio - ${authorName}`;

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
        fontFamily: "Roboto, 'YouTube Noto', system-ui, -apple-system, sans-serif",
        boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* 1. Full-bleed background video thumbnail (9:16 vertical ratio) */}
      <img
        src={coverUri}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 480,
          height: 854,
          objectFit: "cover",
          filter: "brightness(0.92)",
        }}
      />

      {/* Top subtle shadow vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          display: "flex",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)",
        }}
      />

      {/* Bottom dark gradient for text readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 360,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
        }}
      />

      {/* Top Header: Authentic YouTube Shorts pill badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.45)",
          padding: "6px 12px",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <YouTubeShortsIcon size={18} fill="#FF0000" />
        <span style={{ fontWeight: 700, fontSize: 14, marginLeft: 6, color: "#ffffff", letterSpacing: 0.2 }}>
          Shorts
        </span>
      </div>

      {/* Right Action Sidebar (Authentic YouTube Shorts: Like, Dislike, Comments, Share, Audio Square) */}
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Like Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <YouTubeLikeIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(likesCount)}
          </span>
        </div>

        {/* Dislike Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <YouTubeDislikeIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            Dislike
          </span>
        </div>

        {/* Comments Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <YouTubeCommentIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            {formatSocialCount(commentsCount)}
          </span>
        </div>

        {/* Share Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <YouTubeShareIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
            Share
          </span>
        </div>

        {/* Square Sound Audio Art (Official YouTube Shorts Music Square) */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            border: "2px solid #ffffff",
            overflow: "hidden",
            display: "flex",
            backgroundColor: "#202020",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <img
            src={avatarUri}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Bottom Info: Channel Avatar, Handle, Subscribe, Title, Audio Pill */}
      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 22,
          right: 80,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Channel Row: Avatar + Handle + Verified Badge + Subscribe */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <img
            src={avatarUri}
            width={36}
            height={36}
            style={{ borderRadius: 18, objectFit: "cover", marginRight: 10, border: "1.5px solid #ffffff" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#ffffff", marginRight: 5, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
              {authorHandle}
            </span>
            {content.author?.isVerified && <YouTubeVerifiedBadge size={14} color="#AAAAAA" />}
          </div>
          <div
            style={{
              marginLeft: 10,
              backgroundColor: "#ffffff",
              color: "#0f0f0f",
              fontWeight: 600,
              fontSize: 12,
              padding: "4px 12px",
              borderRadius: 16,
            }}
          >
            Subscribe
          </div>
        </div>

        {/* Video Title */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#ffffff",
            marginBottom: 8,
            wordBreak: "break-word",
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </div>

        {/* Music / Original Audio Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          <MusicNoteIcon size={13} fill="#ffffff" />
          <span style={{ marginLeft: 6, fontWeight: 400 }}>
            {audioTitle}
          </span>
        </div>
      </div>
    </div>
  );
}

