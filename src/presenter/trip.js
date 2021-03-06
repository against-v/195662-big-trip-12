import TripView from "../view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import LoadingView from "../view/loading.js";
import NoEventView from "../view/no-event.js";
import EventNewPresenter from "./event-new.js";
import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {sortByPrice, sortByTime, groupEventsByDay, groupEventsIntoOneList} from "../utils/trip-board";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";

export default class Trip {
  constructor(params) {
    const {
      siteMainElement,
      eventsModel,
      destinationsModel,
      offersModel,
      filterModel,
      api
    } = params;

    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._filterModel = filterModel;
    this._isLoading = true;
    this._api = api;
    this._tripContainer = siteMainElement;
    this._tripComponent = new TripView();
    this._daysListComponent = new DaysListView();
    this._noEventComponent = new NoEventView();
    this._loadingComponent = new LoadingView();
    this._sortComponent = null;
    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvt = this._handleModelEvt.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._daysListComponent, this._handleViewAction);
  }

  init(isCreateFirstEvent) {
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._isCreateFirstEvent = isCreateFirstEvent;
    this._eventsModel.addObserver(this._handleModelEvt);
    this._filterModel.addObserver(this._handleModelEvt);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._daysListComponent);
    remove(this._tripComponent);

    this._eventsModel.removeObserver(this._handleModelEvt);
    this._filterModel.removeObserver(this._handleModelEvt);
  }

  createEvent(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback, this._getDestinations(), this._getOffers());
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);
    switch (this._currentSortType) {
      case SortType.TIME:
        return groupEventsIntoOneList(filteredEvents.sort(sortByTime));
      case SortType.PRICE:
        return groupEventsIntoOneList(filteredEvents.sort(sortByPrice));
      default:
        return groupEventsByDay(filteredEvents);
    }
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case (UserAction.CHANGE_FAVORITE):
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
            this._eventPresenter[update.id].resetIsFavorite();
          });
        break;
      case (UserAction.UPDATE_EVENT):
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case (UserAction.ADD_EVENT):
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._isCreateFirstEvent = false;
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case (UserAction.DELETE_EVENT):
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvt(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data, updateType);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    const events = this._getEvents();
    events.forEach((event, index) => {
      this._renderDay(event, index);
    });
  }

  _renderDay(tripDay, index) {
    const dayComponent = new DayView(tripDay.day, index);
    render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    this._renderEventsList(dayComponent, tripDay.events);
  }

  _renderEventsList(dayElement, dayEvents) {
    const eventsListComponent = new EventsListView();
    render(dayElement, eventsListComponent, RenderPosition.BEFOREEND);
    dayEvents.forEach((dayEvent) => {
      this._renderEvent(eventsListComponent, dayEvent);
    });
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

  _renderLoading() {
    render(this._tripComponent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvent() {
    render(this._tripComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    if (this._sortComponent) {
      remove(this._sortComponent);
    }
    remove(this._loadingComponent);
    remove(this._noEventComponent);
    remove(this._daysListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    if (this._getEvents().length === 0 && !this._isCreateFirstEvent) {
      this._renderNoEvent();
      return;
    }
    if (!this._isCreateFirstEvent) {
      this._renderSort();
    }
    this._renderDaysList();
  }
}
