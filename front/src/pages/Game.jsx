import { useParams } from "react-router-dom";
import useBlackjack from "../hooks/useBlackjack";

export default function Game() {
  const { gameId } = useParams();
  const { game, rollDice, loading, error } = useBlackjack(gameId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!game) return <div>No game found</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      {game.ended && game.winners?.length > 0 && (
        <div>
          <h2>Winner{game.winners.length > 1 ? "s" : ""}:</h2>
          <ul>
            {game.winners.map((w) => (
              <li key={w.id}>{w.name} ({w.score})</li>
            ))}
          </ul>
        </div>
      )}

      <h2>Players</h2>
      <ul>
        {game.players.map((p) => (
          <li key={p.id}>
            {p.name}: {p.score} {p.stand ? "(Stand)" : ""}{" "}
            {p.busted ? "(Busted)" : ""}
          </li>
        ))}
      </ul>

      {!game.ended && (
        <div>
          <h3>Roll Dice</h3>
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => rollDice(n)}>
              Roll {n} dice
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

