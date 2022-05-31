import {getRandomInteger} from '../utils/common.js';
import {POINT_TYPES} from '../const.js';

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

export {generatePointType};
