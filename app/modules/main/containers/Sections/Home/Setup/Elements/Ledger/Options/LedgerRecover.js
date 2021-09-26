// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { List } from 'semantic-ui-react';

class AccountSetupElementsLedgerOptionsLedgerRecover extends Component<Props> {
  render() {
    return (
      <List divided relaxed="very">
        <List.Item>
          <List.Header>Ledger for Account Recovery (Owner Permission)</List.Header>
          <List.Description>Recovering this account will require the use of this Ledger device.</List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Anchor for Account Usage (Active Permission)</List.Header>
          <List.Description>The account will be usable without needing the Ledger device.</List.Description>
        </List.Item>
      </List>
    );
  }
}

export default withTranslation('global')(AccountSetupElementsLedgerOptionsLedgerRecover);
