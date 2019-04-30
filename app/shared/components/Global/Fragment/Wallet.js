// @flow
import React, { PureComponent } from 'react';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import Blockies from 'react-blockies';

class GlobalFragmentWallet extends PureComponent<Props> {
  render() {
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = this.props;
    return (
      <Header
        size="tiny"
        style={{
          margin: 0
        }}
      >
        <Blockies
          className="ui image"
          seed={`${account}@${authorization}`}
        />
        <Header.Content style={{ minWidth: '12em' }}>
          {account}
          <Header.Subheader>
            {authorization} / {mode}
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }
}

export default translate('global')(GlobalFragmentWallet);
