import { Component } from "react";
import MovieCatalog from "./components/features/MovieCatalog";
import MovieDetailModal from "./components/features/MovieDetailModal";
import { movies as allMovies } from "./data/mockData";
import { collectGenres, filterMovies } from "./utils/movieCatalogUtils";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      genre: "",
      minStars: 0,
      selectedMovie: null,
    };
    this.allGenres = collectGenres(allMovies);
  }

  handleSearchChange = (search) => {
    this.setState({ search });
  };

  handleGenreChange = (genre) => {
    this.setState({ genre });
  };

  handleMinStarsChange = (minStars) => {
    this.setState({ minStars });
  };

  handleOpenMovie = (movie) => {
    this.setState({ selectedMovie: movie });
  };

  handleCloseModal = () => {
    this.setState({ selectedMovie: null });
  };

  render() {
    const { search, genre, minStars, selectedMovie } = this.state;

    const filteredMovies = filterMovies(allMovies, {
      search,
      genre,
      minStars,
    });

    return (
      <div className="app-container">
        <main className="main-content">
          <MovieCatalog
            search={search}
            onSearchChange={this.handleSearchChange}
            allGenres={this.allGenres}
            genre={genre}
            onGenreChange={this.handleGenreChange}
            minStars={minStars}
            onMinStarsChange={this.handleMinStarsChange}
            filteredMovies={filteredMovies}
            onOpenMovie={this.handleOpenMovie}
          />
          {selectedMovie ? (
            <MovieDetailModal
              movie={selectedMovie}
              onClose={this.handleCloseModal}
            />
          ) : null}
        </main>
      </div>
    );
  }
}

export default App;
