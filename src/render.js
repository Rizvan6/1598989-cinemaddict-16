export const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const render = (container, element, place = renderPosition.BEFOREEND) => {
  switch (place) {
    case renderPosition.BEFOREBEGIN:
      return container.before(element);
    case renderPosition.AFTERBEGIN:
      return container.prepend(element);
    case renderPosition.BEFOREEND:
      return container.append(element);
    case renderPosition.AFTEREND:
      return container.after(element);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};
