import {getRandomInteger} from '../utils.js';
import {generateType} from './type.js';
import dayjs from 'dayjs';

const generateDate = (dayBegin, dayEnd) => {
  const daysGap = getRandomInteger(dayBegin, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

export const generateTask = () => ({
  type: generateType(),
  dateFrom: generateDate(0,3),
  dateTo: generateDate(3,5),
  price: getRandomInteger(200,1500),
  isFavorite: Boolean(getRandomInteger(0,1)),
  destination: {},
  offers: [],
  id: getRandomInteger(1,10),
});
