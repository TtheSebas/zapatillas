import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "SOLES Sneaker Vault - Drops Exclusivos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #262626 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top bar with badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "44px",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            SOLES<span style={{ color: "#e11d48" }}>.</span>
          </div>

          <div
            style={{
              background: "rgba(225, 29, 72, 0.2)",
              border: "2px solid rgba(225, 29, 72, 0.4)",
              color: "#fb7185",
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              display: "flex",
            }}
          >
            DROP EXCLUSIVO DE TEMPORADA
          </div>
        </div>

        {/* Center Main Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              textTransform: "uppercase",
              fontStyle: "italic",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            REDEFINE TU PASO Y ESTILO.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a3a3a3",
              maxWidth: "850px",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Tienda exclusiva de zapatillas de colección: Air Jordan 1, Nike Dunk Low, New Balance 550 y siluetas legendarias con autenticidad 100% verificada.
          </div>
        </div>

        {/* Bottom Feature Tags */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "18px",
            color: "#e5e5e5",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              background: "#262626",
              padding: "8px 20px",
              borderRadius: "12px",
              border: "1px solid #404040",
              display: "flex",
            }}
          >
            100% Autenticidad Verificada
          </div>
          <div
            style={{
              background: "#262626",
              padding: "8px 20px",
              borderRadius: "12px",
              border: "1px solid #404040",
              display: "flex",
            }}
          >
            Envio Expres Asegurado
          </div>
          <div
            style={{
              background: "#262626",
              padding: "8px 20px",
              borderRadius: "12px",
              border: "1px solid #404040",
              display: "flex",
            }}
          >
            Devoluciones Garantizadas
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
