import { Buffer } from "node:buffer";

/**
 * In-memory LRU-like cache for downloaded base64 images
 */
const imageCache = new Map<string, string>();

/**
 * Creates a clean SVG placeholder DataURI with initial letter or icon
 */
export function createPlaceholderAvatar(name?: string, size: number = 80, bgColor: string = "#65676B"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="12" fill="${bgColor}" />
    <circle cx="12" cy="8" r="4" fill="#ffffff" opacity="0.9" />
    <path d="M4 20c0-3.8 3.6-5.8 8-5.8s8 2 8 5.8" fill="#ffffff" opacity="0.9" />
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export function createPlaceholderCover(title?: string, width: number = 600, height: number = 340): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e1e2e" />
        <stop offset="100%" stop-color="#313244" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grad)" />
    <circle cx="${width / 2}" cy="${height / 2}" r="36" fill="#89b4fa" opacity="0.8" />
    <polygon points="${width / 2 - 10},${height / 2 - 16} ${width / 2 - 10},${height / 2 + 16} ${width / 2 + 18},${height / 2}" fill="#ffffff" />
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Fetches an image URL and converts it into a Base64 DataURI.
 * If fetch fails or times out, returns fallback placeholder.
 */
export async function resolveImageAsDataUri(
  url?: string,
  fallback: () => string = () => createPlaceholderAvatar()
): Promise<string> {
  if (!url || typeof url !== "string" || !url.trim()) {
    return fallback();
  }

  const cleanUrl = url.trim();
  if (cleanUrl.startsWith("data:image/")) {
    return cleanUrl;
  }

  if (imageCache.has(cleanUrl)) {
    return imageCache.get(cleanUrl)!;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return fallback();
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${contentType};base64,${base64}`;

    if (imageCache.size > 200) {
      const firstKey = imageCache.keys().next().value;
      if (firstKey) imageCache.delete(firstKey);
    }
    imageCache.set(cleanUrl, dataUri);

    return dataUri;
  } catch {
    return fallback();
  }
}
