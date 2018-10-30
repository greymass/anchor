// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Grid, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

const { clipboard } = require('electron');
const { PrivateKey } = require('eosjs-ecc');

class ToolsKeys extends Component<Props> {
  state = { keys: [] }

  copyToClipboard = () => {
    clipboard.writeText(JSON.stringify(this.state.keys));
  }

  generateKeyPair = () => {
    const { connection } = this.props;
    const keys = this.state.keys.slice(0);
    PrivateKey.randomKey().then(privateKey => {
      const wif = privateKey.toWif();
      const publicKey = privateKey.toPublic().toString();
      keys.push([publicKey, wif]);
      this.setState({ keys })
      return keys;
    });
  }


  render() {
    const { t } = this.props;
    const { keys } = this.state;
    return (
      <Segment basic>
        <Header>
          {t('tools_keys_key_generation_header')}
          <Header.Subheader>
            {t('tools_keys_key_generation_subheader')}
          </Header.Subheader>
        </Header>
        <Message
          content={t('tools_keys_key_generation_warning_content')}
          icon="warning sign"
          warning
        />
        <Button
          color="green"
          content={t('tools_keys_key_generation_new_key')}
          icon="plus"
          onClick={this.generateKeyPair}
        />
        <Button
          color="blue"
          content={t('tools_keys_key_generation_copy_clipboard')}
          icon="clipboard"
          onClick={this.copyToClipboard}
        />
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={keys}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsKeys);
