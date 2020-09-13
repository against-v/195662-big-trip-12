import {getDuration} from "./common.js";

export const makeItemsUniq = (items) => [...new Set(items)];

export const countEventsPriceByEventType = (events, type) => {
  let price = 0;
  const eventsByType = events.filter((event) => event.type === type);
  eventsByType.forEach((event) => {
    price += Number(event.basePrice);
  });
  return {
    price,
    type,
  };
};
export const countTripsTypesByType = (tripTypes, type) => {
  return {
    count: tripTypes.filter((tripType) => tripType === type).length,
    type
  };
};
export const countEventsDurationByEventType = (events, type) => {
  let duration = 0;
  const eventsByType = events.filter((event) => event.type === type);
  eventsByType.forEach((event) => {
    duration += getDuration(event.dateFrom, event.dateTo);
  });
  return {
    duration,
    type,
  };

};
