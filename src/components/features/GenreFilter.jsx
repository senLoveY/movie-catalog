export const GenreFilter = ({ genres, value, onChange, label = "Жанр" }) => (
  <div className="filter-group">
    <label htmlFor="genre-select">{label}: </label>
    <select
      id="genre-select"
      className="kp-select genre-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Все жанры</option>
      {genres.map((g) => (
        <option key={g} value={g.toLowerCase()}>
          {g}
        </option>
      ))}
    </select>
  </div>
);
