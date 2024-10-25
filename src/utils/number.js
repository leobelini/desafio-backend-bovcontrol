const formatPrice = (value, locale, currency) => Intl.NumberFormat(locale, {
  style: 'decimal',
  currency,
}).format(value);

export default formatPrice;
