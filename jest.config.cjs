/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  collectCoverageFrom: [
    "src/utils/**/*.js",
    "src/components/features/MovieCard.jsx",
    "src/components/features/GenreFilter.jsx",
    "src/components/ui/RatingStars.jsx",
  ],
  coverageThreshold: {
    "src/utils/": {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
    "src/components/features/MovieCard.jsx": {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
    "src/components/features/GenreFilter.jsx": {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
    "src/components/ui/RatingStars.jsx": {
      statements: 60,
      branches: 60,
      functions: 60,
      lines: 60,
    },
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
};
