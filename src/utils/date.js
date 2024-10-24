const dayjs = require("dayjs");

const getSemester = (date) => {
  const month = dayjs(date).month();
  return month < 6 ? 1 : 2;
};

const splitDate = (date) => {
  const _date = dayjs(date);
  const day = _date.day();
  const month = _date.month();
  const year = _date.year();
  return { day, month: month + 1, year };
};

module.exports = {
  getSemester,
  splitDate,
};
