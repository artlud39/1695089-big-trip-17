import {getRandomInteger} from '../utils/common.js';

export const offersType = [
  {
    type: 'Taxi',
    offers: [
      {
        prefix: 'business',
        title: 'Upgrade to a business class',
        price: getRandomInteger(20,150),
        id: 1,
      }, {
        prefix: 'radio',
        title: 'Choose the radio station',
        price: getRandomInteger(10,20),
        id: 2,
      }, {
        prefix: 'uber',
        title: 'Order Uber',
        price: getRandomInteger(20,50),
        id: 3,
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        prefix: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(10,100),
        id: 1,
      },{
        prefix: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
        id: 2,
      }, {
        prefix: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(10,100),
        id: 3,
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        prefix: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(10,100),
        id: 1,
      }, {
        prefix: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
        id: 2,
      }, {
        prefix: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(10,100),
        id: 3,
      }, {
        prefix: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(10,100),
        id: 4,
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        prefix: 'car',
        title: 'Add car place',
        price: getRandomInteger(10,100),
        id: 1,
      }, {
        prefix: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
        id: 2,
      }, {
        prefix: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(10,100),
        id: 3,
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        prefix: 'transponder',
        title: 'Toll road transponder',
        price: getRandomInteger(10,50),
        id: 1,
      },
      {
        prefix: 'car',
        title: 'Rent a car',
        price: getRandomInteger(150,250),
        id: 2,
      },
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        prefix: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(25,35),
        id: 1,
      }, {
        prefix: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(30,80),
        id: 2,
      }, {
        prefix: 'meal',
        title: 'Add meal',
        price: getRandomInteger(15,30),
        id: 3,
      }, {
        prefix: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(5,10),
        id: 4,
      }, {
        prefix: 'train',
        title: 'Travel by train',
        price: getRandomInteger(10,40),
        id: 5,
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        prefix: 'breakfast',
        title: 'Add breakfast',
        price: getRandomInteger(10,100),
        id: 1,
      }, {
        prefix: 'lunch',
        title: 'Add lunch',
        price: getRandomInteger(10,100),
        id: 2,
      }, {
        prefix: 'dinner',
        title: 'Add dinner',
        price: getRandomInteger(10,100),
        id: 3,
      },
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        prefix: 'tickets',
        title: 'Book tickets',
        price: getRandomInteger(40,60),
        id: 1,
      }, {
        prefix: 'lunch',
        title: 'Lunch in city',
        price: getRandomInteger(30,50),
        id: 2,
      },
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        prefix: 'book',
        title: 'Book a table',
        price: getRandomInteger(50,100),
        id: 1,
      }
    ]
  }
];
