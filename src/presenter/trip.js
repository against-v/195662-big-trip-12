import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import NoEventView from "../view/no-event.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {sortType} from "../const.js";
import {sortByPrice, sortByTime, groupEventsByDay} from "../utils/trip-board";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._daysListComponent = new DaysListView();
    this._noEventComponent = new NoEventView();
    this._currentSortType = sortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleSortTypeChange(newSortType) {
    this._currentSortType = newSortType;
    this._clearDaysList();
    this._renderDaysList();
  }

  _sortingEvents(events) {
    let groupedEvents = [];

    switch (this._currentSortType) {
      case sortType.TIME:
        events.sort(sortByTime);
        groupedEvents.push({events});
        break;
      case sortType.PRICE:
        events.sort(sortByPrice);
        groupedEvents.push({events});
        break;
      default:
        groupedEvents = groupEventsByDay(events);
    }
    return groupedEvents;
  }

  _clearDaysList() {
    this._daysListComponent.getElement().innerHTML = ``;
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderDaysList() {
    render(this._tripComponent, this._daysListComponent, RenderPosition.BEFOREEND);

    const groupedEvents = this._sortingEvents(this._tripEvents);

    for (let i = 0; i < groupedEvents.length; i++) {
      this._renderDay(groupedEvents[i], i);
    }
  }

  _renderDay(tripDay, index) {
    const dayComponent = new DayView(tripDay.day, index);
    render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    this._renderEventsList(dayComponent, tripDay.events);
  }

  _renderEventsList(dayElement, dayEvents) {
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
    if (this._tripEvents.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }
}
