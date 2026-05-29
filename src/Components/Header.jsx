import { useGame } from "../context/GameContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { gamePhase, startGame, resetGame, revealWinner } = useGame();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ts = time.toISOString().replace("T", " ").slice(0, 19);

  return (
    <header style={{
      background: "#030a03",
      borderBottom: "1px solid #00ff4133",
      padding: "12px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Scan line effect */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #00ff410a 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Left: title block */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
            <span style={{ color: "#00ff41", fontSize: 10, letterSpacing: 2, opacity: 0.5 }}>
              ■ SYS:ACTIVE
            </span>
            <span className="blink" style={{ color: "#00ff41", fontSize: 10 }}>█</span>
          </div>
          <h1 className="flicker" style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(22px, 3vw, 36px)",
            color: "#00ff41",
            letterSpacing: 4,
            lineHeight: 1,
            textShadow: "0 0 20px #00ff4188",
          }}>
            SURVEY DATABASE — CLASSIFIED
          </h1>
          <div style={{ fontSize: 10, color: "#00ff4155", letterSpacing: 3, marginTop: 3 }}>
            PROTOCOL: FEUD-V2 &nbsp;|&nbsp; ACCESS: AUTHORIZED &nbsp;|&nbsp; NODE: 100-RESPONDENTS
          </div>
        </div>

        {/* Right: timestamp + controls */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <div style={{ fontSize: 11, color: "#00ff4166", letterSpacing: 2 }}>
            TIMESTAMP: {ts} UTC
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {gamePhase === "setup" && (
              <TermBtn onClick={startGame} color="#00ff41">
                [INITIATE GAME]
              </TermBtn>
            )}
            {gamePhase === "playing" && (
              <>
                <TermBtn onClick={revealWinner} color="#ffb000">
                  [REVEAL WINNER]
                </TermBtn>
                <TermBtn onClick={resetGame} color="#00ff4166">
                  [RESET]
                </TermBtn>
              </>
            )}
            {gamePhase === "winner" && (
              <TermBtn onClick={resetGame} color="#00ff4166">
                [NEW SESSION]
              </TermBtn>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #00ff4122",
        paddingTop: 6,
        display: "flex",
        gap: 24,
        fontSize: 9,
        color: "#00ff4133",
        letterSpacing: 2,
      }}>
        <span>ENCRYPTION: AES-256</span>
        <span>SESSION-ID: {Math.random().toString(36).slice(2,10).toUpperCase()}</span>
        <span>CLEARANCE: LEVEL-5</span>
        <span>BUILD: 4.2.1-STABLE</span>
      </div>
    </header>
  );
}

function TermBtn({ onClick, color, children }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent",
      border: `1px solid ${color}`,
      color,
      fontSize: 11,
      padding: "6px 14px",
      letterSpacing: 2,
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      {children}
    </button>
  );
}