
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
  ]

};

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

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const generateEvent = () => {
  return {

  };
};
