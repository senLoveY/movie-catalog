import { createPortal } from "react-dom";
import RatingStars from "../ui/RatingStars";
import MovieMetaLine from "./MovieMetaLine";

function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  const titleId = `movie-modal-title-${movie.id}`;

  return createPortal(
    <div className="movie-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="movie-modal-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="movie-modal-layout">
          <div className="movie-modal-poster">
            <img src={movie.image} alt="" />
          </div>
          <div className="movie-modal-body">
            <h2 id={titleId} className="movie-modal-title">
              {movie.title}
            </h2>
            <MovieMetaLine movie={movie} className="movie-modal-meta" />
            <div className="movie-modal-rating">
              <RatingStars rating={movie.rating} />
            </div>
            <p className="movie-modal-description">{movie.description}</p>
            {movie.director ? (
              <p className="movie-modal-credit">
                <span className="movie-modal-label">Режиссёр:</span> {movie.director}
              </p>
            ) : null}
            {movie.screenwriter ? (
              <p className="movie-modal-credit">
                <span className="movie-modal-label">Сценарий:</span> {movie.screenwriter}
              </p>
            ) : null}
            {movie.actors ? (
              <p className="movie-modal-credit">
                <span className="movie-modal-label">В ролях:</span> {movie.actors}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MovieDetailModal;
