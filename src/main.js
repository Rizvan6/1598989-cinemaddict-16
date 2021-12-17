import { render } from './render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmCardView from './view/film-card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import FilmInfoView from './view/film-info-view.js';
import FilmsView from './view/films-view.js';
import FilmsListView from './view/films-list-view';
import FilmsListTitleView from './view/films-list-title-view.js';
import NoFilmsView from './view/no-films-view.js';
import FilmsListContainerView from './view/films-list-container';
import randomFooterStatisticsView from './view/footer-statistics-view.js';
import { generateFilm } from './mock/film.js';
import { generateNavigation } from './mock/navigation.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './const.js';

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer');
const navigation = generateNavigation(films);
const filmsListContainerComponent = new FilmsListContainerView();

const renderFilm = (film) => {
  const filmComponent = new FilmCardView(film);
  const filmInfoComponent = new FilmInfoView(film);

  const switchOnPopup = () => {
    bodyElement.appendChild(filmInfoComponent.element);

    document.addEventListener('keydown', onEscKeyDown);
  };

  const switchOffPopup = () => {
    bodyElement.removeChild(filmInfoComponent.element);

    document.removeEventListener('keydown', onEscKeyDown);
  };

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchOffPopup();
      bodyElement.classList.remove('hide-overflow');
    }
  }

  filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    switchOnPopup();
    bodyElement.classList.add('hide-overflow');
  });

  filmInfoComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    switchOffPopup();
    bodyElement.classList.remove('hide-overflow');
  });


  render(filmsListContainerComponent.element, filmComponent.element);
};

const renderFilmsList = (FilmsListContainer, filmItems) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView();
  const buttonShowMoreComponent = new ButtonShowMoreView();

  if (filmItems.length === 0) {
    render(filmsListComponent.element, new NoFilmsView().element);
  } else {
    render(FilmsListContainer, new SortView().element);
    render(filmsListComponent.element, new FilmsListTitleView().element);
  }

  render(FilmsListContainer, filmsComponent.element);
  render(filmsComponent.element, filmsListComponent.element);
  render(filmsListComponent.element, filmsListContainerComponent.element);

  filmItems
    .slice(0, Math.min(filmItems.length, FILM_COUNT_PER_STEP))
    .forEach((filmCard) => renderFilm(filmCard));

  if (filmItems.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmsListComponent.element, buttonShowMoreComponent.element);

    buttonShowMoreComponent.element.addEventListener('click', (evt) => {
      evt.preventDefault();

      filmItems
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((filmCard) => renderFilm(filmCard));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (filmItems.length < renderedFilmCount) {
        buttonShowMoreComponent.element.remove();
        buttonShowMoreComponent.removeElement();
      }
    });
  }
};


render(headerElement, new ProfileView().element);
render(mainElement, new NavigationView(navigation).element);
renderFilmsList(mainElement, films);
render(footerElement, new randomFooterStatisticsView().element);
