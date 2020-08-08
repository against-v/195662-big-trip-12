import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createInfoTemplate} from "./view/info.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDaysListTemplate} from "./view/days-list.js";
import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

import {generateEvent} from "./mock/event.js";
import {generateDays} from "./mock/day.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
const days = generateDays(events);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.trip-events`);

render(siteHeaderMainElement, createInfoTemplate(), `afterbegin`);
render(siteMenuTitleElement, createMenuTemplate(), `afterend`);
render(siteFilterTitleElement, createFilterTemplate(), `afterend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createEventEditTemplate(days[0].events[0]), `beforeend`);
render(siteMainElement, createDaysListTemplate(events), `beforeend`);

const siteDaysListElement = siteMainElement.querySelector(`.trip-days`);

for (let i = 0; i < days.length; i++) {
  render(siteDaysListElement, createDayTemplate(days[i].day, i), `beforeend`);
  const siteEventList = siteDaysListElement.querySelectorAll(`.trip-events__list`)[i];
  const _events = days[i].events;
  for (let j = 0; j < _events.length; j++) {
    render(siteEventList, createEventTemplate(_events[j]), `beforeend`);
  }
}


