import {getRandomInteger} from '../utils.js';
export const offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: getRandomInteger(10, 150),
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: getRandomInteger(10, 150),
      }
    ]
  },
];
