import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, totalMatching, onOpenMovie }) => {
  if (totalMatching === 0) {
    return (
      <section className="movie-grid movie-grid--empty" aria-live="polite">
        <p className="movie-grid-empty">Ничего не найдено. Измените поиск или фильтры.</p>
      </section>
    );
  }

  return (
    <section className="movie-grid-wrapper" aria-label="Каталог фильмов">
      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onOpen={onOpenMovie} />
        ))}
      </div>
      <p className="movie-grid-status" aria-live="polite">
        Показано {movies.length} из {totalMatching}
      </p>
    </section>
  );
};

export default MovieGrid;
