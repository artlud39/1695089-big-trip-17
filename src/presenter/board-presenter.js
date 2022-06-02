import TaskListTemplateView from '../view/task-list-view.js';
import BoardView from '../view/board-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import ListSortTemplateView from '../view/list-sort-view';
import {render,RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {sortPointTime, sortPointPrice} from '../utils/point.js';
import {SortType} from '../const.js';

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
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
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

  #renderNoTasks = () => {
    render(this.#noPointComponent, this.#pointComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    const points = this.points.slice();
    render(this.#pointListComponent, this.#pointComponent.element);
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
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
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  };
}
