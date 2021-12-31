import { render } from './utils/render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/navigation-view.js';
import randomFooterStatisticsView from './view/footer-statistics-view.js';
import { generateFilm } from './mock/film.js';
import { generateNavigation } from './mock/navigation.js';
import { FILM_COUNT } from './utils/const.js';
import FilmListPresenter from './presenter/film-list-presenter.js';

const films = Array.from({ length: FILM_COUNT }, generateFilm);
const navigation = generateNavigation(films);

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const filmListPresenter = new FilmListPresenter(mainElement);

render(headerElement, new ProfileView());
render(mainElement, new NavigationView(navigation));
filmListPresenter.init(films);
render(footerElement, new randomFooterStatisticsView());
