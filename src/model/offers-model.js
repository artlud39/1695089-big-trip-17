import {offersType} from '../mock/offers.js';

export default class OffersModel {
  #offers = offersType;

  get offers() {
    return this.#offers;
  }
}
