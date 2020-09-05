import AbstractView from "./abstract.js";
import {isEventStopping} from "../utils/event.js";
import {capitalizeString} from "../utils/common.js";
import {EVENT_TYPES} from "../const.js";

const dateTimeFormatting = (dateTime) => {
  const day = (`0${dateTime.getDate()}`).slice(-2);
  const month = (`0${dateTime.getMonth() + 1}`).slice(-2);
  const year = String(dateTime.getFullYear()).slice(-2);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const date = `${day}/${month}/${year} ${hours}:${minutes}`;
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

const generateEventOffersTemplate = (eventType, eventOffers, offersList) => {
  const offersByType = offersList.find((offer) => offer.type === eventType);
  const setChecked = (offer) => {
    const isChecked = eventOffers.some((currentEventOffer) => {
      return currentEventOffer.title === offer.title;
    });
    return isChecked ? `checked` : ``;
  };
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${offersByType.offers.map((offer, index) => {
      return (
        `<div class="event__offer-selector">
          <input
          class="event__offer-checkbox
          visually-hidden"
          id="event-offer-luggage-${index + 1}"
          type="checkbox"
          name="event-offer-luggage"
          ${setChecked(offer)}>
          <label class="event__offer-label" for="event-offer-luggage-${index + 1}">
            <span class="event__offer-title">${offer.title}</span>
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
const generateDestinationTemplate = (eventDestination, destinationsList) => {
  const currentDestination = destinationsList.find((destination) => eventDestination.name === destination.name);
  if (currentDestination) {
    return (
      `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${currentDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(``)}
        </div>
      </div>
    </section>`
    );
  }
  return ``;

};
const createEventEditTemplate = (data, destinationsList, offersList) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    offers,
    type,
    typeCapitalized,
    isStopping,
  } = data;

  const dateTimeStartValue = dateTimeFormatting(dateFrom);
  const dateTimeEndValue = dateTimeFormatting(dateTo);
  const eventDestinationTemplate = generateDestinationTemplate(destination, destinationsList);
  const eventOffersTemplate = generateEventOffersTemplate(type, offers, offersList);
  const eventDestinationListTemplate = (
    `<datalist id="destination-list-1">
      ${destinationsList.map((currentDestination) => `<option value="${currentDestination.name}"></option>`)}
    </datalist>`
  );
  const typeTitle = `${typeCapitalized} ${isStopping ? `in` : `to`}`;
  const eventTypeListTemplate = generateEventTypeListTemplate(type);
  const favoriteCheckboxIsChecked = isFavorite ? `checked` : ``;
  const isSubmitDisabled = !(destination.name.length > 0 && String(basePrice).length > 0 && Number.isInteger(Number(basePrice)));
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
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
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
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
  // todo изменение даты будет во втором задании (6.2)

  // todo поправить баг: если изменить данные, а потом изменить isFavorite, то данные сбросятся к последним сохраненным

  // todo поправить баг: при активном инпуте destination с введенным значением нажатие esc бросает ошибку в консоль

  constructor(event = BLANK_EVENT, destinations, offers) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._destinationsList = destinations;
    this._offersList = offers;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    // this._eventDateFromChangeHandler = this._eventDateFromChangeHandler.bind(this);
    // this._eventDateToChangeHandler = this._eventDateToChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._destinationsList, this._offersList);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._eventDestinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._eventPriceChangeHandler);
    // this.getElement().querySelector(`.event__input--time[name="event-end-time"]`).addEventListener(`change`, this._eventDateFromChangeHandler);
    // this.getElement().querySelector(`.event__input--time[name="event-start-time"]`).addEventListener(`change`, this._eventDateToChangeHandler);
  }

  _eventTypeChangeHandler(evt) {
    const type = evt.target.value;
    this.updateData({
      type,
      offers: [],
      typeCapitalized: capitalizeString(type),
      isStopping: isEventStopping(type),
    });
  }

  // _eventDateFromChangeHandler(evt) {
  //
  // }

  // _eventDateToChangeHandler(evt) {
  //
  // }

  _eventDestinationChangeHandler(evt) {
    this.updateData({
      destination: {
        name: evt.target.value,
      }
    });
  }

  _eventPriceChangeHandler(evt) {
    this.updateData({
      basePrice: evt.target.value
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseEditClickHandler(this._callback.closeEditClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
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
