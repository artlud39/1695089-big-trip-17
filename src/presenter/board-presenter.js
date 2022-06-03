import TaskListTemplateView from '../view/task-list-view.js';
import BoardView from '../view/board-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import ListSortTemplateView from '../view/list-sort-view';
import {render,RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {sortPointTime, sortPointPrice} from '../utils/point.js';
import {SortType, UpdateType, UserAction} from '../const.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #pointComponent = new BoardView();
  #pointListComponent = new TaskListTemplateView();
  #sortComponent = new ListSortTemplateView();
  #noPointComponent = new NoPointTemplateView();

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
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    const points = this.points.slice();
    render(this.#pointListComponent, this.#pointComponent.element);
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderBoard = () => {
    render(this.#pointComponent, this.#listContainer);

    if(this.points.every((point) => point === {})){
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  };
}
