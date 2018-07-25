// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowClaim extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;

    const {
      data
    } = action.action_trace.act;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="arrow down"
          size="large"
        />
        { `${t('actions_table_row_claim_text_one')} ${data.quantity} ${t('actions_table_row_transfer_from')} ${data.from}.` }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowClaim);
