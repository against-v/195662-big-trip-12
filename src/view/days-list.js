import AbstractView from "./abstract.js";

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DaysList extends AbstractView {
  getTemplate() {
    return createDaysListTemplate();
  }
}
