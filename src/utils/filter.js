import {FilterType} from "../const";

const now = new Date();

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.dateFrom > now),
  [FilterType.PAST]: (events) => events.filter((event) => event.dateFrom <= now),
};
