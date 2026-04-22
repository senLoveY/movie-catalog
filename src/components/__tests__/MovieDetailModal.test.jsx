import { render, screen } from "@testing-library/react";
import MovieDetailModal from "../features/MovieDetailModal";

describe("MovieDetailModal trailer rendering", () => {
  const baseMovie = {
    id: 42,
    title: "Тестовый фильм",
    year: 2024,
    country: "Россия",
    genres: ["драма"],
    description: "Описание",
    rating: 8.2,
    image: "/poster.jpg",
    director: "Режиссер",
    screenwriter: "Сценарист",
    actors: "Актер 1, Актер 2",
  };

  test("рендерит iframe для youtube watch URL", () => {
    render(
      <MovieDetailModal
        movie={{ ...baseMovie, trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}
        onClose={() => {}}
      />
    );

    const iframe = screen.getByTitle(`Трейлер: ${baseMovie.title}`);
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/dQw4w9WgXcQ");
    expect(screen.queryByRole("video")).not.toBeInTheDocument();
  });

  test("рендерит iframe для youtu.be URL", () => {
    render(
      <MovieDetailModal
        movie={{ ...baseMovie, id: 43, trailerUrl: "https://youtu.be/abc123xyz" }}
        onClose={() => {}}
      />
    );

    const iframe = screen.getByTitle(`Трейлер: ${baseMovie.title}`);
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/abc123xyz");
  });

  test("рендерит video для прямой ссылки на mp4", () => {
    render(
      <MovieDetailModal
        movie={{ ...baseMovie, id: 44, trailerUrl: "https://cdn.example.com/trailer.mp4" }}
        onClose={() => {}}
      />
    );

    const video = document.querySelector("video.movie-modal-trailer-video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "https://cdn.example.com/trailer.mp4");
    expect(screen.queryByTitle(`Трейлер: ${baseMovie.title}`)).not.toBeInTheDocument();
  });

  test("не рендерит блок трейлера для невалидного URL", () => {
    render(
      <MovieDetailModal
        movie={{ ...baseMovie, id: 45, trailerUrl: "not-a-valid-url" }}
        onClose={() => {}}
      />
    );

    expect(screen.queryByText("Трейлер")).not.toBeInTheDocument();
    expect(screen.queryByTitle(`Трейлер: ${baseMovie.title}`)).not.toBeInTheDocument();
    expect(document.querySelector("video.movie-modal-trailer-video")).not.toBeInTheDocument();
  });
});
