import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DaysListView from "./view/days-list.js";
import DayView from "./view/day.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";
import NoEventView from "./view/no-event.js";


import {generateEvent} from "./mock/event.js";

import {render, RenderPosition, generateDays} from "./utils.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const days = generateDays(events);

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.trip-events`);

const renderEvent = (eventsListElement, event) => {
  const eventComponent = new EventView(event);

  //todo Здесь должна быть вторая структура данных - offers, пофиксить, когда подрубим данные с бэка
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventsListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventsListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replaceFormToEvent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardDays) => {
  if (boardDays.length === 0) {
    render(siteMainElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  const daysListComponent = new DaysListView();
  render(siteMainElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < boardDays.length; i++) {
    const dayComponent = new DayView(boardDays[i].day, i);
    const eventsListComponent = new EventsListView();
    render(daysListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
    render(dayComponent.getElement(), eventsListComponent.getElement(), RenderPosition.BEFOREEND);
    const dayEvents = boardDays[i].events;
    for (let j = 0; j < dayEvents.length; j++) {
      renderEvent(eventsListComponent.getElement(), dayEvents[j]);
    }
  }
};

render(siteHeaderMainElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuTitleElement, new MenuView().getElement(), RenderPosition.AFTEREND);
render(siteFilterTitleElement, new FilterView().getElement(), RenderPosition.AFTEREND);
renderBoard(days);





