import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {editFullDate} from '../utils/point.js';
import {POINT_TYPES, BLANK_POINT} from '../const.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createPhotosTemplate = (destinationPhotos) => (
  `${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}`
);

const createEditOffersTemplate = (offersId, pointTypeOffer) => pointTypeOffer.offers.map((offer, index) => {
  const checked = offersId.includes(offer.id);
  const nameID = offer.title.split(' ').slice(-1);
  return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${nameID}-${index + 1}" type="checkbox" name="event-offer-${nameID}"  ${checked ? 'checked' : ''} data-offer-id="${offer.id}">
    <label class="event__offer-label" for="event-offer-${nameID}-${index + 1}">
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

const createOffersSection = (offersId, pointTypeOffer) =>  (
  `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${createEditOffersTemplate(offersId, pointTypeOffer)}
  </div>
</section>`);

const createDestinationSection = (destination) => (
  `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
   <p class="event__destination-description">${he.encode(destination.description)}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPhotosTemplate(destination.pictures)}
    </div>
  </div>
</section>`);

const showRollupButton = () => (
  `<button class="event__rollup-btn" type="button">
     <span class="visually-hidden">Open event</span>
  </button>`
);
const createCitiesTemplate = (destinations) => destinations.map((destinationName) => `<option value="${destinationName.name}"></option>`).join('');

const createPointEditTemplate = (point, allOffers, destinations, isNewPoint) => {
  const {type, dateFrom, dateTo, basePrice, destination, offers, isDisabled, isSaving, isDeleting,} = point;

  const editFullDateStart = dateFrom !== null ? editFullDate(dateFrom): '';
  const editFullDateEnd = dateTo !== null ? editFullDate(dateTo): '';
  const date1From = dayjs(dateFrom);
  const date1To = dayjs(dateTo);
  const date1Diff = date1To.diff(date1From);
  const isSubmitDisabled = date1Diff <= 0 || basePrice < 1;

  const citiesTemplate = createCitiesTemplate(destinations);
  const pointTypeTemplate = createPointTypes();

  const pointTypeOffer = allOffers.find((offer) => offer.type === type);
  const offersTemplateSection = pointTypeOffer ? createOffersSection(offers, pointTypeOffer): '';

  const destinationsTemplateSection = destination.pictures.length !== 0 ? createDestinationSection(destination): '';
  const rollupButton = showRollupButton();

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
          ${citiesTemplate}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" pattern="[0-9]+" title="Только числа"  value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" ${isSubmitDisabled || isDisabled ? 'disabled' : ''} type="submit">${isSaving ? 'saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>  ${isDeleting ? 'deleting...' : `${isNewPoint ? 'Cancel' : 'Delete'}`} </button>
      ${isNewPoint ? '' : rollupButton}
    </header>
    <section class="event__details">
        ${offersTemplateSection}
        ${destinationsTemplateSection}
    </section>
  </form>
  </li>`;
};

export default class PointEditView extends AbstractStatefulView {
  #dateFromDatepicker = null;
  #dateToDatepicker = null;
  #allOffers = null;
  #destinations = null;
  #isNewPoint = null;

  constructor (point = BLANK_POINT, allOffers, destinations, isNewPoint = false) {
    super();
    this._state = PointEditView.parsePointToState(point);

    this.#allOffers = allOffers;
    this.#destinations = destinations;
    this.#isNewPoint = isNewPoint;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#allOffers, this.#destinations, this.#isNewPoint);
  }

  setEditClickHandler = (callback) => {
    if (this.#isNewPoint) {
      return;
    }
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
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

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseStateToPoint(this._state));
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
        onClose: this.#dateFromChangeHanlder,
      },
    );

    this.#dateToDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minuteIncrement: 1,
        onClose: this.#dateToChangeHanlder,
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCytiHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceHandler);
  };

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #changeCytiHandler = (evt) => {
    evt.preventDefault();
    const targetPoint = this.#destinations.find((city) => city.name === evt.target.value);
    if (targetPoint) {
      this.updateElement({
        destination: targetPoint,
      });
    }
  };

  #offerChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    if (evt.target.checked) {
      this.updateElement({
        offers: [...this._state.offers, +evt.target.dataset.offerId],
      });
    } else {
      this.updateElement({
        offers: this._state.offers.filter((offerId) => offerId !== +evt.target.dataset.offerId),
      });
    }
  };

  #basePriceHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  static parsePointToState = (point) => ({...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
