// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon, Label } from 'semantic-ui-react';

const { clipboard, ipcRenderer } = require('electron');

class PromptActionDownload extends Component<Props> {
  onSaveUnsigned = () => {
    const { prompt, settings } = this.props;
    const { contract, resolved } = prompt;
    const { transaction } = resolved;
    const data = JSON.stringify({
      contract,
      transaction: {
        transaction_id: '',
        broadcast: false,
        transaction: {
          compression: 'none',
          signatures: [],
          transaction
        }
      }
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
        animated="fade"
        as="div"
        disabled={disabled}
        floated="right"
        labelPosition="left"
        onClick={this.onSaveUnsigned}
      >
        <Label
          as="a"
          basic
          pointing="right"
        >
          <Header textAlign="left">
            <Header.Content>
              <Header.Subheader style={{ fontWeight: 'bold' }}>
                {t('handler_action_download_header')}
              </Header.Subheader>
              {wallet.account}@{wallet.authorization}
            </Header.Content>
          </Header>
        </Label>
        <Button
          color="orange"
          icon
          loading={loading}
          style={{ position: 'relative' }}
        >
          <Button.Content hidden style={{ marginTop: '-0.75em' }}>
            <Icon
              name="save"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
          <Button.Content visible style={{ margin: '0 1em' }}>
            <Icon
              name="save outline"
              size="large"
              style={{ marginRight: 0 }}
            />
          </Button.Content>
        </Button>
      </Button>
    );
  }
}

export default withTranslation('global')(PromptActionDownload);
