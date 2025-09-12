"use client";
import { useState, useEffect } from "react";

export function MASHGame() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "result">(
    "setup"
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [rollNumber, setRollNumber] = useState<number | null>(null);
  const [currentResult, setCurrentResult] = useState<string>("");
  const [elimination, setElimination] = useState<
    Record<string, { eliminated: string[]; winner: string | null }>
  >({});
  const [saving, setSaving] = useState(false);

  // Editable classic categories
  const [custom, setCustom] = useState({
    partners: "Taylor\nSabrina\nTyler\nMyspace Tom",
    careers:
      "Founder\nCreator\nInfluencer\nDesigner\nDeveloper\nPhotographer\nDirector\nProducer\nMarketer\nWriter\nArtist",
    cars: "Jeep\nMercedes\nRange Rover\nPorsche\nTesla\nHonda\nSubaru\nVolkswagen",
    kids: "0\n1\n2\n3\n4",
    pets: "0\n1\n2\n3",
    petKinds: "Cat\nDog\nBird\nReptile\nFish",
    wealth: "Rich\nComfortable\nModest\nStruggling",
    cities: "New York\nLos Angeles\nLondon\nTokyo\nParis\nAustin",
    hobbies: "Photography\nMusic\nGaming\nTravel\nCooking\nFitness",
  });

  const mashOptions = {
    house: ["Mansion", "Apartment", "Shack", "House"],
    partners: ["Taylor", "Sabrina", "Tyler", "Myspace Tom"],
    careers: [
      "Designer",
      "Developer",
      "Photographer",
      "Director",
      "Producer",
      "Marketer",
      "Writer",
      "Artist",
    ],
    cars: ["Jeep", "Mercedes", "Range Rover", "Porsche", "Tesla", "Honda"],
    kids: ["0", "1", "2", "3", "4"],
    pets: ["0", "1", "2", "3"],
    wealth: ["Rich", "Comfortable", "Modest", "Struggling"],
  };

  const saveCardAsImage = async () => {
    if (!currentResult) return;
    setSaving(true);
    try {
      // Compose an image in canvas instead of DOM screenshot
      const W = 1080;
      const H = 1350;
      const P = 48;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("no canvas context");

      // background (notebook style)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#fecaca"; // red margin line
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(P + 40, 0);
      ctx.lineTo(P + 40, H);
      ctx.stroke();
      ctx.strokeStyle = "#e5e7eb"; // light lines
      ctx.lineWidth = 1;
      for (let y = P + 64; y < H - P; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // header
      ctx.fillStyle = "#111827";
      ctx.font = "700 56px 'Courier New', monospace";
      ctx.fillText("My Agency MASH", P, P + 40);

      // summary box
      ctx.fillStyle = "#111827";
      ctx.font = "700 36px 'Courier New', monospace";
      const lines = currentResult.split("\n");
      let y = P + 120;
      lines.forEach((line) => {
        ctx.fillText(line, P, y);
        y += 48;
      });

      // winners per category
      ctx.font = "400 28px 'Courier New', monospace";
      y += 24;
      (Object.keys(elimination) as Array<keyof typeof elimination>).forEach(
        (cat) => {
          const e = elimination[cat as string];
          if (!e) return;
          const label = `${String(cat)}: ${e.winner ?? ""}`;
          ctx.fillText(label, P, y);
          y += 40;
        }
      );

      // footer
      ctx.font = "400 24px 'Courier New', monospace";
      ctx.fillStyle = "#6b7280";
      ctx.fillText("the-agency.os  •  #theagencyMASH", P, H - P);

      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "agency-mash.png";
      a.click();
    } catch (e) {
      console.error(e);
      alert("Could not save image on this browser.");
    } finally {
      setSaving(false);
    }
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setGameState("playing");
    const rolled = Math.floor(3 + Math.random() * 6); // 3-8 classic
    setRollNumber(rolled);

    // Simulate dice ticking
    const totalSpins = 16 + Math.floor(Math.random() * 12);
    let currentSpin = 0;

    const spinInterval = setInterval(() => {
      currentSpin++;
      setSpinCount(currentSpin);

      // Show a little counter while rolling
      setCurrentResult(`Rolling… ${currentSpin}`);

      if (currentSpin >= totalSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        // Compute elimination winners per category (using custom + house)
        const dynamicOptions: Record<string, string[]> = {
          house: mashOptions.house,
          partners: custom.partners
            .split(/\r?\n/) // one option per line
            .map((s) => s.trim())
            .filter(Boolean),
          careers: custom.careers
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          cars: custom.cars
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          kids: custom.kids
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          pets: custom.pets
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          petKinds: custom.petKinds
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          wealth: custom.wealth
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          cities: custom.cities
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
          hobbies: custom.hobbies
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean),
        };
        const build: Record<
          string,
          { eliminated: string[]; winner: string | null }
        > = {};
        (
          Object.keys(dynamicOptions) as Array<keyof typeof dynamicOptions>
        ).forEach((cat) => {
          const arr = [...dynamicOptions[cat]];
          const eliminated: string[] = [];
          let idx = 0;
          while (arr.length > 1) {
            idx = (idx + rolled - 1) % arr.length;
            const [rem] = arr.splice(idx, 1);
            eliminated.push(rem);
          }
          build[cat] = { eliminated, winner: arr[0] ?? null };
        });
        setElimination(build);
        const summary = `Home: ${build.house.winner}\nPartner: ${
          build.partners.winner
        }\nCareer: ${build.careers.winner}\nCar: ${build.cars.winner}\nKids: ${
          build.kids.winner
        }\nPets: ${build.pets.winner} (${
          build.petKinds?.winner ?? "Pet"
        })\nWealth: ${build.wealth.winner}\nCity: ${
          build.cities.winner
        }\nHobby: ${build.hobbies.winner}`;
        setCurrentResult(summary);
        setGameState("result");
      }
    }, 100);
  };

  const resetGame = () => {
    setGameState("setup");
    setSpinCount(0);
    setCurrentResult("");
    setElimination({});
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        fontSize: "14px",
        color: "#1e2a4a",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Title moved to window chrome */}

      {/* Game Content */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "15px",
          background:
            "#fff url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#ffffff'/><path d='M0 24 H200' stroke='%23e5e7eb' stroke-width='1'/><path d='M0 48 H200' stroke='%23e5e7eb' stroke-width='1'/><path d='M32 0 V200' stroke='%23fecaca' stroke-width='2'/></svg>') repeat",
        }}
      >
        {gameState === "setup" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
                animation: "bounce 2s infinite",
              }}
            >
              🎯
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Classic MASH — Notebook Edition
            </h2>
            <p
              style={{
                margin: "0 0 20px 0",
                lineHeight: "1.6",
                color: "#6c7c9b",
              }}
            >
              Hey friend — grab a pen (or your keyboard)! These are playful
              notebook-style fields — fill each tall box with a few options
              (comma-separated) or keep the fun placeholders. When you&apos;re
              ready, press ROLL and we&apos;ll playfully knock out options until
              one magical result remains. Let&apos;s see what destiny picks for
              you ✨
            </p>

            <div
              style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                border: "1px solid #cbd5ea",
                margin: "20px 0",
              }}
            >
              <h3 style={{ margin: 0, color: "#1e2a4a" }}>Your Options</h3>
              <p
                style={{ margin: "6px 0 12px", color: "#6c7c9b", fontSize: 12 }}
              >
                Enter comma‑separated values. Each row is a category. On mobile,
                fields stack vertically.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {(
                  [
                    [
                      "partners",
                      "Partners (names)",
                      custom.partners,
                      "e.g. Taylor, Sabrina, Tyler, Myspace Tom",
                    ],
                    [
                      "careers",
                      "Careers (dream jobs)",
                      custom.careers,
                      "e.g. Designer, Developer, Photographer",
                    ],
                    ["cars", "Cars", custom.cars, "e.g. Jeep, Tesla, Porsche"],
                    ["kids", "# of Kids", custom.kids, "e.g. 0,1,2,3"],
                    ["pets", "# of Pets", custom.pets, "e.g. 0,1,2,3"],
                    [
                      "petKinds",
                      "Kind of Pet",
                      custom.petKinds,
                      "e.g. Cat, Dog, Bird",
                    ],
                    [
                      "wealth",
                      "Wealth",
                      custom.wealth,
                      "e.g. Rich, Comfortable, Modest",
                    ],
                    [
                      "cities",
                      "Cities",
                      custom.cities,
                      "e.g. New York, London, Tokyo",
                    ],
                    [
                      "hobbies",
                      "Hobbies",
                      custom.hobbies,
                      "e.g. Photography, Music, Gaming",
                    ],
                  ] as const
                ).map(([key, label, val, placeholder]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      background: "#fff",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid #e6edf6",
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
                    }}
                  >
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1e2a4a",
                      }}
                    >
                      {label}
                    </label>
                    <textarea
                      value={val}
                      placeholder={placeholder as string}
                      onChange={(e) =>
                        setCustom((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      style={{
                        width: "100%",
                        minHeight: 110,
                        resize: "vertical",
                        padding: 12,
                        border: "2px solid #f3f4f6",
                        borderRadius: 6,
                        fontSize: 14,
                        fontFamily: "'Courier New', monospace",
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent, transparent 28px, rgba(229,231,235,0.8) 29px)",
                        backgroundColor: "#fff",
                        outline: "none",
                      }}
                    />
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      Tip: Put one option per line (press Enter). Each line is
                      treated as a distinct option.
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                fontWeight: "bold",
                background: "#ffcc00",
                border: "2px solid #caa002",
                borderRadius: "25px",
                cursor: isSpinning ? "not-allowed" : "pointer",
                color: "#1e2a4a",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "scale(1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSpinning) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🎲 ROLL THE DICE 🎲
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
                animation: "spin 0.5s linear infinite",
              }}
            >
              🎡
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Rolling the dice...
            </h2>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ff6b35",
                marginBottom: "20px",
              }}
            >
              {rollNumber ?? spinCount}
            </div>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: "2px solid #cbd5ea",
                fontFamily: "monospace",
                fontSize: "16px",
                whiteSpace: "pre-line",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentResult || "Determining your creative destiny..."}
            </div>
          </div>
        )}

        {gameState === "result" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
              }}
            >
              ✨
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Your Creative Destiny Awaits!
            </h2>

            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                border: "2px solid #ffcc00",
                margin: "20px 0",
                boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e2a4a",
                  whiteSpace: "pre-line",
                  lineHeight: "1.8",
                }}
              >
                {currentResult}
              </div>
              {/* Elimination lists */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 12,
                  marginTop: 16,
                  textAlign: "left",
                }}
              >
                {Object.keys(elimination).map((cat) => {
                  const e = elimination[cat]!;
                  const ordered = e ? [...e.eliminated, e.winner || ""] : [];
                  return (
                    <div key={cat}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        {cat}
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {ordered.map((opt, i) => (
                          <li
                            key={i}
                            style={{
                              textDecoration:
                                i < ordered.length - 1
                                  ? "line-through"
                                  : "none",
                              color:
                                i === ordered.length - 1
                                  ? "#059669"
                                  : "#9ca3af",
                            }}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                background: "#e6ebf7",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #b8c6e3",
                margin: "20px 0",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#1e2a4a",
                }}
              >
                🎉 Congratulations!
              </p>
              <p
                style={{
                  margin: "0",
                  color: "#6c7c9b",
                  lineHeight: "1.6",
                }}
              >
                This could be the start of something amazing! Ready to turn this
                destiny into reality? Let&apos;s discuss how we can bring your
                creative vision to life.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openAOLWindow"))
                }
                style={{
                  padding: "12px 20px",
                  background: "#ffcc00",
                  border: "1px solid #caa002",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                💬 Let&apos;s Talk About This
              </button>
              <button
                onClick={saveCardAsImage}
                disabled={saving}
                style={{
                  padding: "12px 20px",
                  background: saving ? "#e5e7eb" : "#fff",
                  border: "1px solid #cbd5ea",
                  borderRadius: "6px",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                🖼️ {saving ? "Saving…" : "Save Card as Image"}
              </button>
              <button
                onClick={async () => {
                  const text = `#theagencyMASH\n${currentResult}`;
                  try {
                    if (navigator.share) {
                      await navigator.share({ text, title: "My Agency MASH" });
                    } else {
                      await navigator.clipboard.writeText(text);
                      alert("Copied to clipboard — share it!");
                    }
                  } catch {}
                }}
                style={{
                  padding: "12px 20px",
                  background: "#fff",
                  border: "1px solid #cbd5ea",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                📸 Share Result
              </button>
              <button
                onClick={resetGame}
                style={{
                  padding: "12px 20px",
                  background: "#fff",
                  border: "1px solid #cbd5ea",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
