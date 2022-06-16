import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';

export default class FilterModel extends Observable {
  #filterTypes = FilterType.EVERYTHING;

  get filters() {
    return this.#filterTypes;
  }

  setFilter = (updateType, filterTypes) => {
    this.#filterTypes = filterTypes;
    this._notify(updateType, filterTypes);
  };
}
