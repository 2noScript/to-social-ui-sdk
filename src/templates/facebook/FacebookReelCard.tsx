import React from "react";
import type { UnifiedContent, RenderOptions } from "../../types";
import { formatSocialCount } from "../../utils/format";
import {
  FbReelsLikeIcon,
  FbReelsCommentIcon,
  FbReelsShareIcon,
  FbMoreDotsIcon,
  FbReelsCameraIcon,
  FbReelsSearchIcon,
  FbChevronLeftIcon,
  MusicNoteIcon,
  VerifiedBadge,
} from "../../utils/icons";
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
    ? await resolveImageAsDataUri(coverUrl, () => createPlaceholderCover(content.title, 480, 854))
    : (coverUrl ? coverUrl : createPlaceholderCover(content.title, 480, 854));

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
        height: 854,
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "Inter, sans-serif",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
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
          height: 854,
          objectFit: "cover",
        }}
      />

      {/* Top subtle vignette gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          display: "flex",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 65%, transparent 100%)",
        }}
      />

      {/* Bottom deep gradient for maximum readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 380,
          display: "flex",
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
        }}
      />

      {/* Top Header: Authentic Facebook Reels Navigation Bar */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        {/* Left: < Reels */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FbChevronLeftIcon size={24} color="#ffffff" />
          <span
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: "#ffffff",
              marginLeft: 8,
              letterSpacing: -0.4,
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            Reels
          </span>
        </div>

        {/* Right: Camera & Search */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", marginRight: 18, filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.7))" }}>
            <FbReelsCameraIcon size={22} color="#ffffff" />
          </div>
          <div style={{ display: "flex", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.7))" }}>
            <FbReelsSearchIcon size={22} color="#ffffff" />
          </div>
        </div>
      </div>

      {/* Right Action Sidebar (Authentic Facebook Reels: Like, Comment, Share, More, Audio Disc) */}
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
        {/* Like */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}>
            <FbReelsLikeIcon size={28} fill="#ffffff" />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#ffffff",
              marginTop: 4,
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            {formatSocialCount(likesCount)}
          </span>
        </div>

        {/* Comments */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}>
            <FbReelsCommentIcon size={28} fill="#ffffff" />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#ffffff",
              marginTop: 4,
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            {formatSocialCount(commentsCount)}
          </span>
        </div>

        {/* Share */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}>
            <FbReelsShareIcon size={28} fill="#ffffff" />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#ffffff",
              marginTop: 4,
              textShadow: "0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            {formatSocialCount(sharesCount)}
          </span>
        </div>

        {/* More Options (...) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <div style={{ display: "flex", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))" }}>
            <FbMoreDotsIcon size={24} fill="#ffffff" />
          </div>
        </div>

        {/* Spinning Audio Track Disc Thumbnail */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#18191a",
            border: "2px solid rgba(255,255,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.7))",
          }}
        >
          <img
            src={avatarUri}
            width={22}
            height={22}
            style={{ borderRadius: 11, objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Bottom Info: Creator Avatar, Name, Follow Pill, Caption, Audio Attribution */}
      <div
        style={{
          position: "absolute",
          left: 16,
          bottom: 22,
          right: 76,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        {/* Creator Row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <img
            src={avatarUri}
            width={38}
            height={38}
            style={{
              borderRadius: 19,
              objectFit: "cover",
              marginRight: 10,
              border: "1.5px solid rgba(255,255,255,0.8)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", flexShrink: 1, minWidth: 0 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#ffffff",
                marginRight: 6,
                textShadow: "0 1px 3px rgba(0,0,0,0.9)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 195,
              }}
            >
              {authorName}
            </span>
            {content.author?.isVerified && (
              <div style={{ display: "flex", flexShrink: 0, marginRight: 4 }}>
                <VerifiedBadge size={14} />
              </div>
            )}
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                margin: "0 6px",
                fontSize: 14,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              •
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                padding: "3px 12px",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              Follow
            </div>
          </div>
        </div>

        {/* Video Caption */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#ffffff",
            marginBottom: 10,
            textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </div>

        {/* Audio Attribution Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
          }}
        >
          <MusicNoteIcon size={13} fill="#ffffff" />
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.95)",
              marginLeft: 6,
            }}
          >
            Original audio · {authorName}
          </span>
        </div>
      </div>

      {/* 4. Bottom Video Scrubber Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "rgba(255,255,255,0.25)",
          display: "flex",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: "38%",
            height: 3,
            backgroundColor: "#ffffff",
          }}
        />
      </div>
    </div>
  );
}

