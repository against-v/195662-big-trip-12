import AbstractView from "./abstract.js";
import {dateFormatting, createDateInAttributeFormat} from "../utils/common.js";

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
    </li>`
  );
};

export default class Day extends AbstractView {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
  }
}
