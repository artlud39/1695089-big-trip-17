import ListTaskFilterView from './view/list-filter-view';
import TripInfoTemplateView from './view/trip-info-view';
import ListSortTemplateView from './view/list-sort-view';
import {render,RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters');
const sitePageMainElement = document.querySelector('.page-main');
const siteTripEventsElement = sitePageMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter();


render(new TripInfoTemplateView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new ListSortTemplateView(), siteTripEventsElement);
render(new ListTaskFilterView(), siteTripControlsElement);
boardPresenter.init(siteTripEventsElement);
