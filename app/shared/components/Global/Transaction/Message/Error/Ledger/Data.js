import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export class GlobalTransactionMessageErrorLedgerData extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;
    return (
      <Segment color="red" size="large">
        <Header size="medium">
          <Icon name="warning sign" />
          <Header.Content>
            Enable "Contract Data" on Ledger device
            <Header.Subheader>
              In order to sign this transaction, a setting needs to be enabled on the Ledger device.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>To enable this setting:</p>
        <List relaxed bulleted>
          <List.Item>Open the EOS app on your Ledger device.</List.Item>
          <List.Item>Cycle through the menu and find the "Settings" option.</List.Item>
          <List.Item>Press both buttons to enter the settings list.</List.Item>
          <List.Item>In settings, cycle through the items and find the "Contract Data" option.</List.Item>
          <List.Item>Press both buttons to change the option until it says "Allowed" at the bottom.</List.Item>
          <List.Item>Cycle again through the settings to find the "Back" button, then click both buttons to return to the main interface.</List.Item>
          <List.Item>With this new setting enabled, try your transaction again.</List.Item>
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

export default withTranslation('global')(GlobalTransactionMessageErrorLedgerData);
