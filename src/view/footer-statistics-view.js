import { getRandomInteger } from '../utils.js';
import { TOTAL_COUNT_FILMS_IN_DATABASE } from '../const.js';
import { createElement } from '../render.js';

const randomFooterStatistics = getRandomInteger(1, TOTAL_COUNT_FILMS_IN_DATABASE);

const createFooterStatisticsTemplate = () => (`<p>${randomFooterStatistics} movies inside</p>`);

export default class randomFooterStatisticsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatisticsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
