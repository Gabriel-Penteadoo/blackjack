import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBlackjack } from "../hooks/useBlackjack";
import PlayerList from "../components/PlayerList";
import GameControls from "../components/GameControls";
import WinnersList from "../components/WinnersList";

export default function Game() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { game, fetchGame, rollDice, standPlayer } = useBlackjack();

  useEffect(() => {
    fetchGame(id);
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <h2>Turn: {game.turn_count}</h2>
      <p>Current Player: {game.current_player}</p>

      <PlayerList players={game.players} />

      {!game.ended && <GameControls rollDice={rollDice} standPlayer={standPlayer} />}

      {game.ended && <WinnersList winners={game.winners} />}

      <button onClick={() => navigate("/")}>Return to Menu</button>
    </div>
  );
}

