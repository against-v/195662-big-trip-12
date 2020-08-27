import AbstractView from "./abstract.js";
import {dateFormatting, createDateInAttributeFormat} from "../utils/common.js";

const createDayInfoTemplate = (index, dateAttribute, formattedDate) => {
  return (
    `<span class="day__counter">${index + 1}</span>
      <time class="day__date" datetime="${dateAttribute}">${formattedDate}</time>`
  );
};

const createDayTemplate = (day, i) => {
  let dayInfoTemplate = ``;
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
