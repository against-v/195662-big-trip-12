import {dateFormatting} from "../utils.js";

export const createInfoTemplate = (events) => {
  events.sort((a, b) => a.dateStart - b.dateStart);
  const calcCost = () => {
    let _cost = 0;
    events.forEach((event) => {
      _cost += event.price;
      event.offers.forEach((offer) => {
        _cost += offer.price;
      });
    });
    return _cost;
  };
  const cost = calcCost();
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
