import {getDuration} from "./common.js";
import {ChartSettings} from "../const";

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

export const getUniqTypes = (events) => {
  const eventsTypes = events.map((event) => event.type);
  return [...new Set(eventsTypes)];
};
export const setCtxHeight = (ctx, barsCount) => {
  ctx.height = ChartSettings.BAR_HEIGHT * barsCount;
};
export const getChartData = (items, propName) => {
  items.sort((itemA, itemB) => itemB[propName] - itemA[propName]);
  return {
    labels: items.map((item) => item.type.toUpperCase()),
    data: items.map((item) => item[propName]),
  };
};
