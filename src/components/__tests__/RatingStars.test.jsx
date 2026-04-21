import { render, screen, fireEvent } from "@testing-library/react";
import RatingStars from "../ui/RatingStars";

describe("RatingStars", () => {
  describe("режим display", () => {
    test("показывает числовой рейтинг и title с дробной частью", () => {
      render(<RatingStars rating={7.5} />);

      expect(screen.getByTitle("Рейтинг 7.5 / 10")).toBeInTheDocument();
      expect(screen.getByText("7.5")).toBeInTheDocument();
    });

    test("корректно ограничивает отображение при экстремальных значениях", () => {
      const { rerender } = render(<RatingStars rating={0} />);
      expect(screen.getByTitle("Рейтинг 0.0 / 10")).toBeInTheDocument();

      rerender(<RatingStars rating={10} />);
      expect(screen.getByTitle("Рейтинг 10.0 / 10")).toBeInTheDocument();
    });
  });

  describe("режим filter", () => {
    test("вызывает onFilterChange при выборе звезды", () => {
      const onFilterChange = jest.fn();
      render(
        <RatingStars mode="filter" minStars={0} onFilterChange={onFilterChange} />,
      );

      fireEvent.click(screen.getByTitle("Не ниже 6 из 10"));
      expect(onFilterChange).toHaveBeenCalledWith(3);
    });

    test("сбрасывает фильтр по кнопке «Любой»", () => {
      const onFilterChange = jest.fn();
      render(
        <RatingStars mode="filter" minStars={4} onFilterChange={onFilterChange} />,
      );

      fireEvent.click(screen.getByRole("button", { name: "Любой" }));
      expect(onFilterChange).toHaveBeenCalledWith(0);
    });

    test("отмечает активные звёзды по minStars", () => {
      render(<RatingStars mode="filter" minStars={2} onFilterChange={() => {}} />);

      const stars = screen.getAllByRole("button", { name: "★" });
      expect(stars[0]).toHaveAttribute("aria-pressed", "true");
      expect(stars[1]).toHaveAttribute("aria-pressed", "true");
      expect(stars[2]).toHaveAttribute("aria-pressed", "false");
    });
  });
});
