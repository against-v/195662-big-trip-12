import AbstractView from "./abstract.js";
import {isEventStopping} from "../utils/event.js";
import {capitalizeString, formatDate, getDuration, humanizeDuration} from "../utils/common.js";
import {DateFormat} from "../const.js";

const AMOUNT_OFFERS_IN_PREVIEW = 3;

const createOffersTemplate = (items) => {
  const trimmedItems = items.slice(0, AMOUNT_OFFERS_IN_PREVIEW);

  return (
    `<ul class="event__selected-offers">
        ${trimmedItems.map((offer) => {
      return (
        `<li class="event__offer">
                <span class="event__offer-title">${offer.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
           </li>`
      );
    }).join(``)}
      </ul>`
  );
};
const createEventTemplate = (event) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
  } = event;

  const title = `${capitalizeString(type)} ${isEventStopping(type) ? `in` : `to`} ${destination.name}`;
  const offersTemplate = createOffersTemplate(offers);
  const dateFromAttribute = formatDate(dateFrom, DateFormat.DATE_TIME);
  const dateToAttribute = formatDate(dateTo, DateFormat.DATE_TIME);
  const timeFrom = formatDate(dateFrom, DateFormat.HOURS_MINUTES);
  const timeTo = formatDate(dateTo, DateFormat.HOURS_MINUTES);
  const duration = humanizeDuration(getDuration(dateFrom, dateTo));

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFromAttribute}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateToAttribute}">${timeTo}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
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

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }
}
