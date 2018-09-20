import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';

const defaultContract = 'eosforumrcpp';

export function getProposals(scope = 'eosforumdapp', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: defaultContract,
      scope,
      table: 'proposal',
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
        return dispatch(getReferendums(rows));
      }
      dispatch(getVoteInfo(scope, settings.account));
      // dispatch(getVoteInfo(scope, settings.account));
      const data = rows
        .map((proposal) => {
          const {
            proposal_json,
            proposal_name,
            title
          } = proposal;
          let json = false;
          let valid = true;
          try {
            json = JSON.parse(proposal_json);
          } catch (err) {
            valid = false;
          }
          return {
            json,
            proposal_json,
            proposal_name,
            title,
            valid
          };
        });
      const proposals = sortBy(data, 'proposal_name');
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

function formatBounds(string, prefix = '0') {
  let formatted = new Array(33).join(prefix);
  formatted += string;
  formatted = formatted.substring(string.length);
  formatted = formatted.toUpperCase();
  return `0x${formatted}`;
}

export function getVoteInfo(scope, account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_PENDING
    });
    const { connection } = getState();
    const formatted = eos(connection).modules.format.encodeNameHex(account, true)
    const lower_bound = formatBounds(formatted);
    const upper_bound = formatBounds(formatted, 'F');
    const query = {
      json: true,
      code: defaultContract,
      scope,
      table: 'vote',
      limit: 1000,
      index_position: 3,
      key_type: 'i128',
      lower_bound,
      upper_bound
    };
    eos(connection).getTableRows(query).then((results) => {
      let { rows } = results;
      const votes = rows
        .map((data) => {
          const {
            id,
            proposal_name,
            updated_at,
            vote,
            vote_json,
            voter
          } = data;
          let json = false;
          let valid = true;
          try {
            json = JSON.parse(proposal_json);
          } catch (err) {
            valid = false;
          }
          return {
            id,
            json,
            proposal_name,
            updated_at,
            vote,
            vote_json,
            voter
          };
        });
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS,
        payload: {
          account,
          scope,
          votes,
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_FAILURE,
      payload: { err },
    }));
  }
};

export function unvoteProposal(scope, voter, proposal_name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_UNVOTE_PROPOSAL_PENDING
    });
    const { connection, settings } = getState();
    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [
        {
          account: defaultContract,
          name: 'unvote',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            voter,
            proposal_name
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getVoteInfo(scope, account));
      }, 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_GOVERNANCE_UNVOTE_PROPOSAL_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_GOVERNANCE_UNVOTE_PROPOSAL_FAILURE
    }));
  };
}

export function voteProposal(scope, voter, proposal_name, vote, vote_json) {
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
            voter,
            proposal_name,
            vote,
            vote_json
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(getVoteInfo(scope, account));
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
  getProposals,
  unvoteProposal,
  voteProposal
};
