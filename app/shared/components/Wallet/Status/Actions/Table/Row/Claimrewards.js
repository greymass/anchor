// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowClaimrewards extends Component<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="arrow down"
          size="large"
        />
        { t('actions_table_row_claimrewards_text_one') }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowClaimrewards);
