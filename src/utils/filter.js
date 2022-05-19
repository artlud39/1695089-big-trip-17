import {FILTER_TYPE} from '../const';
import {isFuturePoints, isPastPoints} from './point';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFuturePoints(point.dateFrom)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPastPoints(point.dateTo)),
};

export {filter};
