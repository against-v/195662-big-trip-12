export const generateDays = (events) => {
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
    return {
      day,
      events: eventsInDay,
    };
  });
  return days;
};
