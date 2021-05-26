// @flow
import { get } from 'dot-prop-immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentVoterInfoEffectiveness extends Component<Props> {
  render() {
    const {
      last,
      voteDecay,
      producers,
      proxied,
      proxy,
      staked,
      voteDecayPeriod,
    } = this.props;
    // If no votes exist, don't display decay
    if (
      !last
      || last === '0.00000000000000000'
      || (
        producers === 0
        && proxy === ''
      )
    ) {
      return (
        <React.Fragment>
          None
        </React.Fragment>
      );
    }
    const stake = Number(staked);
    const selfWeight = last - proxied;
    // If there's on self weight, don't display decay
    if (selfWeight <= 0) {
      return (
        <React.Fragment>
          None
        </React.Fragment>
      );
    }

    if (voteDecay) {
      return (
        <React.Fragment>
          100.00 %
        </React.Fragment>
      );
    }
    const epoch = 946684800;
    const current = Math.round((new Date()).getTime() / 1000);
    const doubleWeight =
      parseInt((current - epoch) / (24 * 60 * 60 * 7), 10) * parseFloat(1 / voteDecayPeriod || 52);
    const newVoteWeight = (stake) * (2 ** doubleWeight);
    const ratio = (selfWeight) / newVoteWeight;
    const effectiveness = (ratio * 100).toFixed(2);
    return (
      <React.Fragment>
        {effectiveness}%
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  // const epoch = Date.parse(get(state, 'globals.current')) / 1000;
  let voter = get(state, `accounts.${account}.voter_info`, {});
  const voteDecayPeriod = get(state, 'connection.voteDecayPeriod');
  const voteDecay = get(state, 'connection.voteDecay');
  // The get call above will return null as a retrieved value, and if so, set to {}
  if (!voter) {
    voter = {
      producers: []
    };
  }

  return {
    // epoch,
    last: voter.last_vote_weight,
    voteDecay,
    producers: (voter.producers) ? voter.producers.length : [],
    proxy: voter.proxy,
    proxied: voter.proxied_vote_weight,
    staked: voter.staked,
    voteDecayPeriod,
  };
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoEffectiveness);
