import FilmCardView from '../view/film-card-view.js';
import FilmInfoView from '../view/film-info-view.js';
import { render, addOrRemoveChild, replace, remove } from '../utils/render.js';

const bodyElement = document.querySelector('body');

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #changeData = null;
  #changeMode = null

  #filmCardComponent = null;
  #filmInfoComponent = null;

  #film = null;
  #mode = Mode.DEFAULT;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmInfoComponent = this.#filmInfoComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#filmInfoComponent = new FilmInfoView(film);

    this.#filmCardComponent.setFilmCardClickHandler(this.#switchOnPopup);
    this.#filmCardComponent.setFilmCardWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setFilmCardWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFilmCardFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmInfoComponent.setFilmInfoWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmInfoComponent.setFilmInfoWatchedClickHandler(this.#handleWatchedClick);
    this.#filmInfoComponent.setFilmInfoFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmInfoComponent.setFilmInfoClickHandler(this.#switchOffPopup);

    if (prevFilmCardComponent === null || prevFilmInfoComponent === null) {
      return render(this.#filmListContainer, this.#filmCardComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#filmInfoComponent, prevFilmInfoComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmInfoComponent);

  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmInfoComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#switchOffPopup();
    }
  }

  #switchOnPopup = () => {
    addOrRemoveChild(bodyElement, this.#filmInfoComponent);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #switchOffPopup = () => {
    addOrRemoveChild(bodyElement, this.#filmInfoComponent);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#switchOffPopup();
    }
  }

  #handleWatchlistClick = () => {
    this.#changeData({ ...this.#film, isWatchlist: !this.#film.isWatchlist });
  }

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#film, isWatched: !this.#film.isWatched });
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#film, isFavorite: !this.#film.isFavorite });
  }
}
