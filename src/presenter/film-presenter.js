import FilmCardView from '../view/film-card-view.js';
import FilmInfoView from '../view/film-info-view.js';
import { render, addOrRemoveChild, replace, remove } from '../utils/render.js';

const bodyElement = document.querySelector('body');

export default class FilmPresenter {
  #filmListContainer = null;

  #filmCardComponent = null;
  #filmInfoComponent = null;

  #film = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmInfoComponent = this.#filmInfoComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#filmInfoComponent = new FilmInfoView(film);

    this.#filmCardComponent.setCardClickHandler(this.#switchOnPopup);
    this.#filmInfoComponent.setInfoClickHandler(this.#switchOffPopup);


    if (prevFilmCardComponent === null || prevFilmInfoComponent === null) {
      return render(this.#filmListContainer, this.#filmCardComponent);
    }

    if (this.#filmListContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#filmListContainer.element.contains(prevFilmInfoComponent.element)) {
      replace(this.#filmInfoComponent, prevFilmInfoComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmInfoComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmInfoComponent);
  }

  #switchOnPopup = () => {
    addOrRemoveChild(bodyElement, this.#filmInfoComponent);

    bodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #switchOffPopup = () => {
    addOrRemoveChild(bodyElement, this.#filmInfoComponent);

    bodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#switchOffPopup();
    }
  }
}
