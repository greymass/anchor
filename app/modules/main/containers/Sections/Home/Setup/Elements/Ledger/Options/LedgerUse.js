// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { List } from 'semantic-ui-react';

class AccountSetupElementsLedgerOptionsLedgerUse extends Component<Props> {
  render() {
    return (
      <List divided relaxed="very">
        <List.Item>
          <List.Header>Certificate for Account Recovery (Owner Permission)</List.Header>
          <List.Description>An owner key certificate will be created during this process and be required to recovery this account.</List.Description>
        </List.Item>
        <List.Item>
          <List.Header>Ledger for Account Usage (Active Permission)</List.Header>
          <List.Description>The account will require the Ledger to be connected in order to use.</List.Description>
        </List.Item>
      </List>
    );
  }
}

export default withTranslation('global')(AccountSetupElementsLedgerOptionsLedgerUse);
