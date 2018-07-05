// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowRefund extends Component<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="arrow circle up"
          size="large"
        />
        { t('actions_table_row_refund_text') }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowRefund);
