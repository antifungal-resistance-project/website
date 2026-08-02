import { ImageResponse } from "next/og";
import { org, hero } from "@/content/site";

export const alt = `${org.name} — ${org.mission}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card. Uses the ARP mark + mission, matching the site's palette.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(60% 60% at 30% 25%, rgba(249,168,38,0.18), transparent 70%)",
          color: "#eef2f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <polygon
              points="16,3 27.26,9.5 27.26,22.5 16,29 4.74,22.5 4.74,9.5"
              fill="none"
              stroke="#f9a826"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle
              cx="16"
              cy="16"
              r="6.5"
              fill="none"
              stroke="#f9a826"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="3" fill="#f9a826" />
            <circle cx="16" cy="3" r="2.4" fill="#4cc9f0" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8a94a6",
            }}
          >
            {org.name}
          </div>
        </div>

        {/* mission */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "980px",
            }}
          >
            {hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "30px",
              color: "#8a94a6",
              maxWidth: "900px",
            }}
          >
            {org.tagline}
          </div>
        </div>

        {/* footer rule */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              backgroundColor: "#f9a826",
            }}
          />
          <div style={{ display: "flex", fontSize: "24px", color: "#5b6474" }}>
            {org.domain}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
