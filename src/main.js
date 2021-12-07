import { renderPosition, renderTemplate } from './render.js';
import { createProfileTemplate } from './view/profile-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createButtonShowMoreTemplate } from './view/button-show-more-view.js';
import { createFilmInfoTemplate } from './view/film-info-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { createFooterStatisticsTemplate } from './view/footer-statistics-view.js';
import { generateTask } from './mock/task.js';
import { generateFilter } from './mock/filter.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './const.js';

const films = Array.from({ length: FILM_COUNT }, generateTask);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filters = generateFilter(films);

renderTemplate(headerElement, renderPosition.BEFOREEND, createProfileTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createNavigationTemplate(filters));
renderTemplate(mainElement, renderPosition.BEFOREEND, createSortTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createFilmsTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let index = 0; index < Math.min(films.length, FILM_COUNT_PER_STEP); index++) {
  renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate(films[index]));
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsListElement, renderPosition.BEFOREEND, createButtonShowMoreTemplate());

  const buttonShowMore = filmsListElement.querySelector('.films-list__show-more');

  buttonShowMore.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate(film)));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (films.length < renderedFilmCount) {
      return buttonShowMore.remove();
    }
  });
}

renderTemplate(footerElement, renderPosition.BEFOREEND, createFooterStatisticsTemplate());
renderTemplate(footerElement, renderPosition.AFTEREND, createFilmInfoTemplate(films[0]));
