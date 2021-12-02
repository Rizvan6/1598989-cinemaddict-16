import { getRandomInteger, getRandomFloat, shuffleArray, sliceArray } from '../utils.js';

const generateFilmName = () => {
  const filmNameArray = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians'
  ];

  return filmNameArray[getRandomInteger(0, filmNameArray.length - 1)];
};

const generateFilmPoster = () => {
  const filmPosterArray = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'the-dance-of-life.jpg',
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

const comments = [
  {
    id: 1,
    author: 'Tim Macoveev',
    message: 'Booooooooooring',
    emoji: 'smile.png',
    date: '2019/12/31 23:59',
  },
  {
    id: 2,
    author: 'John Doe',
    message: 'Interesting setting and a good cast',
    emoji: 'sleeping.png',
    date: '2019/11/23 20:44',
  },
  {
    id: 3,
    author: 'John Doe',
    message: 'Almost two hours? Seriously?',
    emoji: 'angry.png',
    date: '2019/11/12 16:34',
  },
  {
    id: 4,
    author: 'Tim Macoveev',
    message: 'Very very old. Meh',
    emoji: 'puke.png',
    date: '2019/12/10 18:10',
  },
  {
    id: 5,
    author: 'John Doe',
    message: 'Cooooooool',
    emoji: 'smile.png',
    date: '2019/10/04 11:24',
  }
];

const generateFilmGenre = () => {
  const filmGenreArray = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
  ];

  return filmGenreArray[getRandomInteger(0, filmGenreArray.length - 1)];
};

const generateFilmTime = () => {
  const time = {
    hour: getRandomInteger(0, 2),
    minutes: getRandomInteger(0, 59),
  };

  if (time.hour === 0) {
    return `${time.minutes}m`;
  }

  return `${time.hour}h ${time.minutes}m`;
};

export const generateTask = () => ({
  filmName: generateFilmName(),
  filmPoster: generateFilmPoster(),
  description: generateFilmDescription(),
  comments: comments.slice(0, getRandomInteger(0, 4)).length,
  rate: getRandomFloat(0, 10, 1),
  dateOfRelease: getRandomInteger(1920, 1980),
  time: generateFilmTime(),
  genre: generateFilmGenre(),
});

