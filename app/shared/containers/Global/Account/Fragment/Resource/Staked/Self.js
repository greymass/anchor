// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Popup } from 'semantic-ui-react';

import GlobalAccountFragmentTokenBalance from '../../TokenBalance';

const prettyBytes = require('pretty-bytes');
const humanizeDuration = require('humanize-duration')

class GlobalAccountFragmentResourceStakedSelf extends PureComponent<Props> {
  render() {
    const {
      account,
      resource,
    } = this.props;
    if (!resource) return false;
    const [quantity, symbol] = resource.split(' ');
    return (
      <React.Fragment>
        <GlobalAccountFragmentTokenBalance
          account={account}
          balance={parseFloat(quantity)}
          token={symbol}
        />
        {` ${symbol}`}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  return {
    account: ownProps.account,
    resource: get(state.accounts, `${account}.self_delegated_bandwidth.${ownProps.type}_weight`),
    settings: state.settings,
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentResourceStakedSelf);
