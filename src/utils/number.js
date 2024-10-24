const formatPrice = (value, locale, currency) => {
  return Intl.NumberFormat(locale, {
    style: "decimal",
    currency,
  }).format(value);
};

module.exports = { formatPrice };
