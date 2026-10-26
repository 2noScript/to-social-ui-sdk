import React from "react";
import {
  FB_LIKE_DATA_URI,
  FB_LOVE_DATA_URI,
  FB_CARE_DATA_URI,
  FB_HAHA_DATA_URI,
  FB_WOW_DATA_URI,
  FB_SAD_DATA_URI,
  FB_ANGRY_DATA_URI,
} from "./facebookReactions";

// ============================================================================
// 1. VERIFIED BADGES & SYSTEM
// ============================================================================

export function VerifiedBadge({ size = 16, color = "#1877F2" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.4 5.2L18.4 5.6L19.2 9.6L22.4 12L19.2 14.4L18.4 18.4L14.4 18.8L12 22L9.6 18.8L5.6 18.4L4.8 14.4L1.6 12L4.8 9.6L5.6 5.6L9.6 5.2L12 2Z"
        fill={color}
      />
      <path
        d="M9 12.2L11 14.2L15.5 9.7"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ size = 14, color = "#B0B3B8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 12V4H17V2H7V4H8V12L6 14V16H11V22L12 23L13 22V16H18V14L16 12Z" />
    </svg>
  );
}

// ============================================================================
// 2. FACEBOOK 7 REACTIONS PACK (Official 100% Meta 3D Assets)
// ============================================================================

export function FbLikeIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_LIKE_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbLoveIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_LOVE_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbCareIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_CARE_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbHahaIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_HAHA_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbWowIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_WOW_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbSadIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_SAD_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function FbAngryIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src={FB_ANGRY_DATA_URI}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "cover", flexShrink: 0 }}
    />
  );
}

export function renderReactionIcon(type?: string, size = 20) {
  switch (type?.toLowerCase()) {
    case "love":
      return <FbLoveIcon size={size} />;
    case "care":
      return <FbCareIcon size={size} />;
    case "haha":
      return <FbHahaIcon size={size} />;
    case "wow":
      return <FbWowIcon size={size} />;
    case "sad":
      return <FbSadIcon size={size} />;
    case "angry":
      return <FbAngryIcon size={size} />;
    case "like":
    default:
      return <FbLikeIcon size={size} />;
  }
}

// Facebook Reels Specific Action Icons (White with Drop Shadow)
export function FbReelsLikeIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3v11z" />
    </svg>
  );
}

export function FbReelsCommentIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.08L5 22l4.24-1.42c.88.27 1.82.42 2.76.42 5.52 0 10-4.03 10-9s-4.48-9-10-9z" />
    </svg>
  );
}

export function FbReelsShareIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M14 5v4C6.5 10 3.5 15 2 20c2.5-3.5 6-5.1 12-5.1V19l8-7-8-7z" />
    </svg>
  );
}

export function FbMoreDotsIcon({ size = 24, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <circle cx="5" cy="12" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="19" cy="12" r="2.2" />
    </svg>
  );
}

export function FbReelsCameraIcon({ size = 22, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function FbReelsSearchIcon({ size = 22, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function FbChevronLeftIcon({ size = 24, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// Facebook Feed Post Action Bar Icons
export function FbFeedLikeIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3v11z" />
    </svg>
  );
}

export function FbFeedCommentIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function FbFeedShareIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13.5 6V2.5L21 10L13.5 17.5V14C8 14 4.5 16 2 20C3 14.5 6.5 9 13.5 8V6Z" />
    </svg>
  );
}



// ============================================================================
// 3. TIKTOK & DOUYIN (Official SVGs from TikTok Web & Mobile Application)
// ============================================================================

export function TikTokHeartIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M24 9.44c3.2-4.03 7.61-5.56 12-4.67 2.31.47 5.59 2.28 7.75 5.48 2.26 3.32 3.21 7.99.98 13.85-1.75 4.57-5.5 8.83-9.28 12.2a56.6 56.6 0 0 1-10.52 7.47l-.93.49-.93-.49a56.6 56.6 0 0 1-10.52-7.47c-3.78-3.37-7.53-7.63-9.28-12.2-2.24-5.86-1.28-10.53.98-13.85C6.4 7.05 9.69 5.24 12 4.77c4.39-.9 8.8.64 12 4.67Z" />
    </svg>
  );
}

export function TikTokCommentIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.55 43.55 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5ZM14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

export function TikTokBookmarkIcon({ size = 28, fill = "#FACE15" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M13 4a5 5 0 0 0-5 5v32.8a2 2 0 0 0 3.26 1.55l12.1-9.84a1 1 0 0 1 1.27 0l12.1 9.84A2 2 0 0 0 40 41.8V9a5 5 0 0 0-5-5H13Z" />
    </svg>
  );
}

export function TikTokShareIcon({ size = 28, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M23.82 3.5A2 2 0 0 0 20.5 5v10.06C8.7 15.96 1 25.32 1 37a2 2 0 0 0 3.41 1.41c4.14-4.13 10.4-5.6 16.09-5.88v9.97a2 2 0 0 0 3.3 1.52l21.5-18.5a2 2 0 0 0 .02-3.02z" />
    </svg>
  );
}

export function TikTokPlusIcon({ size = 12, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill={fill}>
      <path d="M22 4a1 1 0 0 0-1 1v16H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V27h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H27V5a1 1 0 0 0-1-1h-4Z" />
    </svg>
  );
}

export function MusicNoteIcon({ size = 14, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

// ============================================================================
// 4. YOUTUBE (Authentic SVGs extracted directly from YouTube Web Application)
// ============================================================================

export function YouTubePlayIcon({ size = 24, fill = "#FF0000" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

export function YouTubeShortsIcon({ size = 20, fill = "#FF0000" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M17.77 10.32l-1.2-.5a3.86 3.86 0 0 0-5.06-1.92l-2.73 1.25a3.86 3.86 0 0 0-1.92 5.06l1.2.5a3.86 3.86 0 0 0 5.06 1.92l2.73-1.25a3.86 3.86 0 0 0 1.92-5.06zM10 14.5v-5l4.5 2.5-4.5 2.5z" />
    </svg>
  );
}

export function YouTubeVerifiedBadge({ size = 14, color = "#AAAAAA" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm5.707 7.293a1 1 0 010 1.414L10 17.414l-3.707-3.707a1 1 0 111.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0Z" />
    </svg>
  );
}

export function YouTubeThreeDotsIcon({ size = 18, fill = "#AAAAAA" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z" />
    </svg>
  );
}

export function YouTubeLikeIcon({ size = 18, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={fill}>
      <path d="m7.748.854.779.13a3 3 0 012.44 3.588L10.5 6.75h3.046a2.748 2.748 0 012.204 4.387l.015.066A2.862 2.862 0 0115 13.874v.033c0 .227-.037.452-.109.668l-.08.21a2.815 2.815 0 01-2.59 1.715H9.516l-.294-.005a9.002 9.002 0 01-3.918-1.041l-.256-.142-.204-.116a1.502 1.502 0 00-.55-.186L4.102 15H2.625l-.116-.006a1.126 1.126 0 01-1.003-1.005l-.006-.114v-4.5c0-.62.504-1.124 1.125-1.124h1.342a.75.75 0 00.66-.395l.048-.107 2.24-6.403a.75.75 0 01.833-.491ZM6.09 8.243A2.25 2.25 0 013.967 9.75H3v3.749h1.1a3 3 0 011.49.395l.202.116a7.503 7.503 0 003.724.99h2.703c.566 0 1.07-.363 1.248-.9a.61.61 0 00.032-.193v-.655l.44-.439a1.36 1.36 0 00.363-1.272l-.014-.065-.157-.675.413-.556a1.248 1.248 0 00-.999-1.995H10.5a1.501 1.501 0 01-1.467-1.815L9.5 4.257a1.5 1.5 0 00-1.22-1.794l-.157-.026L6.09 8.243Z" />
    </svg>
  );
}

export function YouTubeDislikeIcon({ size = 18, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={fill}>
      <path d="m8.482 1.5.294.005a9.01 9.01 0 013.918 1.04l.257.143.203.116c.17.097.357.16.55.185l.194.012h1.477l.115.006c.53.054.95.475 1.004 1.005l.006.114v4.499c0 .621-.504 1.125-1.125 1.125h-1.343a.75.75 0 00-.66.395l-.048.107-2.24 6.402a.75.75 0 01-.832.491l-.78-.13a3 3 0 01-2.439-3.587L7.5 11.25H4.454a2.749 2.749 0 01-2.683-2.151 2.762 2.762 0 01.479-2.237l-.016-.065A2.862 2.862 0 013 4.125v-.032c0-.227.037-.453.108-.668l.08-.211A2.816 2.816 0 015.78 1.5h2.703ZM5.78 3c-.566 0-1.069.362-1.248.9a.613.613 0 00-.031.193v.654l-.44.44c-.333.332-.47.813-.364 1.271l.015.065.157.675-.413.557a1.248 1.248 0 00.999 1.995H7.5a1.501 1.501 0 011.467 1.815L8.5 13.742a1.5 1.5 0 001.22 1.794l.157.027 2.031-5.806a2.25 2.25 0 012.124-1.507H15V4.501h-1.102a3.001 3.001 0 01-1.489-.396l-.202-.116A7.504 7.504 0 008.482 3H5.78Z" />
    </svg>
  );
}

export function YouTubeShareIcon({ size = 20, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M10 3.158V7.51c-5.428.223-8.27 3.75-8.875 11.199-.04.487-.07.975-.09 1.464l-.014.395c-.014.473.578.684.88.32.302-.368.61-.73.925-1.086l.244-.273c1.79-1.967 3-2.677 4.93-2.917a18.011 18.011 0 012-.112v4.346a1 1 0 001.646.763l9.805-8.297 1.55-1.31-1.55-1.31-9.805-8.297A1 1 0 0010 3.158Zm2 6.27v.002-4.116l7.904 6.688L12 18.689v-4.212l-2.023.024c-1.935.022-3.587.17-5.197 1.024a9 9 0 00-1.348.893c.355-1.947.916-3.39 1.63-4.425 1.062-1.541 2.607-2.385 5.02-2.485L12 9.428Z" />
    </svg>
  );
}

export function YouTubeCommentIcon({ size = 20, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M21 3H3a1 1 0 00-1 1v14a1 1 0 001 1h4v4l5.333-4H21a1 1 0 001-1V4a1 1 0 00-1-1zm-1 14h-9l-3 2.25V17H4V5h16v12z" />
    </svg>
  );
}

export function YouTubePinIcon({ size = 14, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M21.007 6.298 11.7.924l-.077-.04a.85.85 0 00-.772 1.51l.735.425-3.394 5.878-1.718.46a1.5 1.5 0 00-.91.698l-1.012 1.753a.75.75 0 00.274 1.024l9.479 5.473a.75.75 0 001.024-.275l1.01-1.752a1.501 1.501 0 00.15-1.14l-.46-1.715 3.395-5.88.734.425a.85.85 0 00.849-1.47Zm-11.083 3.4 3.243-5.617 4.373 2.525-3.242 5.616a2 2 0 00-.2 1.518l.407 1.517-.283.49-7.313-4.22.283-.49 1.518-.41a2 2 0 001.214-.93ZM7.15 21.814l3.395-5.88-1.96-1.13-3.393 5.879-.152 2.525 2.11-1.394Z" />
    </svg>
  );
}

export function YouTubeChevronDownIcon({ size = 16, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M18.707 8.793a1 1 0 00-1.414 0L12 14.086 6.707 8.793a1 1 0 10-1.414 1.414L12 16.914l6.707-6.707a1 1 0 000-1.414Z" />
    </svg>
  );
}

export function CreatorHeartBadge({
  avatarUrl,
  size = 22,
  borderColor = "#0f0f0f",
}: {
  avatarUrl?: string;
  size?: number;
  borderColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: size + 4,
        height: size,
        alignItems: "center",
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          width={size}
          height={size}
          style={{ borderRadius: size / 2, objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#CC0000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          Y
        </div>
      )}
      {/* Official YouTube red heart badge overlapping at bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          right: -2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ff0033",
          borderRadius: 7,
          width: 14,
          height: 14,
          border: `1.5px solid ${borderColor}`,
        }}
      >
        <svg width={8} height={8} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M16.25 3.5c-1.697 0-3.206.765-4.25 1.96C10.956 4.265 9.447 3.5 7.75 3.5 4.527 3.5 2 6.235 2 9.5c0 3.99 2.53 6.996 4.862 8.929 2.355 1.95 4.703 2.972 4.74 2.988l.398.174.398-.174c.037-.016 2.385-1.038 4.74-2.988C19.471 16.495 22 13.49 22 9.5c0-3.265-2.527-6-5.75-6Z" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// 5. INSTAGRAM
// ============================================================================

export function InstagramHeartIcon({ size = 22, filled = false, color = "currentColor" }: { size?: number; filled?: boolean; color?: string }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ED4956">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function InstagramCommentIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function InstagramShareIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function InstagramBookmarkIcon({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// ============================================================================
// 6. X (TWITTER) - Authentic SVGs from x.com
// ============================================================================

export function TwitterXLogo({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="m21.62 21.5-7.47-10.9 6.97-8.1H18.7l-5.62 6.54L8.6 2.5H2.48L9.68 13l-7.3 8.5H4.8l5.96-6.93 5.3 7z" />
    </svg>
  );
}

export function TwitterReplyIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M1.75 10a8 8 0 0 1 8-8h4.37a8.13 8.13 0 0 1 3.93 15.24L10 21.7V18h-.07a8 8 0 0 1-8.18-8m2 0a6 6 0 0 0 6.14 6H12v2.3l5.09-2.8A6.13 6.13 0 0 0 14.12 4H9.75a6 6 0 0 0-6 6" />
    </svg>
  );
}

export function TwitterRepostIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function TwitterLikeIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M17.06 3a5.7 5.7 0 0 1 4.81 3.16c.94 1.9.89 4.36-.54 6.98-1.42 2.61-4.2 5.4-8.83 8.09l-.5.29-.5-.3c-4.62-2.68-7.4-5.47-8.83-8.08S1.2 8.05 2.13 6.16a5.7 5.7 0 0 1 4.8-3.15c1.75-.09 3.56.6 5.07 2.15a6.6 6.6 0 0 1 5.06-2.15" />
    </svg>
  );
}

export function TwitterViewIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
