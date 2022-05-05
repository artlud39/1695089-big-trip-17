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

export const generateTask = () => ({
  type: generateType(),
  dueDateFrom: null,
  dueDateTo: null,
  price: 1100,
  isFavorite: false,
  destination: null,
  offers: null,
});
