export default function GuessRow({ guess, answer }) {
  const isCountryMatch = guess.birth_country === answer.birth_country;
  const isPositionMatch = guess.position === answer.position;
  const isTeamMatch = guess.teams.some(team => answer.teams.includes(team));

  const getClass = (match) =>
    match
      ? "bg-green-500 text-white border-green-600"
      : "bg-red-500 text-white border-red-600";

  return (
    <div className="flex items-center gap-4 p-3 border rounded bg-white shadow text-sm">
      <div className="font-medium w-40">{guess.name}</div>

      {/* Country */}
      <div className={`flex-1 text-center p-2 rounded ${getClass(isCountryMatch)}`}>
        {guess.birth_country}
      </div>

      {/* Team */}
      <div className={`flex-1 text-center p-2 rounded ${getClass(isTeamMatch)}`}>
        {guess.teams.join(", ")}
      </div>

      {/* Position */}
      <div className={`flex-1 text-center p-2 rounded ${getClass(isPositionMatch)}`}>
        {guess.position}
      </div>
    </div>
  );
}
