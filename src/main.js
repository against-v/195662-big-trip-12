import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import AddEventButtonView from "./view/add-event-button.js";

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import EventsModel from "./model/events.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";


import {generateEvent} from "./mock/event.js";
import {generateDestination} from "./mock/destination";
import {generateOffer} from "./mock/offer";

import {render, RenderPosition} from "./utils/render.js";

import {DESTINATIONS, EVENT_TYPES, MenuItem} from "./const";

const EVENT_COUNT = 1;

const destinations = DESTINATIONS.map((destinationName) => generateDestination(destinationName));
const offers = EVENT_TYPES.map((offerType) => generateOffer(offerType));
const events = new Array(EVENT_COUNT).fill().map(() => generateEvent(destinations, offers));

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

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};
const handleAddEventButtonClick = () => {
  // Скрыть статистику
  // Показать доску
  // Показать форму добавления новой задачи
  // Убрать выделение с ADD NEW TASK после сохранения
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
addEventButtonComponent.setAddEventButtonClickHandler(handleAddEventButtonClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
