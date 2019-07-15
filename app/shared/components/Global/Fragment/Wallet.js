// @flow
import React, { PureComponent } from 'react';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import Blockies from 'react-blockies';

export class GlobalFragmentWallet extends PureComponent<Props> {
  render() {
    const {
      account,
      authorization,
      mode,
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
        <Header.Content style={{ minWidth: '10em' }}>
          <React.Fragment>
            {account}
            <Header.Subheader>
              <React.Fragment>
                {authorization} / {mode}
              </React.Fragment>
            </Header.Subheader>
          </React.Fragment>
        </Header.Content>
      </Header>
    );
  }
}

export default translate('global')(GlobalFragmentWallet);
