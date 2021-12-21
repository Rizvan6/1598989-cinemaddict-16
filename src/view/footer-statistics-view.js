import { getRandomInteger } from '../utils/common.js';
import { TOTAL_COUNT_FILMS_IN_DATABASE } from '../utils/const.js';
import AbstractView from './abstract-view.js';

const randomFooterStatistics = getRandomInteger(1, TOTAL_COUNT_FILMS_IN_DATABASE);

const createFooterStatisticsTemplate = () => (`<p>${randomFooterStatistics} movies inside</p>`);

export default class randomFooterStatisticsView extends AbstractView {
  get template() {
    return createFooterStatisticsTemplate();
  }
}
