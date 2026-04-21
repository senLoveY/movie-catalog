import { render, screen, fireEvent } from "@testing-library/react";
import { GenreFilter } from "../features/GenreFilter";

describe("GenreFilter", () => {
  const genres = ["Драма", "Комедия"];

  test("рендерит подпись и опции, включая «Все жанры»", () => {
    render(<GenreFilter genres={genres} value="" onChange={() => {}} />);

    expect(screen.getByLabelText(/Жанр/)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Все жанры" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Драма" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Комедия" })).toBeInTheDocument();
  });

  test("вызывает onChange с value опции (нижний регистр)", () => {
    const onChange = jest.fn();
    render(<GenreFilter genres={genres} value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/Жанр/), { target: { value: "драма" } });
    expect(onChange).toHaveBeenCalledWith("драма");
  });

  test("поддерживает кастомный label", () => {
    render(
      <GenreFilter genres={genres} value="" onChange={() => {}} label="Категория" />,
    );
    expect(screen.getByLabelText(/Категория/)).toBeInTheDocument();
  });
});
