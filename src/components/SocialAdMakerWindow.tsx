"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type SizeKey = "instagram" | "story" | "twitter";
const SIZES: Record<SizeKey, { w: number; h: number; label: string }> = {
  instagram: { w: 1080, h: 1080, label: "Instagram Square" },
  story: { w: 1080, h: 1920, label: "Story / Reels" },
  twitter: { w: 1200, h: 675, label: "Twitter/X" },
};

export function SocialAdMakerWindow() {
  const [size, setSize] = useState<SizeKey>("instagram");
  const [product, setProduct] = useState("your offer");
  const [vibe, setVibe] = useState("retro‑modern • warm • playful");
  const [slogan, setSlogan] = useState("");
  const [cta, setCta] = useState("Book now");
  const [palette, setPalette] = useState("#0b2a5e,#ffcc00,#f2f4fb,#1b3a73");
  const [brand, setBrand] = useState("The Agency");
  const [fontSize, setFontSize] = useState(72);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = useMemo(() => {
    const parts = palette.split(",").map((p) => p.trim());
    while (parts.length < 4) parts.push("#000000");
    return parts.slice(0, 4) as [string, string, string, string];
  }, [palette]);

  useEffect(() => {
    draw();
  }, [size, product, vibe, slogan, cta, colors.join("|"), fontSize, brand]);

  const autoSlogan = () => {
    const variants = [
      `Make ${product} iconic — ${brand}`,
      `${product}, but cuter. ${brand}.`,
      `Taste + strategy for ${product}`,
      `Quiet confidence. Loud results.`,
      `Look like you — but iconic.`,
    ];
    setSlogan(variants[Math.floor(Math.random() * variants.length)]);
  };

  const draw = () => {
    const c = canvasRef.current;
    if (!c) return;
    const { w, h } = SIZES[size];
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    // background split retro stripes
    const [bg, accent, light, dark] = colors;
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h * 0.55);
    ctx.fillStyle = accent;
    ctx.fillRect(0, h * 0.55, w, h * 0.15);
    // header brand
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${Math.round(w * 0.035)}px Tahoma, Verdana, sans-serif`;
    ctx.fillText(brand, Math.round(w * 0.05), Math.round(h * 0.08));
    // product line
    ctx.fillStyle = "#ffffff";
    ctx.font = `600 ${Math.round(w * 0.045)}px Tahoma, Verdana, sans-serif`;
    wrapText(
      ctx,
      `For: ${product}`,
      Math.round(w * 0.05),
      Math.round(h * 0.15),
      Math.round(w * 0.9),
      Math.round(w * 0.05)
    );
    // vibe line
    ctx.fillStyle = "#f2f2f2";
    ctx.font = `500 ${Math.round(w * 0.03)}px Tahoma, Verdana, sans-serif`;
    wrapText(
      ctx,
      vibe,
      Math.round(w * 0.05),
      Math.round(h * 0.22),
      Math.round(w * 0.9),
      Math.round(w * 0.04)
    );
    // slogan block
    ctx.fillStyle = dark;
    ctx.fillRect(
      Math.round(w * 0.05),
      Math.round(h * 0.3),
      Math.round(w * 0.9),
      Math.round(h * 0.28)
    );
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${Math.round(
      (w * fontSize) / 1080
    )}px Tahoma, Verdana, sans-serif`;
    wrapText(
      ctx,
      slogan || "Your modern‑retro headline",
      Math.round(w * 0.08),
      Math.round(h * 0.37),
      Math.round(w * 0.84),
      Math.round(((w * fontSize) / 1080) * 1.1)
    );
    // CTA pill
    const pillW = Math.round(w * 0.42),
      pillH = Math.round(h * 0.07),
      px = Math.round(w * 0.55),
      py = Math.round(h * 0.62);
    roundRect(ctx, px, py, pillW, pillH, Math.round(pillH / 2));
    ctx.fillStyle = accent;
    ctx.fill();
    ctx.fillStyle = "#111";
    ctx.font = `700 ${Math.round(w * 0.03)}px Tahoma, Verdana, sans-serif`;
    ctx.fillText(
      cta,
      px + Math.round(pillW * 0.08),
      py + Math.round(pillH * 0.65)
    );
  };

  const download = () => {
    const link = document.createElement("a");
    link.download = `${brand.replace(/\s+/g, "_")}_${size}.png`;
    link.href = canvasRef.current?.toDataURL("image/png") || "";
    link.click();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        color: "#1e2a4a",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 10,
          background: "#e6ebf7",
          borderBottom: "1px solid #cbd5ea",
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as SizeKey)}
          style={{ padding: 6, border: "1px solid #8aa1c5", borderRadius: 6 }}
        >
          {Object.entries(SIZES).map(([k, v]) => (
            <option value={k} key={k}>
              {v.label}
            </option>
          ))}
        </select>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          style={{ padding: 6, border: "1px solid #8aa1c5", borderRadius: 6 }}
        />
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product / Offer"
          style={{
            padding: 6,
            border: "1px solid #8aa1c5",
            borderRadius: 6,
            minWidth: 160,
          }}
        />
        <input
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="Vibe (adjectives)"
          style={{
            padding: 6,
            border: "1px solid #8aa1c5",
            borderRadius: 6,
            minWidth: 220,
          }}
        />
        <input
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          placeholder="Slogan"
          style={{
            padding: 6,
            border: "1px solid #8aa1c5",
            borderRadius: 6,
            minWidth: 220,
          }}
        />
        <button
          onClick={autoSlogan}
          style={{
            padding: "6px 10px",
            border: "1px solid #8aa1c5",
            background: "#fff",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Auto Slogan
        </button>
        <input
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          placeholder="CTA"
          style={{
            padding: 6,
            border: "1px solid #8aa1c5",
            borderRadius: 6,
            width: 120,
          }}
        />
        <input
          value={palette}
          onChange={(e) => setPalette(e.target.value)}
          placeholder="#bg,#accent,#light,#dark"
          style={{
            padding: 6,
            border: "1px solid #8aa1c5",
            borderRadius: 6,
            minWidth: 220,
          }}
        />
        <label style={{ fontSize: 12, color: "#6c7c9b" }}>
          Headline size
          <input
            type="range"
            min={42}
            max={120}
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            style={{ verticalAlign: "middle", marginLeft: 6 }}
          />
        </label>
        <button
          onClick={download}
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            background: "#ffcc00",
            border: "1px solid #caa002",
            borderRadius: 6,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Download PNG
        </button>
      </div>
      <div
        style={{
          flex: 1,
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "#000",
          }}
        />
      </div>
      <div
        style={{
          padding: 8,
          fontSize: 12,
          color: "#6c7c9b",
          background: "#f3f6ff",
          borderTop: "1px solid #cbd5ea",
        }}
      >
        Tip: Pair with a friendly caption, 2–3 relevant hashtags, and alt text
        that describes the image clearly. Post when your audience is most
        active.
      </div>
      <style jsx>{`
        /* no-op */
      `}</style>
    </div>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}
