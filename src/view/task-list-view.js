import {createElement} from '../render.js';

const createTaskListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TaskListTemplateView {
  #element = null;

  get template() {
    return createTaskListTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
