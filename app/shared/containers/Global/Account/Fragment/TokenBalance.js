// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';

class GlobalAccountFragmentTokenBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
      precision,
    } = this.props;
    if (balance === false) return <Icon name="clock" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <React.Fragment>
        {formatter.format(balance.toFixed(precision))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  balance: get(state, `balances.${ownProps.account}.${ownProps.token}`, false),
  precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`, false),
});

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenBalance);
