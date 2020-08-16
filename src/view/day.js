import {dateFormatting, createDateInAttributeFormat} from "../utils.js";

export const createDayTemplate = (day, i) => {
  const date = new Date(day);
  const dateAttribute = createDateInAttributeFormat(date);
  const formattedDate = dateFormatting(date);

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
