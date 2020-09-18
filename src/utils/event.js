import {nanoid} from 'nanoid';

const ID_LENGTH = 3;

export const isEventStopping = (eventType) => {
  const STOP_TYPES = [
    `check-in`,
    `sightseeing`,
    `restaurant`,
  ];
  const index = STOP_TYPES.findIndex((stopType) => {
    return stopType === eventType;
  });
  return index > -1;
};
export const validateDestination = (currentDestination, destinationsList) => {
  return destinationsList.findIndex((destination) => destination.name === currentDestination) > -1;
};

export const generateId = (idLength = ID_LENGTH) => nanoid(idLength);
