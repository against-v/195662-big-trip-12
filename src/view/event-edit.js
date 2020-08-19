import {EVENT_TYPES, CITIES, EVENT_OFFERS} from "../const.js";
import {createElement} from "../utils";

const dateTimeFormatting = (dateTime) => {
  const day = (`0${dateTime.getDate()}`).slice(-2);
  const month = (`0${dateTime.getMonth() + 1}`).slice(-2);
  const year = dateTime.getFullYear();
  const date = `${day}/${month}/${year}`;
  return `${date}`;
};
const generateEventOffersTemplate = (offers, type) => {
  const setChecked = (offer) => {
    const isChecked = offers.some((currentEventOffer) => {
      return currentEventOffer.name === offer.name;
    });
    return isChecked ? `checked` : ``;
  };
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${EVENT_OFFERS[type.id].map((offer, index) => {
      return (
        `<div class="event__offer-selector">
          <input
          class="event__offer-checkbox
          visually-hidden"
          id="event-offer-luggage-${index + 1}"
          type="checkbox"
          name="event-offer-luggage"
          ${setChecked(offer)}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`
      );
    }).join(``)}
      </div>
    </section>`
  );
};
const generateEventTypeListTemplate = (type) => {
  const tripsTypes = EVENT_TYPES.filter((eventType) => {
    return eventType.type === `trip`;
  });
  const stopsTypes = EVENT_TYPES.filter((eventType) => {
    return eventType.type === `stop`;
  });
  const setChecked = (currentType) => {
    return currentType.id === type.id ? `checked` : ``;
  };
  return (
    `<div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
        ${tripsTypes.map((currentType) => {
      return (
        `<div class="event__type-item">
                  <input
                  id="event-type-${currentType.icon}-1"
                  class="event__type-input  visually-hidden"
                  type="radio" name="event-type"
                  value="${currentType.id}"
                  ${setChecked(currentType)}>
                  <label
                  class="event__type-label  event__type-label--${currentType.icon}"
                  for="event-type-${currentType.icon}-1">${currentType.name}
                  </label>
                </div>`
      );
    }).join(``)}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${stopsTypes.map((currentType) => {
      return (
        `<div class="event__type-item">
                  <input
                  id="event-type-${currentType.icon}-1"
                  class="event__type-input  visually-hidden"
                  type="radio" name="event-type"
                  value="${currentType.id}"
                  ${setChecked(currentType)}>
                  <label
                  class="event__type-label  event__type-label--${currentType.icon}"
                  for="event-type-${currentType.icon}-1">${currentType.name}
                  </label>
                </div>`
      );
    }).join(``)}
        </fieldset>
      </div>`
  );
};

const createEventEditTemplate = (event = {}) => {
  const {
    type = {},
    city = ``,
    dateTimeStart = new Date(),
    dateTimeEnd = new Date(),
    offers = [],
    price = ``,
    destinationDescription = ``,
    photos = [],
  } = event;

  const dateTimeStartValue = dateTimeFormatting(dateTimeStart);
  const dateTimeEndValue = dateTimeFormatting(dateTimeEnd);
  const eventDestinationTemplate = (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationDescription}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``)}
        </div>
      </div>
    </section>`
  );
  const eventOffersTemplate = generateEventOffersTemplate(offers, type);
  const eventDestinationListTemplate = (
    `<datalist id="destination-list-1">
      ${CITIES.map((_city) => `<option value="${_city}"></option>`)}
    </datalist>`
  );
  const typeTitle = `${type.name} ${type.type === `trip` ? `to` : `in`}`;
  const eventTypeListTemplate = generateEventTypeListTemplate(type);

  return (
    `<form class="event  event--edit trip-events__item" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.icon}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${eventTypeListTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeTitle}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            ${eventDestinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateTimeStartValue}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTimeEndValue}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </header>

      <section class="event__details">
        ${eventOffersTemplate}
        ${eventDestinationTemplate}
      </section>
    </form>`
  );
};

export default class EventEdit {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
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
