// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Divider, Icon, Segment, Table, Header } from 'semantic-ui-react';

class ToolsFormDelegationConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      accountName,
      cpuAmount,
      netAmount,
      onBack,
      t
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          <p>{`${t('tools_form_delegation_confirming_header_one')} ${totalCost.toFixed(4)} EOS.`}</p>
          <p>
            {`${t('tools_form_delegation_confirming_header_two')} ${totalDelegated.toFixed(4)} EOS ${t('tools_form_delegation_confirming_header_three')}`}
          </p>
        </Header>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_delegation_account_name')}
              </Table.Cell>
              <Table.Cell width={8}>
                {accountName}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_delegation_cpu_amount')}
              </Table.Cell>
              <Table.Cell width={8}>
                {cpuAmount}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_form_delegation_net_amount')}
              </Table.Cell>
              <Table.Cell width={8}>
                {netAmount}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('tools_form_delegation_back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('tools_form_delegation_confirm')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormDelegationConfirming);
