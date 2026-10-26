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
// 3. TIKTOK & DOUYIN
// ============================================================================

export function TikTokHeartIcon({ size = 20, fill = "#FE2C55" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function TikTokCommentIcon({ size = 20, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
    </svg>
  );
}

export function TikTokBookmarkIcon({ size = 20, fill = "#FACD3D" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export function TikTokShareIcon({ size = 20, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M10 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z" />
    </svg>
  );
}

export function MusicNoteIcon({ size = 16, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

// ============================================================================
// 4. YOUTUBE (Authentic SVGs from YouTube)
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

export function YouTubeLikeIcon({ size = 18, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M9.221 1.795a1 1 0 011.109-.656l1.04.173a4 4 0 013.252 4.784L14 9h4.061a3.664 3.664 0 013.576 2.868A3.68 3.68 0 0121 14.85l.02.087A3.815 3.815 0 0120 18.5v.043l-.01.227a2.82 2.82 0 01-.135.663l-.106.282A3.754 3.754 0 0116.295 22h-3.606l-.392-.007a12.002 12.002 0 01-5.223-1.388l-.343-.189-.27-.154a2.005 2.005 0 00-.863-.26l-.13-.004H3.5a1.5 1.5 0 01-1.5-1.5V12.5A1.5 1.5 0 013.5 11h1.79l.157-.013a1 1 0 00.724-.512l.063-.145 2.987-8.535Zm-1.1 9.196A3 3 0 015.29 13H4v4.998h1.468a4 4 0 011.986.528l.27.155.285.157A10 10 0 0012.69 20h3.606c.754 0 1.424-.483 1.663-1.2l.03-.126a.819.819 0 00.012-.131v-.872l.587-.586c.388-.388.577-.927.523-1.465l-.038-.23-.02-.087-.21-.9.55-.744A1.663 1.663 0 0018.061 11H14a2.002 2.002 0 01-1.956-2.418l.623-2.904a2 2 0 00-1.626-2.392l-.21-.035-2.71 7.741Z" />
    </svg>
  );
}

export function YouTubeDislikeIcon({ size = 18, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="m11.31 2 .392.007c1.824.06 3.61.534 5.223 1.388l.343.189.27.154c.264.152.56.24.863.26l.13.004H20.5a1.5 1.5 0 011.5 1.5V11.5a1.5 1.5 0 01-1.5 1.5h-1.79l-.158.013a1 1 0 00-.723.512l-.064.145-2.987 8.535a1 1 0 01-1.109.656l-1.04-.174a4 4 0 01-3.251-4.783L10 15H5.938a3.664 3.664 0 01-3.576-2.868A3.682 3.682 0 013 9.15l-.02-.088A3.816 3.816 0 014 5.5v-.043l.008-.227a2.86 2.86 0 01.136-.664l.107-.28A3.754 3.754 0 017.705 2h3.605ZM7.705 4c-.755 0-1.425.483-1.663 1.2l-.032.126a.818.818 0 00-.01.131v.872l-.587.586a1.816 1.816 0 00-.524 1.465l.038.23.02.087.21.9-.55.744a1.686 1.686 0 00-.321 1.18l.029.177c.17.76.844 1.302 1.623 1.302H10a2.002 2.002 0 011.956 2.419l-.623 2.904-.034.208a2.002 2.002 0 001.454 2.139l.206.045.21.035 2.708-7.741A3.001 3.001 0 0118.71 11H20V6.002h-1.47c-.696 0-1.38-.183-1.985-.528l-.27-.155-.285-.157A10.002 10.002 0 0011.31 4H7.705Z" />
    </svg>
  );
}

export function CreatorHeartBadge({ avatarUrl, size = 20 }: { avatarUrl?: string; size?: number }) {
  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          width={size - 4}
          height={size - 4}
          style={{ borderRadius: (size - 4) / 2, objectFit: "cover" }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          bottom: -2,
          right: -4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FF0000",
          borderRadius: 8,
          width: 12,
          height: 12,
        }}
      >
        <svg width={8} height={8} viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
