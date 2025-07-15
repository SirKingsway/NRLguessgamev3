import { useState } from "react";
import GuessInput from "../components/GuessInput";
import GuessRow from "../components/GuessRow";
import players from "../data/players";

const answer = players[0]; // You can rotate this manually for now

export default function Home() {
  const [guesses, setGuesses] = useState([]);

  const handleGuess = (player) => {
    if (guesses.length >= 5 || guesses.find(g => g.id === player.id)) return;
    setGuesses([...guesses, player]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">NRL Guessing Game</h1>
      <GuessInput onGuess={handleGuess} players={players} />
      <div className="mt-6 space-y-3 max-w-2xl mx-auto">
        {guesses.map((guess, i) => (
          <GuessRow key={i} guess={guess} answer={answer} />
        ))}
      </div>
    </div>
  );
}