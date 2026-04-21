const STAR = "★";
const STAR_EMPTY = "☆";

const getRatingColor = (r) => {
  if (r >= 8) return "#3bb33b";
  if (r >= 7) return "#77bb22";
  return "#aaaaaa";
};

const RatingStarsDisplay = ({ rating }) => {
  const filled = Math.min(5, Math.max(0, Math.round(rating / 2)));
  return (
    <div className="rating-stars-display" title={`Рейтинг ${rating.toFixed(1)} / 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? "star filled" : "star empty"}>
          {i < filled ? STAR : STAR_EMPTY}
        </span>
      ))}
      <span className="kp-rating-badge" style={{ backgroundColor: getRatingColor(rating) }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const RatingStarsFilter = ({ minStars, onChange }) => {
  return (
    <div className="rating-stars-filter" role="group" aria-label="Минимальный рейтинг">
      <span className="rating-filter-label">Рейтинг от:</span>
      <div className="rating-stars-clickable">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn ${minStars >= n ? "active" : ""}`}
            onClick={() => onChange(n)}
            title={`Не ниже ${n * 2} из 10`}
            aria-pressed={minStars >= n}
          >
            {STAR}
          </button>
        ))}
        <button type="button" className="rating-clear-btn" onClick={() => onChange(0)}>
          Любой
        </button>
      </div>
    </div>
  );
};

const RatingStars = ({ rating, mode = "display", minStars, onFilterChange }) => {
  if (mode === "filter") {
    return <RatingStarsFilter minStars={minStars} onChange={onFilterChange} />;
  }
  return <RatingStarsDisplay rating={rating} />;
};

export default RatingStars;
