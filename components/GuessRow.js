export default function GuessRow({ guess, answer }) {
  const isCountryMatch = guess.birth_country === answer.birth_country;
  const isPositionMatch = guess.position === answer.position;
  const isTeamMatch = guess.teams.some(team => answer.teams.includes(team));

  const getClass = (match) =>
    match
      ? "bg-green-100 text-green-800 border border-green-300"
      : "bg-red-100 text-red-800 border border-red-300";

  return (
    <div className="grid grid-cols-4 gap-4 p-3 border rounded bg-white shadow text-sm">
      <div className="font-medium">{guess.name}</div>
      <div className={`px-2 py-1 rounded text-center ${getClass(isCountryMatch)}`}>
        {guess.birth_country}
      </div>
      <div className={`px-2 py-1 rounded text-center ${getClass(isTeamMatch)}`}>
        {guess.teams.join(", ")}
      </div>
      <div className={`px-2 py-1 rounded text-center ${getClass(isPositionMatch)}`}>
        {guess.position}
      </div>
    </div>
  );
}