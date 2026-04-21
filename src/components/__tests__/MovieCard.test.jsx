import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../features/MovieCard";

describe("MovieCard", () => {
  const mockMovie = {
    id: 1,
    title: "Тестовый фильм",
    year: 2020,
    country: "США",
    genres: ["драма"],
    description: "Описание для теста.",
    rating: 8.0,
    image: "/poster.jpg",
  };

  test("отображает название, описание и метаданные", () => {
    render(<MovieCard movie={mockMovie} onOpen={() => {}} />);

    expect(screen.getByRole("heading", { name: mockMovie.title })).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText(/драма/)).toBeInTheDocument();
  });

  test("вызывает onOpen с фильмом при клике по карточке", () => {
    const onOpen = jest.fn();
    render(<MovieCard movie={mockMovie} onOpen={onOpen} />);

    fireEvent.click(screen.getByRole("button", { name: /Подробнее: Тестовый фильм/ }));
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledWith(mockMovie);
  });

  test("не падает если onOpen не передан", () => {
    render(<MovieCard movie={mockMovie} />);
    fireEvent.click(screen.getByRole("button", { name: /Подробнее/ }));
  });
});
