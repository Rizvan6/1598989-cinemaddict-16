import AbstractView from './abstract-view.js';

const createButtonShowMoreTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ButtonShowMoreView extends AbstractView {
  get template() {
    return createButtonShowMoreTemplate();
  }

  setButtonShowMoreClickHandler = (callback) => {
    this._callback.buttonShowMoreClick = callback;
    this.element.addEventListener('click', this.#buttonShowMoreClickHandler);
  }

  #buttonShowMoreClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonShowMoreClick();
  }
}
