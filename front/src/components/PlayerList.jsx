export default function PlayerList({ players }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Players</h3>
      <ul>
        {players.map((p) => (
          <li key={p.id} className="border p-2 mb-1 rounded">
            <strong>{p.name}</strong> — Score: {p.score}{" "}
            {p.busted && "💥"} {p.stand && "🛑"}
          </li>
        ))}
      </ul>
    </div>
  );
}

