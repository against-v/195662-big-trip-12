export const makeItemsUniq = (items) => [...new Set(items)];

export const countEventsPriceByEventType = (events, type) => {
  let price = 0;
  const eventsByType = events.filter((event) => event.type === type);
  eventsByType.forEach((event) => {
    price += Number(event.basePrice);
  });
  return {
    price,
    type,
  };
};
export const countTripsTypesByType = (tripTypes, types) => {
  console.log(tripTypes, types)
  types.forEach((type) => {
    console.log(tripTypes.filter((tripType) => tripType === type).length);
  });
  // return tripTypes.filter((tripType) => tripType === type).length;

};
