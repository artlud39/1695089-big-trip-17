import {FilterType} from '../const';
import {isFuturePoints, isPastPoints} from './point';

const filterTypes = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoints(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoints(point.dateTo)),
};

export {filterTypes};
