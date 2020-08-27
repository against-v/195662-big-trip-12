import AbstractView from "./abstract.js";
import {dateFormatting, createDateInAttributeFormat} from "../utils/common.js";

export const createDayTemplate = (day, i) => {
  let dayInfoTemplate = ``;
  const createDayInfoTemplate = (index, dateAttribute, formattedDate) => {
    return (
      `<span class="day__counter">${i + 1}</span>
      <time class="day__date" datetime="${dateAttribute}">${formattedDate}</time>`
    );
  };

  if (day) {
    const date = new Date(day);
    const dateAttribute = createDateInAttributeFormat(date);
    const formattedDate = dateFormatting(date);
    dayInfoTemplate = createDayInfoTemplate(i, dateAttribute, formattedDate);
  }

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfoTemplate}
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
