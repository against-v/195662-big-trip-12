import EventView from "../view/event";
import EventEditView from "../view/event-edit";
import {render, RenderPosition, replace, remove} from "../utils/render";

export default class Event {
  constructor(eventsListElement, changeData) {
    this._eventsListElement = eventsListElement;
    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseEditClick = this._handleCloseEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);

    // todo Здесь должна быть вторая структура данных - offers, пофиксить, когда подрубим данные с бэка
    this._eventEditComponent = new EventEditView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setCloseEditClickHandler(this._handleCloseEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListElement, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventsListElement.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventsListElement.getElement().contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    this._eventEditComponent.setCloseEditClickHandler(() => this._replaceFormToEvent());
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleCloseEditClick() {
    this._replaceFormToEvent();
  }

  _handleFormSubmit() {
    this._replaceFormToEvent();
  }
}
