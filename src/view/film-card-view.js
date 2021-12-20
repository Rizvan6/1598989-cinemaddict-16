import { REQUIRED_AMOUNT_OF_SYMBOLS } from '../const.js';
import AbstractView from './abstract-view.js';

const limitDescription = (desc) => {
  let sliced = desc.slice(0, REQUIRED_AMOUNT_OF_SYMBOLS);

  if (sliced.length < desc.length) {
    sliced += '...';
  }

  return sliced;
};

const createFilmCardTemplate = (film) => {
  const { filmName, filmPoster, filmDescription, filmComments, filmRate, filmReleaseDate, filmTime, filmGenresLimit, isWatchlist, isWatched, isFavorite } = film;

  const watchListClassName = isWatchlist
    ? 'film-card__controls-item--active'
    : '';

  const watchedClassName = isWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmName}</h3>
    <p class="film-card__rating">${filmRate}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmReleaseDate}</span>
      <span class="film-card__duration">${filmTime}</span>
      <span class="film-card__genre">${filmGenresLimit}</span>
    </p>
    <img src="./images/posters/${filmPoster}" alt="" class="film-card__poster">
    <p class="film-card__description">${limitDescription(filmDescription)}</p>
    <span class="film-card__comments">${filmComments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${watchListClassName} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${watchedClassName} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${favoriteClassName} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
