import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startGame } from "../api/blackjack";

export default function StartGame() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([""]);
  const navigate = useNavigate();


const handleStart = async () => {
  try {
    const response = await startGame(name, players);
    console.log("Start Game Response:", response);

    // Use response.id instead of response.game_id
    navigate(`/game/${response.id}`);
  } catch (err) {
    console.error("Failed to start game:", err);
  }
};

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => setPlayers([...players, ""]);

  return (
    <div>
      <h1>Start Blackjack Game</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Game Name"
      />
      {players.map((p, i) => (
        <input
          key={i}
          value={p}
          onChange={(e) => handlePlayerChange(i, e.target.value)}
          placeholder={`Player ${i + 1}`}
        />
      ))}
      <button onClick={addPlayer}>Add Player</button>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

