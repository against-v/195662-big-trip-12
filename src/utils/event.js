export const isEventStopping = (eventType) => {
  const STOP_TYPES = [
    `check-in`,
    `sightseeing`,
    `restaurant`,
  ];
  const index = STOP_TYPES.findIndex((stopType) => {
    return stopType === eventType;
  });
  return index > -1;
};

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
