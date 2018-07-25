// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowUpdateauth extends Component<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="key"
          size="large"
        />
        { t('actions_table_row_update_auth_text') }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowUpdateauth);
