import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic Sg23Fl34Wc26sA1j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(siteTripMainElement, pointsModel);
const boardPresenter = new BoardPresenter(siteTripEventsElement, pointsModel, filterModel);
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

pointsModel.init()
  .then(() => {
    if (pointsModel.offers.length === 0 && pointsModel.destinations.length === 0 && pointsModel.points.length === 0 ) {
      newPointButtonComponent.element.disabled = true;
    }

    render(newPointButtonComponent, siteTripMainElement);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
