import {getRandomInteger} from '../utils.js';

export const offersType = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 'business',
        title: 'Upgrade to a business class',
        price: getRandomInteger(20,150),
      }, {
        id: 'radio',
        title: 'Choose the radio station',
        price: getRandomInteger(10,20),
      }, {
        id: 'uber',
        title: 'Order Uber',
        price: getRandomInteger(20,50),
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(10,100),
      },{
        id: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
      }, {
        id: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(10,100),
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(10,100),
      }, {
        id: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
      }, {
        id: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(10,100),
      }, {
        id: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(10,100),
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 'car',
        title: 'Add car place',
        price: getRandomInteger(10,100),
      }, {
        id: 'meal',
        title: 'Add meal',
        price: getRandomInteger(10,100),
      }, {
        id: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(10,100),
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 'transponder',
        title: 'Toll road transponder',
        price: getRandomInteger(10,50),
      },
      {
        id: 'car',
        title: 'Rent a car',
        price: getRandomInteger(150,250),
      },
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 'luggage',
        title: 'Add luggage',
        price: getRandomInteger(25,35),
      }, {
        id: 'comfort',
        title: 'Switch to comfort class',
        price: getRandomInteger(30,80),
      }, {
        id: 'meal',
        title: 'Add meal',
        price: getRandomInteger(15,30),
      }, {
        id: 'seats',
        title: 'Choose seats',
        price: getRandomInteger(5,10),
      }, {
        id: 'train',
        title: 'Travel by train',
        price: getRandomInteger(10,40),
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 'breakfast',
        title: 'Add breakfast',
        price: getRandomInteger(10,100),
      }, {
        id: 'lunch',
        title: 'Add lunch',
        price: getRandomInteger(10,100),
      }, {
        id: 'dinner',
        title: 'Add dinner',
        price: getRandomInteger(10,100),
      },
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 'tickets',
        title: 'Book tickets',
        price: getRandomInteger(40,60),
      }, {
        id: 'lunch',
        title: 'Lunch in city',
        price: getRandomInteger(30,50),
      },
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 'book',
        title: 'Book a table',
        price: getRandomInteger(50,100),
      }
    ]
  }
];
