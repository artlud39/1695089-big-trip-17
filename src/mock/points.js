import {getRandomInteger} from '../utils/common.js';
import {generatePointType} from './type.js';
import {destinationsCities} from './destination.js';
import {offersType} from './offers.js';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const generateDate = (dayStart, dayEnd) => {
  const daysGap = getRandomInteger(dayStart, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

export const generatePoints = () => ({
  type: generatePointType(),
  dateFrom: generateDate(0,2),
  dateTo: generateDate(3,5),
  basePrice: getRandomInteger(200,1500),
  isFavorite: Boolean(getRandomInteger(0,1)),
  destination: destinationsCities[getRandomInteger(0,destinationsCities.length - 1)],
  offers: offersType[getRandomInteger(0,offersType.length - 1)].offers,
  id: nanoid(),
});
