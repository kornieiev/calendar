import "./App.css";
import { CalendarGrid } from "./components/CalendarGrid";

import { generateCalendarGrid } from "./utils/generateCalendarGrid";

const days = generateCalendarGrid(2018, 4); // март 2018 (month: 2 потому что 0-based)
console.log(days);

function App() {
  return (
    <>
      <CalendarGrid year={2025} month={4} />
    </>
  );
}

export default App;
