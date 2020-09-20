// import InfoView from "./view/info.js";
import MenuView from "./view/menu.js";
import AddEventButtonView from "./view/add-event-button.js";
import StatisticsView from "./view/statistics.js";

import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";

import EventsModel from "./model/events.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";

import Api from "./api.js";

import {render, RenderPosition, remove} from "./utils/render.js";

import {MenuItem, FilterType, UpdateType} from "./const";

const AUTHORIZATION = `Basic kTy9gIdsz2317rD.`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);


const api = new Api(END_POINT, AUTHORIZATION);


const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();


const siteMenuComponent = new MenuView(MenuItem.TABLE);
const addEventButtonComponent = new AddEventButtonView();

const tripPresenterParams = {
  siteMainElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filterModel,
  api,
};
const tripPresenter = new TripPresenter(tripPresenterParams);
const filterPresenter = new FilterPresenter(siteFilterTitleElement, filterModel);


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


// render(siteHeaderMainElement, new InfoView(events), RenderPosition.AFTERBEGIN);
const renderHeader = () => {
  render(siteMenuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  render(siteHeaderMainElement, addEventButtonComponent, RenderPosition.BEFOREEND);
  addEventButtonComponent.setAddEventButtonClickHandler(handleAddEventButtonClick);
};


filterPresenter.init();
tripPresenter.init();

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
    return api.getOffers();
  })
  .then((offers) => {
    offersModel.setOffers(offers);
    return api.getEvents();
  })
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
    renderHeader();
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
    renderHeader();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});
