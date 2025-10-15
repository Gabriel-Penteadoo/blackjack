import PlayerList from "./PlayerList";
import DiceControls from "./DiceControls";
import WinnerModal from "./WinnerModal";

export default function GameBoard({ game, onPlay, onRefresh }) {
  if (!game) return <p>No game started yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{game.name}</h2>
      <p className="text-gray-600 mb-2">
        Turn: {game.turn} {game.ended && "(Game Ended)"}
      </p>

      <PlayerList players={game.players} />
      {!game.ended && (
        <DiceControls onPlay={onPlay} disabled={game.ended} />
      )}
      {game.ended && <WinnerModal winners={game.winners} />}
      <button
        onClick={onRefresh}
        className="mt-4 bg-gray-200 px-4 py-2 rounded"
      >
        Refresh
      </button>
    </div>
  );
}
