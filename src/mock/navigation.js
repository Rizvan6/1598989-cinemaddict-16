const taskToNavigationMap = {
  watchlist: (films) => films.filter((film) => !film.isWatchlist).length,
  history: (films) => films.filter((film) => !film.isWatched).length,
  favorites: (films) => films.filter((film) => !film.isFavorite).length,
};

export const generateNavigation = (films) => Object.entries(taskToNavigationMap).map(([filterName, countFilms]) => ({
  name: filterName,
  count: countFilms(films),
}));
