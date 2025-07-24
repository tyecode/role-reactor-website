import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Role Reactor
        </div>
        <div
          style={{
            fontSize: 32,
            textAlign: "center",
            color: "#a0a0a0",
            maxWidth: "80%",
          }}
        >
          Discord Bot for Automated Role Management
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
