import { collectGenres, filterMovies } from "../movieCatalogUtils";

/**
 * @description Unit-тесты утилит каталога (аналоги логики «рейтинг / отбор» из варианта 5)
 * @case Сбор уникальных жанров и сортировка
 * @case Фильтрация по поиску, жанру и минимальному рейтингу
 * @case Крайние случаи: пустые данные, отсутствие совпадений
 */
describe("movieCatalogUtils", () => {
  const movies = [
    {
      id: 1,
      title: "Матрица",
      genres: ["фантастика", "боевик"],
      rating: 8.5,
    },
    {
      id: 2,
      title: "Интерстеллар",
      genres: ["Фантастика", "драма"],
      rating: 8.4,
    },
    {
      id: 3,
      title: "Короткометражка",
      genres: [],
      rating: 6.0,
    },
  ];

  describe("collectGenres", () => {
    test("собирает уникальные жанры без учёта регистра и сортирует по ru", () => {
      const genres = collectGenres(movies);
      expect(genres).toEqual(["боевик", "драма", "фантастика"]);
    });

    test("возвращает пустой массив для пустого списка фильмов", () => {
      expect(collectGenres([])).toEqual([]);
    });

    test("обрабатывает отсутствие поля genres", () => {
      const list = [{ id: 1, title: "X" }];
      expect(collectGenres(list)).toEqual([]);
    });
  });

  describe("filterMovies", () => {
    test("фильтрует по подстроке в названии без учёта регистра", () => {
      const r = filterMovies(movies, { search: "мат", genre: "", minStars: 0 });
      expect(r.map((m) => m.id)).toEqual([1]);
    });

    test("фильтрует по жанру (нижний регистр)", () => {
      const r = filterMovies(movies, { search: "", genre: "фантастика", minStars: 0 });
      expect(r).toHaveLength(2);
    });

    test("исключает фильм без жанров при активном фильтре по жанру", () => {
      const list = [
        { id: 1, title: "С жанром", genres: ["драма"], rating: 8 },
        { id: 2, title: "Без жанров", rating: 8 },
      ];
      const r = filterMovies(list, { search: "", genre: "драма", minStars: 0 });
      expect(r).toHaveLength(1);
      expect(r[0].id).toBe(1);
    });

    test("фильтрует по минимальному количеству звёзд (minStars * 2 для шкалы /10)", () => {
      const r = filterMovies(movies, { search: "", genre: "", minStars: 4 });
      expect(r.every((m) => m.rating >= 8)).toBe(true);
      expect(r.map((m) => m.id)).toContain(1);
      expect(r.map((m) => m.id)).toContain(2);
    });

    test("при minStars 0 не отсекает по рейтингу", () => {
      const r = filterMovies(movies, { search: "", genre: "", minStars: 0 });
      expect(r).toHaveLength(3);
    });

    test("возвращает пустой массив если ничего не подошло", () => {
      expect(filterMovies(movies, { search: "неттакого", genre: "", minStars: 0 })).toEqual([]);
    });

    test("обрезает пробелы в поисковой строке", () => {
      const r = filterMovies(movies, { search: "   мат   ", genre: "", minStars: 0 });
      expect(r).toHaveLength(1);
    });
  });
});
