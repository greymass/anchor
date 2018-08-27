import concat from 'lodash/concat';
import sortBy from 'lodash/sortBy';

import * as types from '../types';
import eos from '../helpers/eos';

export function getProposals(scope = 'eosforumdapp', previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_PENDING
    });
    const { connection, settings } = getState();
    const query = {
      json: true,
      code: 'cancancan123',
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
          dispatch(getVoteInfo(scope, proposal.proposal_name, settings.account))
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

export function getVoteInfo(scope, proposal, voter) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_PENDING
    });
    const { connection } = getState();
    const formatted = eos(connection).modules.format.encodeNameHex(voter, true)
    const lower_bound = ('0x' + ('00000000000000000000000000000000' + formatted).substring(formatted.length).toUpperCase())
    const upper_bound = ('0x' + ('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF' + formatted).substring(formatted.length).toUpperCase())
    console.log(scope)
    console.log(proposal)
    console.log(lower_bound)
    console.log(upper_bound)
    const query = {
      json: true,
      code: 'cancancan123',
      scope,
      table: 'vote',
      limit: 1000,
      index_position: 2,
      key_type: 'i128',
      lower_bound,
      upper_bound
    };
    // if (previous) {
    //   query.lower_bound = previous[previous.length - 1].proposal_name;
    // }
    eos(connection).getTableRows(query).then((results) => {
      console.log(results)
      let { rows } = results;
      // If previous rows were returned
      // if (previous) {
      //   // slice last element to avoid dupes
      //   previous.pop();
      //   // merge arrays
      //   rows = concat(previous, rows);
      // }
      // // if there are missing results
      // if (results.more) {
      //   return dispatch(getReferendums(rows));
      // }
      const data = rows
        .map((vote) => {
          // const {
          //   proposal_json,
          //   proposal_name,
          //   title
          // } = proposal;
          // let json = false;
          // let valid = true;
          // try {
          //   json = JSON.parse(proposal_json);
          // } catch (err) {
          //   valid = false;
          // }
          console.log(vote)
          return {
            // json,
            // proposal_json,
            // proposal_name,
            // title,
            // valid
          };
        });
      const proposals = sortBy(data, 'proposal_name');
      return dispatch({
        type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS,
        payload: {
          proposals,
          scope
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_FAILURE,
      payload: { err },
    }));
  }
};


export function vote(voter, proposer, proposal_name, proposal_json, vote, vote_json) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GOVERNANCE_GET_PROPOSALS_PENDING
    });
    const { connection } = getState();
    // eos(connection).getTableRows(query).then((results) => {
  };
}

export default {
  getProposals,
  vote
};
