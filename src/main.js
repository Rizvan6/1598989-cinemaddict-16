import { render, addOrRemoveChild, remove } from './utils/render.js';
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
import { FILM_COUNT, FILM_COUNT_PER_STEP } from './utils/const.js';

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
    addOrRemoveChild(bodyElement, filmInfoComponent);

    document.addEventListener('keydown', onEscKeyDown);
  };

  const switchOffPopup = () => {
    addOrRemoveChild(bodyElement, filmInfoComponent);

    document.removeEventListener('keydown', onEscKeyDown);
  };

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchOffPopup();
      bodyElement.classList.remove('hide-overflow');
    }
  }

  filmComponent.setCardClickHandler(() => {
    switchOnPopup();
    bodyElement.classList.add('hide-overflow');
  });

  filmInfoComponent.setInfoClickHandler(() => {
    switchOffPopup();
    bodyElement.classList.remove('hide-overflow');
  });


  render(filmsListContainerComponent, filmComponent);
};

const renderFilmsList = (FilmsListContainer, filmItems) => {
  const filmsComponent = new FilmsView();
  const filmsListComponent = new FilmsListView();
  const buttonShowMoreComponent = new ButtonShowMoreView();

  if (filmItems.length === 0) {
    render(filmsListComponent, new NoFilmsView());
  } else {
    render(FilmsListContainer, new SortView());
    render(filmsListComponent, new FilmsListTitleView());
  }

  render(FilmsListContainer, filmsComponent);
  render(filmsComponent, filmsListComponent);
  render(filmsListComponent, filmsListContainerComponent);

  filmItems
    .slice(0, Math.min(filmItems.length, FILM_COUNT_PER_STEP))
    .forEach((filmCard) => renderFilm(filmCard));

  if (filmItems.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(filmsListComponent, buttonShowMoreComponent);

    buttonShowMoreComponent.setButtonShowMoreClickHandler(() => {
      filmItems
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((filmCard) => renderFilm(filmCard));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (filmItems.length < renderedFilmCount) {
        remove(buttonShowMoreComponent);
      }
    });
  }
};


render(headerElement, new ProfileView());
render(mainElement, new NavigationView(navigation));
renderFilmsList(mainElement, films);
render(footerElement, new randomFooterStatisticsView());
