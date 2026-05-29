import { createContext, useContext, useState } from "react";

const GameContext = createContext();

const defaultQuestions = [
  {
    id: 1,
    question: "Name something you find in a kitchen",
    answers: [
      { text: "Refrigerator", points: 42 },
      { text: "Stove", points: 35 },
      { text: "Microwave", points: 28 },
      { text: "Sink", points: 20 },
      { text: "Coffee Maker", points: 15 },
      { text: "Toaster", points: 10 },
    ],
  },
  {
    id: 2,
    question: "Name a popular sport in America",
    answers: [
      { text: "Football", points: 55 },
      { text: "Basketball", points: 30 },
      { text: "Baseball", points: 25 },
      { text: "Soccer", points: 18 },
      { text: "Hockey", points: 12 },
    ],
  },
];

export function GameProvider({ children }) {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState([]);
  const [teams, setTeams] = useState([
    { id: 1, name: "Team 1", score: 0 },
    { id: 2, name: "Team 2", score: 0 },
  ]);
  const [activeTeam, setActiveTeam] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [showStrike, setShowStrike] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [gamePhase, setGamePhase] = useState("setup"); // setup | playing | winner

  const currentQuestion = questions[currentQuestionIndex];

  function addQuestion(question) {
    setQuestions((prev) => [...prev, { ...question, id: Date.now() }]);
  }

  function removeQuestion(id) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function revealAnswer(answerIndex) {
    if (revealedAnswers.includes(answerIndex)) return;
    setRevealedAnswers((prev) => [...prev, answerIndex]);
    const points = currentQuestion.answers[answerIndex].points;
    setTeams((prev) =>
      prev.map((t, i) =>
        i === activeTeam ? { ...t, score: t.score + points } : t
      )
    );
  }

  function triggerStrike() {
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);
    setShowStrike(true);
    setTimeout(() => setShowStrike(false), 1500);
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setRevealedAnswers([]);
      setStrikes(0);
      setActiveTeam((prev) => (prev === 0 ? 1 : 0));
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
      setRevealedAnswers([]);
      setStrikes(0);
    }
  }

  function startGame() {
    setGamePhase("playing");
    setRevealedAnswers([]);
    setStrikes(0);
    setCurrentQuestionIndex(0);
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
  }

  function updateTeamName(index, name) {
    setTeams((prev) =>
      prev.map((t, i) => (i === index ? { ...t, name } : t))
    );
  }

  function revealWinner() {
    setShowWinner(true);
    setGamePhase("winner");
  }

  function resetGame() {
    setGamePhase("setup");
    setRevealedAnswers([]);
    setStrikes(0);
    setCurrentQuestionIndex(0);
    setShowWinner(false);
    setActiveTeam(0);
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
  }

  return (
    <GameContext.Provider
      value={{
        questions, addQuestion, removeQuestion,
        currentQuestion, currentQuestionIndex,
        revealedAnswers, revealAnswer,
        teams, activeTeam, setActiveTeam,
        strikes, triggerStrike,
        showStrike,
        showWinner, revealWinner,
        gamePhase, startGame, resetGame,
        nextQuestion, prevQuestion,
        updateTeamName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}