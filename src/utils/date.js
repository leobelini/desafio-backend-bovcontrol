const dayjs = require('dayjs');

const getSemester = (date) => {
  const month = dayjs(date).month();
  return month < 6 ? 1 : 2;
};

const splitDate = (date) => {
  const internalDate = dayjs(date);
  const day = internalDate.date();
  const month = internalDate.month();
  const year = internalDate.year();
  return { day, month: month + 1, year };
};

const getTotalDaysInMonth = (date) => {
  const total = dayjs(date).daysInMonth();
  return total;
};

module.exports = {
  getSemester,
  splitDate,
  getTotalDaysInMonth,
};
