import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";

import TripPresenter from "./presenter/trip.js";


import {generateEvent} from "./mock/event.js";

import {render, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);

const tripPresenter = new TripPresenter(siteMainElement);

render(siteHeaderMainElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(siteMenuTitleElement, new MenuView(), RenderPosition.AFTEREND);
render(siteFilterTitleElement, new FilterView(), RenderPosition.AFTEREND);

tripPresenter.init(events);
