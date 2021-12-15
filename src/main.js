import { renderPosition, render } from './render.js';
import ProofileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import FilmInfoView from './view/film-info-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view';
import FilmsListContainerView from './view/films-list-container';
import randomFooterStatisticsView from './view/footer-statistics-view.js';
import { generateFilm } from './mock/film.js';
import { generateNavigation } from './mock/navigation.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './const.js';

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer');
const navigation = generateNavigation(films);

render(headerElement, renderPosition.BEFOREEND, new ProofileView().element);
render(mainElement, renderPosition.BEFOREEND, new NavigationView(navigation).element);
render(mainElement, renderPosition.BEFOREEND, new SortView().element);

const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
const filmsListContainerComponent = new FilmsListContainerView();

render(mainElement, renderPosition.BEFOREEND, filmsComponent.element);
render(filmsComponent.element, renderPosition.BEFOREEND, filmsListComponent.element);
render(filmsListComponent.element, renderPosition.BEFOREEND, filmsListContainerComponent.element);

const renderFilm = (film) => {
  const filmComponent = new FilmCardView(film);
  const filmInfoComponent = new FilmInfoView(film);

  const switchOnPopup = () => {
    bodyElement.appendChild(filmInfoComponent.element);

    document.addEventListener('keydown', onEscKeyDown);
  };

  const switchOffPopup = () => {
    bodyElement.removeChild(filmInfoComponent.element);

    document.removeEventListener('keydown', onEscKeyDown);
  };

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchOffPopup();
      bodyElement.classList.remove('hide-overflow');
    }
  }

  filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    switchOnPopup();
    bodyElement.classList.add('hide-overflow');
  });

  filmInfoComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    switchOffPopup();
    bodyElement.classList.remove('hide-overflow');
  });


  render(filmsListContainerComponent.element, renderPosition.BEFOREEND, filmComponent.element);
};

for (let index = 0; index < Math.min(films.length, FILM_COUNT_PER_STEP); index++) {
  renderFilm(films[index]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();

  render(filmsListComponent.element, renderPosition.BEFOREEND, buttonShowMoreComponent.element);

  buttonShowMoreComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (films.length < renderedFilmCount) {
      buttonShowMoreComponent.element.remove();
      buttonShowMoreComponent.removeElement();
    }
  });
}

render(footerElement, renderPosition.BEFOREEND, new randomFooterStatisticsView().element);
