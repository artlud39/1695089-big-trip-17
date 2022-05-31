import {getRandomInteger} from '../utils/common.js';
import {generateName} from './name.js';

export const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateRandomPicturs = () => (
  {
    src: `http://picsum.photos/248/152?r=${getRandomInteger()}`,
    description: description[getRandomInteger(0, description.length - 1)],
  }
);

export const generateRandomDestination = () => ({
  description: description[getRandomInteger(0, description.length - 1)],
  name: generateName(),
  pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
});

export const destinationsCities = [
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Berlin',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Amsterdam',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'London',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Paris',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Madrid',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Oslo',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Budapest',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Rome',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
  {
    description: description[getRandomInteger(0, description.length - 1)],
    name: 'Zurich',
    pictures: Array.from({length: getRandomInteger(0,4)}, generateRandomPicturs),
  },
];

