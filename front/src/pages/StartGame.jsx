import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlackjack } from "../hooks/useBlackjack";

export default function StartGame() {
  const [gameName, setGameName] = useState("");
  const [players, setPlayers] = useState([""]);
  const { handleStartGame, loading } = useBlackjack();
  const navigate = useNavigate();

  const addPlayer = () => setPlayers([...players, ""]);

  const handleChange = (i, val) => {
    const newPlayers = [...players];
    newPlayers[i] = val;
    setPlayers(newPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gameName.trim() || players.some((p) => !p.trim())) return;

    try {
      const data = await handleStartGame(gameName, players);
      if (data?.id) {
        // ✅ Navigate directly using the returned game ID
        navigate(`/game/${data.id}`);
      } else {
        console.error("No game ID returned:", data);
      }
    } catch (err) {
      console.error("Error starting game:", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎲 Start New Game</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Game name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="border p-2 rounded"
        />
        {players.map((p, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Player ${i + 1}`}
            value={p}
            onChange={(e) => handleChange(i, e.target.value)}
            className="border p-2 rounded"
          />
        ))}
        <button
          type="button"
          onClick={addPlayer}
          className="bg-gray-200 p-2 rounded"
        >
          + Add Player
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Starting..." : "Start Game"}
        </button>
      </form>
    </div>
  );
}

