import { createElement } from '../render.js';

const createNavigationItemTemplate = (filter) => {
  const { name, count } = filter;

  return (`<a href="#${name}" class="main-navigation__item" ${count === 0 ? 'disabled' : ''}>${name} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createNavigationTemplate = (navigationItems) => {
  const navigationsItemsTemplate = navigationItems.map((filter) => createNavigationItemTemplate(filter)).join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${navigationsItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};


export default class NavigationView {
  #element = null;
  #navigation = null;

  constructor(navigation) {
    this.#navigation = navigation;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNavigationTemplate(this.#navigation);
  }

  removeElement() {
    this.#element = null;
  }
}
