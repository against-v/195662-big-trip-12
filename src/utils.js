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
