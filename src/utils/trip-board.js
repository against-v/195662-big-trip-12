export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const sortByTime = (eventA, eventB) => {
  const eventADuration = eventA.dateTimeEnd - eventA.dateTimeStart;
  const eventBDuration = eventB.dateTimeEnd - eventB.dateTimeStart;
  return eventBDuration - eventADuration;
};

export const groupEventsByDay = (events) => {
  const eventsDates = events.map((event) => {
    return event.dateStart;
  });

  eventsDates.sort((a, b) => a - b);

  let days = new Set();

  eventsDates.forEach((date) => {
    days.add(date);
  });

  days = Array.from(days).map((day) => {
    const eventsInDay = events.filter((event) => {
      return event.dateStart === day;
    });
    eventsInDay.sort((eventA, eventB) => {
      return Date.parse(eventA.dateTimeStart) - Date.parse(eventB.dateTimeStart);
    });
    return {
      day,
      events: eventsInDay,
    };
  });
  return days;
};
