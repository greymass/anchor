// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Icon, Header, Label, List, Segment, Table } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from './Ledger/Status';
import HardwareLedger from '../../../utils/Hardware/Ledger';

class ToolsHardwareLedger extends Component<Props> {
  displayPublicKey = () => {
    this.props.actions.ledgerGetPublicKey(0, true);
  }
  getPublicKey = () => {
    this.props.actions.ledgerGetPublicKey(0);
  }
  render() {
    const {
      accounts,
      actions,
      ledger,
      settings,
      status,
      t,
    } = this.props;
    const account = accounts[settings.account];
    const { transport } = new HardwareLedger();
    if (!account) return false;
    return (
      <Segment basic>
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
          : (
            <Segment padded size="large">
              <Header>
                {t('ledger_available_text_header')}
              </Header>
              <p>{t('ledger_available_text_1')}</p>
              <p>{t('ledger_available_text_2')}</p>
            </Segment>
          )
        }
        <Table definition>
          <Table.Header>
            <Table.HeaderCell colSpan="16">
              {t('ledger_status_table')}
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
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
            <Table.Row>
              <Table.Cell>
                {t('ledger_row_public_key')}
              </Table.Cell>
              <Table.Cell>
                {(transport)
                  ? false
                  : <Label basic color="yellow" content={t('ledger_row_connected_false')} horizontal />
                }
                {(transport && ledger.publicKey)
                  ? (
                    <React.Fragment>
                      <p>{ledger.publicKey.wif}</p>
                      <Button
                        content={t('ledger_confirm_public_key')}
                        onClick={this.displayPublicKey}
                        primary
                      />
                    </React.Fragment>
                  )
                  : false
                }
                {(transport && !ledger.publicKey)
                  ? (
                    <React.Fragment>
                      <Button
                        content={t('ledger_retrieve_public_key')}
                        onClick={this.getPublicKey}
                        primary
                      />
                    </React.Fragment>
                  )
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

export default translate('ledger')(ToolsHardwareLedger);
