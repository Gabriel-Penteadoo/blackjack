import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlackjack } from "../hooks/useBlackjack";
import PlayerListForm from "../components/PlayerListForm";

export default function StartGame() {
  const [gameName, setGameName] = useState("");
  const [players, setPlayers] = useState(["", ""]); // default 2 players
  const { startNewGame } = useBlackjack();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gameName || players.some((p) => !p)) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const gameId = await startNewGame(gameName, players);
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.error("Failed to start game", err);
      alert("Error starting game");
    }
  };

  const addPlayer = () => setPlayers([...players, ""]);
  const removePlayer = (index) => {
    if (players.length <= 1) return;
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Start a New Game</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="border p-1 m-1 rounded"
        />

        <PlayerListForm players={players} setPlayers={setPlayers} />

        <div className="my-2">
          <button type="button" onClick={addPlayer}>Add Player</button>
          <button type="button" onClick={() => removePlayer(players.length - 1)}>Remove Player</button>
        </div>

        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

