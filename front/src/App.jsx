import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartGame from "./pages/StartGame";
import Game from "./pages/Game";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
import TestAPI from "./components/TestAPI";

function App() {
  return <TestAPI />;
}

export default App;
