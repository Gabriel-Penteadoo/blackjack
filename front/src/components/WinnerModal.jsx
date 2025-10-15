export default function WinnerModal({ winners }) {
  if (!winners || winners.length === 0) return null;
  return (
    <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
      <h3 className="text-lg font-bold">🏆 Winners</h3>
      <ul>
        {winners.map((w) => (
          <li key={w.id}>{w.name} — Score: {w.score}</li>
        ))}
      </ul>
    </div>
  );
}

