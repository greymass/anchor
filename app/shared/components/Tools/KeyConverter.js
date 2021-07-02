// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Input, Message, Segment, Table } from 'semantic-ui-react';
import { PrivateKey } from '@greymass/eosio';

class ToolsKeyGenerator extends Component<Props> {
  state = {
    key: '',
    legacyPrivate: false,
    legacyPublic: false,
    currentPrivate: false,
    currentPublic: false,
  };

  onChange = (e, { value }) => this.setState({
    error: false,
    key: value,
  })

  onClick = () => {
    const { connection } = this.props;
    console.log(connection);
    const { key } = this.state;
    try {
      const pk = PrivateKey.from(key);
      this.setState({
        currentPrivate: String(pk),
        currentPublic: String(pk.toPublic()),
        legacyPrivate: pk.toWif(),
        legacyPublic: pk.toPublic().toLegacyString(connection.keyPrefix),
      });
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }

  render() {
    const {
      t
    } = this.props;
    const {
      error,
      legacyPrivate,
      legacyPublic,
      currentPrivate,
      currentPublic
    } = this.state;

    return (
      <Segment attached="bottom">
        <Header>
          {t('tools:tools_keys_key_convert_header')}
          <Header.Subheader>
            {t('tools:tools_keys_key_convert_subheader_message')}
          </Header.Subheader>
        </Header>
        <p>{t('tools:tools_keys_key_convert_message')}</p>
        <p>
          <Input
            fluid
            label="Private Key"
            onChange={this.onChange}
          />
        </p>
        <p>
          <Button
            content="Convert Private Key"
            onClick={this.onClick}
            primary
          />
        </p>
        {(error)
          ? (
            <Message
              content={String(error)}
              error
              header="Error processing private key"
            />
          )
          : false
        }
        {(currentPublic)
          ? (
            <Table defnition fluid>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">Standard Key Format</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>Public Key</Table.Cell>
                  <Table.Cell>{currentPublic}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Private Key</Table.Cell>
                  <Table.Cell>{currentPrivate}</Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="2">Legacy Key Format</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell collapsing>Public Key</Table.Cell>
                  <Table.Cell>{legacyPublic}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell collapsing>Private Key</Table.Cell>
                  <Table.Cell>{legacyPrivate}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )
          : false
        }
      </Segment>
    );
  }
}

export default withTranslation(['global', 'tools'])(ToolsKeyGenerator);
