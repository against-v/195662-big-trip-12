const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const eventTypes = [
    {
      name: `Taxi`,
      id: `taxi`,
      type: `trip`,
    },
    {
      name: `Bus`,
      id: `bus`,
      type: `trip`,
    },
    {
      name: `Train`,
      id: `train`,
      type: `trip`,
    },
    {
      name: `Ship`,
      id: `ship`,
      type: `trip`,
    },
    {
      name: `Transport`,
      id: `transport`,
      type: `trip`,
    },
    {
      name: `Drive`,
      id: `drive`,
      type: `trip`,
    },
    {
      name: `Flight`,
      id: `flight`,
      type: `trip`,
    },
    {
      name: `Check`,
      id: `check`,
      type: `stop`,
    },
    {
      name: `Sightseeing`,
      id: `sightseeing`,
      type: `stop`,
    },
    {
      name: `Restaurant`,
      id: `restaurant`,
      type: `stop`,
    },
  ];
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);
  return eventTypes[randomIndex];
};
const generateCity = () => {
  const cities = [
    `The Hague`,
    `Delft`,
    `Leiden`,
    `Rotterdam`,
    `Helmond`,
    `Eindhoven`,
    `Tilburg`,
    `Venlo`,
    `Gouda`,
    `Breda`,
  ];
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};
const generateOffers = (eventType) => {
  if (eventType) {
    const eventOffers = {
      taxi: [
        {
          name: `Comfort tariff`,
          price: 50,
        },
        {
          name: `Business tariff`,
          price: 100,
        },
        {
          name: `Preorder`,
          price: 10,
        },
      ],
      bus: [
        {
          name: `Comfort tariff`,
          price: 30,
        },
        {
          name: `Business tariff`,
          price: 50,
        },
        {
          name: `Add luggage`,
          price: 5,
        },
      ],
      train: [
        {
          name: `Comfort tariff`,
          price: 150,
        },
        {
          name: `Business tariff`,
          price: 200,
        },
        {
          name: `Transfer to the station`,
          price: 40,
        },
        {
          name: `Add luggage`,
          price: 20,
        },
      ],
      ship: [
        {
          name: `Comfort tariff`,
          price: 250,
        },
        {
          name: `Business tariff`,
          price: 400,
        },
        {
          name: `Transfer to the port`,
          price: 40,
        },
        {
          name: `Add luggage`,
          price: 50,
        },
      ],
      transport: [
        {
          name: `Add luggage`,
          price: 3,
        },
      ],
      drive: [
        {
          name: `Rent a car`,
          price: 50,
        },
      ],
      flight: [
        {
          name: `Business tariff`,
          price: 500,
        },
        {
          name: `Add luggage`,
          price: 150,
        },
        {
          name: `Transfer to the airport`,
          price: 80,
        },
      ],
      check: [
        {
          name: `Breakfast`,
          price: 25,
        },
        {
          name: `Laundry`,
          price: 5,
        },
      ],
      sightseeing: [
        {
          name: `Souvenirs`,
          price: 15,
        },
        {
          name: `Museum tickets`,
          price: 5,
        },
        {
          name: `Food and drinks`,
          price: 15,
        },
      ],
      restaurant: [
        {
          name: `Wine`,
          price: 30,
        },
        {
          name: `Delicacies`,
          price: 30,
        },
      ],
    };
    const randomIndex = getRandomInteger(0, eventOffers[eventType.id].length);
    if (randomIndex === 0) {
      return [];
    }
    const offers = [];
    for (let i = 0; i < randomIndex; i++) {
      offers.push(eventOffers[eventType.id][i]);
    }
    return offers;
  }
  return [];

};
const generatePrice = () => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 99;
  const COEFFICIENT = 10;
  return getRandomInteger(MIN_VALUE, MAX_VALUE) * COEFFICIENT;
};

const generateDateTime = (date = new Date(), nearestDayIndex = 1, latterDayIndex = 7) => {
  const randomIndex = getRandomInteger(nearestDayIndex, latterDayIndex);
  date.setDate(date.getDate() + randomIndex);
  if (!randomIndex) {
    date.setHours(getRandomInteger(date.getHours(), 23), getRandomInteger(0, 59));
  } else {
    date.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  }
  return date;
};

const type = generateType();
const dateTimeStart = generateDateTime();

// почему эта переменная будет всегда совпадать с dateTimeStart?
// const dateTimeEnd = generateDateTime(dateTimeStart, 0, 1);


export const generateEvent = () => {
  return {
    type,
    city: generateCity(),
    offers: generateOffers(type),
    price: generatePrice(),
    dateTimeStart,
    dateTimeEnd: generateDateTime(dateTimeStart, 0, 1),
  };
};
