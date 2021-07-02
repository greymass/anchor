// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Header, Label, List, Message, Segment } from 'semantic-ui-react';
import { PrivateKey } from '@greymass/eosio';

import GlobalFormFieldKeyPrivate from '../../Global/Form/Field/Key/Private';

class ToolsKeysValidator extends Component<Props> {
  state = {
    checksum: false,
    valid: false,
    publicKey: '',
    legacyPublicKey: '',
  };
  onChange = (e, { publicKey, valid, value }) => {
    try {
      const { connection } = this.props;
      const pk = PrivateKey.from(value);
      this.setState({
        checksum: true,
        publicKey: String(pk.toPublic()),
        legacyPublicKey: pk.toPublic().toLegacyString(connection.keyPrefix),
        valid
      });
    } catch (err) {
      console.log(err);
      this.setState({
        checksum: false,
        publicKey,
        valid
      });
    }
  }
  render() {
    const { connection, t } = this.props;
    const {
      checksum, publicKey, legacyPublicKey, valid
    } = this.state;
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <Header
          content={t('tools_keys_key_validator_header')}
          subheader={t('tools_keys_key_validator_subheader')}
        />
        <Segment basic>
          <Message
            content={t('tools_keys_key_validator_info_content')}
            header={t('tools_keys_key_validator_info_header')}
            icon="info circle"
            info
          />
          <GlobalFormFieldKeyPrivate
            connection={connection}
            label={t('tools_keys_key_validator_private_key')}
            name="key"
            onChange={this.onChange}
            placeholder={t('welcome:welcome_key_compare_placeholder')}
          />
        </Segment>
        <Segment basic>
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
                      {(checksum)
                        ? (
                          <Label
                            color="green"
                            content={t('tools_keys_key_validator_key_valid')}
                            horizontal
                          />
                        )
                        : (
                          <Label
                            color="yellow"
                            content="Key valid, checksum invalid"
                            horizontal
                          />
                        )
                      }
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="key" />
                    <List.Content>
                      {t('tools_keys_key_validator_public_key')}: {publicKey}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="key" />
                    <List.Content>
                      {t('tools_keys_key_validator_public_key')} (Legacy): {legacyPublicKey}
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

export default withTranslation('tools')(ToolsKeysValidator);
