export default function PlayerList({ players }) {
  return (
    <ul>
      {(players || []).map((p) => (
        <li key={p.id}>
          {p.name} - {p.score}{" "}
          {p.busted ? "(Busted)" : p.stand ? "(Stand)" : ""}
        </li>
      ))}
    </ul>
  );
}
