import AbstractView from "./abstract.js";
import {sortType} from "../const";

const createSortTemplate = (currentSortType) => {
  // todo разобраться с dayTitle
  // Надо выводить dayTitle только в случае сортировки по умолчанию
  // И я не придумал как сделать это поприличнее
  // Возможно в следующих лекциях про связывание данных об этом расскажут
  const dayTitle = currentSortType === sortType.DEFAULT ? `Day` : ``;
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">${dayTitle}</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
          <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
          <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
            Time
          </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
          <label class="trip-sort__btn" for="sort-price">
            Price
          </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._currentSortType = sortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.value);
    this._currentSortType = evt.target.value;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`change`, this._sortTypeChangeHandler);
  }
}
