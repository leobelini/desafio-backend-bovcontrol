const dayjs = require("dayjs");

const getSemester = (date) => {
  const month = dayjs(date).month();
  return month < 6 ? 1 : 2;
};

module.exports = {
  getSemester,
};
