/**
 * Formats a raw number into human-readable social count: 1.4M, 25.3K, 950
 */
export function formatSocialCount(count?: number): string {
  if (count === undefined || count === null || isNaN(count)) return "0";
  if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 10_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toLocaleString("en-US");
}

/**
 * Formats duration seconds into MM:SS or HH:MM:SS
 */
export function formatDuration(seconds?: number): string {
  if (!seconds || isNaN(seconds) || seconds <= 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Formats published date or timestamp into clean relative or absolute string
 */
export function formatSocialTime(publishedAt?: string, timestamp?: number): string {
  const time = timestamp || (publishedAt ? new Date(publishedAt).getTime() : 0);
  if (!time) return "Just now";

  const diffSec = Math.max(0, Math.floor((Date.now() - time) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 4) return `${diffWeek}w ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${Math.floor(diffDay / 365)}y ago`;
}

/**
 * Truncates text cleanly with ellipsis
 */
export function truncateText(text?: string, maxLen: number = 280): string {
  if (!text) return "";
  const clean = text.trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + "...";
}
