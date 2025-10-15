// src/components/TestAPI.jsx
import { useEffect } from "react";
import { startGame } from "../api/blackjack";

export default function TestAPI() {
  useEffect(() => {
    async function test() {
      try {
        const game = await startGame("Test Game", ["Alice"]);
        console.log("Game created:", game);
      } catch (err) {
        console.error("API call failed:", err);
      }
    }
    test();
  }, []);

  return <div>Check the console for API response</div>;
}

