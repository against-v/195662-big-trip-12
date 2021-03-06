import moment from "moment";

const DURATION_SYMBOLS_AMOUNT = 2;

const formatDurationValue = (value) => {
  return (`0${value}`).slice(-DURATION_SYMBOLS_AMOUNT);
};

export const formatDate = (date, format) => {
  if (!(date instanceof Date)) {
    return ``;
  }
  return moment(date).format(format);
};

export const getDuration = (dateFrom, dateTo) => {
  return dateTo - dateFrom;
};

export const humanizeDuration = (duration) => {
  const day = formatDurationValue(moment.duration(duration).days());
  const hours = formatDurationValue(moment.duration(duration).hours());
  const minutes = formatDurationValue(moment.duration(duration).minutes());

  if (day > 0) {
    return `${day}D ${hours}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
