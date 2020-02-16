// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header, Message } from 'semantic-ui-react';

import GlobalDataBytes from '../../../Global/Data/Bytes';

class ToolsFormCreateAccountConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      accountName,
      activeKeyValue,
      connection,
      delegatedBw,
      delegatedCpu,
      onBack,
      ownerKeyValue,
      ramAmount,
      t,
      totalCost,
      totalDelegated,
      transferTokens
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          {totalCost ? (
            <p>{`${t('tools_form_create_account_confirming_header_one')} ${totalCost.toFixed(4)} ${connection.chainSymbol || 'EOS'}.`}</p>
          ) : (
            <p>The following account will be created at an unknown cost.</p>
          )}
          <p>
            {`${t('tools_form_create_account_confirming_header_two')} ${totalDelegated.toFixed(4)} ${connection.chainSymbol || 'EOS'} ${t('tools_form_create_account_confirming_header_three')}`}
          </p>
        </Header>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_owner_key')}
              </Table.Cell>
              <Table.Cell width={8}>
                {ownerKeyValue}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_active_key')}
              </Table.Cell>
              <Table.Cell width={8}>
                {activeKeyValue}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_account_name')}
              </Table.Cell>
              <Table.Cell width={8}>
                {accountName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_ram_amount')}
              </Table.Cell>
              <Table.Cell width={8}>
                <GlobalDataBytes
                  bytes={Number(ramAmount)}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_delegated_bw_label', { chainSymbol: connection.chainSymbol })}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedBw}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_delegated_cpu_label', { chainSymbol: connection.chainSymbol })}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedCpu}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {(transferTokens)
          ? (
            <Message
              content={t('tools_form_create_account_transfer_tokens_warning')}
              icon="info circle"
              warning
            />
          ) : ''}

        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('tools_form_create_account_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('tools_form_create_account_button')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormCreateAccountConfirming);
