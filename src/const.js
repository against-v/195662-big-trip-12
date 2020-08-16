export const EVENT_TYPES = [
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
export const CITIES = [
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
export const EVENT_OFFERS = {
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
