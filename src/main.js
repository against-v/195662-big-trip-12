import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripView from "./view/trip.js";
import SortView from "./view/sort.js";
import DaysListView from "./view/days-list.js";
import DayView from "./view/day.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import NoEventView from "./view/no-event.js";


import {generateEvent} from "./mock/event.js";

import {generateDays} from "./utils/common.js";
import {render, replace, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const days = generateDays(events);

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);

const renderEvent = (eventsListElement, event) => {
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
};

const renderBoard = (boardDays) => {
  const tripComponent = new TripView();
  render(siteMainElement, tripComponent, RenderPosition.BEFOREEND);

  if (boardDays.length === 0) {
    render(tripComponent, new NoEventView(), RenderPosition.BEFOREEND);
    return;
  }
  render(tripComponent, new SortView(), RenderPosition.BEFOREEND);
  const daysListComponent = new DaysListView();
  render(tripComponent, daysListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < boardDays.length; i++) {
    const dayComponent = new DayView(boardDays[i].day, i);
    const eventsListComponent = new EventsListView();
    render(daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    render(dayComponent, eventsListComponent, RenderPosition.BEFOREEND);
    const dayEvents = boardDays[i].events;
    for (let j = 0; j < dayEvents.length; j++) {
      renderEvent(eventsListComponent, dayEvents[j]);
    }
  }
};

render(siteHeaderMainElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(siteMenuTitleElement, new MenuView(), RenderPosition.AFTEREND);
render(siteFilterTitleElement, new FilterView(), RenderPosition.AFTEREND);
renderBoard(days);


