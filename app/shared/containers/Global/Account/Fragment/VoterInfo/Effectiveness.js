// @flow
import { get } from 'dot-prop-immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentVoterInfoEffectiveness extends Component<Props> {
  render() {
    const {
      last,
      producers,
      proxied,
      proxy,
      staked,
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
    const epoch = 946684800;
    const current = Math.round((new Date()).getTime() / 1000);
    const doubleWeight = parseInt((current - epoch) / (24 * 60 * 60 * 7), 10) * parseFloat(1 / 52);
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
  let voter = get(state, `accounts.${ownProps.account}.voter_info`, {});
  // The get call above will return null as a retrieved value, and if so, set to {}
  if (voter === null) {
    voter = {
      producers: []
    };
  }
  return {
    last: voter.last_vote_weight,
    producers: voter.producers.length,
    proxy: voter.proxy,
    proxied: voter.proxied_vote_weight,
    staked: voter.staked,
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoEffectiveness);
