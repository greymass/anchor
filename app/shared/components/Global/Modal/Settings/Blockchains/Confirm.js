// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Table } from 'semantic-ui-react';

class GlobalModalSettingsBlockchainsConfirm extends Component<Props> {
  render() {
    const {
      onSubmit,
      t,
      blockchain
    } = this.props;
    return (
      <React.Fragment>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={4}>
                {t('global_modal_settings_blockchain_confirm_blockchain')}
              </Table.Cell>
              <Table.Cell>
                {blockchain.blockchain}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('global_modal_settings_blockchain_confirm_prefix')}
              </Table.Cell>
              <Table.Cell>
                {blockchain.tokenSymbol}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('global_modal_settings_blockchain_confirm_node')}
              </Table.Cell>
              <Table.Cell>
                {blockchain.node}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('global_modal_settings_blockchain_confirm_chain')}
              </Table.Cell>
              <Table.Cell>
                {blockchain.chainId}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Container textAlign="center">
          <Button
            color="green"
            content={t('global_modal_settings_blockchain_confirm')}
            onClick={onSubmit}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default translate('global')(GlobalModalSettingsBlockchainsConfirm);
