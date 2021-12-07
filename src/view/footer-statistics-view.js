import { getRandomInteger } from '../utils.js';
import { TOTAL_COUNT_FILMS_IN_DATABASE } from '../const.js';

const randomFooterStatistics = getRandomInteger(1, TOTAL_COUNT_FILMS_IN_DATABASE);

export const createFooterStatisticsTemplate = () => (`<p>${randomFooterStatistics} movies inside</p>`);

