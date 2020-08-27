export const sortByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
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
    eventsInDay.sort((a, b) => {
      return Date.parse(a.dateTimeStart) - Date.parse(b.dateTimeStart);
    });
    return {
      day,
      events: eventsInDay,
    };
  });
  return days;
};
