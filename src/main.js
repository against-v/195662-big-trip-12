import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DaysListView from "./view/days-list.js";
import DayView from "./view/day.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/event.js";
import EventEditView from "./view/event-edit.js";


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
  //todo вопросы:
  // 1. почему бы не добавить removeEventListenner? 2.
  const eventComponent = new EventView(event);

  //todo Здесь должна быть вторая структура данных - offers,
  // еще с третьей домашки, но я реализвал это по другому,
  // очень интересно: а как же изначально задумывалось?
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventsListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventsListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventsListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderMainElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuTitleElement, new MenuView().getElement(), RenderPosition.AFTEREND);
render(siteFilterTitleElement, new FilterView().getElement(), RenderPosition.AFTEREND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const daysListComponent = new DaysListView();
render(siteMainElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < days.length; i++) {
  const dayComponent = new DayView(days[i].day, i);
  const eventsListComponent = new EventsListView();
  render(daysListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
  render(dayComponent.getElement(), eventsListComponent.getElement(), RenderPosition.BEFOREEND);
  const dayEvents = days[i].events;
  for (let j = 0; j < dayEvents.length; j++) {
    renderEvent(eventsListComponent.getElement(), dayEvents[j]);
  }
}

