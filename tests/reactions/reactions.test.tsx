import fs from "node:fs";
import path from "node:path";
import React from "react";
import { describe, expect, test } from "bun:test";
import { renderElementToImage } from "../../src/engine/renderer";
import {
  FB_LIKE_DATA_URI,
  FB_LOVE_DATA_URI,
  FB_CARE_DATA_URI,
  FB_HAHA_DATA_URI,
  FB_WOW_DATA_URI,
  FB_SAD_DATA_URI,
  FB_ANGRY_DATA_URI,
} from "../../src/utils/facebookReactions";

const OUT_DIR = path.resolve("./output/reactions");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

describe("✨ Facebook Reactions Showcase", () => {
  const reactions = [
    { name: "like", uri: FB_LIKE_DATA_URI, label: "Like", color: "#1877F2" },
    { name: "love", uri: FB_LOVE_DATA_URI, label: "Love", color: "#FA3E3E" },
    { name: "care", uri: FB_CARE_DATA_URI, label: "Care", color: "#F7B125" },
    { name: "haha", uri: FB_HAHA_DATA_URI, label: "Haha", color: "#F7B125" },
    { name: "wow", uri: FB_WOW_DATA_URI, label: "Wow", color: "#F7B125" },
    { name: "sad", uri: FB_SAD_DATA_URI, label: "Sad", color: "#F7B125" },
    { name: "angry", uri: FB_ANGRY_DATA_URI, label: "Angry", color: "#E9710F" },
  ];

  for (const r of reactions) {
    test(`renders individual reaction: ${r.name} (128x128 HD)`, async () => {
      // 128x128 HD icon card with clean circular frame and label
      const element = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#242526",
            borderRadius: 24,
            padding: 24,
            width: 180,
            height: 200,
            boxSizing: "border-box",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <img
            src={r.uri}
            width={96}
            height={96}
            style={{ width: 96, height: 96, objectFit: "cover" }}
          />
          <span
            style={{
              marginTop: 12,
              fontSize: 18,
              fontWeight: 700,
              color: r.color,
            }}
          >
            {r.label}
          </span>
        </div>
      );

      const res = await renderElementToImage(element, { width: 180, scale: 2 });
      const outPath = path.join(OUT_DIR, `facebook_${r.name}.png`);
      await res.saveToFile(outPath);
      expect(fs.existsSync(outPath)).toBe(true);
    });
  }

  test("renders full Facebook Reaction Dock Bar (Light Theme)", async () => {
    const element = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0f2f5",
          padding: 30,
          borderRadius: 24,
          fontFamily: "system-ui, -apple-system, sans-serif",
          width: 620,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: "#050505", marginBottom: 16 }}>
          Facebook Reactions Bar (Light Theme)
        </div>
        {/* Floating dock */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderRadius: 30,
            padding: "8px 16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            border: "1px solid #CED0D4",
          }}
        >
          {reactions.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 8px",
              }}
            >
              <img
                src={r.uri}
                width={48}
                height={48}
                style={{ width: 48, height: 48, objectFit: "cover" }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: r.color,
                  marginTop: 6,
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    const res = await renderElementToImage(element, { width: 620, scale: 2 });
    const outPath = path.join(OUT_DIR, "facebook_reactions_dock_light.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test("renders full Facebook Reaction Dock Bar (Dark Theme)", async () => {
    const element = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#18191a",
          padding: 30,
          borderRadius: 24,
          fontFamily: "system-ui, -apple-system, sans-serif",
          width: 620,
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, color: "#E4E6EB", marginBottom: 16 }}>
          Facebook Reactions Bar (Dark Theme)
        </div>
        {/* Floating dock */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#242526",
            borderRadius: 30,
            padding: "8px 16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            border: "1px solid #3E4042",
          }}
        >
          {reactions.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 8px",
              }}
            >
              <img
                src={r.uri}
                width={48}
                height={48}
                style={{ width: 48, height: 48, objectFit: "cover" }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: r.color,
                  marginTop: 6,
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    const res = await renderElementToImage(element, { width: 620, scale: 2 });
    const outPath = path.join(OUT_DIR, "facebook_reactions_dock_dark.png");
    await res.saveToFile(outPath);
    expect(fs.existsSync(outPath)).toBe(true);
  });
});
