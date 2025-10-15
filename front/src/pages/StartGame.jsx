import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlackjack } from "../hooks/useBlackjack";

export default function StartGame() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([""]);
  const { startNewGame } = useBlackjack();
  const navigate = useNavigate();

  const addPlayer = () => setPlayers([...players, ""]);
  const updatePlayer = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleStart = async () => {
    if (!name || players.some((p) => !p)) return alert("Enter all fields");
    const id = await startNewGame(name, players);
    navigate(`/game/${id}`);
  };

  return (
    <div>
      <h1>Start a New Game</h1>
      <input
        placeholder="Game name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h2>Players</h2>
      {players.map((p, i) => (
        <input
          key={i}
          placeholder={`Player ${i + 1}`}
          value={p}
          onChange={(e) => updatePlayer(i, e.target.value)}
        />
      ))}
      <button onClick={addPlayer}>Add Player</button>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

