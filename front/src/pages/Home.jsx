import { useNavigate } from "react-router-dom";
import { useGame } from "../hooks/useGame";

export default function Home() {
  const { newGame, game } = useGame();
  const navigate = useNavigate();

  async function handleStart() {
    await newGame();
    navigate(`/game/${game?.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">Blackjack</h1>
      <button
        onClick={handleStart}
        className="bg-green-500 text-white px-6 py-3 rounded"
      >
        Start New Game
      </button>
    </div>
  );
}

