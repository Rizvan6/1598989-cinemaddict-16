import { createElement } from '../render.js';

const noFilmsTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class NoFilmsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return noFilmsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
