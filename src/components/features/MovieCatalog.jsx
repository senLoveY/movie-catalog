import { SearchBox } from "./SearchBox";
import { GenreFilter } from "./GenreFilter";
import MovieGrid from "./MovieGrid";
import RatingStars from "../ui/RatingStars";

const MovieCatalog = ({
  search,
  onSearchChange,
  allGenres,
  genre,
  onGenreChange,
  minStars,
  onMinStarsChange,
  filteredMovies,
  onOpenMovie,
}) => (
  <div className="movie-catalog">
    <header className="top-nav">
      <SearchBox value={search} onChange={onSearchChange} />
    </header>

    <div className="content-body">
      <div className="section-header">
        <h2>MovieCatalog</h2>
        <div className="filters-row">
          <GenreFilter genres={allGenres} value={genre} onChange={onGenreChange} />
          <RatingStars
            mode="filter"
            minStars={minStars}
            onFilterChange={onMinStarsChange}
          />
        </div>
      </div>

      <MovieGrid
        movies={filteredMovies}
        totalMatching={filteredMovies.length}
        onOpenMovie={onOpenMovie}
      />
    </div>
  </div>
);

export default MovieCatalog;
