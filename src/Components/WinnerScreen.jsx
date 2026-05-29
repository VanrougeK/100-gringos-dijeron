import { useGame } from "../context/GameContext";
import { useEffect, useState } from "react";

export default function WinnerScreen() {
  const { showWinner, teams, resetGame } = useGame();
  const [lines, setLines] = useState([]);

  const winner = teams[0].score >= teams[1].score ? teams[0] : teams[1];
  const tie = teams[0].score === teams[1].score;

  useEffect(() => {
    if (!showWinner) { setLines([]); return; }
    const msgs = [
      "DECRYPTING FINAL SCORES...",
      "CROSS-REFERENCING RESPONDENT DATA...",
      "CALCULATING DIFFERENTIAL...",
      "ANALYZING PERFORMANCE METRICS...",
      tie ? "RESULT: TIE DETECTED — RARE ANOMALY" : `RESULT: ${winner.name.toUpperCase()} DECLARED VICTOR`,
      "LOGGING TO PERMANENT RECORD...",
      "TRANSMISSION COMPLETE.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < msgs.length) {
        setLines((prev) => [...prev, msgs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 380);
    return () => clearInterval(interval);
  }, [showWinner]);

  if (!showWinner) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#030a03",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      textAlign: "center",
    }}>
      <style>{`
        @keyframes terminalLine {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%,100% { text-shadow: 0 0 20px #00ff4188; }
          50% { text-shadow: 0 0 60px #00ff41cc, 0 0 100px #00ff4144; }
        }
      `}</style>

      {/* Scan line moving */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #00ff4133, transparent)",
          animation: "scanDown 4s linear infinite",
        }} />
      </div>

      {/* Boot log */}
      <div style={{
        width: "100%",
        maxWidth: 600,
        textAlign: "left",
        marginBottom: 36,
        border: "1px solid #00ff4122",
        padding: "16px 20px",
        background: "#000d00",
      }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            fontSize: 12,
            color: i === lines.length - 1 ? "#00ff41" : "#00ff4166",
            letterSpacing: 2,
            marginBottom: 4,
            animation: "terminalLine 0.2s ease-out",
          }}>
            &gt; {line}
          </div>
        ))}
        {lines.length > 0 && <span className="blink" style={{ fontFamily: "'VT323'", color: "#00ff41", fontSize: 18 }}>█</span>}
      </div>

      {/* Winner display */}
      {lines.length >= 5 && (
        <div style={{ animation: "fadeInUp 0.5s ease-out" }}>
          <div style={{ fontSize: 10, color: "#00ff4155", letterSpacing: 4, marginBottom: 12 }}>
            ══ FINAL CLASSIFICATION ══
          </div>

          {tie ? (
            <div style={{
              fontFamily: "'VT323', monospace",
              fontSize: 64,
              color: "#ffb000",
              letterSpacing: 6,
              textShadow: "0 0 30px #ffb00088",
            }}>
              TIE CONDITION
            </div>
          ) : (
            <div style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(40px, 7vw, 80px)",
              color: "#00ff41",
              letterSpacing: 6,
              animation: "glowPulse 2s ease-in-out infinite",
            }}>
              {winner.name.toUpperCase()}
            </div>
          )}

          {/* Score comparison */}
          <div style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            margin: "28px 0",
            flexWrap: "wrap",
          }}>
            {teams.map((team) => {
              const isWinner = team.name === winner.name && !tie;
              return (
                <div key={team.id} style={{
                  border: `1px solid ${isWinner ? "#00ff41" : "#00ff4122"}`,
                  padding: "18px 32px",
                  background: isWinner ? "#001a00" : "#030a03",
                  boxShadow: isWinner ? "0 0 20px #00ff4133" : "none",
                  minWidth: 150,
                }}>
                  <div style={{ fontSize: 9, color: "#00ff4155", letterSpacing: 3, marginBottom: 6 }}>
                    {isWinner ? "◉ WINNER" : "○ RUNNER-UP"}
                  </div>
                  <div style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 20,
                    color: isWinner ? "#00ff41" : "#00ff4166",
                    letterSpacing: 2,
                    marginBottom: 4,
                  }}>
                    {team.name}
                  </div>
                  <div style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: 48,
                    color: isWinner ? "#00ff41" : "#00ff4144",
                    textShadow: isWinner ? "0 0 20px #00ff4188" : "none",
                    letterSpacing: 3,
                  }}>
                    {String(team.score).padStart(4,"0")}
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={resetGame} style={{
            background: "#001a00",
            border: "1px solid #00ff41",
            color: "#00ff41",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 13,
            padding: "13px 40px",
            letterSpacing: 4,
            boxShadow: "0 0 20px #00ff4133",
          }}>
            [INITIALIZE NEW SESSION]
          </button>
        </div>
      )}
    </div>
  );
}