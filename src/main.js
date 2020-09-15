import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import AddEventButtonView from "./view/add-event-button.js";
import StatisticsView from "./view/statistics.js";

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import EventsModel from "./model/events.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";


import {generateEvent} from "./mock/event.js";
import {generateDestination} from "./mock/destination";
import {generateOffer} from "./mock/offer";

import Api from "./api.js";

import {render, RenderPosition, remove} from "./utils/render.js";

import {DESTINATIONS, EVENT_TYPES, MenuItem, FilterType, UpdateType} from "./const";

const EVENT_COUNT = 10;
const AUTHORIZATION = `Basic kTy9gIdsz2317rD.`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

const destinations = DESTINATIONS.map((destinationName) => generateDestination(destinationName));
const offers = EVENT_TYPES.map((offerType) => generateOffer(offerType));
const events = new Array(EVENT_COUNT).fill().map(() => generateEvent(destinations, offers));


const api = new Api(END_POINT, AUTHORIZATION);

api.getDestinations().then((destinations) => {
  console.log(destinations);
});

api.getOffers().then((offers) => {
  console.log(offers);
});

api.getEvents().then((events) => {
  console.log(events);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

destinationsModel.setDestinations(destinations);
offersModel.setOffers(offers);
eventsModel.setEvents(events);

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);

const siteMenuComponent = new MenuView(MenuItem.TABLE);
const addEventButtonComponent = new AddEventButtonView();

const tripPresenter = new TripPresenter(siteMainElement, eventsModel, destinationsModel, offersModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterTitleElement, filterModel);

render(siteHeaderMainElement, new InfoView(events), RenderPosition.AFTERBEGIN);
render(siteMenuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);
render(siteHeaderMainElement, addEventButtonComponent, RenderPosition.BEFOREEND);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

const handleEventNewFormClose = () => {
  addEventButtonComponent.getElement().disabled = false;
};

const handleAddEventButtonClick = () => {
  if (statisticsComponent) {
    remove(statisticsComponent);
  }
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  tripPresenter.createEvent(handleEventNewFormClose);
  addEventButtonComponent.getElement().disabled = true;

};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
addEventButtonComponent.setAddEventButtonClickHandler(handleAddEventButtonClick);

filterPresenter.init();
tripPresenter.init();
