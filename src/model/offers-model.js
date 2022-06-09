import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class OffersModel extends Observable {
  #offers = [];
  #offersApiService = null;

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;

      console.log('this.#offers', this.#offers);

    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };
}
