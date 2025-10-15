import { useState } from "react";
import { startGame, playTurn, getGame } from "../api/blackjack";

export function useBlackjack() {
  const [game, setGame] = useState(null);

  // Start a new game
  const startNewGame = async (name, playerNames) => {
    const data = await startGame(name, playerNames);
    setGame(data);
    return data.id; // Return game ID so the page can navigate
  };

  // Roll dice
  const rollDice = async (diceCount) => {
    if (!game) return;
    const data = await playTurn(game.id, diceCount); // pass the current game's ID
    setGame(data);
  };

  // Stand for the current player
  const standPlayer = async () => {
    if (!game) return;
    const data = await playTurn(game.id, 0); // 0 indicates stand
    setGame(data);
  };

  // Fetch game by ID
  const fetchGame = async (id) => {
    const data = await getGame(id);
    setGame(data);
  };

  return { game, startNewGame, rollDice, standPlayer, fetchGame };
}

