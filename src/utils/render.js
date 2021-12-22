import AbstractView from '../view/abstract-view.js';

export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, element, place = renderPosition.BEFOREEND) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case renderPosition.BEFOREBEGIN:
      return parent.before(child);
    case renderPosition.AFTERBEGIN:
      return parent.prepend(child);
    case renderPosition.BEFOREEND:
      return parent.append(child);
    case renderPosition.AFTEREND:
      return parent.after(child);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const addOrRemoveChild = (parent, element) => {
  if (element === null) {
    throw new Error('Can\'t work with unexisting elemnent');
  }

  const child = element instanceof AbstractView ? element.element : element;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  if (!parent.contains(child)) {
    return parent.appendChild(child);
  } else {
    return parent.removeChild(child);
  }
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};
