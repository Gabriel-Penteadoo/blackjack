export default function WinnersList({ winners }) {
  return (
    <div>
      <h2>Game Over!</h2>
      <h3>Winner(s):</h3>
      <ul>
        {(winners || []).map((w) => (
          <li key={w.id}>{w.name} - {w.score}</li>
        ))}
      </ul>
    </div>
  );
}
