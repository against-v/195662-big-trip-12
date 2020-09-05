import AbstractView from "./abstract.js";
import {dateFormatting} from "../utils/common.js";
const calcCost = (events) => {
  let cost = 0;
  events.forEach((event) => {
    cost += event.basePrice;
    event.offers.forEach((offer) => {
      cost += offer.price;
    });
  });
  return cost;
};

const createMainTemplate = (events) => {
  if (events.length > 0) {
    events.sort((a, b) => a.dateFrom - b.dateFrom);
    const dateStart = dateFormatting(events[0].dateFrom);
    const dateEnd = dateFormatting(events[events.length - 1].dateTo);
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${events[0].destination.name} &mdash; ${events[events.length - 1].destination.name}</h1>
        <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
      </div>`
    );
  } else {
    return (``);
  }
};

const createInfoTemplate = (events) => {
  const cost = calcCost(events);
  const mainTemplate = createMainTemplate(events);
  return (
    `<section class="trip-main__trip-info  trip-info">
     ${mainTemplate}
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
