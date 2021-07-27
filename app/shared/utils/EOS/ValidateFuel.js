// Validate the transaction
async function validateTransaction(signer, modifiedTransaction, serializedTransaction, costs = false) {
  // Ensure the first action is the `greymassnoop:noop`
  validateNoop(modifiedTransaction);

  // Ensure the actions within the transaction match what was provided
  await validateActions(signer, modifiedTransaction, serializedTransaction, costs);
}

// Validate the actions of the modified transaction vs the original transaction
async function validateActions(signer, modifiedTransaction, deserializedTransaction, costs) {
  // // Deserialize the transaction for comparision purposes
  // const deserializedTransaction = api.deserializeTransaction(serializedTransaction.serializedTransaction);

  // Determine how many actions we expect to have been added to the transaction based on the costs
  const expectedNewActions = determineExpectedActionsLength(costs);

  // Ensure the proper number of actions was returned
  validateActionsLength(expectedNewActions, modifiedTransaction, deserializedTransaction);

  // Ensure the appended actions were expected
  await validateActionsContent(signer, expectedNewActions, modifiedTransaction, deserializedTransaction);
}

// Validate the number of actions is the number expected
function determineExpectedActionsLength(costs) {
  // By default, 1 new action is appended (noop)
  let expectedNewActions = 1;

  // If there are costs associated with this transaction, 1 new actions is added (the fee)
  if (costs) {
    expectedNewActions += 1;
    // If there is a RAM cost associated with this transaction, 1 new actio is added (the ram purchase)
    if (costs.ram !== '0.0000 EOS') {
      expectedNewActions += 1;
    }
  }

  return expectedNewActions;
}

// Validate the contents of each action
async function validateActionsContent(signer, expectedNewActions, modifiedTransaction, deserializedTransaction) {
  // Make sure the originally requested actions are still intact and unmodified
  validateActionsOriginalContent(expectedNewActions, modifiedTransaction, deserializedTransaction);

  // If a fee has been added, ensure the fee is set properly
  if (expectedNewActions > 1) {
    await validateActionsFeeContent(signer, modifiedTransaction);
    // If a ram purchase has been added, ensure the purchase was set properly
    if (expectedNewActions > 2) {
      await validateActionsRamContent(signer, modifiedTransaction);
    }
  }
}

// Ensure the transaction fee transfer is valid
async function validateActionsFeeContent(signer, modifiedTransaction) {
  const [feeAction] = await api.deserializeActions([modifiedTransaction.actions[1]]);
  if (
    feeAction.account !== 'eosio.token'
      || feeAction.name !== 'transfer'
      || feeAction.data.to !== 'fuel.gm'
  ) {
    throw new Error('Fee action was deemed invalid.');
  }
}

// Ensure the RAM purchasing action is valid
async function validateActionsRamContent(signer, modifiedTransaction) {
  const [ramAction] = await api.deserializeActions([modifiedTransaction.actions[2]]);
  if (
    ramAction.account !== 'eosio'
    || !['buyram', 'buyrambytes'].includes(ramAction.name)
    || ramAction.data.payer !== 'greymassfuel'
    || ramAction.data.receiver !== signer.actor
  ) {
    throw new Error('RAM action was deemed invalid.');
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

export {
  validateTransaction,
  validateActions,
  determineExpectedActionsLength,
  validateActionsContent,
  validateActionsFeeContent,
  validateActionsRamContent,
  validateActionsOriginalContent,
  validateActionsLength,
  validateNoop,
};
