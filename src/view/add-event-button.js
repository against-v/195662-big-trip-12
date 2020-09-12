import AbstractView from "./abstract.js";

const createAddEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class AddEventButton extends AbstractView {
  constructor() {
    super();
    this._addEventButtonClickHandler = this._addEventButtonClickHandler.bind(this);
  }
  getTemplate() {
    return createAddEventButtonTemplate();
  }

  _addEventButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.addEventButtonClick(evt.target.value);
  }

  setAddEventButtonClickHandler(callback) {
    this._callback.addEventButtonClick = callback;
    this.getElement().addEventListener(`click`, this._addEventButtonClickHandler);
  }
}
