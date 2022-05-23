import TaskListTemplateView from '../view/task-list-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import ListSortTemplateView from '../view/list-sort-view';
import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #pointListComponent = new TaskListTemplateView();
  #sortComponent = new ListSortTemplateView();
  #noPointComponent = new NoPointTemplateView();

  #boardPoints = [];
  #pointPresenter = new Map();

  constructor(listContainer,pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#listContainer);
  };

  #renderNoTasks = () => {
    render(this.#noPointComponent, this.#listContainer);
  };

  #renderPointsList = () => {
    render(this.#pointListComponent, this.#listContainer);
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#boardPoints
      .slice()
      .forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderBoard = () => {
    if(this.#boardPoints.every((point) => point === {})){
      this.#renderNoTasks();
    }

    this.#renderSort();
    this.#renderPointsList();
  };
}
