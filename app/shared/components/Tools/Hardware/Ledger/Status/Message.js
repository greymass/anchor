// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Message } from 'semantic-ui-react';

class ToolsHardwareLedgerStatusMessage extends Component<Props> {
  render() {
    const {
      ledger,
      status,
      t,
    } = this.props;
    const {
      application
    } = ledger;
    // Hide connecting message if version has been retrieved or if not trying to connect
    if (!status || (application && application.version)) {
      return false;
    }
    return (
      <Message attached icon>
        <Icon
          loading
          name="circle notched"
        />
        <Message.Content>
          <Message.Header>
            {t(`ledger_status_${status}_header`)}
          </Message.Header>
          {t(`ledger_status_${status}_subheader`)}
        </Message.Content>
      </Message>
    );
  }
}

export default translate('ledger')(ToolsHardwareLedgerStatusMessage);
