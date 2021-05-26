// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

import ExplorerLink from '../../../Blockchain/ExplorerLink';

class GlobalAccountFragmentVoterInfoProxy extends PureComponent<Props> {
  render() {
    const {
      proxy,
    } = this.props;
    if (!proxy) return false;
    return (
      <ExplorerLink
        content={proxy}
        linkData={proxy}
        linkType="account"
      />
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace(/\./g, '\\.');
  let proxy;
  let voter = get(state, `accounts.${account}.voter_info`, {});
  // The get call above will return null as a retrieved value, and if so, set to {}
  if (voter === null) {
    voter = {};
  }
  if (voter.proxy) {
    ({ proxy } = voter);
  }
  return ({
    proxy,
  });
};

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentVoterInfoProxy);
