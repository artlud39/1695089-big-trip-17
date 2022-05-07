import {getRandomInteger} from '../utils.js';

const generateType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateName= () => {
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

export const generateTask = () => ({
  type: generateType(),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  price: 1100,
  isFavorite: false,
  destination: '',
  offers: [],
  id: 1,
});
