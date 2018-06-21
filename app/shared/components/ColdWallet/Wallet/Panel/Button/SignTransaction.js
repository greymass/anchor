// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class ColdWalletPanelButtonSignTransaction extends Component<Props> {
  handleClick = () => {
    ipcRenderer.send('openFile');
  }
  render() {
    const {
      t
    } = this.props;
    return (
      <Button
        color="blue"
        content={t('collwallet_load_transaction')}
        fluid
        icon="upload"
        onClick={this.handleClick}
      />
    );
  }
}

export default translate('coldwallet')(ColdWalletPanelButtonSignTransaction);
