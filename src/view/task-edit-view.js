import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {editFullDate} from '../utils/point.js';
import {POINT_TYPES} from '../const.js';
import {offersType} from '../mock/offers.js';
import {destinationsCities} from '../mock/destination.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  isFavorite: false,
  offers: [],
  type: ''
};

const createPhotosTemplate = (destinationPhotos) => (
  `${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}`
);

const createNamesTemplate = () => destinationsCities.map((destinationsCity) => `<option value="${destinationsCity.name}"></option>`).join('');

const createEditOffersTemplate = (data, pointTypeOffer) => pointTypeOffer.offers
  .map((offer) => {
    const checked = data.id.includes(offer.id) ? 'checked' : '';
    return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.prefix}-1" type="checkbox" name="event-offer-${offer.prefix}" ${checked}>
    <label class="event__offer-label" for="event-offer-${offer.prefix}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
  }).join(' ');

const createPointTypes = () => POINT_TYPES.map((type) => (
  `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`
)).join('');

const createOffersTemplateSection = (data, pointTypeOffer) =>  (
  `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${createEditOffersTemplate(data, pointTypeOffer)}
  </div>
</section>`);

const createDestinationTemplateSection = (destination) => (
  `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
   <p class="event__destination-description">${destination.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPhotosTemplate(destination.pictures)}
    </div>
  </div>
</section>`);

const createTaskEditTemplate = (data) => {
  const {type, dateFrom, dateTo, price, destination, offers} = data;

  const editFullDateStart = dateFrom !== null ? editFullDate(dateFrom): 'From';
  const editFullDateEnd = dateTo !== null ? editFullDate(dateTo): 'To';

  const nameTemplate = createNamesTemplate();
  const pointTypeTemplate = createPointTypes();

  const pointTypeOffer = offersType.find((offer) => offer.type === type);

  const offersTemplateSection = pointTypeOffer && pointTypeOffer.offers.length !== 0 ? createOffersTemplateSection(data, pointTypeOffer): '';
  const destinationsTemplateSection = destination && destination.pictures.length !== 0 ? createDestinationTemplateSection(destination): '';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypeTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${nameTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${editFullDateStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${editFullDateEnd}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
        ${offersTemplateSection}
        ${destinationsTemplateSection}
    </section>
  </form>
  </li>`;
};

export default class TaskEditTemplateView extends AbstractStatefulView {
  #dateFromDatepicker = null;
  #dateToDatepicker = null;

  constructor (point = BLANK_POINT) {

    super();
    this._state = TaskEditTemplateView.parsePointToState(point);

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createTaskEditTemplate(this._state);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick(TaskEditTemplateView.parseStateToPoint(this._state));
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  reset = (point) => {
    this.updateElement(
      TaskEditTemplateView.parsePointToState(point),
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(TaskEditTemplateView.parseStateToPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  };

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromDatepicker) {
      this.#dateFromDatepicker.destroy();
      this.#dateFromDatepicker = null;
    }

    if (this.#dateToDatepicker) {
      this.#dateToDatepicker.destroy();
      this.#dateToDatepicker = null;
    }
  };

  #dateFromChangeHanlder = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHanlder = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker = () => {
    this.#dateFromDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        minuteIncrement: 1,
        onChange: this.#dateFromChangeHanlder,
      },
    );

    this.#dateToDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minuteIncrement: 1,
        onChange: this.#dateToChangeHanlder,
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCytiHandler);
    this.element.querySelector('#event-price-1').addEventListener('input', this.#basePriceHandler);
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    const targetPoint = offersType.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: targetPoint.type,
      offers: targetPoint.offers,
    });
  };

  #changeCytiHandler = (evt) => {
    evt.preventDefault();
    const targetPoint = destinationsCities.find((city) => city.name === evt.target.value);
    if (targetPoint) {
      this.updateElement({
        destination: targetPoint,
      });
    }
  };

  #basePriceHandler = (evt) => {
    evt.preventDefault();
    const reg = /^(?:[1-9]\d*|\d)$/;
    this._setState({
      price: reg.test(evt.target.value) ? evt.target.value : '',
    });
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => ({...state});
}
