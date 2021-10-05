import { Asset, Name, Struct } from '@greymass/eosio';

import { find } from 'lodash';

// Validate the transaction
async function validateTransaction(signer, modifiedTransaction, serializedTransaction, costs = false) {
  // Ensure the first action is the `greymassnoop:noop`
  validateNoop(modifiedTransaction);

  // Ensure the actions within the transaction match what was provided
  await validateActions(signer, modifiedTransaction, serializedTransaction, costs);
}

// Validate the actions of the modified transaction vs the original transaction
async function validateActions(signer, modifiedTransaction, deserializedTransaction, costs) {
  // Determine how many actions we expect to have been added to the transaction based on the costs
  const expectedNewActions = determineExpectedActionsLength(costs, modifiedTransaction.actions);

  // Ensure the proper number of actions was returned
  validateActionsLength(expectedNewActions, modifiedTransaction, deserializedTransaction);

  // Ensure the appended actions were expected
  await validateActionsContent(signer, expectedNewActions, modifiedTransaction, deserializedTransaction, costs);
}

// Validate the number of actions is the number expected
function determineExpectedActionsLength(costs, actions = []) {
  // By default, 1 new action is appended (noop)
  let expectedNewActions = 1;

  // Check to see if Fuel is buying RAM for the account
  const fuelBuyRam = find(actions, (action) => {
    const isBuyRam = action.name === 'buyram' && action.account === 'eosio';
    const fuelAuthorized = action.authorization.length === 1 && action.authorization[0].actor === 'greymassfuel';
    return isBuyRam && fuelAuthorized;
  });
  if (fuelBuyRam) {
    expectedNewActions += 1;
  }

  // If there are costs associated with this transaction, 1 new actions is added (the fee)
  if (costs) {
    expectedNewActions += 1;
  }

  return expectedNewActions;
}

// Validate the contents of each action
async function validateActionsContent(signer, expectedNewActions, modifiedTransaction, deserializedTransaction, costs) {
  // Make sure the originally requested actions are still intact and unmodified
  validateActionsOriginalContent(expectedNewActions, modifiedTransaction, deserializedTransaction);

  // If a fee has been added, ensure the fee is set properly
  if (costs) {
    await validateActionsFeeContent(signer, modifiedTransaction);
  }
}

class Transfer extends Struct {
    static abiName = 'transfer'
    static abiFields = [
      {
        name: 'from',
        type: Name,
      },
      {
        name: 'to',
        type: Name,
      },
      {
        name: 'quantity',
        type: Asset,
      },
      {
        name: 'memo',
        type: 'string',
      },
    ]
}

// Ensure the transaction fee transfer is valid
async function validateActionsFeeContent(signer, modifiedTransaction) {
  const feeAction = find(modifiedTransaction.actions, {
    account: 'eosio.token',
    name: 'transfer',
  });
  const transfer = Transfer.from(feeAction);
  if (!transfer.data.to.equals(Name.from('fuel.gm'))) {
    throw new Error('Fee action was deemed invalid.');
  }
}

// Make sure the actions returned in the API response match what was submitted
function validateActionsOriginalContent(expectedNewActions, modifiedTransaction, deserializedTransaction) {
  for (const [i, v] of modifiedTransaction.actions.entries()) {
    // Skip the expected new actions
    if (i < expectedNewActions) continue;
    // Compare each action to the originally generated actions
    if (
      !modifiedTransaction.actions[i]
      || modifiedTransaction.actions[i].account !== deserializedTransaction.actions[i - expectedNewActions].account
      || modifiedTransaction.actions[i].name !== deserializedTransaction.actions[i - expectedNewActions].name
      || modifiedTransaction.actions[i].authorization.length !== deserializedTransaction.actions[i - expectedNewActions].authorization.length
      || modifiedTransaction.actions[i].authorization[0].actor !== deserializedTransaction.actions[i - expectedNewActions].authorization[0].actor
      || modifiedTransaction.actions[i].authorization[0].permission !== deserializedTransaction.actions[i - expectedNewActions].authorization[0].permission
      || modifiedTransaction.actions[i].data.toLowerCase() !== deserializedTransaction.actions[i - expectedNewActions].data.toLowerCase()
    ) {
      const { account, name } = deserializedTransaction.actions[i - expectedNewActions];
      throw new Error(`Transaction returned by API has non-matching action at index ${i} (${account}:${name})`);
    }
  }
}

// Ensure no unexpected actions were appended in the response
function validateActionsLength(expectedNewActions, modifiedTransaction, deserializedTransaction) {
  if (modifiedTransaction.actions.length !== deserializedTransaction.actions.length + expectedNewActions) {
    throw new Error('Transaction returned contains additional actions.');
  }
}

// Make sure the first action is the greymassnoop:noop and properly defined
function validateNoop(modifiedTransaction) {
  if (
    modifiedTransaction.actions[0].account !== 'greymassnoop'
    || modifiedTransaction.actions[0].name !== 'noop'
    || modifiedTransaction.actions[0].authorization[0].actor !== 'greymassfuel'
    || modifiedTransaction.actions[0].authorization[0].permission !== 'cosign'
    || modifiedTransaction.actions[0].data !== ''
  ) {
    throw new Error('First action within transaction response is not valid greymassnoop:noop.');
  }
}

export default {
  validateTransaction,
  validateActions,
  determineExpectedActionsLength,
  validateActionsContent,
  validateActionsFeeContent,
  validateActionsOriginalContent,
  validateActionsLength,
  validateNoop,
};
