import axios from "axios";

const API_BASE = "http://localhost:8000"; // change if needed

export const api = axios.create({
  baseURL: API_BASE,
});

export async function startGame() {
  const res = await api.post("/start");
  return res.data;
}

export async function playTurn(gameId, diceCount) {
  const res = await api.post(`/play/${diceCount}`, { game_id: gameId });
  return res.data;
}

export async function getGame(gameId) {
  const res = await api.get(`/get/${gameId}`);
  return res.data;
}
