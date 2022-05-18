import dayjs from 'dayjs';

const humanizeTaskdate = (date) => dayjs(date).format('MMM DD');
const yearMonthDayDate = (date) => dayjs(date).format('YYYY-MM-DD');
const hoursMinutesDate = (date) => dayjs(date).format('hh:mm');
const fullDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const editFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const isSameMonth = (dateFrom, dateTo) => dayjs(dateFrom).format('MMM') === dayjs(dateTo).format('MMM');

const getDurationTripDate = (dayStart, dayEnd) => {
  const date1 = dayjs(dayStart);
  const date2 = dayjs(dayEnd);
  let minutes = date2.diff(date1, 'minutes');
  const hours = Math.floor(minutes/60);
  minutes = minutes - (hours * 60);
  return `${hours}H ${minutes}M`;
};

const getPeriodTripDayMonth = (points) => {
  if (points.length === 1) {
    return humanizeTaskdate(points[0].dateFrom);
  }
  const start = points[0].dateFrom;
  const finish =points[points.length - 1].dateTo;
  return isSameMonth(start,finish)
    ? `${humanizeTaskdate(start)}&nbsp;&mdash;&nbsp;${dayjs(finish).format('DD')}`
    : `${humanizeTaskdate(start)}&nbsp;&mdash;&nbsp;${humanizeTaskdate(finish)}`;
};

const getFullWayCities = (points) => {
  const uniqueVisitedCities = new Set();
  points.forEach((point) => {
    uniqueVisitedCities.add(point.destination.name);
  });
  return uniqueVisitedCities.size > 3
    ?`${points[0].destination.name} &mdash; ... &mdash; ${points[points.length -1].destination.name}`
    :`${[...uniqueVisitedCities].join(' &mdash; ')}`;
};

export {
  humanizeTaskdate,
  yearMonthDayDate,
  hoursMinutesDate,
  fullDate,
  editFullDate,
  getDurationTripDate,
  getPeriodTripDayMonth,
  getFullWayCities,
};
