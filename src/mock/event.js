import {nanoid} from 'nanoid';
import {shuffleArray, getRandomInteger} from "../utils/common";
import {CITIES, EVENT_OFFERS, EVENT_TYPES} from "../const.js";

const ID_LENGTH = 3;


const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};
const generateDate = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.setHours(0, 0, 0, 0);
};
const generateDestinationDescription = () => {
  const fillerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const shuffledFillerText = shuffleArray(fillerText.substring(0, fillerText.length - 1).split(`. `));
  const count = getRandomInteger(1, 5);
  const destinationDescription = [];
  for (let i = 0; i < count; i++) {
    destinationDescription.push(shuffledFillerText[i]);
  }
  return `${destinationDescription.join(`. `)}.`;
};
const generateDestinationPhotos = () => {
  const destinationPhotos = [];
  const count = getRandomInteger(0, 5);
  for (let i = 0; i < count; i++) {
    destinationPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return destinationPhotos;
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

    //todo убрать после подключения данных с сервера
    dateStart: generateDate(dateTimeStart),
  };
};
