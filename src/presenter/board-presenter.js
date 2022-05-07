import TaskListTemplateView from '../view/task-list-view.js';
import TaskEventTemplateView from '../view/task-event-view.js';
import TaskEditTemplateView from '../view/task-edit-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  taskListComponent = new TaskListTemplateView();
  taskEventComponent = new TaskEventTemplateView();

  init = (listContainer,tasksModel) => {
    this.listContainer = listContainer;
    this.tasksModel = tasksModel;
    this.boardTasks = [...this.tasksModel.getTasks()];
    console.log(this.boardTasks);
    render(this.taskListComponent, this.listContainer);
    render(this.taskEventComponent, this.taskListComponent.getElement());
    render(new TaskEditTemplateView(), this.taskListComponent.getElement());

    for (let i = 0; i < this.boardTasks.length; i++) {
      render(new TaskEventTemplateView(this.boardTasks[i]), this.taskListComponent.getElement());
    }
  };
}
