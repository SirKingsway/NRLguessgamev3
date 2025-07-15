import { useState, useEffect } from "react";
import GuessInput from "../components/GuessInput";
import GuessRow from "../components/GuessRow";
import players from "../data/players";

const answer = players[0]; // You can rotate this manually for now

const getRandomHint = (player, usedKeys = []) => {
  const keys = ["birth_country", "teams", "position"].filter(k => !usedKeys.includes(k));
  const key = keys[Math.floor(Math.random() * keys.length)];
  let text;

  switch (key) {
    case "birth_country":
      text = `This player was born in **${player.birth_country}**.`;
      break;
    case "teams":
      text = `This player has played for the **${player.teams.join(", ")}**.`;
      break;
    case "position":
      text = `This player plays in the **${player.position}** position.`;
      break;
  }

  return { key, text };
};

export default function Home() {
  const [guesses, setGuesses] = useState([]);
  const [hint1, setHint1] = useState(null);
  const [hint2, setHint2] = useState(null);

  useEffect(() => {
    const first = getRandomHint(answer);
    setHint1(first);
  }, []);

  const revealSecondHint = () => {
    if (!hint1) return;
    const second = getRandomHint(answer, [hint1.key]);
    setHint2(second);
  };

  const handleGuess = (player) => {
    if (guesses.length >= 5 || guesses.find(g => g.id === player.id)) return;
    setGuesses([...guesses, player]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">NRL Guessing Game</h1>

      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
        <p className="text-sm">
          🧠 <strong>Hint 1:</strong> {hint1?.text}
        </p>
        {hint2 ? (
          <p className="text-sm mt-2">
            🧠 <strong>Hint 2:</strong> {hint2.text}
          </p>
        ) : (
          <button
            onClick={revealSecondHint}
            className="mt-3 px-4 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Reveal Extra Hint
          </button>
        )}
      </div>

      <GuessInput onGuess={handleGuess} players={players} />
      <div className="mt-6 space-y-3 max-w-2xl mx-auto">
        {guesses.map((guess, i) => (
          <GuessRow key={i} guess={guess} answer={answer} />
        ))}
      </div>
    </div>
  );
}
