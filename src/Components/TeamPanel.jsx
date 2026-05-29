import { useGame } from "../context/GameContext";

export default function TeamPanel({ teamIndex }) {
  const { teams, activeTeam, setActiveTeam, updateTeamName, gamePhase } = useGame();
  const team = teams[teamIndex];
  const isActive = activeTeam === teamIndex;
  const id = teamIndex === 0 ? "ALPHA" : "BRAVO";

  return (
    <div style={{
      background: "#030a03",
      border: `1px solid ${isActive ? "#00ff41" : "#00ff4133"}`,
      padding: "20px 16px",
      minWidth: 170,
      position: "relative",
      boxShadow: isActive ? "0 0 24px #00ff4122, inset 0 0 20px #00ff410a" : "none",
      transition: "all 0.3s",
    }}>
      {/* Corner brackets */}
      <Corner pos="top-left" active={isActive} />
      <Corner pos="top-right" active={isActive} />
      <Corner pos="bottom-left" active={isActive} />
      <Corner pos="bottom-right" active={isActive} />

      {/* Unit ID */}
      <div style={{
        fontSize: 9,
        color: "#00ff4155",
        letterSpacing: 3,
        marginBottom: 10,
        borderBottom: "1px solid #00ff4122",
        paddingBottom: 6,
      }}>
        UNIT-{id} &nbsp;·&nbsp; {isActive ? (
          <span style={{ color: "#00ff41" }}>● ACTIVE</span>
        ) : (
          <span style={{ color: "#00ff4144" }}>○ STANDBY</span>
        )}
      </div>

      {/* Team name */}
      {gamePhase === "setup" ? (
        <input
          value={team.name}
          onChange={(e) => updateTeamName(teamIndex, e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid #00ff4166",
            color: "#00ff41",
            fontFamily: "'VT323', monospace",
            fontSize: 22,
            width: "100%",
            outline: "none",
            marginBottom: 12,
            letterSpacing: 2,
            textShadow: "0 0 10px #00ff4166",
          }}
        />
      ) : (
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: 22,
          color: isActive ? "#00ff41" : "#00ff4166",
          letterSpacing: 2,
          marginBottom: 12,
          textShadow: isActive ? "0 0 10px #00ff4166" : "none",
        }}>
          {team.name}
        </div>
      )}

      {/* Score */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 9, color: "#00ff4144", letterSpacing: 3, marginBottom: 2 }}>
          SCORE
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: 56,
          color: isActive ? "#00ff41" : "#00ff4155",
          lineHeight: 1,
          textShadow: isActive ? "0 0 30px #00ff4188" : "none",
          letterSpacing: 3,
        }}>
          {String(team.score).padStart(4, "0")}
        </div>
      </div>

      {/* Switch turn */}
      {gamePhase === "playing" && !isActive && (
        <button
          onClick={() => setActiveTeam(teamIndex)}
          style={{
            marginTop: 10,
            background: "transparent",
            border: "1px solid #00ff4133",
            color: "#00ff4166",
            fontSize: 10,
            padding: "5px 10px",
            letterSpacing: 2,
            width: "100%",
            fontFamily: "'Share Tech Mono', monospace",
          }}
        >
          [TRANSFER TURN]
        </button>
      )}
    </div>
  );
}

function Corner({ pos, active }) {
  const size = 8;
  const color = active ? "#00ff41" : "#00ff4144";
  const styles = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
  };
  const corners = {
    "top-left":     { top: 0, left: 0, borderWidth: "1px 0 0 1px" },
    "top-right":    { top: 0, right: 0, borderWidth: "1px 1px 0 0" },
    "bottom-left":  { bottom: 0, left: 0, borderWidth: "0 0 1px 1px" },
    "bottom-right": { bottom: 0, right: 0, borderWidth: "0 1px 1px 0" },
  };
  return <div style={{ ...styles, ...corners[pos] }} />;
}