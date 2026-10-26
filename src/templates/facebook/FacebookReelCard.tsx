import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import { FbLikeIcon, TikTokCommentIcon, TikTokShareIcon, VerifiedBadge } from "../../utils/icons";
import { resolveImageAsDataUri, createPlaceholderAvatar, createPlaceholderCover } from "../../utils/image";

export interface FacebookReelCardProps {
  content: UnifiedContent;
  options?: RenderOptions;
}

export async function createFacebookReelCardNode(props: FacebookReelCardProps) {
  const { content, options = {} } = props;

  const avatarUri = options.prefetchImages !== false
    ? await resolveImageAsDataUri(content.author?.avatarUrl, () => createPlaceholderAvatar(content.author?.name, 80, "#1877F2"))
    : (content.author?.avatarUrl || createPlaceholderAvatar(content.author?.name, 80, "#1877F2"));

  const coverUrl = content.media?.coverUrl || content.media?.images?.[0]?.url;
  const coverUri = coverUrl && options.prefetchImages !== false
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 720))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 720));

  const authorName = content.author?.name || "Facebook Creator";
  const title = content.description || content.title || "";
  const likesCount = content.stats?.likes || content.stats?.reactions?.like || 0;
  const commentsCount = content.stats?.comments || 0;
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
        boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
      }}
    >
      {/* 1. Full-bleed background video thumbnail */}
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

      {/* Dark gradient for text readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 320,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Top Header: Facebook Reels badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "6px 12px",
          borderRadius: 18,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: "#1877F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 6,
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 900, color: "#fff" }}>f</span>
        </div>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#ffffff" }}>Reels</span>
      </div>

      {/* Right Action Sidebar (Facebook Reels style: Like, Comments, Share) */}
      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {/* Like */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <FbLikeIcon size={24} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>
            {formatSocialCount(likesCount)}
          </span>
        </div>

        {/* Comments */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <TikTokCommentIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>
            {formatSocialCount(commentsCount)}
          </span>
        </div>

        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <TikTokShareIcon size={22} fill="#ffffff" />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>
            {formatSocialCount(sharesCount)}
          </span>
        </div>
      </div>

      {/* Bottom Info: Creator Avatar, Name, Follow, Caption */}
      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: 24,
          right: 90,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <img
            src={avatarUri}
            width={38}
            height={38}
            style={{ borderRadius: 19, objectFit: "cover", marginRight: 10, border: "2px solid #1877F2" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#ffffff", marginRight: 6 }}>
              {authorName}
            </span>
            {content.author?.isVerified && <VerifiedBadge size={14} />}
          </div>
          <div
            style={{
              marginLeft: 10,
              backgroundColor: "#1877F2",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 16,
            }}
          >
            Follow
          </div>
        </div>

        {/* Video Caption */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#ffffff",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
