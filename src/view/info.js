import {dateFormatting} from "../utils.js";
const calcCost = (events) => {
  let cost = 0;
  events.forEach((event) => {
    cost += event.price;
    event.offers.forEach((offer) => {
      cost += offer.price;
    });
  });
  return cost;
};

export const createInfoTemplate = (events) => {
  events.sort((a, b) => a.dateStart - b.dateStart);
  const cost = calcCost(events);
  const dateStart = dateFormatting(events[0].dateTimeStart);
  const dateEnd = dateFormatting(events[events.length - 1].dateTimeEnd);
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${events[0].city} &mdash; ${events[events.length - 1].city}</h1>

        <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );
};
