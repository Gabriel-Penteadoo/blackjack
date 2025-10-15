import { useState } from "react";
import * as api from "../api/blackjack";

export function useBlackjack() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStartGame = async (name, players) => {
    try {
      setLoading(true);
      const data = await api.startGame(name, players);
      setGame(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchGame = async (id) => {
    try {
      setLoading(true);
      const data = await api.getGame(id);
      setGame(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTurn = async (id, diceCount, stand = false) => {
    try {
      const data = await api.playTurn(id, diceCount, stand);
      setGame(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    game,
    loading,
    error,
    handleStartGame,
    handleFetchGame,
    handlePlayTurn,
  };
}

