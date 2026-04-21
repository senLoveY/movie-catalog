export function collectGenres(list) {
  const byLower = new Map();
  list.forEach((m) => {
    (m.genres || []).forEach((g) => {
      const low = g.toLowerCase();
      if (!byLower.has(low)) byLower.set(low, g);
    });
  });
  return Array.from(byLower.values()).sort((a, b) => a.localeCompare(b, "ru"));
}

export function filterMovies(movies, { search, genre, minStars }) {
  const q = search.trim().toLowerCase();
  const minRating = minStars > 0 ? minStars * 2 : 0;

  return movies.filter((m) => {
    if (q && !m.title.toLowerCase().includes(q)) return false;
    if (genre) {
      const g = (m.genres || []).map((x) => x.toLowerCase());
      if (!g.includes(genre)) return false;
    }
    if (minRating > 0 && m.rating < minRating) return false;
    return true;
  });
}
