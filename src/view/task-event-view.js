import {createElement} from '../render.js';
import {humanizeTaskdate, yearMonthDayDate, hoursMinutesDate, fullDate, getDurationTripDate} from '../utils.js';

const createTaskTemplate = (point) => {
  const {type, dateFrom, dateTo, price, isFavorite, destination, offers} = point;

  const dateFromHumanize = dateFrom !== null ? humanizeTaskdate(dateFrom): '';
  const dateFromYearMonthDayDate = dateFrom !== null ? yearMonthDayDate(dateFrom): '';
  const dateStartHoursMinutes = dateFrom !== null ? hoursMinutesDate(dateFrom): '';
  const dateEndHoursMinutes = dateTo !== null ? hoursMinutesDate(dateTo): '';
  const fullDateStart = dateFrom !== null ? fullDate(dateFrom): '';
  const fullDateEnd = dateTo !== null ? fullDate(dateTo): '';
  const durationTripDate = getDurationTripDate(dateFrom,dateTo);

  const isPointFavorite = (isFavorite) ? 'event__favorite-btn--active': '';

  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  const createEditOffersTemplate = (typeOffer) => typeOffer.offers
    .map((offer) => {
      const checked = point.id.includes(offer.id) ? 'checked' : '';
      if(checked) {
        return `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`;
      }
    }).join(' ');

  const offersTemplate = createEditOffersTemplate(pointTypeOffer);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFromYearMonthDayDate}">${dateFromHumanize}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${fullDateStart}">${dateStartHoursMinutes}</time>
            &mdash;
            <time class="event__end-time" datetime="${fullDateEnd}">${dateEndHoursMinutes}</time>
          </p>
          <p class="event__duration">${durationTripDate}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${offersTemplate}
        </ul>
        <button class="event__favorite-btn  ${isPointFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TaskEventTemplateView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createTaskTemplate(this.point);
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
