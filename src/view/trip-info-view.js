import AbstractView from '../framework/view/abstract-view.js';
import {getPeriodTripDayMonth, getFullWayCities} from '../utils/point.js';

const createTripInfoTemplate = (points) => {

  const costTrip = points.reduce((sum, point) => sum + point.basePrice, 0);
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

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
