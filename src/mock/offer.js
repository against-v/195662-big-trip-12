import {getRandomInteger, capitalizeString} from "../utils/common";
import {FILLER_TEXT} from "../const";

const generateTitle = () => {
  let title = [];
  const words = FILLER_TEXT.split(` `);
  const count = getRandomInteger(1, 3);
  for (let i = 0; i < count; i++) {
    let word = words[getRandomInteger(0, words.length - 1)];
    const lastSymbol = word[word.length - 1];
    if (lastSymbol === `.` || lastSymbol === `,`) {
      word = word.slice(0, -1);
    }
    title.push(word);
  }
  title = capitalizeString(title.join(` `).toLowerCase());
  return title;
};

const generatePrice = () => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 99;
  const COEFFICIENT = 10;
  return getRandomInteger(MIN_VALUE, MAX_VALUE) * COEFFICIENT;
};

const generateOffers = () => {
  const offers = [];
  const count = getRandomInteger(1, 5);
  for (let i = 0; i < count; i++) {
    offers.push({
      title: generateTitle(),
      price: generatePrice()
    });
  }
  return offers;
};

export const generateOffer = (type) => {
  return {
    type,
    offers: generateOffers()
  };
};
