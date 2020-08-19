// классы
import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DaysListView from "./view/days-list.js";
import DayView from "./view/day.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/event.js";

// import {createEventEditTemplate} from "./view/event-edit.js";


import {generateEvent} from "./mock/event.js";
import {generateDays} from "./mock/day.js";

import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const days = generateDays(events);

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.trip-events`);


// const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);


renderElement(siteHeaderMainElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMenuTitleElement, new MenuView().getElement(), RenderPosition.AFTEREND);
renderElement(siteFilterTitleElement, new FilterView().getElement(), RenderPosition.AFTEREND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const daysListComponent = new DaysListView();
renderElement(siteMainElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

// renderTemplate(siteMainElement, createEventEditTemplate(days[0].events[0]), `beforeend`);

for (let i = 0; i < days.length; i++) {
  const dayComponent = new DayView(days[i].day, i);
  const eventsListComponent = new EventsListView();
  renderElement(daysListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(dayComponent.getElement(), eventsListComponent.getElement(), RenderPosition.BEFOREEND);
  const dayEvents = days[i].events;
  for (let j = 0; j < dayEvents.length; j++) {
    renderElement(eventsListComponent.getElement(), new EventView(dayEvents[j]).getElement(), RenderPosition.BEFOREEND);
  }
}

