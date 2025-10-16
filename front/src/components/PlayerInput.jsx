export default function PlayerInput({ value, onChange, index }) {
  return (
    <input
      type="text"
      placeholder={`Player ${index + 1} Name`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      className="border p-1 m-1 rounded"
    />
  );
}

