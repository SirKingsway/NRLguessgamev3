import { useState, useEffect } from "react";

export default function GuessInput({ onGuess, players, disabled }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const matches = players.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(matches.slice(0, 5));
  }, [query, players]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = players.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    if (selected) {
      onGuess(selected);
      setQuery("");
      setFiltered([]);
    } else {
      alert("Player not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        placeholder="Guess a player..."
        value={query}
        disabled={disabled}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300"
      />
      {filtered.length > 0 && !disabled && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow text-sm">
          {filtered.map(player => (
            <li
              key={player.id}
              onClick={() => setQuery(player.name)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {player.name}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Submit Guess
      </button>
    </form>
  );
}
