import { get } from 'dot-prop-immutable';

export default function fetchMaturedBalance(tables, account) {
  const rexMaturities = get(tables, `eosio.eosio.rexbal.${account}.rows.0.rex_maturities`, []);
  let maturedMaturitiesTotal = 0;

  rexMaturities.forEach(maturity => {
    const datetime = maturity.key || maturity.first;
    const value = maturity.second || maturity.value;
    if (new Date(`${datetime}Z`) < new Date()) {
      maturedMaturitiesTotal += Number(value);
    }
  });

  const maturedRexNumber = Number(get(tables, `eosio.eosio.rexbal.${account}.rows.0.matured_rex`, 0));

  return `${(maturedRexNumber + maturedMaturitiesTotal) / 10000} REX`;
}
