import AbstractView from "./abstract.js";
import {isEventStopping} from "../utils/event.js";
import {capitalizeString} from "../utils/common.js";

const createOffersTemplate = (items) => {
  const trimmedItems = items.slice(0, 3);
  return (
    `<ul class="event__selected-offers">
        ${trimmedItems.map((offer) => {
      return (
        `<li class="event__offer">
                <span class="event__offer-title">${offer.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
           </li>`
      );
    }).join(``)}
      </ul>`
  );
};
const createDateTimeAttribute = (dateTime) => {
  const year = dateTime.getFullYear();
  const month = `0${dateTime.getMonth() + 1}`;
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
const createTime = (dateTime) => {
  const hours = (`0${dateTime.getHours()}`).slice(-2);
  const minutes = (`0${dateTime.getMinutes()}`).slice(-2);
  return `${hours}:${minutes}`;
};
const calcTimeGap = (timeStart, timeEnd) => {
  const MS_IN_MINUTE = 60000;
  const MS_IN_HOUR = 3600000;
  const MS_IN_DAY = 86400000;
  const HOURS_IN_DAY = 24;
  const MINUTES_IN_HOUR = 60;
  const gap = timeEnd - timeStart;
  const gapInDay = Math.floor(gap / MS_IN_DAY);
  const gapInHours = Math.floor(gap / MS_IN_HOUR % HOURS_IN_DAY);
  const gapInMinutes = Math.floor(gap / MS_IN_MINUTE % MINUTES_IN_HOUR);
  const formatting = (day, hours, minutes) => {
    if (day > 0) {
      return `${day}D ${hours}H ${minutes}M`;
    }
    if (hours > 0) {
      return `${hours}H ${minutes}M`;
    }
    return `${minutes}M`;
  };
  return formatting(gapInDay, gapInHours, gapInMinutes);
};

const createEventTemplate = (event) => {
  const {
    type,
    city,
    offers,
    price,
    dateTimeStart,
    dateTimeEnd,
  } = event;

  const title = `${capitalizeString(type)} ${isEventStopping(type) ? `in` : `to`} ${city}`;
  const offersTemplate = createOffersTemplate(offers);
  const timeGap = calcTimeGap(dateTimeStart, dateTimeEnd);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${createDateTimeAttribute(dateTimeStart)}">${createTime(dateTimeStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${createDateTimeAttribute(dateTimeEnd)}">${createTime(dateTimeEnd)}</time>
          </p>
          <p class="event__duration">${timeGap}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${offersTemplate}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
