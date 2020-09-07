export const dateFormatting = (date) => {
  const MONTHS = [
    `JAN`,
    `FEB`,
    `MAR`,
    `APR`,
    `MAY`,
    `JUNE`,
    `JULY`,
    `AUG`,
    `SEPT`,
    `OCT`,
    `NOV`,
    `DEC`,
  ];
  const _day = date.getDate();
  const _month = MONTHS[date.getMonth()];
  return `${_month} ${_day}`;
};

export const createDateInAttributeFormat = (date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const shuffleArray = (array = []) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
