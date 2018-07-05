import { Decimal } from 'decimal.js';

export default function calculatePriceOfRam(baseBalance, quoteBalance, amount) {
  const R = baseBalance.minus(amount);
  const C = quoteBalance;
  const F = 1.0;

  return C.times(Decimal.pow(amount.div(R).plus(1.0), F).minus(1.0));
}
