// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon } from 'semantic-ui-react';

class WalletStatusActionsTableRowBuyrambytes extends Component<Props> {
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
          name="database"
          size="large"
        />
        {`${t('actions_table_row_buyrambytes_text_one')} ${(data.bytes/1024).toFixed(3)} KB ${t('actions_table_row_of_ram')}.`}
      </React.Fragment>
    );
  }
}

export default translate('actions')(WalletStatusActionsTableRowBuyrambytes);
