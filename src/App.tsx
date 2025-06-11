import { useState, useEffect, useRef } from "react";
import { CalendarGrid } from "./components/CalendarGrid";
import { loadTasks, saveTasks } from "./utils/storage";
import { fetchCountries, fetchUserCountry, fetchHolidays } from "./api";
import "./App.css";
import type { Holiday, Task } from "./types";

function getToday(): [number, number, number] {
  const now = new Date();
  return [now.getFullYear(), now.getMonth(), now.getDate()];
}

const today = getToday();

function App() {
  const [countries, setCountries] = useState<
    { countryCode: string; name: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const isFirstLoad = useRef(true);

  // Load tasks from localStorage on startup
  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  // Save tasks in localStorage when modified, except for the first renderer
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveTasks(tasks);
  }, [tasks]);

  // Receiving the list of countries and check for current user country
  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      fetchUserCountry().then((geo) => {
        const found = data.find(
          (c: { countryCode: string }) => c.countryCode === geo.country
        );
        setSelectedCountry(
          found ? found.countryCode : data[0]?.countryCode || ""
        );
      });
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState<[number, number]>([
    today[0],
    today[1],
  ]);

  // Receiving holidays when changing the year or country
  useEffect(() => {
    if (!selectedCountry) return;
    const year = selectedDate[0];
    fetchHolidays(year, selectedCountry).then(setHolidays);
  }, [selectedCountry, selectedDate]);

  return (
    <>
      <CalendarGrid
        year={selectedDate[0]}
        month={selectedDate[1]}
        setSelectedDate={setSelectedDate}
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        holidays={holidays}
        tasks={tasks}
        setTasks={setTasks}
      />
    </>
  );
}

export default App;
