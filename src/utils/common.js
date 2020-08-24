export const dateFormatting = (date) => {
  const MONTHS = [
    `JAN`,
    `FEB`,
    `MAR`,
    `APR`,
    `MAY`,
    `JUNE`,
    `JULY`,
    `AUG`,
    `SEPT`,
    `OCT`,
    `NOV`,
    `DEC`,
  ];
  const _day = date.getDate();
  const _month = MONTHS[date.getMonth()];
  return `${_month} ${_day}`;
};

export const createDateInAttributeFormat = (date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

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
