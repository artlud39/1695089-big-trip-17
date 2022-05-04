import TaskListTemplateView from '../view/task-list-view.js';
import TaskEventTemplateView from '../view/task-event-view.js';
import TaskEditTemplateView from '../view/task-edit-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  taskListComponent = new TaskListTemplateView();
  taskEventComponent = new TaskEventTemplateView();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.taskListComponent, this.listContainer);
    render(this.taskEventComponent, this.taskListComponent.getElement());
    render(new TaskEditTemplateView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TaskEventTemplateView(), this.taskListComponent.getElement());
    }
  };
}
