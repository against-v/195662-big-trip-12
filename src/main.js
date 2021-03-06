import MenuView from "./view/menu.js";
import AddEventButtonView from "./view/add-event-button.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import DestinationsModel from "./model/destinations.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, FilterType, UpdateType} from "./const";

const AUTHORIZATION = `Basic kTy9gIdsz2317rD.`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderMainElement = document.querySelector(`.trip-main`);
const siteHeaderControlsElement = siteHeaderMainElement.querySelector(`.trip-controls`);
const siteMenuTitleElement = siteHeaderControlsElement.querySelector(`h2:first-child`);
const siteFilterTitleElement = siteHeaderControlsElement.querySelector(`h2:last-child`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
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
  const isCreateFirstEvent = eventsModel.getEvents().length === 0;
  tripPresenter.init(isCreateFirstEvent);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  tripPresenter.createEvent(handleEventNewFormClose);
  addEventButtonComponent.getElement().disabled = true;

};
const renderHeader = () => {
  render(siteMenuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  render(siteHeaderMainElement, addEventButtonComponent, RenderPosition.BEFOREEND);
  addEventButtonComponent.setAddEventButtonClickHandler(handleAddEventButtonClick);
};

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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
  api: apiWithProvider,
};
const tripPresenter = new TripPresenter(tripPresenterParams);
const filterPresenter = new FilterPresenter(siteFilterTitleElement, filterModel);

filterPresenter.init();
tripPresenter.init();

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
    return apiWithProvider.getOffers();
  })
  .then((offers) => {
    offersModel.setOffers(offers);
    return apiWithProvider.getEvents();
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
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
