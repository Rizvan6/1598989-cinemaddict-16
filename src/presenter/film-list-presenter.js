import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListTitleView from '../view/films-list-title-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsListContainerView from '../view/films-list-container';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import { render, remove } from '../utils/render.js';
import { FILM_COUNT_PER_STEP, SortType } from '../utils/const.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils/common.js';

export default class FilmListPresenter {
  #filmListContainer = null;

  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListTitleComponent = new FilmsListTitleView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #buttonShowMoreComponent = new ButtonShowMoreView();

  #filmListFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilmListFilms = [];


  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (filmListFilms) => {
    this.#filmListFilms = [...filmListFilms];

    this.#sourcedFilmListFilms = [...filmListFilms];

    this.#renderFilmsList();
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleFilmChange = (updatedFilm) => {
    this.#filmListFilms = updateItem(this.#filmListFilms, updatedFilm);
    this.#sourcedFilmListFilms = updateItem(this.#sourcedFilmListFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        this.#filmListFilms.sort(this.#filmListFilms.filmReleaseDate);
        break;
      case SortType.SORT_BY_RATING:
        this.#filmListFilms.sort(this.#filmListFilms.filmRate);
        break;
      default:
        this.#filmListFilms = [...this.#sourcedFilmListFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmsList();
  }

  #renderSort = () => {
    render(this.#filmListContainer, this.#sortComponent);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange());
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms = (from, to) => {
    this.#filmListFilms
      .slice(from, to)
      .forEach(((movieListFilm) => this.#renderFilm(movieListFilm)));
  }

  #renderTitle = () => {
    render(this.#filmsListComponent, this.#filmsListTitleComponent);
  }

  #renderNoFilms = () => {
    render(this.#filmsListComponent, this.#noFilmsComponent);
  }

  #handleButtonShowMore = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#filmListFilms.length < this.#renderedFilmCount) {
      remove(this.#buttonShowMoreComponent);
    }
  }

  #renderButtonShowMore = () => {
    render(this.#filmsListComponent, this.#buttonShowMoreComponent);

    this.#buttonShowMoreComponent.setButtonShowMoreClickHandler(this.#handleButtonShowMore);
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  }

  #renderFilmsList = () => {
    if (this.#filmListFilms.length === 0) {
      this.#renderNoFilms();
    } else {
      this.#renderSort();
      this.#renderTitle();
    }

    render(this.#filmListContainer, this.#filmsComponent);
    render(this.#filmsComponent, this.#filmsListComponent);
    render(this.#filmsListComponent, this.#filmsListContainerComponent);

    this.#renderFilms(0, Math.min(this.#filmListFilms.length, FILM_COUNT_PER_STEP));

    if (this.#filmListFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderButtonShowMore();
    }
  }
}
