import React, { useState } from "react";

const IllusionSlotMachine = () => {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [currentReelSpinning, setCurrentReelSpinning] = useState(null);
  const [message, setMessage] = useState("");
  const [spinCount, setSpinCount] = useState(0);
  const [showIllusion, setShowIllusion] = useState(false);

  const symbols = ["🍒", "🍊", "🍋", "🍉", "⭐", "🔔", "💎", "🌸", "🍀", "🎈"];
  const prankEmojis = [
    "😅",
    "🙃",
    "😮",
    "🤔",
    "😏",
    "😌",
    "🫠",
    "😶‍🌫️",
    "🥴",
    "😵‍💫",
  ];

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomPrankEmoji = () => {
    return prankEmojis[Math.floor(Math.random() * prankEmojis.length)];
  };

  const spinReelWithDelay = (reelIndex, delay, finalSymbol = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentReelSpinning(reelIndex);

        // Animate this reel spinning
        let spinCounts = 0;
        const maxSpins = 12;

        const spinInterval = setInterval(() => {
          setReels((prev) => {
            const newReels = [...prev];
            newReels[reelIndex] = getRandomSymbol();
            return newReels;
          });
          spinCounts++;

          if (spinCounts >= maxSpins) {
            clearInterval(spinInterval);
            setReels((prev) => {
              const newReels = [...prev];
              newReels[reelIndex] =
                finalSymbol !== null ? finalSymbol : getRandomSymbol();
              return newReels;
            });
            setCurrentReelSpinning(null);
            resolve();
          }
        }, 60);
      }, delay);
    });
  };

  const handleSpin = async () => {
    if (spinning) return;

    setSpinning(true);
    setMessage("");
    setShowIllusion(false);
    setReels(["❓", "❓", "❓"]);

    // Wait a moment before starting
    await new Promise((resolve) => setTimeout(resolve, 300));

    const isFirstSpin = spinCount === 0;

    if (isFirstSpin) {
      // FIRST SPIN - Actually let them win (no prank)
      const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];

      // Spin reel 1
      await spinReelWithDelay(0, 0, winningSymbol);
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Spin reel 2
      await spinReelWithDelay(1, 0, winningSymbol);
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Spin reel 3
      await spinReelWithDelay(2, 0, winningSymbol);

      setMessage("🎉 CONGRATULATIONS! YOU WON! 🎉");
      setSpinCount((prev) => prev + 1);
      setSpinning(false);
    } else {
      // SUBSEQUENT SPINS - Create illusion of win, then prank
      const illusionSymbol =
        symbols[Math.floor(Math.random() * symbols.length)];
      const prankSymbol = getRandomPrankEmoji();

      // Step 1: Spin first reel - shows winning symbol
      await spinReelWithDelay(0, 0, illusionSymbol);

      // Short pause to build anticipation
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Step 2: Spin second reel - also shows winning symbol
      await spinReelWithDelay(1, 0, illusionSymbol);

      // User now sees two matching symbols - they think they won!
      setShowIllusion(true);
      setMessage("✨ WINNER? ✨");

      // Dramatic pause - let them celebrate mentally
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Step 3: Spin third reel - but it's a PRANK!
      await spinReelWithDelay(2, 0, prankSymbol);

      // Reveal the prank
      setMessage(
        `😅 JUST KIDDING! Life is unfair... You got ${prankSymbol} instead! 😅`,
      );
      setShowIllusion(false);
      setSpinCount((prev) => prev + 1);
      setSpinning(false);
    }
  };

  const getReelBorderClass = (index) => {
    if (currentReelSpinning === index) {
      return "ring-4 ring-yellow-400 animate-pulse";
    }
    if (showIllusion && index < 2 && spinCount > 0) {
      return "ring-2 ring-green-400 shadow-lg shadow-green-400/50";
    }
    return "ring-1 ring-white/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🎰 ILLUSION SLOT 🎰
          </h1>
          <p className="text-gray-300 mt-2 text-sm italic">
            "First spin is real... after that, it's all an illusion"
          </p>
        </div>

        {/* Reels Display */}
        <div className="flex justify-center gap-5 mb-8">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`
                relative w-28 h-28 bg-white rounded-xl shadow-2xl 
                flex items-center justify-center text-6xl
                transform transition-all duration-200
                ${getReelBorderClass(index)}
              `}
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)",
                boxShadow:
                  currentReelSpinning === index
                    ? "0 0 20px rgba(255,215,0,0.8)"
                    : "0 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* Slot machine stripes */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 rounded-xl pointer-events-none"></div>
              {symbol}

              {/* Reel indicators */}
              {index === 0 && (
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-500 rounded-full"></div>
              )}
              {index === 1 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
              )}
              {index === 2 && (
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Reel Labels */}
        <div className="flex justify-center gap-5 mb-8 text-xs text-gray-300">
          <div className="text-center w-28">REEL 1</div>
          <div className="text-center w-28">REEL 2</div>
          <div className="text-center w-28">REEL 3 (PRANK)</div>
        </div>

        {/* Message Display */}
        <div className="text-center mb-6 min-h-[90px]">
          {message && (
            <div
              className={`
              p-4 rounded-xl font-bold text-lg animate-bounce
              ${
                message.includes("WON")
                  ? "bg-green-500/30 text-green-300 border border-green-500"
                  : message.includes("KIDDING")
                    ? "bg-orange-500/30 text-orange-300 border border-orange-500"
                    : "bg-yellow-500/30 text-yellow-300 border border-yellow-500"
              }
            `}
            >
              {message}
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/40 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-gray-300 text-xs uppercase tracking-wide">
              Total Spins
            </div>
            <div className="text-white text-3xl font-bold">{spinCount}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-gray-300 text-xs uppercase tracking-wide">
              Real Wins
            </div>
            <div className="text-green-400 text-3xl font-bold">
              {spinCount > 0 ? "1" : "0"}
            </div>
            <div className="text-[10px] text-gray-400">(only first spin)</div>
          </div>
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className={`
            w-full py-4 rounded-xl font-bold text-xl transition-all duration-300
            flex items-center justify-center gap-3
            ${
              spinning
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg"
            }
            text-white
          `}
        >
          {spinning ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              SPINNING...
            </>
          ) : (
            <>
              {spinCount === 0
                ? "🎁 FIRST SPIN (FREE WIN) 🎁"
                : "🎰 SPIN & GET PRANKED 🎰"}
            </>
          )}
        </button>

        {/* Explanation Box */}
        <div className="mt-6 p-3 bg-black/30 rounded-xl border border-white/10">
          <p className="text-gray-300 text-xs text-center leading-relaxed">
            <span className="text-yellow-400">✨ First spin:</span> Real win
            guaranteed!
            <br />
            <span className="text-orange-400">😅 Every spin after:</span> Reels
            1 & 2 will match (making you think you won),
            <br />
            then Reel 3 reveals a surprise emoji instead!
            <br />
            <span className="text-pink-300 text-[10px] mt-1 block">
              ⚠️ Life is unfair. The house always wins ⚠️
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IllusionSlotMachine;
