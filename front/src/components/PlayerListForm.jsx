import PlayerInput from "./PlayerInput";

export default function PlayerListForm({ players, setPlayers }) {
  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  return (
    <div>
      {players.map((p, i) => (
        <PlayerInput
          key={i}
          value={p}
          index={i}
          onChange={handlePlayerChange}
        />
      ))}
    </div>
  );
}

