import React from "react";

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

export function FbLikeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FA3E3E">
      <circle cx="12" cy="12" r="12" fill="#FA3E3E" />
      <path
        d="M12 17.5L6.8 12.3C5.7 11.2 5.7 9.5 6.8 8.4C7.9 7.3 9.6 7.3 10.7 8.4L12 9.7L13.3 8.4C14.4 7.3 16.1 7.3 17.2 8.4C18.3 9.5 18.3 11.2 17.2 12.3L12 17.5Z"
        fill="white"
      />
    </svg>
  );
}

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

export function YouTubePlayIcon({ size = 24, fill = "#FF0000" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
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
