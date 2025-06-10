import { useState } from "react";
import "./App.css";
import { CalendarGrid } from "./components/CalendarGrid";

function getToday(): [number, number, number] {
  const now = new Date();
  return [now.getFullYear(), now.getMonth(), now.getDate()];
}

const today = getToday();

function App() {
  const [selectedDate, setSelectedDate] = useState<[number, number]>([
    today[0],
    today[1],
  ]);

  return (
    <>
      <CalendarGrid
        year={selectedDate[0]}
        month={selectedDate[1]}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
}

export default App;
