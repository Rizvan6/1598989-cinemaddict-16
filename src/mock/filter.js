const taskToFilterMap = {
  watchlist: (tasks) => tasks.filter((task) => !task.isWatchlist).length,
  history: (tasks) => tasks.filter((task) => !task.isWatched).length,
  favorites: (tasks) => tasks.filter((task) => !task.isFavorite).length,
};

export const generateFilter = (tasks) => Object.entries(taskToFilterMap).map(([filterName, countTasks]) => ({
  name: filterName,
  count: countTasks(tasks),
}));
