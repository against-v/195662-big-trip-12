import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATISTICS}">Stats</a>
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
    return createMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    this.getElement().querySelector(`.trip-tabs__btn[data-value=${this._currentActiveButton}]`).classList.remove(ACTIVE_CLASS);
    this.getElement().querySelector(`.trip-tabs__btn[data-value=${menuItem}]`).classList.add(ACTIVE_CLASS);
    this._currentActiveButton = menuItem;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const menuItem = evt.target.dataset.value;
    if (menuItem && menuItem !== this._currentActiveButton) {
      this.setMenuItem(menuItem);
      this._callback.menuClick(menuItem);
    }
  }
}
