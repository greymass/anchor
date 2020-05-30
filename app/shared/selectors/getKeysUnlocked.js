import { createSelector } from 'reselect';
import { map } from 'lodash';

const getPubkeysAvailable = (state) => state.storage.keys;
const getPubkeysUnlocked = (state) => state.auths.keystore;

const makeGetKeysUnlocked = () => createSelector(
  [
    getPubkeysAvailable,
    getPubkeysUnlocked
  ],
  (available, unlocked) => ({
    available,
    unlocked: map(unlocked, 'pubkey'),
  })
);

export default makeGetKeysUnlocked;
