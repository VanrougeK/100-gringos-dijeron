import { useState } from "react";
import { useGame } from "../context/GameContext";

const emptyForm = {
  question: "",
  answers: Array(6).fill(null).map(() => ({ text: "", points: "" })),
};

export default function QuestionSetup() {
  const { questions, addQuestion, removeQuestion } = useGame();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleAnswerChange(i, field, value) {
    setForm((prev) => {
      const answers = [...prev.answers];
      answers[i] = { ...answers[i], [field]: value };
      return { ...prev, answers };
    });
  }

  function handleSubmit() {
    if (!form.question.trim()) return setError("ERR: QUESTION FIELD EMPTY");
    const valid = form.answers.filter((a) => a.text.trim() && a.points !== "");
    if (valid.length < 2) return setError("ERR: MINIMUM 2 ANSWER ENTRIES REQUIRED");
    setError("");
    addQuestion({
      question: form.question.trim(),
      answers: valid.map((a) => ({ text: a.text.trim(), points: parseInt(a.points) })),
    });
    setForm(emptyForm);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Form */}
      <div style={{
        background: "#030a03",
        border: "1px solid #00ff4133",
        padding: 24,
        position: "relative",
      }}>
        <div style={{
          fontSize: 9, color: "#00ff4166", letterSpacing: 3,
          borderBottom: "1px solid #00ff4122", paddingBottom: 10, marginBottom: 18,
          display: "flex", justifyContent: "space-between",
        }}>
          <span>// NEW RECORD ENTRY</span>
          <span>FIELDS: 7 &nbsp;·&nbsp; REQUIRED: 3</span>
        </div>

        <label style={labelStyle}>QUERY STRING</label>
        <input
          placeholder="> Enter survey question..."
          value={form.question}
          onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
          style={inputStyle}
        />

        <label style={{ ...labelStyle, marginTop: 16 }}>RESPONSE ENTRIES [TEXT / PTS]</label>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 8,
          marginTop: 8,
        }}>
          {form.answers.map((ans, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "#00ff4133", minWidth: 24, letterSpacing: 1 }}>
                {String(i+1).padStart(2,"0")}
              </span>
              <input
                placeholder="RESPONSE TEXT"
                value={ans.text}
                onChange={(e) => handleAnswerChange(i, "text", e.target.value)}
                style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
              />
              <input
                type="number"
                placeholder="000"
                value={ans.points}
                onChange={(e) => handleAnswerChange(i, "points", e.target.value)}
                style={{ ...inputStyle, width: 64, marginBottom: 0, textAlign: "center" }}
              />
            </div>
          ))}
        </div>

        {error && (
          <div style={{ marginTop: 12, fontSize: 11, color: "#ff2020", letterSpacing: 2 }}>
            &gt; {error}
          </div>
        )}

        <button onClick={handleSubmit} style={{
          marginTop: 20,
          background: "#001a00",
          border: "1px solid #00ff41",
          color: "#00ff41",
          fontSize: 12,
          padding: "11px 28px",
          letterSpacing: 3,
          fontFamily: "'Share Tech Mono', monospace",
          boxShadow: "0 0 12px #00ff4122",
        }}>
          [COMMIT RECORD]
        </button>
      </div>

      {/* Records list */}
      <div>
        <div style={{
          fontSize: 9, color: "#00ff4155", letterSpacing: 3,
          marginBottom: 12, display: "flex", justifyContent: "space-between",
        }}>
          <span>// RECORD INDEX</span>
          <span>TOTAL: {String(questions.length).padStart(3,"0")}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {questions.map((q, idx) => (
            <div key={q.id} style={{
              background: "#030a03",
              border: "1px solid #00ff4122",
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              animation: "fadeInUp 0.2s ease-out",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: "#00ff4144", letterSpacing: 2, marginBottom: 5 }}>
                  REC-{String(idx+1).padStart(3,"0")} &nbsp;·&nbsp; ENTRIES: {q.answers.length}
                </div>
                <div style={{ fontSize: 13, color: "#00ff41", letterSpacing: 1, marginBottom: 8 }}>
                  &gt; {q.question}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {q.answers.map((a, i) => (
                    <span key={i} style={{
                      border: "1px solid #00ff4122",
                      padding: "2px 10px",
                      fontSize: 10,
                      color: "#00ff4188",
                      letterSpacing: 1,
                    }}>
                      {a.text} [{a.points}]
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removeQuestion(q.id)}
                style={{
                  background: "transparent",
                  border: "1px solid #ff202033",
                  color: "#ff202088",
                  fontSize: 11,
                  padding: "4px 10px",
                  fontFamily: "'Share Tech Mono', monospace",
                  letterSpacing: 1,
                  flexShrink: 0,
                }}
              >
                [DEL]
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 9,
  color: "#00ff4155",
  letterSpacing: 3,
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  background: "#000d00",
  border: "1px solid #00ff4133",
  borderRadius: 0,
  color: "#00ff41",
  fontSize: 13,
  padding: "10px 12px",
  marginBottom: 0,
  outline: "none",
  letterSpacing: 1,
};