export const createDayTemplate = (day, i) => {
  const _date = new Date(day);
  const createDateAttribute = (date) => {
    const _year = date.getFullYear();
    const _month = `0${date.getMonth() + 1}`;
    const _day = date.getDate();
    return `${_year}-${_month}-${_day}`;
  };
  const dateAttribute = createDateAttribute(_date);
  const dateFormatting = (date) => {
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
  const formattedDate = dateFormatting(_date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${i + 1}</span>
        <time class="day__date" datetime="${dateAttribute}">${formattedDate}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
