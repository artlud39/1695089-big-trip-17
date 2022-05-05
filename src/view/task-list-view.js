import {createElement} from '../render.js';

const createTaskListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TaskListTemplateView {
  getTemplate() {
    return createTaskListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
