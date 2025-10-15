const API_URL = import.meta.env.VITE_API_URL;

// Start a new game
export async function startGame(name, playerNames) {
  const res = await fetch(`${API_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, player_names: playerNames }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to start game: ${text}`);
  }

  const data = await res.json();
  return data; // Returns the full game object from backend
}

// Roll dice or stand
export async function playTurn(gameId, diceCount) {
  const res = await fetch(`${API_URL}/play/${diceCount}?game_id=${gameId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to play turn: ${text}`);
  }

  const data = await res.json();
  // If backend returns only player info, fetch full game state
  if (data.id === undefined) {
    return getGame(gameId);
  }

  return data;
}

// Fetch game by ID
export async function getGame(gameId) {
  const res = await fetch(`${API_URL}/get/${gameId}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch game: ${text}`);
  }
  return res.json();
}

