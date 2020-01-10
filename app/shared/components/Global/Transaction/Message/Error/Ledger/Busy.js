import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export class GlobalTransactionMessageErrorLedgerBusy extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;
    return (
      <Segment basic color="red" size="large">
        <Header size="medium">
          <Icon name="warning sign" />
          <Header.Content>
            Ledger Device Busy
            <Header.Subheader>
              The Ledger device is currently trying to process a different transaction.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>Before trying this transaction again, address this issue by taking one or more of the following steps:</p>
        <List relaxed bulleted>
          <List.Item>Clear any pending transactions on the Ledger device.</List.Item>
          <List.Item>Reconnect the Ledger to the computer.</List.Item>
        </List>
        {(typeof error === 'object' && error.json) ? (
          <ReactJson
            collapsed={1}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error.json.error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </Segment>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorLedgerBusy);
