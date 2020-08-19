import {dateFormatting, createDateInAttributeFormat, createElement} from "../utils.js";

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

export default class Day {
  constructor(day, index) {
    this._element = null;
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
