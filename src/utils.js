export const getRandomInteger = (num1, num2) => {
  const lower = Math.ceil(Math.min(num1, num2));
  const upper = Math.floor(Math.max(num1, num2));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getRandomFloat = (num1, num2, amountSymbolsAfterComma) => {
  const lower = Math.ceil(Math.min(num1, num2));
  const upper = Math.floor(Math.max(num1, num2));

  return ((Math.random() * (upper - lower)) + lower).toFixed(amountSymbolsAfterComma);
};

export const shuffleArray = (array) => {
  const result = [];

  while (array.length > 0) {
    const random = getRandomInteger(0, array.length - 1);
    const element = array.splice(random, 1)[0];
    result.push(element);
  }

  return result;
};

export const sliceArray = (array, length) => array.slice(0, length);

export const addZeroIfNeeds = (str) => str.length < 2 ? `0${str}` : str;

