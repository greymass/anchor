// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Button, Icon, Input, Header, Label, List, Segment, Table } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from './Ledger/Status';

const { remote } = require('electron');

class ToolsHardwareLedger extends Component<Props> {
  state = {
    index: 0,
    loaded: 0,
  }
  displayPublicKey = () => {
    this.props.actions.ledgerGetPublicKey(this.state.index, true);
  };
  getPublicKey = () => {
    this.setState({ loaded: this.state.index });
    this.props.actions.ledgerGetPublicKey(this.state.index);
  };
  onChange = (e, { value }) => this.setState({ index: parseInt(value, 10) || 0 })
  render() {
    const {
      actions,
      connection,
      ledger,
      settings,
      status,
      t,
    } = this.props;
    const transport = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    return (
      <Segment color="violet" piled style={{ margin: 0 }}>
        <ToolsHardwareLedgerStatus
          actions={actions}
          ledger={ledger}
          settings={settings}
          status={status}
        />
        {(status !== 'connected')
          ? (
            <Segment padded size="large">
              <Header>
                {t('ledger_unavailable_text_header')}
              </Header>
              <p>{t('ledger_unavailable_text_1')}</p>
              <List>
                <List.Item>
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Description>
                      {t('ledger_unavailable_list_1')}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Description>
                      {t('ledger_unavailable_list_2')}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Description>
                      {t('ledger_unavailable_list_3')}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Description>
                      {t('ledger_unavailable_list_4')}
                    </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Description>
                      {t('ledger_unavailable_list_5')}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          )
          : false
        }
        <Table definition>
          <Table.Header>
            <Table.HeaderCell colSpan="16">
              {t('ledger_status_table')}
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {t('ledger_row_public_key')}
              </Table.Cell>
              <Table.Cell>
                {(transport)
                  ? false
                  : <Label basic color="yellow" content={t('ledger_row_connected_false')} horizontal />
                }
                {(transport)
                  ? (
                    <React.Fragment>
                      <p>
                        {t('ledger_row_public_key_input')}
                      </p>
                      <Input
                        onChange={this.onChange}
                        value={this.state.index}
                        style={{
                          width: '50px'
                        }}
                      />
                      <Button
                        content={`${t('ledger_retrieve_public_key')} [${this.state.index}]`}
                        onClick={this.getPublicKey}
                        primary
                      />
                    </React.Fragment>
                  )
                  : false
                }
                {(transport && ledger.publicKey)
                  ? (
                    <Segment>
                      <p>
                        {t('ledger_public_key_at_index')} {this.state.loaded}:
                      </p>
                      <Input
                        fluid
                        style={{ marginBottom: '0.5em' }}
                        value={`${connection.keyPrefix}${ledger.publicKey.wif.slice(3)}`}
                      />
                      <Button
                        content={t('ledger_confirm_public_key')}
                        onClick={this.displayPublicKey}
                        primary
                      />
                    </Segment>
                  )
                  : false
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={6}>
                {t('ledger_row_automatic_detection')}
              </Table.Cell>
              <Table.Cell>
                {(settings.hardwareLedgerSupport)
                  ? <Label basic color="green" content="enabled" horizontal />
                  : <Label basic color="yellow" content="disabled" horizontal />
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('ledger_row_waiting_device')}
              </Table.Cell>
              <Table.Cell>
                {(ledger.listening)
                  ? <Label basic color="green" content="waiting" horizontal />
                  : <Label basic color="yellow" content="disabled" horizontal />
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('ledger_row_connected')}
              </Table.Cell>
              <Table.Cell>
                {(transport)
                  ? <Label basic color="green" content={t('ledger_row_connected_true')} horizontal />
                  : <Label basic color="yellow" content={t('ledger_row_connected_false')} horizontal />
                }
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('ledger_row_software_version')}
              </Table.Cell>
              <Table.Cell>
                {(transport)
                  ? false
                  : <Label basic color="yellow" content={t('ledger_row_connected_false')} horizontal />
                }
                {(transport && ledger.application && ledger.application.version)
                  ? ledger.application.version
                  : false
                }
                {(transport && (!ledger.application || !ledger.application.version))
                  ? <Label basic color="orange" content={t('ledger_status_awaiting_application_subheader')} horizontal />
                  : false
                }
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default withTranslation('ledger')(ToolsHardwareLedger);
