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
      disableAvatar,
      mode,
      size,
    } = this.props;
    return (
      <Header
        size={size || 'tiny'}
        style={{
          margin: 0
        }}
      >
        {(!disableAvatar)
          ? (
            <Blockies
              className="ui image"
              seed={`${account}@${authorization}`}
            />
          )
          : false
        }
        <Header.Content style={{ minWidth: (disableAvatar) ? 'none' : '10em' }}>
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
