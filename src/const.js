export const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`,
};
export const UserAction = {
  CHANGE_FAVORITE: `CHANGE_FAVORITE`,
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};
export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
export const UnitOfTime = {
  DAY: `day`,
};
export const EditingModes = {
  CREATE: `create`,
  UPDATE: `update`,
};

export const DateFormat = {
  MONTH_DAY: `MMM D`,
  DATE_TIME: `YYYY-MM-DDTHH:mm`,
  DATEPICKER: `DD/MM/YY HH:mm`,
  YEAR_MONTH_DAY: `YYYY-MM-DD`,
  HOURS_MINUTES: `HH:mm`,
};

export const RegEx = {
  PRICE: /^[^1-9]$|\D+/,
};

export const MenuItem = {
  TABLE: `table`,
  STATISTICS: `statistics`
};

export const ChartSettings = {
  POSITION: {
    START: `start`,
    END: `end`,
    LEFT: `left`,
  },
  COLOR: {
    WHITE: `#ffffff`,
    BLACK: `#000000`,
  },
  BAR_HEIGHT: 55
};

export const ChartDataPropertyName = {
  PRICE: `price`,
  COUNT: `count`,
  DURATION: `duration`,
};

export const DESTINATIONS = [
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
export const EVENT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];
