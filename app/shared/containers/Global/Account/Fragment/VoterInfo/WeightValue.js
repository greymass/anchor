// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentVoterInfoWeightValue extends PureComponent<Props> {
  render() {
    const {
      lng,
      weight,
    } = this.props;
    if (!weight) {
      return (
        <React.Fragment>
          ~
        </React.Fragment>
      );
    }
    const epoch = 946684800;
    const current = Math.round((new Date()).getTime() / 1000);
    const doubleWeight = parseInt((current - epoch) / (24 * 60 * 60 * 7), 10) * parseFloat(1 / 52);
    const value = (weight) / (2 ** doubleWeight);
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <React.Fragment>
        {formatter.format((value / 10000).toFixed(4))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let voter = get(state, `accounts.${ownProps.account}.voter_info`, {});
  // The get call above will return null as a retrieved value, and if so, set to {}
  if (voter === null) {
    voter = {};
  }
  return {
    weight: voter.last_vote_weight
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoWeightValue);
