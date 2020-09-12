import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createMenuTemplate = (currentActiveButton) => {
  const getActiveClass = (button) => {
    if (button === currentActiveButton) {
      return `trip-tabs__btn--active`;
    }
    return ``;
  };
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  ${getActiveClass(MenuItem.TABLE)}" href="#" data-value="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn ${getActiveClass(MenuItem.STATISTICS)}" href="#" data-value="${MenuItem.STATISTICS}">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractView {
  constructor(currentActiveButton) {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._currentActiveButton = currentActiveButton;
  }

  getTemplate() {
    return createMenuTemplate(this._currentActiveButton);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
