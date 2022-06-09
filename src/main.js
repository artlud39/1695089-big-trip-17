import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic Sg23Fl44wcl6sA1j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const offersModel = new OffersModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new PointsApiService(END_POINT, AUTHORIZATION));

const tripInfoPresenter = new TripInfoPresenter(siteTripMainElement, pointsModel);
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

offersModel.init();
destinationsModel.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteTripMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
