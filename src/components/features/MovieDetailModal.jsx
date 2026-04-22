import { createPortal } from "react-dom";
import RatingStars from "../ui/RatingStars";
import MovieMetaLine from "./MovieMetaLine";

const toEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) return parsed.toString();
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }
  return "";
};

const isDirectVideoUrl = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || "");

function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  const titleId = `movie-modal-title-${movie.id}`;
  const trailerEmbedUrl = toEmbedUrl(movie.trailerUrl);
  const directVideoUrl = isDirectVideoUrl(movie.trailerUrl) ? movie.trailerUrl : "";

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
            {trailerEmbedUrl ? (
              <section className="movie-modal-trailer" aria-label="Трейлер фильма">
                <h3 className="movie-modal-trailer-title">Трейлер</h3>
                <div className="movie-modal-trailer-frame">
                  <iframe
                    src={trailerEmbedUrl}
                    title={`Трейлер: ${movie.title}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            ) : null}
            {directVideoUrl ? (
              <section className="movie-modal-trailer" aria-label="Трейлер фильма">
                <h3 className="movie-modal-trailer-title">Трейлер</h3>
                <video
                  className="movie-modal-trailer-video"
                  src={directVideoUrl}
                  controls
                  preload="metadata"
                />
              </section>
            ) : null}
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
