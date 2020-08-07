import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createInfoTemplate} from "./view/info.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventEditTemplate} from "./view/event-edit.js";
import {createDaysListTemplate} from "./view/days-list.js";
import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

import {generateEvent} from "./mock/event.js";

console.log(generateEvent());

const EVENT_COUNT = 3;

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
render(siteMainElement, createEventEditTemplate(), `beforeend`);
render(siteMainElement, createDaysListTemplate(), `beforeend`);

const siteDaysListElement = siteMainElement.querySelector(`.trip-days`);

render(siteDaysListElement, createDayTemplate(), `beforeend`);

const siteEventList = siteDaysListElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteEventList, createEventTemplate(), `beforeend`);
}

