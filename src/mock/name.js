import {getRandomInteger} from '../utils/common.js';
import {NAMES} from '../const.js';

const generateName = () => {
  const randomIndex = getRandomInteger(0, NAMES.length - 1);

  return NAMES[randomIndex];
};

export {generateName};
