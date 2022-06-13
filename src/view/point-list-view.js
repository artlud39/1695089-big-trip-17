import AbstractView from '../framework/view/abstract-view.js';

const createTaskListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointListView  extends AbstractView {
  get template() {
    return createTaskListTemplate();
  }
}
