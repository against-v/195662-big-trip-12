//классы
import DaysListView from "./view/days-list.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";

import {createInfoTemplate} from "./view/info.js";
import {createEventEditTemplate} from "./view/event-edit.js";

import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

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

renderElement(siteMenuTitleElement, new MenuView().getElement(), RenderPosition.AFTEREND);
renderElement(siteFilterTitleElement, new FilterView().getElement(), RenderPosition.AFTEREND);
renderElement(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new DaysListView().getElement(), RenderPosition.BEFOREEND);


renderTemplate(siteHeaderMainElement, createInfoTemplate(events), `afterbegin`);
//todo сделать вставку формы редактирования в нужный дом-элемент
// renderTemplate(siteMainElement, createEventEditTemplate(days[0].events[0]), `beforeend`);


const siteDaysListElement = siteMainElement.querySelector(`.trip-days`);

for (let i = 0; i < days.length; i++) {
  renderTemplate(siteDaysListElement, createDayTemplate(days[i].day, i), `beforeend`);
  const siteEventList = siteDaysListElement.querySelectorAll(`.trip-events__list`)[i];
  const dayEvents = days[i].events;
  for (let j = 0; j < dayEvents.length; j++) {
    renderTemplate(siteEventList, createEventTemplate(dayEvents[j]), `beforeend`);
  }
}

