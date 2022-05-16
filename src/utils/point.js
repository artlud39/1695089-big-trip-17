import dayjs from 'dayjs';

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

export {humanizeTaskdate, yearMonthDayDate, hoursMinutesDate, fullDate, editFullDate, getDurationTripDate};
