import AbstractView from '../framework/view/abstract-view.js';
import {getPeriodTripDayMonth, getFullWayCities} from '../utils/point.js';

const createNewTaskTripInfoTemplate = (points) => {

  const costTrip = points.reduce((sum, point) => sum + point.price, 0);
  const periodTrip = getPeriodTripDayMonth(points);
  const fullWayCities = getFullWayCities(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${fullWayCities}</h1>
    ${periodTrip}
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTrip}</span>
  </p>
  </section>`
  );
};

export default class TripInfoTemplateView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createNewTaskTripInfoTemplate(this.#points);
  }
}
