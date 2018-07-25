// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowNewaccount extends Component<Props> {
  render() {
    const {
      action,
      t
    } = this.props;
    const {
      data
    } = action.action_trace.act;

    const newAccount = data.name;

    return (
      <React.Fragment>
        <Icon
          floated="left"
          name="angle double down"
          size="large"
        />
        { `${t('actions_table_row_newaccount_text_one')} ${newAccount}.` }
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowNewaccount);
