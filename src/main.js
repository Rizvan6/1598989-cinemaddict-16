import { renderPosition, renderTemplate, renderElement } from './render.js';
import ProofileView from './view/profile-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
//import { createFilmInfoTemplate } from './view/film-info-view.js';
import FilmsView from './view/films-view.js';
import FilmsListContainerView from './view/films-list-view';
import { createFooterStatisticsTemplate } from './view/footer-statistics-view.js';
import { generateTask } from './mock/task.js';
import { generateFilter } from './mock/filter.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './const.js';

const films = Array.from({ length: FILM_COUNT }, generateTask);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filters = generateFilter(films);

renderElement(headerElement, renderPosition.BEFOREEND, new ProofileView().element);
renderTemplate(mainElement, renderPosition.BEFOREEND, createNavigationTemplate(filters));
renderElement(mainElement, renderPosition.BEFOREEND, new SortView().element);

const filmsComponent = new FilmsView();
renderElement(mainElement, renderPosition.BEFOREEND, filmsComponent.element);
renderElement(filmsComponent.element, renderPosition.BEFOREEND, new FilmsListContainerView().element);

const filmsListElement = document.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let index = 0; index < Math.min(films.length, FILM_COUNT_PER_STEP); index++) {
  renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate(films[index]));
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const buttonShowMoreComponent = new ButtonShowMoreView();

  renderElement(filmsListElement, renderPosition.BEFOREEND, buttonShowMoreComponent.element);

  buttonShowMoreComponent.element.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate(film)));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (films.length < renderedFilmCount) {
      buttonShowMoreComponent.element.remove();
      buttonShowMoreComponent.removeElement();
    }
  });
}

renderTemplate(footerElement, renderPosition.BEFOREEND, createFooterStatisticsTemplate());
//renderTemplate(footerElement, renderPosition.AFTEREND, createFilmInfoTemplate(films[0]));
