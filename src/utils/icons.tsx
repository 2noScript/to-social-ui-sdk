import React from "react";

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
// 2. FACEBOOK 7 REACTIONS PACK (Vector-grade Emoticons)
// ============================================================================

export function FbLikeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M7 11.5V17.5H9.5V11.5H7ZM16.5 12C16.5 11.4 16 11 15.3 11H12.8L13.2 8.5C13.2 7.7 12.6 7 11.8 7L10 10.3V17.5H15.5C16.1 17.5 16.5 17 16.5 16.4C16.5 16 16.3 15.7 16.1 15.5C16.6 15.2 16.9 14.7 16.8 14.1C17.1 13.8 17.2 13.3 17 12.8C16.7 12.3 16.6 12.1 16.5 12Z"
        fill="white"
      />
    </svg>
  );
}

export function FbLoveIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FA3E3E" />
      <path
        d="M12 17.5L6.8 12.3C5.7 11.2 5.7 9.5 6.8 8.4C7.9 7.3 9.6 7.3 10.7 8.4L12 9.7L13.3 8.4C14.4 7.3 16.1 7.3 17.2 8.4C18.3 9.5 18.3 11.2 17.2 12.3L12 17.5Z"
        fill="white"
      />
    </svg>
  );
}

export function FbCareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F7B125" />
      {/* Smiling eyes */}
      <circle cx="8" cy="9.5" r="1.3" fill="#4C3400" />
      <circle cx="16" cy="9.5" r="1.3" fill="#4C3400" />
      {/* Smiling mouth */}
      <path d="M9 13.5C10 15 14 15 15 13.5" stroke="#4C3400" strokeWidth="1.6" strokeLinecap="round" />
      {/* Hugging heart */}
      <path
        d="M12 18.5L9.5 16C8.8 15.3 8.8 14.2 9.5 13.5C10.2 12.8 11.3 12.8 12 13.5L12 13.7L12 13.5C12.7 12.8 13.8 12.8 14.5 13.5C15.2 14.2 15.2 15.3 14.5 16L12 18.5Z"
        fill="#FA3E3E"
      />
    </svg>
  );
}

export function FbHahaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F7B125" />
      {/* Closed happy eyes ^ ^ */}
      <path d="M6.5 9.5L8.5 7.5L10.5 9.5" stroke="#4C3400" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 9.5L15.5 7.5L17.5 9.5" stroke="#4C3400" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Big laughing mouth */}
      <path d="M7 13.5C7 16.5 17 16.5 17 13.5Z" fill="#800000" />
      <path d="M8.5 13.5C8.5 15 15.5 15 15.5 13.5Z" fill="#FFFFFF" />
    </svg>
  );
}

export function FbWowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F7B125" />
      {/* Eyebrows */}
      <path d="M6.5 7C7.5 6 9.5 6 10.5 7" stroke="#4C3400" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M13.5 7C14.5 6 16.5 6 17.5 7" stroke="#4C3400" strokeWidth="1.3" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="8.5" cy="10" r="1.5" fill="#4C3400" />
      <circle cx="15.5" cy="10" r="1.5" fill="#4C3400" />
      {/* Round wow mouth */}
      <ellipse cx="12" cy="15.5" rx="3" ry="4" fill="#4C3400" />
    </svg>
  );
}

export function FbSadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#F7B125" />
      {/* Sad eyes */}
      <circle cx="8" cy="10" r="1.4" fill="#4C3400" />
      <circle cx="16" cy="10" r="1.4" fill="#4C3400" />
      {/* Downward sad mouth */}
      <path d="M8.5 16C9.5 14.5 14.5 14.5 15.5 16" stroke="#4C3400" strokeWidth="1.6" strokeLinecap="round" />
      {/* Teardrop */}
      <path d="M17.5 11.5C17.5 13 16.2 14.2 16.2 14.2C16.2 14.2 15 13 15 11.5C15 10.7 15.6 10 16.2 10C16.9 10 17.5 10.7 17.5 11.5Z" fill="#1877F2" />
    </svg>
  );
}

export function FbAngryIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#E84A36" />
      {/* Angry slant eyebrows */}
      <path d="M6 7.5L10 9.5" stroke="#4C0000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 7.5L14 9.5" stroke="#4C0000" strokeWidth="1.8" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="8.5" cy="11.5" r="1.3" fill="#4C0000" />
      <circle cx="15.5" cy="11.5" r="1.3" fill="#4C0000" />
      {/* Angry frown mouth */}
      <path d="M8.5 16C9.5 14.5 14.5 14.5 15.5 16" stroke="#4C0000" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function renderReactionIcon(type?: string, size = 18) {
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
// 4. YOUTUBE & CREATOR BADGES
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

export function YouTubeLikeIcon({ size = 16, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
}

export function YouTubeDislikeIcon({ size = 16, fill = "currentColor" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
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
// 6. X (TWITTER)
// ============================================================================

export function TwitterXLogo({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TwitterReplyIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function TwitterRepostIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

export function TwitterLikeIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function TwitterViewIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
