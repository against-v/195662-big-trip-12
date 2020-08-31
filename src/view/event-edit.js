import AbstractView from "./abstract.js";
import {isEventStopping, capitalizeString} from "../utils/event";
import {EVENT_TYPES, CITIES, EVENT_OFFERS} from "../const.js";

const dateTimeFormatting = (dateTime) => {
  const day = (`0${dateTime.getDate()}`).slice(-2);
  const month = (`0${dateTime.getMonth() + 1}`).slice(-2);
  const year = dateTime.getFullYear();
  const date = `${day}/${month}/${year}`;
  return `${date}`;
};

const BLANK_EVENT = {
  type: EVENT_TYPES[0],
  city: ``,
  dateTimeStart: new Date(),
  dateTimeEnd: new Date(),
  offers: [],
  price: ``,
  destinationDescription: ``,
  photos: [],
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
      ${EVENT_OFFERS[type].map((offer, index) => {
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
    return !isEventStopping(eventType);
  });
  const stopsTypes = EVENT_TYPES.filter((eventType) => {
    return isEventStopping(eventType);
  });
  const setChecked = (currentType) => {
    return currentType === type ? `checked` : ``;
  };
  return (
    `<div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
        ${tripsTypes.map((currentType) => {
      return (
        `<div class="event__type-item">
                  <input
                  id="event-type-${currentType}-1"
                  class="event__type-input  visually-hidden"
                  type="radio" name="event-type"
                  value="${currentType}"
                  ${setChecked(currentType)}>
                  <label
                  class="event__type-label  event__type-label--${currentType}"
                  for="event-type-${currentType}-1">${currentType}
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
                  id="event-type-${currentType}-1"
                  class="event__type-input  visually-hidden"
                  type="radio" name="event-type"
                  value="${currentType}"
                  ${setChecked(currentType)}>
                  <label
                  class="event__type-label  event__type-label--${currentType}"
                  for="event-type-${currentType}-1">${currentType}
                  </label>
                </div>`
      );
    }).join(``)}
        </fieldset>
      </div>`
  );
};
const createEventEditTemplate = (data) => {

  const {
    id,
    type,
    typeCapitalized,
    isStopping,
    city,
    dateTimeStart,
    dateTimeEnd,
    offers,
    price,
    isFavorite,
    destinationDescription,
    photos,
  } = data;

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
  const typeTitle = `${typeCapitalized} ${isStopping ? `in` : `to`}`;
  const eventTypeListTemplate = generateEventTypeListTemplate(type);
  const favoriteCheckboxIsChecked = isFavorite ? `checked` : ``;
  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteCheckboxIsChecked}>
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
      </form>
    </li>`
  );
};

export default class EventEdit extends AbstractView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EventEdit.parseEventToData(event);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);

  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _closeEditClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeEditClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    // this.getElement().querySelector(`form`).addEventListener(`submit`, this._formEventHandler.bind(null, `formSubmit`));
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseEditClickHandler(callback) {
    this._callback.closeEditClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeEditClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          typeCapitalized: capitalizeString(event.type),
          isStopping: isEventStopping(event.type)
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.typeCapitalized;
    delete data.isStopping;

    return data;
  }
}
