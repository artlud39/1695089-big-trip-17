import TaskListTemplateView from '../view/task-list-view.js';
import TaskEventTemplateView from '../view/task-event-view.js';
import TaskEditTemplateView from '../view/task-edit-view.js';
import NoPointTemplateView from '../view/no-point-view.js';
import ListSortTemplateView from '../view/list-sort-view';
import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #listContainer = null;
  #pointsModel = null;

  #pointListComponent = new TaskListTemplateView();
  #pointEventComponent = new TaskEventTemplateView();

  #boardPoints = [];

  constructor(listContainer,pointsModel) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  };

  #renderPoint = (point) => {
    const pointComponent = new TaskEventTemplateView(point);
    const pointEditComponent = new TaskEditTemplateView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element,pointEditComponent.element);
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#pointListComponent.element);
  };

  #renderBoard = () => {
    if(this.#boardPoints.every((point) => point === {})){
      render(new NoPointTemplateView(), this.#listContainer);
    } else {
      render(new ListSortTemplateView(), this.#listContainer);
      render(this.#pointListComponent, this.#listContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  };
}
