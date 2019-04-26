// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentTokenDelegated extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
    } = this.props;
    if (balance === false) return <Icon name="clock" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: 4 });
    return (
      <React.Fragment>
        {formatter.format(balance.toFixed(4))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  balance: get(state, `accounts.${ownProps.account}.delegated.total`, false)
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenDelegated);
