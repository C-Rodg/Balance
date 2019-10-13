// Convert a number 178 -> $01.78
export const convertAmountToCurrencyString = ({
  amount,
  minimumIntegerDigits = 2,
  currency = 'USD',
}) => {
  const calculatedNumber = amount / 100;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumIntegerDigits,
  });
  return formatter.format(calculatedNumber);
};
