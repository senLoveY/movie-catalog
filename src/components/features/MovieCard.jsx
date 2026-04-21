import RatingStars from "../ui/RatingStars";
import MovieMetaLine from "./MovieMetaLine";

const MovieCard = ({ movie, onOpen }) => (
  <article className="movie-card movie-card--interactive">
    <button
      type="button"
      className="movie-card-hit"
      onClick={() => onOpen?.(movie)}
      aria-label={`Подробнее: ${movie.title}`}
    >
      <div className="poster-container">
        <img src={movie.image} alt="" />
      </div>
      <div className="movie-info">
        <h3 className="title">{movie.title}</h3>
        <MovieMetaLine movie={movie} className="meta" />
        <RatingStars rating={movie.rating} />
        <p className="description">{movie.description}</p>
      </div>
    </button>
  </article>
);

export default MovieCard;
