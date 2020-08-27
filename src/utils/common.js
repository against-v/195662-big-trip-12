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
