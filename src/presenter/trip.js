import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import NoEventView from "../view/no-event.js";

import EventPresenter from "./event.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByPrice, sortByTime, groupEventsByDay, groupEventsIntoOneList} from "../utils/trip-board";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel, destinationsModel, offersModel, filterModel) {
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._tripComponent = new TripView();
    this._daysListComponent = new DaysListView();
    this._noEventComponent = new NoEventView();

    this._sortComponent = null;

    this._eventPresenter = {};

    this._currentSortType = SortType.DEFAULT;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvt = this._handleModelEvt.bind(this);

    this._eventsModel.addObserver(this._handleModelEvt);
    this._filterModel.addObserver(this._handleModelEvt);
  }

  init() {
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);
    switch (this._currentSortType) {
      case SortType.TIME:
        return groupEventsIntoOneList(filtredEvents.sort(sortByTime));
      case SortType.PRICE:
        return groupEventsIntoOneList(filtredEvents.sort(sortByPrice));
      default:
        return groupEventsByDay(filtredEvents);
    }
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case (UserAction.UPDATE_EVENT):
        this._eventsModel.updateEvent(updateType, update);
        break;
      case (UserAction.ADD_EVENT):
        this._eventsModel.addEvent(updateType, update);
        break;
      case (UserAction.DELETE_EVENT):
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvt(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;

    }
  }

  _handleSortTypeChange(newSortType) {
    this._currentSortType = newSortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    render(this._tripComponent, this._daysListComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < this._getEvents().length; i++) {
      this._renderDay(this._getEvents()[i], i);
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
    const eventPresenterParams = [
      eventsListElement,
      this._getDestinations(),
      this._getOffers(),
      this._handleViewAction,
      this._handleModeChange,
    ];
    const eventPresenter = new EventPresenter(...eventPresenterParams);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvent() {
    render(this._tripComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._daysListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }
}
