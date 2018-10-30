import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';

const defaultContract = 'eosio.work';

export function claimProposal(proposal_id) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_CLAIMPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'claim',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            proposal_id
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_CLAIMPROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_CLAIMPROPOSAL_FAILURE
    }));
  };
}

export function createProposal(title, ipfs_location, cycles, amount, send_to) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'submission',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            proposer: account,
            title,
            text: '',
            cycles,
            ipfs_location,
            amount,
            send_to
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_CREATEPROPOSAL_FAILURE
    }));
  };
}

export function getProposals(scope = 'eosio.work', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: defaultContract,
      scope,
      table: 'proposals',
      limit: 1000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].proposal_name;
    }
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getProposals(scope, rows));
      }
      dispatch(getVoteInfo(settings.account));
      const data = rows
        .map((proposal) => {
          const {
            id,
            title,
            ipfs_location,
            text_hash,
            cycles,
            amount,
            send_to,
            fee,
            proposer,
            yes_count,
            no_count,
            last_cycle_check,
            last_cycle_status,
            created,
            outstanding
          } = proposal;
          return {
            id,
            title,
            ipfs_location,
            text_hash,
            cycles,
            amount,
            send_to,
            fee,
            proposer,
            yes_count,
            no_count,
            last_cycle_check,
            last_cycle_status,
            created,
            outstanding
          };
        });
      const proposals = sortBy(data, 'id').reverse();
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS,
        payload: {
          proposals,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getVoteInfo(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'trailservice',
      scope: account,
      table: 'voters',
      limit: 1000
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      let { receipt_list } = rows[0];
      const votes = receipt_list
        .map((data) => {
          const {
            vote_code,
            vote_scope,
            vote_key, // proposal id
            direction, // vote 0=NO, 1=YES, 2=ABSTAIN
            weight,
            expiration
          } = data;
          return {
            vote_code,
            vote_scope,
            vote_key,
            direction,
            weight,
            expiration
          };
        });
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS,
        payload: {
          account,
          votes,
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_FAILURE,
      payload: { err },
    }));
  }
};

export function registerVoter(voter) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_REGVOTER_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: 'trailservice',
          name: 'regvoter',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            voter
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_REGVOTER_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_REGVOTER_FAILURE
    }));
  };
}

export function voteProposal(voter, proposal_id, direction) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'vote',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            proposal_id,
            direction,
            voter
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getVoteInfo(account));
      }, 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_VOTE_PROPOSAL_FAILURE
    }));
  };
}

export default {
  claimProposal,
  createProposal,
  getProposals,
  registerVoter,
  voteProposal
};