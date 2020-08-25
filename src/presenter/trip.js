import TripView from "./view/trip.js";
import SortView from "../view/sort.js";
import DaysListView from "../view/days-list.js";
import DayView from "../view/day.js";
import EventsListView from "../view/events-list.js";
import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import NoEventView from "../view/no-event.js";
import {render, replace, RenderPosition} from "./utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._daysListComponent = new DaysListView();
    this._dayComponent = new DayView();
    this._eventsListComponent = new EventsListView();
    this._eventComponent = new EventView();
    this._eventEditComponent = new EventEditView();
    this._noEventComponent = new NoEventView();
  }

  init(tripDays) {
    this._tripDays = tripDays.slice();
  }

  _renderSort() {

  }

  _renderDay() {

  }

  _renderDays() {

  }

  _renderEvent() {

  }

  _renderEvents() {

  }

  _renderNoEvent() {

  }
}
