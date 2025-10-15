import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBlackjack } from "../hooks/useBlackjack";

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate(); // <-- added
  const { game, fetchGame, rollDice, standPlayer } = useBlackjack();

  useEffect(() => {
    fetchGame(id);
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <h2>Turn: {game.turn}</h2>

      <ul>
        {(game.players || []).map((p) => (
          <li key={p.id}>
            {p.name} - {p.score}{" "}
            {p.busted ? "(Busted)" : p.stand ? "(Stand)" : ""}
          </li>
        ))}
      </ul>

      {!game.ended && (
        <div>
          <button onClick={() => rollDice(1)}>Roll 1 Dice</button>
          <button onClick={() => rollDice(2)}>Roll 2 Dice</button>
          <button onClick={() => rollDice(3)}>Roll 3 Dice</button>
          <button onClick={standPlayer}>Stand</button>
        </div>
      )}

      {game.ended && (
        <div>
          <h2>Game Over!</h2>
          <h3>Winner(s):</h3>
          <ul>
            {(game.winners || []).map((w) => (
              <li key={w.id}>
                {w.name} - {w.score}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Button to return to menu */}
      <button onClick={() => navigate("/")}>Return to Menu</button>
    </div>
  );
}

