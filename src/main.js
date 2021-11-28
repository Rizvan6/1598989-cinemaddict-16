import { renderPosition, renderTemplate } from './render.js';
import { createFilterTemplate, createStatisticTemplate } from './view/menu-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createRankTemplate } from './view/rank-view.js';
import { createButtonShowMoreTemplate } from './view/button-show-more-view.js';
import { createFilmInfoTemplate } from './view/film-info-view.js';

const FILM_COUNT = 5;
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

renderTemplate(siteHeaderElement, renderPosition.BEFOREEND, createRankTemplate());
renderTemplate(siteMainElement, renderPosition.BEFOREEND, createFilterTemplate());
renderTemplate(siteMainElement, renderPosition.BEFOREEND, createStatisticTemplate());

for (let index = 0; index < FILM_COUNT; index++) {
  renderTemplate(siteMainElement, renderPosition.BEFOREEND, createFilmCardTemplate());
}

renderTemplate(siteMainElement, renderPosition.BEFOREEND, createButtonShowMoreTemplate());
renderTemplate(siteMainElement, renderPosition.BEFOREEND, createFilmInfoTemplate());
