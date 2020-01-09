import { map } from 'lodash';

export default function isUnlocked(state) {
  // Retrieve needed data from state
  const { auths, wallet } = state;
  console.log(state)
  // If missing data, its not unlocked
  if (!wallet || !auths) return false;
  // The currently loaded wallet
  const { pubkey } = wallet;
  // The currently unlocked wallets
  const available = map(auths.keystore, 'pubkey');
  // Determine if this wallet is unlocked
  return available.includes(pubkey);
}
