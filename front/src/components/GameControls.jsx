export default function GameControls({ rollDice, standPlayer }) {
  return (
    <div>
      <button onClick={() => rollDice(1)}>Roll 1 Dice</button>
      <button onClick={() => rollDice(2)}>Roll 2 Dice</button>
      <button onClick={() => rollDice(3)}>Roll 3 Dice</button>
      <button onClick={standPlayer}>Stand</button>
    </div>
  );
}
