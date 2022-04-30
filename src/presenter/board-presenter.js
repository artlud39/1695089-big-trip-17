import TaskListTemplateView from '../view/task-list-view.js';
import TaskEventTemplateView from '../view/task-event-view.js';
import TaskEditTemplateView from '../view/task-edit-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  tasklistComponent = new TaskListTemplateView();
  taskEventComponent = new TaskEventTemplateView();


  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.tasklistComponent, this.listContainer);
    render(this.taskEventComponent, this.tasklistComponent.getElement());
    render(new TaskEditTemplateView(), this.tasklistComponent.getElement());


    for (let i = 0; i < 3; i++) {
      render(this.taskEventComponent, this.taskListComponent.getElement());
    }
  };
}
