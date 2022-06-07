import TaskListTemplateView from '../view/task-list-view.js';
import BoardView from '../view/board-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {sortPointTime, sortPointPrice} from '../utils/point.js';
import {SortType, UpdateType, UserAction} from '../const.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #boardComponent = new BoardView();
  #pointListComponent = new TaskListTemplateView();
  #noPointComponent = new NoPointTemplateView();
  #sortComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(listContainer, pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointCount = points.length;

    render(this.#boardComponent, this.#listContainer);

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();

    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(points);
  };
}
