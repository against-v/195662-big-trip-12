import EventEditView from "../view/event-edit.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, EditingModes} from "../const.js";
import {nanoid} from 'nanoid';

const ID_LENGTH = 3;

export default class EventNew {
  constructor(daysListContainer, destinations, offers, changeData) {
    this._daysListContainer = daysListContainer;
    this._destinations = destinations;
    this._offers = offers;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(EditingModes.CREATE, this._destinations, this._offers);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._daysListContainer, this._eventEditComponent, RenderPosition.BEFOREBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign({id: nanoid(ID_LENGTH)}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}