// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header } from 'semantic-ui-react';

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
      activeKey,
      delegatedBw,
      delegatedCpu,
      onBack,
      ownerKey,
      ramAmount,
      t,
      totalCost
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          {`${t('tools_form_create_account_confirming_header')} ${totalCost.toFixed(4)} EOS.`}
        </Header>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_owner_key')}
              </Table.Cell>
              <Table.Cell width={8}>
                {ownerKey}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_active_key')}
              </Table.Cell>
              <Table.Cell width={8}>
                {activeKey}
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
                {t('tools_form_create_account_delegated_bw')}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedBw}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_create_account_delegated_cpu')}
              </Table.Cell>
              <Table.Cell width={8}>
                {delegatedCpu}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

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
