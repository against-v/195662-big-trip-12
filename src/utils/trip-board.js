import moment from "moment";
import {UnitOfTime} from "../const.js";

export const sortByPrice = (eventA, eventB) => {
  return eventB.basePrice - eventA.basePrice;
};

export const sortByTime = (eventA, eventB) => {
  const eventADuration = eventA.dateTo - eventA.dateFrom;
  const eventBDuration = eventB.dateTo - eventB.dateFrom;
  return eventBDuration - eventADuration;
};

export const groupEventsIntoOneList = (events) => {
  return [{events}];
};

export const groupEventsByDay = (events) => {
  const eventsDates = events.map((event) => {
    return moment(event.dateFrom).startOf(UnitOfTime.DAY).valueOf();
  });
  eventsDates.sort((a, b) => a - b);

  let days = new Set();

  eventsDates.forEach((date) => {
    days.add(date);
  });

  days = Array.from(days).map((day) => {
    const eventsInDay = events.filter((event) => {
      return moment(event.dateFrom).startOf(UnitOfTime.DAY).valueOf() === day;
    });
    eventsInDay.sort((eventA, eventB) => {
      return Date.parse(eventA.dateFrom) - Date.parse(eventB.dateFrom);
    });
    return {
      day,
      events: eventsInDay,
    };
  });
  return days;
};
