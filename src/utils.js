import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTaskdate = (date) => dayjs(date).format('MMM D');
const yearMonthDayDate = (date) => dayjs(date).format('YYYY-MM-DD');
const hoursMinutesDate = (date) => dayjs(date).format('hh:mm');
const fullDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const editFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getDurationTripDate = (dayStart, dayEnd) => {
  const date1 = dayjs(dayStart);
  const date2 = dayjs(dayEnd);
  let minutes = date2.diff(date1, 'minutes');
  const hours = Math.floor(minutes/60);
  minutes = minutes - (hours * 60);
  return `${hours}H ${minutes}M`;
};

export {getRandomInteger, humanizeTaskdate, yearMonthDayDate, hoursMinutesDate, fullDate, editFullDate, getDurationTripDate};
