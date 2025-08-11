import { LapStopwatch } from "./components/stopwatch";

import "./App.css";

function App() {

  return (
    <main className="container">
      <div data-tauri-drag-region className="hide-text">Drag</div>
      <LapStopwatch/>
    </main>
  );
}

export default App;
