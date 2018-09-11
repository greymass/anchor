// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Divider, Header, Grid, Label, List, Message, Segment } from 'semantic-ui-react';

import GlobalFormFieldKeyPrivate from '../../Global/Form/Field/Key/Private';

const { clipboard } = require('electron');
const { PrivateKey } = require('eosjs-ecc');

class ToolsKeysValidator extends Component<Props> {
  state = {
    valid: false,
    publicKey: ''
  }
  onChange = (e, { publicKey, valid }) => this.setState({ publicKey, valid })
  render() {
    const { t, connection, settings } = this.props;
    const { publicKey, valid } = this.state;
    return (
      <Segment basic>
        <Header
          content={t('tools_keys_key_validator_header')}
          subheader={t('tools_keys_key_validator_subheader')}
        />
        <Segment>
          <Message
            content={t('tools_keys_key_validator_info_content')}
            header={t('tools_keys_key_validator_info_header')}
            icon="info circle"
            info
          />
          <GlobalFormFieldKeyPrivate
            label={t('tools_keys_key_validator_private_key')}
            name="key"
            placeholder={t('welcome:welcome_key_compare_placeholder')}
            onChange={this.onChange}
            settings={settings}
            connection={connection}
          />
        </Segment>
        <Segment>
          <Header
            content={t('tools_keys_key_validator_current_header')}
            subheader={t('tools_keys_key_validator_current_subheader')}
          />
          <List>
            {(valid)
              ? (
                <React.Fragment>
                  <List.Item>
                    <List.Icon name="checkmark" />
                    <List.Content>
                      <Label
                        color="green"
                        content={t('tools_keys_key_validator_key_valid')}
                        horizontal
                      />
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="key" />
                    <List.Content>
                      {t('tools_keys_key_validator_public_key')}: {publicKey}
                    </List.Content>
                  </List.Item>
                </React.Fragment>
              )
              : (
                <List.Item>
                  <List.Icon name="x" />
                  <List.Content>
                    <Label
                      color="red"
                      content={t('tools_keys_key_validator_key_invalid')}
                      horizontal
                    />
                  </List.Content>
                </List.Item>
              )
            }
          </List>
        </Segment>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsKeysValidator);
