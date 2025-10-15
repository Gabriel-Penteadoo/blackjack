export default function DiceControls({ onPlay, disabled }) {
  const options = [1, 2, 3];
  return (
    <div className="mt-4">
      <h4 className="mb-2">Roll dice:</h4>
      {options.map((n) => (
        <button
          key={n}
          onClick={() => onPlay(n)}
          disabled={disabled}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded m-1"
        >
          🎲 x{n}
        </button>
      ))}
    </div>
  );
}
