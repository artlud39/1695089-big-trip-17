import TripInfoTemplateView from '../view/trip-info-view.js';
import ListTaskFilterView from '../view/list-filter-view.js';
import {render,RenderPosition} from '../framework/render.js';


export default class TripInfoPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterContainer = null;
  #headerPoints = [];

  constructor(listContainer, filterContainer,pointsModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#headerPoints = [...this.#pointsModel.points];
    this.#renderTripInfo();
  };

  #renderTripInfo = () => {
    render(new ListTaskFilterView(this.#headerPoints), this.#filterContainer);

    if (!this.#headerPoints.length) {
      return;
    }
    render(new TripInfoTemplateView(this.#headerPoints), this.#listContainer, RenderPosition.AFTERBEGIN);
  };
}
