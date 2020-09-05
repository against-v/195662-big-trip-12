import {nanoid} from 'nanoid';
import {shuffleArray, getRandomInteger} from "../utils/common";
import {EVENT_TYPES} from "../const.js";

const ID_LENGTH = 3;


const generateDate = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.setHours(0, 0, 0, 0);
};

const generatePrice = () => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 99;
  const COEFFICIENT = 10;
  return getRandomInteger(MIN_VALUE, MAX_VALUE) * COEFFICIENT;
};
const generateDateTime = (date = new Date(), nearestDayIndex = 1, latterDayIndex = 7) => {
  const dayGap = getRandomInteger(nearestDayIndex, latterDayIndex);
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + dayGap);
  if (!dayGap) {
    const hours = getRandomInteger(date.getHours(), 23);
    const minMinutesValue = hours === date.getHours() ? date.getMinutes() : 0;
    const minutes = getRandomInteger(minMinutesValue, 59);
    newDate.setHours(hours, minutes);
  } else {
    newDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  }
  return newDate;
};
const generateDestination = (destinationsList) => {
  const randomIndex = getRandomInteger(0, destinationsList.length - 1);
  return destinationsList[randomIndex];
};
const generateOffers = (eventType, offersList) => {
  const filteredOffers = offersList.find((offer) => {
    return offer.type === eventType;
  });
  const shuffledOffers = shuffleArray(filteredOffers.offers);
  const count = getRandomInteger(0, shuffledOffers.length - 1);
  if (count === 0) {
    return [];
  }
  const checkedOffers = [];
  for (let i = 0; i < count; i++) {
    checkedOffers.push(shuffledOffers[i]);
  }
  return checkedOffers;

};
const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);
  return EVENT_TYPES[randomIndex];
};


export const generateEvent = (destinationsList, offersList) => {
  const type = generateType();
  const dateTimeStart = generateDateTime();
  return {
    basePrice: generatePrice(),
    dateFrom: dateTimeStart,
    dateTo: generateDateTime(dateTimeStart, 0, 1),
    destination: generateDestination(destinationsList),
    id: nanoid(ID_LENGTH),
    isFavorite: Boolean(getRandomInteger()),
    offers: generateOffers(type, offersList),
    type,

    // todo убрать после подключения данных с сервера
    dateStart: generateDate(dateTimeStart),
  };
};
