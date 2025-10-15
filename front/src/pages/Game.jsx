import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlackjack } from "../hooks/useBlackjack";

export default function Game() {
  const { id } = useParams();
  const { game, handleFetchGame, handlePlayTurn, loading } = useBlackjack();

  useEffect(() => {
    handleFetchGame(id);
  }, [id]);

  if (loading || !game) return <p className="text-center mt-10">Loading...</p>;

  const rollDice = (n) => handlePlayTurn(game.id, n);
  const stand = () => handlePlayTurn(game.id, 0, true);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
      <p>Turn: {game.turn}</p>

      <div className="mt-4 space-y-2">
        {game.players?.map((p) => (
          <div key={p.id} className="border p-2 rounded">
            <strong>{p.name}</strong> — {p.score}
            {p.busted && <span className="text-red-500 ml-2">💥</span>}
            {p.stand && <span className="text-yellow-500 ml-2">🛑</span>}
          </div>
        ))}
      </div>

      {!game.ended ? (
        <div className="flex justify-center gap-4 mt-6">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => rollDice(n)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Roll {n} 🎲
            </button>
          ))}
          <button
            onClick={stand}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Stand ✋
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl font-bold">🏆 Winners</h2>
          {game.winners?.length
            ? game.winners.map((w) => <p key={w.id}>{w.name}</p>)
            : "No winners"}
        </div>
      )}
    </div>
  );
}

