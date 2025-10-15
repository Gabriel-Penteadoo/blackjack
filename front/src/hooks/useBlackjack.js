import { useState, useEffect } from "react";
import { getGame, playTurn } from "../api/blackjack";

export default function useBlackjack(gameId) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGame = async () => {
    try {
      setLoading(true);
      const data = await getGame(gameId);
      setGame(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const rollDice = async (diceCount) => {
    if (!gameId) return;
    try {
      setLoading(true);
      const data = await playTurn(gameId, diceCount);
      setGame(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) fetchGame();
  }, [gameId]);

  return { game, rollDice, loading, error, fetchGame };
}

