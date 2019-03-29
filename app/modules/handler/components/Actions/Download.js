// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

const { clipboard, ipcRenderer } = require('electron');

class PromptActionDownload extends Component<Props> {
  onSaveUnsigned = () => {
    const { prompt, settings } = this.props;
    const { contract, tx } = prompt;
    const data = JSON.stringify({
      contract,
      transaction: tx
    }, null, 2);
    ipcRenderer.send('saveFile', settings.lastFilePath, data);
  }
  render() {
    const {
      disabled,
      loading,
      t,
      wallet,
    } = this.props;
    return (
      <Button
        content={(
          <Header
            style={{ color: '#ececec' }}
            textAlign="left"
          >
            <Icon name="download" />
            <Header.Content>
              <Header.Subheader style={{ color: '#ececec', fontWeight: 'bold' }}>
                Save Unsigned Transaction
              </Header.Subheader>
              {wallet.account}@{wallet.authorization}
            </Header.Content>
          </Header>
        )}
        color="orange"
        disabled={disabled}
        floated="right"
        loading={loading}
        onClick={this.onSaveUnsigned}
      />
    );
  }
}

export default translate('global')(PromptActionDownload);
