// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class ColdWalletPanelButtonSignTransaction extends Component<Props> {
  handleClick = () => {
    ipcRenderer.send('openFile');
    ipcRenderer.once('openFileData', (event, data) =>
      this.props.actions.setTransaction(data));
  }
  render() {
    const {
      t
    } = this.props;
    return (
      <Button
        color="blue"
        content={t('collwallet_load_transaction')}
        icon="upload"
        onClick={this.handleClick}
      />
    );
  }
}

export default translate('coldwallet')(ColdWalletPanelButtonSignTransaction);
