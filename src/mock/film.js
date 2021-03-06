import { getRandomInteger, getRandomFloat, shuffleArray, sliceArray, addZeroIfNeeds } from '../utils/common.js';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
dayjs.extend(dayjsRandom);

const comments = [
  {
    id: 1,
    author: 'Tim Macoveev',
    message: 'Booooooooooring',
    emoji: 'smile',
    date: dayjs.between('2018-01-01 23:59', '2021-12-01 23:59').format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 2,
    author: 'John Doe',
    message: 'Interesting setting and a good cast',
    emoji: 'sleeping',
    date: dayjs.between('2018-01-01 23:59', '2021-12-01 23:59').format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 3,
    author: 'John Doe',
    message: 'Almost two hours? Seriously?',
    emoji: 'angry',
    date: dayjs.between('2018-01-01 23:59', '2021-12-01 23:59').format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 4,
    author: 'Tim Macoveev',
    message: 'Very very old. Meh',
    emoji: 'puke',
    date: dayjs.between('2018-01-01 23:59', '2021-12-01 23:59').format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 5,
    author: 'John Doe',
    message: 'Cooooooool',
    emoji: 'smile',
    date: dayjs.between('2018-01-01 23:59', '2021-12-01 23:59').format('YYYY-MM-DD HH:mm'),
  }
];
const filmGenres = [
  ['Drama', 'Film-Noir', 'Mystery'],
  ['Mystery'],
  ['Musical', 'Comedy', 'Drama'],
  ['Cartoon', 'Comedy'],
  ['Western'],
];

const generateFilmName = () => {
  const filmNameArray = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
  ];

  return filmNameArray[getRandomInteger(0, filmNameArray.length - 1)];
};

const generateFilmPoster = () => {
  const filmPosterArray = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'the-dance-of-life.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  return filmPosterArray[getRandomInteger(0, filmPosterArray.length - 1)];
};

const generateFilmDescription = () => {
  const filmSentencesArray = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  return sliceArray(shuffleArray(filmSentencesArray), getRandomInteger(1, 5)).join(' ');
};

const generateFilmTime = () => {
  const randomFilmTimeHour = getRandomInteger(0, 2);
  const randomFilmTimeMinutes = getRandomInteger(15, 59);
  const time = {
    hour: randomFilmTimeHour,
    minutes: randomFilmTimeMinutes,
  };

  if (time.hour === 0) {
    return `${time.minutes}m`;
  }

  return `${time.hour}h ${time.minutes}m`;
};

const generateFilmDirector = () => {
  const filmDirectorArray = [
    'Anthony Mann',
    'John Cromwell',
    'Otto Preminger',
    'Nicholas Webster',
    'Dave Fleischer',
    'Armand Schaefer',
  ];

  return filmDirectorArray[getRandomInteger(0, filmDirectorArray.length)];
};

const generateFilmWriters = () => {
  const filmWritersArray = [
    ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    ['Benjamin Glazer', 'Julian Johnson'],
    ['Lindsley Parsons', 'Will Beale'],
    ['Walter Newman', 'Lewis Meltzer', 'Ben Hecht'],
    ['Paul L. Jacobson'],
    ['Joe Stultz', 'Bill Turner', 'Jack Ward'],
  ];

  return filmWritersArray[getRandomInteger(0, filmWritersArray.length - 1)].join(', ');
};

const generateFilmActors = () => {
  const filmActorsArray = [
    ['Hal Skelly', 'Nancy Carroll', 'Dorothy Revier'],
    ['John Wayne', 'Nancy Shubert', 'Lane Chandler'],
    ['Frank Sinatra', 'Eleanor Parker', 'Kim Novak'],
    ['John Call', 'Leonard Hicks', 'Vincent Beck'],
    ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
  ];

  return filmActorsArray[getRandomInteger(0, filmActorsArray.length - 1)].join(', ');
};

const generateFilmCountry = () => {
  const filmCountryArray = [
    'USA',
    'Spain',
    'Italy',
    'Canada',
    'UK',
  ];

  return filmCountryArray[getRandomInteger(0, filmCountryArray.length - 1)];
};

export const generateFilm = () => {
  const filmGenresFull = filmGenres[getRandomInteger(0, filmGenres.length - 1)];
  const filmGenresLimit = filmGenresFull.slice(0, 1).join('');
  const randomFilmReleaseDate = getRandomInteger(1920, 1970);
  const randomDay = getRandomInteger(0, 31);
  const randomMonth = getRandomInteger(0, 12);
  const randomFilmReleaseDateFull = dayjs(`${randomFilmReleaseDate}-${addZeroIfNeeds(randomMonth)}-${addZeroIfNeeds(randomDay)}`).format('DD MMMM YYYY');
  const randomAgeRating = getRandomInteger(0, 18);
  const randomFilmCommentsLength = getRandomInteger(0, 4);
  const randomFilmRate = getRandomFloat(0, 10, 1);

  return {
    filmName: generateFilmName(),
    filmPoster: generateFilmPoster(),
    filmDescription: generateFilmDescription(),
    filmComments: comments.slice(0, randomFilmCommentsLength),
    filmRate: randomFilmRate,
    filmReleaseDate: randomFilmReleaseDate,
    filmReleaseDateFull: randomFilmReleaseDateFull,
    filmTime: generateFilmTime(),
    filmGenresFull,
    filmGenresLimit,
    filmDirector: generateFilmDirector(),
    filmWriters: generateFilmWriters(),
    filmActors: generateFilmActors(),
    filmCountry: generateFilmCountry(),
    filmAgeRating: randomAgeRating,
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
