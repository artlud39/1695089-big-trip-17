import {getRandomInteger} from '../utils/common.js';

export const generateName= () => {
  const names = [
    'Berlin',
    'Amsterdam',
    'London',
    'Paris',
    'Madrid',
    'Oslo',
    'Budapest',
    'Rome',
    'Zurich',
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};
