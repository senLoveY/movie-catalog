import Papa from "papaparse";
import csvRaw from "./kinopoisk-top250.csv?raw";

function stripQuotes(s) {
  return String(s ?? "")
    .trim()
    .replace(/^['"]+|['"]+$/g, "");
}

function splitCountries(countryField) {
  return String(countryField ?? "")
    .split(/\s*,\s*/)
    .map((c) => c.trim())
    .filter(Boolean);
}

function splitGenreTokens(genreField) {
  return String(genreField ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);
}

function parseMoviesFromCsv(text) {
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(),
  });

  if (parsed.errors?.length) {
    console.warn("[mockData] CSV parse warnings:", parsed.errors);
  }

  const rows = parsed.data || [];

  return rows.map((row, idx) => {
    const countries = splitCountries(row.country);
    const title = String(row.movie ?? "").trim();
    const overview = String(row.overview ?? "")
      .replace(/\s+/g, " ")
      .trim();
    const ratingBall = parseFloat(String(row.rating_ball ?? "").replace(",", "."));
    const year = parseInt(String(row.year ?? "").trim(), 10);
    const genreTokens = splitGenreTokens(row.genre);

    return {
      id: idx + 1,
      title,
      year: Number.isFinite(year) ? year : 0,
      description: overview,
      rating: Number.isFinite(ratingBall) ? Math.round(ratingBall * 10) / 10 : 0,
      image: stripQuotes(row.url_logo),
      country: countries.join(", ") || "",
      genres: genreTokens,
      director: String(row.director ?? "").trim(),
      screenwriter: String(row.screenwriter ?? "").trim(),
      actors: String(row.actors ?? "").trim(),
    };
  });
}

export const movies = parseMoviesFromCsv(csvRaw);
