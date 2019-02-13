// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

class GlobalAccountFragmentVoterInfoVotes extends PureComponent<Props> {
  render() {
    const {
      votes,
    } = this.props;
    return (
      <React.Fragment>
        {votes}
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  let proxy;
  let voter = get(state, `accounts.${ownProps.account}.voter_info`, {});
  // The get call above will return null as a retrieved value, and if so, set to {}
  if (voter === null) {
    voter = {};
  }
  if (voter.proxy) {
    ({ proxy } = voter);
    voter = get(state, `accounts.${voter.proxy}.voter_info`, {});
  }
  const votes = get(voter, 'producers', []).length;
  return ({
    proxy,
    votes,
  });
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoVotes);
