import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripInfoPresenter = new TripInfoPresenter(siteTripMainElement,siteTripControlsElement, pointsModel);
const boardPresenter = new BoardPresenter(siteTripEventsElement,pointsModel);


tripInfoPresenter.init();
boardPresenter.init();

