// @flow
import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export default class WalletStatus extends Component<Props> {
  render() {
    const { accounts, settings } = this.props;
    const accountName = settings.account;
    const account = accounts[accountName];
    const server = settings.node;
    let element = `No account data loaded yet (using ${server})...`;
    if (account) {
      element = (
        <div>
          <Header>
            Account: {accountName}
            <Header.Subheader>
              connected to: {server}
            </Header.Subheader>
          </Header>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={account}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </div>
      );
    }
    return (
      <Segment basic>
        {element}
      </Segment>
    );
  }
}
