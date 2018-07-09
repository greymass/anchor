import { Decimal } from 'decimal.js';

export default function calculateAmountOfRam(baseBalance, quoteBalance, EOSAmount) {
  const R = baseBalance;
  const C = quoteBalance.plus(EOSAmount);
  const F = 1.0;

  return (0).minus(R.times(1.0.minus(Decimal.pow((1.0).plus(EOSAmount).dividedBy(C), F))))
}
