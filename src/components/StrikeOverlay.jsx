import { useGame } from "../context/GameContext";

export default function StrikeOverlay() {
  const { showStrike } = useGame();
  if (!showStrike) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#ff000066",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "brightness(0.3) saturate(3)",
    }}>
      <style>{`
        @keyframes alertPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        .alert-box { animation: alertPulse 0.3s ease-in-out infinite; }
      `}</style>

      <div className="alert-box" style={{
        border: "2px solid #ff2020",
        padding: "40px 80px",
        textAlign: "center",
        background: "#0a0000",
        boxShadow: "0 0 80px #ff202088, inset 0 0 40px #ff202022",
      }}>
        <div style={{ fontSize: 10, color: "#ff2020aa", letterSpacing: 4, marginBottom: 12 }}>
          SYSTEM ALERT — LEVEL 1
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(60px, 15vw, 120px)",
          color: "#ff2020",
          lineHeight: 1,
          textShadow: "0 0 40px #ff2020",
          letterSpacing: 8,
        }}>
          ✕ ERROR
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: 28,
          color: "#ff2020aa",
          letterSpacing: 6,
          marginTop: 8,
        }}>
          RESPONSE NOT IN DATABASE
        </div>
      </div>
    </div>
  );
}