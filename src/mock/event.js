const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffleArray = (array = []) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateType = () => {
  const eventTypes = [
    {
      name: `Taxi`,
      icon: `taxi`,
      id: `taxi`,
      type: `trip`,
    },
    {
      name: `Bus`,
      icon: `bus`,
      id: `bus`,
      type: `trip`,
    },
    {
      name: `Train`,
      icon: `train`,
      id: `train`,
      type: `trip`,
    },
    {
      name: `Ship`,
      icon: `ship`,
      id: `ship`,
      type: `trip`,
    },
    {
      name: `Transport`,
      icon: `transport`,
      id: `transport`,
      type: `trip`,
    },
    {
      name: `Drive`,
      icon: `drive`,
      id: `drive`,
      type: `trip`,
    },
    {
      name: `Flight`,
      icon: `flight`,
      id: `flight`,
      type: `trip`,
    },
    {
      name: `Check-in`,
      icon: `check-in`,
      id: `checkIn`,
      type: `stop`,
    },
    {
      name: `Sightseeing`,
      icon: `sightseeing`,
      id: `sightseeing`,
      type: `stop`,
    },
    {
      name: `Restaurant`,
      icon: `restaurant`,
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
      checkIn: [
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
    const shuffledEventOffers = shuffleArray(eventOffers);
    const count = getRandomInteger(0, eventOffers[eventType.id].length);
    if (count === 0) {
      return [];
    }
    const offers = [];
    for (let i = 0; i < count; i++) {
      offers.push(shuffledEventOffers[eventType.id][i]);
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
  const dayGap = getRandomInteger(nearestDayIndex, latterDayIndex);
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + dayGap);
  if (!dayGap) {
    const hours = getRandomInteger(date.getHours(), 23);
    const minMinutesValue = hours === date.getHours() ? date.getMinutes() : 0;
    const minutes = getRandomInteger(minMinutesValue, 59);
    newDate.setHours(hours, minutes);
  } else {
    newDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  }
  return newDate;
};
const generateDate = (date = new Date()) => {
  const newDate = new Date(date);
  return newDate.setHours(0,0,0,0);
};
const generateDestinationDescription = () => {
  const fillerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const shuffledFillerText = shuffleArray(fillerText.substring(0, fillerText.length - 1).split(`. `));
  const count = getRandomInteger(1, 5);
  const destinationDescription = [];
  for (let i = 0; i < count; i++) {
    destinationDescription.push(shuffledFillerText[i]);
  }
  return `${destinationDescription.join(`. `)}.`;
};
const generateDestinationPhotos = () => {
  const destinationPhotos = [];
  const count = getRandomInteger(0, 5);
  for (let i = 0; i < count; i++) {
    destinationPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return destinationPhotos;
};

export const generateEvent = () => {
  const type = generateType();
  const dateTimeStart = generateDateTime();
  return {
    type,
    city: generateCity(),
    offers: generateOffers(type),
    price: generatePrice(),
    dateTimeStart,
    dateTimeEnd: generateDateTime(dateTimeStart, 0, 1),
    dateStart: generateDate(dateTimeStart),
    destinationDescription: generateDestinationDescription(),
    photos: generateDestinationPhotos(),
  };
};