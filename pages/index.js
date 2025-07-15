import { useState, useEffect } from "react";
import GuessInput from "../components/GuessInput";
import GuessRow from "../components/GuessRow";
import players from "../data/players";

const answer = players[0]; // Rotate or randomize later

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
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const first = getRandomHint(answer);
    setHint1(first);
  }, []);

  const revealSecondHint = () => {
    if (!hint1) return;
    const second = getRandomHint(answer, [hint1.key]);
    setHint2(second);
  };

  const handleGues
