// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Divider, Icon, Segment, Table } from 'semantic-ui-react';

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
      onBack,
      publicKey,
      ramAmount,
      startingBalance,
      t
    } = this.props;

    return (
      <Segment padding="true" basic>
        <Table size="small" celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_one')}
              </Table.Cell>
              <Table.Cell width={8}>
                {`${startingBalance} EOS`}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_two')}
              </Table.Cell>
              <Table.Cell width={8}>
                {`${ramAmount} B`}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_three')}
              </Table.Cell>
              <Table.Cell width={8}>
                {publicKey}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={8}>
                {t('tools_create_account_confirming_title_four')}
              </Table.Cell>
              <Table.Cell width={8}>
                {accountName}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Divider />
        <Button
          onClick={onBack}
        >
          <Icon name="arrow left" /> {t('back')}
        </Button>
        <Button
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        >
          <Icon name="check" /> {t('confirm_stake')}
        </Button>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsFormCreateAccountConfirming);
