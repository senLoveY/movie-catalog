const MovieMetaLine = ({ movie, className }) => (
  <p className={className}>
    {movie.year}
    {movie.country ? ` · ${movie.country}` : ""}
    {(movie.genres || []).length ? ` · ${movie.genres.join(", ")}` : ""}
  </p>
);

export default MovieMetaLine;
