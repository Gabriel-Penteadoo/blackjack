const API_URL = import.meta.env.VITE_API_URL;

export async function startGame(name, playerNames) {
  const res = await fetch(`${API_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      player_names: playerNames,
    }),
  });

  if (!res.ok) throw new Error("Failed to start game");
  return res.json();
}

export async function playTurn(gameId, diceCount) {
  const res = await fetch(`${API_URL}/play/${diceCount}?game_id=${gameId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to play turn");
  return res.json();
}

export async function getGame(gameId) {
  const res = await fetch(`${API_URL}/get/${gameId}`);
  if (!res.ok) throw new Error("Failed to fetch game");
  return res.json();
}

