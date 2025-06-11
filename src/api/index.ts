import type { Holiday } from "../types";

export async function fetchCountries() {
  const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
  return res.json();
}

export async function fetchUserCountry() {
  const res = await fetch("https://ipapi.co/json/");
  return res.json();
}

export async function fetchHolidays(
  year: number,
  countryCode: string
): Promise<Holiday[]> {
  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
  );
  return res.json();
}
