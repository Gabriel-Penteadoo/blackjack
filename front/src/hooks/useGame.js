import { useEffect, useState } from "react";
import { startGame, playTurn, getGame } from "../api/useApi";

export function useGame() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function newGame() {
    setLoading(true);
    try {
      const data = await startGame();
      setGame(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function play(diceCount) {
    if (!game) return;
    setLoading(true);
    try {
      const data = await playTurn(game.id, diceCount);
      setGame(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    if (!game) return;
    const data = await getGame(game.id);
    setGame(data);
  }

  return { game, newGame, play, refresh, loading, error };
}
