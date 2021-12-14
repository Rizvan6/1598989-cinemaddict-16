import { renderPosition, render } from './render.js';
import ProofileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
//import FilmInfoView from './view/film-info-view.js';
import FilmsView from './view/films-view.js';
import FilmsListContainerView from './view/films-list-view';
import randomFooterStatisticsView from './view/footer-statistics-view.js';
import { generateFilm } from './mock/film.js';
import { generateNavigation } from './mock/navigation.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './const.js';

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const navigation = generateNavigation(films);

render(headerElement, renderPosition.BEFOREEND, new ProofileView().element);
render(mainElement, renderPosition.BEFOREEND, new NavigationView(navigation).element);
render(mainElement, renderPosition.BEFOREEND, new SortView().element);

const filmsComponent = new FilmsView();
render(mainElement, renderPosition.BEFOREEND, filmsComponent.element);
render(filmsComponent.element, renderPosition.BEFOREEND, new FilmsListContainerView().element);

const filmsListElement = document.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let index = 0; index < Math.min(films.length, FILM_COUNT_PER_STEP); index++) {
  render(filmsListContainerElement, renderPosition.BEFOREEND, new FilmCardView(films[index]).element);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();

  render(filmsListElement, renderPosition.BEFOREEND, buttonShowMoreComponent.element);

  buttonShowMoreComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, renderPosition.BEFOREEND, new FilmCardView(film).element));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (films.length < renderedFilmCount) {
      buttonShowMoreComponent.element.remove();
      buttonShowMoreComponent.removeElement();
    }
  });
}

render(footerElement, renderPosition.BEFOREEND, new randomFooterStatisticsView().element);
//render(footerElement, renderPosition.AFTEREND, new FilmInfoView(films[0]).element);
