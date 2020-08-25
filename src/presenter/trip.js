import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import NoEventView from "../view/no-event.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._daysListComponent = new DaysListView();
    this._noEventComponent = new NoEventView();

    // todo разобраться с конструктором
    // вопрос: какие компоненты мы определяем в конструкторе?
    // сейчас я здесь написал только статичные компоненты
    // но я не уверен, что это правильный критерий
  }

  init(tripDays) {
    this._tripDays = tripDays.slice();
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    render(this._tripComponent, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderDay(tripDay, index) {
    const dayComponent = new DayView(tripDay.day, index); // нормально же, что я внутри метода создаю нвоый экземпляр?
    render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    this._renderEventsList(dayComponent, tripDay.events);
  }

  _renderEventsList(dayElement, dayEvents) {
    // нормально, что в названии первого параметра есть слово Element?
    const eventsListComponent = new EventsListView();
    render(dayElement, eventsListComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < dayEvents.length; i++) {
      this._renderEvent(eventsListComponent, dayEvents[i]);
    }
  }

  _renderEvent(eventsListElement, event) {
    const eventComponent = new EventView(event);

    // todo Здесь должна быть вторая структура данных - offers, пофиксить, когда подрубим данные с бэка
    const eventEditComponent = new EventEditView(event);

    const replaceEventToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      eventEditComponent.setFormCloseHandler(() => replaceFormToEvent());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventsListElement, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvent() {
    render(this._tripComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripDays.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();
    this._renderDaysList();

    for (let i = 0; i < this._tripDays.length; i++) {
      this._renderDay(this._tripDays[i], i);
    }
  }
}

// todo разобрать вопросы
// нэйминг this._tripComponent = new TripView(); - возможно стоило вместо trip использовать board?
//
