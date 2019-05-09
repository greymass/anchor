// @flow
import { get } from 'dot-prop-immutable';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

class GlobalAccountFragmentTokenBalance extends PureComponent<Props> {
  render() {
    const {
      balance,
      lng,
      precision,
    } = this.props;
    if (balance === false) return <Icon color="grey" name="clock outline" />;
    const formatter = new Intl.NumberFormat(lng, { minimumFractionDigits: precision });
    return (
      <React.Fragment>
        {formatter.format(balance.toFixed(precision))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const account = ownProps.account.replace('.', '\\.');
  const loaded = !isEmpty(get(state, `balances.${account}`));
  const defaultValue = loaded ? 0 : false;
  return {
    balance: get(state, `balances.${account}.${ownProps.token}`, defaultValue),
    precision: get(state, `balances.__contracts.${ownProps.token}.precision.${ownProps.token}`, 4),
  };
};

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(GlobalAccountFragmentTokenBalance);
