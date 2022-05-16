import {generatePoints} from '../mock/points.js';

export default class PointsModel {
  #points = Array.from({length: 5}, generatePoints);

  get points() {
    return this.#points;
  }
}
