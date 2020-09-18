import SmartView from "./smart.js";
import {isEventStopping, validateDestination} from "../utils/event.js";
import {capitalizeString, formatDate} from "../utils/common.js";
import {EVENT_TYPES, DateFormat, EditingModes, RegEx} from "../const.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  basePrice: ``,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    name: ``,
  },
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
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
          data-title="${offer.title}"
          data-price="${offer.price}"
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
const generateEventRollupButtonTemplate = (mode) => {
  if (mode === EditingModes.UPDATE) {
    return (
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    );
  }
  return ``;
};
const generateEventHeaderTemplate = (data) => {
  const {
    type,
    eventTypeListTemplate,
    typeTitle,
    destination,
    eventDestinationListTemplate,
    dateTimeStartValue,
    dateTimeEndValue,
    basePrice,
    isSubmitDisabled,
    favoriteCheckboxIsChecked,
    resetButtonLabel,
    eventRollupButtonTemplate
  } = data;
  return (
    `<header class="event__header">
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
          <button class="event__reset-btn" type="reset">${resetButtonLabel}</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteCheckboxIsChecked}>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>
            ${eventRollupButtonTemplate}
        </header>`
  );
};
const generateEventDetailsTemplate = (data) => {
  const {
    eventOffersTemplate,
    eventDestinationTemplate,
  } = data;
  return (
    `<section class="event__details">
      ${eventOffersTemplate}
      ${eventDestinationTemplate}
    </section>`
  );
};
const createEventEditTemplate = (data, destinationsList, offersList, mode) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    // id,
    isFavorite,
    offers,
    type,
    typeCapitalized,
    isStopping,
  } = data;

  const dateTimeStartValue = formatDate(dateFrom, DateFormat.DATEPICKER);
  const dateTimeEndValue = formatDate(dateTo, DateFormat.DATEPICKER);
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
  const isSubmitDisabled = false;
  const resetButtonLabel = mode === EditingModes.CREATE ? `Cancel` : `Delete`;
  const eventRollupButtonTemplate = generateEventRollupButtonTemplate(mode);

  const eventHeaderTemplate = generateEventHeaderTemplate({
    type,
    eventTypeListTemplate,
    typeTitle,
    destination,
    eventDestinationListTemplate,
    dateTimeStartValue,
    dateTimeEndValue,
    basePrice,
    isSubmitDisabled,
    favoriteCheckboxIsChecked,
    resetButtonLabel,
    eventRollupButtonTemplate,
  });
  const eventDetailsTemplate = generateEventDetailsTemplate({
    eventOffersTemplate,
    eventDestinationTemplate,
  });
  switch (mode) {
    case EditingModes.CREATE:
      return (
        `<div><form class="trip-events__item event  event--edit" action="#" method="post">
            ${eventHeaderTemplate}
            ${eventDetailsTemplate}
        </form></div>`
      );
    default:
      return (
        `<li class="trip-events__item">
          <form class="event event--edit" action="#" method="post">
            ${eventHeaderTemplate}
            ${eventDetailsTemplate}
          </form>
        </li>`
      );
  }
};

export default class EventEdit extends SmartView {

  // todo ТУТ НУЖНА ПОМОЩЬ: если изменить данные в редактировании события, а потом изменить isFavorite, то данные сбросятся к последним сохраненным

  constructor(mode, destinations, offers, event = BLANK_EVENT) {
    super();
    this._mode = mode;
    this._data = EventEdit.parseEventToData(event);
    this._destinationsList = destinations;
    this._offersList = offers;
    this._dateFromPicker = null;
    this._dateToPicker = null;


    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._closeEditClickHandler = this._closeEditClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._eventDateFromChangeHandler = this._eventDateFromChangeHandler.bind(this);
    this._eventDateToChangeHandler = this._eventDateToChangeHandler.bind(this);
    this._eventOffersChangeHandler = this._eventOffersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();
    this._removeDatepicker(this._dateFromPicker);
    this._removeDatepicker(this._dateToPicker);
  }

  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._destinationsList, this._offersList, this._mode);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__section--offers`).addEventListener(`change`, this._eventOffersChangeHandler);
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._eventDestinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._eventPriceChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCloseEditClickHandler(this._callback.closeEditClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setDateFromPicker() {
    this._dateFromPicker = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-start-time"]`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateFrom,
          maxDate: this._data.dateTo,
          onChange: this._eventDateFromChangeHandler,
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true
        }
    );
  }

  _setDateToPicker() {
    this._dateToPicker = flatpickr(
        this.getElement().querySelector(`.event__input--time[name="event-end-time"]`),
        {
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateTo,
          minDate: this._data.dateFrom,
          onChange: this._eventDateToChangeHandler,
          enableTime: true,
          // eslint-disable-next-line camelcase
          time_24hr: true
        }
    );
  }

  _removeDatepicker(datepicker) {
    if (datepicker) {
      datepicker.destroy();
      datepicker = null;
    }
  }

  _setDatepicker() {
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  _eventOffersChangeHandler(evt) {
    const changedOffer = {
      title: evt.target.dataset.title,
      price: Number(evt.target.dataset.price),
    };
    const offers = this._data.offers.slice();
    if (evt.target.checked) {
      offers.push(changedOffer);
    } else {
      const offerIndex = offers.findIndex((offer) => offer.title === changedOffer.title);
      offers.splice(offerIndex, 1);
    }
    this.updateData({
      offers,
    }, true);
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

  _eventDestinationChangeHandler(evt) {
    if (!validateDestination(evt.target.value, this._destinationsList)) {
      evt.target.value = this._data.destination.name;
      return;
    }
    this.updateData({
      destination: {
        name: evt.target.value,
      }
    }, true);
  }

  _eventPriceChangeHandler(evt) {
    evt.target.value = evt.target.value.replace(RegEx.PRICE, ``);
    this.updateData({
      basePrice: evt.target.value
    }, true);
  }

  _eventDateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate
    }, true);
    this._removeDatepicker(this._dateToPicker);
    this._setDateToPicker();
  }

  _eventDateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate
    }, true);
    this._removeDatepicker(this._dateFromPicker);
    this._setDateFromPicker();
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

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setCloseEditClickHandler(callback) {
    this._callback.closeEditClick = callback;
    if (this._mode === EditingModes.UPDATE) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeEditClickHandler);
    }
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
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
