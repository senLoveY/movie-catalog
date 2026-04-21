export const SearchBox = ({ value, onChange, onSubmit }) => (
  <div className="search-container">
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSubmit) onSubmit();
      }}
      placeholder="Поиск по названию фильма"
      className="kp-input"
      aria-label="Поиск по названию"
    />
    <button type="button" className="kp-btn-search" onClick={() => onSubmit?.()}>
      Найти
    </button>
  </div>
);
