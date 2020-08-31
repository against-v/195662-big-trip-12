import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import NoEventView from "../view/no-event.js";

import EventPresenter from "./event.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortType} from "../const.js";
import {sortByPrice, sortByTime, groupEventsByDay} from "../utils/trip-board";
import {updateItem} from "../utils/common.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._daysListComponent = new DaysListView();
    this._noEventComponent = new NoEventView();

    this._eventPresenter = {};

    this._currentSortType = sortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
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
    // todo переделать
    // для этого надо сделать презентер day, с методом destroy,
    // и как-то отрисовывать в нем список событий через метод _renderDay
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
    const eventPresenter = new EventPresenter(eventsListElement);
    eventPresenter.init(event);
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
