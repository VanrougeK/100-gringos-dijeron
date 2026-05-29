import { createContext, useContext, useState } from "react";

const GameContext = createContext();

const defaultQuestions = [
  // ── VIDEOGAMES ────────────────────────────────────────────
  {
    id: 1,
    question:
      "Who's the most popular character from the Sonic the Hedgehog franchise?",
    answers: [
      { text: "Sonic", points: 42 },
      { text: "Shadow", points: 22 },
      { text: "Tails", points: 16 },
      { text: "Knuckles", points: 10 },
      { text: "Amy", points: 6 },
      { text: "Dr. Robotnik", points: 4 },
    ],
  },
  {
    id: 2,
    question:
      "Name a playable character from the Super Smash Bros. roster everyone knows",
    answers: [
      { text: "Mario", points: 35 },
      { text: "Pikachu", points: 24 },
      { text: "Link", points: 18 },
      { text: "Kirby", points: 13 },
      { text: "Samus", points: 7 },
      { text: "Fox", points: 3 },
    ],
  },
  {
    id: 3,
    question:
      "Name a weapon or item everyone picks first in The Legend of Zelda",
    answers: [
      { text: "Bow", points: 32 },
      { text: "Master Sword", points: 28 },
      { text: "Boomerang", points: 18 },
      { text: "Bombs", points: 12 },
      { text: "Shield", points: 6 },
      { text: "Hookshot", points: 4 },
    ],
  },
  {
    id: 4,
    question:
      "Name something players do first when they start a new Minecraft world",
    answers: [
      { text: "Punch a tree", points: 45 },
      { text: "Find shelter", points: 22 },
      { text: "Dig for stone", points: 15 },
      { text: "Look for food", points: 10 },
      { text: "Build a house", points: 5 },
      { text: "Find diamonds", points: 3 },
    ],
  },
  {
    id: 5,
    question: "Name a popular game mode in Fortnite that everyone has played",
    answers: [
      { text: "Battle Royale", points: 50 },
      { text: "Zero Build", points: 22 },
      { text: "Creative", points: 14 },
      { text: "LEGO Fortnite", points: 8 },
      { text: "Save the World", points: 4 },
      { text: "Rocket Racing", points: 2 },
    ],
  },
  {
    id: 6,
    question:
      "Name a Grand Theft Auto game that everyone has played or heard of",
    answers: [
      { text: "GTA V", points: 48 },
      { text: "GTA: San Andreas", points: 28 },
      { text: "GTA IV", points: 12 },
      { text: "GTA: Vice City", points: 8 },
      { text: "GTA III", points: 3 },
      { text: "GTA VI", points: 1 },
    ],
  },
  {
    id: 7,
    question: "Name a Call of Duty game or mode that made the franchise famous",
    answers: [
      { text: "Warzone", points: 35 },
      { text: "Modern Warfare", points: 28 },
      { text: "Zombies", points: 18 },
      { text: "Black Ops", points: 12 },
      { text: "Search & Destroy", points: 5 },
      { text: "MW2 (2009)", points: 2 },
    ],
  },
  {
    id: 8,
    question:
      "Name a popular Pokémon that almost everyone has used on their team",
    answers: [
      { text: "Charizard", points: 40 },
      { text: "Pikachu", points: 26 },
      { text: "Mewtwo", points: 16 },
      { text: "Gengar", points: 9 },
      { text: "Eevee", points: 6 },
      { text: "Snorlax", points: 3 },
    ],
  },
  {
    id: 9,
    question:
      "Name something every player does when they first load into Elden Ring",
    answers: [
      { text: "Die immediately", points: 38 },
      { text: "Explore randomly", points: 24 },
      { text: "Get killed by Tree Sentinel", points: 18 },
      { text: "Customize character", points: 12 },
      { text: "Try to read the lore", points: 5 },
      { text: "Quit and play again", points: 3 },
    ],
  },
  {
    id: 10,
    question: "Name a map from CS:GO / CS2 that every player knows by heart",
    answers: [
      { text: "Dust II", points: 52 },
      { text: "Mirage", points: 22 },
      { text: "Inferno", points: 14 },
      { text: "Nuke", points: 6 },
      { text: "Overpass", points: 4 },
      { text: "Vertigo", points: 2 },
    ],
  },
  {
    id: 11,
    question: "Name a villain from a video game that everyone remembers",
    answers: [
      { text: "Bowser", points: 30 },
      { text: "Ganondorf", points: 24 },
      { text: "Sephiroth", points: 20 },
      { text: "GLaDOS", points: 12 },
      { text: "Nemesis", points: 8 },
      { text: "Dr. Robotnik", points: 6 },
    ],
  },
  {
    id: 12,
    question: "Name a game that has sold more than 30 million copies worldwide",
    answers: [
      { text: "Minecraft", points: 38 },
      { text: "GTA V", points: 28 },
      { text: "Tetris", points: 16 },
      { text: "Mario Kart 8", points: 10 },
      { text: "Red Dead Redemption 2", points: 5 },
      { text: "Elden Ring", points: 3 },
    ],
  },
  // ── PROGRAMMING ───────────────────────────────────────────
  {
    id: 13,
    question: "What's the most common problem when coding in HTML?",
    answers: [
      { text: "Unclosed tags", points: 36 },
      { text: "Wrong indentation", points: 24 },
      { text: "Missing quotes on attributes", points: 18 },
      { text: "Broken image paths", points: 12 },
      { text: "Forgot DOCTYPE", points: 6 },
      { text: "div soup", points: 4 },
    ],
  },
  {
    id: 14,
    question: "What's the first thing a developer Googles when they get stuck?",
    answers: [
      { text: "Stack Overflow", points: 48 },
      { text: "The error message", points: 22 },
      { text: "GitHub issues", points: 14 },
      { text: "Reddit", points: 8 },
      { text: "YouTube tutorial", points: 5 },
      { text: "ChatGPT", points: 3 },
    ],
  },
  {
    id: 15,
    question: "Name a CSS property that drives developers absolutely crazy",
    answers: [
      { text: "flexbox", points: 30 },
      { text: "z-index", points: 26 },
      { text: "position: absolute", points: 20 },
      { text: "margin: auto", points: 12 },
      { text: "float", points: 8 },
      { text: "grid", points: 4 },
    ],
  },
  {
    id: 16,
    question: "What do developers blame first when their code doesn't work?",
    answers: [
      { text: "The framework", points: 30 },
      { text: "A missing semicolon", points: 26 },
      { text: "The browser", points: 18 },
      { text: "The API", points: 14 },
      { text: "Their coworker", points: 8 },
      { text: "The intern", points: 4 },
    ],
  },
  {
    id: 17,
    question:
      "Name something every programmer forgets to do before pushing to main",
    answers: [
      { text: "Pull before push", points: 35 },
      { text: "Write tests", points: 25 },
      { text: "Check for console.logs", points: 18 },
      { text: "Update the README", points: 12 },
      { text: "Review their own PR", points: 7 },
      { text: "Remove hardcoded keys", points: 3 },
    ],
  },
  {
    id: 18,
    question: "Name a JavaScript error that gives every developer a headache",
    answers: [
      { text: "undefined is not a function", points: 38 },
      { text: "Cannot read properties of null", points: 28 },
      { text: "CORS error", points: 18 },
      { text: "Maximum call stack exceeded", points: 9 },
      { text: "NaN", points: 5 },
      { text: "Promise rejected", points: 2 },
    ],
  },
  {
    id: 19,
    question: "Name a thing developers do instead of writing documentation",
    answers: [
      { text: "Add a TODO comment", points: 35 },
      { text: "Leave it for later", points: 28 },
      { text: "Hope others figure it out", points: 18 },
      { text: "Write confusing variable names", points: 10 },
      { text: "Blame the previous dev", points: 6 },
      { text: "Delete the project", points: 3 },
    ],
  },
  {
    id: 20,
    question:
      "What's the most used programming language in 2024 according to surveys?",
    answers: [
      { text: "JavaScript", points: 45 },
      { text: "Python", points: 28 },
      { text: "TypeScript", points: 12 },
      { text: "Java", points: 8 },
      { text: "C#", points: 5 },
      { text: "Rust", points: 2 },
    ],
  },
  {
    id: 21,
    question:
      "Name a sign that tells you a codebase was written a long time ago",
    answers: [
      { text: "jQuery everywhere", points: 38 },
      { text: "var instead of let/const", points: 26 },
      { text: "No version control", points: 16 },
      { text: "PHP 5", points: 10 },
      { text: "Comments say 'don't touch'", points: 6 },
      { text: "Flash animations", points: 4 },
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
        i === activeTeam ? { ...t, score: t.score + points } : t,
      ),
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
    setTeams((prev) => prev.map((t, i) => (i === index ? { ...t, name } : t)));
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
        questions,
        addQuestion,
        removeQuestion,
        currentQuestion,
        currentQuestionIndex,
        revealedAnswers,
        revealAnswer,
        teams,
        activeTeam,
        setActiveTeam,
        strikes,
        triggerStrike,
        showStrike,
        showWinner,
        revealWinner,
        gamePhase,
        startGame,
        resetGame,
        nextQuestion,
        prevQuestion,
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
