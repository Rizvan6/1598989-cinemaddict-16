import { renderPosition, renderTemplate } from './render.js';
import { createProfileTemplate } from './view/profile-view.js';
import { createNavigationTemplate } from './view/navigation-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createButtonShowMoreTemplate } from './view/button-show-more-view.js';
//import { createFilmInfoTemplate } from './view/film-info-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { generateTask } from './mock/task.js';


const FILM_COUNT = 15;
const tasks = Array.from({ length: FILM_COUNT }, generateTask);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
//const footerElement = document.querySelector('.footer');

renderTemplate(headerElement, renderPosition.BEFOREEND, createProfileTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createNavigationTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createSortTemplate());
renderTemplate(mainElement, renderPosition.BEFOREEND, createFilmsTemplate());

const filmsElement = document.querySelector('.films');
const filmsListElement = filmsElement.querySelector('.films-list');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let index = 0; index < FILM_COUNT; index++) {
  renderTemplate(filmsListContainerElement, renderPosition.BEFOREEND, createFilmCardTemplate(tasks[index]));
}

renderTemplate(filmsListElement, renderPosition.BEFOREEND, createButtonShowMoreTemplate());
//renderTemplate(footerElement, renderPosition.AFTEREND, createFilmInfoTemplate(tasks[0]));


