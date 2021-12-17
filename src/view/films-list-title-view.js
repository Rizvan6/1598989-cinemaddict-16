import { createElement } from '../render.js';

const createFilmsListTitleTemplate = () => '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';

export default class FilmsListTitleView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsListTitleTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

