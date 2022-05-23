import TaskListTemplateView from '../view/task-list-view.js';
import BoardView from '../view/board-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import ListSortTemplateView from '../view/list-sort-view';
import {render,RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointTime, sortPointPrice} from '../utils/point.js';
import {SORT_TYPE} from '../const.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #pointComponent = new BoardView();
  #pointListComponent = new TaskListTemplateView();
  #sortComponent = new ListSortTemplateView();
  #noPointComponent = new NoPointTemplateView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedBoardPoints = [];

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#sourcedBoardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SORT_TYPE.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoTasks = () => {
    render(this.#noPointComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    render(this.#pointListComponent, this.#pointComponent.element);
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
    render(this.#pointComponent, this.#listContainer);

    if(this.#boardPoints.every((point) => point === {})){
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  };
}
