import TripInfoView from '../view/trip-info-view.js';
import {render,RenderPosition} from '../framework/render.js';

export default class TripInfoPresenter {
  #listContainer = null;
  #pointsModel = null;
  #headerPoints = [];

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#headerPoints = [...this.#pointsModel.points];
    this.#renderTripInfo();
  };

  #renderTripInfo = () => {
    if (!this.#headerPoints.length) {
      return;
    }
    render(new TripInfoView(this.#headerPoints), this.#listContainer, RenderPosition.AFTERBEGIN);
  };
}
