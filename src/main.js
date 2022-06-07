import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import {render} from './framework/render.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();


const tripInfoPresenter = new TripInfoPresenter(siteTripMainElement, pointsModel);
const boardPresenter = new BoardPresenter(siteTripEventsElement,pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewTaskFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewTaskButtonClick = () => {
  boardPresenter.createPoint(handleNewTaskFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, siteTripMainElement);
newPointButtonComponent.setClickHandler(handleNewTaskButtonClick);

tripInfoPresenter.init();
filterPresenter.init();
boardPresenter.init();

