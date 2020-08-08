export const createEventTemplate = (event) => {
  const {
    type,
    city,
    offers,
    price,
    dateTimeStart,
    dateTimeEnd,
    destinationDescription,
    photos
  } = event;

  const title = `${type.name} ${type.type === `trip` ? `to` : `in`} ${city}`;

  const createOffersTemplate = (items) => {
    const trimmedItems = items.slice(0, 3);
    return (
      `<ul class="event__selected-offers">
        ${trimmedItems.map((offer) => {
        return (
          `<li class="event__offer">
                <span class="event__offer-title">${offer.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
           </li>`
        );
      }).join(``)}
      </ul>`
    );
  };
  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${offersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
