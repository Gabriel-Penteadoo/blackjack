import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import GameBoard from "../components/GameBoard";

export default function Game() {
  const { id } = useParams();
  const { game, play, refresh } = useGame();

  useEffect(() => {
    refresh(id);
  }, [id]);

  return (
    <div className="p-6">
      <GameBoard game={game} onPlay={play} onRefresh={() => refresh(id)} />
    </div>
  );
}

