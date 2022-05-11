import TaskListTemplateView from '../view/task-list-view.js';
import TaskEventTemplateView from '../view/task-event-view.js';
import TaskEditTemplateView from '../view/task-edit-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  taskListComponent = new TaskListTemplateView();
  taskEventComponent = new TaskEventTemplateView();

  init = (listContainer,pointsModel) => {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];

    console.log(this.boardPoints);

    render(this.taskListComponent, this.listContainer);
    render(new TaskEditTemplateView(this.boardPoints[0]), this.taskListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new TaskEventTemplateView(this.boardPoints[i]), this.taskListComponent.getElement());
    }
  };
}
