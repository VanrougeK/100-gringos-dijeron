import { useState } from "react";
import { GameProvider } from "./context/GameContext";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import TeamPanel from "./components/TeamPanel";
import QuestionSetup from "./components/QuestionSetup";
import StrikeOverlay from "./components/StrikeOverlay";
import WinnerScreen from "./components/WinnerScreen";

export default function App() {
  const [tab, setTab] = useState("game");

  return (
    <GameProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />

        {/* Tab bar */}
        <div style={{
          display: "flex",
          background: "#000d00",
          borderBottom: "1px solid #00ff4122",
          padding: "0 24px",
          gap: 0,
        }}>
          {[
            { key: "game", label: "// GAME TERMINAL" },
            { key: "setup", label: "// DATABASE EDITOR" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                background: tab === key ? "#001a00" : "transparent",
                color: tab === key ? "#00ff41" : "#00ff4144",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11,
                padding: "12px 20px",
                borderRadius: 0,
                border: "none",
                borderBottom: tab === key ? "2px solid #00ff41" : "2px solid transparent",
                letterSpacing: 2,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
          <div style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            fontSize: 9,
            color: "#00ff4133",
            letterSpacing: 2,
          }}>
            STATUS: ONLINE &nbsp;
            <span className="blink" style={{ color: "#00ff41" }}>●</span>
          </div>
        </div>

        {/* Content */}
        <main style={{
          flex: 1,
          padding: "24px",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
        }}>
          {tab === "game" ? (
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <TeamPanel teamIndex={0} />
              <div style={{ flex: 1 }}>
                <GameBoard />
              </div>
              <TeamPanel teamIndex={1} />
            </div>
          ) : (
            <QuestionSetup />
          )}
        </main>

        <StrikeOverlay />
        <WinnerScreen />
      </div>
    </GameProvider>
  );
}