import ListTaskFilterView from './view/list-filter-view';
import TripInfoTemplateView from './view/trip-info-view';
import {render,RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';


const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter(siteTripEventsElement,pointsModel);


render(new TripInfoTemplateView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new ListTaskFilterView(), siteTripControlsElement);

boardPresenter.init();
