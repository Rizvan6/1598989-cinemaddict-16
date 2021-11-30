import { renderPosition, renderTemplate } from './render.js';
import { createProfileTemplate } from './view/profile-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createButtonShowMoreTemplate } from './view/button-show-more-view.js';
import { createFilmInfoTemplate } from './view/film-info-view.js';
import { createFilmsTemplate } from './view/films-view.js';

const FILM_COUNT = 5;
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');

renderTemplate(headerElement, renderPosition.BEFOREEND, createProfileTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createNavigationTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createSortTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createFilmsTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let index = 0; index < FILM_COUNT; index++) {
  renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate());
}

renderTemplate(filmsListElement, renderPosition.BEFOREEND, createButtonShowMoreTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createFilmInfoTemplate());


