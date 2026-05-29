import { useGame } from "../context/GameContext";

export default function GameBoard() {
  const {
    currentQuestion, currentQuestionIndex, questions,
    revealedAnswers, revealAnswer,
    triggerStrike, strikes,
    nextQuestion, prevQuestion,
    gamePhase,
  } = useGame();

  if (!currentQuestion) return (
    <div style={{ textAlign: "center", padding: 60, color: "#00ff4144", fontSize: 14, letterSpacing: 3 }}>
      &gt; NO RECORDS FOUND — ADD ENTRIES IN [SETUP] TAB
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, animation: "fadeInUp 0.3s ease-out" }}>

      {/* Question header */}
      <div style={{
        background: "#030a03",
        border: "1px solid #00ff4133",
        padding: "16px 20px",
        position: "relative",
      }}>
        <div style={{
          fontSize: 9,
          color: "#00ff4144",
          letterSpacing: 3,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span>RECORD {String(currentQuestionIndex + 1).padStart(3,"0")} / {String(questions.length).padStart(3,"0")}</span>
          <span>RESPONSES: {currentQuestion.answers.length} &nbsp;·&nbsp; REVEALED: {revealedAnswers.length}</span>
        </div>
        <div style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          color: "#00ff41",
          letterSpacing: 2,
          textShadow: "0 0 15px #00ff4166",
          lineHeight: 1.2,
        }}>
          &gt; {currentQuestion.question}
        </div>
        {/* Blinking cursor */}
        <span className="blink" style={{ fontFamily: "'VT323'", color: "#00ff41", fontSize: 24 }}>█</span>
      </div>

      {/* Answers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {currentQuestion.answers.map((answer, i) => {
          const revealed = revealedAnswers.includes(i);
          const rank = i + 1;
          return (
            <button
              key={i}
              onClick={() => gamePhase === "playing" && revealAnswer(i)}
              disabled={revealed || gamePhase !== "playing"}
              style={{
                background: revealed ? "#001a00" : "#030a03",
                border: `1px solid ${revealed ? "#00ff41" : "#00ff4122"}`,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: revealed || gamePhase !== "playing" ? "default" : "pointer",
                transition: "all 0.2s",
                textAlign: "left",
                boxShadow: revealed ? "0 0 12px #00ff4122" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {revealed && (
                <div style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  width: `${answer.points}%`,
                  background: "linear-gradient(90deg, #00ff4108, transparent)",
                  pointerEvents: "none",
                }} />
              )}

              {/* Rank */}
              <span style={{
                fontFamily: "'VT323', monospace",
                fontSize: 18,
                color: revealed ? "#00ff41" : "#00ff4133",
                minWidth: 28,
                letterSpacing: 1,
              }}>
                {String(rank).padStart(2, "0")}
              </span>

              {/* Separator */}
              <span style={{ color: "#00ff4133", fontSize: 12 }}>│</span>

              {/* Answer text */}
              <span style={{
                flex: 1,
                fontSize: 14,
                letterSpacing: 2,
                color: revealed ? "#00ff41" : "#00ff4133",
                filter: revealed || gamePhase !== "playing" ? "none" : "blur(4px)",
                transition: "filter 0.4s, color 0.3s",
                textTransform: "uppercase",
              }}>
                {answer.text}
              </span>

              {/* Points */}
              {revealed ? (
                <span style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 22,
                  color: "#00ff41",
                  letterSpacing: 2,
                  textShadow: "0 0 10px #00ff4188",
                  minWidth: 50,
                  textAlign: "right",
                }}>
                  {String(answer.points).padStart(3,"0")}
                </span>
              ) : (
                <span style={{ fontSize: 10, color: "#00ff4122", letterSpacing: 2, minWidth: 50, textAlign: "right" }}>
                  [LOCKED]
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      {gamePhase === "playing" && (
        <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", paddingTop: 8, borderTop: "1px solid #00ff4122" }}>

          {/* Wrong answer */}
          <button
            onClick={triggerStrike}
            style={{
              background: "#1a0000",
              border: "1px solid #ff2020",
              color: "#ff2020",
              fontSize: 13,
              padding: "10px 28px",
              letterSpacing: 3,
              fontFamily: "'Share Tech Mono', monospace",
              boxShadow: "0 0 12px #ff202033",
            }}
          >
            ✕ INVALID RESPONSE
          </button>

          {/* Strikes */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "#00ff4144", letterSpacing: 2, marginRight: 4 }}>ERRORS:</span>
            {[0,1,2].map((n) => (
              <div key={n} style={{
                width: 28, height: 28,
                border: `1px solid ${strikes > n ? "#ff2020" : "#00ff4122"}`,
                background: strikes > n ? "#ff202022" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14,
                color: strikes > n ? "#ff2020" : "#00ff4122",
                transition: "all 0.2s",
                boxShadow: strikes > n ? "0 0 8px #ff202055" : "none",
              }}>
                {strikes > n ? "✕" : ""}
              </div>
            ))}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 8 }}>
            <NavBtn onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              [◄ PREV]
            </NavBtn>
            <NavBtn onClick={nextQuestion} disabled={currentQuestionIndex >= questions.length - 1}>
              [NEXT ►]
            </NavBtn>
          </div>
        </div>
      )}
    </div>
  );
}

function NavBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: "transparent",
      border: `1px solid ${disabled ? "#00ff4122" : "#00ff4166"}`,
      color: disabled ? "#00ff4122" : "#00ff4188",
      fontSize: 11,
      padding: "8px 16px",
      letterSpacing: 2,
      fontFamily: "'Share Tech Mono', monospace",
      cursor: disabled ? "not-allowed" : "pointer",
    }}>
      {children}
    </button>
  );
}