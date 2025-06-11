import { useState, useEffect } from "react";
import { CalendarGrid } from "./components/CalendarGrid";
import "./App.css";

function getToday(): [number, number, number] {
  const now = new Date();
  return [now.getFullYear(), now.getMonth(), now.getDate()];
}

const today = getToday();

function App() {
  const [countries, setCountries] = useState<
    { countryCode: string; name: string }[]
  >([]);
  console.log("countries", countries);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://date.nager.at/api/v3/AvailableCountries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((geo) => {
            const found = data.find((c: any) => c.countryCode === geo.country);
            console.log("found", found);
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

  // Получение праздников при изменении года или страны
  useEffect(() => {
    if (!selectedCountry) return;
    const year = selectedDate[0];
    fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${selectedCountry}`
    )
      .then((res) => res.json())
      .then((data) => setHolidays(data));
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
      />
    </>
  );
}

export default App;
