import {destinationsCities} from '../mock/destination.js';

export default class DestinationsModel {
  #destinations = destinationsCities;

  get destinations() {
    return this.#destinations;
  }
}
