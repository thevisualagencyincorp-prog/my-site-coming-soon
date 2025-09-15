import React, { useState } from "react";

type GameData = {
  [key: string]: string[];
};

type Elimination = {
  [key: string]: string;
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<"setup" | "playing" | "results">(
    "setup"
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [magicNumber, setMagicNumber] = useState<number | null>(null);
  const [gameData, setGameData] = useState<GameData>({});
  const [elimination, setElimination] = useState<Elimination>({});
  const [currentResult, setCurrentResult] = useState("");

  const defaultCategories = {
    house: ["Mansion", "Apartment", "Shack", "House"],
    partners: ["Taylor", "Sabrina", "Tyler", "Myspace Tom"],
    careers: [
      "Founder",
      "Creator",
      "Influencer",
      "Designer",
      "Developer",
      "Photographer",
      "Director",
      "Producer",
    ],
    cars: [
      "Jeep",
      "Mercedes",
      "Range Rover",
      "Porsche",
      "Tesla",
      "Honda",
      "Subaru",
    ],
    cities: ["New York", "Los Angeles", "London", "Tokyo", "Paris", "Austin"],
    kids: ["0", "1", "2", "3", "4"],
    wealth: ["Rich", "Comfortable", "Modest", "Struggling"],
  };

  const startGame = () => {
    const partners =
      (document.getElementById("partners") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];
    const careers =
      (document.getElementById("careers") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];
    const cars =
      (document.getElementById("cars") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];
    const cities =
      (document.getElementById("cities") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];
    const kids =
      (document.getElementById("kids") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];
    const wealth =
      (document.getElementById("wealth") as HTMLTextAreaElement)?.value
        .split("\n")
        .filter((x) => x.trim()) || [];

    const newGameData = {
      house: defaultCategories.house,
      partners,
      careers,
      cars,
      cities,
      kids,
      wealth,
    };

    for (const [key, values] of Object.entries(newGameData)) {
      if ((values as string[]).length < 2) {
        alert(`Please add at least 2 options for ${key}`);
        return;
      }
    }

    setGameData(newGameData);
    setGameState("playing");
  };

  const startSpinning = () => {
    setIsSpinning(true);
    setSpinCount(0);
    const spinInterval = setInterval(() => {
      setSpinCount((prev) => {
        const newCount = prev + 1;
        const spinner = document.getElementById("spinner");
        if (spinner) spinner.textContent = ((newCount % 20) + 1).toString();
        return newCount;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      stopSpinning();
    }, 3000); // Auto-stop after 3 seconds for demo
  };

  const stopSpinning = () => {
    setIsSpinning(false);
    const spinner = document.getElementById("spinner");
    if (spinner) {
      setMagicNumber(parseInt(spinner.textContent || "1"));
      setTimeout(() => playMASH(), 1000);
    }
  };

  const playMASH = () => {
    // Display categories and eliminate options (simplified for React)
    // This would need more state management for full functionality
    setTimeout(() => eliminateOptions(), 2000);
  };

  const eliminateOptions = () => {
    // Simplified elimination logic
    const newElimination: any = {};
    Object.keys(gameData).forEach((key) => {
      newElimination[key] = gameData[key][0]; // Just pick first for demo
    });
    setElimination(newElimination);
    setTimeout(() => showResults(), 1000);
  };

  const showResults = () => {
    setGameState("results");
    const result = `You will live in a ${elimination.house} in ${elimination.cities} with ${elimination.partners}. You'll work as a ${elimination.careers} and drive a ${elimination.cars}. You'll have ${elimination.kids} kids and be ${elimination.wealth}.`;
    setCurrentResult(result);
  };

  const resetGame = () => {
    setGameState("setup");
    setElimination({});
    setCurrentResult("");
    setMagicNumber(null);
  };

  const saveResult = () => {
    if (!currentResult) return;
    // Simplified save logic
    navigator.clipboard.writeText(currentResult).then(() => {
      alert("Result copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen">
      <style>{`
        body { 
          font-family: 'Permanent Marker', cursive;
          background: linear-gradient(135deg, #f5f1e8 0%, #ede4d3 100%);
          position: relative;
        }
        
        .notebook-paper {
          background: 
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(210, 180, 140, 0.04) 0%, transparent 30%),
            linear-gradient(to right, transparent 78px, #dc2626 78px, #dc2626 82px, transparent 82px),
            repeating-linear-gradient(transparent, transparent 27px, #3b82f6 27px, #3b82f6 28px);
          background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 28px;
          background-color: #fefcf7;
          position: relative;
          box-shadow: 
            inset 0 0 120px rgba(139, 69, 19, 0.1),
            0 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .notebook-paper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse at 85% 15%, rgba(139, 69, 19, 0.08) 0%, transparent 25%),
            radial-gradient(ellipse at 15% 85%, rgba(160, 82, 45, 0.06) 0%, transparent 20%),
            linear-gradient(45deg, transparent 48%, rgba(139, 69, 19, 0.03) 49%, rgba(139, 69, 19, 0.03) 51%, transparent 52%);
          pointer-events: none;
        }
        
        .doodle-corner {
          position: absolute;
          font-family: 'Caveat', cursive;
          color: #3b82f6;
          opacity: 0.6;
          transform: rotate(-15deg);
          font-size: 14px;
          font-weight: 600;
        }
        
        .doodle-1 { top: 20px; right: 100px; }
        .doodle-2 { bottom: 40px; left: 120px; transform: rotate(8deg); }
        .doodle-3 { top: 50%; right: 50px; transform: rotate(-25deg); }
        
        .handwritten-title {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          color: #1f2937;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
          transform: rotate(-1deg);
        }
        
        .handwritten-text {
          font-family: 'Permanent Marker', cursive;
          color: #374151;
          line-height: 1.8;
          letter-spacing: 0.5px;
        }
        
        .paper-section {
          background: rgba(255, 255, 255, 0.7);
          border: 2px solid #3b82f6;
          border-radius: 15px;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          position: relative;
          transform: rotate(0.5deg);
          margin: 20px 0;
        }
        
        .paper-section:nth-child(even) {
          transform: rotate(-0.3deg);
        }
        
        .paper-section::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 20px;
          width: 20px;
          height: 20px;
          background: #fbbf24;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          opacity: 0.8;
        }
        
        .handwritten-input {
          font-family: 'Caveat', cursive;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid #3b82f6;
          border-radius: 8px;
          color: #374151;
          font-size: 18px;
          line-height: 1.6;
          padding: 12px 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transform: rotate(-0.5deg);
        }
        
        .handwritten-input:focus {
          outline: none;
          border-color: #1d4ed8;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          transform: rotate(0deg);
        }
        
        .handwritten-input::placeholder {
          font-family: 'Caveat', cursive;
          color: #9ca3af;
          opacity: 0.8;
          font-size: 16px;
        }
        
        .doodle-arrow {
          position: absolute;
          color: #dc2626;
          font-size: 24px;
          transform: rotate(15deg);
        }
        
        .spin-animation {
          animation: spin 0.1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .elimination-animation {
          animation: strikethrough 0.5s ease-in-out;
        }
        @keyframes strikethrough {
          0% { text-decoration: none; opacity: 1; }
          50% { text-decoration: line-through; opacity: 0.7; }
          100% { text-decoration: line-through; opacity: 0.5; }
        }
        
        .paper-button {
          font-family: 'Caveat', cursive;
          font-weight: 600;
          font-size: 18px;
          background: linear-gradient(145deg, #fbbf24, #f59e0b);
          border: 2px solid #d97706;
          border-radius: 20px;
          color: #92400e;
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transform: rotate(-1deg);
          transition: all 0.2s ease;
        }
        
        .paper-button:hover {
          transform: rotate(0deg) scale(1.05);
          box-shadow: 
            0 6px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        
        .hole-punch {
          position: absolute;
          left: 40px;
          width: 8px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 50%;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .hole-1 { top: 100px; }
        .hole-2 { top: 200px; }
        .hole-3 { top: 300px; }
      `}</style>
      <div className="notebook-paper min-h-screen relative">
        <div className="hole-punch hole-1"></div>
        <div className="hole-punch hole-2"></div>
        <div className="hole-punch hole-3"></div>

        <div className="doodle-corner doodle-1">★ MASH ★</div>
        <div className="doodle-corner doodle-2">♡ future ♡</div>
        <div className="doodle-corner doodle-3">✨</div>

        <div className="container mx-auto px-8 py-12 max-w-4xl relative">
          <div className="text-center mb-12 relative">
            <h1 className="handwritten-title text-5xl md:text-7xl mb-4">
              Agency MASH
            </h1>
            <p className="handwritten-text text-xl text-blue-700 font-semibold">
              Discover your future! Fill in the categories below ✏️
            </p>
            <div
              className="doodle-arrow"
              style={{ top: "-10px", right: "20%" }}
            >
              ↗
            </div>
          </div>

          {gameState === "setup" && (
            <div className="space-y-8">
              <div className="paper-section p-8 relative">
                <h2 className="handwritten-title text-3xl mb-6 text-blue-800">
                  Fill in your options! ✎
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      💕 Partners
                    </label>
                    <textarea
                      id="partners"
                      className="handwritten-input w-full"
                      rows={4}
                      placeholder="Write one per line..."
                      defaultValue="Taylor
Sabrina
Tyler
Myspace Tom"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-red-500 text-2xl transform rotate-12">
                      ♡
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      💼 Dream Jobs
                    </label>
                    <textarea
                      id="careers"
                      className="handwritten-input w-full"
                      rows={4}
                      placeholder="Write one per line..."
                      defaultValue="Founder
Creator
Influencer
Designer
Developer
Photographer
Director
Producer"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-blue-500 text-2xl transform rotate-45">
                      ★
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      🚗 Cars
                    </label>
                    <textarea
                      id="cars"
                      className="handwritten-input w-full"
                      rows={4}
                      placeholder="Write one per line..."
                      defaultValue="Jeep
Mercedes
Range Rover
Porsche
Tesla
Honda
Subaru"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-green-500 text-xl transform rotate-12">
                      🚙
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      🏙️ Cities
                    </label>
                    <textarea
                      id="cities"
                      className="handwritten-input w-full"
                      rows={4}
                      placeholder="Write one per line..."
                      defaultValue="New York
Los Angeles
London
Tokyo
Paris
Austin"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-purple-500 text-xl transform rotate-45">
                      🌆
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      👶 Kids
                    </label>
                    <textarea
                      id="kids"
                      className="handwritten-input w-full"
                      rows={3}
                      placeholder="Write one per line..."
                      defaultValue="0
1
2
3
4"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-pink-500 text-xl transform rotate-12">
                      👶
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <label className="handwritten-text block text-lg font-bold text-gray-700 mb-3">
                      💰 Money
                    </label>
                    <textarea
                      id="wealth"
                      className="handwritten-input w-full"
                      rows={3}
                      placeholder="Write one per line..."
                      defaultValue="Rich
Comfortable
Modest
Struggling"
                    ></textarea>
                    <div className="absolute -right-4 top-0 text-yellow-500 text-xl transform rotate-45">
                      💎
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8 relative">
                  <button
                    onClick={startGame}
                    className="paper-button py-4 px-12 text-xl"
                  >
                    Let's see my future! ✨
                  </button>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-red-500 text-2xl rotate-12">
                    ↑
                  </div>
                </div>
              </div>
            </div>
          )}

          {gameState === "playing" && (
            <div className="space-y-8">
              <div className="paper-section p-8 text-center relative">
                <div className="mb-8">
                  <h2 className="handwritten-title text-4xl mb-4 text-red-600">
                    Pick Your Magic Number! 🎯
                  </h2>
                  <p className="handwritten-text text-xl text-gray-700">
                    Click stop when it feels right!
                  </p>
                  <div className="absolute top-4 right-8 text-blue-500 text-3xl transform rotate-12">
                    ✨
                  </div>
                </div>

                <div className="mb-8">
                  <div
                    id="spinner"
                    className={`inline-block text-8xl font-bold text-red-600 cursor-pointer hover:scale-110 transition-transform handwritten-title ${
                      isSpinning ? "spin-animation" : ""
                    }`}
                  >
                    1
                  </div>
                </div>

                <div className="space-x-6">
                  <button
                    onClick={startSpinning}
                    className="paper-button py-4 px-8 text-xl"
                  >
                    Start Spinning! 🌀
                  </button>
                  <button
                    onClick={stopSpinning}
                    className="paper-button py-4 px-8 text-xl bg-gradient-to-br from-red-400 to-red-600 border-red-700"
                  >
                    STOP! ✋
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameState === "results" && (
            <div className="paper-section p-10 text-center relative">
              <div className="absolute -top-4 -left-4 text-6xl text-yellow-400 transform rotate-12">
                🎉
              </div>
              <div className="absolute -top-4 -right-4 text-6xl text-pink-400 transform rotate-45">
                ✨
              </div>
              <div className="absolute -bottom-4 -left-4 text-4xl text-blue-400 transform rotate-12">
                🌟
              </div>
              <div className="absolute -bottom-4 -right-4 text-4xl text-green-400 transform rotate-45">
                💫
              </div>

              <h2 className="handwritten-title text-5xl mb-8 text-purple-700">
                Your Amazing Future! 🔮
              </h2>
              <div className="handwritten-text text-xl space-y-4 mb-10">
                <div className="bg-white bg-opacity-80 p-8 rounded-2xl border-4 border-purple-400 shadow-lg transform rotate-1 relative">
                  <div className="absolute -top-3 -left-3 text-3xl">📝</div>
                  <p className="handwritten-text text-2xl font-bold text-gray-800 leading-relaxed">
                    {currentResult}
                  </p>
                </div>
              </div>
              <div className="space-x-6">
                <button
                  onClick={resetGame}
                  className="paper-button py-4 px-8 text-xl"
                >
                  Play Again! 🎮
                </button>
                <button
                  onClick={saveResult}
                  className="paper-button py-4 px-8 text-xl bg-gradient-to-br from-green-400 to-green-600 border-green-700"
                >
                  Save My Future! 📸
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Game };
