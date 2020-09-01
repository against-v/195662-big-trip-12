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
